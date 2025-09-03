# RoermondRP Application

A Discord-based roleplay application for RoermondRP server members.

## Features

- Discord OAuth authentication
- Job applications system
- Coin store with configurable packages
- User dashboard and balance tracking

## Configuration

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

### MySQL Database

Update `src/lib/mysql.ts` with your MySQL connection details:
```typescript
const connection = mysql.createConnection({
  host: 'your_host',
  user: 'your_username', 
  password: 'your_password',
  database: 'your_database'
});
```

## Database Schema

Required MySQL tables:
- `users` - User profiles and Discord data
- `user_balances` - User coin balances
- `applications` - Job applications
- `purchases` - Store purchase history

## Environment Variables

Create a `.env` file with:
```
VITE_DISCORD_WEBHOOK_STAFF=your_webhook_url
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_key
```

## Development

```bash
npm install
npm run dev
```

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