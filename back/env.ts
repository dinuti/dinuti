export const env = {
	// Timer
	timeMinutes: 5,
	timeSecond: this.timeMinutes * 60,

	// Port
	apiPort: 3000,
	socketPort: 4000,

	// Mail
	adminMail: 'admin@dinuti.fr, admin2@dinuti.fr, admin3@dinuti.fr',
	mail: {
		from: '"Admin" 👻 <admin@dinuti.com>', // sender address
		to: this.adminMail, // list of receivers
		subject: 'Alert ✔', // Subject line
		text: 'Alert?', // plain text body
		html: '<b>Alert</b>' // html body
	},
	// create fake account here: https://ethereal.email/
	// paste transport here
	transport: {
		host: 'smtp.ethereal.email',
		port: 587,
		auth: {
			user: 'johnathan87@ethereal.email',
			pass: 'CE2fmd1EvFk4r1G3z9'
		}
	}
};
