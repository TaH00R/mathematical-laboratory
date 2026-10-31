// Prime Gaps: model, controls, presets and explanation belong to this project.
startExperiment(48, (lab) => {
  const { M, P, line, plot, bars, raster, report, blue } = lab;

  return {
    config: [
      "Plot the distance between consecutive primes.",
      ["limit", 100, 10000, 2000, 100],
      ["plot", ["Line", "Bars"], "Line"],
    ],
    description:
      "A prime gap is the distance between consecutive primes. The gaps vary irregularly, with occasional much larger spaces between neighboring primes.",
    formula: "gₙ = pₙ₊₁ − pₙ",
    tryThis:
      "Increase the number range and switch from a connected line to individual gap bars to compare local variation with record gaps.",
    presets: [
      { name: "Small primes", values: { limit: 500 } },
      { name: "Long range", values: { limit: 10000 } },
      { name: "Gap bars", values: { limit: 2000, plot: "Bars" } },
    ],
    plot: true,
    animated: false,
    raster: false,
    interaction: "none",
    render() {
      let lastPrime = 2,
        points = [],
        max = 0,
        count = 1;
      for (let n = 3; n <= P("limit"); n += 2)
        if (M.prime(n)) {
          const gap = n - lastPrime;
          points.push([(n / P("limit")) * 2.4 - 1.2, -0.7 + gap / 35]);
          max = Math.max(max, gap);
          lastPrime = n;
          count++;
        }
      if (P("plot") === "Line") line(points, blue);
      else points.forEach((p) => line([[p[0], -0.7], p], blue));
      report(`${count} primes ≤ ${P("limit")}\nLargest observed gap ${max}`);
    },
  };
});
