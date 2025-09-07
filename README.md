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

### MySQL Database (Production)

Update your production environment variables for MySQL connection:
```
MYSQL_HOST=your_production_mysql_host
MYSQL_USER=your_production_username
MYSQL_PASSWORD=your_production_password
MYSQL_DATABASE=roermondRP
MYSQL_PORT=3306
```

## Database Schema

Required MySQL tables:
- `users` - User profiles and Discord data
- `user_balances` - User coin balances
- `applications` - Job applications
- `purchases` - Store purchase history

## Environment Variables (Production)

Create environment variables for production:
```
# Discord Webhooks (keep existing values)
VITE_DISCORD_WEBHOOK_STAFF=your_webhook_url
VITE_DISCORD_WEBHOOK_OVERHEID=your_webhook_url
VITE_DISCORD_WEBHOOK_URL=your_webhook_url
VITE_DISCORD_GUILD_ID=1026150701891588098

# Supabase (keep existing values)
VITE_SUPABASE_URL=https://pqgphylharoznvxvfcwz.supabase.co
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
VITE_SUPABASE_PROJECT_ID=pqgphylharoznvxvfcwz

# MySQL Production
MYSQL_HOST=your_production_host
MYSQL_USER=your_production_user
MYSQL_PASSWORD=your_production_password
MYSQL_DATABASE=roermondRP
MYSQL_PORT=3306

# Discord Bot
DISCORD_BOT_TOKEN=your_bot_token
DISCORD_WEBADMIN_ROLE_ID=1407374252499538001
```

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