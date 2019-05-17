
import * as express from 'express';
import { Application } from 'express';
import * as bodyParser from 'body-parser';
import { MainRouter } from './api/routes/index';
import { connectToMongoDB } from './api/utilities/database';
import { loadErrorHandlers } from './api/utilities/error-handling';
import './api/utilities/passport';
import * as session from 'express-session';
import * as socketio from "socket.io";


const app: Application = express();
const http = require("http").Server(app);
http.listen(4000);
const io = require("socket.io")(http);

connectToMongoDB();

app.use(bodyParser.json());
app.use(session({ secret: 'dinuti', cookie: { maxAge: 60000 }, resave: false, saveUninitialized: false }));
app.use('/api', MainRouter);
app.use('/doc', express.static('./apidoc'));

loadErrorHandlers(app);

io.on("connection", function(socket: any) {
	console.log("a user connected");
	socket.on("message", message => {
		console.log("Message Received: " + message);
		io.emit("message", { type: "new-message", text: message });
	});
});

const server = app.listen( 3000, () => {
	console.log('Listening on port ' + server.address().port);
});
