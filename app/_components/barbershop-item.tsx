import { Badge } from "../_components/ui/badge"
import { StarIcon } from "lucide-react"
import { Button } from "./ui/button"
import { Card, CardContent } from "./ui/card"
import Image from "next/image"
import Link from "next/link"

//interface BarbershopItemProps {
//  barbershop: Barbershop
//}
//const BarbershopItem = ({ barbershop }: BarbershopItemProps) => {
const BarbershopItem = ({ barbershop }) => {
  return (
    <Card className="min-w-[167px] rounded-2xl">
      {/* IMAGEM */}
      <CardContent className="p-0 px-1 pt-1">
        <div className="relative h-[159px] w-full">
          <Image
            alt={barbershop.nome}
            fill
            className="rounded-2xl object-cover"
            src={barbershop.imagem}
          />
          <Badge
            className="absolute left-1 top-1 space-x-1"
            variant="secondary"
          >
            <StarIcon size={12} className="fill-primary text-primary" />
            <p className="text-xs font-semibold">5,0</p>
          </Badge>
        </div>

        {/* TEXTO */}
        <div className="px-1 py-3">
          <h3 className="truncate font-semibold">{barbershop.nome}</h3>
          <p className="truncate text-sm text-gray-400">
            {barbershop.endereco}
          </p>
          <Button variant="secondary" className="mt-3 w-full" asChild>
            <Link href={`/barbershops/${barbershop.id}`}> Reservar</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

export default BarbershopItem
