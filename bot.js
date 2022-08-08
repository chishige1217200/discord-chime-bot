// discord.js モジュールのインポート
const { Client } = require("discord.js");
// dotenv モジュールのインポート
require("dotenv").config();
//discord.js and client declaration
const { joinVoiceChannel, getVoiceConnection } = require("@discordjs/voice");
//const { token } = require("./config.json");

// Discord Clientのインスタンス作成
const options = {
  intents: ["GUILDS", "GUILD_MESSAGES", "GUILD_VOICE_STATES"],
};
const client = new Client(options);
var prefix = "/";
var general_connection = null;

// 起動するとconsoleにready...と表示される
client.on("ready", () => {
  console.log("ready...");
});

client.on("messageCreate", (message) => {
  if (message.author.bot) return; //BOTのメッセージには反応しない

  // おまけ機能
  if (message.content.toLocaleLowerCase() === prefix + "buber") {
    message.channel.send("ブーバー");
  }
  if (message.content.toLocaleLowerCase() === prefix + "kashidashi") {
    message.channel.send("め・た・り・く・るさん！");
  }
  // おまけ機能終わり

  if (message.content.toLocaleLowerCase() === prefix + "hello") {
    //送られたメッセージが /helloだったら
    message.channel.send("HELLO!");
    //メッセージが送られたチャンネルに HELLO!と送信する
  }
  if (message.content.toLocaleLowerCase() === prefix + "help") {
    message.channel.send(
      "```\nHELP\n  /connect: ボイスチャンネルに接続する\n  /disconnect: ボイスチャンネルから切断する\n```"
    );
  }
  if (message.content.toLocaleLowerCase() === prefix + "connect") {
    //ボイスチャンネルに接続する
    if (message.member.voice.channel === null)
      return message.channel.send(
        "You need to be a voice channel to execute this command!"
      );
    if (!message.member.voice.channel.joinable)
      return message.channel.send(
        "I need permission to join your voice channel!"
      );

    const connection = joinVoiceChannel({
      channelId: message.member.voice.channel.id,
      guildId: message.member.guild.id,
      adapterCreator: message.channel.guild.voiceAdapterCreator,
    });

    general_connection = connection;

    console.log("Connected to voice!");
  }
  if (message.content.toLocaleLowerCase() === prefix + "disconnect") {
    //ボイスチャンネルから切断する
    const connection = getVoiceConnection(message.guild.id);

    if (!connection) return message.channel.send("I'm not in a voice channel!");

    connection.destroy();

    general_connection = null;

    console.log("Disconnected from voice!");
  }

  if (message.content.toLocaleLowerCase() === prefix + "test") {
    if (general_connection === null)
      return message.channel.send("I'm not in a voice channel!");

    console.log("Playing test sound");
  }
});

// Discordへの接続
client.login(token);
