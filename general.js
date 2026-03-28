module.exports = {
  ping: async (sock, msg) => {
    await sock.sendMessage(msg.key.remoteJid, { text: "🏓 Pong!" });
  },

  menu: async (sock, msg) => {
    const text = `
🤖 iNET X-MD V2 MENU

GENERAL:
.ping .menu .alive

AI:
.ai .gpt

DOWNLOADER:
.yt .tiktok

GROUP:
.kick .tagall

TOOLS:
.calc .weather
`;
    await sock.sendMessage(msg.key.remoteJid, { text });
  },

  alive: async (sock, msg) => {
    await sock.sendMessage(msg.key.remoteJid, {
      text: "✅ iNET X-MD V2 is Alive!"
    });
  }
};
