module.exports = {
        watchFolder: process.env.WATCH_FOLDER,
        allowedFileTypes: (process.env.ALLOWED_FILE_TYPES).split(','),
        emailConfig: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
                service: process.env.EMAIL_SERVICE,
                receiver: process.env.RECEIVER_EMAIL,
                port: process.env.EMAIL_PORT
        },
}
