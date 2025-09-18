const fs = require('fs');
const path = require('path');
const { getConfig } = require("./lib/configdb");

if (fs.existsSync('config.env')) require('dotenv').config({ path: './config.env' });

function convertToBool(text, fault = 'true') {
    return text === fault ? true : false;
}

module.exports = {
    // ===== BOT CORE SETTINGS =====
    SESSION_ID: process.env.SESSION_ID || "QADEER-AI~eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiU0RHSDVBZjAyS3ZjeWpHWVNOSkZnbW1DcFNxeGpNWmhSb01hN055WTVWQT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoidk5VOEcrT0hndlVGc1hYajdlV2NtR3hoekd2a1FRVE5NMTRFRmpoUFNXaz0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJBT2V5blFNdWNMZmUwTzdHYzVuSlc3UEsyUDJHenNoeFdreGQ1TGI4SkhRPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJ2NEtUVDZGQ3YwQUsyQjFrUGJJTWRiWDgwUzMrbk5BTDdVaEJuUU1QRWgwPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Ik1CVXJ6QVU3Mndzbll2M3B4dGx6WnEzWDBKbC9FRGR0R0s1YTM2Z1Z2MFU9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjYzanp4Z2hIcDJrMHZYNEh4Qm9RSlR5Nnk2K2s1WEZKL0NkcTV0VU5DZ0k9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQUVoVWEwQUo3Z1VKWDlHM2EwcWkzQSt6OGowYmlQT3pibU1QekhtLzJXUT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoid2VDdFJKcUFPM3dweHBGR1czTWcxeGl1VUhrblZZbS9pUm9sb2FQanZUbz0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlFWQTNzaEZDM2l6WUdzUUM0QkdobjR0TVN2RkNXVzZEOU9Wb2MvSmVIVHJOSGVzSDVWaU5STFFyYWFZa0YxcnZqSi9UN2FxdWp3M3RsY3ZyQ0tERUJBPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MjI2LCJhZHZTZWNyZXRLZXkiOiJRaGt1NDY3SlRBWE5pa2poUVpReXdjSnhvUHJ2Q2htbFlkUkhLK2NwVDJzPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W3sia2V5Ijp7InJlbW90ZUppZCI6IjkyMzMwMDAwNTI1M0BzLndoYXRzYXBwLm5ldCIsImZyb21NZSI6dHJ1ZSwiaWQiOiJBQzkwQjIwRTgwRUUxQ0U0QTI0QUFCRkQ2MTE2QzI3MCJ9LCJtZXNzYWdlVGltZXN0YW1wIjoxNzU4MTQ4NzgzfSx7ImtleSI6eyJyZW1vdGVKaWQiOiI5MjMzMDAwMDUyNTNAcy53aGF0c2FwcC5uZXQiLCJmcm9tTWUiOnRydWUsImlkIjoiQUNEOEEwMTcyNzcxODlFMkNGNjNFRDMzNjYyRkQ1OUMifSwibWVzc2FnZVRpbWVzdGFtcCI6MTc1ODE0ODc4M31dLCJuZXh0UHJlS2V5SWQiOjMxLCJmaXJzdFVudXBsb2FkZWRQcmVLZXlJZCI6MzEsImFjY291bnRTeW5jQ291bnRlciI6MSwiYWNjb3VudFNldHRpbmdzIjp7InVuYXJjaGl2ZUNoYXRzIjpmYWxzZX0sInJlZ2lzdGVyZWQiOnRydWUsInBhaXJpbmdDb2RlIjoiRVgxVldSTkgiLCJtZSI6eyJpZCI6IjkyMzMwMDAwNTI1MzozN0BzLndoYXRzYXBwLm5ldCIsImxpZCI6IjIyNTQwODk0MzQwMzE5NTozN0BsaWQiLCJuYW1lIjoiUSBBIEQgRSBFIFIgLfCfjJ8ifSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ01HbTd1RUNFS254ck1ZR0dBRWdBQ2dBIiwiYWNjb3VudFNpZ25hdHVyZUtleSI6IkxoaEovbzh2R0JVT3BocWdCUjA1Qnp1bnZFSG0vaHVvQmgycm9TQi95eHM9IiwiYWNjb3VudFNpZ25hdHVyZSI6IkQ1MGdOM0RidVMyNHI1Yk5CWTN5Nm4zOHp1OURWWnc1RU1ua2lnOVIxMWpWQWY0SjJMUlZPL0FvRVVvWHpsbEV4NkZjWXQ0emhhN1dlQnNpSUgrYUJnPT0iLCJkZXZpY2VTaWduYXR1cmUiOiIyNFpOS0NpL1h3SVQwNkdqZkxQMFhJeTR2d0R3NjFuUHRyb0daNTV0bnJYd1B0MGxwMS8vTlhpUUplL2lIT2RsSWFlQVhhczlBL0lIdENxai9IdWVBQT09In0sInNpZ25hbElkZW50aXRpZXMiOlt7ImlkZW50aWZpZXIiOnsibmFtZSI6IjkyMzMwMDAwNTI1MzozN0BzLndoYXRzYXBwLm5ldCIsImRldmljZUlkIjowfSwiaWRlbnRpZmllcktleSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJTNFlTZjZQTHhnVkRxWWFvQVVkT1FjN3A3eEI1djRicUFZZHE2RWdmOHNiIn19XSwicGxhdGZvcm0iOiJhbmRyb2lkIiwicm91dGluZ0luZm8iOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJDQUlJRWc9PSJ9LCJsYXN0QWNjb3VudFN5bmNUaW1lc3RhbXAiOjE3NTgxNDg3ODEsImxhc3RQcm9wSGFzaCI6IlBXazVCIiwibXlBcHBTdGF0ZUtleUlkIjoiQUFBQUFLRzYifQ==",  // Your bot's session ID (keep it secure)
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
        
