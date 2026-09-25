const mineflayer = require('mineflayer');

function createBot() {
  const bot = mineflayer.createBot({
    host: 'lowednetwork.play.hosting',
    port: 25565,
    auth: 'offline',
    version: "1.21.1",
    username: 'LOWEDNW'
  });

  bot.on('spawn', () => {
    console.log('Bot oyuna basariyla girdi!');
    
    // Her 3 dakikada bir zıplama ve etrafa bakma hareketi (AFK kalmamak için)
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

  // Oyundan düşerse veya atılırsa 5 saniye sonra tekrar bağlanması için kritik özellik:
  bot.on('end', () => {
    console.log('Bot oyundan dustu, 5 saniye sonra tekrar baglaniliyor...');
    setTimeout(createBot, 5000);
  });
}

createBot();
