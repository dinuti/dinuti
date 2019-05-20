
import * as express from 'express';
import { Application } from 'express';
import * as bodyParser from 'body-parser';
import { MainRouter } from './api/routes/index';
import { connectToMongoDB } from './api/utilities/database';
import { loadErrorHandlers } from './api/utilities/error-handling';
import './api/utilities/passport';
import * as session from 'express-session';
import * as socketio from "socket.io";
import * as cors from "cors";

const app: Application = express();
const http = require("http").Server(app);
http.listen(4000);
const io = require("socket.io")(http);

const dbUri: string = process.argv[2] ? process.argv[2] : '';

connectToMongoDB(dbUri);

app.use(bodyParser.json());
app.use(cors());
app.use(session({ secret: 'dinuti', cookie: { maxAge: 60000 }, resave: false, saveUninitialized: false }));
app.use('/api', MainRouter);
app.use('/doc', express.static('./apidoc'));

loadErrorHandlers(app);

io.on("connection", function(socket: any) {
	log(`${Object.keys(io.sockets.connected).length} user connected`);
	socket.on("auth", res => {
		log(`${res.user.email} est connecté`);
		socket.sessionid = res.user.email
		io.emit("message", { type: "new-message", text: res });
	});
	socket.on("disconnect", () => log(`closed connection ${socket.sessionid}`))
});

const server = app.listen( 3000, () => {
	console.log('Listening on port ' + server.address().port);
});

function log(obj: any): void {
	console.log('\x1b[42m%s\x1b[0m', obj)
};