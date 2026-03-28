module.exports = {
  kick: async (sock, msg) => {
    await sock.sendMessage(msg.key.remoteJid, {
      text: "👥 Kick feature placeholder (needs admin logic)"
    });
  },

  tagall: async (sock, msg) => {
    await sock.sendMessage(msg.key.remoteJid, {
      text: "📢 TagAll placeholder"
    });
  }
};
