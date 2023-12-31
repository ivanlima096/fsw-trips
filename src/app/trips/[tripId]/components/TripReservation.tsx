"use client"

import Button from "@/components/Button";
import DatePicker from "@/components/DatePicker";
import Input from "@/components/Input";
import { differenceInDays, set } from "date-fns";
import { useRouter } from "next/navigation";
import { useForm, Controller } from "react-hook-form";

interface TripReservationProps {
  tripId: string
  tripStartDate: Date
  tripEndDate: Date
  maxGuests: any
  pricePerDay: any
}

interface TripReservationForm {
  guests: Number,
  startDate: Date | null
  endDate: Date | null
}

export default function TripReservation({ tripId, tripStartDate, tripEndDate, maxGuests, pricePerDay }: TripReservationProps) {
  const { register, handleSubmit, formState: { errors }, control, watch, setError } = useForm<TripReservationForm>()

  const router = useRouter()

  const onSubmit = async (data: TripReservationForm) => {
    const response = await fetch("http://localhost:3000/api/trips/check", {
      method: "POST",
      body: Buffer.from(JSON.stringify({
        startDate: data.startDate,
        endDate: data.endDate,
        tripId,
      }))
    })
    const res = await response.json()

    if (res?.error?.code === "TRIP_ALREADY_RESERVED") {
      setError("startDate", {
        type: "manual",
        message: "Esta data já está reservada."
      })
      return setError("endDate", {
        type: "manual",
        message: "Esta data já está reservada."
      })
    }

    if (res?.error?.code === "INVALID_START_DATE") {
      return setError("startDate", {
        type: "manual",
        message: "Data inválida."
      })
    }
    if (res?.error?.code === "INVALID_END_DATE") {
      return setError("endDate", {
        type: "manual",
        message: "Data inválida."
      })
    }
    router.push(`/trips/${tripId}/confirmation?startDate=${data.startDate?.toISOString()}&endDate=${data.endDate?.toISOString()}&guests=${data.guests}`)
  }



  const startDate = watch("startDate")
  const endDate = watch("endDate")

  return (
    <div className="flex flex-col px-5">
      <div className="flex gap-4">
        <Controller
          name="startDate"
          rules={{
            required: {
              value: true,
              message: "Data inicial é obrigatória"
            },
          }}
          control={control}
          render={({ field }) => (
            <DatePicker
              error={!!errors?.startDate}
              errorMessage={errors?.startDate?.message}
              placeholderText="Data de Início"
              onChange={field.onChange}
              selected={field.value}
              className="w-full"
              minDate={tripStartDate}
            />
          )}
        />
        <Controller
          name="endDate"
          rules={{
            required: {
              value: true,
              message: "Data final é obrigatória"
            },
          }}
          control={control}
          render={({ field }) => (
            <DatePicker
              error={!!errors?.endDate}
              errorMessage={errors?.endDate?.message}
              placeholderText="Data Final"
              onChange={field.onChange}
              selected={field.value}
              className="w-full"
              maxDate={tripEndDate}
              minDate={startDate ?? tripStartDate}
            />
          )}
        />

      </div>

      <Input {...register("guests", {
        required: {
          value: true,
          message: "Número de hóspedes é obrigatório.",
        },
        max: {
          value: maxGuests,
          message: `Número de hóspedes não pode ser maior que ${maxGuests}`
        }
      })}
        error={!!errors?.guests}
        errorMessage={errors?.guests?.message}
        placeholder={`Número de hóspedes (máx. ${maxGuests})`} className="mt-4"
        type="number"
        min="1"
      />
      <div className="flex justify-between mt-3">
        <p className="font-medium text-sm text-primaryDarker">Total
          {startDate && endDate ? `(${differenceInDays(endDate, startDate)} noites)` : ""}
        </p>
        <p className="font-medium text-sm text-primaryDarker">
          {startDate && endDate ? `R$${differenceInDays(endDate, startDate) * pricePerDay}` ?? 1 : "R$0"}
        </p>
      </div>
      <div className="pb-10 border-b border-grayLighter w-full">

        <Button onClick={() => handleSubmit(onSubmit)()} className="mt-3 w-full"> Reservar Agora</Button>
      </div>
    </div>
  )
}