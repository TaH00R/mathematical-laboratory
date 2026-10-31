// Penrose Tiling: model, controls, presets and explanation belong to this project.
startExperiment(43, (lab) => {
  const { P, line, raster, report } = lab;

  return {
    config: [
      "Golden-ratio substitution builds a fivefold Penrose triangle tiling.",
      ["depth", 0, 7, 5, 1],
      ["outlines", ["Show", "Hide"], "Show"],
    ],
    description:
      "Penrose tilings use a small set of tiles to form patterns that never repeat by translation. This finite patch subdivides golden-ratio Robinson triangles while preserving fivefold structure.",
    formula: "φ = (1+√5)/2; subdivision divides edges in the ratio φ.",
    tryThis:
      "Increase subdivision depth to reveal smaller tiles. Hide outlines to focus on the interlocking regions of the two triangle types.",
    presets: [
      { name: "Large tiles", values: { depth: 3 } },
      { name: "Fine tiling", values: { depth: 7 } },
      { name: "Color field", values: { depth: 6, outlines: "Hide" } },
    ],
    animated: false,
    raster: false,
    interaction: "none",
    render() {
      const phi = (1 + Math.sqrt(5)) / 2;
      let triangles = [];
      for (let i = 0; i < 10; i++) {
        let b = {
            x: Math.cos(((2 * i - 1) * Math.PI) / 10),
            y: Math.sin(((2 * i - 1) * Math.PI) / 10),
          },
          c = {
            x: Math.cos(((2 * i + 1) * Math.PI) / 10),
            y: Math.sin(((2 * i + 1) * Math.PI) / 10),
          };
        if (i % 2 === 0) [b, c] = [c, b];
        triangles.push([0, { x: 0, y: 0 }, b, c]);
      }
      const mix = (a, b) => ({
        x: a.x + (b.x - a.x) / phi,
        y: a.y + (b.y - a.y) / phi,
      });
      for (let k = 0; k < P("depth"); k++) {
        let next = [];
        for (const [type, a, b, c] of triangles) {
          if (type === 0) {
            const p = mix(a, b);
            next.push([0, c, p, b], [1, p, c, a]);
          } else {
            const q = mix(b, a),
              r = mix(b, c);
            next.push([1, r, c, a], [1, q, r, b], [0, r, q, a]);
          }
        }
        triangles = next;
      }
      triangles.forEach(([t, a, b, c]) =>
        line(
          [a, b, c],
          P("outlines") === "Show" ? "#071015" : t ? "#35b5a9" : "#d9b65d",
          true,
          t ? "#35b5a9" : "#d9b65d",
        ),
      );
      report(
        `${triangles.length} Robinson triangles\nGolden ratio φ = ${phi.toFixed(8)}`,
      );
    },
  };
});
