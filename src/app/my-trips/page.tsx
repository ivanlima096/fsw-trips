"use client"

import { useEffect, useState } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { TripReservation } from "@prisma/client"
import UserReservationItem from "./components/UserReservationItem"
import Link from "next/link"
import Button from "@/components/Button"


export default function MyTrips() {
  const [reservations, setReservations] = useState<TripReservation[]>([])
  const { status, data } = useSession()
  const router = useRouter()

  const fetchReservations = async () => {
    const response = await fetch(`http://localhost:3000/api/user/${(data?.user as any)?.id}/reservations`)
    const json = await response.json()

    setReservations(json)
  }

  useEffect(() => {
    if (status === "unauthenticated") {
      return router.push("/")
    }

    fetchReservations()
  }, [status])

  return (
    <div className="container mx-auto p-5">
      <h1 className="text-semibold text-primaryDarker text-xl">Minhas Viagens</h1>
      {reservations.length > 0 ? (
        reservations?.map((reservation) => <UserReservationItem fetchReservations={fetchReservations} key={reservation.id} reservation={reservation} />)
      ) : (
        <div className="flex flex-col">
          <p className="text-primaryDarker font-medium mt-5">Você ainda não tem nenhuma viagem =( </p>
          <Link href="/">
            <Button className="w-full mt-5">Fazer Reserva</Button>
          </Link>
        </div>
      )}
    </div>
  )
}