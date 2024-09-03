const express = require('express')
const apiRoutes = require('./routes/apiRoutes')
const { startWatcher } = require('./watchers/fileWatcher')

const app = express()
const PORT = process.env.PORT || 5454

app.use(express.json())
app.use('/api', apiRoutes)

app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`)
        startWatcher()
})