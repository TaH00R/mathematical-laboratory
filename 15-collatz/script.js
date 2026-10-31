// Collatz 3D Landscape: model, controls, presets and explanation belong to this project.
startExperiment(15, (lab) => {
  const { P, hue, line, project, raster, report } = lab;

  return {
    config: [
      "Each raised path follows n → n/2 or 3n+1 until it reaches 1. Drag to rotate.",
      ["starts", 5, 80, 30, 1],
      ["height scale", 0.5, 2, 1, 0.1],
    ],
    description:
      "The Collatz process halves even integers and replaces odd integers with 3n+1. Each trajectory here is lifted into a landscape by its logarithmic value; the general conjecture remains unproved.",
    formula: "T(n) = n/2 if n is even; otherwise 3n+1",
    tryThis:
      "Increase the starting range to include 27, whose trajectory rises much higher than nearby starting values. Drag to rotate the paths.",
    presets: [
      { name: "Small starts", values: { starts: 15 } },
      { name: "Include 27", values: { starts: 40, "height scale": 0.8 } },
    ],
    animated: false,
    raster: false,
    interaction: "rotate",
    render() {
      const { height, scale } = lab;
      for (let k = 2; k <= P("starts"); k++) {
        let n = k,
          pts = [],
          i = 0;
        while (n > 1 && i < 250) {
          pts.push(
            project(
              (k / P("starts") - 0.5) * 2,
              (Math.log2(n) / 12) * P("height scale") - 0.5,
              i / 80 - 0.5,
            ),
          );
          n = n % 2 ? 3 * n + 1 : n / 2;
          i++;
        }
        line(pts, hue(k * 13));
      }
      report(`Starting integers 2–${P("starts")}\nHeight = log₂(n)`);
    },
  };
});
