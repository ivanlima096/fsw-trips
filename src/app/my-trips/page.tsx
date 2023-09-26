"use client"

import { useEffect, useState } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { TripReservation } from "@prisma/client"


export default function MyTrips() {
  const [reservations, setReservations] = useState<TripReservation[]>([])
  const { status, data } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === "unauthenticated" || !data?.user) {
      return router.push("/")
    }
    const fetchReservations = async () => {
      const response = await fetch(`http://localhost:300/api/user/${(data?.user as any)?.id}/reservations`)
      const json = await response.json()

      setReservations(json)
    }

    fetchReservations()
  }, [status])

  return (
    <div>
      My trips
    </div>
  )
}