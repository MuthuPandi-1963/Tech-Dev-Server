import nodemailer from 'nodemailer'
import WelcomePage from '../Helpers/Html/Welcome.js';

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com', // Gmail's SMTP server address
  port: 465, // For SSL
  secure: true, // true for port 465, false for other ports
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});
export default transporter;