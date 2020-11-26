const { Rcon } = require('rcon-client/lib');
const {formatter} = require('../util/textFormatter');
const { ip, port, pass} = require('../config/rcon.json');


module.exports = {
    name: 'online',
    description: 'A command to show the amount of people online on a server',
    async execute(message, args) {
        const rcon = new Rcon({ host: ip, port: port, password: pass })
        rcon.connect()
        .then(() => {
            rcon.send('list').then((out) => {formatter.setString(out)})
            .then(() => formatter.removeColorCodes())
            .then(() => formatter.codeblock())
            .then(() => message.channel.send(formatter.string))
            .then(msg => {msg.delete({timeout: 5000})})
            .then(rcon.end());
        })
        message.delete({timeout: 100})
            .then(msg => console.log(`Deleted message from ${msg.author.username}`))
        
    }
}