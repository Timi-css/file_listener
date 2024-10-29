const fs = require('fs')
const path = require('path')
const { google } = require('googleapis')
const { dirname } = require('path')

const credentialsPath = path.join(__dirname, '../../credentials.json')

const SCOPES = ['https://www.googleapis.com/auth/drive.metadata.readonly']

const authorize = async () => {
        const credentials = JSON.parse(fs.readFileSync(credentialsPath))
        const { client_secret, client_id, redirect_uris } = credentials.installed;
        const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0])

        const tokenPath = path.join(_ - dirname, '../../token.json')
        if (fs.readFileSync(tokenPath)) {
                const token = fs.readFileSync(tokenPath)
                oAuth2Client.setCredentials(JSON.parse(token))
                return oAuth2Client

        } else {
                throw new Error('Token not found. Please run the authorization process')
        }
}
module.exports = authorize
