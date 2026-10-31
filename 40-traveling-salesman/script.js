// Traveling Salesman: model, controls, presets and explanation belong to this project.
startExperiment(40, (lab) => {
  const { P, line, dot, randomPoints, raster, report, green, gold } = lab;

  function nearest(points) {
    const remaining = points.map((_, i) => i),
      route = [remaining.shift()];
    while (remaining.length) {
      const p = points[route.at(-1)];
      let k = 0;
      for (let i = 1; i < remaining.length; i++)
        if (
          Math.hypot(
            points[remaining[i]].x - p.x,
            points[remaining[i]].y - p.y,
          ) <
          Math.hypot(points[remaining[k]].x - p.x, points[remaining[k]].y - p.y)
        )
          k = i;
      route.push(remaining.splice(k, 1)[0]);
    }
    return route;
  }
  function length(route) {
    const { S } = lab;
    return route.reduce((s, j, i) => {
      const a = S.points[j],
        b = S.points[route[(i + 1) % route.length]];
      return s + Math.hypot(a.x - b.x, a.y - b.y);
    }, 0);
  }

  return {
    config: [
      "A nearest-neighbor tour improves through 2-opt edge swaps. Drag cities to restart.",
      ["cities", 5, 35, 18, 1],
      ["swaps per step", 10, 300, 60, 10],
    ],
    description:
      "The traveling-salesman problem asks for the shortest closed route visiting every city. A nearest-neighbor route supplies a starting guess, and 2-opt repeatedly removes avoidable edge crossings.",
    formula: "Tour length = Σ ‖pᵢ₊₁−pᵢ‖; the last edge returns to the start.",
    tryThis:
      "Start with many cities and step through route improvements. Increase the search budget to try more edge swaps per update.",
    presets: [
      { name: "Small route", values: { cities: 8 } },
      { name: "Dense route", values: { cities: 30, "swaps per step": 200 } },
    ],
    animated: true,
    raster: false,
    liveParameters: ["swaps per step"],
    interaction: "points",
    initialize() {
      const { S } = lab;
      S.points = randomPoints(P("cities"));
      S.route = nearest(S.points);
    },
    update() {
      const { S } = lab;
      let best = length(S.route);
      for (let k = 0; k < P("swaps per step"); k++) {
        let i = Math.floor(Math.random() * S.route.length),
          j = Math.floor(Math.random() * S.route.length);
        if (i > j) [i, j] = [j, i];
        const next = S.route
          .slice(0, i)
          .concat(S.route.slice(i, j + 1).reverse(), S.route.slice(j + 1));
        const d = length(next);
        if (d < best - 1e-10) {
          S.route = next;
          best = d;
        }
      }
    },
    render() {
      const { S } = lab;
      line(
        S.route.map((i) => S.points[i]),
        green,
        true,
      );
      S.points.forEach((p) => dot(p.x, p.y, gold, 5));
      report(
        `${S.points.length} cities\nTour length ${length(S.route).toFixed(5)}\nNearest neighbor + 2-opt heuristic`,
      );
    },
    pointsChanged() {
      const { S } = lab;
      S.route = nearest(S.points);
    },
  };
});
