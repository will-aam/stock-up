"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Package, Scan, Download, Check, X, Crown, Zap, Shield, Users, Building2, ArrowRight, Star } from "lucide-react"
import Link from "next/link"
import { ThemeToggleButton } from "@/components/theme-toggle-button"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Header */}
      <header className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-b dark:border-gray-700 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <Package className="h-8 w-8 text-blue-600 dark:text-blue-400" />
              <span className="text-xl font-bold text-gray-900 dark:text-white">Sistema de Estoque</span>
            </div>

            {/* Navigation Menu */}
            <nav className="hidden md:flex items-center space-x-8">
              <Link
                href="/landing"
                className="text-blue-600 dark:text-blue-400 font-medium hover:text-blue-700 dark:hover:text-blue-300"
              >
                Início
              </Link>
              <Link
                href="/"
                className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
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
              <ThemeToggleButton />

              {/* Mobile menu button */}
              <Button variant="ghost" size="sm" className="md:hidden">
                <Package className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <Badge variant="secondary" className="mb-4 px-4 py-2">
            <Zap className="h-4 w-4 mr-2" />
            Solução Completa para Gestão de Estoque
          </Badge>

          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
            Controle seu estoque com
            <span className="text-blue-600 dark:text-blue-400 block">precisão e facilidade</span>
          </h1>

          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
            Sistema web responsivo para conferência de estoque com leitor de código de barras. Otimizado para
            dispositivos móveis e leitores profissionais.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/register">
              <Button size="lg" className="px-8 py-4 text-lg font-semibold">
                <Crown className="h-5 w-5 mr-2" />
                Seja Premium
                <ArrowRight className="h-5 w-5 ml-2" />
              </Button>
            </Link>

            <Link href="/">
              <Button variant="outline" size="lg" className="px-8 py-4 text-lg font-semibold bg-transparent">
                Usar Versão Grátis
              </Button>
            </Link>
          </div>

          <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">
            ✨ Sem cartão de crédito para testar a versão gratuita
          </p>
        </div>
      </section>

      {/* O que é / Para quem serve */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white/50 dark:bg-gray-800/50">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">O que é o Sistema de Estoque?</h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                Uma solução web completa para conferência e controle de estoque, desenvolvida especialmente para
                facilitar o trabalho de contagem e organização de produtos.
              </p>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-full">
                    <Scan className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <span className="text-gray-700 dark:text-gray-300">Scanner de código de barras integrado</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-full">
                    <Download className="h-5 w-5 text-green-600 dark:text-green-400" />
                  </div>
                  <span className="text-gray-700 dark:text-gray-300">Exportação em CSV para relatórios</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-full">
                    <Package className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                  </div>
                  <span className="text-gray-700 dark:text-gray-300">Gestão de múltiplos locais de estoque</span>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Para quem serve?</h2>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                    <Building2 className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">Pequenas e Médias Empresas</h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      Lojas, mercados e distribuidoras que precisam de controle eficiente.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-lg">
                    <Users className="h-6 w-6 text-green-600 dark:text-green-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">Equipes de Estoque</h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      Funcionários que realizam conferências e inventários.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                    <Shield className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">Gestores e Proprietários</h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      Quem precisa de relatórios precisos e histórico de movimentações.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Planos */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Escolha o plano ideal para você
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Comece grátis ou tenha acesso completo com o Premium
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Plano Gratuito */}
            <Card className="relative border-2 border-gray-200 dark:border-gray-700">
              <CardHeader className="text-center pb-8">
                <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white">Gratuito</CardTitle>
                <CardDescription className="text-lg">Perfeito para começar</CardDescription>
                <div className="mt-4">
                  <span className="text-4xl font-bold text-gray-900 dark:text-white">R$ 0</span>
                  <span className="text-gray-600 dark:text-gray-400">/mês</span>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <Check className="h-5 w-5 text-green-500" />
                    <span className="text-gray-700 dark:text-gray-300">Scanner de código de barras</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Check className="h-5 w-5 text-green-500" />
                    <span className="text-gray-700 dark:text-gray-300">Importação de produtos via CSV</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Check className="h-5 w-5 text-green-500" />
                    <span className="text-gray-700 dark:text-gray-300">Exportação de contagens</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Check className="h-5 w-5 text-green-500" />
                    <span className="text-gray-700 dark:text-gray-300">Cadastro rápido de produtos</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <X className="h-5 w-5 text-red-500" />
                    <span className="text-gray-500 dark:text-gray-400">Dados salvos apenas localmente</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <X className="h-5 w-5 text-red-500" />
                    <span className="text-gray-500 dark:text-gray-400">Sem histórico de contagens</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <X className="h-5 w-5 text-red-500" />
                    <span className="text-gray-500 dark:text-gray-400">Sem backup automático</span>
                  </div>
                </div>

                <div className="pt-6">
                  <Link href="/" className="w-full">
                    <Button variant="outline" className="w-full bg-transparent">
                      Começar Agora
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>

            {/* Plano Premium */}
            <Card className="relative border-2 border-blue-500 dark:border-blue-400 shadow-lg">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <Badge className="px-4 py-1 bg-blue-500 text-white">
                  <Star className="h-4 w-4 mr-1" />
                  Mais Popular
                </Badge>
              </div>

              <CardHeader className="text-center pb-8">
                <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white flex items-center justify-center">
                  <Crown className="h-6 w-6 mr-2 text-yellow-500" />
                  Premium
                </CardTitle>
                <CardDescription className="text-lg">Recursos completos para profissionais</CardDescription>
                <div className="mt-4">
                  <span className="text-4xl font-bold text-blue-600 dark:text-blue-400">R$ 29</span>
                  <span className="text-gray-600 dark:text-gray-400">/mês</span>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <Check className="h-5 w-5 text-green-500" />
                    <span className="text-gray-700 dark:text-gray-300">
                      <strong>Todos os recursos gratuitos</strong>
                    </span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Check className="h-5 w-5 text-green-500" />
                    <span className="text-gray-700 dark:text-gray-300">Banco de dados na nuvem</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Check className="h-5 w-5 text-green-500" />
                    <span className="text-gray-700 dark:text-gray-300">Histórico completo de contagens</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Check className="h-5 w-5 text-green-500" />
                    <span className="text-gray-700 dark:text-gray-300">Backup automático</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Check className="h-5 w-5 text-green-500" />
                    <span className="text-gray-700 dark:text-gray-300">Acesso de múltiplos dispositivos</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Check className="h-5 w-5 text-green-500" />
                    <span className="text-gray-700 dark:text-gray-300">Relatórios avançados</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Check className="h-5 w-5 text-green-500" />
                    <span className="text-gray-700 dark:text-gray-300">Suporte prioritário</span>
                  </div>
                </div>

                <div className="pt-6">
                  <Link href="/register" className="w-full">
                    <Button className="w-full">
                      <Crown className="h-4 w-4 mr-2" />
                      Assinar Premium
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="text-center mt-12">
            <p className="text-gray-600 dark:text-gray-400">
              💳 Pagamento seguro • 🔒 Cancele quando quiser • 📞 Suporte especializado
            </p>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-blue-600 dark:bg-blue-700">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Pronto para revolucionar seu controle de estoque?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Junte-se a centenas de empresas que já otimizaram sua gestão de estoque
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/register">
              <Button size="lg" variant="secondary" className="px-8 py-4 text-lg font-semibold">
                <Crown className="h-5 w-5 mr-2" />
                Começar com Premium
              </Button>
            </Link>

            <Link href="/">
              <Button
                variant="outline"
                size="lg"
                className="px-8 py-4 text-lg font-semibold border-white text-white hover:bg-white hover:text-blue-600 bg-transparent"
              >
                Testar Grátis
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 dark:bg-gray-950 text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <Package className="h-8 w-8 text-blue-400" />
              <span className="text-xl font-bold">Sistema de Estoque</span>
            </div>

            <div className="text-gray-400 text-sm">© 2024 Sistema de Estoque. Todos os direitos reservados.</div>
          </div>
        </div>
      </footer>
    </div>
  )
}
