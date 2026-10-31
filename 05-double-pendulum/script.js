// Double Pendulum Chaos: model, controls, presets and explanation belong to this project.
startExperiment(5, (lab) => {
  const { M, P, line, dot, raster, report, blue, green, pink } = lab;

  return {
    config: [
      "Compare pendulums with slightly different starting angles.",
      ["angle", 0.2, 3, 2.2, 0.01],
      ["gravity", 1, 20, 9.8, 0.1],
      ["initial separation", 0.0001, 0.1, 0.001, 0.0001],
      ["trail length", 100, 1800, 600, 100],
    ],
    description:
      "Two connected pendulums exchange energy through gravity. A tiny difference in their initial angles can eventually separate their paths, even though both obey the same deterministic equations.",
    formula: "θ̈ = F(θ₁, θ₂, θ̇₁, θ̇₂, g)",
    tryThis:
      "Compare a small starting angle with an almost inverted pendulum. Increase the initial separation to see the two trails diverge sooner.",
    presets: [
      { name: "Gentle", values: { angle: 0.5 } },
      { name: "Chaotic", values: { angle: 2.8, "initial separation": 0.001 } },
    ],
    animated: true,
    raster: false,
    liveParameters: ["trail length"],
    interaction: "none",
    initialize() {
      const { S } = lab;
      S.angle = [P("angle"), 0, P("angle"), 0];
      S.other = [P("angle") + P("initial separation"), 0, P("angle"), 0];
      S.trail = [];
      S.trail2 = [];
    },
    update() {
      const { S } = lab;
      const g = P("gravity");
      const f = ([a, u, b, v]) => {
        const d = a - b,
          den = 3 - Math.cos(2 * d);
        return [
          u,
          (-3 * g * Math.sin(a) -
            g * Math.sin(a - 2 * b) -
            2 * Math.sin(d) * (v * v + u * u * Math.cos(d))) /
            den,
          v,
          (2 *
            Math.sin(d) *
            (2 * u * u + 2 * g * Math.cos(a) + v * v * Math.cos(d))) /
            den,
        ];
      };
      S.angle = M.rk4(S.angle, 0.015, f);
      S.other = M.rk4(S.other, 0.015, f);
      for (const [a, t] of [
        [S.angle, S.trail],
        [S.other, S.trail2],
      ]) {
        t.push([
          0.45 * (Math.sin(a[0]) + Math.sin(a[2])),
          -0.45 * (Math.cos(a[0]) + Math.cos(a[2])),
        ]);
        if (t.length > P("trail length")) t.splice(0, t.length - P("trail length"));
      }
    },
    render() {
      const { S } = lab;
      line(S.trail, blue);
      line(S.trail2, pink);
      for (const [a, color] of [
        [S.angle, green],
        [S.other, pink],
      ]) {
        const x = 0.45 * Math.sin(a[0]),
          y = -0.45 * Math.cos(a[0]),
          xx = x + 0.45 * Math.sin(a[2]),
          yy = y - 0.45 * Math.cos(a[2]);
        line(
          [
            [0, 0],
            [x, y],
            [xx, yy],
          ],
          color,
        );
        dot(x, y, color, 6);
        dot(xx, yy, color, 7);
      }
      report(
        `Elapsed ${(S.n * 0.015).toFixed(2)} s\nAngle separation ${Math.abs(S.angle[0] - S.other[0]).toFixed(5)} rad`,
      );
    },
  };
});
