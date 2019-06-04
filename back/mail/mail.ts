
export class Mail {
	nodemailer: any;

	constructor() {
		this.nodemailer = require('nodemailer');
	}

	async sendMail() {
		const transporter = this.nodemailer.createTransport({
			host: 'smtp.ethereal.email',
			port: 587,
			auth: {
				user: 'nayeli68@ethereal.email',
				pass: 'NCKFUgfRkretrWM9fB'
			}
		});

		// send mail with defined transport object
		const info = await transporter.sendMail({
			from: '"Fred Foo" 👻 <foo@example.com>', // sender address
			to: 'bar@example.com, baz@example.com', // list of receivers
			subject: 'Hello ✔', // Subject line
			text: 'Hello world?', // plain text body
			html: '<b>Hello world?</b>' // html body
		});
	}
}
