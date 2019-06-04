import { Session } from '../api/models/session-model';
import * as moment from 'moment';
import { Mail } from '../mail/mail';

export class Cron {
	agenda: any;
	io: any;
	mail: Mail = new Mail();
	constructor(dbUri: string, io: any) {
		this.io = io;
		const Agenda = require('agenda');
		this.agenda = new Agenda({ db: { address: dbUri, collection: 'agendaJobs' } });
		this.define();
	}

	private define(): void {
		this.agenda.define('logUser', (job, done) => {
			const date = moment().subtract(5, 'minutes');
			Session.find({ statut: 1, lastAlive: { $lte: date } }).populate('user').then((res: any[]) => {
				if (res.length) {
					this.log('Alert!!! ');
					this.mail.sendMail();
				}
				this.io.emit('message', { type: 'alert', users: res });
			});
			done();
		});
	}

	start(): void {
		this.agenda.on('ready', async () => {
			await this.agenda.every('10 seconds', 'logUser');
			await this.agenda.start();
		});
	}

	private log(obj: any): void {
		console.log('\x1b[42m%s\x1b[0m', obj);
	}
}
