import { useEffect, useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import supabase from '@/lib/supabase';
import { useToast } from '@/hooks/use-toast';

const DISCORD_GUILD_ID = '1026150701891588098';

export const useDiscordAuth = () => {
  const { user, signOut } = useAuth();
  const { toast } = useToast();
  const [isChecking, setIsChecking] = useState(false);

  useEffect(() => {
    const checkDiscordMembership = async () => {
      if (!user || isChecking) return;

      setIsChecking(true);
      try {
        // Get the current session
        const { data: session } = await supabase.auth.getSession();
        
        if (!session.session?.provider_token || session.session?.user?.app_metadata?.provider !== 'discord') {
          console.log('Not a Discord login or no token available');
          setIsChecking(false);
          return;
        }

        // Get Discord ID from user metadata
        const discordId = session.session.user.user_metadata?.provider_id;
        
        if (!discordId) {
          console.log('No Discord ID found');
          setIsChecking(false);
          return;
        }

        // Check Discord server membership and role
        const { data, error } = await supabase.functions.invoke("check-discord-role", {
          body: { 
            discord_id: discordId,
            access_token: session.session.provider_token,
            user_id: user.id
          }
        });

        if (error) {
          console.error('Discord membership check failed:', error);
          setIsChecking(false);
          return;
        }

        if (!data?.isMember) {
          toast({
            title: "Toegang geweigerd",
            description: "Je moet lid zijn van onze Discord server om toegang te krijgen. Join: https://discord.gg/roermondrp",
            variant: "destructive",
          });
          
          await signOut();
        }
      } catch (error) {
        console.error('Discord membership check failed:', error);
      } finally {
        setIsChecking(false);
      }
    };

    // Only check if user is logged in via Discord OAuth
    if (user && user.app_metadata?.provider === 'discord') {
      checkDiscordMembership();
    }
  }, [user, signOut, toast, isChecking]);

  return { isChecking };
};