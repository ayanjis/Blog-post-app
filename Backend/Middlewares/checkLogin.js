// External imports.
import jwt from "jsonwebtoken";

// Creating protected route Midelware.
const checkLogin = (req, res, next) => {
  const authorizationObj = req.headers;
  const authHeader = authorizationObj.authorization;
  try {
    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const { name, gmail, userId } = decoded;
    req.name = name;
    req.gmail = gmail;
    req.userId = userId;
    next();
  } catch (e) {
    next("Authetication Failed!");
  }
};

export default checkLogin;
