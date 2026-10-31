// Random Walk → Diffusion: model, controls, presets and explanation belong to this project.
startExperiment(26, (lab) => {
  const { TAU, P, dot, raster, report, blue } = lab;

  return {
    config: [
      "Independent two-dimensional random walks spread with √time.",
      ["walkers", 20, 500, 150, 10],
      ["step length", 0.005, 0.04, 0.014, 0.001],
    ],
    description:
      "Independent random steps create diffusion: individual paths are unpredictable, but the average squared distance grows linearly with the number of steps.",
    formula: "E[‖rₙ‖²] = nℓ² for unbiased fixed-length steps",
    tryThis:
      "Increase the step length and compare how quickly the cloud spreads. More walkers make the measured average steadier.",
    presets: [
      { name: "Slow spread", values: { "step length": 0.008 } },
      { name: "Fast spread", values: { "step length": 0.03, walkers: 300 } },
    ],
    animated: true,
    raster: false,
    interaction: "none",
    initialize() {
      const { S } = lab;
      S.walkers = Array.from({ length: P("walkers") }, () => ({ x: 0, y: 0 }));
    },
    update() {
      const { S } = lab;
      S.walkers.forEach((p) => {
        const a = Math.random() * TAU;
        p.x += P("step length") * Math.cos(a);
        p.y += P("step length") * Math.sin(a);
      });
    },
    render() {
      const { S } = lab;
      S.walkers.forEach((p) => dot(p.x, p.y, blue, 2));
      report(
        `Steps ${S.n}\nMean squared displacement ${(S.walkers.reduce((s, p) => s + p.x * p.x + p.y * p.y, 0) / S.walkers.length).toFixed(5)}\nExpected ${(S.n * P("step length") ** 2).toFixed(5)}`,
      );
    },
  };
});
