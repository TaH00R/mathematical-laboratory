// N-Body Gravity: model, controls, presets and explanation belong to this project.
startExperiment(17, (lab) => {
  const { TAU, P, hue, dot, raster, report } = lab;

  return {
    config: [
      "Bodies attract each other with softened Newtonian gravity.",
      ["bodies", 3, 18, 8, 1],
      ["gravity", 0.05, 1, 0.3, 0.01],
      ["orbit speed", 0.05, 0.6, 0.28, 0.01],
      ["softening", 0.001, 0.05, 0.008, 0.001],
    ],
    description:
      "Every body attracts every other body through Newtonian gravity. A small softening term prevents nearly coincident bodies from producing infinite numerical accelerations.",
    formula: "aᵢ = G Σⱼ (rⱼ−rᵢ)/(‖rⱼ−rᵢ‖²+ε²)³ᐟ²",
    tryThis:
      "Try a faster starting orbit, then increase gravity. Watch whether the group expands, forms temporary pairs or collapses inward.",
    presets: [
      { name: "Orbiting", values: { gravity: 0.3, "orbit speed": 0.35 } },
      { name: "Collapse", values: { gravity: 0.7, "orbit speed": 0.08 } },
    ],
    animated: true,
    raster: false,
    liveParameters: ["gravity", "softening"],
    interaction: "none",
    initialize() {
      const { S } = lab;
      S.bodies = Array.from({ length: P("bodies") }, (_, i) => {
        const a = (i / P("bodies")) * TAU;
        return {
          x: Math.cos(a) * 0.7,
          y: Math.sin(a) * 0.7,
          vx: -Math.sin(a) * P("orbit speed"),
          vy: Math.cos(a) * P("orbit speed"),
        };
      });
    },
    update() {
      const { S } = lab;
      const b = S.bodies,
        dt = 0.008;
      for (let k = 0; k < 3; k++) {
        const acc = b.map(() => ({ x: 0, y: 0 }));
        for (let i = 0; i < b.length; i++)
          for (let j = i + 1; j < b.length; j++) {
            const dx = b[j].x - b[i].x,
              dy = b[j].y - b[i].y,
              force =
                P("gravity") /
                (b.length * (dx * dx + dy * dy + P("softening")) ** 1.5);
            acc[i].x += dx * force;
            acc[i].y += dy * force;
            acc[j].x -= dx * force;
            acc[j].y -= dy * force;
          }
        b.forEach((p, i) => {
          p.vx += acc[i].x * dt;
          p.vy += acc[i].y * dt;
          p.x += p.vx * dt;
          p.y += p.vy * dt;
        });
      }
    },
    render() {
      const { S } = lab;
      S.bodies.forEach((p, i) => dot(p.x, p.y, hue(i * 47), 6));
      report(
        `${S.bodies.length} bodies\nSoftening ε² = ${P("softening")}\nTime ${(S.n * 0.024).toFixed(2)}`,
      );
    },
  };
});
