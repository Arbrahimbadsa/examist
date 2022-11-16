import jwt from "jsonwebtoken";
export const verify = (req, res, next) => {
  try {
    const bearer = req.headers.authorization || req.body.token;
    const token = bearer.split(" ")[1];
    const decoded = jwt.verify(token, process.env.TOKEN_KEY);
    const { username, id, role } = decoded;
    req.username = username;
    req.userId = id;
    req.role = role;
    next();
  } catch (error) {
    res.status(401).json({
      error: "Authentication error!",
    });
  }
};
