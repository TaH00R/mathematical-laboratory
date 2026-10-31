// Burning Ship Fractal: model, controls, presets and explanation belong to this project.
startExperiment(2, (lab) => {
  const { P, raster, report } = lab;

  function fractal() {
    const { S, width, height } = lab;
    const z = P("zoom"),
      aspect = width / height;
    raster((xx, yy) => {
      const family = "Burning Ship",
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
        const nx = x * x - y * y + (family === "Julia" ? -0.8 : cx);
        y = 2 * x * y + (family === "Julia" ? 0.156 : cy);
        x = nx;
        n++;
      }
      return n === P("detail")
        ? [5, 10, 18]
        : [
            40 + 180 * (0.5 + 0.5 * Math.sin(n * 0.12 + P("palette shift"))),
            40 +
              160 * (0.5 + 0.5 * Math.sin(n * 0.12 + P("palette shift") + 2)),
            80 +
              170 * (0.5 + 0.5 * Math.sin(n * 0.12 + P("palette shift") + 4)),
          ];
    });
    report(`${"Burning Ship"}\nZoom ${z}× · ${P("detail")} iterations`);
  }

  return {
    config: [
      "Ctrl+scroll to zoom; drag to pan across the Burning Ship fractal.",
      ["detail", 50, 300, 120, 10],
      ["zoom", 1, 50, 1, 1],
      ["palette shift", 0, 6.28, 0, 0.01],
    ],
    description:
      "The Burning Ship repeats a complex quadratic map after taking the absolute values of both coordinates. Points that escape receive a color based on how long they remain bounded.",
    formula: "zₙ₊₁ = (|Re zₙ| + i|Im zₙ|)² + c",
    tryThis:
      "Increase detail near the edge, then shift the palette to reveal bands with similar escape times.",
    presets: [
      { name: "Overview", values: {} },
      { name: "Fine detail", values: { detail: 300, zoom: 4 } },
    ],
    animated: false,
    raster: true,
    liveParameters: ["detail", "zoom", "palette shift"],
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
