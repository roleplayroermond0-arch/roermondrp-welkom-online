import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { corsHeaders } from "../_shared/cors.ts";

interface ComplaintRequest {
  target: 'staff' | 'overheid';
  complaint: string;
  evidence?: string;
  user: {
    username: string;
    discordId: string;
    avatar?: string;
  };
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { target, complaint, evidence, user }: ComplaintRequest = await req.json();

    // Validate required fields
    if (!target || !complaint || !user?.username || !user?.discordId) {
      return new Response(
        JSON.stringify({ error: 'Missing required fields' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Select the appropriate webhook URL based on target
    let webhookUrl: string | undefined;
    if (target === 'staff') {
      webhookUrl = Deno.env.get('DISCORD_WEBHOOK_COMPLAINTS_STAFF');
    } else if (target === 'overheid') {
      webhookUrl = Deno.env.get('DISCORD_WEBHOOK_COMPLAINTS_GOVERNMENT');
    }

    if (!webhookUrl) {
      console.error(`No webhook URL found for target: ${target}`);
      return new Response(
        JSON.stringify({ error: 'Webhook not configured for this complaint type' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Color mapping for different complaint types
    const colors = {
      staff: 0xFF6B6B,      // Red for staff complaints
      overheid: 0x4ECDC4     // Teal for government complaints
    };

    // Create Discord embed
    const embed: any = {
      title: `Nieuwe Klacht - ${target === 'staff' ? 'Staff' : 'Overheid'}`,
      description: complaint,
      color: colors[target],
      fields: [
        {
          name: "Ingediend door",
          value: user.username,
          inline: true
        },
        {
          name: "Discord ID",
          value: user.discordId || 'Niet beschikbaar',
          inline: true
        }
      ],
      footer: {
        text: "FiveM Server Klachten Systeem",
        icon_url: "https://cdn.discordapp.com/emojis/1234567890123456789.png"
      },
      timestamp: new Date().toISOString()
    };

    // Add evidence field if provided
    if (evidence && evidence.trim()) {
      embed.fields.push({
        name: "Bewijs/Link",
        value: evidence,
        inline: false
      });
    }

    // Add user avatar if available
    if (user.avatar) {
      embed.thumbnail = {
        url: user.avatar
      };
    }

    const payload = {
      username: "Klachten Bot",
      avatar_url: "https://cdn.discordapp.com/emojis/1234567890123456789.png",
      embeds: [embed]
    };

    // Send to Discord webhook
    const discordResponse = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!discordResponse.ok) {
      const errorText = await discordResponse.text();
      console.error('Discord webhook error:', errorText);
      return new Response(
        JSON.stringify({ error: 'Failed to send complaint to Discord' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log(`Complaint sent successfully to ${target} webhook`);

    return new Response(
      JSON.stringify({ success: true, message: 'Klacht succesvol ingediend' }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error in send-complaint function:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
};

serve(handler);