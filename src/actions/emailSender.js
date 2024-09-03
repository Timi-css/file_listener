const nodemailer = require('nodemailer')
const config = require('../config')

const transporter = nodemailer.createTransport({
        service: config.emailConfig.service,
        auth: {
                user: config.emailConfig.user,
                pass: config.emailConfig.pass
        }
})

const sendEmailWithAttachment = (filePath) => {
        const mailOptions = {
                from: config.emailConfig.user,
                to: config.emailConfig.receiver,
                subject: "New File Received in Folder",
                text: `New file dropped: ${path.basename(filePath)}`,
                attachments: [{ path: filePath }]
        }

        transporter.sendMail(mailOptions, (err, info) => {
                if (err) {
                        return console.error(`Error sending email: ${err.message}`)
                }
                console.log(`Email sent successfully: ${info.response}`)
        })
}

module.export = { sendEmailWithAttachment }