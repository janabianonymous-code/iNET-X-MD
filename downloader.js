module.exports = {
  yt: async (sock, msg, args) => {
    await sock.sendMessage(msg.key.remoteJid, {
      text: "📥 YouTube downloader coming in V3 (API integration needed)"
    });
  },

  tiktok: async (sock, msg) => {
    await sock.sendMessage(msg.key.remoteJid, {
      text: "🎵 TikTok downloader placeholder"
    });
  }
};
