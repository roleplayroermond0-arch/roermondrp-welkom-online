import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { userId } = req.body;

  // ⬇️ Hier check je via Discord API of de gebruiker de rol Webadmin heeft
  // Voorbeeld: met discord.js REST client of fetch()
  // const hasRole = await checkDiscordRole(userId);

  // Dummy data (voor nu even hardcoded)
  const hasRole = true; // <-- later vervangen door echte Discord API call

  return res.status(200).json({ isAdmin: hasRole });
}
