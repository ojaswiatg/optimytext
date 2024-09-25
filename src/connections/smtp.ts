import nodemailer from "nodemailer";

const smtpTransporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: String(process.env.SMTP_MAIL),
        pass: String(process.env.SMTP_PASS),
    },
});

export default smtpTransporter;
