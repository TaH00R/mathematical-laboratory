// Fourier Transform: model, controls, presets and explanation belong to this project.
startExperiment(47, (lab) => {
  const { M, TAU, P, line, raster, report, blue, green } = lab;

  return {
    config: [
      "The discrete Fourier transform separates two sampled frequencies.",
      ["frequency 1", 1, 24, 4, 1],
      ["frequency 2", 1, 24, 11, 1],
      ["second amplitude", 0.1, 1, 0.5, 0.05],
    ],
    description:
      "The discrete Fourier transform decomposes a finite sampled signal into frequency bins. A sum of two sine waves appears as two pairs of peaks, with heights determined by their amplitudes.",
    formula: "Xₖ = Σₙ xₙ exp(−2πikn/N)",
    tryThis:
      "Move the two frequencies together, then change the second amplitude. When both frequencies coincide, their contributions add in the same bin.",
    presets: [
      { name: "Two tones", values: { "frequency 1": 4, "frequency 2": 11 } },
      { name: "Nearby tones", values: { "frequency 1": 8, "frequency 2": 9 } },
      { name: "Equal amplitudes", values: { "second amplitude": 1 } },
    ],
    plot: true,
    animated: false,
    raster: false,
    interaction: "none",
    render() {
      const samples = Array.from(
          { length: 128 },
          (_, i) =>
            Math.sin((TAU * P("frequency 1") * i) / 128) +
            P("second amplitude") *
              Math.sin((TAU * P("frequency 2") * i) / 128),
        ),
        spectrum = M.dft(samples).slice(0, 33);
      line(
        samples.map((v, i) => [(i / 127) * 2.4 - 1.2, 0.5 + v * 0.15]),
        green,
      );
      spectrum.forEach((v, i) =>
        line(
          [
            [(i / 32) * 2.4 - 1.2, -0.65],
            [(i / 32) * 2.4 - 1.2, -0.65 + v],
          ],
          blue,
        ),
      );
      report(
        `128 samples\nFrequencies ${P("frequency 1")}, ${P("frequency 2")} cycles/window\nTop: signal · bottom: |DFT| / N`,
      );
    },
  };
});
