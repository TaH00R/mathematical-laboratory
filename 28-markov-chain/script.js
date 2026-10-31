// Markov Chain Universe: model, controls, presets and explanation belong to this project.
startExperiment(28, (lab) => {
  const { P, line, dot, text, raster, report, blue, gold } = lab;

  return {
    config: [
      "A three-state Markov chain samples transitions; compare visit frequencies.",
      ["stay probability", 0.05, 0.95, 0.6, 0.05],
      ["clockwise probability", 0, 1, 0.5, 0.05],
    ],
    description:
      "A Markov chain chooses its next state using only its current state. This three-state chain can favor staying, moving clockwise or moving counterclockwise.",
    formula: "Pᵢᵢ=s; Pᵢ,ᵢ₊₁=(1−s)q; Pᵢ,ᵢ₊₂=(1−s)(1−q)",
    tryThis:
      "Increase the chance of staying, then favor clockwise motion. The transition paths change while the long-run uniform distribution remains stationary.",
    presets: [
      { name: "Sticky", values: { "stay probability": 0.9 } },
      {
        name: "Clockwise",
        values: { "stay probability": 0.2, "clockwise probability": 0.95 },
      },
    ],
    animated: true,
    raster: false,
    interaction: "none",
    initialize() {
      const { S } = lab;
      S.state = 0;
      S.visits = [0, 0, 0];
    },
    update() {
      const { S } = lab;
      if (Math.random() > P("stay probability"))
        S.state =
          (S.state + (Math.random() < P("clockwise probability") ? 1 : 2)) % 3;
      S.visits[S.state]++;
    },
    render() {
      const { S } = lab;
      const nodes = [
        [0, 0.65],
        [-0.7, -0.5],
        [0.7, -0.5],
      ];
      for (let i = 0; i < 3; i++) {
        line([nodes[i], nodes[(i + 1) % 3]], blue);
        dot(...nodes[i], S.state === i ? gold : blue, 22);
        text("ABC"[i], nodes[i][0] - 0.025, nodes[i][1] - 0.02, "#08111b");
      }
      report(
        `Transitions ${S.n}\nVisits ${S.visits.map((v, i) => "ABC"[i] + ": " + ((100 * v) / (S.n || 1)).toFixed(1) + "%").join("\n")}\nStationary distribution: ⅓ each`,
      );
    },
  };
});
