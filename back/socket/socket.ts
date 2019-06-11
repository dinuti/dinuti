export class Socket {
	private io: any;
	constructor(app: any) {
		const http = require('http').Server(app);
		this.io = require('socket.io')(http);
		http.listen(4000);
		this.start();
	}

	getIo() {
		return this.io;
	}

	start(): void {
		this.io.on('connection', (socket: any) => {
			console.log(`${Object.keys(this.io.sockets.connected).length} user connected`);
			socket.on('auth', (res: any) => {
				if (res.user && res.user.email) {
					console.log(`${res.user.email} est connecté`);
					socket.sessionid = res.user.email;
					this.io.emit('message', { type: 'new-message', text: res });
				}
			});
			socket.on('disconnect', () => console.log(`closed connection ${socket.sessionid}`));
		});
	}
}
