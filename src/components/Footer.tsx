import Image from "next/image";

export default function Footer() {
  return (
    <div className="bg-walterWhite p-5 justify-center flex flex-col items-center">
      <Image src="/logoIL.png" alt="logo" width={133} height={133} />
      <p className="text-sm font-medium text-primaryDarker mt-2">Todos os direitos reservados.</p>
    </div>
  )
}