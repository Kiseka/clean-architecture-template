
export interface IEmailService {
    sendEmail(templateName: string, data: any, toEmail: string, subject: string): Promise<any>;
}
