"use client"
import Image from "next/image"
import { signIn, signOut, useSession } from "next-auth/react"
import { AiOutlineMenu } from "react-icons/ai"
import { useState } from "react"
import Link from "next/link"

export default function Header() {
  const { status, data } = useSession()
  const [menuIsOpen, setMenuIsOpen] = useState(false)


  const handleLoginClick = () => signIn()
  const handleLogoutClick = () => signOut()

  const handleMenuClick = () => setMenuIsOpen(!menuIsOpen)

  return (
    <div className="container mx-auto p-5 py-0 h-[93px] flex justify-between items-center">
      <Link href="/">
        <div className="relative h-[32px] w-[182px]">

          <Image src="/logoIL.png" alt="logo-png" fill />
        </div>
      </Link>
      {status === "unauthenticated" && (
        <button className="text-primary text-sm font-semibold" onClick={handleLoginClick}>Login</button>
      )}

      {status === "authenticated" && data.user && (
        <div className="flex items-center gap-3 border-grayLighter border rounded-full p-2 px-3 relative">
          <AiOutlineMenu size={16} onClick={handleMenuClick} className="cursor-pointer" />
          <Image width={35} height={35} src={data.user.image!} alt={data.user.name!} className="rounded-full shadow-md select-none" />
          {menuIsOpen && (
            <div className="z-50 absolute top-14 left-0 w-full h-[100px] bg-white rounded-lg shadow-md flex flex-col justify-center items-center">
              <Link href="/my-trips" onClick={() => setMenuIsOpen(false)}>
                <button className="text-primary text-sm font-semibold pb-2 border-b border-grayLighter">Minhas Viagens</button>
              </Link>
              <button className="text-primary text-sm font-semibold pt-2" onClick={handleLogoutClick}>Logout</button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}