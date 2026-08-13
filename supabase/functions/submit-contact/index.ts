// Supabase Edge Function: verifies an hCaptcha token server-side (the secret
// key can never live in the browser bundle) and, only if it's valid, inserts
// the message into `contact_messages` using the service role key.
//
// Deploy with:
//   supabase functions deploy submit-contact
//
// Required secrets (set with `supabase secrets set NAME=value`, or in the
// Supabase dashboard under Edge Functions -> submit-contact -> Secrets):
//   HCAPTCHA_SECRET_KEY        - secret key from your hCaptcha site
//   SUPABASE_URL                - already available by default on Supabase
//   SUPABASE_SERVICE_ROLE_KEY   - already available by default on Supabase
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.45.0';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  });
}

Deno.serve(async (req: Request) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  if (req.method !== 'POST') {
    return json({ error: 'Method not allowed' }, 405);
  }

  try {
    const { name, email, subject, message, captchaToken } = await req.json();

    if (!name || !email || !subject || !message || !captchaToken) {
      return json({ error: 'Champs manquants ou vérification anti-robot absente.' }, 400);
    }

    const hcaptchaSecret = Deno.env.get('HCAPTCHA_SECRET_KEY');
    if (!hcaptchaSecret) {
      console.error('HCAPTCHA_SECRET_KEY secret is not set on this Edge Function.');
      return json({ error: "Configuration anti-robot manquante côté serveur." }, 500);
    }

    const verifyResponse = await fetch('https://hcaptcha.com/siteverify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({ secret: hcaptchaSecret, response: captchaToken }),
    });
    const verifyResult = await verifyResponse.json();

    if (!verifyResult.success) {
      return json({ error: 'Vérification anti-robot échouée. Veuillez réessayer.' }, 400);
    }

    const supabaseUrl = Deno.env.get('SUPABASE_URL');
    const serviceRoleKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');

    if (!supabaseUrl || !serviceRoleKey) {
      console.error('SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY is not available to this function.');
      return json({ error: 'Configuration serveur manquante.' }, 500);
    }

    const supabase = createClient(supabaseUrl, serviceRoleKey);
    const { error } = await supabase
      .from('contact_messages')
      .insert([{ name, email, subject, message }]);

    if (error) {
      console.error('Insert error:', error.message);
      return json({ error: "Impossible d'enregistrer le message." }, 500);
    }

    return json({ success: true });
  } catch (err) {
    console.error('submit-contact error:', err);
    return json({ error: 'Erreur serveur inattendue.' }, 500);
  }
});
