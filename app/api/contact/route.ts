import { NextResponse } from 'next/server'

// In production you would send an email here.
// For the placeholder we'll just log and return success.

export async function POST(req: Request) {
  const body = await req.json()
  console.log('Contact form submission', body)
  return NextResponse.json({ ok: true })
}
