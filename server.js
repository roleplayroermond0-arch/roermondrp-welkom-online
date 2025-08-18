import express from "express";
import fetch from "node-fetch";

const app = express();
const PORT = 3001;

// Zet hier jouw echte server ID (Roermond Roleplay)
const DISCORD_GUILD_ID = "1026150701891588098"; 

app.use(express.json());

app.post("/check-discord", async (req, res) => {
  const { access_token } = req.body;
  if (!access_token) {
    return res.status(401).json({ error: "No access token provided" });
  }

  try {
    const response = await fetch("https://discord.com/api/users/@me/guilds", {
      headers: { Authorization: `Bearer ${access_token}` },
    });

    const guilds = await response.json();

    const inServer = Array.isArray(guilds) && guilds.some((g) => g.id === DISCORD_GUILD_ID);

    if (!inServer) {
      return res.status(403).json({ error: "Je moet lid zijn van de Discord server." });
    }

    return res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Discord API error" });
  }
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
