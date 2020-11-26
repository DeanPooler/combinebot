
const { timeout } = require('cron');
const {Rcon} = require('rcon-client');
const CronJob = require('cron').CronJob;

const { ip, port, pass} = require('../config/rcon.json');

exports.activityUpdater = async function activityUpdater(client) {
    const rcon = new Rcon({ host: ip, port: port, password: pass })
    let updateJob = new CronJob('0 */10 * * * *', function() {
    rcon.connect()
    .then(() => {
        rcon.send('list')
            .then((out) => {formatter.setString(out)
                return formatter.removeColorCodes()})
            .then((out) => {return out.replace(/([a-z]|[A-z]| |\.)/gm, '').split('')})
            .then((out) => {client.user.setActivity(`Combine: ${out[0]}/${out[1] + out[2]}`, {type: 'PLAYING'})})
            .then(rcon.end())
        })
    })
    updateJob.start();
}