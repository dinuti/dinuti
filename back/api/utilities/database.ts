
import * as mongoose from 'mongoose';
import * as Bluebird from 'bluebird';

// Use bluebird promises in lieu of mongoose promises throughout application.
(mongoose as any).Promise = Bluebird;

export function connectToMongoDB(dbUri: string) {

	mongoose.connect(dbUri, {
		useMongoClient: true
	});

	mongoose.set('debug', true);

	mongoose.connection.on('connected', () => {
		console.log(`Mongoose connected to ${dbUri}`);
	});

	mongoose.connection.on('disconnected', () => {
		console.log('Mongoose disconnected');
	});

	mongoose.connection.on('error', (err: string) => {
		console.log(`Mongoose connection error:  ${err}`);
	});

// ADDITIONAL PROCESS EVENTS FOR UNIX MACHINES ONLY:

	// CTRL-C
	process.on('SIGINT', () => {
		mongooseClose('SIGINT');
	});

	// Used on services on Heroku
	process.on('SIGTERM', () => {
		mongooseClose('SIGTERM');
	});

	// Node restart
	process.once('SIGUSR2', () => {
		mongooseClose('SIGUSR2');
	});

	function mongooseClose(name: string) {
		mongoose.connection.close(() => {
			console.log(`Mongoose disconnected through app termination (${name})`);
			process.kill(process.pid, name);
		});
	}

}
