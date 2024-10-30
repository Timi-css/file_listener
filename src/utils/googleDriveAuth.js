const fs = require('fs');
const path = require('path');
const { google } = require('googleapis');

const credentialsPath = path.join(__dirname, '../../credentials.json');
const tokenPath = path.join(__dirname, '../../token.json');

const SCOPES = ['https://www.googleapis.com/auth/drive.metadata.readonly'];

const authorize = async () => {
        const credentials = JSON.parse(fs.readFileSync(credentialsPath));
        const { client_secret, client_id, redirect_uris } = credentials.installed;
        const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);

        // Check if token.json already exists
        if (fs.existsSync(tokenPath)) {
                const token = fs.readFileSync(tokenPath);
                oAuth2Client.setCredentials(JSON.parse(token));
                return oAuth2Client;
        } else {
                // If token.json does not exist, initiate authorization flow
                const authUrl = oAuth2Client.generateAuthUrl({
                        access_type: 'offline',
                        scope: SCOPES,
                });
                console.log('Authorize this app by visiting this URL:', authUrl);

                // After authorization, paste the code from the browser
                const readline = require('readline').createInterface({
                        input: process.stdin,
                        output: process.stdout,
                });

                return new Promise((resolve, reject) => {
                        readline.question('Enter the code from that page here: ', (code) => {
                                readline.close();
                                oAuth2Client.getToken(code, (err, token) => {
                                        if (err) return reject(err);
                                        oAuth2Client.setCredentials(token);

                                        // Save the token to token.json
                                        fs.writeFileSync(tokenPath, JSON.stringify(token));
                                        console.log('Token stored to', tokenPath);
                                        resolve(oAuth2Client);
                                });
                        });
                });
        }
};

module.exports = authorize;
