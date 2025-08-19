import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import supabase from "@/lib/supabase";

export default function ResetPassword() {
  const [newPassword, setNewPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(true);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const token = searchParams.get("token");
    const type = searchParams.get("type");

    console.log("🔑 URL token:", token);
    console.log("📌 URL type:", type);

    if (token && type === "recovery") {
      (async () => {
        const { data, error } = await supabase.auth.exchangeCodeForSession(token);
        if (error) {
          console.error("❌ Session exchange error:", error.message);
          setErrorMsg("Kon sessie niet herstellen. Probeer de link opnieuw te openen.");
        } else {
          console.log("✅ Sessie ingesteld:", data);
        }
        setLoading(false);
      })();
    } else {
      console.warn("⚠️ Geen geldig token/type in URL gevonden.");
      setLoading(false);
    }
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    try {
      console.log("🔐 Probeer wachtwoord update...");
      const { error } = await supabase.auth.updateUser({ password: newPassword });
      if (error) throw error;

      setSuccess(true);
    } catch (err: any) {
      console.error("❌ updateUser error:", err.message);
      setErrorMsg(err.message || "Er ging iets mis.");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <p className="text-muted-foreground">Bezig met laden...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background/95 to-primary/5 p-4">
      <div className="w-full max-w-md animate-fade-in">
        <div className="bg-card/80 backdrop-blur-sm border-0 shadow-2xl rounded-lg p-8">
          <div className="space-y-1 pb-4">
            <h2 className="text-2xl font-bold">Nieuw wachtwoord instellen</h2>
            <p className="text-muted-foreground">
              Voer je nieuwe wachtwoord in om je account te beveiligen.
            </p>
          </div>

          {success ? (
            <div className="text-center space-y-4">
              <div className="w-16 h-16 mx-auto bg-green-100 rounded-full flex items-center justify-center mb-4">
                <svg className="h-8 w-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <p className="text-green-600 font-medium">Je wachtwoord is succesvol aangepast.</p>
              <p className="text-sm text-muted-foreground">Je kunt nu opnieuw inloggen met je nieuwe wachtwoord.</p>
              <a 
                href="/" 
                className="inline-block w-full bg-primary text-primary-foreground px-4 py-2 rounded-md text-center hover:bg-primary/90 transition-colors"
              >
                Naar login
              </a>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Nieuw wachtwoord"
                  required
                  className="w-full px-3 py-2 border border-input bg-background rounded-md focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all duration-200"
                />
              </div>
              <button 
                type="submit" 
                className="w-full bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90 transition-all duration-200 hover:scale-[1.02]"
              >
                Bevestigen
              </button>
              {errorMsg && (
                <p className="text-red-600 text-sm mt-2 p-3 bg-red-50 rounded-md border border-red-200">
                  {errorMsg}
                </p>
              )}
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
