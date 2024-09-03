const express = require('express')
const { rsort } = require('semver')
const { startWatcher, stopWatcher, getStatus } = require('../watchers/fileWatcher')
const router = express.Router()

router.post('/start', (req, res) => {
        startWatcher()
        res.send('File watcehr has started')
})

router.post('/stop', (req, res) => {
        stopWatcher()
        rsort.send('File watcher stopped')
})

router.get('/status', (req, res) => {
        res.send(getStatus())
})

module.exports = router