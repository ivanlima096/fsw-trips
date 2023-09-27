import Image from "next/image"
import { Prisma } from "@prisma/client"
import ReactCountryFlag from "react-country-flag"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import Button from "@/components/Button"
import { toast } from "react-toastify"
import { useRouter } from "next/navigation"

interface UserReservationItemProps {
  reservation: Prisma.TripReservationGetPayload<{
    include: { trip: true }
  }>
}

export default function UserReservationItem({ reservation }: UserReservationItemProps) {
  const router = useRouter()
  const { trip } = reservation

  const handleDeleteClick = async () => {
    const res = await fetch(`api/trips/reservation/${reservation.id}`, {
      method: "DELETE"
    })

    if (!res.ok) {
      return toast.error("Ocorreu um erro ao cancelar a reserva. Tente novamente!")
    }

    toast.success("Reserva cancelada com sucesso!")
    router.replace("/")
  }

  return (
    <div>
      <div className="flex flex-col p-5 mt-5 border-grayLighter border-solid border shadow-lg rounded-lg">
        <div className="flex items-center gap-3 pb-5 border-b border-grayLighter border-solid">
          <div className="relative h-[106px] w-[124px]">
            <Image src={trip.coverImage} fill alt={trip.name} className="object-cover rounded-lg " />
          </div>
          <div className="flex flex-col">
            <h2 className="text-xl text-primaryDarker font-semibold">{trip.name}</h2>
            <div className="flex items-center gap-1">
              <ReactCountryFlag countryCode={trip.contryCode} svg />
              <p className="text-xs text-grayPrimary">{trip.location}</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col mt-5 text-primaryDarker">
          <h3 className="text-sm">Data</h3>
          <div className="flex items-center gap-1">
            <p className="text-sm">{format(new Date(reservation.startDate), "dd 'de' MMMM", { locale: ptBR })}</p>
            {" - "}
            <p className="text-sm">{format(new Date(reservation.endDate), "dd 'de' MMMM", { locale: ptBR })}</p>
          </div>
          <h3 className=" mt-5 text-sm">Hóspedes</h3>
          <p className="text-sm pb-5">{reservation.guests} hóspedes</p>

          <h3 className="font-semibold  text-primaryDarker mt-3 pt-5 border-t border-grayLighter">
            Informações sobre o preço
          </h3>
          <div className="flex justify-between mt-1">
            <p className="text-primaryDarker text-sm mt-2">Total:</p>
            <p className="font-medium text-primaryDarker text-sm">R$ {Number(reservation.totalPaid)}</p>
          </div>

          <Button variant="danger" className="mt-5" onClick={handleDeleteClick}>Cancelar</Button>

        </div>

      </div>
    </div>
  )
}