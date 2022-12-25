const qrcode = require('qrcode-terminal');
const { Client, LocalAuth } = require('whatsapp-web.js');
const { EditPhotoHandler } = require('./feature/edit_foto');
const { ChatAIHandler } = require('./feature/chat_ai');



const client = new Client({
    authStrategy: new LocalAuth()
});



client.on('qr', qr => {
    qrcode.generate(qr, { small: true });
});

client.on('ready', () => {
    console.log('Client is ready!');
});

client.on('message', async msg => {

    const text = msg.body.toLowerCase() || '';

    //check status
    if (text === '!menu , .menu , #menu , menu') {
        msg.reply('Ini Fitur Dari Kami');
        msg.reply('#edit_bg');
        msg.reply('#ask/');
        msg.reply('Untuk Edit_bg Itu Buat Edit Background Gambar Contoh kirim foto dengan caption edit_bg/warna
Dan Untuk #ask/ Untuk Bertanya Kepada Open Ai contoh #ask/pertanyaannya Paham Kan.
Jika Menemukan Bug Harap Lapor Ke Saya https://wa.me/6281386945391'); 
    }

    // edit_bg/bg_color
    if (text.includes("#edit_bg/")) {
        await EditPhotoHandler(text, msg);
    }
    // #ask/question?
    if (text.includes("#ask/")) {
        await ChatAIHandler(text, msg);
    }

});

client.initialize();



