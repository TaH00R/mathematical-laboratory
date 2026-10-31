// Gambler’s Ruin: model, controls, presets and explanation belong to this project.
startExperiment(25, (lab) => {
  const { P, line, axes, raster, report, green } = lab;

  return {
    config: [
      "A random wealth walk stops at bankruptcy or its target.",
      ["initial capital", 1, 19, 10, 1],
      ["win probability", 0.1, 0.9, 0.5, 0.01],
    ],
    description:
      "A gambler wins or loses one unit per turn and stops at zero or a target wealth. Even a small bias changes the chance of reaching the target before ruin.",
    formula: "P(win)=i/N when p=½; otherwise (1−((1−p)/p)ⁱ)/(1−((1−p)/p)ᴺ)",
    tryThis:
      "Start with half the target wealth. Compare a fair game with a 45% chance of winning each turn.",
    presets: [
      { name: "Fair", values: { "win probability": 0.5 } },
      { name: "House edge", values: { "win probability": 0.45 } },
    ],
    plot: true,
    animated: true,
    raster: false,
    interaction: "none",
    initialize() {
      const { S } = lab;
      S.capital = P("initial capital");
      S.history = [];
      S.wins = 0;
      S.losses = 0;
    },
    update() {
      const { S } = lab;
      S.capital += Math.random() < P("win probability") ? 1 : -1;
      S.history.push(S.capital);
      if (S.history.length > 300) S.history.shift();
      if (S.capital === 0 || S.capital === 20) {
        S.wins += S.capital === 20;
        S.losses += S.capital === 0;
        S.capital = P("initial capital");
      }
    },
    render() {
      const { S } = lab;
      axes();
      line(
        S.history.map((v, i) => [(i / 300) * 2 - 1, (v - 10) / 12]),
        green,
      );
      report(
        `Capital ${S.capital}/20\nWon ${S.wins} · ruined ${S.losses}\nP(reach target) = ${(Math.abs(P("win probability") - 0.5) < 1e-9 ? P("initial capital") / 20 : (1 - ((1 - P("win probability")) / P("win probability")) ** P("initial capital")) / (1 - ((1 - P("win probability")) / P("win probability")) ** 20)).toFixed(4)}`,
      );
    },
  };
});
