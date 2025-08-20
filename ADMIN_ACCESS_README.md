# Admin Access System Documentation

## Overview
The admin access system has been updated to provide secure access to the admin panel only for users who:
1. Are logged in with Discord OAuth
2. Are members of the RoermondRP Discord server
3. Have the "WebAdmin" role (ID: 1407374252499538001)

## How It Works

### 1. Discord Authentication
- Users must log in using Discord OAuth through Supabase
- The system automatically checks if the user is a member of the Discord server
- If not a member, they are automatically logged out with a message

### 2. Role Verification
- Once authenticated, the system checks if the user has the "WebAdmin" role
- This is done using a Supabase Edge Function that communicates with Discord's API
- The role check uses the Discord Bot Token for authentication

### 3. Admin Panel Access
- Users can access the admin panel by clicking the "Home" button in the header 5 times
- This only works if the user has the WebAdmin role
- No popup or modal is shown - direct access is granted

## Configuration Required

### Environment Variables
Set these environment variables in your Supabase project:

```bash
# Discord Bot Token (required for role checking)
DISCORD_BOT_TOKEN=yMTQwNjk2MDg5ODgxMTM2MzM0OA.GP3F1S.H_tSo3V_MRABuIH9rPtIptfiJGEM0QkmQfL9PE

# Discord Guild ID (optional, defaults to RoermondRP server)
VITE_DISCORD_GUILD_ID=1026150701891588098
```

### Discord Bot Setup
1. Create a Discord bot in your Discord server
2. Give it the following permissions:
   - View Server Members
   - Read Message History
3. Add the bot to your server
4. Copy the bot token and set it as `DISCORD_BOT_TOKEN`

## Security Features

- **Automatic Logout**: Users who are not Discord server members are automatically logged out
- **Role-Based Access**: Only users with the specific WebAdmin role can access admin features
- **No Popup**: The admin access is seamless and doesn't show unnecessary modals
- **Session Validation**: Discord membership and role are checked on every session

## Edge Function

The `check-discord-role` Edge Function:
- Takes a Discord user ID as input
- Checks if the user is a member of the specified server
- Verifies if they have the WebAdmin role
- Returns a boolean indicating access permission

## Usage

1. **For Users**: Simply click the "Home" button in the header 5 times
2. **For Admins**: The system will automatically detect your role and grant access
3. **For Non-Admins**: Nothing happens when clicking 5 times (no error messages)

## Troubleshooting

- **Access Denied**: Ensure the user has the WebAdmin role in Discord
- **Bot Token Issues**: Verify the Discord bot token is correct and has proper permissions
- **Role ID Mismatch**: Confirm the WebAdmin role ID matches your Discord server configuration
