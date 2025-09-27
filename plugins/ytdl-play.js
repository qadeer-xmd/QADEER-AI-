const { cmd } = require("../command");
const ytdl = require("ytdl-core");
const yts = require("yt-search");
const fs = require("fs");

// ─── 🎵 PLAY (AUDIO) ─────────────────────────────────────────
cmd({
  pattern: "play",
  alias: ["song", "mp3"],
  desc: "Download YouTube Audio",
  category: "downloader",
  react: "💋",
  filename: __filename
}, async (conn, mek, m, { from, q, reply }) => {
  try {
    if (!q) return reply("❌ Please provide a YouTube link or search query.\n\nExample: .play pasoori");

    let url;
    if (q.includes("youtube.com") || q.includes("youtu.be")) {
      url = q;
    } else {
      let search = await yts(q);
      if (!search || !search.videos.length) return reply("⚠️ No results found.");
      url = search.videos[0].url;
    }

    let info = await ytdl.getInfo(url);
    let title = info.videoDetails.title;
    let filePath = `./${Date.now()}.mp3`;

    const stream = ytdl(url, { filter: "audioonly", quality: "highestaudio" });
    stream.pipe(fs.createWriteStream(filePath));

    stream.on("end", async () => {
      await conn.sendMessage(from, {
        audio: fs.readFileSync(filePath),
        mimetype: "audio/mpeg",
        fileName: `${title}.mp3`,
        caption: "✨ 𝑷𝑶𝑾𝑬𝑹𝑬𝑫 𝑩𝒀 𝑸𝑨𝑫𝑬𝑬𝑹-𝑨𝑰 ✨"
      }, { quoted: mek });

      fs.unlinkSync(filePath);
    });

  } catch (e) {
    console.log(e);
    reply("⚠️ Error while fetching audio.");
  }
});

// ─── 🎬 VIDEO ─────────────────────────────────────────
cmd({
  pattern: "video",
  alias: ["vid", "ytv"],
  desc: "Download YouTube Video",
  category: "downloader",
  react: "🫦",
  filename: __filename
}, async (conn, mek, m, { from, q, reply }) => {
  try {
    if (!q) return reply("❌ Please provide a YouTube link or search query.\n\nExample: .video pasoori");

    let url;
    if (q.includes("youtube.com") || q.includes("youtu.be")) {
      url = q;
    } else {
      let search = await yts(q);
      if (!search || !search.videos.length) return reply("⚠️ No results found.");
      url = search.videos[0].url;
    }

    let info = await ytdl.getInfo(url);
    let title = info.videoDetails.title;
    let filePath = `./${Date.now()}.mp4`;

    const stream = ytdl(url, { filter: "videoandaudio", quality: "highest" });
    stream.pipe(fs.createWriteStream(filePath));

    stream.on("end", async () => {
      await conn.sendMessage(from, {
        video: fs.readFileSync(filePath),
        mimetype: "video/mp4",
        fileName: `${title}.mp4`,
        caption: "✨ 𝑷𝑶𝑾𝑬𝑹𝑬𝑫 𝑩𝒀 𝑸𝑨𝑫𝑬𝑬𝑹-𝑨𝑰 ✨"
      }, { quoted: mek });

      fs.unlinkSync(filePath);
    });

  } catch (e) {
    console.log(e);
    reply("⚠️ Error while fetching video.");
  }
});
