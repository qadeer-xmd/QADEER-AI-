const { cmd } = require("../command");
const fetch = require("node-fetch");
const yts = require("yt-search");

// 🎵 Play Command (David API)
cmd({
  pattern: "play",
  alias: ["song", "mp3"],
  desc: "Download YouTube Audio",
  category: "downloader",
  react: "💋",
  filename: __filename
}, async (conn, mek, m, { from, q, reply }) => {
  try {
    if (!q) return reply("Please provide a YouTube link or search query.\nExample: .play madine wale");

    let url;
    if (q.includes("youtube.com") || q.includes("youtu.be")) {
      url = q;
    } else {
      let search = await yts(q);
      if (!search || !search.videos || search.videos.length === 0) return reply("No results found.");
      url = search.videos[0].url;
    }

    let res = await fetch(`https://apis.davidcyriltech.my.id/play?query=${encodeURIComponent(url)}`);
    let data = await res.json();

    if (!data.status) return reply("Failed to fetch audio.");
    let audioUrl = data.result.media.audio_url || data.result.media.audio;
    if (!audioUrl) return reply("No audio found in API response.");

    await conn.sendMessage(from, { audio: { url: audioUrl }, mimetype: "audio/mpeg" }, { quoted: mek });

  } catch (e) {
    reply("❌ Error while fetching audio.");
    console.log(e);
  }
});

// 📹 Video Command (Gtech API)
cmd({
  pattern: "video",
  alias: ["vid", "ytv"],
  desc: "Download YouTube Video",
  category: "downloader",
  react: "🫦",
  filename: __filename
}, async (conn, mek, m, { from, q, reply }) => {
  try {
    if (!q) return reply("Please provide a YouTube link or search query.\nExample: .video Pasoori");

    let url;
    if (q.includes("youtube.com") || q.includes("youtu.be")) {
      url = q;
    } else {
      let search = await yts(q);
      if (!search || !search.videos || search.videos.length === 0) return reply("No results found.");
      url = search.videos[0].url;
    }

    let res = await fetch(`https://gtech-api-xtp1.onrender.com/api/video/yt?apikey=APIKEY&url=${encodeURIComponent(url)}`);
    let data = await res.json();

    if (!data.status) return reply("Failed to fetch video.");
    let videoUrl = data.result.media.video_url_hd !== "No HD video URL available"
      ? data.result.media.video_url_hd
      : data.result.media.video_url_sd;

    if (!videoUrl) return reply("No downloadable video found.");

    await conn.sendMessage(from, { video: { url: videoUrl }, caption: "𝙿𝙾𝚆𝙴𝚁𝙴𝙳 𝙱𝚈 𝚀𝙰𝙳𝙴𝙴𝚁-𝙰𝙸" }, { quoted: mek });

  } catch (e) {
    reply("❌ Error while fetching video.");
    console.log(e);
  }
});
