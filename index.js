const mineflayer = require('mineflayer');

function createBot() {
  const bot = mineflayer.createBot({
    host: 'lowednetwork.play.hosting',
    port: 25565,
    auth: 'offline',
    version: "1.21.1",
    username: 'lowednw',
    // Envanter/eşya okuma hatalarının botu düşürmesini engellemek için:
    hideErrors: true,
    checkTimeoutInterval: 60000
  });

  // Gelen prototip/okuma hatalarının konsolu şişirip botu düşürmesini engelliyoruz
  bot.on('error', (err) => {
    // PartialReadError hatalarını görmezden gel
    if (err.message && err.message.includes('PartialReadError')) {
      return;
    }
    console.log('Hata olustu:', err);
  });

  bot.on('spawn', () => {
    console.log('Bot oyuna basariyla girdi ve guvenli moda gecti!');
    
    // 15 saniye anti-bot beklemesi ardından hafif hareketler
    setTimeout(() => {
      setInterval(() => {
        const yaw = Math.random() * Math.PI * 2;
        const pitch = (Math.random() * 0.5) - 0.25;
        bot.look(yaw, pitch, true);
      }, 240000);
    }, 15000);
  });

  bot.on('kicked', (reason) => {
    console.log('Bottan atildi:', reason);
  });

  // Kopma durumunda 15 saniye bekleyip tekrar bağlan
  bot.on('end', () => {
    console.log('Bot dustu, anti-bot suresinin dolmasi icin 15 saniye bekleniyor...');
    setTimeout(createBot, 15000);
  });
}

createBot();
