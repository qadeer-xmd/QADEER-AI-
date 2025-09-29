const config = require('../config');
const { cmd } = require('../command');
const axios = require('axios');

cmd({
  pattern: "play",
  alias: ["ytmp3"],
  desc: "Download YouTube song (MP3)",
  category: "main",
  use: ".play <song name>",
  react: "🔰",
  filename: __filename
}, async (conn, mek, m, { from, reply, q }) => {
  try {
    if (!q) return reply("❗ Please provide a song name.");

    // ⏳ Processing reaction
    await conn.sendMessage(from, { react: { text: '⏳', key: m.key } });

    // 🔍 Search on YouTube using yt-search
    const yts = require('yt-search');
    const search = await yts(q);
    if (!search.videos.length) {
      await conn.sendMessage(from, { react: { text: '❌', key: m.key } });
      return reply("❌ No results found.");
    }

    const video = search.videos[0]; // first result
    const url = video.url;

    // 🌐 Call your API
    const apiUrl = `https://api.nekolabs.my.id/downloader/youtube/play/v1?q=${encodeURIComponent(url)}`;
    const res = await axios.get(apiUrl);

    if (!res.data || !res.data.download) {
      await conn.sendMessage(from, { react: { text: '❌', key: m.key } });
      return reply("⚠️ API error. Couldn’t fetch audio.");
    }

    // 🎶 Send audio
    await conn.sendMessage(from, {
      audio: { url: res.data.download },
      mimetype: "audio/mpeg",
      fileName: `${video.title}.mp3`
    }, { quoted: mek });

    // ✅ Success
    await reply(`🎶 *${video.title}*\n\n*_𝙿𝙾𝚆𝙴𝚁𝙴𝙳 𝙱𝚈 𝚀𝙰𝙳𝙴𝙴𝚁 𝙰𝙸_*`);
    await conn.sendMessage(from, { react: { text: '✅', key: m.key } });

  } catch (err) {
    console.error(err);
    await conn.sendMessage(from, { react: { text: '❌', key: m.key } });
    reply("⚠️ Error occurred. Try again.");
  }
});
