const db = require("../models");
const bcrypt = require("bcryptjs");
const HttpError = require("../http-errors");
const jwt = require("jsonwebtoken");
const User = db.users;
const nodemailer = require('nodemailer');

let transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  service: 'gmail',
  secure: false,
  auth: {
    user: "1mrwoof@gmail.com",
    pass: "xdnxghycmtglwzyk",
  }
});


const createUser = async (req, res, next) => {
  console.log('called create user');
  const { name, email, password, telephone } = req.body;
  let isEmailExists;

  try {
    isEmailExists = await User.findOne({ where: { email: email } });
  } catch (err) {
    return res.status(409).json({ msg: "Valami hiba történt. Próbáld később." });
  }

  if (isEmailExists) {
    return res.status(409).json({ msg: "Ez az email cím már foglalt!" });
  }

  const encryptedPassword = await bcrypt.hash(password, 10);

  const newUser = {
    name: name,
    email: email.toLowerCase(),
    password: encryptedPassword,
    telephone: telephone,
  };

  try {
    const response = await User.create(newUser);
    
    const mailOptions = {
      from: process.env.EMAIL_TEST,
      to: response.email,
      subject: 'Regisztráció megerósítése',
      text: `Ezt az email azért küldjük, mert regisztráltál a Vadászbörze oldalunkra. A regisztráció megerősítéséhez, kattints az alábbi linkre: http://localhost:3000/activation/${response.uuid}`
    };

    transporter.sendMail(mailOptions, function(error, info) {
      if(error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });

    return res.status(200).json({ msg: "Sikeres regisztráció! Az aktiváló linket elküldtük az email címedre!" });
  } catch (err) {
    return res.status(400).json({ msg: "Valami hiba történt! Próbáld meg később!" });
  }
};

const activation = async (req, res, next) => {
  try {
    console.log(req.params.uuid);
    const user = await User.findOne({
      where: { uuid: req.params.uuid },
    });

    if (!user)
      return res.status(404).json({ msg: "A felhasznalo nem talalhato" });

    await User.update({activated: true}, { where: { id: user.id } });
    return res.status(200).json({ msg: "Sikeres megerősítés!" });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ msg: "Valami hiba történt! Próbáld meg később!" });
  }
};

const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({
      where: { email: email },
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

      res
        .status(200)
        .json({ user: { uuid: user.uuid, name: user.name, email: user.email } });
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
    return res.status(401).json({ SessionMsg: "There is no token session" });
  }
  let decodedId;
  try {
    decodedId = jwt.verify(req.session.jwt, process.env.TOKEN_KEY);
  } catch (err) {
    return res.status(402).send({ SessionmMsg: "invalid token" });
  }

  const user = await User.findOne({
    attributes: ["uuid", "name", "email"],
    where: {
      uuid: decodedId.user_id,
    },
  });

  if (!user) return res.status(404).json({ SessionMsg: "User not found" });
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
  activation,
  checkToken,
  logout,
  getAllUsers,
  getOneUserById,
  updateUser,
  deleteUser,
};
