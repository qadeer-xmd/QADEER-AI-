const fs = require('fs');
const path = require('path');
const { getConfig } = require("./lib/configdb");

if (fs.existsSync('config.env')) require('dotenv').config({ path: './config.env' });

function convertToBool(text, fault = 'true') {
    return text === fault ? true : false;
}

module.exports = {
    // ===== BOT CORE SETTINGS =====
    SESSION_ID: process.env.SESSION_ID || "QADEER-AI~eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiTURZSk5NRmV2STdXMVUrbEJaMGQ3N09ia09UMm8yOXYxSGpkWllHS1ZuTT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiWnViSG0vdUM0SWlBVEhtbVVnamZWUGN1cXdsRW9DYUxIdE94N0JuOW95QT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJZS0g1R01pRU91UVAwNzYvNzdQamM4WnFQakM4anRlQ092ZS9qcW1SUldBPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJzaU1jYk12NXBXV3NUdmlIWVloK2ozVUZiUk5GenlCYjRtZUE5Zk9MejNrPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImFHeXJJNzhGMGViYTl0U1BPQW1EbWJSZW1mN2pka2hGNWR4NitIR3BhbFk9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImFWdTh0N3JkeER0bHI4NWVzcHpDTTA5YUxObXE3ZFd2WjZ4RGpFSnlOV0U9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiTUQ5RUwwbjhlUmpPekRmUnp4ZDRmcVVYenVXY1MvdjhVblh2dUVQcDRGWT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiMVB2RWx6NW80NHpnbjhFNE1wWDhkdC85bkdpS2RPTFBMQnlHK3Uwb2FsMD0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InQySXhEN3dRR2gwYlRCdTFxdXR1OHZxcDhCdWZnZENpQ2FPMFhNVXhiYk5CamUrTjVpdmJWUzFWbU5XejJJVXp5QjdBakVCM29iRHdKR0t2VFdBRGpRPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6NjAsImFkdlNlY3JldEtleSI6ImZnMHg2VXZjQnpRdy9WcHcyNUIyUVViQjBDYUlSbkdtZ01sSWcwd1NDN2s9IiwicHJvY2Vzc2VkSGlzdG9yeU1lc3NhZ2VzIjpbeyJrZXkiOnsicmVtb3RlSmlkIjoiOTIzMzAwMDA1MjUzQHMud2hhdHNhcHAubmV0IiwiZnJvbU1lIjp0cnVlLCJpZCI6IkFDOTUwOTFGOTQyN0VCRTIzREFFN0YzM0JDMDBENUExIn0sIm1lc3NhZ2VUaW1lc3RhbXAiOjE3NTgxOTA5NjR9LHsia2V5Ijp7InJlbW90ZUppZCI6IjkyMzMwMDAwNTI1M0BzLndoYXRzYXBwLm5ldCIsImZyb21NZSI6dHJ1ZSwiaWQiOiJBQ0VBMERBNzc4QzVDMjhFRTQyRTlDRjVCODE4QTMzNyJ9LCJtZXNzYWdlVGltZXN0YW1wIjoxNzU4MTkwOTY0fV0sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjoxLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwicmVnaXN0ZXJlZCI6dHJ1ZSwicGFpcmluZ0NvZGUiOiJTOFhWVkFZSCIsIm1lIjp7ImlkIjoiOTIzMzAwMDA1MjUzOjM4QHMud2hhdHNhcHAubmV0IiwibGlkIjoiMjI1NDA4OTQzNDAzMTk1OjM4QGxpZCIsIm5hbWUiOiJRIEEgRCBFIEUgUiAt8J+MnyJ9LCJhY2NvdW50Ijp7ImRldGFpbHMiOiJDTUttN3VFQ0VPeTZyOFlHR0FFZ0FDZ0EiLCJhY2NvdW50U2lnbmF0dXJlS2V5IjoiTGhoSi9vOHZHQlVPcGhxZ0JSMDVCenVudkVIbS9odW9CaDJyb1NCL3l4cz0iLCJhY2NvdW50U2lnbmF0dXJlIjoiOXhVZmhuTkVCa212ZExGS1lLT1FKcHF0NTQ3ZDJYdnhKSHVHNGNURldpeVJmVWxySlYrcVlKdWdWRGJjajZWRHBlcDdxRFI2UmdWR2FyQ1hvUE9nRGc9PSIsImRldmljZVNpZ25hdHVyZSI6InZCQmZ6Ny95QmMzdHI2dThscktGYml5OXdnTDZpbmJuTmUyZDNiaktnWUc0ZUxXSEdTam9VeXI1dXZheWVtNXo1Y2xOUHFsVFh1YThzM1VvaVJzNGpRPT0ifSwic2lnbmFsSWRlbnRpdGllcyI6W3siaWRlbnRpZmllciI6eyJuYW1lIjoiOTIzMzAwMDA1MjUzOjM4QHMud2hhdHNhcHAubmV0IiwiZGV2aWNlSWQiOjB9LCJpZGVudGlmaWVyS2V5Ijp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQlM0WVNmNlBMeGdWRHFZYW9BVWRPUWM3cDd4QjV2NGJxQVlkcTZFZ2Y4c2IifX1dLCJwbGF0Zm9ybSI6ImFuZHJvaWQiLCJyb3V0aW5nSW5mbyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkNBSUlFZz09In0sImxhc3RBY2NvdW50U3luY1RpbWVzdGFtcCI6MTc1ODE5MDk2MSwibGFzdFByb3BIYXNoIjoiUFdrNUIiLCJteUFwcFN0YXRlS2V5SWQiOiJBQUFBQUdLMSJ9",  // Your bot's session ID (keep it secure)
    PREFIX: getConfig("PREFIX") || ".",  // Command prefix (e.g., "., / ! * - +")
    CHATBOT: getConfig("CHATBOT") || "on", // on/off chat bot 
    BOT_NAME: process.env.BOT_NAME || getConfig("BOT_NAME") || "𝐐𝐀𝐃𝐄𝐄𝐑-𝐀𝐈",  // Bot's display name
    MODE: getConfig("MODE") || process.env.MODE || "public",        // Bot mode: public/private/group/inbox
    REPO: process.env.REPO || "https://github.com/qadeermd/QADEER-AI",  // Bot's GitHub repo
    BAILEYS: process.env.BAILEYS || "@whiskeysockets/baileys",  // Bot's BAILEYS

    // ===== OWNER & DEVELOPER SETTINGS =====
    OWNER_NUMBER: process.env.OWNER_NUMBER || "923300005253",  // Owner's WhatsApp number
    OWNER_NAME: process.env.OWNER_NAME || getConfig("OWNER_NAME") || "𝐐𝐀𝐃𝐄𝐄𝐑 𝐀𝐈",           // Owner's name
    DEV: process.env.DEV || "923300005253",                     // Developer's contact number
    DEVELOPER_NUMBER: '923300005253@s.whatsapp.net',            // Developer's WhatsApp ID

    // ===== AUTO-RESPONSE SETTINGS =====
    AUTO_REPLY: process.env.AUTO_REPLY || "false",              // Enable/disable auto-reply
    AUTO_STATUS_REPLY: process.env.AUTO_STATUS_REPLY || "false",// Reply to status updates?
    AUTO_STATUS_MSG: process.env.AUTO_STATUS_MSG || "*𝚀𝙰𝙳𝙴𝙴𝚁 𝙰𝙸 𝚅𝙸𝙴𝚆𝙴𝙳 𝚈𝙾𝚄𝚁 𝚂𝚃𝙰𝚃𝚄𝚂 🤖*",  // Status reply message
    READ_MESSAGE: process.env.READ_MESSAGE || "false",          // Mark messages as read automatically?
    REJECT_MSG: process.env.REJECT_MSG || "*📞 ᴄαℓℓ ɴσт αℓℓσωє∂ ιɴ тнιѕ ɴᴜмвєʀ уσυ ∂σɴт нανє ᴘєʀмιѕѕισɴ 📵*",
    // ===== REACTION & STICKER SETTINGS =====
    AUTO_REACT: process.env.AUTO_REACT || "false",              // Auto-react to messages?
    OWNER_REACT: process.env.OWNER_REACT || "false",              // Auto-react to messages?
    CUSTOM_REACT: process.env.CUSTOM_REACT || "false",          // Use custom emoji reactions?
    CUSTOM_REACT_EMOJIS: getConfig("CUSTOM_REACT_EMOJIS") || process.env.CUSTOM_REACT_EMOJIS || "💝,💖,💗,❤️‍🩹,❤️,🧡,💛,💚,💙,💜,🤎,🖤,🤍",  // set custom reacts
    STICKER_NAME: process.env.STICKER_NAME || "𝐐𝐀𝐃𝐄𝐄𝐑-𝐀𝐈",     // Sticker pack name
    AUTO_STICKER: process.env.AUTO_STICKER || "false",          // Auto-send stickers?
    // ===== MEDIA & AUTOMATION =====
    AUTO_RECORDING: process.env.AUTO_RECORDING || "false",      // Auto-record voice notes?
    AUTO_TYPING: process.env.AUTO_TYPING || "false",            // Show typing indicator?
    MENTION_REPLY: process.env.MENTION_REPLY || "false",   // reply on mentioned message 
    MENU_IMAGE_URL: getConfig("MENU_IMAGE_URL") || "https://files.catbox.moe/2ozgh8.jpg",  // Bot's "alive" menu mention image

    // ===== SECURITY & ANTI-FEATURES =====
    ANTI_DELETE: process.env.ANTI_DELETE || "true", // true antidelete to recover deleted messages 
    ANTI_CALL: process.env.ANTI_CALL || "false", // enble to reject calls automatically 
    ANTI_BAD_WORD: process.env.ANTI_BAD_WORD || "false",    // Block bad words?
    ANTI_LINK: process.env.ANTI_LINK || "true",    // Block links in groups
    ANTI_VV: process.env.ANTI_VV || "true",   // Block view-once messages
    DELETE_LINKS: process.env.DELETE_LINKS || "false",          // Auto-delete links?
    ANTI_DEL_PATH: process.env.ANTI_DEL_PATH || "same", // inbox deleted messages (or 'same' to resend)
    ANTI_BOT: process.env.ANTI_BOT || "true",
    PM_BLOCKER: process.env.PM_BLOCKER || "true",

    // ===== BOT BEHAVIOR & APPEARANCE =====
    DESCRIPTION: process.env.DESCRIPTION || "*_© 𝙿𝙾𝚆𝙴𝚁𝙴𝙳 𝙱𝚈 𝚀𝙰𝙳𝙴𝙴𝚁 𝙰𝙸*",  // Bot description
    PUBLIC_MODE: process.env.PUBLIC_MODE || "true",              // Allow public commands?
    ALWAYS_ONLINE: process.env.ALWAYS_ONLINE || "false",        // Show bot as always online?
    AUTO_STATUS_REACT: process.env.AUTO_STATUS_REACT || "true", // React to status updates?
    AUTO_STATUS_SEEN: process.env.AUTO_STATUS_SEEN || "true", // VIEW to status updates?
    AUTO_BIO: process.env.AUTO_BIO || "false", // ture to get auto bio 
    WELCOME: process.env.WELCOME || "false", // true to get welcome in groups 
    GOODBYE: process.env.GOODBYE || "false", // true to get goodbye in groups 
    ADMIN_ACTION: process.env.ADMIN_ACTION || "false", // true if want see admin activity 
};
        
