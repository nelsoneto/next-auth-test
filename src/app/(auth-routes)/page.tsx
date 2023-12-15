"use client";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { SyntheticEvent, useState } from "react";

export default function Home() {
  const [cnpj, setCnpj] = useState<string>("");
  const [matricula, setMatricula] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const router = useRouter();

  async function handleSubmit(event: SyntheticEvent) {
    event.preventDefault();

    const result = await signIn("credentials", {
      cnpj,
      matricula,
      password,
      // para não redirecionar automaticamente
      redirect: false,
    });

    if (result?.error) {
      console.log(result);
      return alert(result.error);
    }

    // porque replace ao inves de navigation do next? pq não cria histórico de navegação quando clicar para voltar a pagina
    router.replace("/admin/dashboard/");
  }

  return (
    <div className="flex flex-col items-center justify-center w-full h-screen">
      <h1 className="text-3xl mb-6 font-medium">Login</h1>

      <form className="w-[400px] flex flex-col gap-6" onSubmit={handleSubmit}>
        <input
          className="h-12 rounded-md p-2 bg-transparent border border-gray-300"
          type="text"
          name="email"
          placeholder="CNPJ"
          onChange={(e) => setCnpj(e.target.value)}
        />

        <input
          className="h-12 rounded-md p-2 bg-transparent border border-gray-300"
          type="number"
          name="matricula"
          placeholder="Matricula"
          onChange={(e) => setMatricula(e.target.value)}
        />

        <input
          className="h-12 rounded-md p-2 bg-transparent border border-gray-300"
          type="password"
          name="password"
          placeholder="Digite sua senha"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          type="submit"
          className="h-12 rounded-md font-semibold text-[18px] bg-blue-500 text-gray-200 hover:bg-gray-200 hover:text-blue-500"
        >
          Entrar
        </button>
      </form>
    </div>
  );
}
