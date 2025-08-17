import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";

export default function ResetPassword() {
  const [newPassword, setNewPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [success, setSuccess] = useState(false);
  const { updatePassword } = useAuth();
  const [searchParams] = useSearchParams();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updatePassword(newPassword);
      setSuccess(true);
    } catch (err: any) {
      setErrorMsg(err.message || "Er ging iets mis.");
    }
  };

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
