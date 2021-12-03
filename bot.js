// discord.js モジュールのインポート
const { Intents, Client } = require("discord.js");
// dotenv モジュールのインポート
require('dotenv').config();
//discord.js and client declaration
const { joinVoiceChannel } = require('@discordjs/voice');

// Discord Clientのインスタンス作成
const options = {
    intents: ["GUILDS", "GUILD_MESSAGES"],
};
const client = new Client(options);

// トークンの用意
const token = process.env.TOKEN;

// 起動するとconsoleにready...と表示される
client.on('ready', () => {
    console.log('ready...');
});

client.on('messageCreate', message => {
    if (message.author.bot) return; //BOTのメッセージには反応しない

    if (message.content === "/hello") { //送られたメッセージが /helloだったら
        message.channel.send("HELLO!")
        //メッセージが送られたチャンネルに HELLO!と送信する
    }
    if (message.content === "/connect") {
        joinVoiceChannel({
            channelId: message.member.voice.channel.id,
            guildId: message.guild.id,
            adapterCreator: message.guild.voiceAdapterCreator
        }).then(message.channel.send("OK."))
    }
    if (message.content === "/disconnect")
        ;
})

// Discordへの接続
client.login(token);