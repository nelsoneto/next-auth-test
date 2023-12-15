import ButtonLogout from "@/components/ButtonLogout";
import { getServerSession } from "next-auth";
import { nextAuthOptions } from "@/app/api/auth/[...nextauth]/route";
import { useState } from "react";

export const metadata = {
  title: "Home",
};

export default async function Admin() {
  const session = await getServerSession(nextAuthOptions);

  const response = await fetch(
    `https://testemobile.smartinform.com.br/public/pessoas/${session?.empresa}/${session?.codigoUsuario}`,
    {
      headers: {
        Authorization: `Bearer ${session?.token}`,
      },
    }
  );
  const user = await response.json();

  return (
    <div className="w-full h-screen flex flex-col items-center justify-center">
      <h1 className="text-2xl mb-8">{session?.message}</h1>
      <h2>Cod empresa:{session?.empresa}</h2>
      <h2>Cod usuário:{session?.codigoUsuario}</h2>

      <p>{JSON.stringify(user, null)}</p>
      <p>{JSON.stringify(user, null)}</p>
      <p>{JSON.stringify(user, null)}</p>

      <ButtonLogout />
    </div>
  );
}
