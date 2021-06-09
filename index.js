const { Command } = require('commander');
const program = new Command();
const version = require('./package.json').version;

const launchBroker = require('./bin/broker/index');

program
    .name('newman-dashboard')
    .addHelpCommand(false)
    .version(version, '-v, --version');

program
    .option(
        '-p, --port <port>',
        'Specify the port to launch the dashboard.',
        '3000'
    )
    .option('-d, --daemonize', 'Run the server as a daemon.')
    .option('-t, --test', 'Run the CLI without any actions for unit tests.')
    .action(() => {
        if (program.opts().test) {
            return;
        }

        if (program.opts().daemonize) {
            // launch the broker as a daemon
            const port = program.opts().port;
            launchBroker(port);
            return;
        }

        require('./bin/broker/server');
    })
    .parse(process.argv);

module.exports = program;