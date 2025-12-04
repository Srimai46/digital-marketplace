export function setupSockets(io) {
  io.on('connection', (socket) => {
    // รับ userId จาก query และเข้าห้องส่วนตัว
    const { userId } = socket.handshake.query || {};
    if (userId) socket.join(userId);

    socket.on('disconnect', () => {});
  });
}
