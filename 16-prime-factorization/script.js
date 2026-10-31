// Prime Factorization Galaxy: model, controls, presets and explanation belong to this project.
startExperiment(16, (lab) => {
  const { M, TAU, P, hue, line, dot, text, raster, report, blue, gold } = lab;

  return {
    config: [
      "A number branches into its prime factors.",
      ["number", 2, 500, 120, 1],
      ["orbit radius", 0.4, 1.1, 0.8, 0.05],
    ],
    description:
      "Every integer greater than one has a unique prime factorization, apart from the order of its factors. The center is the original number and its satellites are the prime factors, including repetitions.",
    formula: "n = p₁ · p₂ · … · pₖ",
    tryThis:
      "Compare a prime number with a power of two and a highly composite number. Change the orbit radius to spread out repeated factors.",
    presets: [
      { name: "Prime", values: { number: 97 } },
      { name: "Power of two", values: { number: 256 } },
      { name: "Composite", values: { number: 360 } },
    ],
    animated: false,
    raster: false,
    interaction: "none",
    render() {
      const n = P("number"),
        f = M.factors(n);
      dot(0, 0, gold, 12);
      text(String(n), -0.04, 0.1);
      f.forEach((p, i) => {
        const a = (i / f.length) * TAU,
          x = P("orbit radius") * Math.cos(a),
          y = P("orbit radius") * Math.sin(a);
        line(
          [
            [0, 0],
            [x, y],
          ],
          blue,
        );
        dot(x, y, hue(p * 31), 10);
        text(String(p), x + 0.05, y);
      });
      report(`${n} = ${f.join(" × ")}\n${M.prime(n) ? "Prime" : "Composite"}`);
    },
  };
});
