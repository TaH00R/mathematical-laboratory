// Percolation: model, controls, presets and explanation belong to this project.
startExperiment(29, (lab) => {
  const { P, raster, report, green } = lab;

  return {
    config: [
      "Occupied sites connected to the top glow green; a crossing reaches the bottom.",
      ["occupation", 0.1, 0.9, 0.59, 0.01],
      ["neighbors", ["4 sides", "8 including diagonals"], "4 sides"],
    ],
    description:
      "Site percolation randomly occupies cells of a grid. The green cluster contains occupied sites connected to the top; percolation occurs when that cluster reaches the bottom.",
    formula: "A crossing is an occupied path from top to bottom.",
    tryThis:
      "Compare occupation probabilities below and above 0.59 with four-neighbor connectivity. Add diagonal connections and observe how crossing becomes easier.",
    presets: [
      { name: "Sparse", values: { occupation: 0.4 } },
      { name: "Near transition", values: { occupation: 0.59 } },
      { name: "Dense", values: { occupation: 0.75 } },
    ],
    animated: false,
    raster: true,
    interaction: "none",
    initialize() {
      const { S } = lab;
      {
        S.grid = Array.from(
          { length: 2500 },
          () => Math.random() < P("occupation"),
        );
        S.connected = new Set();
        const q = [];
        for (let x = 0; x < 50; x++)
          if (S.grid[x]) {
            q.push(x);
            S.connected.add(x);
          }
        for (let i = 0; i < q.length; i++) {
          const n = q[i],
            x = n % 50,
            y = Math.floor(n / 50);
          for (const [xx, yy] of P("neighbors") === "4 sides"
            ? [
                [x - 1, y],
                [x + 1, y],
                [x, y - 1],
                [x, y + 1],
              ]
            : [
                [x - 1, y],
                [x + 1, y],
                [x, y - 1],
                [x, y + 1],
                [x - 1, y - 1],
                [x + 1, y - 1],
                [x - 1, y + 1],
                [x + 1, y + 1],
              ]) {
            const k = yy * 50 + xx;
            if (
              xx >= 0 &&
              xx < 50 &&
              yy >= 0 &&
              yy < 50 &&
              S.grid[k] &&
              !S.connected.has(k)
            ) {
              S.connected.add(k);
              q.push(k);
            }
          }
        }
      }
    },
    render() {
      const { S } = lab;
      raster(
        (x, y, ix, iy) => {
          const k = iy * 50 + ix;
          return S.connected.has(k)
            ? [80, 220, 170]
            : S.grid[k]
              ? [70, 110, 180]
              : [12, 20, 32];
        },
        50,
        50,
      );
      report(
        `${S.connected.size} top-connected sites\nTop-to-bottom crossing: ${Array.from(S.connected).some((i) => i >= 2450) ? "yes" : "no"}`,
      );
    },
  };
});
