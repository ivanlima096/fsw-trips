"use client";

import { signIn, useSession, signOut } from "next-auth/react";

export default function Home() {
  const { data } = useSession()
  return (
    <div>
      <h1>Hello</h1>
    </div>
  )
}
