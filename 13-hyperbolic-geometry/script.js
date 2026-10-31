// Hyperbolic Geometry: model, controls, presets and explanation belong to this project.
startExperiment(13, (lab) => {
  const { TAU, P, line, dot, randomPoints, raster, report, pink, gold } = lab;

  return {
    config: [
      "Drag points inside the Poincaré disk; geodesics meet its boundary at right angles.",
      ["points", 3, 12, 5, 1],
      ["comparison", ["Geodesics only", "Show chords"], "Geodesics only"],
    ],
    description:
      "The Poincaré disk maps an infinite hyperbolic plane into a finite circle. Its shortest paths are diameters or circular arcs that meet the outer boundary at right angles.",
    formula: "ds² = 4(dx² + dy²)/(1−x²−y²)²",
    tryThis:
      "Drag vertices toward the rim and compare the curved geodesics with straight Euclidean chords.",
    presets: [
      { name: "Triangle", values: { points: 3 } },
      { name: "Polygon", values: { points: 8, comparison: "Show chords" } },
    ],
    animated: false,
    raster: false,
    liveParameters: ["comparison"],
    interaction: "disk",
    initialize() {
      const { S } = lab;
      S.points = randomPoints(P("points"));
      S.points.forEach((p) => {
        p.x *= 0.7;
        p.y *= 0.7;
      });
    },
    render() {
      const { S } = lab;
      const circle = Array.from({ length: 181 }, (_, i) => [
        Math.cos((i / 180) * TAU),
        Math.sin((i / 180) * TAU),
      ]);
      line(circle);
      S.points.forEach((a, i) => {
        const b = S.points[(i + 1) % S.points.length];
        if (P("comparison") === "Show chords") line([a, b], "#47635c");
        const d = 2 * (a.x * b.y - a.y * b.x);
        if (Math.abs(d) < 1e-7) {
          line([a, b], pink);
          return;
        }
        const aa = 1 + a.x * a.x + a.y * a.y,
          bb = 1 + b.x * b.x + b.y * b.y,
          cx = (aa * b.y - bb * a.y) / d,
          cy = (a.x * bb - b.x * aa) / d,
          r = Math.sqrt(cx * cx + cy * cy - 1),
          ang = Math.atan2(a.y - cy, a.x - cx),
          end = Math.atan2(b.y - cy, b.x - cx);
        let delta = ((end - ang + Math.PI * 3) % TAU) - Math.PI;
        line(
          Array.from({ length: 81 }, (_, k) => [
            cx + r * Math.cos(ang + (delta * k) / 80),
            cy + r * Math.sin(ang + (delta * k) / 80),
          ]),
          pink,
        );
        dot(a.x, a.y, gold, 5);
      });
      report("Poincaré disk\nBoundary radius = 1");
    },
  };
});
