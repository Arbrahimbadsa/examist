// socket middlewear to inject the username
export const applySocketMiddlewear = (socket, next) => {
  const user = socket.handshake.auth.user;
  socket.user = user;
  next();
};

// connected users
const allUsers = {};

export const onConnection = (socket, io) => {
  try {
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
    });

    socket.on("submit-challenge", (data) => {
      socket.broadcast.to(data.to.username).emit("submit-challenge", data);
    });

    const applyWinCatcher = (name) => {
      socket.on(name, (data) => {
        const winner = data.winner.username;
        const loser = data.loser.username;
        const current = socket.user.username;
        if (winner === current || loser === current) {
          console.log(`Winner: ${winner}`);
          socket.emit(name, data);
        }
        console.log(`Winner: ${winner}`);
        socket.broadcast.to(data.loser.username).emit(name, data);
        socket.broadcast.to(data.winner.username).emit(name, data);
      });
    };

    applyWinCatcher("player-1-win");

    applyWinCatcher("player-2-win");

    socket.on("draw-update", (data) => {
      const players = data?.players;
      if (
        players.player1.username === socket.user.username ||
        players.player2.id === socket.user.username
      ) {
        socket.emit("draw-update", data);
      }
      socket.broadcast
        .to(data?.players.player1.username)
        .emit("draw-update", data);
      socket.broadcast
        .to(data?.players.player2.username)
        .emit("draw-update", data);
    });

    // on starting exam
    socket.on("start-exam", (data) => {
      io.sockets.emit("start-exam", data);
    });

    socket.on("disconnect", () => {
      delete allUsers[socket.user.id];
      io.sockets.emit("users", allUsers);
    });
  } catch (error) {
    console.log("SOCKET ERROR : ", error);
  }
};
