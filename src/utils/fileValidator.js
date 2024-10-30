const fs = require('fs')
const path = require('path')
const config = require('../config')



const isAllowedFileType = (filePath) => {
        const ext = path.extname(filePath)
        return config.allowedFileTypes.includes(ext)
}

const isFileStable = (filePath, callback) => {
        let prevSize = 0
        const checkInterval = setInterval(() => {
                fs.stat(filePath, (err, stats) => {
                        if (err) {
                                clearInterval(checkInterval)
                                return callback(null, false)
                        }
                        if (stats.size === prevSize) {
                                clearInterval(checkInterval)
                                callback(null, true)
                        } else {
                                prevSize = stats.size
                        }
                })
        }, 1000)
}

const validateFile = (filePath, callback) => {
        if (!isAllowedFileType(filePath)) {
                return callback(new Error(`Invalid FIle Type`))
        }

        isFileStable(filePath, (err, stable) => {
                if (err || !stable) {
                        return callback(new Error('File is not stable'))
                }
                callback(null, true)
        })
}

module.exports = { validateFile }
