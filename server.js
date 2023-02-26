import { WebSocketServer } from "ws";
import { createClient } from "redis";

const clientSub = createClient({ port: process.env.REDIS_PORT })
clientSub.on("error", err => console.error(err))
clientSub.subscribe('app:notification')

const wss = new WebSocketServer({ port: 9090 });
wss.on('connection', function connection(ws) {
  clientSub.on("message", (channel, msg) => {
    ws.send(msg);
  })
});
