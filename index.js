require('dotenv').config();
const express = require('express')
const apiRoutes = require('./src/routes/apiRoutes')
const { startWatcher } = require('./src/watchers/fileWatcher')
const cors = require('cors')
const fs = require('fs');
const path = require('path');
const { google } = require('googleapis');

const app = express()
const PORT = process.env.PORT || 5454


// Initialize OAuth2 client

const oAuth2Client = new google.auth.OAuth2(process.env.GOOGLE_CLIENT_ID, process.env.GOOGLE_CLIENT_SECRET, process.env.REDIRECT_URI);


app.use(express.json())
app.use(cors())
app.use('/api', apiRoutes)

app.get('/oauth2callback', async (req, res) => {
        const { code } = req.query; // Capture the code from query parameters

        if (!code) {
                return res.status(400).send('Authorization code not provided');
        }

        try {
                const { tokens } = await oAuth2Client.getToken(code); // Exchange code for tokens
                oAuth2Client.setCredentials(tokens);

                // Save tokens to token.json
                const tokenPath = path.join(__dirname, 'token.json');
                fs.writeFileSync(tokenPath, JSON.stringify(tokens));
                console.log('Token stored to', tokenPath);

                res.send('Authorization successful! You can close this window.');
        } catch (error) {
                console.error('Error retrieving access token', error);
                res.status(500).send('Error retrieving access token');
        }
});

app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`)
        startWatcher()
})