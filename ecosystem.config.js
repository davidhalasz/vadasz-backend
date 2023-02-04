module.exports = {
    apps : [
        {
          name: "backend",
          script: "app.js",
          watch: true,
          env_production: {
              "PORT": 4000,
              "NODE_ENV": "production",
          }
        }
    ]
  }