// Double-Slit Simulation: model, controls, presets and explanation belong to this project.
startExperiment(10, (lab) => {
  const { P, axes, plot, raster, report, point, ctx, blue } = lab;

  return {
    config: [
      "Change the slit spacing to compare interference with the single-slit envelope.",
      ["spacing", 1, 12, 5, 0.1],
      ["wavelength", 0.2, 2, 0.8, 0.05],
      ["slit width", 0.1, 1, 0.333, 0.001],
    ],
    description:
      "Light waves passing through two slits add together. Their interference fringes sit inside a broader single-slit diffraction envelope, so both slit spacing and slit width affect the screen pattern.",
    formula: "I ∝ sinc²(πay/λL) · cos²(πdy/λL)",
    tryThis:
      "Increase slit spacing to pack the bright fringes closer together. Increase slit width to narrow the surrounding envelope.",
    presets: [
      { name: "Wide fringes", values: { spacing: 2, wavelength: 1.2 } },
      { name: "Fine fringes", values: { spacing: 8, wavelength: 0.6 } },
    ],
    plot: true,
    animated: false,
    raster: false,
    interaction: "none",
    render() {
      const { width, scale } = lab;
      axes();
      const intensity = (x) => {
        const a = (Math.PI * x * P("slit width")) / P("wavelength"),
          envelope = Math.abs(a) < 1e-9 ? 1 : (Math.sin(a) / a) ** 2;
        return (
          envelope *
          Math.cos((Math.PI * P("spacing") * x) / P("wavelength")) ** 2
        );
      };
      plot((x) => intensity(x) * 0.8, blue, -5, 5, 1);
      for (let i = 0; i < 500; i++) {
        const x = (i / 500) * 2 - 1,
          b = intensity(x * 5);
        ctx.fillStyle = `rgba(110,185,255,${b})`;
        const [px, py] = point(x * 1.2, -0.3);
        const [nextX] = point((x + 2 / 500) * 1.2, -0.3);
        ctx.fillRect(px, py, nextX - px + 1, 0.35 * scale);
      }
      report("I ∝ sinc²(πay/λL) cos²(πdy/λL)\nSingle-slit width is adjustable");
    },
  };
});
