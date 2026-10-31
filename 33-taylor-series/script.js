// Taylor Series: model, controls, presets and explanation belong to this project.
startExperiment(33, (lab) => {
  const { P, line, axes, plot, raster, report, point, green, pink } = lab;

  return {
    config: [
      "A Taylor polynomial approximates sin(x) around a movable expansion point.",
      ["degree", 1, 23, 7, 1],
      ["expansion point", -3, 3, 0, 0.1],
    ],
    description:
      "A Taylor polynomial builds a local approximation from a function’s derivatives at an expansion point. More terms usually improve the approximation near that point before extending its useful range.",
    formula: "sin(x) ≈ Σ sin(a+kπ/2)(x−a)ᵏ/k!",
    tryThis:
      "Move the expansion point away from zero and watch where the polynomial follows the sine curve. Add terms to widen that region.",
    presets: [
      { name: "Local line", values: { degree: 1 } },
      { name: "Higher order", values: { degree: 15 } },
      { name: "Shifted center", values: { degree: 9, "expansion point": 2 } },
    ],
    plot: true,
    animated: false,
    raster: false,
    interaction: "none",
    render() {
      axes();
      plot(Math.sin, green, -8, 8, 0.5);
      plot(
        (x) => {
          let sum = 0,
            power = 1,
            factorial = 1;
          const a = P("expansion point");
          for (let k = 0; k <= P("degree"); k++) {
            if (k) {
              power *= x - a;
              factorial *= k;
            }
            sum += (Math.sin(a + (k * Math.PI) / 2) * power) / factorial;
          }
          return sum;
        },
        pink,
        -8,
        8,
        0.5,
      );
      report(
        `sin(x), green\n${P("degree") + 1} Taylor coefficients, pink\nDegree ${P("degree")} · center ${P("expansion point")}`,
      );
    },
  };
});
