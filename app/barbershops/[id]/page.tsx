"use client"

import createApiInstance from "../../_constants/api.js"
import React, { useEffect, useState } from "react"
import Image from "next/image"
import { Button } from "../../_components/ui/button"
import {
  ChevronLeftIcon,
  MapPinIcon,
  MenuIcon,
  SmartphoneIcon,
  StarIcon,
} from "lucide-react"
import Link from "next/link"
import ServiceItem from "../../_components/service-item"
import PhoneItem from "../../_components/phone-item"
import SidebarSheet from "../../_components/ui/sidebar-sheet"

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../../_components/ui/sheet"

const BarbershopPage = ({ params }) => {
  const [loading, setLoading] = useState(true)
  const [barbearia, setBarbearia] = useState(null)
  const [servico, setServico] = useState(null)

  async function fechbarbearia() {
    try {
      const response = await fetch(`/api/barbearia?tipo=T&id=${params.id}`)
      const data = await response.json()

      //;;const dados = Array.isArray(response.data)
      //    ? response.data[0]
      //   : response.data

      setBarbearia(data[0])
      console.log("Dados do fechbarbearia:", data)
    } catch (error) {
      console.log("Erro no fechbarbearia:", error)
    }
  }

  async function fechservico() {
    try {
      const response = await fetch(`/api/servico?id=${params.id}`)
      const data = await response.json()
      setServico(data)
      console.log("Dados do fechbarbearia:", data)
    } catch (error) {
      console.log("Erro no fechbarbearia:", error)
    }
  }

  useEffect(() => {
    fechbarbearia()
    fechservico()

    if (params?.id) {
      console.log("🔍 Buscando dados da barbearia:", params.id)

      // Chama as duas funções de busca em paralelo
      Promise.all([fechbarbearia(), fechservico()]).finally(() =>
        setLoading(false),
      ) // Garantir que setLoading false seja chamado após ambas as requisições
    }
  }, [params?.id]) // Roda quando o ID mudar

  if (loading) return <p>Carregando...</p>
  if (!barbearia) return <p>Barbearia não encontrada</p>

  return (
    <div>
      {/* 
      <p>babrbearia ( {barbearia.length} )</p>
      <p>servicos ( {servico.length} )</p>
      
      <div>
        {servico.map((item, index) => (
          <div
            key={index}
            style={{ marginBottom: 20, border: "1px solid #ccc", padding: 10 }}
          >
            {Object.entries(item).map(([chave, valor]) => (
              <p key={chave}>
                <strong>{chave}:</strong> {valor.toString()}
              </p>
            ))}
          </div>
        ))}
      </div>
     
      <div>
        {servicos.map((item, index) => (
          <div
            key={index}
            style={{ marginBottom: 20, border: "1px solid #ccc", padding: 10 }}
          >
            {Object.entries(item).map(([chave, valor]) => (
              <p key={chave}>
                <strong>{chave}:</strong> {valor.toString()}
              </p>
            ))}
          </div>
        ))}
      </div>
*/}
      {/* IMAGEM */}
      <div className="relative h-[250px] w-full">
        <Image
          alt={barbearia.nome}
          src={barbearia.imagem}
          fill
          className="object-cover"
        />

        <Button
          size="icon"
          variant="secondary"
          className="absolute left-4 top-4"
          asChild
        >
          <Link href="/">
            <ChevronLeftIcon />
          </Link>
        </Button>

        <Sheet>
          <SheetTrigger asChild>
            <Button
              size="icon"
              variant="outline"
              className="absolute right-4 top-4"
            >
              <MenuIcon />
            </Button>
          </SheetTrigger>
          <SidebarSheet />
        </Sheet>
      </div>

      {/* TITULO */}
      <div className="border-b border-solid p-5">
        <h1 className="font-bol mb-3 text-xl">{barbearia.nome}</h1>
        <div className="mb-3 flex items-center gap-2">
          <MapPinIcon className="text-primary" size={18} />
          <p className="text-sm">{barbearia.endereco}</p>
        </div>
        <div className="mb-2 flex items-center gap-2">
          <StarIcon className="fill-primary text-primary" size={18} />
          <p className="text-sm">5.0 ( 498 avaliações )</p>
        </div>
      </div>

      {/* DESCRIÇÃO */}
      <div className="boroder-solid space-y-2 border-b p-5">
        <h2 className="text-xs font-bold uppercase text-gray-400">Sobre Nós</h2>
        <p className="text-justify text-sm">{barbearia.descricao}</p>
      </div>

      {/* SERVIÇOS */}
      <div className="boroder-solid space-y-3 border-b p-5">
        <h2 className="mb-3 text-xs font-bold uppercase text-gray-400">
          Serviços
        </h2>
        <div className="space-y-3">
          {servico && servico.length > 0 ? (
            servico.map((dados) => (
              <ServiceItem key={dados.id} servico={dados} />
            ))
          ) : (
            <p>Sem serviços disponíveis.</p>
          )}
        </div>
      </div>

      {/* CONTATO */}
      <div className="boroder-solid space-y-3 border-b p-5">
        <h2 className="mb-3 text-xs font-bold uppercase text-gray-400">
          Contato
        </h2>

        <div className="space-y-3 p-5">
          <PhoneItem key={barbearia.telefone} phone={barbearia.telefone} />
          <PhoneItem key={barbearia.celular} phone={barbearia.celular} />
        </div>
      </div>
    </div>
  )
}

export default BarbershopPage
