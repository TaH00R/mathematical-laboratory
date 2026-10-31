// Möbius Strip Explorer: model, controls, presets and explanation belong to this project.
startExperiment(12, (lab) => {
  const { TAU, P, line, project, raster, report, blue, gold } = lab;

  return {
    config: [
      "Drag to rotate a strip with one half twist and one continuous edge.",
      ["width", 0.1, 0.6, 0.35, 0.01],
      ["wire density", 4, 24, 10, 1],
    ],
    description:
      "A Möbius strip is formed by joining a ribbon after a half twist. It has one continuous surface and one boundary, unlike an ordinary cylindrical band.",
    formula: "r(u,v) = ((R+v cos(u/2))cos u, v sin(u/2), (R+v cos(u/2))sin u)",
    tryThis:
      "Drag the strip to inspect the half twist. Make the ribbon wider and increase its wire density to follow lines around the surface.",
    presets: [
      { name: "Narrow ribbon", values: { width: 0.15 } },
      { name: "Wide ribbon", values: { width: 0.5, "wire density": 18 } },
    ],
    animated: false,
    raster: false,
    interaction: "rotate",
    render() {
      const { width } = lab;
      for (let j = 0; j <= P("wire density"); j++) {
        const v = ((j / P("wire density")) * 2 - 1) * P("width"),
          path = [];
        for (let i = 0; i <= 180; i++) {
          const u = (i / 180) * TAU;
          path.push(
            project(
              (0.7 + v * Math.cos(u / 2)) * Math.cos(u),
              v * Math.sin(u / 2),
              (0.7 + v * Math.cos(u / 2)) * Math.sin(u),
            ),
          );
        }
        line(path, j === 0 || j === P("wire density") ? gold : blue);
      }
      report("One surface · one boundary\n(u,v) ≡ (u + 2π, −v)");
    },
  };
});
