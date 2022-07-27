const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
          user: "alejandroalivier20@gmail.com",
          pass: "wfoqultqpmmlifxe"
        }
});

module.exports ={
    transporter
}