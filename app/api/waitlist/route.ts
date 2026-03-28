import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)


export async function POST(req) {
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
  return new Response('Server misconfigured', { status: 500 })
}

  try {
    const { email } = await req.json()

    if (!email) {
      return new Response('Missing email', { status: 400 })
    }

    const { error } = await supabase
      .from('waitlist')
      .insert([{ email }])

    if (error) {
      return new Response('Error saving email', { status: 500 })
    }

    return new Response('OK', { status: 200 })
  } catch {
    return new Response('Server error', { status: 500 })
  }
}