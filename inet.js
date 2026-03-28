const {
  default: makeWASocket,
  useMultiFileAuthState,
  DisconnectReason
} = require("@whiskeysockets/baileys");

const P = require("pino");
const config = require("./config");
const loadCommands = require("./lib/loader");

async function startBot() {
  const { state, saveCreds } = await useMultiFileAuthState(config.SESSION);

  const sock = makeWASocket({
    logger: P({ level: "silent" }),
    auth: state,
    printQRInTerminal: false,
    browser: ["iNET X-MD V2", "Chrome", "2.0.0"]
  });

  // Pairing Code
  if (!sock.authState.creds.registered) {
    const code = await sock.requestPairingCode(config.OWNER_NUMBER);
    console.log("🔑 PAIRING CODE:", code);
  }

  sock.ev.on("creds.update", saveCreds);

  sock.ev.on("connection.update", (update) => {
    const { connection, lastDisconnect } = update;

    if (connection === "close") {
      const shouldReconnect =
        lastDisconnect?.error?.output?.statusCode !== DisconnectReason.loggedOut;

      if (shouldReconnect) startBot();
    }

    if (connection === "open") {
      console.log("✅ iNET X-MD V2 ONLINE");
    }
  });

  // Load Commands
  const commands = loadCommands();

  sock.ev.on("messages.upsert", async ({ messages }) => {
    const msg = messages[0];
    if (!msg.message) return;

    const text =
      msg.message.conversation ||
      msg.message.extendedTextMessage?.text || "";

    const prefix = config.PREFIX;

    if (!text.startsWith(prefix)) return;

    const args = text.slice(prefix.length).trim().split(" ");
    const cmd = args.shift().toLowerCase();

    if (commands[cmd]) {
      try {
        await commands[cmd](sock, msg, args);
      } catch (e) {
        console.log("Error:", e);
      }
    }
  });
}

module.exports = startBot;
