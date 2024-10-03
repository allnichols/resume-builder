const { app } = require("./config");
const { PDFDocument, rgb, StandardFontValues } = require("pdf-lib");

let resume = {
  name: "John Doe",
  role: "Software Developer",
  country: "United States",
  location: "New York, NY",
  email: "mail@mail.com",
  phone: "555-555-5555",
};

app.get("/", (req, reply) => {
  reply.view("index.ejs", {
    resume,
  });
});

app.get("/resume", async (req, reply) => {
  const pdf = await PDFDocument.create();

  const page = pdf.addPage([612, 792]);
  const { width, height } = page.getSize();

  const headerFontSize = 24;
  const name = resume.name;
  const role = resume.role;

  // Draw name / header
  page.drawText(name, {
    x: 50,
    y: height - 50,
    size: headerFontSize,
  });

  // Draw role
  page.drawText(role, {
    x: 50,
    y: height - 70,
    size: headerFontSize / 2,
  });

  // Contact info title
  page.drawText("Details", {
    x: 400,
    y: height - 120,
    size: 16,
  });
  page.drawText(resume.location, {
    x: 400,
    y: height - 140,
    size: 12,
  });
  page.drawText(resume.phone, {
    x: 400,
    y: height - 160,
    size: 12,
  });
  page.drawText(resume.email, {
    x: 400,
    y: height - 180,
    size: 12,
  });

  // Technologies

  const pdfBytes = await pdf.save();

  reply.header("Content-Type", "application/pdf");
  reply.send(pdfBytes);
});

app.put("/resume/name", (req, reply) => {
  resume.name = req.body.name;
  reply.send(resume.name);
});

app.put("/resume/role", (req, reply) => {
  resume.role = req.body.role;
  reply.send(resume.role);
});

app.listen({ port: 3000 }, (err) => {
  if (err) {
    console.log(err);
    process.exit(1);
  }

  console.log("server listening on port 3000");
});
