// Mathematical Universe: model, controls, presets and explanation belong to this project.
startExperiment(50, (lab) => {
  const { M, P, dot, raster, report, point, blue, gold } = lab;

  return {
    config: [
      "A phyllotaxis field connects number, geometry and growth.",
      ["points", 50, 1500, 600, 10],
      ["angle", 130, 145, 137.507, 0.001],
      ["point size", 1, 5, 2.5, 0.25],
    ],
    description:
      "Phyllotaxis places points at steadily increasing radii and a fixed divergence angle. Angles near the golden angle spread points evenly; nearby rational fractions of a turn create visible spokes.",
    formula: "rₙ = √(n/N),  θₙ = nα; golden angle ≈ 137.507°",
    tryThis:
      "Compare the golden-angle preset with 135 degrees. Increase point size to make the change from even packing to spokes easier to inspect.",
    presets: [
      { name: "Golden angle", values: { angle: 137.507 } },
      { name: "Eight spokes", values: { angle: 135 } },
      { name: "Dense packing", values: { points: 1400, angle: 137.507 } },
    ],
    animated: true,
    raster: false,
    liveParameters: ["points", "angle", "point size"],
    interaction: "none",
    render() {
      const { time } = lab;
      const n = P("points"),
        angle = (P("angle") * Math.PI) / 180;
      for (let i = 0; i < n; i++) {
        const r = Math.sqrt(i / n),
          a = i * angle + time * 0.05;
        dot(
          r * Math.cos(a),
          r * Math.sin(a),
          M.prime(i + 1) ? gold : blue,
          P("point size"),
        );
      }
      report(`${n} points\nDivergence ${P("angle")}°\nGold: prime indices`);
    },
  };
});
