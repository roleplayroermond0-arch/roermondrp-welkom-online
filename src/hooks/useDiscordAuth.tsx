import { useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/lib/supabase';
import { useToast } from '@/hooks/use-toast';

const DISCORD_GUILD_ID = import.meta.env.VITE_DISCORD_GUILD_ID || '1026150701891588098';

export const useDiscordAuth = () => {
  const { user, signOut } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    const checkDiscordMembership = async () => {
      if (!user) return;

      try {
        // Get the current session
        const { data: session } = await supabase.auth.getSession();
        
        if (!session.session?.provider_token) {
          console.log('No Discord token available');
          return;
        }

        // Check Discord server membership
        const response = await fetch('https://discord.com/api/users/@me/guilds', {
          headers: {
            'Authorization': `Bearer ${session.session.provider_token}`,
          },
        });

        if (!response.ok) {
          console.error('Failed to fetch Discord guilds');
          return;
        }

        const guilds = await response.json();
        const isMember = guilds.some((guild: any) => guild.id === DISCORD_GUILD_ID);

        if (!isMember) {
          toast({
            title: "Toegang geweigerd",
            description: "Je moet lid zijn van onze Discord server om toegang te krijgen. Join: https://discord.gg/P5ZEZQvdVh",
            variant: "destructive",
          });
          
          await signOut();
        }
      } catch (error) {
        console.error('Discord membership check failed:', error);
      }
    };

    // Only check if user is logged in via Discord OAuth
    if (user && user.app_metadata?.provider === 'discord') {
      checkDiscordMembership();
    }
  }, [user, signOut, toast]);

  return null;
};