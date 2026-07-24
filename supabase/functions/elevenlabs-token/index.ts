import { createClient } from 'npm:@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

const SUPABASE_URL = Deno.env.get('SUPABASE_URL')!
const SUPABASE_ANON_KEY = Deno.env.get('SUPABASE_ANON_KEY')!

const AGENT_ID_RE = /^[a-zA-Z0-9_-]{1,64}$/

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  const ELEVENLABS_API_KEY = Deno.env.get('ELEVENLABS_API_KEY')
  if (!ELEVENLABS_API_KEY) {
    console.error('ELEVENLABS_API_KEY not configured')
    return new Response(JSON.stringify({ error: 'Service unavailable' }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }

  // Require authenticated caller
  const authHeader = req.headers.get('Authorization')
  if (!authHeader?.startsWith('Bearer ')) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), {
      status: 401,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }
  const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
    global: { headers: { Authorization: authHeader } },
  })
  const { data: userData, error: userError } = await supabase.auth.getUser(
    authHeader.replace('Bearer ', ''),
  )
  if (userError || !userData?.user) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), {
      status: 401,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }

  try {
    const { agentId } = await req.json().catch(() => ({}))

    const rawId = typeof agentId === 'string' && agentId.length > 0 ? agentId : 'default'
    if (!AGENT_ID_RE.test(rawId)) {
      return new Response(JSON.stringify({ error: 'invalid agentId' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    const response = await fetch(
      `https://api.elevenlabs.io/v1/convai/conversation/get-signed-url?agent_id=${encodeURIComponent(rawId)}`,
      { headers: { 'xi-api-key': ELEVENLABS_API_KEY } },
    )

    if (!response.ok) {
      const errorText = await response.text()
      console.error(`ElevenLabs API error [${response.status}]: ${errorText}`)
      return new Response(JSON.stringify({ error: 'ElevenLabs service error' }), {
        status: 502,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    const { signed_url } = await response.json()

    return new Response(JSON.stringify({ signed_url }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  } catch (error) {
    console.error('ElevenLabs token error:', error)
    return new Response(JSON.stringify({ error: 'An internal error occurred' }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }
})
