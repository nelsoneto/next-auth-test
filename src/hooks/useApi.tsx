import { nextAuthOptions } from "@/app/api/auth/[...nextauth]/route";
import axios, { AxiosRequestConfig } from "axios";
import { getServerSession } from "next-auth";
import { useEffect, useState } from "react";

export function useApi(url: string, coptions?: AxiosRequestConfig) {
  const session = getServerSession(nextAuthOptions);
  const [data, setData] = useState(null);

  useEffect(() => {
    axios
      .get(`https://testemobile.smartinform.com.br/public/pessoas/`, {
        headers: { Authorization: `Baarer` },
      })
      .then((response) => {
        setData(response.data);
      });
  }, []);

  return { data };
}
