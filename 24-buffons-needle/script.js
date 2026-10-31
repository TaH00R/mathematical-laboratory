// Buffon’s Needle → π: model, controls, presets and explanation belong to this project.
startExperiment(24, (lab) => {
  const { P, rnd, line, raster, report, blue, gold } = lab;

  return {
    config: [
      "Needles are shorter than the spacing. Crossings estimate π = 2L·N/(D·crossings).",
      ["length / spacing", 0.1, 1, 0.8, 0.05],
      ["needles per step", 5, 100, 20, 5],
    ],
    description:
      "Buffon’s needle estimates π by dropping short needles onto parallel lines. A crossing depends on both the needle’s position and its random orientation.",
    formula: "π ≈ 2LN/(D·crossings),  for L ≤ D",
    tryThis:
      "Compare short needles with needles as long as the line spacing. Increase the batch size to see the estimate stabilize faster.",
    presets: [
      { name: "Short needles", values: { "length / spacing": 0.3 } },
      {
        name: "Full spacing",
        values: { "length / spacing": 1, "needles per step": 50 },
      },
    ],
    animated: true,
    raster: false,
    interaction: "none",
    initialize() {
      const { S } = lab;
      S.hits = 0;
    },
    update() {
      const { S } = lab;
      for (let i = 0; i < P("needles per step"); i++) {
        const y = Math.random(),
          angle = Math.random() * Math.PI,
          L = P("length / spacing");
        const crossed =
          y - (L / 2) * Math.sin(angle) <= 0 ||
          y + (L / 2) * Math.sin(angle) >= 1;
        S.hits += crossed;
        S.points.push({
          x: rnd(-1, 1),
          y: -0.8 + Math.floor(Math.random() * 4) * 0.4 + y * 0.4,
          angle,
          crossed,
        });
        if (S.points.length > 500) S.points.shift();
      }
    },
    render() {
      const { S } = lab;
      for (let y = -0.8; y <= 0.8; y += 0.4)
        line(
          [
            [-1.3, y],
            [1.3, y],
          ],
          "#33445b",
        );
      S.points.forEach((p) => {
        const yy = p.y,
          dx = Math.cos(p.angle) * P("length / spacing") * 0.2,
          dy = Math.sin(p.angle) * P("length / spacing") * 0.2;
        line(
          [
            [p.x - dx, yy - dy],
            [p.x + dx, yy + dy],
          ],
          p.crossed ? gold : blue,
        );
      });
      report(
        `Needles ${S.n * P("needles per step")}\nCrossings ${S.hits}\nπ ≈ ${S.hits ? ((2 * P("length / spacing") * S.n * P("needles per step")) / S.hits).toFixed(5) : "—"}`,
      );
    },
  };
});
