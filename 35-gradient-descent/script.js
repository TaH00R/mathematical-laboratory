// Gradient Descent: model, controls, presets and explanation belong to this project.
startExperiment(35, (lab) => {
  const { TAU, P, line, dot, raster, report, green, gold } = lab;

  return {
    config: [
      "Follow the negative gradient of an adjustable quadratic bowl.",
      ["learning rate", 0.01, 0.4, 0.12, 0.01],
      ["y curvature", 1, 6, 3, 0.25],
    ],
    description:
      "Gradient descent repeatedly moves against the gradient to reduce an objective. The learning rate must be small enough for the curvature; otherwise the updates overshoot and can diverge.",
    formula: "f(x,y)=x²+cy²;  (x,y) ← (x,y)−η(2x,2cy)",
    tryThis:
      "Compare a smooth bowl with a steep valley. Raise the learning rate past 1/c to see why a rate that worked before may become unstable.",
    presets: [
      { name: "Steady descent", values: { "learning rate": 0.12 } },
      {
        name: "Steep valley",
        values: { "y curvature": 6, "learning rate": 0.1 },
      },
      { name: "Overshoot", values: { "learning rate": 0.36 } },
    ],
    animated: true,
    raster: false,
    interaction: "none",
    initialize() {
      const { S } = lab;
      S.history = [{ x: 0.95, y: 0.8 }];
    },
    update() {
      const { S } = lab;
      if (S.n % 5 === 0 && S.history.length < 300) {
        const p = S.history.at(-1);
        if (Math.hypot(p.x, p.y) < 1e-8 || Math.abs(p.y) > 20) return;
        S.history.push({
          x: p.x * (1 - 2 * P("learning rate")),
          y: p.y * (1 - 2 * P("y curvature") * P("learning rate")),
        });
      }
    },
    render() {
      const { S } = lab;
      for (let r = 0.1; r < 2; r += 0.15)
        line(
          Array.from({ length: 101 }, (_, i) => [
            r * Math.cos((i / 100) * TAU),
            (r / Math.sqrt(P("y curvature"))) * Math.sin((i / 100) * TAU),
          ]),
          "#273e58",
        );
      line(S.history, green);
      const p = S.history.at(-1);
      dot(p.x, p.y, gold, 5);
      report(
        `f = ${(p.x * p.x + P("y curvature") * p.y * p.y).toExponential(3)}\nUpdates ${S.history.length - 1}\n${Math.abs(p.y) > 20 ? "Diverged: reduce learning rate." : `Stable rate < ${(1 / P("y curvature")).toFixed(3)}`}`,
      );
    },
  };
});
