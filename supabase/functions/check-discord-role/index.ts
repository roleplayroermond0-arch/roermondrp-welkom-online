import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { corsHeaders } from "../_shared/cors.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const supabase = createClient(
  Deno.env.get("SUPABASE_URL")!,
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
);

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const { discord_id } = await req.json();
    
    if (!discord_id) {
      return new Response(
        JSON.stringify({ error: "Discord ID is required" }), 
        { 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 400 
        }
      );
    }

    const DISCORD_BOT_TOKEN = Deno.env.get("DISCORD_BOT_TOKEN");
    const DISCORD_GUILD_ID = "1026150701891588098";
    const WEBADMIN_ROLE_ID = Deno.env.get("DISCORD_WEBADMIN_ROLE_ID");

    if (!DISCORD_BOT_TOKEN || !WEBADMIN_ROLE_ID) {
      console.error("Missing Discord configuration");
      return new Response(
        JSON.stringify({ error: "Server configuration error" }), 
        { 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 500 
        }
      );
    }

    // Check Discord roles using bot token
    const response = await fetch(`https://discord.com/api/guilds/${DISCORD_GUILD_ID}/members/${discord_id}`, {
      headers: {
        'Authorization': `Bot ${DISCORD_BOT_TOKEN}`,
        'Content-Type': 'application/json'
      }
    });

    let hasWebAdminRole = false;
    let discordRoles: string[] = [];
    let isMember = false;

    if (response.ok) {
      const memberData = await response.json();
      isMember = true;
      discordRoles = memberData.roles || [];
      hasWebAdminRole = discordRoles.includes(WEBADMIN_ROLE_ID);
    } else if (response.status === 404) {
      // User not in guild
      isMember = false;
    } else {
      console.error("Discord API error:", response.status, await response.text());
    }

    // Update user permissions in database
    const { error: updateError } = await supabase
      .from('user_permissions')
      .upsert({
        discord_id,
        has_webadmin_role: hasWebAdminRole,
        is_discord_member: isMember,
        discord_roles: discordRoles,
        last_role_check: new Date().toISOString()
      }, {
        onConflict: 'discord_id'
      });

    if (updateError) {
      console.error("Database update error:", updateError);
    }

    return new Response(JSON.stringify({ 
      isAdmin: hasWebAdminRole,
      isMember,
      roles: discordRoles 
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    });

  } catch (err) {
    console.error("Error in function:", err);
    const errorMessage = err instanceof Error ? err.message : 'Unknown error';
    return new Response(JSON.stringify({ error: errorMessage }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 500,
    });
  }
});
