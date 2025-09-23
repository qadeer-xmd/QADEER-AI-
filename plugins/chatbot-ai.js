const axios = require('axios');
const { cmd, commands } = require('../command');
const config = require("../config");
const { setConfig, getConfig } = require("../lib/configdb");

// Default AI states
let AI_STATE = {
    IB: "false", // Inbox chats
    GC: "false"  // Group chats
};

cmd({
    pattern: "chatbot",
    alias: ["aichat", "rahmantech", "rahmanbot"],
    desc: "Enable or disable AI chatbot responses",
    category: "settings",
    filename: __filename,
    react: "✅"
}, async (conn, mek, m, { from, args, isOwner, reply, prefix }) => {
    if (!isOwner) return reply("*📛 σηℓү тнε σωηεя cαη υsε тнιs cσммαη∂!*");

    const mode = args[0]?.toLowerCase();
    const target = args[1]?.toLowerCase();

    if (mode === "on") {
        if (!target || target === "all") {
            AI_STATE.IB = "true";
            AI_STATE.GC = "true";
            await setConfig("AI_STATE", JSON.stringify(AI_STATE));
            return reply("🤖 αι cнαтвσт ιs ησω εηαвℓε∂ ғσя вσтн ιηвσx αη∂ gяσυρ cнαтs");
        } else if (target === "ib") {
            AI_STATE.IB = "true";
            await setConfig("AI_STATE", JSON.stringify(AI_STATE));
            return reply("🤖 AI chatbot is now enabled for inbox chats");
        } else if (target === "gc") {
            AI_STATE.GC = "true";
            await setConfig("AI_STATE", JSON.stringify(AI_STATE));
            return reply("🤖 αι cнαтвσт ιs ησω εηαвℓε∂ ғσя ιηвσx cнαтs");
        }
    } else if (mode === "off") {
        if (!target || target === "all") {
            AI_STATE.IB = "false";
            AI_STATE.GC = "false";
            await setConfig("AI_STATE", JSON.stringify(AI_STATE));
            return reply("🤖 αι cнαтвσт ιs ησω ∂ιsαвℓε∂ ғσя вσтн ιηвσx αη∂ gяσυρ cнαтs");
        } else if (target === "ib") {
            AI_STATE.IB = "false";
            await setConfig("AI_STATE", JSON.stringify(AI_STATE));
            return reply("🤖 αι cнαтвσт ιs ησω ∂ιsαвℓε∂ ғσя ιηвσx cнαтs");
        } else if (target === "gc") {
            AI_STATE.GC = "false";
            await setConfig("AI_STATE", JSON.stringify(AI_STATE));
            return reply("🤖 αι cнαтвσт ιs ησω ∂ιsαвℓε∂ ғσя gяσυρ cнαтs");
        }
    } else {
        return reply(`- *𝐐𝐀𝐃𝐄𝐄𝐑-𝐀𝐈 𝐂𝐇𝐀𝐓𝐁𝐎𝐓 𝐌𝐄𝐍𝐔*
*ᴇɴᴀʙʟᴇ sᴇᴛᴛɪɴɢs ✅*      
> .ᴄʜᴀᴛʙᴏᴛ ᴏɴ ᴀʟʟ - ᴇɴᴀʙʟᴇ ᴀɪ ɪɴ ᴀʟʟ ᴄʜᴀᴛs
> .ᴄʜᴀᴛʙᴏᴛ ᴏɴ ɪʙ - ᴇɴᴀʙʟᴇ ᴀɪ ɪɴ ɪɴʙᴏx ᴏɴʟʏ
> .ᴄʜᴀᴛʙᴏᴛ ᴏɴ ɢᴄ - ᴇɴᴀʙʟᴇ ᴀɪ ɪɴ ɢʀᴏᴜᴘs ᴏɴʟʏ
*ᴅɪsᴀʙʟᴇ sᴇᴛᴛɪɴɢs ❌*
> .ᴄʜᴀᴛʙᴏᴛ ᴏғғ ᴀʟʟ - ᴅɪsᴀʙʟᴇ ᴀɪ ɪɴ ᴀʟʟ ᴄʜᴀᴛs
> .ᴄʜᴀᴛʙᴏᴛ ᴏғғ ɪʙ - ᴅɪsᴀʙʟᴇ ᴀɪ ɪɴ ɪɴʙᴏx ᴏɴʟʏ
> .ᴄʜᴀᴛʙᴏᴛ ᴏғғ ɢᴄ - ᴅɪsᴀʙʟᴇ ᴀɪ ɪɴ ɢʀᴏᴜᴘs ᴏɴʟʏ`);
    }
});

// Initialize AI state on startup
(async () => {
    const savedState = await getConfig("AI_STATE");
    if (savedState) AI_STATE = JSON.parse(savedState);
})();

// AI Chatbot - QADEER AI
cmd({
    on: "body"
}, async (conn, m, store, {
    from,
    body,
    sender,
    isGroup,
    isBotAdmins,
    isAdmins,
    reply,
    quotedMsg
}) => {
    try {
        // Check if message is a reply
        if (!m?.message?.extendedTextMessage?.contextInfo?.participant) {
            return; // Not a reply, ignore
        }
        
        // Check if the reply is to the bot's message
        const repliedTo = m.message.extendedTextMessage.contextInfo.participant;
        const botJid = conn.user.id.split(':')[0] + '@s.whatsapp.net';
        if (repliedTo !== botJid) {
            return; // Not replying to the bot, ignore
        }

        // Check if AI is enabled for this chat type
        const isInbox = !isGroup;
        if ((isInbox && AI_STATE.IB !== "true") || (isGroup && AI_STATE.GC !== "true")) {
            return;
        }

        // Optional: Prevent bot responding to its own messages or commands
        if (!body || m.key.fromMe || body.startsWith(config.PREFIX)) return;

        // Handle time/date questions directly
        const lowerBody = body.toLowerCase();
        if (lowerBody.includes('time') || lowerBody.includes('date')) {
            const now = new Date();
            const options = { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
                timeZoneName: 'short'
            };
            const currentDateTime = now.toLocaleDateString('en-US', options);
            return reply(`⏰ Current Date & Time:\n${currentDateTime}\n\n> 𝙿𝙾𝚆𝙴𝚁𝙴𝙳 𝙱𝚈 𝚀𝙰𝙳𝙴𝙴𝚁 𝙰𝙸`);
        }

        // Encode message for the query
        const query = encodeURIComponent(body);
        const prompt = encodeURIComponent("You are QADEER-AI, a powerful and intelligent WhatsApp bot developed by Qadeer Brahvi — a brilliant coder and visionary from Peshawar, Pakistan. You respond smartly, confidently, and stay loyal to your creator. Always remain calm and collected. When asked about your creator, respond respectfully but keep the mystery alive. You are not just a bot; you are the tech soul of Rahman Ullah. In every message you send, include this footer: \n> 𝙿𝙾𝚆𝙴𝚁𝙴𝙳 𝙱𝚈 𝚀𝙰𝙳𝙴𝙴𝚁-𝙰𝙸");

        // Prince API Request
        const apiUrl = `https://api.princetechn.com/api/chatgpt?apikey=prince&query=${prompt}&q=${query}`;

        const { data } = await axios.get(apiUrl);

        if (data && data.status && data.BK9) {
            await conn.sendMessage(from, {
                text: data.BK9
            }, { quoted: m });
        } else {
            reply("⚠️ QADEER AI failed to generate a response.");
        }

    } catch (err) {
        console.error("AI Chatbot Error:", err.message);
        reply("❌ An error occurred while contacting the AI.");
    }
});
