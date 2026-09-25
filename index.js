const mineflayer = require('mineflayer');

function createBot() {
  const bot = mineflayer.createBot({
    host: 'lowednetwork.play.hosting',
    port: 25565,
    auth: 'offline',
    version: "1.21.1",
    username: 'lowednw',
    // Paket hatalarını ve timeout'ları esnetmek için:
    checkTimeoutInterval: 60000 
  });

  bot.on('spawn', () => {
    console.log('Bot oyuna basariyla girdi ve guvenli moda gecti!');
    
    // Anti-bot taraması bitsin diye 15 saniye bekleyip sonra AFK döngüsünü başlatıyoruz
    setTimeout(() => {
      setInterval(() => {
        // Sadece hafif kafa hareketi yapıp anti-afk kalması yeterli, zıplama spam'i korumaya taktırabilir
        const yaw = Math.random() * Math.PI * 2;
        const pitch = (Math.random() * 0.5) - 0.25;
        bot.look(yaw, pitch, true);
      }, 240000); // 4 dakikada bir
    }, 15000);
  });

  bot.on('kicked', (reason) => {
    console.log('Bottan atildi:', reason);
  });

  bot.on('error', (err) => {
    console.log('Hata olustu:', err);
  });

  // Oyundan atıldığında veya düştüğünde anti-bot ban süresi geçsin diye 15 saniye bekleyip tekrar girecek
  bot.on('end', () => {
    console.log('Bot dustu, anti-bot suresinin dolmasi icin 15 saniye bekleniyor...');
    setTimeout(createBot, 15000);
  });
}

createBot();
