const { app } = require("./config");
const { PDFDocument, rgb } = require("pdf-lib");

app.get("/", (req, reply) => {
  reply.view("index.ejs", { title: "Resume Builder" });
});

app.get("/resume", async (req, reply) => {
  const pdf = await PDFDocument.create();

  const page = pdf.addPage([612, 792]);

  page.drawText("Hello World!", {
    x: 50,
    y: 700,
    size: 50,
    color: rgb(0, 0, 0),
  });

  const pdfBytes = await pdf.save();

  reply.header("Content-Type", "application/pdf");
  reply.send(pdfBytes);
});

app.listen({ port: 3000 }, (err) => {
  if (err) {
    console.log(err);
    process.exit(1);
  }

  console.log("server listening on port 3000");
});
