import { BadRequestException, Injectable } from '@nestjs/common';

@Injectable()
export class SmsService {
  async sendSMS(to: string, message: string) {
    const url = 'https://api.managepoint.co/api/sms/send';
    const apiKey: string = process.env['SMS_API_KEY'];
    const payload = {
      apiKey,
      to,
      message,
    };
    const headers = {
      'Content-Type': 'application/json',
    };
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers,
        body: JSON.stringify(payload),
      });
      return await response.json();
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}
