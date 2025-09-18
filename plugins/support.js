const { cmd } = require('../command');

// 🛠️ Support Command
cmd({
    pattern: "support",
    desc: "Get the link to the support group or page.",
    react: "🛠️",
    category: "utility",
    use: ".support",
}, async (conn, mek, m) => {
    try {
        const channelLink = "https://whatsapp.com/channel/0029VbAkAEhCRs1g8MmyEJ2K";
        const supportLink = "https://chat.whatsapp.com/Ef2nZy6u85t4scMDNptqjk?mode=ems_copy_t";

        // Stylish message send
        const sentMsg = await conn.sendMessage(m.chat, {
            text: `╭╼╼╼╼╼╼╼╼╼╼╼╼╼╼╼╼╼╼╼╮
> *_Tʜᴀɴᴋs ғᴏʀ ᴄᴏɴᴛᴀᴄᴛɪɴɢ ᴡɪᴛʜ 𝚀𝙰𝙳𝙴𝙴𝚁 𝙰𝙸 _*
> *_ʜᴇʀᴇ's ᴛʜᴇ ʟɪɴᴋ ᴛᴏ ᴏᴜʀ ᴏғғɪᴄɪᴀʟ 𝚀𝙰𝙳𝙴𝙴𝚁 𝙰𝙸 ᴄʜᴀɴɴᴇʟ ᴊᴏɪɴ ᴜs ᴛᴏ sᴛᴀʏ ᴜᴘᴅᴀᴛᴇᴅ_*
> *_Fᴏʟʟᴏᴡ Wʜᴀᴛsᴘᴘ Cʜᴀɴɴᴇʟ_*
> *_${channelLink}_*
> ------------------------------------------------
> *_ɴᴇᴇᴅ ʜᴇʟᴘ ᴏʀ ʜᴀᴠᴇ ǫᴜᴇsᴛɪᴏɴs ᴊᴏɪɴ ᴛʜᴇ 𝚀𝙰𝙳𝙴𝙴𝚁 𝙰𝙸 sᴜᴘᴘᴏʀᴛ ɢʀᴏᴜᴘ ғᴇᴇʟ ғʀᴇᴇ ᴛᴏ ᴀsᴋ ǫᴜᴇsᴛɪᴏɴs ᴏʀ ʀᴇᴘᴏʀᴛ ɪssᴜᴇs_*
> *_Jᴏɪɴ Wʜᴀᴛsᴀᴘᴘ Gʀᴏᴜᴘ_*
> *_${supportLink}_*
> ------------------------------------------------
      *_𝙿𝙾𝚆𝙴𝚁𝙴𝙳 𝙱𝚈 𝚀𝙰𝙳𝙴𝙴𝚁-𝙰𝙸_*
╰╼╼╼╼╼╼╼╼╼╼╼╼╼╼╼╼╼╼╼╯`
        }, { quoted: mek });

        // Auto reaction on sent message
        await conn.sendMessage(m.chat, { react: { text: "👍", key: sentMsg.key } });

    } catch (error) {
        console.error("Error sending support info:", error.message);
        await m.reply("❌ Sorry, an error occurred while trying to send the support information.");
    }
});
