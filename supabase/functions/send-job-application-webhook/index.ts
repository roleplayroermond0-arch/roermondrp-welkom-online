import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { corsHeaders } from "../_shared/cors.ts";

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const { jobType, embed, userDiscordId } = await req.json();
    
    console.log(`Processing application for job type: ${jobType}`);
    console.log(`Available environment variables:`, {
      taxi: !!Deno.env.get("DISCORD_WEBHOOK_TAXI"),
      ambulance: !!Deno.env.get("DISCORD_WEBHOOK_AMBULANCE"),
      police: !!Deno.env.get("DISCORD_WEBHOOK_POLICE"),
      kmar: !!Deno.env.get("DISCORD_WEBHOOK_KMAR"),
      wegenwacht: !!Deno.env.get("DISCORD_WEBHOOK_WEGENWACHT"),
      advocatuur: !!Deno.env.get("DISCORD_WEBHOOK_ADVOCATUUR"),
      dsi: !!Deno.env.get("DISCORD_WEBHOOK_DSI"),
      brandweer: !!Deno.env.get("DISCORD_WEBHOOK_BRANDWEER")
    });
    
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
      case 'dsi':
        webhookUrl = Deno.env.get("DISCORD_WEBHOOK_DSI");
        break;
      case 'brandweer':
        webhookUrl = Deno.env.get("DISCORD_WEBHOOK_BRANDWEER");
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
        JSON.stringify({ error: `Webhook configuration error for job type: ${jobType}` }), 
        { 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 500 
        }
      );
    }

    console.log(`Sending application for job type: ${jobType} to webhook: ${webhookUrl.substring(0, 50)}...`);

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
      console.error(`Discord webhook error for ${jobType}: ${response.status} ${errorText}`);
      return new Response(
        JSON.stringify({ 
          error: `Failed to send webhook for ${jobType}`, 
          details: `Status: ${response.status}`,
          jobType: jobType
        }), 
        { 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 500 
        }
      );
    }

    console.log(`Successfully sent application for ${jobType}`);

    return new Response(JSON.stringify({ success: true }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    });

  } catch (err) {
    console.error("Error in job application webhook function:", err);
    const errorMessage = err instanceof Error ? err.message : 'Unknown error';
    return new Response(JSON.stringify({ error: errorMessage }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 500,
    });
  }
});