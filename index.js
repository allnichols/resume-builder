const { app } = require("./config");

app.get("/", async (req, reply) => {
  return { hello: "world" };
});

app.listen({ port: 3000 }, (err) => {
  if (err) {
    console.log(err);
    process.exit(1);
  }

  console.log("server listening on port 3000");
});
