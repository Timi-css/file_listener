const fs = require('fs')
const path = require('path')

const countFilesByExtension = (folderPath) => {
        const files = fs.readdirSync(folderPath)
        const counts = {}

        files.forEach((file) => {
                const ext = path.extname(file).toLowerCase()
                if (!counts[ext]) {
                        counts[ext] = 0
                }
                counts[ext]++
        })
        return {
                total: files.length,
                counts
        }
}

module.exports = { countFilesByExtension }