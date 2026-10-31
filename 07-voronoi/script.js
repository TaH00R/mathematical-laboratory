// Voronoi Universe: model, controls, presets and explanation belong to this project.
startExperiment(7, (lab) => {
  const { P, dot, randomPoints, raster, report } = lab;

  return {
    config: [
      "Drag a seed to reshape its nearest-neighbor territory.",
      ["sites", 3, 40, 16, 1],
      ["distance", ["Euclidean", "Manhattan"], "Euclidean"],
    ],
    description:
      "A Voronoi diagram assigns each location to its closest seed. Moving a seed changes the boundaries between territories; choosing a different distance metric changes what “closest” means.",
    formula: "Vᵢ = {x : d(x,pᵢ) ≤ d(x,pⱼ) for all j}",
    tryThis:
      "Drag a seed toward its neighbor, then switch from Euclidean distance to Manhattan distance to produce angular territories.",
    presets: [
      { name: "Sparse", values: { sites: 6 } },
      { name: "City blocks", values: { sites: 22, distance: "Manhattan" } },
    ],
    animated: false,
    raster: true,
    liveParameters: ["distance"],
    interaction: "points",
    initialize() {
      const { S } = lab;
      S.points = randomPoints(P("sites"));
    },
    render() {
      const { S, width, height, scale } = lab;
      raster(
        (x, y) => {
          let k = 0,
            best = Infinity;
          S.points.forEach((p, i) => {
            const dx = (x * width) / (2 * scale) - p.x,
              dy = (y * height) / (2 * scale) - p.y,
              d =
                P("distance") === "Manhattan"
                  ? Math.abs(dx) + Math.abs(dy)
                  : dx * dx + dy * dy;
            if (d < best) {
              k = i;
              best = d;
            }
          });
          return [
            35 + ((k * 53) % 130),
            45 + ((k * 31) % 120),
            60 + ((k * 71) % 130),
          ];
        },
        180,
        130,
      );
      S.points.forEach((p) => dot(p.x, p.y, "#fff", 4));
      report(`${S.points.length} movable sites`);
    },
  };
});
