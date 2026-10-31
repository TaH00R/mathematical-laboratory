// Delaunay Triangulation: model, controls, presets and explanation belong to this project.
startExperiment(39, (lab) => {
  const {
    M,
    TAU,
    P,
    line,
    dot,
    randomPoints,
    raster,
    report,
    point,
    blue,
    gold,
  } = lab;

  return {
    config: [
      "Drag points to retriangulate; each triangle has an empty circumcircle.",
      ["points", 4, 35, 16, 1],
      ["circumcircles", ["Hide", "Show"], "Hide"],
    ],
    description:
      "A Delaunay triangulation joins points so that no triangle’s circumcircle contains another point in its interior. It is closely related to the dual Voronoi diagram.",
    formula: "For every triangle, its open circumdisk contains no other site.",
    tryThis:
      "Show circumcircles and drag a point across an edge. The triangulation flips when a different diagonal satisfies the empty-circle rule.",
    presets: [
      { name: "Simple mesh", values: { points: 8 } },
      {
        name: "Inspect circles",
        values: { points: 12, circumcircles: "Show" },
      },
    ],
    animated: false,
    raster: false,
    liveParameters: ["circumcircles"],
    interaction: "points",
    initialize() {
      const { S } = lab;
      S.points = randomPoints(P("points"));
    },
    render() {
      const { S } = lab;
      const triangles = M.delaunay(S.points);
      if (P("circumcircles") === "Show")
        triangles.forEach((t) => {
          const c = M.circum(...t.map((i) => S.points[i]));
          if (c)
            line(
              Array.from({ length: 81 }, (_, i) => [
                c.x + Math.sqrt(c.r2) * Math.cos((i / 80) * TAU),
                c.y + Math.sqrt(c.r2) * Math.sin((i / 80) * TAU),
              ]),
              "#36544c",
            );
        });
      triangles.forEach((t) =>
        line(
          t.map((i) => S.points[i]),
          blue,
          true,
        ),
      );
      S.points.forEach((p) => dot(p.x, p.y, gold, 5));
      report(
        `${S.points.length} points\n${triangles.length} Delaunay triangles`,
      );
    },
  };
});
