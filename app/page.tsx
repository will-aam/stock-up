"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import {
  Upload,
  Scan,
  Download,
  History,
  Plus,
  Trash2,
  FileSpreadsheet,
  Store,
  AlertCircle,
  Package,
  Crown,
} from "lucide-react"
import { toast } from "@/hooks/use-toast"
import Papa, { type ParseResult } from "papaparse"
import { ThemeToggleButton } from "@/components/theme-toggle-button"
import { QuickRegisterModal } from "@/components/quick-register-modal"
import { ClearDataModal } from "@/components/clear-data-modal"
import Link from "next/link"

interface Product {
  id: number
  codigo_produto: string
  descricao: string
  saldo_estoque: number
}

interface BarCode {
  codigo_de_barras: string
  produto_id: number
  produto?: Product
}

// Nova estrutura unificada por produto
interface ProductCount {
  id: string
  codigo_de_barras: string
  codigo_produto: string
  descricao: string
  saldo_estoque: number
  quant_loja: number
  quant_estoque: number
  total: number // quant_loja + quant_estoque - saldo_estoque
  local_estoque: string
  data_hora: string
}

interface InventoryHistory {
  id: number
  data_contagem: string
  usuario_email: string
  total_itens: number
  local_estoque: string
  status: string
}

interface CsvRow {
  codigo_de_barras: string
  codigo_produto: string
  descricao: string
  saldo_estoque: string
}

export default function InventorySystem() {
  const [products, setProducts] = useState<Product[]>([])
  const [barCodes, setBarCodes] = useState<BarCode[]>([])
  const [scanInput, setScanInput] = useState("")
  const [quantityInput, setQuantityInput] = useState("")
  const [currentProduct, setCurrentProduct] = useState<Product | null>(null)
  const [csvFile, setCsvFile] = useState<File | null>(null)
  const [csvErrors, setCsvErrors] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [selectedLocation, setSelectedLocation] = useState("loja-1")
  const [inventoryHistory, setInventoryHistory] = useState<InventoryHistory[]>([])

  // Nova estrutura unificada
  const [countingMode, setCountingMode] = useState<"loja" | "estoque">("loja")
  const [productCounts, setProductCounts] = useState<ProductCount[]>([])
  const [showQuickRegister, setShowQuickRegister] = useState(false)
  const [showClearDataModal, setShowClearDataModal] = useState(false)
  const [quickRegisterData, setQuickRegisterData] = useState({
    codigo_de_barras: "",
    descricao: "",
    quantidade: "",
  })

  const locations = [
    { value: "loja-1", label: "Loja 1" },
    { value: "loja-2", label: "Loja 2" },
    { value: "deposito", label: "Depósito" },
    { value: "estoque-central", label: "Estoque Central" },
  ]

  // Carregar dados do localStorage
  useEffect(() => {
    const savedData = localStorage.getItem("inventory-system-data")
    if (savedData) {
      try {
        const data = JSON.parse(savedData)
        setProducts(data.products || [])
        setBarCodes(data.barCodes || [])
        setProductCounts(data.productCounts || [])
        console.log("Dados carregados do localStorage:", data)
      } catch (error) {
        console.error("Erro ao carregar dados do localStorage:", error)
      }
    }
    // Removidos os dados de amostra - sistema inicia limpo
  }, [])

  // Salvar dados no localStorage
  useEffect(() => {
    const dataToSave = {
      products,
      barCodes,
      productCounts,
      timestamp: new Date().toISOString(),
    }
    localStorage.setItem("inventory-system-data", JSON.stringify(dataToSave))
  }, [products, barCodes, productCounts])

  // Função para limpar todos os dados
  const handleClearAllData = () => {
    localStorage.removeItem("inventory-system-data")
    setProducts([])
    setBarCodes([])
    setProductCounts([])
    setScanInput("")
    setQuantityInput("")
    setCurrentProduct(null)
    setCsvFile(null)
    setCsvErrors([])
    setShowClearDataModal(false)
    toast({
      title: "Dados apagados",
      description: "Todos os dados foram removidos com sucesso",
      variant: "destructive",
    })
  }

  const handleCsvUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setCsvFile(file)
      processCsvFile(file)
    }
  }

  const processCsvFile = (file: File) => {
    Papa.parse<CsvRow>(file, {
      header: true,
      delimiter: ";",
      skipEmptyLines: true,
      complete: (results: ParseResult<CsvRow>) => {
        const errors: string[] = []
        const newProducts: Product[] = []
        const newBarCodes: BarCode[] = []
        const existingBarCodes = new Set(barCodes.map((bc) => bc.codigo_de_barras))

        results.data.forEach((row: CsvRow, index: number) => {
          const { codigo_de_barras, codigo_produto, descricao, saldo_estoque } = row

          if (!codigo_de_barras || !codigo_produto || !descricao || saldo_estoque === undefined) {
            errors.push(`Linha ${index + 2}: Dados incompletos`)
            return
          }

          if (existingBarCodes.has(codigo_de_barras)) {
            errors.push(`Linha ${index + 2}: Código de barras ${codigo_de_barras} duplicado`)
            return
          }

          const saldoNumerico = Number.parseInt(saldo_estoque)
          if (isNaN(saldoNumerico)) {
            errors.push(`Linha ${index + 2}: Saldo de estoque deve ser um número`)
            return
          }

          const product = {
            id: Date.now() + index,
            codigo_produto,
            descricao,
            saldo_estoque: saldoNumerico,
          }

          newProducts.push(product)
          newBarCodes.push({
            codigo_de_barras,
            produto_id: product.id,
            produto: product,
          })
          existingBarCodes.add(codigo_de_barras)
        })

        setCsvErrors(errors)
        if (errors.length === 0 && newProducts.length > 0) {
          setProducts((prev) => [...prev, ...newProducts])
          setBarCodes((prev) => [...prev, ...newBarCodes])
          toast({ title: `${newProducts.length} produtos importados com sucesso!` })
        }
      },
      error: (error) => {
        toast({
          title: "Erro",
          description: "Falha ao processar arquivo CSV",
          variant: "destructive",
        })
      },
    })
  }

  const handleScan = () => {
    const barCode = barCodes.find((bc) => bc.codigo_de_barras === scanInput)
    if (barCode && barCode.produto) {
      setCurrentProduct(barCode.produto)
      toast({
        title: "Produto encontrado!",
        description: `${barCode.produto.descricao} - Estoque: ${barCode.produto.saldo_estoque}`,
      })
    } else {
      // Produto não encontrado - abrir modal de cadastro rápido
      setQuickRegisterData({
        codigo_de_barras: scanInput,
        descricao: "",
        quantidade: "",
      })
      setShowQuickRegister(true)
    }
  }

  const handleQuickRegister = (data: { codigo_de_barras: string; descricao: string; quantidade: string }) => {
    const newProduct: Product = {
      id: Date.now(),
      codigo_produto: `TEMP-${Date.now()}`,
      descricao: data.descricao,
      saldo_estoque: 0,
    }

    const newBarCode: BarCode = {
      codigo_de_barras: data.codigo_de_barras,
      produto_id: newProduct.id,
      produto: newProduct,
    }

    setProducts((prev) => [...prev, newProduct])
    setBarCodes((prev) => [...prev, newBarCode])
    setCurrentProduct(newProduct)
    setQuantityInput(data.quantidade)
    setShowQuickRegister(false)

    toast({ title: "Produto cadastrado e selecionado!" })
  }

  const calculateTotal = (quantLoja: number, quantEstoque: number, saldoEstoque: number) => {
    return quantLoja + quantEstoque - saldoEstoque
  }

  const handleAddCount = () => {
    if (!currentProduct || !quantityInput) {
      toast({
        title: "Erro",
        description: "Selecione um produto e informe a quantidade",
        variant: "destructive",
      })
      return
    }

    const quantidade = Number.parseInt(quantityInput)

    // Verificar se já existe contagem para este produto
    const existingIndex = productCounts.findIndex((item) => item.codigo_de_barras === scanInput)

    if (existingIndex >= 0) {
      // Atualizar contagem existente
      const updatedCounts = [...productCounts]
      const existing = updatedCounts[existingIndex]

      if (countingMode === "loja") {
        existing.quant_loja = quantidade
      } else {
        existing.quant_estoque = quantidade
      }

      existing.total = calculateTotal(existing.quant_loja, existing.quant_estoque, existing.saldo_estoque)
      existing.data_hora = new Date().toLocaleString("pt-BR")

      setProductCounts(updatedCounts)
    } else {
      // Criar nova contagem
      const newCount: ProductCount = {
        id: Date.now().toString(),
        codigo_de_barras: scanInput,
        codigo_produto: currentProduct.codigo_produto,
        descricao: currentProduct.descricao,
        saldo_estoque: currentProduct.saldo_estoque,
        quant_loja: countingMode === "loja" ? quantidade : 0,
        quant_estoque: countingMode === "estoque" ? quantidade : 0,
        total: calculateTotal(
          countingMode === "loja" ? quantidade : 0,
          countingMode === "estoque" ? quantidade : 0,
          currentProduct.saldo_estoque,
        ),
        local_estoque: selectedLocation,
        data_hora: new Date().toLocaleString("pt-BR"),
      }

      setProductCounts((prev) => [...prev, newCount])
    }

    setScanInput("")
    setQuantityInput("")
    setCurrentProduct(null)
    toast({ title: `Quantidade de ${countingMode} atualizada!` })
  }

  const handleRemoveCount = (id: string) => {
    setProductCounts((prev) => prev.filter((item) => item.id !== id))
    toast({ title: "Item removido da contagem" })
  }

  const handleEditCount = (item: ProductCount, field: "quant_loja" | "quant_estoque", value: number) => {
    const updatedCounts = productCounts.map((count) => {
      if (count.id === item.id) {
        const updated = { ...count }
        updated[field] = value
        updated.total = calculateTotal(updated.quant_loja, updated.quant_estoque, updated.saldo_estoque)
        updated.data_hora = new Date().toLocaleString("pt-BR")
        return updated
      }
      return count
    })
    setProductCounts(updatedCounts)
  }

  const exportToCsv = () => {
    if (productCounts.length === 0) {
      toast({ title: "Nenhum item para exportar", variant: "destructive" })
      return
    }

    const dataToExport = productCounts.map((item) => ({
      codigo_de_barras: item.codigo_de_barras,
      codigo_produto: item.codigo_produto,
      descricao: item.descricao,
      saldo_estoque: item.saldo_estoque,
      quant_loja: item.quant_loja,
      quant_estoque: item.quant_estoque,
      total: item.total,
    }))

    const csv = Papa.unparse(dataToExport, {
      header: true,
      delimiter: ";",
      quotes: true,
    })

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" })
    const link = document.createElement("a")
    link.href = URL.createObjectURL(blob)
    link.download = `contagem_${selectedLocation}_${new Date().toISOString().split("T")[0]}.csv`
    link.click()
    toast({ title: "CSV exportado com sucesso!" })
  }

  const getVarianceColor = (total: number) => {
    if (total > 0) return "text-green-600 dark:text-green-400"
    if (total < 0) return "text-red-600 dark:text-red-400"
    return "text-gray-600 dark:text-gray-400"
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <header className="bg-white dark:bg-gray-800 shadow-sm border-b dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/landing" className="flex items-center space-x-2">
              <Package className="h-8 w-8 text-blue-600 dark:text-blue-400" />
              <span className="text-xl font-semibold text-gray-900 dark:text-white">Sistema de Estoque</span>
            </Link>

            {/* Navigation Menu */}
            <nav className="hidden md:flex items-center space-x-8">
              <Link
                href="/landing"
                className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                Início
              </Link>
              <Link
                href="/"
                className="text-blue-600 dark:text-blue-400 font-medium hover:text-blue-700 dark:hover:text-blue-300"
              >
                Sistema
              </Link>
              <Link
                href="/about"
                className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                Sobre
              </Link>
              <Link
                href="/contact"
                className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                Contato
              </Link>
              <Link
                href="/login"
                className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                Login
              </Link>
            </nav>

            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowClearDataModal(true)}
                className="text-red-600 hover:text-red-700 hover:bg-red-50 dark:text-red-400 dark:hover:text-red-300 dark:hover:bg-red-900/20"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
              <ThemeToggleButton />
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs defaultValue="scan" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="scan">Conferência</TabsTrigger>
            <TabsTrigger value="import">Importar</TabsTrigger>
            <TabsTrigger value="export">Exportar</TabsTrigger>
            <TabsTrigger value="history">Histórico</TabsTrigger>
          </TabsList>

          <TabsContent value="scan" className="space-y-6">
            <div className="grid gap-6 lg:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Scan className="h-5 w-5 mr-2" />
                    Scanner de Código de Barras
                  </CardTitle>
                  <CardDescription>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Store className="h-4 w-4" />
                        <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                          <SelectTrigger className="w-48">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {locations.map((location) => (
                              <SelectItem key={location.value} value={location.value}>
                                {location.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="flex space-x-2">
                        <Button
                          variant={countingMode === "loja" ? "default" : "outline"}
                          size="sm"
                          onClick={() => setCountingMode("loja")}
                        >
                          <Store className="h-3 w-3 mr-1" />
                          Loja
                        </Button>
                        <Button
                          variant={countingMode === "estoque" ? "default" : "outline"}
                          size="sm"
                          onClick={() => setCountingMode("estoque")}
                        >
                          <Package className="h-3 w-3 mr-1" />
                          Estoque
                        </Button>
                      </div>
                    </div>
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="barcode">Código de Barras</Label>
                    <div className="flex space-x-2">
                      <Input
                        id="barcode"
                        value={scanInput}
                        onChange={(e) => setScanInput(e.target.value)}
                        placeholder="Digite ou escaneie o código"
                        className="flex-1 mobile-optimized"
                        onKeyPress={(e) => e.key === "Enter" && handleScan()}
                      />
                      <Button onClick={handleScan}>
                        <Scan className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  {currentProduct && (
                    <div className="p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h3 className="font-semibold text-green-800 dark:text-green-200">Produto Encontrado</h3>
                          <p className="text-sm text-green-700 dark:text-green-300">{currentProduct.descricao}</p>
                          <p className="text-xs text-green-600 dark:text-green-400">
                            Código: {currentProduct.codigo_produto}
                          </p>
                        </div>
                        <Badge variant="secondary" className="ml-2">
                          Estoque: {currentProduct.saldo_estoque}
                        </Badge>
                      </div>
                    </div>
                  )}

                  <div className="space-y-2">
                    <Label htmlFor="quantity">Quantidade {countingMode === "loja" ? "em Loja" : "em Estoque"}</Label>
                    <Input
                      id="quantity"
                      type="number"
                      value={quantityInput}
                      onChange={(e) => setQuantityInput(e.target.value)}
                      placeholder="Digite a quantidade"
                      min="0"
                      className="mobile-optimized"
                    />
                  </div>

                  <Button onClick={handleAddCount} className="w-full" disabled={!currentProduct || !quantityInput}>
                    <Plus className="h-4 w-4 mr-2" />
                    Adicionar Contagem de {countingMode === "loja" ? "Loja" : "Estoque"}
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Produtos Contados ({productCounts.length})</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 max-h-96 overflow-y-auto">
                    {productCounts.length === 0 ? (
                      <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                        <Package className="h-12 w-12 mx-auto mb-4 opacity-50" />
                        <p className="font-medium">Nenhum produto contado ainda</p>
                        <p className="text-sm">Escaneie um código de barras para começar</p>
                      </div>
                    ) : (
                      productCounts.map((item) => (
                        <div
                          key={item.id}
                          className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg"
                        >
                          <div className="flex-1">
                            <p className="font-medium text-sm">{item.descricao}</p>
                            <p className="text-xs text-gray-600 dark:text-gray-400">
                              Código: {item.codigo_produto} | Sistema: {item.saldo_estoque}
                            </p>
                            <div className="flex items-center space-x-2 mt-1">
                              <Badge variant="outline" className="text-xs">
                                Loja: {item.quant_loja}
                              </Badge>
                              <Badge variant="outline" className="text-xs">
                                Estoque: {item.quant_estoque}
                              </Badge>
                              <Badge
                                variant={item.total === 0 ? "secondary" : item.total > 0 ? "default" : "destructive"}
                                className="text-xs"
                              >
                                Total: {item.total > 0 ? "+" : ""}
                                {item.total}
                              </Badge>
                            </div>
                          </div>
                          <Button variant="outline" size="sm" onClick={() => handleRemoveCount(item.id)}>
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      ))
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="import" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Upload className="h-5 w-5 mr-2" />
                  Importar Produtos
                </CardTitle>
                <CardDescription>
                  Faça upload de um arquivo CSV com formato: codigo_de_barras;codigo_produto;descricao;saldo_estoque
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="csv-file">Arquivo CSV</Label>
                  <Input id="csv-file" type="file" accept=".csv" onChange={handleCsvUpload} />
                </div>

                {csvErrors.length > 0 && (
                  <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>
                      <div className="space-y-1">
                        <p className="font-semibold">Erros encontrados:</p>
                        {csvErrors.map((error, index) => (
                          <p key={index} className="text-sm">
                            {error}
                          </p>
                        ))}
                      </div>
                    </AlertDescription>
                  </Alert>
                )}

                <div className="grid grid-cols-1 gap-4 text-sm">
                  <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <p className="font-semibold text-blue-800 dark:text-blue-200">Produtos cadastrados</p>
                    <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">{products.length}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {products.length > 0 ? (
              <Card>
                <CardHeader>
                  <CardTitle>Produtos Cadastrados</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="max-h-96 overflow-y-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Código</TableHead>
                          <TableHead>Descrição</TableHead>
                          <TableHead>Estoque</TableHead>
                          <TableHead>Código de Barras</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {products.map((product) => {
                          const barCode = barCodes.find((bc) => bc.produto_id === product.id)
                          return (
                            <TableRow key={product.id}>
                              <TableCell className="font-medium">{product.codigo_produto}</TableCell>
                              <TableCell>{product.descricao}</TableCell>
                              <TableCell>
                                <Badge variant="outline">{product.saldo_estoque}</Badge>
                              </TableCell>
                              <TableCell className="font-mono text-sm">{barCode?.codigo_de_barras || "-"}</TableCell>
                            </TableRow>
                          )
                        })}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card>
                <CardContent className="py-12">
                  <div className="text-center text-gray-500 dark:text-gray-400">
                    <Upload className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p className="font-medium">Nenhum produto cadastrado</p>
                    <p className="text-sm">Importe um arquivo CSV para começar</p>
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="export" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Download className="h-5 w-5 mr-2" />
                  Exportar Contagem
                </CardTitle>
                <CardDescription>Exporte os dados da contagem atual em CSV</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <Button onClick={exportToCsv} disabled={productCounts.length === 0} className="h-12">
                    <FileSpreadsheet className="h-4 w-4 mr-2" />
                    Exportar CSV
                  </Button>
                  <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <p className="text-sm font-medium">
                      Local: {locations.find((l) => l.value === selectedLocation)?.label}
                    </p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">{new Date().toLocaleDateString("pt-BR")}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">{productCounts.length}</p>
                    <p className="text-sm text-blue-800 dark:text-blue-200">Produtos Contados</p>
                  </div>
                </div>

                {productCounts.length > 0 ? (
                  <div className="max-h-96 overflow-y-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Descrição</TableHead>
                          <TableHead>Sistema</TableHead>
                          <TableHead>Loja</TableHead>
                          <TableHead>Estoque</TableHead>
                          <TableHead>Total</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {productCounts.map((item) => (
                          <TableRow key={item.id}>
                            <TableCell className="font-medium">{item.descricao}</TableCell>
                            <TableCell>{item.saldo_estoque}</TableCell>
                            <TableCell>{item.quant_loja}</TableCell>
                            <TableCell>{item.quant_estoque}</TableCell>
                            <TableCell>
                              <Badge
                                variant={item.total === 0 ? "secondary" : item.total > 0 ? "default" : "destructive"}
                              >
                                {item.total > 0 ? "+" : ""}
                                {item.total}
                              </Badge>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                    <FileSpreadsheet className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p className="font-medium">Nenhuma contagem para exportar</p>
                    <p className="text-sm">Realize contagens na aba "Conferência" primeiro</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="history" className="space-y-6">
            {/* Aviso Premium */}
            <Alert className="border-amber-200 bg-amber-50 dark:border-amber-800 dark:bg-amber-900/20">
              <Crown className="h-4 w-4 text-amber-600 dark:text-amber-400" />
              <AlertDescription className="text-amber-800 dark:text-amber-200">
                <div className="flex items-center justify-between">
                  <div>
                    <strong>Recurso Premium</strong>
                    <p className="text-sm mt-1">
                      Este recurso está disponível apenas para assinantes premium. Faça upgrade para acessar o histórico
                      completo de contagens.
                    </p>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="ml-4 border-amber-300 text-amber-700 hover:bg-amber-100 dark:border-amber-600 dark:text-amber-300 dark:hover:bg-amber-900/30 bg-transparent"
                  >
                    <Crown className="h-3 w-3 mr-1" />
                    Upgrade
                  </Button>
                </div>
              </AlertDescription>
            </Alert>

            <Card className="opacity-60">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <History className="h-5 w-5 mr-2" />
                  Histórico de Contagens
                </CardTitle>
                <CardDescription>Visualize o histórico de contagens anteriores</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                  <History className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p className="font-medium">Histórico não disponível</p>
                  <p className="text-sm">Faça upgrade para premium para acessar este recurso</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>

      {/* Modal de Cadastro Rápido */}
      <QuickRegisterModal
        isOpen={showQuickRegister}
        onClose={() => setShowQuickRegister(false)}
        onSave={handleQuickRegister}
        initialData={quickRegisterData}
      />

      {/* Modal de Confirmação para Limpar Dados */}
      <ClearDataModal
        isOpen={showClearDataModal}
        onClose={() => setShowClearDataModal(false)}
        onConfirm={handleClearAllData}
      />
    </div>
  )
}
