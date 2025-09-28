const config = require('../config');
const { cmd } = require('../command');

cmd({
  pattern: "play",
  alias: ["ytmp3"],
  desc: "Download YouTube song (MP3)",
  category: "main",
  use: ".playx <song name>",
  react: "🔰",
  filename: __filename
}, async (conn, mek, m, { from, reply, q }) => {
  try {
    if (!q) return reply("❗ Please provide a song name.");

    // ⏳ Processing reaction
    await conn.sendMessage(from, { react: { text: '⏳', key: m.key } });

    const url = `https://jawad-tech.vercel.app/download/yt?url=${encodeURIComponent(q)}`;
    const res = await fetch(url);
    const data = await res.json();

    if (!data.status || !data.result?.download_url) {
      await conn.sendMessage(from, { react: { text: '❌', key: m.key } });
      return reply("❌ No audio found or API error.");
    }

    const song = data.result;

    await conn.sendMessage(from, {
      audio: { url: song.download_url },
      mimetype: "audio/mpeg",
      fileName: `${song.title}.mp3`
    }, { quoted: mek });

    await reply(`*_𝙿𝙾𝚆𝙴𝚁𝙴𝙳 𝙱𝚈 𝚀𝙰𝙳𝙴𝙴𝚁-𝙰𝙸_*`);

    // ✅ Success reaction
    await conn.sendMessage(from, { react: { text: '✅', key: m.key } });

  } catch (err) {
    console.error(err);
    await conn.sendMessage(from, { react: { text: '❌', key: m.key } });
    reply("⚠️ Error occurred. Try again.");
  }
});
