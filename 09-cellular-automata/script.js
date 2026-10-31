// Cellular Automata: model, controls, presets and explanation belong to this project.
startExperiment(9, (lab) => {
  const { P, raster, report, ctx, blue } = lab;

  return {
    config: [
      "An elementary cellular automaton evolves one row at a time.",
      ["rule", 0, 255, 30, 1],
      ["initial row", ["Single seed", "Random"], "Single seed"],
    ],
    description:
      "An elementary cellular automaton updates each cell from its left neighbor, itself and its right neighbor. Its rule number encodes eight possible local outcomes, yet simple rules can produce surprisingly complex patterns.",
    formula: "next = (rule ≫ (4·left + 2·center + right)) & 1",
    tryThis:
      "Compare Rule 30 with Rule 90. Use a random starting row to see how the same local rule handles many overlapping patterns.",
    presets: [
      { name: "Rule 30", values: { rule: 30 } },
      { name: "Rule 90", values: { rule: 90 } },
      { name: "Rule 110", values: { rule: 110 } },
    ],
    animated: true,
    raster: false,
    interaction: "none",
    initialize() {
      const { S } = lab;
      {
        S.row = new Uint8Array(151);
        S.row[75] = 1;
        S.rows = [S.row];
      }
      if (P("initial row") === "Random") {
        S.row = Uint8Array.from(S.row, () => (Math.random() < 0.5 ? 1 : 0));
        S.rows = [S.row];
      }
    },
    update() {
      const { S } = lab;
      if (S.rows.length < 160) {
        const row = S.row,
          next = new Uint8Array(row.length);
        for (let x = 0; x < row.length; x++) {
          const code =
            (row[(x + 150) % 151] << 2) | (row[x] << 1) | row[(x + 1) % 151];
          next[x] = (P("rule") >> code) & 1;
        }
        S.row = next;
        S.rows.push(next);
      }
    },
    render() {
      const { S, width, height } = lab;
      const cell = Math.min(width / 151, height / 160);
      S.rows.forEach((r, y) =>
        r.forEach((v, x) => {
          if (v) {
            ctx.fillStyle = blue;
            ctx.fillRect(
              (width - 151 * cell) / 2 + x * cell,
              y * cell,
              cell + 0.1,
              cell + 0.1,
            );
          }
        }),
      );
      report(`Rule ${P("rule")}\nGeneration ${S.rows.length - 1}`);
    },
  };
});
