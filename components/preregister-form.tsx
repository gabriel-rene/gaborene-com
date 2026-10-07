"use client"

import { useActionState } from "react"
import type { Locale } from "@/lib/i18n"
import { preregister, type Level, type PreregisterState } from "@/lib/preregister"

export type PreregisterCopy = {
  name: string
  email: string
  level: string
  levels: Record<Level, string>
  interest: string
  submit: string
  pending: string
  success: string
  invalid: string
  error: string
  privacy: string
}

const INITIAL: PreregisterState = { status: "idle" }

const label = "text-sm text-stone-600 dark:text-stone-400 uppercase tracking-widest"
const input =
  "w-full bg-transparent border-b border-stone-500 dark:border-stone-400 py-2 text-stone-900 dark:text-stone-100 focus:outline-none focus:border-stone-900 dark:focus:border-stone-100 transition-colors"

export function PreregisterForm({ locale, copy }: { locale: Locale; copy: PreregisterCopy }) {
  const [state, action, pending] = useActionState(preregister, INITIAL)
  const values = "values" in state ? state.values : undefined

  if (state.status === "success") {
    return (
      <p role="status" className="font-serif text-2xl text-stone-900 dark:text-stone-100">
        {copy.success}
      </p>
    )
  }

  return (
    <form action={action} className="flex flex-col gap-8 max-w-xl">
      <input type="hidden" name="locale" value={locale} />
      <div aria-hidden="true" className="absolute -left-[9999px]">
        <input type="text" name="company" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="preregister-name" className={label}>
          {copy.name}
        </label>
        <input
          id="preregister-name"
          name="name"
          type="text"
          required
          maxLength={120}
          autoComplete="name"
          defaultValue={values?.name}
          className={input}
        />
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="preregister-email" className={label}>
          {copy.email}
        </label>
        <input
          id="preregister-email"
          name="email"
          type="email"
          required
          maxLength={254}
          autoComplete="email"
          defaultValue={values?.email}
          className={input}
        />
      </div>

      <fieldset className="flex flex-col gap-3">
        <legend className={`${label} mb-3`}>{copy.level}</legend>
        {(Object.entries(copy.levels) as [Level, string][]).map(([value, text]) => (
          <label
            key={value}
            className="flex items-center gap-3 text-stone-900 dark:text-stone-100 cursor-pointer"
          >
            <input
              type="radio"
              name="level"
              value={value}
              required
              defaultChecked={values?.level === value}
              className="accent-stone-900 dark:accent-stone-100"
            />
            {text}
          </label>
        ))}
      </fieldset>

      <div className="flex flex-col gap-1">
        <label htmlFor="preregister-interest" className={label}>
          {copy.interest}
        </label>
        <textarea
          id="preregister-interest"
          name="interest"
          rows={3}
          maxLength={1000}
          defaultValue={values?.interest}
          className={`${input} resize-y`}
        />
      </div>

      <div className="flex flex-col gap-4">
        <button
          type="submit"
          disabled={pending}
          className="w-fit px-6 py-3 text-sm bg-stone-900 text-stone-100 dark:bg-stone-100 dark:text-stone-900 hover:bg-stone-700 dark:hover:bg-stone-300 disabled:opacity-60 transition-colors"
        >
          {pending ? copy.pending : copy.submit}
        </button>
        <p aria-live="polite" className="text-sm text-stone-900 dark:text-stone-100 empty:hidden">
          {state.status === "invalid" && copy.invalid}
          {state.status === "error" && copy.error}
        </p>
        <p className="text-sm text-stone-600 dark:text-stone-400">{copy.privacy}</p>
      </div>
    </form>
  )
}
