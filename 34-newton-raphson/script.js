// Newton-Raphson: model, controls, presets and explanation belong to this project.
startExperiment(34, (lab) => {
  const { P, line, dot, axes, plot, raster, report, blue, pink, gold } = lab;

  return {
    config: [
      "Use successive tangents to approximate the square root of a chosen target.",
      ["initial x", 0.1, 5, 4, 0.1],
      ["target", 0.1, 9, 2, 0.1],
    ],
    description:
      "Newton–Raphson follows a tangent line to its x-axis intercept, then repeats. Here it finds the positive square root of a configurable target.",
    formula: "xₙ₊₁ = xₙ − (xₙ²−a)/(2xₙ)",
    tryThis:
      "Try an initial guess close to zero and compare its first jump with a guess near the root. Step through the tangent construction.",
    presets: [
      { name: "Square root of 2", values: { target: 2, "initial x": 4 } },
      { name: "Square root of 7", values: { target: 7, "initial x": 0.5 } },
    ],
    plot: true,
    animated: true,
    raster: false,
    interaction: "none",
    initialize() {
      const { S } = lab;
      S.history = [P("initial x")];
    },
    update() {
      const { S } = lab;
      if (S.n % 20 === 0 && S.history.length < 20) {
        const x = S.history.at(-1);
        if (Math.abs(x * x - P("target")) > 1e-12)
          S.history.push(x - (x * x - P("target")) / (2 * x));
      }
    },
    render() {
      const { S } = lab;
      const xMap = (x) => -1.2 + (2.4 * (x + 2)) / 7;
      const yMap = (y) => -0.8 + ((y + 9) * 1.6) / 34;
      axes(xMap(0), yMap(0));
      plot((x) => yMap(x * x - P("target")), blue, -2, 5, 1);
      S.history.forEach((x, i) => {
        dot(xMap(x), yMap(x * x - P("target")), gold);
        if (i < S.history.length - 1)
          line(
            [
              [xMap(x), yMap(x * x - P("target"))],
              [xMap(S.history[i + 1]), yMap(0)],
            ],
            pink,
          );
      });
      const x = S.history.at(-1);
      report(
        `x = ${x.toFixed(10)}\nResidual ${(x * x - P("target")).toExponential(3)}\nIterations ${S.history.length - 1}`,
      );
    },
  };
});
