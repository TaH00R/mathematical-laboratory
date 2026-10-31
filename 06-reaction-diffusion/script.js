// Reaction-Diffusion: model, controls, presets and explanation belong to this project.
startExperiment(6, (lab) => {
  const { P, raster, report, canvas } = lab;

  return {
    config: [
      "Gray–Scott chemicals diffuse and react. Tap the field to add a seed.",
      ["feed", 0.01, 0.08, 0.037, 0.001],
      ["kill", 0.03, 0.075, 0.06, 0.001],
      ["diffusion", 0.08, 0.24, 0.2, 0.01],
      ["seed radius", 2, 10, 5, 1],
    ],
    description:
      "In the Gray–Scott model, two chemicals diffuse at different rates while reacting with each other. Feeding one chemical and removing the other produces spots, branching patterns and moving boundaries.",
    formula: "∂u/∂t = Dᵤ∇²u − uv² + f(1−u)",
    tryThis:
      "Try the spots preset, then tap the field to add a new seed. Change diffusion to compare how quickly neighboring regions mix.",
    presets: [
      { name: "Spots", values: { feed: 0.03, kill: 0.062 } },
      { name: "Worms", values: { feed: 0.055, kill: 0.062 } },
    ],
    animated: true,
    raster: true,
    liveParameters: ["feed", "kill", "diffusion"],
    interaction: "none",
    initialize() {
      const { S } = lab;
      {
        S.a = new Float64Array(96 * 96).fill(1);
        S.b = new Float64Array(96 * 96);
        for (let y = 48 - P("seed radius"); y < 48 + P("seed radius"); y++)
          for (let x = 48 - P("seed radius"); x < 48 + P("seed radius"); x++)
            S.b[y * 96 + x] = 1;
      }
    },
    update() {
      const { S } = lab;
      for (let k = 0; k < 5; k++) {
        const a = S.a,
          b = S.b,
          aa = new Float64Array(a.length),
          bb = new Float64Array(b.length);
        for (let y = 0; y < 96; y++)
          for (let x = 0; x < 96; x++) {
            const i = y * 96 + x,
              neighbors = [
                y * 96 + ((x + 95) % 96),
                y * 96 + ((x + 1) % 96),
                ((y + 95) % 96) * 96 + x,
                ((y + 1) % 96) * 96 + x,
              ];
            const la = neighbors.reduce((s, j) => s + a[j], 0) - 4 * a[i],
              lb = neighbors.reduce((s, j) => s + b[j], 0) - 4 * b[i],
              r = a[i] * b[i] * b[i];
            aa[i] = Math.max(
              0,
              Math.min(
                1,
                a[i] + P("diffusion") * la - r + P("feed") * (1 - a[i]),
              ),
            );
            bb[i] = Math.max(
              0,
              Math.min(
                1,
                b[i] +
                  P("diffusion") * 0.5 * lb +
                  r -
                  (P("kill") + P("feed")) * b[i],
              ),
            );
          }
        S.a = aa;
        S.b = bb;
      }
    },
    render() {
      const { S } = lab;
      raster(
        (x, y, ix, iy) => {
          const b = S.b[iy * 96 + ix];
          return [15 + b * 180, 30 + b * 180, 50 + b * 170];
        },
        96,
        96,
      );
      report(`Gray–Scott model\n${S.n * 5} reaction steps`);
    },
    pointerDown(p, event) {
      const { S, width, height } = lab,
        bounds = canvas.getBoundingClientRect(),
        x = Math.floor(((event.clientX - bounds.left) / width) * 96),
        y = Math.floor(((event.clientY - bounds.top) / height) * 96),
        r = P("seed radius");
      for (let dy = -r; dy <= r; dy++)
        for (let dx = -r; dx <= r; dx++)
          if (x + dx >= 0 && x + dx < 96 && y + dy >= 0 && y + dy < 96)
            S.b[(y + dy) * 96 + x + dx] = 1;
      lab.invalidate();
    },
  };
});
