// Eigenvectors: model, controls, presets and explanation belong to this project.
startExperiment(36, (lab) => {
  const { TAU, P, line, axes, raster, report, blue, gold } = lab;

  return {
    config: [
      "For A = [[a,b],[b,d]], gold lines show eigenvector directions.",
      ["a", -2, 3, 2, 0.1],
      ["b", -2, 2, 1, 0.1],
      ["d", -2, 3, 1, 0.1],
      ["probe vectors", 8, 48, 24, 4],
    ],
    description:
      "An eigenvector keeps its direction when multiplied by a matrix; its eigenvalue gives the signed scale along that direction. A real symmetric matrix has perpendicular eigenvector directions.",
    formula: "Av = λv,  A = [[a,b],[b,d]]",
    tryThis:
      "Set the off-diagonal entry to zero to align eigenvectors with the axes. Make one eigenvalue negative to observe a direction reversal.",
    presets: [
      { name: "Coupled", values: { a: 2, b: 1, d: 1 } },
      { name: "Axis aligned", values: { a: 2, b: 0, d: 1 } },
      { name: "Reflection", values: { a: 1, b: 0, d: -1 } },
    ],
    animated: false,
    raster: false,
    interaction: "none",
    render() {
      axes();
      const a = P("a"),
        b = P("b"),
        d = P("d"),
        theta = 0.5 * Math.atan2(2 * b, a - d),
        l1 = (a + d + Math.hypot(a - d, 2 * b)) / 2,
        l2 = (a + d - Math.hypot(a - d, 2 * b)) / 2;
      for (let i = 0; i < P("probe vectors"); i++) {
        const t = (i / P("probe vectors")) * TAU,
          x = Math.cos(t) * 0.45,
          y = Math.sin(t) * 0.45;
        line(
          [
            [0, 0],
            [x, y],
          ],
          "#29415d",
        );
        line(
          [
            [x, y],
            [(a * x + b * y) * 0.5, (b * x + d * y) * 0.5],
          ],
          blue,
        );
      }
      for (const angle of [theta, theta + Math.PI / 2])
        line(
          [
            [-Math.cos(angle), -Math.sin(angle)],
            [Math.cos(angle), Math.sin(angle)],
          ],
          gold,
        );
      report(
        `λ₁ = ${l1.toFixed(4)}\nλ₂ = ${l2.toFixed(4)}\nGold: invariant directions`,
      );
    },
  };
});
