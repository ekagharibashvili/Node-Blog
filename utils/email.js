const nodemailer = require("nodemailer");
const output = `<h1><b>Congratulations</b>! You have successfully registered</h1>`;

exports.sendMail = async () => {
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: 'gharibashvili.e@gtu.ge',
      pass: 'password',
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"Eka Garibashvili 👻" <gharibashvili.e@gtu.ge>',
    to: "EkaGaribashvili98@gmail.com",
    subject: "Hello ✔",
    text: "Hello world?",
    html: output,
  });

  console.log("Message sent: %s", info.messageId);
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
};
