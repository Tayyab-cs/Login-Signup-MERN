import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

const sendEmail = async (email, subject, text) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "outlook",
      auth: {
        user: process.env.SENDER_MAIL,
        pass: process.env.SENDER_PASS,
      },
    });

    const mailOptions = {
      from: process.env.SENDER_MAIL,
      to: email,
      subject: subject,
      text: text,
    };

    await transporter.sendMail(mailOptions, function (err, data) {
      if (err) {
        console.log(`ERROR: ${err}`);
      }
      console.log(`Email send successfully...`);
    });
  } catch (error) {
    console.log(error, "Email not sent.");
  }
};

export default sendEmail;
