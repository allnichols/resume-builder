const fastify = require("fastify")();
const fastifyView = require("@fastify/view");

const app = fastify;

app.register(fastifyView, {
  engine: {
    ejs: require("ejs"),
  },
  templates: "./views",
});

module.exports = { app };
