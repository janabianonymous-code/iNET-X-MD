module.exports = {
  calc: async (sock, msg, args) => {
    try {
      const result = eval(args.join(" "));
      await sock.sendMessage(msg.key.remoteJid, {
        text: `🧮 Result: ${result}`
      });
    } catch {
      await sock.sendMessage(msg.key.remoteJid, {
        text: "❌ Invalid calculation"
      });
    }
  },

  weather: async (sock, msg) => {
    await sock.sendMessage(msg.key.remoteJid, {
      text: "🌦 Weather system placeholder (add API later)"
    });
  }
};
