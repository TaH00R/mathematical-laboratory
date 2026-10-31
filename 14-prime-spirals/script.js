// Prime Number Spirals: model, controls, presets and explanation belong to this project.
startExperiment(14, (lab) => {
  const { M, P, dot, raster, report, blue } = lab;

  return {
    config: [
      "Prime numbers light up along an Ulam square spiral.",
      ["numbers", 100, 5000, 1800, 100],
      ["composites", ["Hide", "Show"], "Hide"],
    ],
    description:
      "The Ulam spiral places successive integers on a square spiral. Highlighting the primes reveals diagonal runs associated with quadratic expressions along the grid.",
    formula: "Prime n has no integer divisor 2 ≤ d ≤ √n",
    tryThis:
      "Show the composite numbers as context, then increase the number range to inspect longer diagonal prime patterns.",
    presets: [
      { name: "First thousand", values: { numbers: 1000 } },
      { name: "Deep field", values: { numbers: 5000, composites: "Show" } },
    ],
    animated: false,
    raster: false,
    interaction: "none",
    render() {
      const { scale } = lab;
      let x = 0,
        y = 0,
        n = 1,
        dir = 0,
        len = 1;
      const limit = P("numbers"),
        unit = 1.8 / Math.sqrt(limit);
      while (n <= limit) {
        for (let turn = 0; turn < 2; turn++) {
          for (let j = 0; j < len && n <= limit; j++) {
            if (P("composites") === "Show" && !M.prime(n))
              dot(x * unit, y * unit, "#23413e", 1);
            if (M.prime(n))
              dot(x * unit, y * unit, blue, Math.max(1.2, unit * scale * 0.35));
            if (dir === 0) x++;
            if (dir === 1) y++;
            if (dir === 2) x--;
            if (dir === 3) y--;
            n++;
          }
          dir = (dir + 1) % 4;
        }
        len++;
      }
      report(
        `${limit} integers\n${Array.from({ length: limit }, (_, i) => M.prime(i + 1)).filter(Boolean).length} primes`,
      );
    },
  };
});
