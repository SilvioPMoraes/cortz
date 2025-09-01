import Image from "next/image"
import { CardContent, Card } from "../ui/card"
import { Button } from "../ui/button"
import { Calendar, HomeIcon, LogOut, MenuIcon } from "lucide-react"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./sheet"
import { quickSearchOptions } from "../../_constants/search"
import { Avatar, AvatarImage } from "../ui/avatar"
import Link from "next/link"

const Header = () => {
  return (
    <Card>
      <CardContent className="flex flex-row items-center justify-between">
        <Image alt="FWS Barber" src="/logo.png" height={18} width={120} />

        <Sheet>
          <SheetTrigger asChild>
            <Button size="icon" variant="outline">
              <MenuIcon />
            </Button>
          </SheetTrigger>
          <SheetContent className="overscroll-y-auto">
            <SheetHeader>
              <SheetTitle className="text-left">Menu</SheetTitle>
            </SheetHeader>

            <div className="flex items-center gap-3 border-b border-solid p-5 py-5">
              <Avatar>
                <AvatarImage src="https://plus.unsplash.com/premium_photo-1664536392779-049ba8fde933?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"></AvatarImage>
              </Avatar>
              <div>
                <p className="font-bold"> Silvio Moraes</p>
                <p className="text-xs">silvio.p.moraes@gmail.com</p>
              </div>
            </div>

            <div className="flex flex-col gap-4 border-b border-solid p-5 py-5">
              <SheetClose asChild>
                <Button className="justify-start gap-2" variant="ghost" asChild>
                  <Link href="/">
                    <HomeIcon size={18} />
                    Inicio
                  </Link>
                </Button>
              </SheetClose>
              <Button className="justify-start gap-2" variant="ghost">
                {" "}
                <Calendar size={18} />
                Agendamentos
              </Button>
            </div>

            <div className="flex flex-col gap-4 border-b border-solid p-5 py-5">
              {quickSearchOptions.map((option) => (
                <Button
                  className="justify-start gap-2"
                  variant="ghost"
                  key={option.title}
                >
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

            <div className="flex flex-col gap-4 border-b border-solid p-5 py-5">
              <Button className="justify-start gap-2" variant="ghost">
                <LogOut size={18} />
                Sair da conta
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </CardContent>
    </Card>
  )
}

export default Header
