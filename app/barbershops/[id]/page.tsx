"use client"

import createApiInstance from "../../_constants/api.js"
import React, { useEffect, useState } from "react"
import Image from "next/image"
import { Button } from "../../_components/ui/button"
import { ChevronLeftIcon, MapPinIcon, MenuIcon, StarIcon } from "lucide-react"
import Link from "next/link"
import ServiceItem from "../../_components/service-item"

const BarbershopPage = ({ params }) => {
  const [barber, setBarber] = useState(null)
  const [servicos, setServicos] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function buscadados() {
      try {
        const api = await createApiInstance()
        const authHeader = "Basic " + btoa("SysT@xi:27021970")

        const response = await api.get(`/barbearia/${params.id}/D`, {
          headers: { Authorization: authHeader },
        })

        console.log("📌 resposta da API:", response.data)

        // Se sua API retorna array, pega o primeiro item
        const dados = Array.isArray(response.data)
          ? response.data[0]
          : response.data

        setBarber(dados)
      } catch (error) {
        console.error("Erro ao buscar barbearia:", error)
      }
    }

    async function buscaservicos() {
      try {
        const api = await createApiInstance()
        const authHeader = "Basic " + btoa("SysT@xi:27021970")

        const response = await api.get(`/servico/${params.id}`, {
          headers: { Authorization: authHeader },
        })
        console.log("📌 resposta dos serviços:", response.data)

        const dados = Array.isArray(response.data)
          ? response.data
          : [response.data] // Garante que seja um array, mesmo que tenha um único serviço

        setServicos(dados)
      } catch (error) {
        console.error("Erro ao buscar serviços da barbearia:", error)
      }
    }

    if (params?.id) {
      console.log("🔍 Buscando dados da barbearia:", params.id)

      // Chama as duas funções de busca em paralelo
      Promise.all([buscadados(), buscaservicos()]).finally(() =>
        setLoading(false),
      ) // Garantir que setLoading false seja chamado após ambas as requisições
    }
  }, [params?.id]) // Roda quando o ID mudar

  if (loading) return <p>Carregando...</p>
  if (!barber) return <p>Barbearia não encontrada</p>

  return (
    <div>
      {/* IMAGEM */}
      <div className="relative h-[250px] w-full">
        <Image
          alt={barber.nome}
          src={barber.imagem}
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

        <Button
          size="icon"
          variant="secondary"
          className="absolute right-4 top-4"
        >
          <MenuIcon />
        </Button>
      </div>

      <div className="border-b border-solid p-5">
        <h1 className="font-bol mb-3 text-xl">{barber.nome}</h1>
        <div className="mb-3 flex items-center gap-2">
          <MapPinIcon className="text-primary" size={18} />
          <p className="text-sm">{barber.endereco}</p>
        </div>
        <div className="mb-2 flex items-center gap-2">
          <StarIcon className="fill-primary text-primary" size={18} />
          <p className="text-sm">5.0 ( 498 avaliações )</p>
        </div>
      </div>

      {/* DESCRIÇÃO */}
      <div className="boroder-solid space-y-2 border-b p-5">
        <h2 className="text-xs font-bold uppercase text-gray-400">Sobre Nós</h2>
        <p className="text-justify text-sm">{barber.descricao}</p>
      </div>

      {/* SERVIÇOS */}
      <div className="boroder-solid space-y-3 border-b p-5">
        <h2 className="mb-3 text-xs font-bold uppercase text-gray-400">
          Serviços
        </h2>
        <div className="space-y-3">
          {servicos && servicos.length > 0 ? (
            servicos.map((dados) => (
              <ServiceItem key={dados.id} servico={dados} />
            ))
          ) : (
            <p>Sem serviços disponíveis.</p>
          )}
        </div>
      </div>
    </div>
  )
}

export default BarbershopPage
