// discord.js モジュールのインポート
const { Intents, Client } = require("discord.js");
// dotenv モジュールのインポート
require('dotenv').config();
//discord.js and client declaration
const { joinVoiceChannel } = require('@discordjs/voice');

const { clientId, guildId, token } = require('./config.json');

// Discord Clientのインスタンス作成
const options = {
    intents: ["GUILDS", "GUILD_MESSAGES"],
};
const client = new Client(options);

let connection;

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
        if (!message.member.voice.channel) return message.channel.send('You need to be a voice channel to execute this command!')
        if (!message.member.voice.channel.joinable) return message.channel.send('I need permission to join your voice channel!')


        connection = joinVoiceChannel({
            channelId: message.member.voice.channel.id,
            guildId: message.member.guild.id,
            adapterCreator: message.channel.guild.voiceAdapterCreator
        })

        console.log('Connected to voice!');
    }
    if (message.content === "/disconnect") {
        //const connection = message.guild.me.voice.channel
        if (!connection) return message.channel.send("I'm not in a voice channel!")
        connection.destroy()
        console.log('Disconnected from voice!');
    }
})

// Discordへの接続
client.login(token);