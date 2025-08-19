import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.55.0';
import * as bcrypt from "https://deno.land/x/bcrypt@v0.4.1/mod.ts";
import { authenticator } from "https://esm.sh/otplib@12.0.1";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;

const supabase = createClient(supabaseUrl, supabaseServiceKey);

serve(async (req) => {
  console.log('Admin auth function called');

  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { action, username, password, adminId, totpCode } = await req.json();
    console.log('Action:', action);

    if (action === 'verify_credentials') {
      console.log('Verifying credentials for username:', username);

      // Get admin user from database
      const { data: adminUser, error } = await supabase
        .from('admin_users')
        .select('*')
        .eq('username', username)
        .eq('is_active', true)
        .single();

      if (error || !adminUser) {
        console.log('Admin user not found or error:', error);
        return new Response(
          JSON.stringify({ success: false, message: 'Invalid credentials' }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      // Verify password
      const passwordMatch = await bcrypt.compare(password, adminUser.password_hash);
      
      if (!passwordMatch) {
        console.log('Password does not match');
        return new Response(
          JSON.stringify({ success: false, message: 'Invalid credentials' }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      console.log('Credentials verified successfully');
      return new Response(
        JSON.stringify({ success: true, adminId: adminUser.id }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    if (action === 'verify_totp') {
      console.log('Verifying TOTP for admin ID:', adminId);

      // Get admin user's TOTP secret
      const { data: adminUser, error } = await supabase
        .from('admin_users')
        .select('totp_secret')
        .eq('id', adminId)
        .eq('is_active', true)
        .single();

      if (error || !adminUser) {
        console.log('Admin user not found for TOTP verification:', error);
        return new Response(
          JSON.stringify({ success: false, message: 'Invalid session' }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      // Verify TOTP code
      const isValidToken = authenticator.verify({
        token: totpCode,
        secret: adminUser.totp_secret
      });

      if (!isValidToken) {
        console.log('Invalid TOTP code');
        return new Response(
          JSON.stringify({ success: false, message: 'Invalid 2FA code' }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      console.log('TOTP verified successfully');
      return new Response(
        JSON.stringify({ success: true }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    return new Response(
      JSON.stringify({ success: false, message: 'Invalid action' }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error in admin auth function:', error);
    return new Response(
      JSON.stringify({ success: false, message: 'Internal server error' }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
});