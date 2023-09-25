import Button from "@/components/Button";
import Image from "next/image";

interface TripLocationProps {
  location: string
  locationDescription: string
}

export default function TripLocation({ location, locationDescription }: TripLocationProps) {
  return (
    <div className="p-5">
      <h2 className="font-semibold text-primaryDarker mb-5">Localização</h2>
      <div className="relative h-[280px] w-full ">
        <Image src="/map-mobile.png" fill alt={location} className="object-cover rounded-lg shadow-md" />
      </div>
      <h3 className="text-primaryDarker text-sm font-semibold mt-3">{location}</h3>
      <p className="text-xs text-primaryDarker mt-2 leading-4">{locationDescription}</p>
      <Button className="w-full mt-5" variant="outlined">Ver no Google Maps</Button>
    </div>
  )
}