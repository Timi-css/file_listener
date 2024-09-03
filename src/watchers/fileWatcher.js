const chokidar = require('chokidar')
const path = require('path')
const { validateFile } = require('../utils/fileValidator')
const { sendEmailWithAttachment } = require('../actions/emailSender')
const config = require('../config')

require('dotenv').config()

// Configure Cokidar 
let watcher

const startWAtcher = () => {
        if (watcher) return

        watcher = chokidar.watch(process.env.WATCH_FOLDER, {
                ignored: '/(^|[\/\\])\../, ',
                persistent: true
        })
        // Call function to process new file path
        watcher.on('add', filePath => {
                validateFile(filePath, (err, valid) => {
                        if (err) return console.error(`File Validation failed: ${err.message}`)
                        console.log(`Valid file detected: ${filePath}`)
                        sendEmailWithAttachment(filePath)
                })
        })
        console.log(`File watcher started`)
}

const stopWatcher = () => {
        if (watcher) {
                watcher.close()
                watcher = null
                console.log('File Watcher stopped')
        }
}

const getStatus = () => {
        return watcher ? 'File watcher is running' : 'File watcher is stopped'
}

module.exports = {
        startWAtcher, stopWatcher, getStatus
}