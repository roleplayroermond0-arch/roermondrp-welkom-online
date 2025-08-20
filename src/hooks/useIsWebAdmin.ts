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
        // Get the current session to access provider token
        const { data: session } = await supabase.auth.getSession();
        
        if (!session.session?.provider_token) {
          console.log('No Discord token available');
          setIsAdmin(false);
          setLoading(false);
          return;
        }

        // Get Discord ID from user metadata
        const discordId = session.session.user.user_metadata?.provider_id;
        
        if (!discordId) {
          console.log('No Discord ID found');
          setIsAdmin(false);
          setLoading(false);
          return;
        }

        // Check Discord role using our edge function
        const { data, error } = await supabase.functions.invoke("check-discord-role", {
          body: { 
            discord_id: discordId,
            access_token: session.session.provider_token 
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
