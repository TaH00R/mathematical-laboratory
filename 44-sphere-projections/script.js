// Sphere Projections: model, controls, presets and explanation belong to this project.
startExperiment(44, (lab) => {
  const { P, line, report, blue, pink } = lab;

  return {
    config: [
      "Drag to rotate the globe; compare orthographic and stereographic projections.",
      ["projection", ["Orthographic", "Stereographic"], "Orthographic"],
      ["grid degrees", 10, 30, 15, 5],
      ["tilt", -0.8, 0.8, 0.3, 0.05],
    ],
    description:
      "A sphere cannot be flattened without distortion. Orthographic projection resembles a distant view of a globe, while stereographic projection preserves local angles but stretches regions near the projection pole.",
    formula: "Orthographic: (x,y); stereographic: (x,y)/(1−z)",
    tryThis:
      "Switch projection and drag to rotate. Use a denser graticule to compare how the same latitude circles appear on the plane.",
    presets: [
      { name: "Globe", values: { projection: "Orthographic" } },
      {
        name: "Stereographic",
        values: { projection: "Stereographic", "grid degrees": 10 },
      },
    ],
    animated: false,
    raster: false,
    interaction: "rotate",
    render() {
      const { S } = lab;
      const curve = (samples, color) => {
        let path = [];
        for (const [lat, lon] of samples) {
          const a = (lat * Math.PI) / 180,
            b = (lon * Math.PI) / 180 + S.rotation,
            x = Math.cos(a) * Math.sin(b),
            yy = Math.sin(a),
            zz = Math.cos(a) * Math.cos(b),
            y = yy * Math.cos(P("tilt")) - zz * Math.sin(P("tilt")),
            z = yy * Math.sin(P("tilt")) + zz * Math.cos(P("tilt"));
          if (P("projection") === "Orthographic") {
            if (z >= 0) path.push([x, y]);
            else {
              line(path, color);
              path = [];
            }
          } else if (1 - z > 0.12)
            path.push([(x / (1 - z)) * 0.4, (y / (1 - z)) * 0.4]);
          else {
            line(path, color);
            path = [];
          }
        }
        line(path, color);
      };
      for (let lat = -75; lat <= 75; lat += P("grid degrees")) {
        curve(
          Array.from({ length: 121 }, (_, i) => [lat, i * 3]),
          blue,
        );
      }
      for (let lon = 0; lon < 360; lon += P("grid degrees") * 2) {
        curve(
          Array.from({ length: 61 }, (_, i) => [i * 3 - 90, lon]),
          pink,
        );
      }
      report(
        `${P("projection")} projection\nCyan: latitude · pink: longitude\nDrag to rotate`,
      );
    },
  };
});
