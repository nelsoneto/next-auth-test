import { nextAuthOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";

export default async function getData() {
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
  return user;
}
