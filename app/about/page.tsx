"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Package, Users, Target, Award, Heart, Code, ArrowRight } from "lucide-react"
import Link from "next/link"
import { ThemeToggleButton } from "@/components/theme-toggle-button"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Header */}
      <header className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-b dark:border-gray-700 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/landing" className="flex items-center space-x-2">
              <Package className="h-8 w-8 text-blue-600 dark:text-blue-400" />
              <span className="text-xl font-bold text-gray-900 dark:text-white">Sistema de Estoque</span>
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
                className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                Sistema
              </Link>
              <Link
                href="/about"
                className="text-blue-600 dark:text-blue-400 font-medium hover:text-blue-700 dark:hover:text-blue-300"
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
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <Badge variant="secondary" className="mb-4 px-4 py-2">
              <Heart className="h-4 w-4 mr-2" />
              Nossa História
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              Sobre o Sistema de Estoque
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Desenvolvido com paixão para simplificar a gestão de estoque de pequenas e médias empresas
            </p>
          </div>

          {/* Mission, Vision, Values */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <Card>
              <CardHeader className="text-center">
                <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <Target className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                </div>
                <CardTitle>Nossa Missão</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-300 text-center">
                  Democratizar o acesso a ferramentas profissionais de gestão de estoque, oferecendo soluções simples e
                  eficientes para empresas de todos os tamanhos.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="text-center">
                <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <Award className="h-8 w-8 text-green-600 dark:text-green-400" />
                </div>
                <CardTitle>Nossa Visão</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-300 text-center">
                  Ser a principal referência em sistemas de gestão de estoque no Brasil, reconhecida pela qualidade,
                  inovação e facilidade de uso.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="text-center">
                <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <Heart className="h-8 w-8 text-purple-600 dark:text-purple-400" />
                </div>
                <CardTitle>Nossos Valores</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-300 text-center">
                  Simplicidade, confiabilidade e foco no cliente. Acreditamos que tecnologia deve facilitar, não
                  complicar o dia a dia das empresas.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Story Section */}
          <Card className="mb-16">
            <CardHeader>
              <CardTitle className="text-2xl text-center">Como Tudo Começou</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">O Problema</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    Observamos que muitas pequenas e médias empresas enfrentavam dificuldades para controlar seus
                    estoques de forma eficiente. Planilhas desatualizadas, contagens manuais demoradas e falta de
                    histórico eram problemas recorrentes.
                  </p>
                  <p className="text-gray-600 dark:text-gray-300">
                    As soluções existentes no mercado eram complexas demais ou caras demais para essas empresas.
                  </p>
                </div>
                <div className="p-6 bg-red-50 dark:bg-red-900/20 rounded-lg">
                  <h4 className="font-semibold text-red-800 dark:text-red-200 mb-2">Principais Desafios:</h4>
                  <ul className="text-sm text-red-700 dark:text-red-300 space-y-1">
                    <li>• Contagens manuais demoradas</li>
                    <li>• Planilhas desorganizadas</li>
                    <li>• Falta de histórico</li>
                    <li>• Sistemas caros e complexos</li>
                    <li>• Dificuldade com códigos de barras</li>
                  </ul>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div className="p-6 bg-green-50 dark:bg-green-900/20 rounded-lg">
                  <h4 className="font-semibold text-green-800 dark:text-green-200 mb-2">Nossa Solução:</h4>
                  <ul className="text-sm text-green-700 dark:text-green-300 space-y-1">
                    <li>• Interface simples e intuitiva</li>
                    <li>• Scanner de código de barras integrado</li>
                    <li>• Versão gratuita funcional</li>
                    <li>• Premium acessível</li>
                    <li>• Funciona em qualquer dispositivo</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">A Solução</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    Desenvolvemos um sistema web responsivo que funciona perfeitamente em smartphones, tablets e
                    computadores. Com scanner de código de barras integrado e interface intuitiva.
                  </p>
                  <p className="text-gray-600 dark:text-gray-300">
                    Oferecemos uma versão gratuita totalmente funcional e uma versão premium com recursos avançados por
                    um preço justo.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Technology Section */}
          <Card className="mb-16">
            <CardHeader className="text-center">
              <CardTitle className="flex items-center justify-center">
                <Code className="h-6 w-6 mr-2" />
                Tecnologia de Ponta
              </CardTitle>
              <CardDescription>Construído com as melhores tecnologias modernas</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Frontend</h4>
                  <div className="space-y-2">
                    <Badge variant="outline">Next.js 15</Badge>
                    <Badge variant="outline">React 18</Badge>
                    <Badge variant="outline">TypeScript</Badge>
                    <Badge variant="outline">Tailwind CSS</Badge>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Recursos</h4>
                  <div className="space-y-2">
                    <Badge variant="outline">PWA Ready</Badge>
                    <Badge variant="outline">Responsive Design</Badge>
                    <Badge variant="outline">Dark Mode</Badge>
                    <Badge variant="outline">Offline Support</Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Team Section */}
          <Card className="mb-16">
            <CardHeader className="text-center">
              <CardTitle className="flex items-center justify-center">
                <Users className="h-6 w-6 mr-2" />
                Nossa Equipe
              </CardTitle>
              <CardDescription>Profissionais dedicados ao seu sucesso</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center">
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  Somos uma equipe apaixonada por tecnologia e comprometida em oferecer a melhor experiência para nossos
                  usuários. Cada funcionalidade é pensada e desenvolvida com foco na praticidade e eficiência.
                </p>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="w-20 h-20 bg-blue-100 dark:bg-blue-900/30 rounded-full mx-auto mb-3 flex items-center justify-center">
                      <Code className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                    </div>
                    <h4 className="font-semibold">Desenvolvimento</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Código limpo e eficiente</p>
                  </div>
                  <div className="text-center">
                    <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full mx-auto mb-3 flex items-center justify-center">
                      <Users className="h-8 w-8 text-green-600 dark:text-green-400" />
                    </div>
                    <h4 className="font-semibold">Suporte</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Atendimento especializado</p>
                  </div>
                  <div className="text-center">
                    <div className="w-20 h-20 bg-purple-100 dark:bg-purple-900/30 rounded-full mx-auto mb-3 flex items-center justify-center">
                      <Target className="h-8 w-8 text-purple-600 dark:text-purple-400" />
                    </div>
                    <h4 className="font-semibold">Produto</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Foco na experiência do usuário</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* CTA Section */}
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Pronto para conhecer nosso sistema?
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
              Experimente gratuitamente ou conheça todos os recursos Premium
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/landing">
                <Button size="lg" className="px-8 py-4 text-lg font-semibold">
                  Conhecer o Sistema
                  <ArrowRight className="h-5 w-5 ml-2" />
                </Button>
              </Link>
              <Link href="/contact">
                <Button variant="outline" size="lg" className="px-8 py-4 text-lg font-semibold bg-transparent">
                  Falar Conosco
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
