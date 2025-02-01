const nodemailer = require("nodemailer");
const WorkerSchema = require("../Model/WorkerSchema");
require('dotenv').config();


const PasswordRecovery = async (req, res) => {
  const { email } = req.body; // Qaado email-ka ka yimaada frontend

  // Validate email
  if (!email) {
    return res.status(400).json({ error: "Fadlan geli email-kaaga" });
  }

  // hubi in email-kaan uu jiro shaqaale leh 
  const worker = await WorkerSchema.findOne({ email });
  if (!worker) {
    return res.status(404).json({ error: "Email-kan ma lahan shaqaale" });
  }

  // Setup Nodemailer transporter
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER, // email-ka admin-ka 
      pass: process.env.EMAIL_PASS // password admin
    },
  });

  
  // Email options
  const mailOptions = {
    from: process.env.EMAIL_USER, // email admin 
    to: worker.email,
    subject: "Password Recovery",
    text: `Your password is: ${worker.password}`, // U dir password-ka
  };

  // Send the email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error sending email:", error);
      return res.status(500).json({ error: "Error sending email" });
    }
    console.log("Email sent: " + info.response);
    res.status(200).json({ message: "Password has been sent to your email" });
  });
};


module.exports = { PasswordRecovery };