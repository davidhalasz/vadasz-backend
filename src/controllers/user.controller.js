const db = require("../models");
const bcrypt = require("bcryptjs");
const HttpError = require("../http-errors");
const jwt = require("jsonwebtoken");
const User = db.users;

const createUser = async (req, res, next) => {
  const { username, email, password } = req.body;
  let isUsernameExists;
  let isEmailExists;

  try {
    isUsernameExists = await User.findOne({ where: { username: username } });
    isEmailExists = await User.findOne({ where: { email: email } });
  } catch (err) {
    return res.status(409).json({ msg: "Valami hiba történt. Próbáld később." });
  }

  if (isUsernameExists && isEmailExists) {
    return res.status(409).json({ msg: "Ez a felhasználónév és email is foglalt!" });
  }

  if (isEmailExists) {
    return res.status(409).json({ msg: "Ez az email cím már foglalt!" });
  }

  if (isUsernameExists) {
    return res.status(409).json({ msg: "Ez az felhasználónév már foglalt!" });
  }

  const encryptedPassword = await bcrypt.hash(password, 10);

  const newUser = {
    username: username,
    email: email.toLowerCase(),
    password: encryptedPassword,
  };

  try {
    const createdUser = await User.create(newUser);
    return res.status(200).json({ msg: "Sikeres regisztráció! Az aktiváló linket elküldtük az email címedre!" });
  } catch (err) {
    return res.status(500).json({ msg: "Valami hiba történt! Próbáld meg később!" });
  }
};

const loginUser = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({
      where: { username: username },
    });

    if (user && (await bcrypt.compare(password, user.password))) {
      const token = jwt.sign(
        { user_id: user.uuid },
        process.env.TOKEN_KEY,
        {
          expiresIn: "2h",
        }
      );

      user.token = token;
      await User.update(user, { where: { id: user.id } });
      req.session.jwt = token;

      const uuid = user.uuid;
      const email = user.email;
      res
        .status(200)
        .json({ user: { uuid: uuid, username: username, email: email } });
    } else {
      return res.status(404).json({ msg: "Helytelen bejelentkezesi adatok" });
    }
  } catch (err) {
    return res
      .status(500)
      .json({ msg: "Sikertelen bejelentkezes. Probald kesobb." });
  }
};

const checkToken = async (req, res, next) => {
  if (!req.session.jwt) {
    return res.status(401).json({ msg: "There is no token session" });
  }
  let decodedId;
  try {
    decodedId = jwt.verify(req.session.jwt, process.env.TOKEN_KEY);
  } catch (err) {
    return res.status(402).send({ msg: "invalid token" });
  }

  const user = await User.findOne({
    attributes: ["uuid", "username", "email"],
    where: {
      uuid: decodedId.user_id,
    },
  });

  if (!user) return res.status(404).json({ msg: "User not found" });
  res.status(200).json({ user });
};

const logout = async (req, res, next) => {
  req.session.destroy((err) => {
    if (err) return res.status(400).json({ msg: "Error occured.." });
    res.status(200).json({ msg: "Kijelentkezve" });
  });
};

const getAllUsers = async (req, res) => {
  try {
    let users = await User.findAll({});
    res.send(users);
  } catch (err) {
    console.log(err);
  }
};

const getOneUserById = async (res, req) => {
  try {
    let id = req.params.id;
    let user = await User.findOne({ where: { id: id } });
    res.status(200).send(user);
  } catch (err) {
    console.log(err);
  }
};

const updateUser = async (res, req) => {
  try {
    let id = req.params.id;
    let user = await User.update(req.body, { where: { id: id } });
    res.status(200).send(user);
  } catch (err) {
    console.log(err);
  }
};

const deleteUser = async (res, req) => {
  try {
    let id = req.params.id;
    await User.destroy({ where: { id: id } });
    res.status(200).send({ msg: "User deleted!" });
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  createUser,
  loginUser,
  checkToken,
  logout,
  getAllUsers,
  getOneUserById,
  updateUser,
  deleteUser,
};
