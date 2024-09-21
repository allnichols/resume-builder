const fastify = require("fastify")();
const fastifyView = require("@fastify/view");

const app = fastify;

app.register(fastifyView, {
  engine: {
    ejs: require("ejs"),
  },
});

module.exports = { app };
