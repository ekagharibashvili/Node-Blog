const nodemailer = require("nodemailer");
exports.initTransporter = () =>
  nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: "gharibashvili.e@gtu.ge",
      pass: "dnbksjadkasjdsakjdbaskjd123",
    },
    tls: {
      rejectUnauthorized: false,
    },
  });
