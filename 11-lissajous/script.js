// Lissajous Galaxy: model, controls, presets and explanation belong to this project.
startExperiment(11, (lab) => {
  const { TAU, P, line, dot, raster, report, point, blue, gold } = lab;

  return {
    config: [
      "Integer frequency ratios create closed Lissajous curves.",
      ["x frequency", 1, 12, 3, 1],
      ["y frequency", 1, 12, 4, 1],
      ["phase", 0, 6.28, 1.57, 0.01],
      ["y amplitude", 0.2, 1, 0.8, 0.05],
    ],
    description:
      "A Lissajous figure combines two perpendicular oscillations. Frequency ratios control the number of lobes, while phase and amplitude change the shape and symmetry.",
    formula: "x = sin(at + φ),  y = A sin(bt)",
    tryThis:
      "Start with equal frequencies, then choose a 3:4 ratio. Slide phase through a full turn while watching the moving point.",
    presets: [
      { name: "Ellipse", values: { "x frequency": 1, "y frequency": 1 } },
      { name: "Three by four", values: { "x frequency": 3, "y frequency": 4 } },
    ],
    animated: true,
    raster: false,
    liveParameters: ["x frequency", "y frequency", "phase", "y amplitude"],
    interaction: "none",
    render() {
      const { time } = lab;
      const path = [];
      for (let i = 0; i <= 1800; i++) {
        const t = (i / 1800) * TAU;
        path.push([
          Math.sin(P("x frequency") * t + P("phase")),
          Math.sin(P("y frequency") * t) * P("y amplitude"),
        ]);
      }
      line(path, blue);
      dot(
        Math.sin(P("x frequency") * time + P("phase")),
        Math.sin(P("y frequency") * time) * P("y amplitude"),
        gold,
        5,
      );
      report(`Frequency ratio ${P("x frequency")}:${P("y frequency")}`);
    },
  };
});
