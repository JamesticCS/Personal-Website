import { NextResponse } from 'next/server'
import { headers } from 'next/headers'
import rateLimit from '@/lib/rate-limit'
import { sendEmail } from '@/lib/email'
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
        { error: 'Invalid form data' },
        { status: 400 }
      )
    }
    
    // Validated data
    const { name, email, message } = validationResult.data
    
    // Send the email
    const { success, error, data } = await sendEmail({ name, email, message })
    
    if (!success) {
      // If email sending fails, return a 500 error with details
      console.error('Email sending failed:', error)
      return NextResponse.json(
        { 
          error: 'Failed to send email. Please try again later.',
          details: error
        },
        { status: 500 }
      )
    }
    
    // Return success with data for debugging
    console.log('Email sent successfully:', data)
    return NextResponse.json({ 
      ok: true, 
      debug: {
        emailSent: true,
        recipient: 'jesse.hines@uwaterloo.ca',
        resendResponse: data
      }
    })
  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json(
      { error: 'An error occurred processing your request' },
      { status: 500 }
    )
  }
}
