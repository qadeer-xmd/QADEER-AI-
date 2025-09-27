const { cmd } = require("../command");
const fetch = require("node-fetch");
const yts = require("yt-search");

cmd({
  pattern: "video",
  alias: ["vid", "ytv"],
  desc: "Download YouTube Video",
  category: "downloader",
  react: "📽️",
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

    await conn.sendMessage(from, { video: { url: videoUrl }, caption: "*Powered By QADEER-Ai*" }, { quoted: mek });

  } catch (e) {
    reply("❌ Error while fetching video.");
    console.log(e);
  }
});