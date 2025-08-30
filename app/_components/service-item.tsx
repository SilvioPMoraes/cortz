import { Badge } from "../_components/ui/badge"
import { StarIcon } from "lucide-react"
import { Button } from "./ui/button"
import { Card, CardContent } from "./ui/card"
import Image from "next/image"
import Link from "next/link"

const ServiceItem = ({ servico }) => {
  return (
    <Card>
      <CardContent className="flex items-center gap-3 p-3">
        {/* IMAGEM */}
        <div className="relative max-h-[110px] min-h-[110px] min-w-[110px] max-w-[110px]">
          <Image
            alt={servico.nome}
            src={servico.imagem}
            fill
            className="rounded-lg object-cover"
          />
        </div>

        {/* DIREITA */}
        <div className="space-y-2">
          <h3 className="text-sm font-semibold">{servico.nome}</h3>
          <p className="text-sm text-gray-400">{servico.descricao}</p>

          {/* PREÇO E BOTAO */}
          <div className="flex items-center justify-between">
            <p className="font-sm font-bold text-primary">
              {Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRL",
              }).format(servico.preco)}
            </p>
            <Button variant={"secondary"} size="sm">
              Reservar
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default ServiceItem
