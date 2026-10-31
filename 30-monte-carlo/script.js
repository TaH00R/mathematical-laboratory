// Monte Carlo Universe: model, controls, presets and explanation belong to this project.
startExperiment(30, (lab) => {
  const { TAU, P, rnd, line, dot, raster, report, blue, green, pink, gold } =
    lab;

  return {
    config: [
      "Uniform samples in a square estimate π from the fraction inside its circle.",
      ["samples per step", 10, 500, 100, 10],
      ["circle radius", 0.3, 1, 1, 0.05],
    ],
    description:
      "Monte Carlo estimation uses random samples to compare areas. The fraction of square samples inside a circle estimates its area, and therefore π.",
    formula: "π ≈ 4·inside/(N r²),  for a circle of radius r ≤ 1",
    tryThis:
      "Use a smaller circle and compare the noisier estimate. A larger batch size gathers evidence faster without changing the theoretical answer.",
    presets: [
      { name: "Unit circle", values: { "circle radius": 1 } },
      {
        name: "Small target",
        values: { "circle radius": 0.5, "samples per step": 300 },
      },
    ],
    animated: true,
    raster: false,
    interaction: "none",
    initialize() {
      const { S } = lab;
      S.hits = 0;
    },
    update() {
      const { S } = lab;
      for (let i = 0; i < P("samples per step"); i++) {
        const x = rnd(),
          y = rnd(),
          inside = x * x + y * y <= P("circle radius") ** 2;
        S.hits += inside;
        S.points.push({ x, y, inside });
        if (S.points.length > 4000) S.points.shift();
      }
    },
    render() {
      const { S } = lab;
      line(
        [
          [-1, -1],
          [1, -1],
          [1, 1],
          [-1, 1],
        ],
        blue,
        true,
      );
      line(
        Array.from({ length: 181 }, (_, i) => [
          P("circle radius") * Math.cos((i / 180) * TAU),
          P("circle radius") * Math.sin((i / 180) * TAU),
        ]),
        gold,
      );
      S.points.forEach((p) => dot(p.x, p.y, p.inside ? green : pink, 1.5));
      report(
        `Samples ${S.n * P("samples per step")}\nπ ≈ ${S.n ? ((4 * S.hits) / (S.n * P("samples per step") * P("circle radius") ** 2)).toFixed(6) : "—"}`,
      );
    },
  };
});
