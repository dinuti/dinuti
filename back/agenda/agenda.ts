import { Session, ISessionModel } from '../api/models/session-model';
import { Mail } from '../mail/mail';
import { env } from '../env';

export class Cron {
	moment = require('moment');
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
			const date = this.moment().subtract(env.timeMinutes, 'minutes');
			Session.find({ statut: { $in: [1, 2] }, lastAlive: { $lte: date } })
			.populate('user').then((res: any[]) => {
				if (res.length) {
					this.log('Alert!!! ');
					this.modifyStatue(res);
				}
				this.io.emit('message', { type: 'alert', users: res });
			});
			done();
		});
	}

	start(): void {
		this.agenda.on('ready', async () => {
			await this.agenda.every(env.every, 'logUser');
			await this.agenda.start();
		});
	}

	private log(obj: any): void {
		console.log('\x1b[42m%s\x1b[0m', obj);
	}

	private modifyStatue(sessions: any[]) {
		sessions.forEach((session: any) => {
			Session.findOne({ user: session.user._id, statut: 1 }).then(async (session: ISessionModel) => {
				if (session) {
					this.mail.sendMail();
					session.statut = 2;
					session.save();
				}
			});
		});
	}
}
