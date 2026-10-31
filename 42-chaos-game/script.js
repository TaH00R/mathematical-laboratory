// Chaos Game: model, controls, presets and explanation belong to this project.
startExperiment(42, (lab) => {
  const { TAU, P, dot, raster, report, blue } = lab;

  return {
    config: [
      "Move a fixed fraction toward a randomly chosen polygon vertex.",
      ["points per step", 10, 500, 200, 10],
      ["vertices", 3, 6, 3, 1],
      ["contraction", 0.3, 0.75, 0.5, 0.01],
    ],
    description:
      "The chaos game repeatedly chooses a random polygon vertex and moves a fixed fraction toward it. With three vertices and a half-distance step, the points form a Sierpiński triangle.",
    formula: "pₙ₊₁ = (1−r)pₙ + r·v_random",
    tryThis:
      "Compare a triangle at ratio 0.5 with a pentagon at ratio 0.62. Each contraction changes which regions of the shape remain reachable.",
    presets: [
      { name: "Sierpiński", values: { vertices: 3, contraction: 0.5 } },
      { name: "Pentagon", values: { vertices: 5, contraction: 0.62 } },
    ],
    animated: true,
    raster: false,
    interaction: "none",
    update() {
      const { S } = lab;
      const verts = Array.from({ length: P("vertices") }, (_, i) => ({
        x: Math.cos((i / P("vertices")) * TAU + Math.PI / 2),
        y: Math.sin((i / P("vertices")) * TAU + Math.PI / 2),
      }));
      let p = S.points.at(-1) || { x: 0, y: 0 };
      for (let i = 0; i < P("points per step"); i++) {
        const v = verts[Math.floor(Math.random() * P("vertices"))];
        p = {
          x: p.x * (1 - P("contraction")) + v.x * P("contraction"),
          y: p.y * (1 - P("contraction")) + v.y * P("contraction"),
        };
        S.points.push(p);
      }
      if (S.points.length > 18000) S.points.splice(0, S.points.length - 18000);
    },
    render() {
      const { S } = lab;
      S.points.forEach((p) => dot(p.x, p.y, blue, 1));
      report(
        `${S.points.length} plotted points\n${P("vertices")} vertices · ratio ${P("contraction")}`,
      );
    },
  };
});
