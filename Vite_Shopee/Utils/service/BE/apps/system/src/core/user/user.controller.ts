import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { MailService } from '@system-core/mail/mail.service';

@Controller()
export class UserController {
  constructor(
    private mailService: MailService
  ) {}

  @MessagePattern('sendEmailWelcome')
  async sendMailWelcome(payload) {
    return this.mailService.sendEmailWelcome(payload);
  }

  @MessagePattern('sendEmailForgotPassword')
  async sendMailForgotPassword(payload) {
    return this.mailService.sendEmailForgotPassword(payload);
  }

  @MessagePattern('sendEmail2FA')
  async sendMail2FA(payload) {
    return this.mailService.sendEmail2FA(payload);
  }

  @MessagePattern('sendEmailCustomerForgotPassword')
  async sendMailCustomerForgotPassword(payload) {
    return this.mailService.sendEmailCustomerForgotPassword(payload);
  }

  @MessagePattern('sendBookingConfirmation')
  async sendMailBookingConfirmation(payload) {
    return this.mailService.sendEmailBookingConfirmation(payload);
  }
  
  @MessagePattern('sendEmailCustomerGeneralEnquiry')
  async sendEmailCustomerGeneralEnquiry(payload) {
    return this.mailService.sendEmailCustomerGeneralEnquiry(payload);
  }
}
