// Integration Race: model, controls, presets and explanation belong to this project.
startExperiment(46, (lab) => {
  const { M, P, bars, raster, report } = lab;

  return {
    config: [
      "Compare quadrature rules against exact integrals of different functions.",
      ["intervals", 2, 60, 8, 2],
      ["integrand", ["x^4", "sin(x)"], "x^4"],
    ],
    description:
      "Quadrature rules approximate the same definite integral using different local models. Comparing their absolute errors shows how sample count and function shape affect convergence.",
    formula:
      "Compare ∫₀² f(x) dx using left, midpoint, trapezoid and Simpson rules.",
    tryThis:
      "Compare the quartic with a sine wave. Increase intervals and observe how the higher-order Simpson estimate converges faster for these smooth functions.",
    presets: [
      { name: "Quartic", values: { integrand: "x^4", intervals: 8 } },
      { name: "Sine", values: { integrand: "sin(x)", intervals: 12 } },
    ],
    plot: true,
    animated: false,
    raster: false,
    interaction: "none",
    render() {
      const f = P("integrand") === "x^4" ? (x) => x ** 4 : Math.sin,
        exact = P("integrand") === "x^4" ? 6.4 : 1 - Math.cos(2),
        n = P("intervals"),
        methods = ["left", "midpoint", "trapezoid", "simpson"],
        values = methods.map((m) => M.integrate(f, 0, 2, n, m)),
        errors = values.map((v) => Math.abs(v - exact));
      bars(errors, ["Left", "Mid", "Trap", "Simp"]);
      report(
        `Exact integral = ${exact.toFixed(6)}\n${methods.map((m, i) => `${m}: ${values[i].toFixed(6)}\n error ${errors[i].toExponential(2)}`).join("\n")}`,
      );
    },
  };
});
