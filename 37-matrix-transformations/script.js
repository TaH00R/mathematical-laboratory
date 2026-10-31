// Matrix Transformations: model, controls, presets and explanation belong to this project.
startExperiment(37, (lab) => {
  const { P, line, raster, report, green } = lab;

  return {
    config: [
      "The grid and unit square transform under a rotation followed by shear and scale.",
      ["angle", -3.14, 3.14, 0.5, 0.01],
      ["shear", -2, 2, 0.5, 0.1],
      ["scale", 0.2, 2, 1, 0.1],
      ["grid spacing", 0.1, 0.5, 0.2, 0.05],
    ],
    description:
      "A matrix can rotate, shear and scale the plane. The transformed grid shows where basis directions move, while the determinant measures the factor by which areas change.",
    formula: "A = scale · shear · rotation;  det(A)=scale²",
    tryThis:
      "Start with a pure rotation, then add shear. Change grid spacing to inspect the transformed unit square more clearly.",
    presets: [
      { name: "Rotation", values: { angle: 0.8, shear: 0 } },
      { name: "Shear", values: { angle: 0, shear: 1.3 } },
      { name: "Combined", values: { angle: 0.5, shear: 0.8, scale: 0.7 } },
    ],
    animated: false,
    raster: false,
    interaction: "none",
    render() {
      const { scale } = lab;
      const a = P("angle"),
        s = P("scale"),
        h = P("shear"),
        T = (x, y) => ({
          x:
            s *
            (Math.cos(a) * x -
              Math.sin(a) * y +
              h * (Math.sin(a) * x + Math.cos(a) * y)),
          y: s * (Math.sin(a) * x + Math.cos(a) * y),
        });
      for (let x = -1.5; x <= 1.5; x += P("grid spacing")) {
        line([T(x, -1.5), T(x, 1.5)], "#345173");
        line([T(-1.5, x), T(1.5, x)], "#345173");
      }
      line(
        [T(0, 0), T(0.65, 0), T(0.65, 0.65), T(0, 0.65)],
        green,
        true,
        "#204d4b88",
      );
      report(`det(A) = ${(s * s).toFixed(3)}\nArea scales by ${s * s}`);
    },
  };
});
