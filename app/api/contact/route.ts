import { NextResponse } from 'next/server'
import { headers } from 'next/headers'
import rateLimit from '@/lib/rate-limit'
import { z } from 'zod'

// Contact form validation schema
const contactSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email address'),
  message: z.string().min(1, 'Message is required'),
})

// Rate limit configuration: 5 requests per minute
const RATE_LIMIT_CONFIG = {
  interval: 60 * 1000, // 1 minute
  limit: 5, // 5 requests per minute
}

export async function POST(req: Request) {
  try {
    // Get IP for rate limiting
    const headersList = headers()
    const ip = headersList.get('x-forwarded-for') || 'unknown'
    
    // Check rate limit
    const rateLimitResult = rateLimit(ip, RATE_LIMIT_CONFIG)
    
    // If rate limited, return 429 Too Many Requests
    if (!rateLimitResult.success) {
      return NextResponse.json(
        { error: 'Too many requests, please try again later.' },
        { 
          status: 429,
          headers: {
            'X-RateLimit-Limit': rateLimitResult.limit.toString(),
            'X-RateLimit-Remaining': '0',
            'X-RateLimit-Reset': rateLimitResult.reset.toString(),
          }
        }
      )
    }
    
    // Parse request body
    const body = await req.json()
    
    // Validate using Zod schema
    const validationResult = contactSchema.safeParse(body)
    if (!validationResult.success) {
      return NextResponse.json(
        { error: 'Invalid form data', details: validationResult.error.format() },
        { status: 400 }
      )
    }
    
    // Validated data
    const { name, email, message } = validationResult.data
    
    // In production you would send an email here.
    console.log('Contact form submission', { name, email, message })
    
    // Return success
    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json(
      { error: 'An error occurred processing your request' },
      { status: 500 }
    )
  }
}
