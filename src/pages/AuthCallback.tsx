import { useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { useNavigate } from "react-router-dom";

export default function AuthCallback() {
  const navigate = useNavigate();

  useEffect(() => {
    const handleSession = async () => {
      const { data, error } = await supabase.auth.getSession();

      if (error || !data.session) {
        console.error("Kon sessie niet ophalen:", error?.message);
        navigate("/");
      } else {
        console.log("Ingelogd met Discord:", data.session.user);
        navigate("/");
      }
    };

    handleSession();
  }, [navigate]);

  return <div>Even geduld, je wordt ingelogd...</div>;
}
