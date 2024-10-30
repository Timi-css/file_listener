const fs = require('fs');
const path = require('path');
const config = require('../config')

const logFilePath = path.join(config.watchFolder, 'app.log');

const getTimestamp = () => {
        return new Date().toISOString();
};

const logToFile = (message) => {
        fs.appendFileSync(logFilePath, message + '\n', (err) => {
                if (err) throw err;
        });
};

const logger = {
        info: (message) => {
                const formattedMessage = `[${getTimestamp()}] INFO: ${message}`;
                console.log(formattedMessage);
                logToFile(formattedMessage);
        },
        warn: (message) => {
                const formattedMessage = `[${getTimestamp()}] WARN: ${message}`;
                console.warn(formattedMessage);
                logToFile(formattedMessage);
        },
        error: (message) => {
                const formattedMessage = `[${getTimestamp()}] ERROR: ${message}`;
                console.error(formattedMessage);
                logToFile(formattedMessage);
        },
};

module.exports = logger;
