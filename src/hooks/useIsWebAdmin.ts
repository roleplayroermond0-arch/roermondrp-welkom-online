import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import supabase from "@/lib/supabase";

export function useIsWebAdmin() {
  const { user } = useAuth();
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkRole = async () => {
      if (!user) {
        setIsAdmin(false);
        setLoading(false);
        return;
      }

      try {
        // Get the current session
        const { data: session } = await supabase.auth.getSession();
        // Try to get Discord ID from multiple possible locations
        const identities = (session.session?.user as any)?.identities || [];
        const discordIdentity = identities.find((i: any) => i.provider === 'discord');
        const discordId =
          session.session?.user?.user_metadata?.provider_id ||
          discordIdentity?.identity_data?.sub ||
          discordIdentity?.identity_data?.user_id ||
          null;
        
        if (!discordId) {
          console.log('No Discord ID found');
          setIsAdmin(false);
          setLoading(false);
          return;
        }

        // Check Discord role using our edge function
        const { data, error } = await supabase.functions.invoke("check-discord-role", {
          body: { 
            discord_id: discordId
          }
        });

        if (error) {
          console.error("Error checking Discord role:", error);
          setIsAdmin(false);
        } else {
          setIsAdmin(data?.isAdmin === true);
        }
      } catch (err) {
        console.error("Error checking admin role:", err);
        setIsAdmin(false);
      } finally {
        setLoading(false);
      }
    };

    checkRole();
  }, [user]);

  return { isAdmin, loading };
}
