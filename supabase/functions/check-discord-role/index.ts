import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const DISCORD_GUILD_ID = "1026150701891588098"; // RoermondRP server ID
const WEB_ADMIN_ROLE_ID = "1407374252499538001"; // WebAdmin role ID

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { discord_id, access_token } = await req.json();

    if (!discord_id || !access_token) {
      return new Response(
        JSON.stringify({ isAdmin: false, isMember: false, error: "Missing discord_id or access_token" }),
        { 
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      );
    }

    // Check if user is a member of the Discord server using their access token
    const guildMemberResponse = await fetch(`https://discord.com/api/guilds/${DISCORD_GUILD_ID}/members/${discord_id}`, {
      headers: {
        'Authorization': `Bot ${Deno.env.get('DISCORD_BOT_TOKEN')}`,
      },
    });

    if (!guildMemberResponse.ok) {
      console.log(`Discord API error: ${guildMemberResponse.status} - ${await guildMemberResponse.text()}`);
      return new Response(
        JSON.stringify({ isAdmin: false, isMember: false, error: "User not in Discord server" }),
        { 
          status: 200,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      );
    }

    const memberData = await guildMemberResponse.json();
    const userRoles = memberData.roles || [];
    
    // Check if user has the WebAdmin role
    const hasWebAdminRole = userRoles.includes(WEB_ADMIN_ROLE_ID);

    console.log(`Discord user ${discord_id} - Member: true, Has WebAdmin role: ${hasWebAdminRole}`);

    return new Response(
      JSON.stringify({ 
        isAdmin: hasWebAdminRole, 
        isMember: true,
        roles: userRoles 
      }),
      { 
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );

  } catch (error) {
    console.error('Discord role check error:', error);
    return new Response(
      JSON.stringify({ isAdmin: false, isMember: false, error: "Server error" }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  }
});