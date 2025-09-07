# RoermondRP Application

A Discord-based roleplay application for RoermondRP server members.
Production domain: https://roermond-rp.nl

## Features

- Discord OAuth authentication
- Job applications system  
- Coin store with configurable packages
- User dashboard and balance tracking

## Production Configuration

### Applications

Edit `src/config/applications.ts` to:
- Enable/disable applications: Set `APPLICATIONS_ENABLED` to `true` or `false`
- Add/edit job positions in the `JOBS` array
- Modify questions for each job
- Control which jobs accept applications

### Store

Edit `src/config/store.ts` to:
- Configure coin packages with custom purchase URLs
- Set the main Tebex store URL

## Security

This application implements several security best practices:

### ⚠️ Critical Security Configuration

1. **Discord Credentials**: All Discord bot tokens and webhook URLs are stored server-side only
   - `DISCORD_BOT_TOKEN`: Never exposed to frontend (used only in Supabase Edge Functions)
   - `DISCORD_WEBHOOK_*`: Accessed via secure Edge Functions, not directly from frontend

2. **Environment Variables**: Only safe, public variables use the `VITE_` prefix
   - `VITE_DISCORD_GUILD_ID`: Guild ID (public, safe to expose)
   - `VITE_SUPABASE_*`: Public Supabase keys (designed to be client-side safe)

3. **Webhook Security**: All Discord webhooks are called through Supabase Edge Functions
   - Frontend → Edge Function → Discord (secure)
   - Not: Frontend → Discord (insecure)

### Required Environment Variables for Production

Ensure these are set in your hosting environment:

```bash
# Safe for frontend (use VITE_ prefix)
VITE_SUPABASE_URL=https://pqgphylharoznvxvfcwz.supabase.co
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
VITE_SUPABASE_PROJECT_ID=pqgphylharoznvxvfcwz
VITE_DISCORD_GUILD_ID=1026150701891588098

# Server-side only (Supabase Edge Functions - NO VITE_ prefix)
DISCORD_BOT_TOKEN=your_discord_bot_token
DISCORD_WEBHOOK_STAFF=your_staff_webhook_url
DISCORD_WEBHOOK_OVERHEID=your_overheid_webhook_url
DISCORD_WEBHOOK_URL=your_general_webhook_url
DISCORD_WEBADMIN_ROLE_ID=your_webadmin_role_id
```

## MySQL Database (Production)

⚠️ **Note**: MySQL integration has been removed from frontend for security. Use Supabase for all database operations.

## Environment Variables (Production)

**DEPRECATED**: The environment variables section below has been replaced with the Security section above for better security practices.

## Production Deployment

1. **Domain Configuration**: All OAuth redirects are configured for https://roermond-rp.nl
2. **Supabase Redirects**: Add https://roermond-rp.nl/auth/callback to your Supabase authentication URLs
3. **MySQL**: Configure production MySQL server with the provided schema
4. **Discord**: Update Discord application redirect URIs to use roermond-rp.nl domain

## Development vs Production

- **Development**: Uses localhost:8080 for local testing
- **Production**: Uses https://roermond-rp.nl for all redirects and API calls
- **Database**: MySQL connection automatically switches based on environment variables

## Easy Configuration Guide

### To enable/disable applications:
1. Open `src/config/applications.ts`
2. Change `APPLICATIONS_ENABLED` to `true` or `false`

### To add a new job:
1. Open `src/config/applications.ts`
2. Add a new job object to the `JOBS` array with questions

### To update store packages:
1. Open `src/config/store.ts`
2. Modify the `COIN_PACKAGES` array with your desired packages and URLs

### To change the main store URL:
1. Open `src/config/store.ts`  
2. Update `TEBEX_STORE_URL`

All changes take effect immediately without database modifications required.