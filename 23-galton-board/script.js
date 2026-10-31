// Galton Board: model, controls, presets and explanation belong to this project.
startExperiment(23, (lab) => {
  const { P, line, dot, raster, report, blue, gold } = lab;

  return {
    config: [
      "Bias each left-or-right choice to reshape the binomial distribution.",
      ["rows", 4, 20, 12, 1],
      ["right probability", 0.1, 0.9, 0.5, 0.05],
    ],
    description:
      "A Galton board turns repeated left-or-right choices into a binomial distribution. With many rows and a balanced probability, the histogram approaches a bell-shaped curve.",
    formula: "X ∼ Binomial(n,p);  E[X]=np; Var[X]=np(1−p)",
    tryThis:
      "Bias the pegs toward the right and watch the center shift. Add rows to see how the distribution spreads.",
    presets: [
      { name: "Balanced", values: { rows: 12, "right probability": 0.5 } },
      { name: "Biased", values: { rows: 16, "right probability": 0.7 } },
    ],
    plot: true,
    animated: true,
    raster: false,
    interaction: "none",
    initialize() {
      const { S } = lab;
      S.bins = [];
    },
    update() {
      const { S } = lab;
      let bin = 0;
      for (let i = 0; i < P("rows"); i++)
        bin += Math.random() < P("right probability");
      S.bins[bin] = (S.bins[bin] || 0) + 1;
    },
    render() {
      const { S } = lab;
      const rows = P("rows");
      for (let y = 0; y < rows; y++)
        for (let x = 0; x <= y; x++)
          dot(((x - y / 2) * 1.8) / rows, 0.8 - (y * 0.8) / rows, blue, 2);
      const values = Array.from({ length: rows + 1 }, (_, i) => S.bins[i] || 0),
        max = Math.max(1, ...values);
      values.forEach((v, i) => {
        const x = ((i - rows / 2) * 1.8) / rows;
        line(
          [
            [x, -0.15],
            [x, -0.15 - (v / max) * 0.65],
          ],
          gold,
        );
      });
      report(
        `Balls ${S.n}\nExpected mean ${(rows * P("right probability")).toFixed(1)}\nExpected variance ${(rows * P("right probability") * (1 - P("right probability"))).toFixed(2)}`,
      );
    },
  };
});
