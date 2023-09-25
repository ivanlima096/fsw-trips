"use client"
import Button from "@/components/Button";
import DatePicker from "@/components/DatePicker";
import Input from "@/components/Input";
import { Trip } from "@prisma/client";
import { useForm, Controller } from "react-hook-form";

interface TripReservationProps {
  trip: Trip
}

interface TripReservationForm {
  guests: number,
  startDate: Date | null
  endDate: Date | null
}

export default function TripReservation({ trip }: TripReservationProps) {
  const { register, handleSubmit, formState: { errors }, control } = useForm<TripReservationForm>()

  const onSubmit = (data: any) => {

  }
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
            />
          )}
        />

      </div>

      <Input {...register("guests", {
        required: {
          value: true,
          message: "Número de hóspedes é obrigatório.",
        },
      })}
        error={!!errors?.guests}
        errorMessage={errors?.guests?.message}
        placeholder={`Número de hóspedes (máx. ${trip.maxGuests})`} className="mt-4" />
      <div className="flex justify-between mt-3">
        <p className="font-medium text-sm text-primaryDarker">Total( X Noites)</p>
        <p className="font-medium text-sm text-primaryDarker">R$ 2500,00</p>
      </div>
      <div className="pb-10 border-b border-grayLighter w-full">

        <Button onClick={() => handleSubmit(onSubmit)()} className="mt-3 w-full"> Reservar Agora</Button>
      </div>
    </div>
  )
}