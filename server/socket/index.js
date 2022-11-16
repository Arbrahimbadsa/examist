// socket middlewear to inject the username
export const applySocketMiddlewear = (socket, next) => {
  const user = socket.handshake.auth.user;
  socket.user = user;
  next();
};

// connected users
const users = [];

export const onConnection = (socket, io) => {
  //register the user
  socket.on("register-key", (user) => {
    socket.join(user.username);
  });

  const found = users.findIndex((u) => u.username === socket.username);
  if (found == -1) users.push(socket.user);

  setInterval(() => {
    io.sockets.emit("users", users);
  }, 500);

  socket.on("send-challenge", (data) => {
    socket.broadcast.to(data.to.username).emit("send-challenge", data);
  });

  socket.on("confirm-challenge", (data) => {
    console.log(data.to.username);
    socket.broadcast.to(data.to.username).emit("challenge-confirmed", data);
  });

  // on starting exam
  socket.on("start-exam", (data) => {
    io.sockets.emit("start-exam", data);
  });

  socket.on("disconnect", () => {
    const index = users.findIndex((u) => u.username === socket.username);
    users.splice(index, 1);
    io.sockets.emit("users", users);
  });
};
