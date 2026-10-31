// Birthday Universe: model, controls, presets and explanation belong to this project.
startExperiment(22, (lab) => {
  const { M, P, bars, raster, report } = lab;

  return {
    config: [
      "Simulate rooms of people and compare shared birthdays with the exact probability.",
      ["people", 2, 80, 23, 1],
      ["calendar days", 30, 400, 365, 1],
    ],
    description:
      "The birthday problem asks whether any pair in a group shares a birthday. The number of possible pairs grows quickly, so a match becomes likely with a surprisingly small group.",
    formula: "P(match) = 1 − ∏ₖ₌₀ⁿ⁻¹ (D−k)/D",
    tryThis:
      "Compare 23 people with 50. Shorten the calendar to see how the number of possible birthday values affects collisions.",
    presets: [
      { name: "23 people", values: { people: 23 } },
      { name: "50 people", values: { people: 50 } },
      { name: "Short calendar", values: { people: 12, "calendar days": 60 } },
    ],
    plot: true,
    animated: true,
    raster: false,
    interaction: "none",
    initialize() {
      const { S } = lab;
      S.hits = 0;
    },
    update() {
      const { S } = lab;
      for (let k = 0; k < 10; k++) {
        const seen = new Set();
        let match = false;
        for (let i = 0; i < P("people"); i++) {
          const day = Math.floor(Math.random() * P("calendar days"));
          if (seen.has(day)) match = true;
          seen.add(day);
        }
        S.hits += match;
      }
    },
    render() {
      const { S } = lab;
      const p = M.birthday(P("people"), P("calendar days")),
        n = S.n * 10;
      bars([p, n ? S.hits / n : 0], ["Exact", "Observed"]);
      report(
        `${P("people")} people per room\nRooms ${n}\nExact ${(p * 100).toFixed(2)}%\nObserved ${((100 * S.hits) / (n || 1)).toFixed(2)}%`,
      );
    },
  };
});
