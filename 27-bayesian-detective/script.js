// Bayesian Detective: model, controls, presets and explanation belong to this project.
startExperiment(27, (lab) => {
  const { M, P, bars, raster, report } = lab;

  return {
    config: [
      "Adjust the prior and test accuracy to compute P(condition | positive).",
      ["prevalence", 0.001, 0.5, 0.01, 0.001],
      ["sensitivity", 0.5, 1, 0.95, 0.01],
      ["specificity", 0.5, 1, 0.95, 0.01],
      ["population", 1000, 100000, 10000, 1000],
    ],
    description:
      "Bayes’ theorem combines a prior probability with evidence. A positive test can still have many false positives when the condition is rare, even if the test is fairly accurate.",
    formula: "P(C|+) = P(+|C)P(C) / [P(+|C)P(C)+P(+|¬C)P(¬C)]",
    tryThis:
      "Compare a rare condition with a common one. Raise specificity and watch the number of false positives shrink in the expected population counts.",
    presets: [
      { name: "Rare condition", values: { prevalence: 0.01 } },
      { name: "Common condition", values: { prevalence: 0.25 } },
      { name: "Specific test", values: { specificity: 0.99 } },
    ],
    plot: true,
    animated: false,
    raster: false,
    interaction: "none",
    render() {
      const prior = P("prevalence"),
        posterior = M.bayes(prior, P("sensitivity"), P("specificity"));
      bars([prior, posterior], ["Prior", "After +"]);
      report(
        `P(condition) ${(prior * 100).toFixed(2)}%\nP(condition | +) ${(posterior * 100).toFixed(2)}%\nTrue + in ${P("population")}: ${(P("population") * prior * P("sensitivity")).toFixed(1)}\nFalse +: ${(P("population") * (1 - prior) * (1 - P("specificity"))).toFixed(1)}`,
      );
    },
  };
});
