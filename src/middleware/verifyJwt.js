const jwt = require("jsonwebtoken");
const db = require("../models");
const User = db.users;

//const config = process.env;

const verifyToken = async (req, res, next) => {
  if (!req.session.jwt) {
    return res.status(401).json({ message: "There is no token" });
  }

  try {
    const decodedToken = jwt.verify(req.session.jwt, process.env.TOKEN_KEY);
    const user = await User.findOne({ where: { uuid: decodedToken.user_id } });

    if (!user) return res.status(404).json({ msg: "Nem talalhato az user" });

    req.userId = user.id;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Auth failed!" });
  }
};

module.exports = {
  verifyToken,
};
