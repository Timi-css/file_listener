const chokidar = require('chokidar')
const path = require('path')
const { validateFile } = require('../utils/fileValidator')
const { sendEmailWithAttachment } = require('../actions/emailSender')
const config = require('../config')
const logger = require('../utils/logger')

require('dotenv').config()

const logFilePath = path.join(config.watchFolder, 'app.log');

// Configure Cokidar 
let watcher

const startWatcher = () => {
        if (watcher) return

        watcher = chokidar.watch(process.env.WATCH_FOLDER, {
                ignored: '/(^|[\/\\])\../, ',
                persistent: true
        })
        // Call function to process new file path
        watcher.on('add', filePath => {
                if (filePath === logFilePath) return; // Ensures the log file isn't processed as a new file
                validateFile(filePath, (err, valid) => {
                        if (err) return logger.error(`File Validation failed: ${err.message}`)
                        console.log(`Valid file detected: ${filePath}`)
                        sendEmailWithAttachment(filePath)
                })
        })
        logger.info(`File watcher started`)
}

const stopWatcher = () => {
        if (watcher) {
                watcher.close()
                watcher = null
                logger.info('File Watcher stopped')
        }
}

const getStatus = () => {
        return watcher ? 'File watcher is running' : 'File watcher is stopped'
}

module.exports = {
        startWatcher, stopWatcher, getStatus
}