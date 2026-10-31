// Integral Builder: model, controls, presets and explanation belong to this project.
startExperiment(32, (lab) => {
  const { M, P, line, axes, raster, report, green } = lab;

  return {
    config: [
      "Build signed area under x² from zero to the chosen endpoint.",
      ["rectangles", 2, 100, 12, 1],
      ["method", ["left", "midpoint", "trapezoid", "simpson"], "midpoint"],
      ["upper bound", -2, 3, 2, 0.1],
    ],
    description:
      "Numerical integration replaces an area under a curve with simpler shapes. Left rectangles, midpoint rectangles, trapezoids and quadratic Simpson panels give different errors for the same interval count.",
    formula: "∫₀ᵇ x² dx = b³/3",
    tryThis:
      "Use a coarse left sum, then switch to midpoint and Simpson. Change the interval endpoint to compare the signed area on either side of zero.",
    presets: [
      { name: "Left sum", values: { method: "left", rectangles: 8 } },
      { name: "Midpoint", values: { method: "midpoint", rectangles: 12 } },
      { name: "Simpson", values: { method: "simpson", rectangles: 8 } },
    ],
    plot: true,
    animated: false,
    raster: false,
    interaction: "none",
    render() {
      const b = P("upper bound");
      const xMap = (x) =>
        b < 0 ? 1.2 + (2.4 * x) / Math.abs(b) : -1.2 + (2.4 * x) / (b || 1);
      const yMap = (y) => -0.8 + (y * 1.6) / Math.max(1, b * b);
      axes(xMap(0), yMap(0));
      const n = P("rectangles"),
        h = P("upper bound") / n,
        method = P("method");
      for (let i = 0; i < n; i++) {
        const x = i * h,
          v =
            method === "left"
              ? x * x
              : method === "midpoint"
                ? (x + h / 2) ** 2
                : x * x,
          w = method === "trapezoid" ? (x + h) ** 2 : v;
        if (method === "simpson") {
          const panel = [
            [xMap(x), yMap(0)],
            ...Array.from({ length: 9 }, (_, j) => {
              const q = x + (h * j) / 8;
              return [xMap(q), yMap(q * q)];
            }),
            [xMap(x + h), yMap(0)],
          ];
          line(panel, "#527ca5", true, "#213c57");
        } else
          line(
            [
              [xMap(x), yMap(0)],
              [xMap(x), yMap(v)],
              [xMap(x + h), yMap(w)],
              [xMap(x + h), yMap(0)],
            ],
            "#527ca5",
            true,
            "#213c57",
          );
      }
      line(
        Array.from({ length: 101 }, (_, i) => {
          const x = (P("upper bound") * i) / 100;
          return [xMap(x), yMap(x * x)];
        }),
        green,
      );
      const result = M.integrate((x) => x * x, 0, P("upper bound"), n, method);
      report(
        `Area ≈ ${result.toFixed(6)}\nExact b³/3 = ${(P("upper bound") ** 3 / 3).toFixed(6)}\nError ${Math.abs(result - P("upper bound") ** 3 / 3).toExponential(3)}${method === "simpson" ? "\nSimpson uses quadratic panels." : ""}`,
      );
    },
  };
});
