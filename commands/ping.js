module.exports = {
  name: 'ping',
  description: 'Ping!',
  execute(message, args) {
    message.channel.send('Pong.')
    message.delete({timeout: 1000})
  }
}