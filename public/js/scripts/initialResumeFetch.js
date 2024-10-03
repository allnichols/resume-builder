import * as pdfjsLib from "../pdfjs/pdf.mjs";
pdfjsLib.GlobalWorkerOptions.workerSrc = "../pdfjs/pdf.worker.mjs";
fetch("/resume")
  .then((res) => res.arrayBuffer())
  .then((buf) => {
    const blob = new Blob([buf], { type: "application/pdf" });
    const url = URL.createObjectURL(blob);

    const canvas = document.getElementById("canvas-1");
    const ctx = canvas.getContext("2d");

    // second canvas on load
    const canvas2 = document.getElementById("canvas-2");
    const ctx2 = canvas2.getContext("2d");

    const loadingTask = pdfjsLib.getDocument(url);
    loadingTask.promise
      .then((pdf) => {
        pdf.getPage(1).then((page) => {
          const viewport = page.getViewport({ scale: 1 });

          canvas.height = viewport.height;
          canvas.width = viewport.width;
          canvas.classList.add("fade-in");
          canvas.style.zIndex = 1;

          canvas2.height = canvas.height;
          canvas2.width = canvas.width;
          canvas2.style.zIndex = 0;

          ctx2.fillStyle = "white";
          ctx2.fillRect(0, 0, canvas2.width, canvas2.height);

          page.render({
            canvasContext: ctx,
            viewport: viewport,
          });
        });
      })
      .catch((err) => {
        console.error(err);
      });
  });
