const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    host: 'smtp.mail.mn',
    port: 465,
    secure: true,
    auth: {
      user: 'sales@icbc.mn',
      pass: 'Sales@75117733'
    }
});

  module.exports = db;