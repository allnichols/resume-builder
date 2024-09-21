const fastify = require("fastify")();
const fastifyView = require("@fastify/view");
const fastifyStatic = require("@fastify/static");
const path = require("node:path");

const app = fastify;

app
  .register(fastifyView, {
    engine: {
      ejs: require("ejs"),
    },
    templates: "./views",
  })
  .register(fastifyStatic, {
    root: path.join(__dirname, "../public"),
  });

module.exports = { app };
