exports.run = {
  usage: ['pat', 'waifu', 'neko', 'shinobu', 'bully', 'megumin', 'cuddle', 'cry', 'hug', 'awoo', 'kiss', 'lick', 'smug', 'bonk', 'yeet', 'blush', 'smile', 'wave', 'highfive', 'handhold', 'nom', 'bite', 'glomp', 'slap', 'kill', 'kick', 'happy', 'wink', 'poke', 'dance', 'cringe'],
  category: 'gif',
  async: async (m, {
     client,
     command,
     isPrefix,
     Func,
}) => {
 try {
	let rpat = await fetch(`https://api.waifu.pics/sfw/${command}`)
    if (!rpat.ok) throw await rpat.text()
    let json = await rpat.json()
 	let exif = global.db.setting
 	client.sendSticker(m.chat, json.url, m, {
                 packname: exif.sk_pack,
                 author: exif.sk_author
              })
     } catch (e) {
        client.reply(m.chat, Func.jsonFormat(e), m)    
     }
  },
  error: false,
  cache: true,
  limit: true,
  location: __filename
}