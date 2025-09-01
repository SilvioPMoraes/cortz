"use client"

import { SearchIcon } from "lucide-react"
import Header from "./_components/ui/header"
import { Input } from "./_components/ui/input"
import { Button } from "./_components/ui/button"
import createApiInstance from "./_constants/api.js"
import Image from "next/image"
import React, { useEffect, useState } from "react"
import BarbershopItem from "./_components/barbershop-item"
import BookingItem from "./_components/booking-item"
import { quickSearchOptions } from "./_constants/search"

const Home = () => {
  const [barbershop, setBarbershop] = useState([])
  const [barbershoppopular, setBarbershoppopular] = useState([])

  async function Barbearias() {
    try {
      const api = await createApiInstance()
      const authHeader = "Basic " + btoa("SysT@xi:27021970") // Substitua com suas credenciais
      //const data = {
      //  id: "0",
      //  tipo: "T",
      // }
      const response = await api.get("/barbearia/0/T", {
        // params: data, // Dados como parâmetros de URL
        headers: {
          Authorization: authHeader, // Cabeçalho de autenticação
        },
      })
      console.log(response.data)
      setBarbershop(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  async function Pupulares() {
    try {
      //console.log("function fetchData")
      //setLoading(true);

      const api = await createApiInstance()

      const authHeader = "Basic " + btoa("SysT@xi:27021970") // Substitua com suas credenciais

      //const data = {
      //  id: 0,
      //  tipo: "P",
      //}

      const response = await api.get("/barbearia/0/P", {
        headers: {
          Authorization: authHeader, // Cabeçalho de autenticação
        },
      })

      //setLoading(false);
      //setBarbershop(response.data)
      //console.log(response.data)
      setBarbershoppopular(response.data)

      //setLista( response.data );
      //setModalText(response.data);
      //showOkModal();
    } catch (error) {
      //setLoading(false);
      console.log(error)

      //      if (error.response?.data.error) {
      //      setModalType('ok'); // Modal com "Sim" e "Não"
      //    setModalText(error.response.data.error);
      //  setModalVisible(true);
      //    } else {
      //setModalType('ok'); // Modal com "Sim" e "Não"
      //setModalText("Ocorreu um erro, tente novamente mais tarde...");
      //setModalVisible(true);;
      //  }
    }
  }

  // useEffect para chamar a API ao carregar a tela
  //useEffect(() => {
  //const getData = async () => {
  //  const barbershops = await fetchData()
  //  setBarbershop(barbershops)
  //}

  Barbearias()
  Pupulares()

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
          {barbershop.map((barbershop) => (
            <BarbershopItem key={barbershop.id} barbershop={barbershop} />
          ))}
        </div>

        {/* POPULARES */}
        <h2 className="mb-3 mt-6 text-xs font-bold uppercase text-gray-400">
          Populares
        </h2>
        <div className="flex gap-4 overflow-auto [&::-webkit-scrollbar]:hidden">
          {barbershoppopular.map((barbershop) => (
            <BarbershopItem key={barbershop.id} barbershop={barbershop} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Home
