const config = require('../config')
const { cmd } = require('../command');
const os = require("os")
const { runtime } = require('../lib/functions')

cmd({
    pattern: "menu",
    alias: ["allmenu","fullmenu"],
    use: '.menu',
    desc: "Show all bot commands",
    category: "menu",
    react: "💋",
    filename: __filename
}, 
async (conn, mek, m, { from, reply }) => {
    try {
        let dec = `
🌹⃝━❮ 𝐐𝐀𝐃𝐄𝐄𝐑 ✦ 𝐗 ✦ 𝐍𝐎𝐌𝐈 ❯━🌹
┊┊┊⋆｡ ❀⋆｡ ☪︎⋆
⊹ ☪︎⋆ *𝘈𝘭𝘭 𝘔𝘦𝘯𝘶 𝘓𝘪𝘴𝘵* 🌙
✧━━━━━━━━━━━━━━━✧

⛤ *Bot Name* : ${config.BOT_NAME}
⛤ *Version*  : 4.0.0
⛤ *Runtime*  : ${runtime(process.uptime())}
⛤ *Owner*    : 𝐐𝐀𝐃𝐄𝐄𝐑 🫶🏻
⛤ *Platform* : ${os.platform()}
⛤ *Mode*     : ${config.MODE}
⛤ *Prefix*   : [${config.PREFIX}]
✧━━━━━━━━━━━━━━━✧


┏━❮⛤ *Main Menu* ⛤❯━
┃✰ ➣ .menu
┃✰ ➣ .owner
┃✰ ➣ .listcmd
┃✰ ➣ .repo
┃✰ ➣ .block
┃✰ ➣ .unblock
┃✰ ➣ .restart
┃✰ ➣ .shutdown
┃✰ ➣ .ping
┃✰ ➣ .alive
┃✰ ➣ .updatecmd
┃✰ ➣ .fullpp
┃✰ ➣ .setpp
┃✰ ➣ .jid
┗━━━━━━━━━━━━━━━┛


┏━❮⛤ *Download Tools* ⛤❯━
┃✰ ➣ .tiktok
┃✰ ➣ .facebook
┃✰ ➣ .apk
┃✰ ➣ .insta
┃✰ ➣ .twitter
┃✰ ➣ .play
┃✰ ➣ .play2
┃✰ ➣ .pinterest
┃✰ ➣ .spotify
┃✰ ➣ .audio
┃✰ ➣ .video
┃✰ ➣ .video2
┃✰ ➣ .ytmp4
┃✰ ➣ .mediafire
┃✰ ➣ .gdrive
┃✰ ➣ .tiks
┃✰ ➣ .ssweb
┃✰ ➣ .daram
┗━━━━━━━━━━━━━━━┛


┏━❮⛤ *Art / Logo Maker* ⛤❯━
┃✰ ➣ .naruto
┃✰ ➣ .dragonball
┃✰ ➣ .neonlight
┃✰ ➣ .blackpink
┃✰ ➣ .sadgirl
┃✰ ➣ .3dcomic
┃✰ ➣ .futuristic
┃✰ ➣ .clouds
┃✰ ➣ .leaf
┃✰ ➣ .eraser
┃✰ ➣ .sunset
┃✰ ➣ .galaxy
┃✰ ➣ .boom
┃✰ ➣ .hacker
┃✰ ➣ .devilwings
┃✰ ➣ .angelwings
┃✰ ➣ .luxury
┃✰ ➣ .zodiac
┃✰ ➣ .paint
┃✰ ➣ .frozen
┃✰ ➣ .castle
┃✰ ➣ .tattoo
┃✰ ➣ .valorant
┃✰ ➣ .bear
┃✰ ➣ .typography
┃✰ ➣ .birthday
┗━━━━━━━━━━━━━━━┛


┏━❮⛤ *Other Tools* ⛤❯━
┃✰ ➣ .alive
┃✰ ➣ .live
┃✰ ➣ .speed
┃✰ ➣ .uptime
┃✰ ➣ .runtime
┃✰ ➣ .timenow
┃✰ ➣ .calculate
┃✰ ➣ .count
┃✰ ➣ .date
┃✰ ➣ .cpp
┃✰ ➣ .fact
┃✰ ➣ .weather
┃✰ ➣ .fancy
┃✰ ➣ .define
┃✰ ➣ .news
┃✰ ➣ .githubstalk
┃✰ ➣ .wikipedia
┃✰ ➣ .save
┃✰ ➣ .coinflip
┃✰ ➣ .roll
┃✰ ➣ .rcolor
┃✰ ➣ .pair
┃✰ ➣ .movie
┃✰ ➣ .logo
┗━━━━━━━━━━━━━━━┛


┏━❮⛤ *Converter* ⛤❯━
┃✰ ➣ .sticker
┃✰ ➣ .take
┃✰ ➣ .emojimix
┃✰ ➣ .tts
┃✰ ➣ .tomp3
┃✰ ➣ .trt
┃✰ ➣ .base64
┃✰ ➣ .unbase64
┃✰ ➣ .dbinary
┃✰ ➣ .tinyurl
┃✰ ➣ .url
┃✰ ➣ .urlencode
┃✰ ➣ .urldecode
┃✰ ➣ .readmore
┃✰ ➣ .repeat
┃✰ ➣ .ask
┗━━━━━━━━━━━━━━━┛


┏━❮⛤ *Anime Zone* ⛤❯━
┃✰ ➣ .foxgirl
┃✰ ➣ .animenews
┃✰ ➣ .naruto
┃✰ ➣ .dare
┃✰ ➣ .truth
┃✰ ➣ .awoo
┃✰ ➣ .dog
┃✰ ➣ .neko
┃✰ ➣ .waifu
┃✰ ➣ .loli
┃✰ ➣ .maid
┃✰ ➣ .megnumin
┃✰ ➣ .animegirl
┃✰ ➣ .animegirl1
┃✰ ➣ .anime2
┃✰ ➣ .anime3
┗━━━━━━━━━━━━━━━┛


┏━❮⛤ *AI & Chat* ⛤❯━
┃✰ ➣ .ai
┃✰ ➣ .gpt
┃✰ ➣ .gpt2
┃✰ ➣ .gpt3
┃✰ ➣ .gpt4
┃✰ ➣ .copilot
┃✰ ➣ .blackbox
┃✰ ➣ .luma
┃✰ ➣ .imagine
┃✰ ➣ .imagine2
┗━━━━━━━━━━━━━━━┛


┏━❮⛤ *Premium Zone* ⛤❯━
┃ 🚀 Super Fast
┃ ⚡ Powerful
┃ 👑 Elite Access
┗━━━━━━━━━━━━━━━┛


*© 𝐐𝐀𝐃𝐄𝐄𝐑 ✦ 𝐗 ✦ 𝐍𝐎𝐌𝐈*
        `;

        await conn.sendMessage(
            from,
            {
                image: { url: config.MENU_IMAGE_URL || 'https://files.catbox.moe/528hh2.jpg' },
                caption: dec
            },
            { quoted: mek }
        );

    } catch (e) {
        console.log(e);
        reply(`❌ Error: ${e}`);
    }
});
