
import * as express from 'express';
// tslint:disable-next-line:no-duplicate-imports
import { Application } from 'express';
import { MainRouter } from './api/routes/index';
import { connectToMongoDB } from './api/utilities/database';
import { loadErrorHandlers } from './api/utilities/error-handling';
import './api/utilities/passport';
import * as session from 'express-session';
import * as cors from 'cors';
import { Session } from './api/models/session-model';

const Agenda = require('agenda');
const moment = require('moment');
const app: Application = express();
const http = require('http').Server(app);
const bodyParser = require('body-parser');
http.listen(4000);
const io = require('socket.io')(http);

const dbUri: string = process.argv[2] ? process.argv[2] : '';
connectToMongoDB(dbUri);

const agenda = new Agenda({ db: { address: dbUri, collection: 'agendaJobs' } });

agenda.define('logUser', (job, done) => {
	const date = moment().subtract(5, 'minutes');
	Session.find({ statut: 1, lastAlive: { $lte: date } }).populate('user').then((res: any[]) => {
		if (res.length) {
			log('Alert!!! ');
		}
		io.emit('message', { type: 'alert', users: res });
	});
	done();
});

agenda.on('ready', async () => {
	await agenda.every('10 seconds', 'logUser');
	await agenda.start();
});

app.use(bodyParser.json());
app.use(cors());
app.use(session({ secret: 'dinuti', cookie: { maxAge: 60000 }, resave: false, saveUninitialized: false }));
app.use('/api', MainRouter);
app.use('/doc', express.static('./apidoc'));

loadErrorHandlers(app);

io.on('connection', (socket: any) => {
	log(`${Object.keys(io.sockets.connected).length} user connected`);
	socket.on('auth', (res: any) => {
		log(`${res.user.email} est connecté`);
		socket.sessionid = res.user.email;
		io.emit('message', { type: 'new-message', text: res });
	});
	socket.on('disconnect', () => log(`closed connection ${socket.sessionid}`));
});

const server = app.listen(3000, () => {
	// console.log(`Listening on port ${server.address().port}`);
});

function log(obj: any): void {
	console.log('\x1b[42m%s\x1b[0m', obj);
}
