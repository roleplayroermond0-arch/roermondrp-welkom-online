import { supabase } from "@/lib/supabase";

export default function DiscordLoginButton() {
  const handleLogin = async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "discord",
      options: {
        redirectTo: "https://roermond-rp.nl/auth/callback",
      },
    });

    if (error) {
      console.error("Discord login error:", error.message);
    } else {
      console.log("Redirecting to Discord OAuth...", data);
    }
  };

  return (
    <button
      onClick={handleLogin}
      className="w-full bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition"
    >
      Inloggen met Discord
    </button>
  );
}
