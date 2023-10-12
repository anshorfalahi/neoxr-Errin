exports.run = {
   usage: ['sticker'],
   hidden: ['s', 'sk', 'stiker', 'sgif'],
   use: 'query / reply media',
   category: 'converter',
   async: async (m, {
      client,
      args,
      text,
      isPrefix,
      command,
      Func
   }) => {
      try {
         let old = new Date()
         let exif = global.db.setting
          if (text) {
         	if (!args || !args[0]) return client.reply(m.chat, Func.example(isPrefix, command, 'https://t.me/addstickers/NonromanticBear'), m)
         	if (!args[0].match('t.me')) return client.reply(m.chat, global.status.invalid, m)
         	client.sendReact(m.chat, '🕒', m.key)
         	const json = await Api.neoxr('/telesticker', {
            	url: Func.ttFixed(args[0])
         	})
               for (let i = 0; i < json.data.length; i++) {
                  client.sendSticker(m.chat, await Func.fetchBuffer(json.data[i].url), m, {
                     packname: exif.sk_pack,
                     author: exif.sk_author
                  })
                  await Func.delay(2000)
               }
               await client.reply(m.chat, Func.texted('bold', `✅ Done, all stickers converted successfully.\n\n Fetching in : ${((new Date - old) * 1)} ms`), m)
         }
         else if (m.quoted ? m.quoted.message : m.msg.viewOnce) {
            let type = m.quoted ? Object.keys(m.quoted.message)[0] : m.mtype
            let q = m.quoted ? m.quoted.message[type] : m.msg
            let img = await client.downloadMediaMessage(q)
            if (/video/.test(type)) {
               if (q.seconds > 14) return client.reply(m.chat, Func.texted('bold', `🚩 Maximum video duration is 14 seconds.`), m)
               return await client.sendSticker(m.chat, img, m, {
                  packname: exif.sk_pack,
                  author: exif.sk_author
               })
            } else if (/image/.test(type)) {
               return await client.sendSticker(m.chat, img, m, {
                  packname: exif.sk_pack,
                  author: exif.sk_author
               })
            }
         } else {
            let q = m.quoted ? m.quoted : m
            let mime = (q.msg || q).mimetype || ''
            if (/image\/(jpe?g|png)/.test(mime)) {
               let img = await q.download()
               if (!img) return client.reply(m.chat, global.status.wrong, m)
               return await client.sendSticker(m.chat, img, m, {
                  packname: exif.sk_pack,
                  author: exif.sk_author
               })
            } else if (/video/.test(mime)) {
               if ((q.msg || q).seconds > 14) return client.reply(m.chat, Func.texted('bold', `🚩 Maximum video duration is 14 seconds.`), m)
               let img = await q.download()
               if (!img) return client.reply(m.chat, global.status.wrong, m)
               return await client.sendSticker(m.chat, img, m, {
                  packname: exif.sk_pack,
                  author: exif.sk_author
               })
            } else client.reply(m.chat, Func.texted('bold', `Ketik commandnya di caption gambar`), m)
         }
      } catch (e) {
         console.log(e)
         return client.reply(m.chat, Func.jsonFormat(e), m)
      }
   },
   error: false,
   limit: true,
   cache: true,
   location: __filename
}