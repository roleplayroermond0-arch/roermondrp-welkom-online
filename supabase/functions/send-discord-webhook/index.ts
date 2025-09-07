import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { corsHeaders } from "../_shared/cors.ts";

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const { type, payload } = await req.json();
    
    if (!type || !payload) {
      return new Response(
        JSON.stringify({ error: "Type and payload are required" }), 
        { 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 400 
        }
      );
    }

    let webhookUrl: string | undefined;
    
    // Get the appropriate webhook URL based on type
    switch (type) {
      case 'staff':
        webhookUrl = Deno.env.get("DISCORD_WEBHOOK_STAFF");
        break;
      case 'overheid':
        webhookUrl = Deno.env.get("DISCORD_WEBHOOK_OVERHEID");
        break;
      case 'general':
        webhookUrl = Deno.env.get("DISCORD_WEBHOOK_URL");
        break;
      default:
        return new Response(
          JSON.stringify({ error: "Invalid webhook type" }), 
          { 
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            status: 400 
          }
        );
    }

    if (!webhookUrl) {
      console.error(`Webhook URL not found for type: ${type}`);
      return new Response(
        JSON.stringify({ error: "Webhook configuration error" }), 
        { 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 500 
        }
      );
    }

    // Send to Discord webhook
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload)
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
    console.error("Error in webhook function:", err);
    return new Response(JSON.stringify({ error: err.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 500,
    });
  }
});