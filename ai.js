module.exports = {
  ai: async (sock, msg, args) => {
    const q = args.join(" ");
    const reply = `🧠 AI RESPONSE:\n\nYou asked: ${q}\n\n(Connect OpenAI API here in V3)`;

    await sock.sendMessage(msg.key.remoteJid, { text: reply });
  },

  gpt: async (sock, msg, args) => {
    await sock.sendMessage(msg.key.remoteJid, {
      text: "🤖 GPT module ready (API not connected yet)"
    });
  }
};
