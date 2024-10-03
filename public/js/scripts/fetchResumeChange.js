document.addEventListener("htmx:afterRequest", function (evt) {
  const responsePath = evt.detail.pathInfo.responsePath;
  const regex = /^\/resume\/(name|role)$/;

  if (regex.test(responsePath)) {
    fetch("/resume")
      .then((res) => res.arrayBuffer())
      .then((buf) => {
        console.log("resume updated");

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

              if (canvas.classList.contains("fade-in")) {
                canvas.classList.remove("fade-in");
                canvas2.classList.add("fade-in");
                canvas2.style.zIndex = 1;
                canvas.style.zIndex = 0;

                ctx2.fillStyle = "white";
                ctx2.fillRect(0, 0, canvas2.width, canvas2.height);
                page.render({
                  canvasContext: ctx2,
                  viewport: viewport,
                });
              } else {
                canvas2.classList.remove("fade-in");
                canvas.classList.add("fade-in");
                canvas.style.zIndex = 1;
                canvas2.style.zIndex = 0;

                ctx.fillStyle = "white";
                ctx.fillRect(0, 0, canvas.width, canvas.height);
                page.render({
                  canvasContext: ctx,
                  viewport: viewport,
                });
              }
            });
          })
          .catch((err) => {
            console.error(err);
          });
      });
  }
});
