‎const { cmd } = require("../command");
‎const fetch = require("node-fetch");
‎const yts = require("yt-search");
‎
‎// 🎵 Play Command (David API)
‎cmd({
‎  pattern: "play",
‎  alias: ["ytmp3"],
‎  desc: "Download YouTube song (MP3)",
‎  category: "main",
‎  use: ".playx <song name>",
‎  react: "🔰",
‎  filename: __filename
‎}, async (conn, mek, m, { from, reply, q }) => {
‎  try {
‎    if (!q) return reply("❗ Please provide a song name.");
‎
‎    // ⏳ Processing reaction
‎    await conn.sendMessage(from, { react: { text: '⏳', key: m.key } });
‎
‎    const url = `https://apis.davidcyriltech.my.id/play?query=${encodeURIComponent(q)}`;
‎    const res = await fetch(url);
‎    const data = await res.json();
‎
‎    if (!data.status || !data.result?.download_url) {
‎      await conn.sendMessage(from, { react: { text: '❌', key: m.key } });
‎      return reply("❌ No audio found or API error.");
‎    }
‎
‎    const song = data.result;
‎
‎    await conn.sendMessage(from, {
‎      audio: { url: song.download_url },
‎      mimetype: "audio/mpeg",
‎      fileName: `${song.title}.mp3`
‎    }, { quoted: mek });
‎
‎    await reply(`*_ᴘᴏᴡᴇʀᴇᴅ ʙʏ ʀᴀʜᴍᴀɴ-ᴍᴅ_*`);
‎
‎    // ✅ Success reaction
‎    await conn.sendMessage(from, { react: { text: '✅', key: m.key } });
‎
‎  } catch (err) {
‎    console.error(err);
‎    await conn.sendMessage(from, { react: { text: '❌', key: m.key } });
‎    reply("⚠️ Error occurred. Try again.");
‎  }
‎});
‎
‎
‎// 📹 Video Command (Gtech API)
‎cmd({
‎  pattern: "video",
‎  alias: ["vid", "ytv"],
‎  desc: "Download YouTube Video",
‎  category: "downloader",
‎  react: "🎥",
‎  filename: __filename
‎}, async (conn, mek, m, { from, q, reply }) => {
‎  try {
‎    if (!q) return reply("Please provide a YouTube link or search query.\nExample: .video Pasoori");
‎
‎    let url;
‎    if (q.includes("youtube.com") || q.includes("youtu.be")) {
‎      url = q;
‎    } else {
‎      let search = await yts(q);
‎      if (!search || !search.videos || search.videos.length === 0) return reply("No results found.");
‎      url = search.videos[0].url;
‎    }
‎
‎    let res = await fetch(`https://gtech-api-xtp1.onrender.com/api/video/yt?apikey=APIKEY&url=${encodeURIComponent(url)}`);
‎    let data = await res.json();
‎
‎    if (!data.status) return reply("Failed to fetch video.");
‎    let videoUrl = data.result.media.video_url_hd !== "No HD video URL available"
‎      ? data.result.media.video_url_hd
‎      : data.result.media.video_url_sd;
‎
‎    if (!videoUrl) return reply("No downloadable video found.");
‎
‎    await conn.sendMessage(from, { video: { url: videoUrl }, caption: "𝙿𝙾𝚆𝙴𝚁𝙴𝙳 𝙱𝚈 𝚀𝙰𝙳𝙴𝙴𝚁-𝙰𝙸" }, { quoted: mek });
‎
‎  } catch (e) {
‎    reply("❌ Error while fetching video.");
‎    console.log(e);
‎  }
‎});
