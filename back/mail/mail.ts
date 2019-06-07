import { env } from '../env';
import * as nodemailer from 'nodemailer';

export class Mail {
	nodemailer: any;

	constructor() {
		this.nodemailer = nodemailer;
	}

	async sendMail() {
		const transporter = this.nodemailer.createTransport(env.transport);
		// send mail with defined transport object
		const info = await transporter.sendMail(env.mail);
	}
}
