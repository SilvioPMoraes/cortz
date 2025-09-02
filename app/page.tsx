"use client"

import { SearchIcon } from "lucide-react"
import Header from "./_components/ui/header"
import { Input } from "./_components/ui/input"
import { Button } from "./_components/ui/button"
import Image from "next/image"
import React, { useEffect, useState } from "react"
import BarbershopItem from "./_components/barbershop-item"
import BookingItem from "./_components/booking-item"
import { quickSearchOptions } from "./_constants/search"

const Home = () => {
  const [servico, setServico] = useState([])
  const [barbearia, setBarbearia] = useState([])
  const [popular, setPopular] = useState([])

  async function fechservico() {
    try {
      const response = await fetch("/api/usuario")
      const data = await response.json()
      setServico(data)
      console.log("Dados do serviço:", data)
    } catch (error) {
      console.log("Erro no fechservico:", error)
    }
  }

  async function fechbarbearia() {
    try {
      const response = await fetch("/api/barbearia?tipo=T")
      const data = await response.json()
      setBarbearia(data)
      console.log("Dados do fechbarbearia:", data)
    } catch (error) {
      console.log("Erro no fechbarbearia:", error)
    }
  }

  async function fechpopular() {
    try {
      const response = await fetch("/api/barbearia?tipo=X")
      const data = await response.json()
      setPopular(data)
      console.log("Dados do fechbarbearia:", data)
    } catch (error) {
      console.log("Erro no fechbarbearia:", error)
    }
  }

  // Chama a função fetchUsuarios ao montar o componente
  useEffect(() => {
    fechservico()
    fechbarbearia()
    fechpopular()
  }, [])

  return (
    <div>
      <Header />
      <div className="p-5">
        {/* Texto */}
        <h2 className="text-xl font-bold">Olá, Silvio!</h2>
        <p>Segunda-feira, 25 de agosto.</p>

        {/* Busca */}
        <div className="mt-6 flex items-center gap-2">
          <Input placeholder="faça sua busca..."></Input>
          <Button>
            <SearchIcon />
          </Button>
        </div>

        {/* BUSCA RAPIDA */}
        <div className="mt-6 flex gap-3 overflow-x-scroll [&::-webkit-scrollbar]:hidden">
          {quickSearchOptions.map((option) => (
            <Button className="gap-2" variant="secondary" key={option.title}>
              <Image
                alt={option.title}
                src={option.imageUrl}
                width={16}
                height={16}
              />
              {option.title}
            </Button>
          ))}
        </div>

        {/* IMAGEM */}
        <div className="relative mt-6 h-[150px] w-full">
          <Image
            alt="Agende nos melhores"
            src="/banner-01.png"
            fill
            className="rounded-xl object-cover"
          />
        </div>

        {/* AGENDAMENTO */}
        <BookingItem />

        {/* RECOMENDADOS */}
        <h2 className="mb-3 mt-6 text-xs font-bold uppercase text-gray-400">
          Recomendados
        </h2>
        <div className="flex gap-4 overflow-auto [&::-webkit-scrollbar]:hidden">
          {barbearia.map((barbershop) => (
            <BarbershopItem key={barbershop.id} barbershop={barbershop} />
          ))}
        </div>

        {/* POPULARES */}
        <h2 className="mb-3 mt-6 text-xs font-bold uppercase text-gray-400">
          Populares
        </h2>
        <div className="flex gap-4 overflow-auto [&::-webkit-scrollbar]:hidden">
          {popular.map((barbershop) => (
            <BarbershopItem key={barbershop.id} barbershop={barbershop} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Home
