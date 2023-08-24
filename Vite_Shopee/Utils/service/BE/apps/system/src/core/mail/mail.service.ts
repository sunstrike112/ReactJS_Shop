import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { join } from 'path';
import * as mjml2html from 'mjml'
import * as handlebars from 'handlebars';
import * as fs from 'fs';
import { ConfigService } from '@nestjs/config';
import { Queue } from '@squareboat/nest-queue';
import { SqsService } from '@ssut/nestjs-sqs';
import { JobName } from '@system-core/enums/job.enum';
import { QueueName, QueuePayloadId } from '@system-core/enums/queue.enum';
import * as moment from 'moment-timezone';
import { DATE_TIME_FORMAT } from '@constants/datetime-format.constant';

@Injectable()
export class MailService {
  constructor(
    private mailerService: MailerService,
    private readonly configService: ConfigService,
    private readonly sqsService: SqsService,
  ) {}

  async sendMail(payload: any, mjmlTemplateName: string, to: string, subject: string, from: string = null) {
    const mailTemplatePath = join(__dirname, `./core/mail/templates/`);
    const mjmlTemplatePath = join(__dirname, `./core/mail/templates/${mjmlTemplateName}.mjml`);
    const mjmlSource = fs.readFileSync(mjmlTemplatePath, 'utf-8').toString();
    const htmlOutput = mjml2html(mjmlSource, {
      keepComments: false,
      filePath: mailTemplatePath
    });
    const template = handlebars.compile(htmlOutput.html);
    const htmlToSend = template(payload);
    let mailOptions = {
      to: to,
      subject: subject,
      html: htmlToSend,
    }
    if (from) mailOptions['from'] = from;
    
    return await this.mailerService.sendMail(mailOptions);
  }

  private async _pushToQueue(payloadId: string, data: any) {
    // Using Queue dispatch of Sync Queue
    if (this.configService.get('QUEUE_DRIVER') === 'sync') {
      Queue.dispatch({
        job: JobName.SendMail,
        data: data,
      });
    } else {
      // Using SQS Queue
      await this.sqsService.send(QueueName.SendMail, {
        id: payloadId,
        body: data,
        delaySeconds: 10,
      });
    }
  }

  async sendEmailWelcome(user) {
    let data = {
      payload: {
        email: user.email,
        name: user?.firstName + ' ' + user?.lastName
      },
      mjmlTemplateName: 'welcome',
      to: user.email,
      subject: 'Welcome to Motorserve',
      from: this.configService.get('MAIL_FROM')
    }

    await this._pushToQueue(QueuePayloadId.SendWelcomeMail, data);
  }

  async sendEmailForgotPassword({user, forgotPasswordToken}) {
    let data = {
      payload: {
        email: user.email,
        name: user?.firstName + ' ' + user?.lastName,
        redirectURL: `${this.configService.get('ADMIN_FORGOT_PASSWORD_URL')}?token=${forgotPasswordToken}`,
      },
      mjmlTemplateName: 'forgot-password',
      to: user.email,
      subject: 'Reset Password',
      from: this.configService.get('MAIL_FROM')
    }

    await this._pushToQueue(QueuePayloadId.SendForgotPasswordMail, data);
  }

  async sendEmail2FA({user, qrCodeBase64}) {
    let data = {
      payload: {
        email: user.email,
        name: user?.firstName + ' ' + user?.lastName,
        qrCodeBase64,
      },
      mjmlTemplateName: '2fa-qr-code',
      to: user.email,
      subject: 'QR code',
      from: this.configService.get('MAIL_FROM')
    }

    await this._pushToQueue(QueuePayloadId.Send2FAMail, data);
  }
  
  async sendEmailCustomerForgotPassword({user, forgotPasswordToken}) {
    let data = {
      payload: {
        email: user.email,
        name: user?.firstName + ' ' + user?.lastName,
        redirectURL: `${this.configService.get('OSB_FORGOT_PASSWORD_URL')}?token=${forgotPasswordToken}`,
      },
      mjmlTemplateName: 'customer-forgot-password',
      to: user.email,
      subject: 'Reset Password',
      from: this.configService.get('MAIL_FROM')
    }

    await this._pushToQueue(QueuePayloadId.SendForgotPasswordMail, data);
  }

  async sendEmailBookingConfirmation({ organization, customer, vehicle, appointment, bookingServices }) {
    const data = {
      payload: {
        name: customer?.firstName + ' ' + customer?.lastName,
        organization,
        appointmentDate: moment.tz(appointment, organization.timezone).format(DATE_TIME_FORMAT.defaultDate),
        appointmentTime: moment.tz(appointment, organization.timezone).format(DATE_TIME_FORMAT.defaultTimeWithoutSeconds),
        customer,
        vehicle,
        bookingServices,
      },
      mjmlTemplateName: 'booking-confirmation',
      to: customer.email,
      subject: 'Booking Confirmation',
      from: this.configService.get('MAIL_FROM')
    }

    await this._pushToQueue(QueuePayloadId.SendBookingConfirmation, data);
  }
  
  async sendEmailCustomerGeneralEnquiry(customer) {
    let data = {
      payload: { ...customer },
      mjmlTemplateName: 'customer-general-enquiry',
      to: customer.email,
      subject: 'General enquiry',
      from: this.configService.get('MAIL_FROM')
    }

    await this._pushToQueue(QueuePayloadId.SendGeneralEnquiryMail, data);
  }
}
