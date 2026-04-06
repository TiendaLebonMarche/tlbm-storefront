import { Metadata } from "next"

import LoginTemplate from "@modules/account/templates/login-template"

export const metadata: Metadata = {
  title: "Iniciar sesi\u00f3n",
  description: "Inicia sesi\u00f3n en tu cuenta de Le Bon March\u00e9.",
}

export default function Login() {
  return <LoginTemplate />
}
