// QADEER-AI YouTube Downloader
// Don't remove credits

const { cmd } = require("../command");
const ytdl = require("ytdl-core");
const yts = require("yt-search");
const fs = require("fs");

// =========================================
// PLAY (Simple YouTube Audio Downloader)
// =========================================
cmd({
    pattern: "play",
    alias: ["yta", "song"],
    desc: "Download YouTube audio",
    category: "media",
    filename: __filename
}, async (conn, mek, m, { from, q, reply }) => {
    try {
        if (!q) return reply("⚠️ Please provide a song name or YouTube link.");

        let video;
        if (ytdl.validateURL(q)) {
            video = await ytdl.getInfo(q);
        } else {
            const search = await yts(q);
            if (!search.videos.length) return reply("❌ No results found.");
            video = await ytdl.getInfo(search.videos[0].url);
        }

        const title = video.videoDetails.title.replace(/[^\w\s]/gi, '').substring(0, 50);
        const stream = ytdl.downloadFromInfo(video, { quality: "highestaudio" });
        const filePath = `./${title}.mp3`;

        const writeStream = fs.createWriteStream(filePath);
        stream.pipe(writeStream);

        writeStream.on("finish", async () => {
            await conn.sendMessage(from, {
                audio: fs.readFileSync(filePath),
                mimetype: "audio/mpeg",
                fileName: `${title}.mp3`
            }, { quoted: mek });
            fs.unlinkSync(filePath);
        });

    } catch (err) {
        console.error("Play Command Error:", err);
        reply("⚠️ Failed to download song. Try again.");
    }
});

// =========================================
// PLAY2 (Audio + Info Card)
// =========================================
cmd({
    pattern: "play2",
    alias: ["yta2"],
    desc: "Download audio with video info",
    category: "media",
    filename: __filename
}, async (conn, mek, m, { from, q, reply }) => {
    try {
        if (!q) return reply("⚠️ Please provide a song name or YouTube link.");

        const search = await yts(q);
        if (!search.videos.length) return reply("❌ No results found.");
        const vid = search.videos[0];
        const video = await ytdl.getInfo(vid.url);

        const caption = 
`‎*_ʏᴛ ᴀᴜᴅɪᴏ ᴅᴏᴡɴʟᴏᴀᴅᴇʀ_*
‎*╭━━━━━━━━━━━━━━━━━━๏*
‎*┇*๏ *ᴛɪᴛʟᴇ:* ${vid.title}
‎*┇*๏ *ᴅᴜʀᴀᴛɪᴏɴ:* ${vid.timestamp}
‎*┇*๏ *ᴠɪᴇᴡs:* ${vid.views}
‎*┇*๏ *ᴀᴜᴛʜᴏʀ:* ${vid.author.name}
‎*╰━━━━━━━━━━━━━━━━━━๏*
‎*╭────────────────━┈⍟*
‎┋ *_𝙿𝙾𝚆𝙴𝚁𝙴𝙳 𝙱𝚈 𝚀𝙰𝙳𝙴𝙴𝚁-𝙰𝙸_* 
‎*╰────────────────━┈⍟*`;

        await conn.sendMessage(from, {
            image: { url: vid.thumbnail },
            caption
        }, { quoted: mek });

        const title = video.videoDetails.title.replace(/[^\w\s]/gi, '').substring(0, 50);
        const stream = ytdl.downloadFromInfo(video, { quality: "highestaudio" });
        const filePath = `./${title}.mp3`;

        const writeStream = fs.createWriteStream(filePath);
        stream.pipe(writeStream);

        writeStream.on("finish", async () => {
            await conn.sendMessage(from, {
                audio: fs.readFileSync(filePath),
                mimetype: "audio/mpeg",
                fileName: `${title}.mp3`
            }, { quoted: mek });
            fs.unlinkSync(filePath);
        });

    } catch (err) {
        console.error("Play2 Command Error:", err);
        reply("❌ Failed to download audio.");
    }
});

// =========================================
// PLAY3 (Choice System: Video / Audio / Doc)
// =========================================
cmd({
    pattern: "play3",
    alias: ["yta3", "music"],
    desc: "Download YouTube with options",
    category: "download",
    filename: __filename
}, async (conn, mek, m, { from, q, reply }) => {
    try {
        if (!q) return reply("⚠️ Please provide a YouTube link or song name.");

        const search = await yts(q);
        if (!search.videos.length) return reply("❌ No results found.");
        const vid = search.videos[0];
        const video = await ytdl.getInfo(vid.url);

        let ytmsg = `*_‎𝚀𝙰𝙳𝙴𝙴𝚁 𝙰𝙸 ʏᴛ ᴅᴏᴡɴʟᴏᴀᴅᴇʀ_*
‎*╭━━━━━━━━━━━━━━━━━━๏*
‎*┇*๏ *ᴛɪᴛʟᴇ:* ${vid.title}
‎*┇*๏ *ᴅᴜʀᴀᴛɪᴏɴ:* ${vid.timestamp}
‎*┇*๏ *ᴠɪᴇᴡs:* ${vid.views}
‎*┇*๏ *ᴀᴜᴛʜᴏʀ:* ${vid.author.name}
‎*╰━━━━━━━━━━━━━━━━━━๏*

‎🔢 *Reply with number:*
*‎1 ║❯❯ Video 📽️*
*‎2 ║❯❯ Audio 🎵*
*‎3 ║❯❯ Voice Note 🎙️*
*‎4 ║❯❯ Document (mp4) 📁*
*‎5 ║❯❯ Document (mp3) 📃*`;

        const sentMsg = await conn.sendMessage(from, {
            image: { url: vid.thumbnail },
            caption: ytmsg
        }, { quoted: mek });

        const messageID = sentMsg.key.id;
        let responded = false;

        const replyHandler = async (msgData) => {
            const receivedMsg = msgData.messages[0];
            if (!receivedMsg.message || responded) return;

            const receivedText = receivedMsg.message.conversation || 
                receivedMsg.message.extendedTextMessage?.text;
            const isReplyToBot = receivedMsg.message.extendedTextMessage?.contextInfo?.stanzaId === messageID;

            if (isReplyToBot) {
                if (!['1','2','3','4','5'].includes(receivedText)) {
                    await conn.sendMessage(from, { text: "❌ Invalid option!" }, { quoted: receivedMsg });
                    return;
                }

                responded = true;
                conn.ev.off("messages.upsert", replyHandler);

                const title = video.videoDetails.title.replace(/[^\w\s]/gi, '').substring(0, 50);

                switch (receivedText) {
                    case "1": {
                        const stream = ytdl.downloadFromInfo(video, { quality: "highestvideo" });
                        const filePath = `./${title}.mp4`;
                        stream.pipe(fs.createWriteStream(filePath)).on("finish", async () => {
                            await conn.sendMessage(from, { video: fs.readFileSync(filePath), caption: "> *POWERED BY QADEER-AI*" }, { quoted: receivedMsg });
                            fs.unlinkSync(filePath);
                        });
                        break;
                    }
                    case "2": {
                        const stream = ytdl.downloadFromInfo(video, { quality: "highestaudio" });
                        const filePath = `./${title}.mp3`;
                        stream.pipe(fs.createWriteStream(filePath)).on("finish", async () => {
                            await conn.sendMessage(from, { audio: fs.readFileSync(filePath), mimetype: "audio/mpeg", fileName: `${title}.mp3` }, { quoted: receivedMsg });
                            fs.unlinkSync(filePath);
                        });
                        break;
                    }
                    case "3": {
                        const stream = ytdl.downloadFromInfo(video, { quality: "highestaudio" });
                        const filePath = `./${title}.ogg`;
                        stream.pipe(fs.createWriteStream(filePath)).on("finish", async () => {
                            await conn.sendMessage(from, { audio: fs.readFileSync(filePath), mimetype: "audio/ogg; codecs=opus", ptt: true }, { quoted: receivedMsg });
                            fs.unlinkSync(filePath);
                        });
                        break;
                    }
                    case "4": {
                        const stream = ytdl.downloadFromInfo(video, { quality: "highestvideo" });
                        const filePath = `./${title}.mp4`;
                        stream.pipe(fs.createWriteStream(filePath)).on("finish", async () => {
                            await conn.sendMessage(from, { document: fs.readFileSync(filePath), mimetype: "video/mp4", fileName: `${title}.mp4` }, { quoted: receivedMsg });
                            fs.unlinkSync(filePath);
                        });
                        break;
                    }
                    case "5": {
                        const stream = ytdl.downloadFromInfo(video, { quality: "highestaudio" });
                        const filePath = `./${title}.mp3`;
                        stream.pipe(fs.createWriteStream(filePath)).on("finish", async () => {
                            await conn.sendMessage(from, { document: fs.readFileSync(filePath), mimetype: "audio/mpeg", fileName: `${title}.mp3` }, { quoted: receivedMsg });
                            fs.unlinkSync(filePath);
                        });
                        break;
                    }
                }
            }
        };

        conn.ev.on("messages.upsert", replyHandler);
        setTimeout(() => {
            if (!responded) conn.ev.off("messages.upsert", replyHandler);
        }, 60000);

    } catch (err) {
        console.error("Play3 Command Error:", err);
        reply("⚠️ Error occurred. Try again.");
    }
});
// ===============================
// PLAY4 (VIDEO + AUDIO DETAILS)
// ===============================
cmd({
    pattern: "play4",
    alias: ["yta4"],
    react: "🎶",
    desc: "Download video + audio details",
    category: "media",
    use: ".play4 <song name or URL>",
    filename: __filename
}, async (conn, mek, m, { from, q, reply }) => {
    try {
        if (!q) return reply("Please provide a song name or YouTube link.");

        const search = await yts(q);
        if (!search.videos.length) return reply("No results found.");
        const vid = search.videos[0];
        const video = await ytdl.getInfo(vid.url);

        const caption = `🎵 Title: ${vid.title}\n📀 Duration: ${vid.timestamp}\n👀 Views: ${vid.views}`;

        await conn.sendMessage(from, {
            video: { url: vid.url },
            caption
        }, { quoted: mek });

    } catch (err) {
        console.error(err);
        reply("⚠️ Error downloading video. Try again.");
    }
});
