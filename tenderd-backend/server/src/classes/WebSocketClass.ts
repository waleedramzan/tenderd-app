import WebSocket from 'ws';

export default class WebSocketClass {
    wss: any = null;
    constructor() {
        try {
            this.wss = new WebSocket.Server({ port: 8081 });
        } catch (err) {
            console.log(err);
        }
    }

    initializeWebSockets() {
        this.wss.on('connection', function connection(ws: any) {
            console.log('Client connected');
        });
    }

    broadcast(message: any) {
        this.wss.clients.forEach(function each(client: any) {
            if (client.readyState === WebSocket.OPEN) {
                console.log('send 2')
                client.send(message);
            }
        });
    }

    sendMessageInIntervalsToClient(messages: any) {
        setInterval(() => {
            this.broadcast(messages);
        }, 10000);
    }
}