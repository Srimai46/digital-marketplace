import http from 'http';
import { Server } from 'socket.io';
import app from './app.js';
import { setupSockets } from './sockets/index.js';

const port = process.env.PORT || 4000;
const server = http.createServer(app);

const io = new Server(server, {
  cors: { origin: process.env.CLIENT_URL, credentials: true },
});
setupSockets(io);

// แนบ io ให้ controllers ใช้
app.set('io', io);

server.listen(port, () => {
  console.log(`API running on http://localhost:${port}`);
});
