// Numerical Methods Race: model, controls, presets and explanation belong to this project.
startExperiment(19, (lab) => {
  const { P, line, axes, plot, raster, report, blue, green, pink, gold } = lab;

  return {
    config: [
      "Euler, midpoint and RK4 solve y′ = y with the same step size.",
      ["steps", 2, 40, 8, 1],
      ["duration", 0.5, 3, 2, 0.1],
    ],
    description:
      "Euler, midpoint and fourth-order Runge–Kutta approximate the same differential equation. Comparing them against the exact exponential solution shows how numerical error depends on the step size.",
    formula: "y′ = y,  y(0)=1  ⇒  y(t)=eᵗ",
    tryThis:
      "Use just a few steps, then double the count. Extend the time horizon to make accumulated error more visible.",
    presets: [
      { name: "Coarse", values: { steps: 4 } },
      { name: "Fine", values: { steps: 32, duration: 3 } },
    ],
    plot: true,
    animated: false,
    raster: false,
    interaction: "none",
    render() {
      axes(-1.2, -0.8);
      const yMap = (y) => -0.8 + (1.6 * y) / Math.exp(P("duration"));
      const n = P("steps"),
        h = P("duration") / n;
      plot((x) => yMap(Math.exp(x)), gold, 0, P("duration"), 1);
      let reports = [];
      for (const [name, color] of [
        ["Euler", pink],
        ["Midpoint", blue],
        ["RK4", green],
      ]) {
        let y = 1,
          pts = [[-1.2, yMap(1)]];
        for (let i = 0; i < n; i++) {
          y *=
            name === "Euler"
              ? 1 + h
              : name === "Midpoint"
                ? 1 + h + (h * h) / 2
                : 1 + h + (h * h) / 2 + h ** 3 / 6 + h ** 4 / 24;
          pts.push([-1.2 + (2.4 * (i + 1)) / n, yMap(y)]);
        }
        line(pts, color);
        reports.push(
          `${name}: error ${Math.abs(y - Math.exp(P("duration"))).toExponential(2)}`,
        );
      }
      report(
        `y(0) = 1 · exact y(${P("duration")}) = e^${P("duration")}\n${reports.join("\n")}`,
      );
    },
  };
});
