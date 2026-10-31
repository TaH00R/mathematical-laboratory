// Convex Hull: model, controls, presets and explanation belong to this project.
startExperiment(38, (lab) => {
  const {
    M,
    TAU,
    P,
    line,
    dot,
    randomPoints,
    raster,
    report,
    point,
    green,
    gold,
  } = lab;

  return {
    config: [
      "Drag points to update their convex hull. Tap empty space to add a point.",
      ["points", 4, 40, 16, 1],
      ["distribution", ["Cloud", "Circle"], "Cloud"],
    ],
    description:
      "The convex hull is the smallest convex polygon containing every point. Interior points do not affect its boundary until moved outside the current hull.",
    formula: "Every point lies on or inside the hull’s supporting edges.",
    tryThis:
      "Compare a cloud with points placed on a circle. Drag an interior point past the boundary, or tap empty space to add a new point.",
    presets: [
      { name: "Point cloud", values: { points: 18 } },
      { name: "On a circle", values: { points: 12, distribution: "Circle" } },
    ],
    animated: false,
    raster: false,
    interaction: "points-add",
    initialize() {
      const { S } = lab;
      S.points = randomPoints(P("points"));
      if (P("distribution") === "Circle")
        S.points = S.points.map((_, i) => ({
          x: 0.85 * Math.cos((i / S.points.length) * TAU),
          y: 0.85 * Math.sin((i / S.points.length) * TAU),
        }));
    },
    render() {
      const { S } = lab;
      line(M.hull(S.points), green, true, "#23483a66");
      S.points.forEach((p) => dot(p.x, p.y, gold, 5));
      report(
        `${S.points.length} points\n${M.hull(S.points).length} hull vertices`,
      );
    },
  };
});
