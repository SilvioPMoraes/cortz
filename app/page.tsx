"use client"

import { SearchIcon } from "lucide-react"
import Header from "./_components/ui/header"
import { Input } from "./_components/ui/input"
import { Button } from "./_components/ui/button"
import { Badge } from "./_components/ui/badge"
import { Avatar } from "./_components/ui/avatar"
import createApiInstance from "./_constants/api.js"
import Image from "next/image"
import { Card, CardContent } from "./_components/ui/card"
import { AvatarImage } from "@radix-ui/react-avatar"
import React, { useEffect, useState } from "react"
import BarbershopItem from "./_components/barbershop-item"

const Home = () => {
  const [barbershop, setBarbershop] = useState([])

  //const barbershops = await fetchData()
  //console.log(barbershops)

  const dados = [
    { id: "1", nome: "Item 1" },
    { id: "2", nome: "Item 2" },
  ]
  //console.log(dados)
  //const dados = fetchData()

  // Função para buscar os dados da API
  async function fetchData() {
    try {
      //console.log("function fetchData")
      //setLoading(true);

      const api = await createApiInstance()

      const authHeader = "Basic " + btoa("SysT@xi:27021970") // Substitua com suas credenciais

      const data = {
        //cpf: user.cpf,
        //situacao: "F",
      }

      const response = await api.get("/barbearia", {
        params: data, // Dados como parâmetros de URL
        headers: {
          Authorization: authHeader, // Cabeçalho de autenticação
        },
      })

      //setLoading(false);
      //setBarbershop(response.data)
      //console.log(response.data)
      setBarbershop(response.data)

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

  //getData()
  //}, [])

  fetchData()

  console.log(barbershop)

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

        {/* Imagem */}
        <div className="relative mt-6 h-[150px] w-full">
          <Image
            alt="Agende nos melhores"
            src="/banner-01.png"
            fill
            className="rounded-xl object-cover"
          />
        </div>

        {/* Agendamento */}
        <h2 className="mb-3 mt-6 text-xs font-bold uppercase text-gray-400">
          Agendamentos
        </h2>
        <Card>
          <CardContent className="flex justify-between p-0">
            {/* Esquerda */}
            <div className="flex flex-col gap-2 py-5 pl-5">
              <Badge className="w-fit">Confirmado</Badge>
              <h3 className="font-semibold">Corte de Cabelo</h3>
              <div className="flex items-center gap-2">
                <Avatar className="h-6 w-6">
                  <AvatarImage src="https://utfs.io/f/c97a2dc9-cf62-468b-a851-bfd2bdde775f-16p.png"></AvatarImage>
                </Avatar>
                <p className="text-sm">Barbearia teste</p>
              </div>
            </div>

            {/* Direita */}
            <div className="flex flex-col items-center justify-center border-l-2 border-solid px-5">
              <p className="text-sm">Agosto</p>
              <p className="text-2xl">05</p>
              <p className="text-sm">20:00</p>
            </div>
          </CardContent>
        </Card>

        {/* Recomendados */}
        <h2 className="mb-3 mt-6 text-xs font-bold uppercase text-gray-400">
          Recomendados
        </h2>
        <div className="flex gap-4 overflow-auto [&::-webkit-scrollbar]:hidden">
          {barbershop.map((barbershop) => (
            <BarbershopItem key={barbershop.id} barbershop={barbershop} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Home
