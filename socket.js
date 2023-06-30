// let io;

// module.exports = {
//  const init = (httpServer) => {
//   io = socketIO(httpServer);
//     return io;
//   },
//  const getIO = () => {
//     if (!io) {
//       throw new Error("Scoket.io is not initialized");
//     }
//     return io;
//   },
// };

// export {init, getIO}

import { Server as SocketIOServer } from 'socket.io';

let io;

const init = (httpServer) => {
  io = new SocketIOServer(httpServer);
  return io;
};

const getIO = () => {
  if (!io) {
    throw new Error('Socket.io is not initialized');
  }
  return io;
};

export { init, getIO };



