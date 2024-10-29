const express = require('express')
const { rsort } = require('semver')
const { startWatcher, stopWatcher, getStatus } = require('../watchers/fileWatcher')
const router = express.Router()
const config = require('../config')
const { countFilesByExtension } = require('../utils/fileCounter')
const logger = require('../utils/logger')

router.post('/start', (req, res) => {
        startWatcher()
        res.send('File watcehr has started')
})

router.post('/stop', (req, res) => {
        stopWatcher()
        res.send('File watcher stopped')
})

router.get('/status', (req, res) => {
        res.send(getStatus())
})

// File counter route
router.get('/files', (req, res) => {
        try {
                const fileData = countFilesByExtension(config.watchFolder)
                res.json(fileData)
        } catch (error) {
                console.log(error)
                logger.error('Error counting files: ', error)
                res.status(500).json({ message: "Error counting files" })
        }
})

module.exports = router