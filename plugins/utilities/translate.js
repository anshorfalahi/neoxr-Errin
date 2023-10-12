const translate = require('translate-google-api')
exports.run = {
   usage: ['translate'],
   hidden: ['tr'],
   use: 'iso text',
   category: 'utilities',
   async: async (m, {
      client,
      text,
      isPrefix,
      command,
      Func
   }) => {
      if (!text) return client.reply(m.chat, Func.example(isPrefix, command, 'id i love you \n\n check language code here \n https://cloud.google.com/translate/docs/languages'), m)
      if (text && m.quoted && m.quoted.text) {
         let lang = text.slice(0, 2)
         try {
            let data = m.quoted.text
            let result = await translate(`${data}`, {
               to: lang
            })
            client.reply(m.chat, result[0], m)
         } catch {
            return client.reply(m.chat, Func.texted('bold', `🚩 Language code not supported.\n try this \n https://cloud.google.com/translate/docs/languages`), m)
         }
      } else if (text) {
         let lang = text.slice(0, 2)
         try {
            let data = text.substring(2).trim()
            let result = await translate(`${data}`, {
               to: lang
            })
            client.reply(m.chat, result[0], m)
         } catch {
            return client.reply(m.chat, Func.texted('bold', `🚩 Language code not supported.\n try this \n https://cloud.google.com/translate/docs/languages`), m)
         }
      }
   },
   error: false,
   cache: true,
   location: __filename
}