// Monty Hall: model, controls, presets and explanation belong to this project.
startExperiment(21, (lab) => {
  const { P, bars, raster, report } = lab;

  return {
    config: [
      "Run games: the host opens a goat door; switching wins when the first pick was wrong.",
      ["games per step", 1, 500, 100, 1],
      ["doors", 3, 10, 3, 1],
    ],
    description:
      "You first choose one door. A host who knows the prize location opens all but one of the other doors, revealing goats; switching wins whenever your original choice was wrong.",
    formula: "P(stay)=1/N;  P(switch)=(N−1)/N",
    tryThis:
      "Compare three doors with ten doors. The informed host removes the same kind of uncertainty, making the benefit of switching easier to see.",
    presets: [
      { name: "Classic", values: { doors: 3 } },
      { name: "Ten doors", values: { doors: 10, "games per step": 300 } },
    ],
    plot: true,
    animated: true,
    raster: false,
    interaction: "none",
    initialize() {
      const { S } = lab;
      S.hits = 0;
      S.estimate = 0;
    },
    update() {
      const { S } = lab;
      for (let i = 0; i < P("games per step"); i++) {
        const prize = Math.floor(Math.random() * P("doors")),
          pick = Math.floor(Math.random() * P("doors"));
        S.hits += prize !== pick;
        S.estimate += prize === pick;
      }
    },
    render() {
      const { S } = lab;
      const n = S.n * P("games per step");
      bars([S.estimate, S.hits], ["Stay", "Switch"]);
      report(
        `Games ${n}\nStay ${((100 * S.estimate) / (n || 1)).toFixed(1)}%\nSwitch ${((100 * S.hits) / (n || 1)).toFixed(1)}%\nExpected switch ${((100 * (P("doors") - 1)) / P("doors")).toFixed(1)}%`,
      );
    },
  };
});
