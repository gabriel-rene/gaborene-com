"use server"

const LEVELS = ["student", "junior", "mid", "senior"] as const
export type Level = (typeof LEVELS)[number]

export type PreregisterValues = { name: string; email: string; level: string; interest: string }

// Failed submissions carry the values back so the form can refill itself
export type PreregisterState =
  | { status: "idle" | "success" }
  | { status: "invalid" | "error"; values: PreregisterValues }

// One hash per workshop, keyed by email, so signing up twice updates the entry
const STORAGE_KEY = "preregister:tu-primer-stack"
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function isLevel(value: string): value is Level {
  return (LEVELS as readonly string[]).includes(value)
}

function field(formData: FormData, name: string): string {
  const value = formData.get(name)
  return typeof value === "string" ? value.trim() : ""
}

export async function preregister(
  _previous: PreregisterState,
  formData: FormData,
): Promise<PreregisterState> {
  // Honeypot: people never see this field, bots fill it in
  if (field(formData, "company")) return { status: "success" }

  const name = field(formData, "name")
  const email = field(formData, "email").toLowerCase()
  const level = field(formData, "level")
  const interest = field(formData, "interest")
  const locale = field(formData, "locale") === "en" ? "en" : "es"
  const values = { name, email, level, interest }

  if (
    !name ||
    name.length > 120 ||
    email.length > 254 ||
    !EMAIL.test(email) ||
    !isLevel(level) ||
    interest.length > 1000
  ) {
    return { status: "invalid", values }
  }

  // Upstash Redis REST credentials, set by the Vercel Marketplace integration
  const url = process.env.KV_REST_API_URL ?? process.env.UPSTASH_REDIS_REST_URL
  const token = process.env.KV_REST_API_TOKEN ?? process.env.UPSTASH_REDIS_REST_TOKEN
  if (!url || !token) {
    console.error("Pre-register storage is not configured")
    return { status: "error", values }
  }

  const entry = JSON.stringify({
    name,
    email,
    level,
    interest,
    locale,
    createdAt: new Date().toISOString(),
  })

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
      body: JSON.stringify(["HSET", STORAGE_KEY, email, entry]),
      cache: "no-store",
    })
    if (!response.ok) throw new Error(`Upstash responded ${response.status}`)
  } catch (error) {
    console.error("Pre-register failed", error)
    return { status: "error", values }
  }

  return { status: "success" }
}
