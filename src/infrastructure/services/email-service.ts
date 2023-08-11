// nodemailerEmailService.ts
import nodemailer from "nodemailer";
import pug from "pug";
import { IEmailService } from "@/application/abstractions/email-service";

export class NodemailerEmailService implements IEmailService {
    async sendEmail(template: string, data: any, toEmail: string, subject: string): Promise<any> {
        // Create reusable transporter object using the default SMTP transport
        const isSecure = false; // Set this based on your environment

        const transport = nodemailer.createTransport({
            host: process.env.MAIL_HOST,
            secure: isSecure,
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASSWORD,
            },
        });
        const body = pug.renderFile(`src/emails/${template}.pug`, data);

        return transport.sendMail({
            from: `"Fotis" ${process.env.MAIL}`,
            to: toEmail,
            subject: subject,
            html: body,
        });
    }

}
