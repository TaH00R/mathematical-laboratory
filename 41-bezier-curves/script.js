// Bézier Curves: model, controls, presets and explanation belong to this project.
startExperiment(41, (lab) => {
  const { M, P, hue, line, dot, raster, report, green, pink, gold } = lab;

  return {
    config: [
      "Drag the four control points of a cubic Bézier curve.",
      ["t", 0, 1, 0.5, 0.01],
      ["construction", ["Show", "Hide"], "Show"],
    ],
    description:
      "A cubic Bézier curve blends four control points. De Casteljau’s construction repeatedly interpolates between neighboring points to locate the curve at a chosen parameter.",
    formula: "B(t) = (1−t)³P₀+3(1−t)²tP₁+3(1−t)t²P₂+t³P₃",
    tryThis:
      "Drag the middle control points and scrub t. Hide the construction lines to inspect the finished curve by itself.",
    presets: [
      { name: "Quarter way", values: { t: 0.25 } },
      { name: "Halfway", values: { t: 0.5 } },
      { name: "Curve only", values: { construction: "Hide" } },
    ],
    animated: false,
    raster: false,
    liveParameters: ["t", "construction"],
    interaction: "points",
    initialize() {
      const { S } = lab;
      S.points = [
        { x: -1, y: -0.6 },
        { x: -0.6, y: 0.8 },
        { x: 0.6, y: -0.8 },
        { x: 1, y: 0.6 },
      ];
    },
    render() {
      const { S } = lab;
      if (P("construction") === "Show") line(S.points, "#647b99");
      line(
        Array.from({ length: 151 }, (_, i) => M.bezier(S.points, i / 150)),
        green,
      );
      let a = S.points;
      for (let k = 0; k < 3 && P("construction") === "Show"; k++) {
        a = a
          .slice(0, -1)
          .map((p, i) => ({
            x: p.x * (1 - P("t")) + a[i + 1].x * P("t"),
            y: p.y * (1 - P("t")) + a[i + 1].y * P("t"),
          }));
        line(a, hue(k * 80 + 30));
        a.forEach((p) => dot(p.x, p.y, pink, 3));
      }
      S.points.forEach((p) => dot(p.x, p.y, gold, 7));
      report(`t = ${P("t").toFixed(2)}\nDe Casteljau interpolation`);
    },
  };
});
