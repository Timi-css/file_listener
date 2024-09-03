const nodemailer = require('nodemailer')
const config = require('../config')
const path = require('path')
const logger = require('../utils/logger')

const transporter = nodemailer.createTransport({
        host: config.emailConfig.service,
        port: 587,
        secure: false,
        auth: {
                user: config.emailConfig.user,
                pass: config.emailConfig.pass
        }
})


const sendEmailWithAttachment = (filePath) => {
        const mailOptions = {
                from: config.emailConfig.user,
                to: config.emailConfig.receiver,
                subject: "New File Received in Folder Listener",
                text: `New file dropped: ${path.basename(filePath)}`,
                attachments: [{ path: filePath }],
                html: " <div> A file has been dropped</div>"
        }

        transporter.sendMail(mailOptions, (err, info) => {
                if (err) {
                        return logger.error(`Error sending email: ${err.message}`)
                }
                logger.info(`Email sent successfully: ${info.response}`)
        })
}

module.exports = { sendEmailWithAttachment }