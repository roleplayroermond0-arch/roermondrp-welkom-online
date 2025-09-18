import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { corsHeaders } from "../_shared/cors.ts";

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const { jobType, embed } = await req.json();
    
    if (!jobType || !embed) {
      return new Response(
        JSON.stringify({ error: "Job type and embed are required" }), 
        { 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 400 
        }
      );
    }

    let webhookUrl: string | undefined;
    
    // Get the appropriate webhook URL based on job type
    switch (jobType.toLowerCase()) {
      case 'taxi':
        webhookUrl = Deno.env.get("DISCORD_WEBHOOK_TAXI");
        break;
      case 'ambulance':
        webhookUrl = Deno.env.get("DISCORD_WEBHOOK_AMBULANCE");
        break;
      case 'police':
        webhookUrl = Deno.env.get("DISCORD_WEBHOOK_POLICE");
        break;
      case 'kmar':
        webhookUrl = Deno.env.get("DISCORD_WEBHOOK_KMAR");
        break;
      case 'wegenwacht':
        webhookUrl = Deno.env.get("DISCORD_WEBHOOK_WEGENWACHT");
        break;
      case 'advocatuur':
        webhookUrl = Deno.env.get("DISCORD_WEBHOOK_ADVOCATUUR");
        break;
      default:
        return new Response(
          JSON.stringify({ error: "Invalid job type" }), 
          { 
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            status: 400 
          }
        );
    }

    if (!webhookUrl) {
      console.error(`Webhook URL not found for job type: ${jobType}`);
      return new Response(
        JSON.stringify({ error: "Webhook configuration error" }), 
        { 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 500 
        }
      );
    }

    const webhookPayload = {
      embeds: [embed],
      username: "Sollicitatie Bot",
      avatar_url: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
    };

    // Send to Discord webhook
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(webhookPayload)
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Discord webhook error:', response.status, errorText);
      return new Response(
        JSON.stringify({ error: "Failed to send webhook" }), 
        { 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 500 
        }
      );
    }

    return new Response(JSON.stringify({ success: true }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    });

  } catch (err) {
    console.error("Error in job application webhook function:", err);
    return new Response(JSON.stringify({ error: err.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 500,
    });
  }
});