import { createClient } from "@supabase/supabase-js";
import bcrypt from "bcryptjs";  // ⬅️ gebruik bcryptjs i.p.v. bcrypt

// Vul hier je Supabase gegevens in of zet ze in .env
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY // service key nodig!
);

async function addAdmin(username, password) {
  try {
    const hash = await bcrypt.hash(password, 10);

    const { data, error } = await supabase
      .from("admin_users")
      .insert([{ username, password_hash: hash, is_active: true }]);

    if (error) {
      console.error("❌ Error adding admin:", error);
    } else {
      console.log("✅ Admin added:", data);
    }
  } catch (err) {
    console.error("❌ Unexpected error:", err);
  }
}

// ✏️ Voorbeeld admin toevoegen:
addAdmin("admin1", "SterkWachtwoord123");
