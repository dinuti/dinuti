
import * as express from 'express';
// tslint:disable-next-line:no-duplicate-imports
import { Application } from 'express';
import { MainRouter } from './api/routes/index';
import { connectToMongoDB } from './api/utilities/database';
import { loadErrorHandlers } from './api/utilities/error-handling';
import './api/utilities/passport';
import * as session from 'express-session';
import * as cors from 'cors';
import { Socket } from './socket/socket';
import { Cron } from './agenda/agenda';

const bodyParser = require('body-parser')
// start API
const dbUri: string = process.argv[2] ? process.argv[2] : '';
const app: Application = express();
// start Socket
const socket = new Socket(app);
const io = socket.getIo();
// start Mongo
connectToMongoDB(dbUri);
// start Cron
const agenda = new Cron(dbUri, io);
agenda.start();

app.use(bodyParser.json());
app.use(cors());
app.use(session({ secret: 'dinuti', cookie: { maxAge: 60000 }, resave: false, saveUninitialized: false }));
app.use('/api', MainRouter);
app.use('/doc', express.static('./apidoc'));

loadErrorHandlers(app);

const server = app.listen(3000, () => {
	// console.log(`Listening on port ${server.address().port}`);
});
