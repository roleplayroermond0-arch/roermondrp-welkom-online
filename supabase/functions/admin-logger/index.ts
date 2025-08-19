import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.55.0';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
const discordWebhookUrl = Deno.env.get('DISCORD_WEBHOOK_URL');

const supabase = createClient(supabaseUrl, supabaseServiceKey);

serve(async (req) => {
  console.log('Admin logger function called');

  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { action, details, adminId } = await req.json();
    const userAgent = req.headers.get('user-agent') || 'Unknown';
    const clientIP = req.headers.get('x-forwarded-for') || 
                     req.headers.get('x-real-ip') || 
                     'Unknown';

    console.log('Logging action:', action);

    // Insert log into database
    const { data: logEntry, error: dbError } = await supabase
      .from('admin_logs')
      .insert([{
        admin_id: adminId,
        action,
        details,
        ip_address: clientIP,
        user_agent: userAgent
      }])
      .select()
      .single();

    if (dbError) {
      console.error('Error inserting log:', dbError);
    } else {
      console.log('Log inserted successfully:', logEntry.id);
    }

    // Send to Discord webhook if configured
    if (discordWebhookUrl) {
      try {
        const embed = {
          title: "🔧 Admin Action Logged",
          description: `**Action:** ${action.replace(/_/g, ' ')}`,
          color: getActionColor(action),
          fields: [
            {
              name: "Details",
              value: details ? `\`\`\`json\n${JSON.stringify(details, null, 2)}\`\`\`` : "No additional details",
              inline: false
            },
            {
              name: "IP Address",
              value: clientIP,
              inline: true
            },
            {
              name: "User Agent",
              value: userAgent.substring(0, 100) + (userAgent.length > 100 ? "..." : ""),
              inline: false
            }
          ],
          timestamp: new Date().toISOString(),
          footer: {
            text: "RoermondRP Admin Panel"
          }
        };

        const webhookPayload = {
          embeds: [embed],
          username: "Admin Logger",
          avatar_url: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
        };

        const discordResponse = await fetch(discordWebhookUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(webhookPayload)
        });

        if (!discordResponse.ok) {
          console.error('Failed to send Discord webhook:', await discordResponse.text());
        } else {
          console.log('Discord webhook sent successfully');
        }
      } catch (discordError) {
        console.error('Error sending Discord webhook:', discordError);
      }
    }

    return new Response(
      JSON.stringify({ success: true, logId: logEntry?.id }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error in admin logger function:', error);
    return new Response(
      JSON.stringify({ success: false, message: 'Internal server error' }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
});

function getActionColor(action: string): number {
  switch (action) {
    case 'ADMIN_LOGIN':
      return 0x00ff00; // Green
    case 'ADMIN_LOGOUT':
      return 0xffa500; // Orange
    case 'CREATE_JOB':
      return 0x0099ff; // Blue
    case 'TOGGLE_JOB_APPLICATIONS':
      return 0xffff00; // Yellow
    case 'ADD_QUESTION':
    case 'DELETE_QUESTION':
      return 0xff9900; // Orange
    default:
      return 0x808080; // Gray
  }
}