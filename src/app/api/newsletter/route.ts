import { NextRequest, NextResponse } from "next/server"
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

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json()

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { error: "Correo electrónico inválido" },
        { status: 400 }
      )
    }

    const emails = readEmails()

    if (emails.includes(email)) {
      return NextResponse.json(
        { message: "Ya estás suscrito. ¡Gracias!" },
        { status: 200 }
      )
    }

    emails.push(email)
    writeEmails(emails)

    console.log(`📧 Nuevo suscriptor: ${email} (total: ${emails.length})`)

    return NextResponse.json(
      { message: "¡Suscripción exitosa! Revisa tu email." },
      { status: 200 }
    )
  } catch (error) {
    console.error("Newsletter error:", error)
    return NextResponse.json(
      { error: "Error al procesar la suscripción" },
      { status: 500 }
    )
  }
}
