const nodemailer = require("nodemailer");
exports.initTransporter = () =>
  nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: "",
      pass: "",
    },
    tls: {
      rejectUnauthorized: false,
    },
  });
