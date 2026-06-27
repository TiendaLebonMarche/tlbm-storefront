"use server"

import { redirect } from "next/navigation"
import fs from "fs"
import path from "path"

const DATA_DIR = path.join(process.cwd(), "data")
const DATA_FILE = path.join(DATA_DIR, "newsletter-emails.json")

function readEmails(): string[] {
  try {
    if (!fs.existsSync(DATA_FILE)) return []
    const data = fs.readFileSync(DATA_FILE, "utf-8")
    return JSON.parse(data)
  } catch {
    return []
  }
}

function writeEmails(emails: string[]) {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true })
  }
  fs.writeFileSync(DATA_FILE, JSON.stringify(emails, null, 2))
}

export async function subscribeToNewsletter(formData: FormData) {
  const email = formData.get("email")?.toString().trim() || ""
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://www.tiendalebonmarche.com"

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    redirect(`${baseUrl}/co?error=true&message=${encodeURIComponent("Correo electrónico inválido")}`)
  }

  const emails = readEmails()

  if (emails.includes(email)) {
    redirect(`${baseUrl}/co?success=true&message=${encodeURIComponent("Ya estás suscrito. ¡Gracias!")}`)
  }

  emails.push(email)
  writeEmails(emails)
  console.log(`📧 Nuevo suscriptor: ${email} (total: ${emails.length})`)

  redirect(`${baseUrl}/co?success=true&message=${encodeURIComponent("¡Suscripción exitosa! Revisa tu email.")}`)
}
