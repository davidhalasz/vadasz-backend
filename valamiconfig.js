module.exports = {
    apps : [
        {
          name: "backend",
          script: "app.js",
          watch: true,
          NODE_ENV: production,
          PORT: 4000,
          TOKEN_KEY: "randomTokenKey",
          REFRESH_TOKEN: "refreshtokenkey",
          SESS_SECREET: "sessionsecret",
          EMAIL_TEST: "1mrwoof@gmail.com",
          EMAIL_TEST_PSWD: "xdnxghycmtglwzyk",
          MONGO_URL: "mongodb+srv://mouse:davee22dodo@cluster0.fkwvjht.mongodb.net/mern?retryWrites=true&w=majority",
        }
    ]
  }