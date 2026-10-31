// Geodesics: model, controls, presets and explanation belong to this project.
startExperiment(45, (lab) => {
  const { TAU, P, line, dot, raster, report, blue, green, pink, gold } = lab;

  return {
    config: [
      "Drag either endpoint to compare a great-circle route with a latitude–longitude path.",
      ["arc fraction", 0.1, 1, 1, 0.05],
      ["sphere radius", 1, 10, 1, 0.5],
    ],
    description:
      "A geodesic is a locally shortest path on a surface. On a sphere, it lies along a great circle; interpolating latitude and longitude generally traces a different route.",
    formula: "distance = R arccos(a·b),  for unit direction vectors a,b",
    tryThis:
      "Drag the endpoints far apart and compare the green great-circle route with the pink coordinate interpolation. Change sphere radius to convert the angular separation to distance.",
    presets: [
      { name: "Unit sphere", values: { "sphere radius": 1 } },
      {
        name: "Larger sphere",
        values: { "sphere radius": 5, "arc fraction": 1 },
      },
    ],
    animated: false,
    raster: false,
    liveParameters: ["arc fraction", "sphere radius"],
    interaction: "disk",
    initialize() {
      const { S } = lab;
      S.points = [
        { x: -0.7, y: 0.3 },
        { x: 0.6, y: -0.4 },
      ];
    },
    render() {
      const { S } = lab;
      const lift = (p) => [
          p.x,
          p.y,
          Math.sqrt(Math.max(0, 1 - p.x * p.x - p.y * p.y)),
        ],
        a = lift(S.points[0]),
        b = lift(S.points[1]),
        omega = Math.acos(
          Math.max(
            -1,
            Math.min(
              1,
              a.reduce((s, v, i) => s + v * b[i], 0),
            ),
          ),
        ),
        sin = Math.sin(omega),
        pts = [];
      line(
        Array.from({ length: 121 }, (_, i) => [
          Math.cos((i / 120) * TAU),
          Math.sin((i / 120) * TAU),
        ]),
        blue,
      );
      for (let i = 0; i <= 100; i++) {
        const t = (i / 100) * P("arc fraction"),
          v = a.map((x, j) =>
            sin < 1e-8
              ? x
              : (Math.sin((1 - t) * omega) * x + Math.sin(t * omega) * b[j]) /
                sin,
          );
        pts.push([v[0], v[1]]);
      }
      line(pts, green);
      const la = Math.asin(a[1]),
        lb = Math.asin(b[1]),
        loA = Math.atan2(a[0], a[2]),
        loB = Math.atan2(b[0], b[2]);
      const alt = Array.from({ length: 101 }, (_, i) => {
        const t = i / 100,
          lat = la + (lb - la) * t,
          lon = loA + (loB - loA) * t;
        return [Math.cos(lat) * Math.sin(lon), Math.sin(lat)];
      });
      line(alt, pink);
      S.points.forEach((p) => dot(p.x, p.y, gold, 6));
      report(
        `Great-circle angle ${((omega * 180) / Math.PI).toFixed(2)}°\nArc distance ${(omega * P("sphere radius")).toFixed(5)}\nGreen: shortest route`,
      );
    },
  };
});
