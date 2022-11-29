// socket middlewear to inject the username
export const applySocketMiddlewear = (socket, next) => {
  const user = socket.handshake.auth.user;
  socket.user = user;
  next();
};

// connected users
const allUsers = {};

export const onConnection = (socket, io) => {
  // GET CURRENTLY CONNECTED USERS
  // save the currently connected user
  allUsers[socket.user.id] = socket.user;
  // serve users on request
  socket.on("get-users", () => {
    io.sockets.emit("users", allUsers);
  });

  //register the user
  socket.on("register-key", (user) => {
    socket.join(user.username);
  });

  socket.on("send-challenge", (data) => {
    socket.broadcast.to(data.to.username).emit("send-challenge", data);
  });

  socket.on("confirm-challenge", (data) => {
    socket.broadcast.to(data.to.username).emit("challenge-confirmed", data);
  });

  socket.on("left-challenge", (data) => {
    socket.broadcast.to(data.to.username).emit("left-challenge", data);
    console.log("============ left =====");
    console.log(data);
  });

  socket.on("submit-challenge", (data) => {
    socket.broadcast.to(data.to.username).emit("submit-challenge", data);
    console.log("============ submit =====");
    console.log(data);
  });

  // on starting exam
  socket.on("start-exam", (data) => {
    io.sockets.emit("start-exam", data);
  });

  socket.on("disconnect", () => {
    delete allUsers[socket.user.id];
    io.sockets.emit("users", allUsers);
  });
};
