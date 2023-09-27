"use client"

import { useEffect, useState } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { TripReservation } from "@prisma/client"
import UserReservationItem from "./components/UserReservationItem"


export default function MyTrips() {
  const [reservations, setReservations] = useState<TripReservation[]>([])
  const { status, data } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === "unauthenticated" || !data?.user) {
      return router.push("/")
    }
    const fetchReservations = async () => {
      const response = await fetch(`http://localhost:3000/api/user/${(data?.user as any)?.id}/reservations`)
      const json = await response.json()

      setReservations(json)
    }

    fetchReservations()
  }, [status])

  return (
    <div className="container mx-auto p-5">
      <h1 className="text-semibold text-primaryDarker text-xl">Minhas Viagens</h1>
      {reservations.map((reservation) => <UserReservationItem key={reservation.id} reservation={reservation} />)}
    </div>
  )
}