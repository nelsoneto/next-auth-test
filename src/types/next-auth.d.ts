import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    codigoUsuario: number;
    licenca: number;
    success: boolean;
    empresa: string;
    nomeEmpresa: string;
    razaoSocial: string;
    message: string;
    token: string;
  }
}
