const { app } = require("./config");

app.get("/", (req, reply) => {
  reply.view("index.ejs", { title: "Resume Builder" });
});

app.listen({ port: 3000 }, (err) => {
  if (err) {
    console.log(err);
    process.exit(1);
  }

  console.log("server listening on port 3000");
});
