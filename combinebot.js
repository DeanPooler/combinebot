const {Rcon} = require('rcon-client');
const CronJob = require('cron').CronJob;
const fs = require('fs');
const Discord = require('discord.js');

const { prefix, token } = require('./config/config.json');

const {activityUpdater} = require('./util/activityUpdater');

const client = new Discord.Client();
client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  client.commands.set(command.name, command);
}

client.once('ready', () => {
  console.log('Bot is ready');
  activityUpdater(client);
});

client.on('message', message => {
  if (!message.content.startsWith(prefix) || message.author.bot) return;

  const args = message.content.slice(prefix.length).trim().split(/ +/);
  const command = args.shift().toLocaleLowerCase();

  if (!client.commands.has(command)) return;

  try {
    client.commands.get(command).execute(message, args);
  } catch (error) {
    console.error(error);
    message.reply('Yikes, that\'s an error. \nPlease report this to an admin;');
  }
})

client.login(token);