const { cmd } = require("../command");
const fetch = require("node-fetch");
const yts = require("yt-search");

// 🎵 AUDIO (play / song)
cmd({
  pattern: "play",
  alias: ["song", "mp3"],
  desc: "Download YouTube Audio",
  category: "downloader",
  react: "🫦",
  filename: __filename
}, async (conn, mek, m, { from, q, reply }) => {
  try {
    if (!q) return reply("❗ Provide a YouTube link or search query.\nExample: .play Pasoori");

    let url;
    if (q.includes("youtube.com") || q.includes("youtu.be")) {
      url = q;
    } else {
      let search = await yts(q);
      if (!search.videos || search.videos.length === 0) return reply("❌ No results found.");
      url = search.videos[0].url;
    }

    let api = await fetch(`https://youtube-download-api.matheusishiyama.repl.co/mp3/?url=${encodeURIComponent(url)}`);
    let res = await api.json();
    if (!res.success || !res.link) return reply("⚠️ Failed to fetch audio.");

    await conn.sendMessage(from, {
      audio: { url: res.link },
      mimetype: "audio/mpeg",
      ptt: false,
      caption: "𝐏𝐎𝐖𝐄𝐑𝐄𝐃 𝐁𝐘 𝐐𝐀𝐃𝐄𝐄𝐑-𝐀𝐈"
    }, { quoted: mek });

  } catch (err) {
    console.error(err);
    reply("⚠️ Error while fetching audio.");
  }
});

// 📹 VIDEO (video / ytv)
cmd({
  pattern: "video",
  alias: ["vid", "ytv"],
  desc: "Download YouTube Video",
  category: "downloader",
  react: "💋",
  filename: __filename
}, async (conn, mek, m, { from, q, reply }) => {
  try {
    if (!q) return reply("❗ Provide a YouTube link or search query.\nExample: .video Pasoori");

    let url;
    if (q.includes("youtube.com") || q.includes("youtu.be")) {
      url = q;
    } else {
      let search = await yts(q);
      if (!search.videos || search.videos.length === 0) return reply("❌ No results found.");
      url = search.videos[0].url;
    }

    let api = await fetch(`https://youtube-download-api.matheusishiyama.repl.co/mp4/?url=${encodeURIComponent(url)}`);
    let res = await api.json();
    if (!res.success || !res.link) return reply("⚠️ Failed to fetch video.");

    await conn.sendMessage(from, {
      video: { url: res.link },
      caption: "𝐏𝐎𝐖𝐄𝐑𝐄𝐃 𝐁𝐘 𝐐𝐀𝐃𝐄𝐄𝐑-𝐀𝐈"
    }, { quoted: mek });

  } catch (err) {
    console.error(err);
    reply("⚠️ Error while fetching video.");
  }
});
