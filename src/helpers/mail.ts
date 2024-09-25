import smtpTransporter from "@/connections/smtp";

type TSendMailParams = {
    emailTo: string;
    subject: string;
    message: string;
    methodName: string;
};

export async function sendMail(params: TSendMailParams) {
    const APP_EMAIL = process.env.SMTP_MAIL;

    const mailOptions = {
        from: APP_EMAIL,
        to: params.emailTo,
        subject: params.subject,
        text: params.message,
    };

    try {
        await smtpTransporter.sendMail(mailOptions);
        console.info(
            `${params.methodName}: Mail sent successfuly to ${params.emailTo}`,
        );
        return true;
    } catch (error) {
        console.error(
            `${params.methodName}: Failed to send mail to ${params.emailTo}`,
        );
        console.error(error);
        return false;
    }
}
