import { createClient } from 'npm:@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

const SUPABASE_URL = Deno.env.get('SUPABASE_URL')!
const SUPABASE_ANON_KEY = Deno.env.get('SUPABASE_ANON_KEY')!

const MAX_TEXT_LEN = 5000
const VOICE_ID_RE = /^[a-zA-Z0-9]{10,40}$/

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
    const { text, voiceId } = await req.json()

    if (!text || typeof text !== 'string') {
      return new Response(JSON.stringify({ error: 'text is required' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }
    if (text.length > MAX_TEXT_LEN) {
      return new Response(JSON.stringify({ error: `text must be 1–${MAX_TEXT_LEN} chars` }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    const voice = voiceId && typeof voiceId === 'string' ? voiceId : 'EXAVITQu4vr4xnSDxMaL'
    if (!VOICE_ID_RE.test(voice)) {
      return new Response(JSON.stringify({ error: 'invalid voiceId' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    const response = await fetch(
      `https://api.elevenlabs.io/v1/text-to-speech/${encodeURIComponent(voice)}?output_format=mp3_44100_128`,
      {
        method: 'POST',
        headers: {
          'xi-api-key': ELEVENLABS_API_KEY,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text,
          model_id: 'eleven_multilingual_v2',
          voice_settings: {
            stability: 0.5,
            similarity_boost: 0.75,
            style: 0.5,
          },
        }),
      },
    )

    if (!response.ok) {
      const errorText = await response.text()
      console.error(`ElevenLabs TTS error [${response.status}]: ${errorText}`)
      return new Response(JSON.stringify({ error: 'TTS service error' }), {
        status: 502,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    const audioBuffer = await response.arrayBuffer()

    return new Response(audioBuffer, {
      headers: { ...corsHeaders, 'Content-Type': 'audio/mpeg' },
    })
  } catch (error) {
    console.error('TTS error:', error)
    return new Response(JSON.stringify({ error: 'An internal error occurred' }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }
})
