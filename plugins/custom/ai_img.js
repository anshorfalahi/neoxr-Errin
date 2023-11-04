exports.run = {
  usage: ['ai-img'],
  use: 'prompt',
  category: 'img-ai-gen',
  async: async (m, {
     client,
     text,
     isPrefix,
     command,
     Func
  }) => {
     try {
        if (!text) return client.reply(m.chat, Func.example(isPrefix, command, 'world after nuke war, with no human around anymore. in anime art'), m)
        await client.sendReact(m.chat, '🕒', m.key)
        let result = (`https://aemt.me/ai/generator/image?text=${encodeURIComponent(text)}`)
        client.sendFile(m.chat, result, 'image.png', `*Prompt = ${text}*`, m)
     } catch (e) {
        client.reply(m.chat, Func.jsonFormat(e), m)
     }
  },
  error: false,
  limit: true,
  cache: true,
  location: __filename
}