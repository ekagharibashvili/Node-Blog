const nodemailer = require("nodemailer");
const { initTransporter } = require("./initTransporter");

exports.sendMail = async (obj) => {
  const { from, to, subject, text, html } = obj;
  const transporter = initTransporter();
  // send mail with defined transport object
  let info = await transporter.sendMail({
    from,
    to,
    subject,
    text,
    html,
  });
  console.log("Message sent: %s", info.messageId);
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
};
