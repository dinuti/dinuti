import { env } from '../env';
import { ISessionModel } from '../api/models/session-model';

export class Mail {
	nodemailer: any;

	constructor() {
		this.nodemailer = require('nodemailer');
	}

	async sendMail(session: ISessionModel) {
		const transporter = this.nodemailer.createTransport(env.transport);
		// send mail with defined transport object
		const mail = env.mail;
		mail.html = `Veuillez venir en aide à ${session.user.username}.<br/>
		Localisation: ${session.location.desc}<br/>
		Numéro de téléphone: ${session.mobile}<br/>
		Mail: ${session.user.email} <br/>`;
		const info = await transporter.sendMail(mail);
	}
}
