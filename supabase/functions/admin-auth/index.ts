import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import * as bcrypt from "https://deno.land/x/bcrypt/mod.ts";

const supabase = createClient(
  Deno.env.get("SUPABASE_URL")!,
  Deno.env.get("SUPABASE_ANON_KEY")! // of SERVICE_ROLE_KEY voor schrijven
);

serve(async (req) => {
  try {
    const { username, password } = await req.json();

    if (!username || !password) {
      return new Response(
        JSON.stringify({ success: false, error: "Missing username or password" }),
        { status: 400 }
      );
    }

    // User ophalen
    const { data: user, error } = await supabase
      .from("admin_users")
      .select("*")
      .eq("username", username)
      .eq("is_active", true)
      .single();

    if (error || !user) {
      return new Response(
        JSON.stringify({ success: false, error: "User not found or inactive" }),
        { status: 401 }
      );
    }

    // Password check
    const valid = await bcrypt.compare(password, user.password_hash);
    if (!valid) {
      return new Response(
        JSON.stringify({ success: false, error: "Invalid password" }),
        { status: 401 }
      );
    }

    return new Response(
      JSON.stringify({
        success: true,
        user: { id: user.id, username: user.username }
      }),
      { status: 200 }
    );
  } catch (err) {
    console.error("Auth function error:", err);
    return new Response(
      JSON.stringify({ success: false, error: "Server error" }),
      { status: 500 }
    );
  }
});
