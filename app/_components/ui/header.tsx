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
import SidebarSheet from "./sidebar-sheet"

const Header = () => {
  return (
    <Card>
      <CardContent className="flex flex-row items-center justify-between p-3">
        <Image alt="FWS Barber" src="/logo.png" height={50} width={50} />
        <h1 className="text-left text-xl font-extrabold">CortZ</h1>
        <h3 className="text-left text-base font-light">
          Barbershop Solution                          
        </h3>

        <Sheet>
          <SheetTrigger asChild>
            <Button size="icon" variant="outline">
              <MenuIcon />
            </Button>
          </SheetTrigger>
          <SidebarSheet />
        </Sheet>
      </CardContent>
    </Card>
  )
}

export default Header
