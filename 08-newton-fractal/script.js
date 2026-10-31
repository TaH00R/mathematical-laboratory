// Newton Fractal: model, controls, presets and explanation belong to this project.
startExperiment(8, (lab) => {
  const { TAU, P, raster, report, point } = lab;

  return {
    config: [
      "Newton iteration colors each complex starting point by the root it reaches.",
      ["degree", 2, 6, 3, 1],
      ["iterations", 5, 50, 25, 1],
      ["relaxation", 0.3, 1.5, 1, 0.05],
    ],
    description:
      "Newton’s method can find complex roots as well as real ones. Each starting point is colored by the root it approaches; intricate boundaries separate different basins of attraction.",
    formula: "zₙ₊₁ = zₙ − α(zₙᵈ−1)/(d zₙᵈ⁻¹)",
    tryThis:
      "Compare three roots with five roots. Lower relaxation to see slower convergence, and raise the iteration budget to resolve the basin edges.",
    presets: [
      { name: "Cubic", values: { degree: 3 } },
      { name: "Five roots", values: { degree: 5, iterations: 40 } },
    ],
    animated: false,
    raster: true,
    interaction: "none",
    render() {
      const { width, height } = lab;
      const degree = P("degree");
      raster((xx, yy) => {
        let x = (xx * 2 * width) / height,
          y = yy * 2,
          n = 0;
        for (; n < P("iterations"); n++) {
          const r = Math.hypot(x, y),
            a = Math.atan2(y, x);
          if (r < 1e-8) break;
          const d = r ** (degree - 1),
            re = Math.cos((degree - 1) * a) / d,
            im = -Math.sin((degree - 1) * a) / d;
          const nx = ((degree - 1) * x + re) / degree,
            ny = ((degree - 1) * y + im) / degree;
          if (Math.hypot(nx - x, ny - y) < 1e-7) {
            x = nx;
            y = ny;
            break;
          }
          x += P("relaxation") * (nx - x);
          y += P("relaxation") * (ny - y);
        }
        const root =
          (Math.round((Math.atan2(y, x) * degree) / TAU) + degree) % degree;
        return [
          40 + ((root * 89) % 180) * (1 - n / 70),
          50 + ((root * 137) % 170) * (1 - n / 70),
          70 + ((root * 47) % 160) * (1 - n / 70),
        ];
      });
      report(`z^${degree} − 1 = 0\n${degree} roots`);
    },
  };
});
