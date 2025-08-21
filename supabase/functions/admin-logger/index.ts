// supabase/functions/admin-auth/index.ts
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import * as bcrypt from "https://deno.land/x/bcrypt@v0.4.1/mod.ts";
import { corsHeaders } from "../_shared/cors.ts";

serve(async (req: Request) => {
  // This is needed if you're planning to invoke your function from a browser.
  if (req.method === "OPTIONS") {
    return new Response('ok', { headers: corsHeaders })
  }

  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  const { username, password } = await req.json();

  const supabase = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")! // let op: service role key nodig
  );

  // Zoek de admin user
  const { data: user, error } = await supabase
    .from("admin_users")
    .select("*")
    .eq("username", username)
    .maybeSingle();

  if (error || !user) {
    return new Response(JSON.stringify({ error: "Gebruiker niet gevonden" }), {
      status: 401,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  // Check wachtwoord
  const match = await bcrypt.compare(password, user.password_hash);
  if (!match) {
    return new Response(JSON.stringify({ error: "Wachtwoord onjuist" }), {
      status: 401,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  // Succes → eventueel kun je hier een JWT of sessie token teruggeven
  return new Response(JSON.stringify({ success: true, user: { id: user.id, username: user.username } }), {
    status: 200,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
});
