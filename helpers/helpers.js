const session = require('express-session')
const nodemailer = require("nodemailer");
module.exports = {
    convertDate: function (date) {
        return date.toDateString()
    },

    middlewareLogin: function (req, res, next) {
        if (req.session.email) {
            next()
        } else {
            res.redirect('/user/login')
        }

    },

    nodemailer: function (email) {
        async function main() {

            // Generate test SMTP service account from ethereal.email
            // Only needed if you don't have a real mail account for testing
            let testAccount = await nodemailer.createTestAccount();

            // create reusable transporter object using the default SMTP transport
            let transporter = nodemailer.createTransport({
                service : "Yahoo",
                host: 'smtp.mail.yahoo.com',
                port: 465,
                secure: true, // true for 465, false for other ports
                auth: {
                    user: 'foxinema@yahoo.com', // generated ethereal user
                    pass: 'bethebest' // generated ethereal password
                },
                debug: false,
                logger: true
            });

            // send mail with defined transport object
            let info = await transporter.sendMail({
                from:'"Foxinema - World Leading Cinema In Hacktiv8" <foxinema@yahoo.com>', // sender address
                to: email, // list of receivers
                subject: "Registration Form", // Subject line
                text: "Hi, we just get you register to our beloved cinema. Please go to this link http://localhost:3000/user/login to get new experience. ", // plain text body
               
            });

            console.log("Message sent: %s", info.messageId);
            // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

            // Preview only available when sending through an Ethereal account
            console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
            // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...

        }
        main().catch(console.error);

    }
}