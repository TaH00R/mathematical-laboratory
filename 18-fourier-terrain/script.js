// Fourier Terrain: model, controls, presets and explanation belong to this project.
startExperiment(18, (lab) => {
  const { P, hue, line, project, raster, report } = lab;

  return {
    config: [
      "Add spatial sine waves to build terrain. Drag to rotate.",
      ["harmonics", 1, 12, 5, 1],
      ["roughness", 0.2, 1.8, 0.8, 0.05],
      ["height", 0.1, 0.5, 0.23, 0.01],
    ],
    description:
      "Fourier terrain adds spatial waves with different frequencies. Higher harmonics add fine detail; decreasing their amplitudes more rapidly makes the surface smoother.",
    formula: "h(x,z) = Σ sin(3kx+0.6k)cos(2kz)/k¹⁺ʳ",
    tryThis:
      "Compare a few smooth waves with a rough twelve-harmonic surface. Drag to rotate and use height to exaggerate the relief.",
    presets: [
      { name: "Rolling", values: { harmonics: 3, roughness: 1.5 } },
      { name: "Rugged", values: { harmonics: 12, roughness: 0.3 } },
    ],
    animated: false,
    raster: false,
    interaction: "rotate",
    render() {
      const { height } = lab;
      for (let z = -1; z <= 1; z += 0.08) {
        const pts = [];
        for (let x = -1; x <= 1; x += 0.025) {
          let y = 0;
          for (let k = 1; k <= P("harmonics"); k++)
            y +=
              (Math.sin(k * 3 * x + k * 0.6) * Math.cos(k * 2 * z)) /
              k ** (1 + P("roughness"));
          pts.push(project(x, y * P("height"), z));
        }
        line(pts, hue(190 + z * 30));
      }
      report(
        `${P("harmonics")} spatial harmonics\nAmplitude ∝ 1/k^${(1 + P("roughness")).toFixed(2)}`,
      );
    },
  };
});
