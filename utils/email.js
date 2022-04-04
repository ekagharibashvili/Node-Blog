const nodemailer = require("nodemailer");
const { initTransporter } = require("./initTransporter");

exports.sendMail = async (req, output) => {
  let email = req.body.email;
  const transporter = await initTransporter();
  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"Eka Garibashvili 👻" <gharibashvili.e@gtu.ge>',
    to: email,
    subject: "Hello ✔",
    text: "Hello world?",
    html: output,
  });

  console.log("Message sent: %s", info.messageId);
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
};
