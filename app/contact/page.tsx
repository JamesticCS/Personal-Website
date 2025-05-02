'use client'

import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'

const schema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  message: z.string().min(1),
})

type FormData = z.infer<typeof schema>

export default function ContactPage() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({ resolver: zodResolver(schema) })
  const [sent, setSent] = useState(false)

  const onSubmit = async (data: FormData) => {
    await fetch('/api/contact', { method: 'POST', body: JSON.stringify(data) })
    setSent(true)
  }

  return (
    <section className="mx-auto max-w-md py-10 space-y-6">
      <h1 className="text-center text-3xl font-bold">Contact</h1>
      {sent ? (
        <p className="text-center text-green-400">Thanks! I'll get back to you soon.</p>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <input
            {...register('name')}
            placeholder="Name"
            className="w-full rounded bg-surface p-3 text-sm"
          />
          {errors.name && <p className="text-xs text-red-400">{errors.name.message}</p>}
          <input
            {...register('email')}
            placeholder="Email"
            className="w-full rounded bg-surface p-3 text-sm"
          />
          {errors.email && <p className="text-xs text-red-400">{errors.email.message}</p>}
          <textarea
            {...register('message')}
            placeholder="Message"
            rows={5}
            className="w-full rounded bg-surface p-3 text-sm"
          />
          {errors.message && <p className="text-xs text-red-400">{errors.message.message}</p>}
          <button
            disabled={isSubmitting}
            className="w-full rounded bg-primary py-2 font-medium text-white disabled:opacity-50"
          >
            {isSubmitting ? 'Sending…' : 'Send'}
          </button>
        </form>
      )}

      <div className="text-center text-sm text-gray-400">
        Or email me directly at{' '}
        <a href="mailto:jesse.hines@uwaterloo.ca" className="underline">
          jesse.hines@uwaterloo.ca
        </a>{' '}
        or call <a href="tel:+19025994779">902‑599‑4779</a>.
      </div>
    </section>
  )
}
