const express = require("express");
const dotenv = require("dotenv");
const userRouter = require("./src/routes/user.routes");
const productRouter = require("./src/routes/product.routes");
const app = express();
const cors = require("cors");
const session = require("express-session");
const SequelizeStore = require('connect-session-sequelize');
const dbConf = require('./src/models/index');
const fs = require('fs');
const path = require('path');

dotenv.config();

const sessionStore = SequelizeStore(session.Store);
const store = new sessionStore({
  db: dbConf.sequelize
});

app.use(
  session({
    secret: process.env.SESS_SECREET,
    resave: false,
    saveUninitialized: true,
    store: store,
    cookie: {
      secure: "auto",
    },
  })
);

app.use(cors({
  credentials: true,
  origin:'http://localhost:3000'
}));
app.use('/uploads', express.static(path.join('uploads')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/user", userRouter);
app.use('/api', productRouter);
const PORT = process.env.PORT || 4000;

app.use((error, req, res, next) => {
  if (req.file) {
    fs.unlink(req.file.path, err => {
      console.log(err);
    });
  }
  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || 500);
  res.json({ message: error.message || "An unknown error occured!" });
});

store.sync();

app.listen(PORT, () =>
  console.log(`Example app listening on port ${process.env.PORT}!`)
);
