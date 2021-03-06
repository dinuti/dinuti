export const env = {
	// Timer
	timeMinutes: 2,
	timeSecond: this.timeMinutes * 60,

	// Cron
	every: '10 seconds',

	// Port
	apiPort: 3000,
	socketPort: 4000,

	// Mail
	mail: {
		from: '"Admin" 👻 <admin@dinuti.com>', // sender address
		to: 'admin@dinuti.fr, admin2@dinuti.fr, admin3@dinuti.fr', // list of receivers
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
			user: 'berenice.will@ethereal.email',
			pass: 'Cu9Vbwu59tq5zya3mY'
		}
	}
};
