import { useEffect, useState } from "react";
import { useSession } from "@supabase/auth-helpers-react";

export function useIsWebAdmin() {
  const session = useSession();
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkRole = async () => {
      if (!session?.user) {
        setIsAdmin(false);
        setLoading(false);
        return;
      }

      try {
        const res = await fetch("/api/check-discord-role", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId: session.user.id }),
        });

        const data = await res.json();
        setIsAdmin(data.isAdmin === true);
      } catch (err) {
        console.error("Error checking admin role:", err);
        setIsAdmin(false);
      } finally {
        setLoading(false);
      }
    };

    checkRole();
  }, [session]);

  return { isAdmin, loading };
}
