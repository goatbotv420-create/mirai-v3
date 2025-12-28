const axios = require("axios");
const request = require("request");
const fs = require("fs-extra");
const moment = require("moment-timezone");

module.exports.config = {
    name: "owner",
    version: "1.0.0",
    hasPermssion: 0,
    credits: "rX Abdullah", //don't change my credit 
    description: "Show Owner Info",
    commandCategory: "info",
    usages: "",
    cooldowns: 5
};

module.exports.run = async function({ api, event }) {
    var time = moment().tz("Asia/Dhaka").format("DD/MM/YYYY hh:mm:ss A");

    var callback = () => api.sendMessage({
        body: `
┏━━━━━━━━━━━━━━━━━━━━━┓
┃      🌟 𝗢𝗪𝗡𝗘𝗥 𝗜𝗡𝗙𝗢 🌟      
┣━━━━━━━━━━━━━━━━━━━━━┫
┃ 👤 𝐍𝐚𝐦𝐞    : 𝗧𝗮𝗺𝗶𝗺 𝗕𝗯𝘇
┃ 🚹 𝐆𝐞𝐧𝐝𝐞𝐫   : 𝗠𝗮𝗹𝗲
┃ ❤️ 𝐑𝐞𝐥𝐚𝐭𝐢𝐨𝐧  : 𝗦𝗶𝗻𝗴𝗹𝗲
┃ 🎂 𝐀𝐠𝐞      : 18+
┃ 🕌 𝐑𝐞𝐥𝐢𝐠𝐢𝐨𝐧  : 𝗜𝘀𝗹𝗮𝗺
┃ 🏫 𝐄𝐝𝐮𝐜𝐚𝐭𝐢𝐨𝐧 : 𝗶𝗻𝘁𝗲𝗿 2𝗻𝗱 𝘆𝗲𝗮𝗿
┃ 🏡 𝐀𝐝𝐝𝐫𝐞𝐬𝐬   : 𝗖𝗼𝗺𝗶𝗹𝗹𝗮, 𝗕𝗮𝗻𝗴𝗹𝗮𝗱𝗲𝘀𝗵
┣━━━━━━━━━━━━━━━━━━━━━┫
┃ 🎭 𝐓𝐢𝐤𝐭𝐨𝐤    : __tamim__6t9__
┃ 📢 𝐈𝐧𝐬𝐭𝐚𝐠𝐫𝐚𝐦 : https://www.instagram.com/___your___bbz___?igsh=MTNyaTVtczhxMGk0
┃ 🌐 𝐅𝐚𝐜𝐞𝐛𝐨𝐨𝐤  : https://www.facebook.com/tamim.bbz.2025
┣━━━━━━━━━━━━━━━━━━━━━┫
┃ 🕒 𝐔𝐩𝐝𝐚𝐭𝐞𝐝 𝐓𝐢𝐦𝐞:  ${time}
┗━━━━━━━━━━━━━━━━━━━━━┛
        `,
        attachment: fs.createReadStream(__dirname + "/cache/1.png")
    }, event.threadID, () => fs.unlinkSync(__dirname + "/cache/1.png"));
  
    return request(encodeURI(`https://graph.facebook.com/100068565380737/picture?height=720&width=720&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662`))
        .pipe(fs.createWriteStream(__dirname + '/cache/1.png'))
        .on('close', () => callback());
};
