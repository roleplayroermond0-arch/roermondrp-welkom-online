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
    <div style={{ maxWidth: "400px", margin: "50px auto", padding: "20px", border: "1px solid #ccc", borderRadius: "8px" }}>
      <h2>Nieuw wachtwoord instellen</h2>
      {success ? (
        <p style={{ color: "green" }}>Je wachtwoord is succesvol aangepast. Je kunt nu opnieuw inloggen.</p>
      ) : (
        <form onSubmit={handleSubmit}>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="Nieuw wachtwoord"
            required
            style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
          />
          <button type="submit" style={{ width: "100%", padding: "10px", backgroundColor: "#007bff", color: "#fff", border: "none", borderRadius: "4px" }}>
            Bevestigen
          </button>
          {errorMsg && <p style={{ color: "red", marginTop: "10px" }}>{errorMsg}</p>}
        </form>
      )}
    </div>
  );
}
