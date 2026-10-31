// Grand Fractal Explorer: model, controls, presets and explanation belong to this project.
startExperiment(20, (lab) => {
  const { P, raster, report } = lab;

  function fractal() {
    const { S, width, height } = lab;
    const z = P("zoom"),
      aspect = width / height;
    raster((xx, yy) => {
      const family = P("family"),
        cx = S.center.x + (xx * 2 * aspect) / z,
        cy = S.center.y + (yy * 2) / z;
      let x = family === "Julia" ? cx : 0,
        y = family === "Julia" ? cy : 0,
        n = 0;
      while (x * x + y * y < 64 && n < P("detail")) {
        if (family === "Burning Ship") {
          x = Math.abs(x);
          y = Math.abs(y);
        }
        const nx = x * x - y * y + (family === "Julia" ? P("Julia real") : cx);
        y = 2 * x * y + (family === "Julia" ? P("Julia imaginary") : cy);
        x = nx;
        n++;
      }
      return n === P("detail")
        ? [5, 10, 18]
        : [
            40 + 180 * (0.5 + 0.5 * Math.sin(n * 0.12)),
            40 + 160 * (0.5 + 0.5 * Math.sin(n * 0.12 + 2)),
            80 + 170 * (0.5 + 0.5 * Math.sin(n * 0.12 + 4)),
          ];
    });
    report(`${P("family")}\nZoom ${z}× · ${P("detail")} iterations`);
  }

  return {
    config: [
      "Zoom into Mandelbrot, Julia or Burning Ship sets. Drag to pan.",
      ["family", ["Mandelbrot", "Julia", "Burning Ship"], "Mandelbrot"],
      ["detail", 50, 300, 120, 10],
      ["zoom", 1, 50, 1, 1],
      ["Julia real", -1, 1, -0.8, 0.01],
      ["Julia imaginary", -1, 1, 0.156, 0.001],
    ],
    description:
      "Mandelbrot, Julia and Burning Ship images all test repeated complex iteration, but change either the starting value or the recurrence. Colors show how quickly points escape a bounded region.",
    formula: "Mandelbrot: z₀=0; Julia: c fixed; zₙ₊₁=zₙ²+c",
    tryThis:
      "Choose Julia and change its real and imaginary constants. Switch back to Mandelbrot or Burning Ship and drag to explore the boundary.",
    presets: [
      { name: "Mandelbrot", values: { family: "Mandelbrot" } },
      { name: "Julia", values: { family: "Julia", detail: 200 } },
      { name: "Burning Ship", values: { family: "Burning Ship" } },
    ],
    animated: false,
    raster: true,
    liveParameters: ["family", "detail", "zoom", "Julia real", "Julia imaginary"],
    interaction: "fractal",
    initialize() {
      const { S } = lab;
      S.center = { x: -0.4, y: -0.5 };
    },
    render() {
      fractal();
    },
    pointerMove(dx, dy) {
      const { S, height } = lab;
      S.center.x -= ((dx / height) * 4) / P("zoom");
      S.center.y += ((dy / height) * 4) / P("zoom");
    },
    wheel(event) {
      lab.setParameters(
        {
          zoom: Math.max(
            1,
            Math.min(50, P("zoom") * Math.exp(-event.deltaY * 0.002)),
          ),
        },
        false,
      );
    },
  };
});
