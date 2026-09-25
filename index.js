const mineflayer = require('mineflayer');

const bot = mineflayer.createBot({
  host: 'lowednetwork.play.hosting',
  port: 25565,
  auth: 'offline',
  version: "1.20.4", // Buraya sunucunun tam sürümünü yaz (Örn: 1.16.5, 1.20.1 vb.)
  username: 'KapanmasinBotu'
});

bot.on('spawn', () => {
  console.log('Bot oyuna basariyla girdi!');
  
  setInterval(() => {
    bot.setControlState('jump', true);
    setTimeout(() => bot.setControlState('jump', false), 500);
    
    const yaw = Math.random() * Math.PI * 2;
    const pitch = (Math.random() * Math.PI) - (Math.PI / 2);
    bot.look(yaw, pitch, true);
  }, 180000);
});

bot.on('kicked', (reason) => {
  console.log('Bottan atildi:', reason);
});

bot.on('error', (err) => {
  console.log('Hata olustu:', err);
});
