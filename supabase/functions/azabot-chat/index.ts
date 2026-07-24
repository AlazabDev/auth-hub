import { createClient } from 'npm:@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY')
const SUPABASE_URL = Deno.env.get('SUPABASE_URL')!
const SUPABASE_ANON_KEY = Deno.env.get('SUPABASE_ANON_KEY')!

const MAX_MESSAGES = 40
const MAX_CONTENT_LEN = 4000

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  if (!LOVABLE_API_KEY) {
    console.error('LOVABLE_API_KEY not configured')
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
  const token = authHeader.replace('Bearer ', '')
  const { data: userData, error: userError } = await supabase.auth.getUser(token)
  if (userError || !userData?.user) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), {
      status: 401,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }

  try {
    const { messages } = await req.json()

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return new Response(JSON.stringify({ error: 'messages array required' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }
    if (messages.length > MAX_MESSAGES) {
      return new Response(JSON.stringify({ error: `too many messages (max ${MAX_MESSAGES})` }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }
    for (const m of messages) {
      if (!m || typeof m.role !== 'string' || typeof m.content !== 'string') {
        return new Response(JSON.stringify({ error: 'invalid message shape' }), {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        })
      }
      if (!['user', 'assistant', 'system'].includes(m.role)) {
        return new Response(JSON.stringify({ error: 'invalid role' }), {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        })
      }
      if (m.content.length > MAX_CONTENT_LEN) {
        return new Response(JSON.stringify({ error: `message too long (max ${MAX_CONTENT_LEN})` }), {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        })
      }
    }

    const systemMessage = {
      role: 'system',
      content: `أنت عزبوت (AzaBot)، المساعد الذكي لمنصة العزب. أنت متخصص في مساعدة المستخدمين بخدمات الصيانة والتشطيب.

معلومات عن الشركة:
- نقدم خدمات صيانة شاملة (كهرباء، سباكة، تكييف، دهانات، نجارة)
- خدمات تشطيب احترافية للمنازل والمكاتب
- لدينا فروع في الرياض، جدة، الدمام
- أسعار تنافسية مع ضمان على جميع الأعمال
- خدمة عملاء 24/7
- فريق فنيين معتمدين ومدربين

أجب بشكل مختصر ومفيد باللغة العربية. إذا سُئلت بالإنجليزية أجب بالإنجليزية.
كن ودوداً ومحترفاً. استخدم الإيموجي باعتدال.`,
    }

    const response = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${LOVABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash',
        messages: [systemMessage, ...messages],
        max_tokens: 1024,
      }),
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error(`AI API error [${response.status}]: ${errorText}`)
      return new Response(JSON.stringify({ error: 'AI service error' }), {
        status: 502,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    const data = await response.json()
    const reply = data.choices?.[0]?.message?.content || 'عذراً، لم أتمكن من المعالجة.'

    return new Response(JSON.stringify({ reply }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  } catch (error) {
    console.error('AzaBot error:', error)
    return new Response(JSON.stringify({ error: 'An internal error occurred' }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }
})
