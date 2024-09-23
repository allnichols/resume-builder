const { app } = require("./config");
const { PDFDocument, rgb, StandardFontValues } = require("pdf-lib");

const resume = {
  name: "John Doe",
  role: "Software Developer",
};

app.get("/", (req, reply) => {
  console.log(resume);
  reply.view("index.ejs", {
    title: "Resume Builder",
    message: "Hello World!",
    resume: resume,
  });
});

app.get("/resume", async (req, reply) => {
  const pdf = await PDFDocument.create();

  const page = pdf.addPage([612, 792]);

  const headingFontSize = 24;
  const normalFontSize = 12;
  const content = [
    { text: resume.role, x: 200, y: 750, size: headingFontSize },
    { text: resume.name, x: 50, y: 700, size: headingFontSize },
  ];

  content.forEach((c) => {
    page.drawText(c.text, {
      x: c.xy,
      y: c.y,
      size: c.size,
    });
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
