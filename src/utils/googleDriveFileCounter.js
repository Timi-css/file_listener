const { google } = require('googleapis');
const authorize = require('./googleDriveAuth');

const countFilesInGoogleDriveFolder = async (folderId) => {
        const auth = await authorize();
        const drive = google.drive({ version: 'v3', auth });

        const counts = {};
        let total = 0;

        const listFiles = async (pageToken = null) => {
                const response = await drive.files.list({
                        q: `'${folderId}' in parents and mimeType != 'application/vnd.google-apps.folder'`,
                        fields: 'nextPageToken, files(id, name, mimeType)',
                        pageToken,
                });

                response.data.files.forEach((file) => {
                        const ext = file.name.split('.').pop().toLowerCase();
                        counts[ext] = (counts[ext] || 0) + 1;
                        total++;
                });

                if (response.data.nextPageToken) {
                        await listFiles(response.data.nextPageToken);
                }
        };

        await listFiles();

        return { total, counts };
};

module.exports = countFilesInGoogleDriveFolder;
