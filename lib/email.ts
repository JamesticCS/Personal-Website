import { Resend } from 'resend';

// Initialize Resend with API key
// In production, you'll need to set the RESEND_API_KEY environment variable
let resend: any;

try {
  if (process.env.RESEND_API_KEY) {
    resend = new Resend(process.env.RESEND_API_KEY);
    console.log('Resend initialized successfully');
  } else {
    console.log('No Resend API key found, using mock implementation');
    // For build-time only: mock implementation that doesn't throw errors
    resend = { emails: { send: async () => ({ data: null, error: new Error('API key not configured') }) } };
  }
} catch (error) {
  console.error('Error initializing Resend:', error);
  // Fallback to mock implementation
  resend = { emails: { send: async () => ({ data: null, error: new Error('Failed to initialize Resend') }) } };
}

type EmailPayload = {
  name: string;
  email: string;
  message: string;
};

export async function sendEmail({ name, email, message }: EmailPayload) {
  // Fail gracefully in development without API key
  if (!process.env.RESEND_API_KEY) {
    console.log('Would send email in production to jesse.hines@uwaterloo.ca:');
    console.log({ name, email, message });
    return { success: true, data: null };
  }

  // Log API key status (without revealing the actual key)
  console.log('Resend API key set:', !!process.env.RESEND_API_KEY);
  
  try {
    console.log('Attempting to send email via Resend');
    
    const { data, error } = await resend.emails.send({
      from: 'Website Contact <onboarding@resend.dev>',
      to: ['jesse.hines@uwaterloo.ca'],
      subject: `Website Contact: ${name}`,
      reply_to: email,
      text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
      html: `
        <div style="font-family: system-ui, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2>New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
          <div style="margin-top: 20px; padding: 15px; background-color: #f5f5f5; border-radius: 5px;">
            <p><strong>Message:</strong></p>
            <p>${message.replace(/\n/g, '<br>')}</p>
          </div>
        </div>
      `,
    });

    if (error) {
      console.error('Error sending email:', error);
      return { success: false, error, data: null };
    }

    console.log('Email sent successfully:', data);
    return { success: true, data, error: null };
  } catch (error) {
    console.error('Failed to send email:', error);
    return { success: false, error, data: null };
  }
}