const fs = require("fs");
const path = require("path");

module.exports.config = {
 name: "premium",
 aliases: ["pri"],
 version: "1.0.1",
 hasPermssion: 0,
 credits: "bbz",
 description: "Buy premium packages or check your premium time",
 commandCategory: "Economy",
 usages: "premium [package]",
 cooldowns: 5
};

module.exports.run = async function ({ api, event, args, Currencies }) {
 const { threadID, senderID } = event;
 const premiumPath = path.join(__dirname, "../../modules/commands/rx/premium.json");

 // ===== Helpers =====
 const loadPremium = () => {
 if (!fs.existsSync(premiumPath)) return { users: {} };
 return JSON.parse(fs.readFileSync(premiumPath, "utf-8"));
 };

 const savePremium = (data) => fs.writeFileSync(premiumPath, JSON.stringify(data, null, 2), "utf-8");

 const formatDuration = (ms) => {
 if (ms <= 0) return "Expired";
 let total = ms;
 const days = Math.floor(total / 86400000);
 total %= 86400000;
 const hours = Math.floor(total / 3600000);
 total %= 3600000;
 const minutes = Math.floor(total / 60000);
 return `${days}d ${hours}h ${minutes}m`;
 };
 // ===== End helpers =====

 const packages = {
 "1": { days: 1, price: 100 },
 "10": { days: 10, price: 1000 },
 "20": { days: 20, price: 2000 },
 "30": { days: 30, price: 3000 } // 1 month
 };

 let data = loadPremium();
 if (!data.users) data.users = {};

 const now = Date.now();
 const userPremium = data.users[senderID];

 // ===== NO ARGUMENT: SHOW USER INFO OR PACKAGES =====
 if (!args[0]) {
 if (userPremium && userPremium.expire > now) {
 const remaining = userPremium.expire - now;
 return api.sendMessage(`💎 You have premium active.\nRemaining time: ${formatDuration(remaining)}`, threadID);
 } else {
 let msg = "📦 Premium Packages:\n";
 for (const key in packages) {
 const pkg = packages[key];
 msg += `• ${pkg.days} day(s) → ${pkg.price} coins\n`;
 }
 return api.sendMessage(msg, threadID);
 }
 }

 // ===== BUY =====
 const pkgKey = args[0];
 const pkg = packages[pkgKey];
 if (!pkg) return api.sendMessage("❌ Invalid package. Type premium to see available packages.", threadID);

 const userData = await Currencies.getData(senderID);
 if (userData.money < pkg.price) return api.sendMessage(`❌ You need ${pkg.price} coins to buy this package.`, threadID);

 await Currencies.decreaseMoney(senderID, pkg.price);

 const duration = pkg.days * 86400000;

 if (!data.users[senderID] || !data.users[senderID].expire || data.users[senderID].expire < now) {
 data.users[senderID] = { expire: now + duration };
 } else {
 data.users[senderID].expire += duration; // extend existing premium
 }

 savePremium(data);

 return api.sendMessage(`✅ You bought premium for ${pkg.days} day(s).\nNew expiry: ${formatDuration(data.users[senderID].expire - now)}`, threadID);
};
