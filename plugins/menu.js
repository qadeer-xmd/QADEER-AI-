const config = require('../config')
const { cmd, commands } = require('../command');
const os = require("os")
const { runtime } = require('../lib/functions')
const axios = require('axios')

cmd({
    pattern: "menu",
    alias: ["allmenu","fullmenu"],
    use: '.menu',
    desc: "Show all bot commands",
    category: "menu",
    react: "⭐",
    filename: __filename
}, 
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        let dec = `✧✦✧━━━━━━━━━━━━━━✧✦✧
             ✦ 𝗤𝗔𝗗𝗘𝗘𝗥 𝗔𝗜 ✦
✧✦✧━━━━━━━━━━━━━━✧✦✧

   ✦ ʙᴏᴛ ɴᴀᴍᴇ : ${config.BOT_NAME}  
   ✦ ᴠᴇʀꜱɪᴏɴ  : 4.0.0  
   ✦ ʀᴜɴᴛɪᴍᴇ : ${runtime(process.uptime())}  
   ✦ ᴏᴡɴᴇʀ   : 𝗤𝗔𝗗𝗘𝗘𝗥 𝗔𝗜 👑  
   ✦ ᴘʟᴀᴛғᴏʀᴍ : ${os.platform()}  
   ✦ ᴍᴏᴅᴇ    : ${config.MODE}  
   ✦ ᴘʀᴇғɪx  : [${config.PREFIX}]  

✧✦✧━━━━━━━━━━━━━━✧✦✧
          ✦ ᴍᴀɪɴ ᴍᴇɴᴜ ✦
✧✦✧━━━━━━━━━━━━━━✧✦✧

   ✦ .ᴍᴇɴᴜ        ✦ .ᴏᴡɴᴇʀ  
   ✦ .ʟɪꜱᴛᴄᴍᴅ     ✦ .ʀᴇᴘᴏ  
   ✦ .ʙʟᴏᴄᴋ       ✦ .ᴜɴʙʟᴏᴄᴋ  
   ✦ .ʀᴇꜱᴛᴀʀᴛ     ✦ .ꜱʜᴜᴛᴅᴏᴡɴ  
   ✦ .ᴘɪɴɢ        ✦ .ᴀʟɪᴠᴇ  
   ✦ .ᴜᴘᴅᴀᴛᴇᴄᴍᴅ  ✦ .ꜰᴜʟʟᴘᴘ  
   ✦ .ꜱᴇᴛᴘᴘ      ✦ .ᴊɪᴅ  

✧✦✧━━━━━━━━━━━━━━✧✦✧
     ✦ ᴅᴏᴡɴʟᴏᴀᴅ ᴛᴏᴏʟꜱ ✦
✧✦✧━━━━━━━━━━━━━━✧✦✧

   ✦ .ᴛɪᴋᴛᴏᴋ     ✦ .ꜰᴀᴄᴇʙᴏᴏᴋ  
   ✦ .ᴀᴘᴋ        ✦ .ɪɴꜱᴛᴀ  
   ✦ .ᴛᴡɪᴛᴛᴇʀ    ✦ .ᴘʟᴀʏ  
   ✦ .ᴘʟᴀʏ2      ✦ .ᴘɪɴᴛᴇʀᴇꜱᴛ  
   ✦ .ꜱᴘᴏᴛɪꜰʏ    ✦ .ᴀᴜᴅɪᴏ  
   ✦ .ᴠɪᴅᴇᴏ      ✦ .ᴠɪᴅᴇᴏ2  
   ✦ .ʏᴛᴍᴘ4      ✦ .ᴍᴇᴅɪᴀꜰɪʀᴇ  
   ✦ .ɢᴅʀɪᴠᴇ     ✦ .ᴛɪᴋꜱ  
   ✦ .ꜱꜱᴡᴇʙ      ✦ .ᴅᴀʀᴀᴍᴀ  

✧✦✧━━━━━━━━━━━━━━✧✦✧
       ✦ ᴀʀᴛ / ʟᴏɢᴏ ᴍᴀᴋᴇʀ ✦
✧✦✧━━━━━━━━━━━━━━✧✦✧

   ✦ .ɴᴀʀᴜᴛᴏ     ✦ .ᴅʀᴀɢᴏɴʙᴀʟʟ  
   ✦ .ɴᴇᴏɴʟɪɢʜᴛ  ✦ .ʙʟᴀᴄᴋᴘɪɴᴋ  
   ✦ .sᴀᴅɢɪʀʟ    ✦ .3ᴅᴄᴏᴍɪᴄ  
   ✦ .ғᴜᴛᴜʀɪsᴛɪᴄ ✦ .ᴄʟᴏᴜᴅs  
   ✦ .ʟᴇᴀғ       ✦ .ᴇʀᴀsᴇʀ  
   ✦ .ꜱᴜɴꜱᴇᴛ     ✦ .ɢᴀʟᴀxʏ  
   ✦ .ʙᴏᴏᴍ       ✦ .ʜᴀᴄᴋᴇʀ  
   ✦ .ᴅᴇᴠɪʟᴡɪɴɢs ✦ .ᴀɴɢᴇʟᴡɪɴɢs  
   ✦ .ʟᴜxᴜʀʏ     ✦ .ᴢᴏᴅɪᴀᴄ  
   ✦ .ᴘᴀɪɴᴛ      ✦ .ғʀᴏᴢᴇɴ  
   ✦ .ᴄᴀsᴛʟᴇ     ✦ .ᴛᴀᴛᴏᴏ  
   ✦ .ᴠᴀʟᴏʀᴀɴᴛ   ✦ .ʙᴇᴀʀ  
   ✦ .ᴛʏᴘᴏɢʀᴀᴘʜʏ ✦ .ʙɪʀᴛʜᴅᴀʏ  

✧✦✧━━━━━━━━━━━━━━✧✦✧
          ✦ ᴏᴛʜᴇʀ ✦
✧✦✧━━━━━━━━━━━━━━✧✦✧

   ✦ .ᴀʟɪᴠᴇ      ✦ .ʟɪᴠᴇ  
   ✦ .ꜱᴘᴇᴇᴅ      ✦ .ᴜᴘᴛɪᴍᴇ  
   ✦ .ʀᴜɴᴛɪᴍᴇ    ✦ .ᴛɪᴍᴇɴᴏᴡ  
   ✦ .ᴄᴀʟᴄᴜʟᴀᴛᴇ ✦ .ᴄᴏᴜɴᴛ  
   ✦ .ᴅᴀᴛᴇ       ✦ .ᴄᴘᴘ  
   ✦ .ғᴀᴄᴛ       ✦ .ᴡᴇᴀᴛʜᴇʀ  
   ✦ .ғᴀɴᴄʏ      ✦ .ᴅᴇғɪɴᴇ  
   ✦ .ɴᴇᴡs       ✦ .ɢɪᴛʜᴜʙꜱᴛᴀʟᴋ  
   ✦ .ᴡɪᴋɪᴘᴇᴅɪᴀ ✦ .ꜱᴀᴠᴇ  
   ✦ .ᴄᴏɪɴғʟɪᴘ   ✦ .ʀᴏʟʟ  
   ✦ .ʀᴄᴏʟᴏʀ     ✦ .ᴘᴀɪʀ  
   ✦ .ᴍᴏᴠɪᴇ      ✦ .ʟᴏɢᴏ  

✧✦✧━━━━━━━━━━━━━━✧✦✧
        ✦ ᴄᴏɴᴠᴇʀᴛᴇʀ ✦
✧✦✧━━━━━━━━━━━━━━✧✦✧

   ✦ .ꜱᴛɪᴄᴋᴇʀ    ✦ .ᴛᴀᴋᴇ  
   ✦ .ᴇᴍᴏᴊɪᴍɪx   ✦ .ᴛᴛꜱ  
   ✦ .ᴛᴏᴍᴘ3      ✦ .ᴛʀᴛ  
   ✦ .ʙᴀꜱᴇ64     ✦ .ᴜɴʙᴀꜱᴇ64  
   ✦ .ᴅʙɪɴᴀʀʏ   ✦ .ᴛɪɴʏᴜʀʟ  
   ✦ .ᴜʀʟ       ✦ .ᴜʀʟᴇɴᴄᴏᴅᴇ  
   ✦ .ᴜʀʟᴅᴇᴄᴏᴅᴇ ✦ .ʀᴇᴀᴅᴍᴏʀᴇ  
   ✦ .ʀᴇᴘᴇᴀᴛ     ✦ .ᴀꜱᴋ  

✧✦✧━━━━━━━━━━━━━━✧✦✧
          ✦ ᴀɴɪᴍᴇ ✦
✧✦✧━━━━━━━━━━━━━━✧✦✧

   ✦ .ғᴏxɢɪʀʟ    ✦ .ᴀɴɪᴍᴇɴᴇᴡꜱ  
   ✦ .ɴᴀʀᴜᴛᴏ    ✦ .ᴅᴀʀᴇ  
   ✦ .ᴛʀᴜᴛʜ     ✦ .ᴀᴡᴏᴏ  
   ✦ .ᴅᴏɢ       ✦ .ɴᴇᴋᴏ  
   ✦ .ᴡᴀɪғᴜ     ✦ .ʟᴏʟɪ  
   ✦ .ᴍᴀɪᴅ      ✦ .ᴍᴇɢɴᴜᴍɪɴ  
   ✦ .ᴀɴɪᴍᴇɢɪʀʟ ✦ .ᴀɴɪᴍᴇɢɪʀʟ1  
   ✦ .ᴀɴɪᴍᴇ2    ✦ .ᴀɴɪᴍᴇ3  

✧✦✧━━━━━━━━━━━━━━✧✦✧
        ✦ ᴀɪ & ᴄʜᴀᴛ ✦
✧✦✧━━━━━━━━━━━━━━✧✦✧

   ✦ .ᴀɪ        ✦ .ɢᴘᴛ  
   ✦ .ɢᴘᴛ2      ✦ .ɢᴘᴛ3  
   ✦ .ɢᴘᴛ4      ✦ .ᴄᴏᴘɪʟᴏᴛ  
   ✦ .ʙʟᴀᴄᴋʙᴏx  ✦ .ʟᴜᴍᴀ  
   ✦ .ɪᴍᴀɢɪɴᴇ   ✦ .ɪᴍᴀɢɪɴᴇ2  

✧✦✧━━━━━━━━━━━━━━✧✦✧
     ✦ ᴘʀᴇᴍɪᴜᴍ ★ ᴠɪᴘ ✦
✧✦✧━━━━━━━━━━━━━━✧✦✧

     ✦ 𝗤𝗔𝗗𝗘𝗘𝗥 𝗔𝗜 — 𝗧𝗵𝗲 𝗣𝗿𝗲𝗺𝗶𝘂𝗺 𝗕𝗼𝘁 ✦  
        🚀 𝗦𝘂𝗽𝗲𝗿 𝗙𝗮𝘀𝘁 | ⚡ 𝗣𝗼𝘄𝗲𝗿𝗳𝘂𝗹 | 👑 𝗘𝗹𝗶𝘁𝗲`;

        await conn.sendMessage(
            from,
            {
                image: { url: config.MENU_IMAGE_URL || 'https://files.catbox.moe/2ozgh8.jpg' },
                caption: dec,
                contextInfo: {
                    mentionedJid: [m.sender],
                    forwardingScore: 999,
                    isForwarded: true,
                    forwardedNewsletterMessageInfo: {
                        newsletterJid: '120363418906972955@newsletter',
                        newsletterName: config.BOT_NAME,
                        serverMessageId: 143
                    }
                }
            },
            { quoted: mek }
        );

        // Send audio
        await conn.sendMessage(from, {
            audio: { url: 'https://files.catbox.moe/k0em5t.mp3' },
            mimetype: 'audio/mp4',
            ptt: true
        }, { quoted: mek });
        
    } catch (e) {
        console.log(e);
        reply(`❌ Error: ${e}`);
    }
});