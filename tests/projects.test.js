const { test } = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const vm = require("node:vm");
const catalogue = require("../experiments");
const M = require("../shared/math");

function load(entry) {
  let model,
    state = { n: 0, points: [], rotation: 0.5 },
    readout = "",
    params = {};
  const noop = () => {};
  const api = {
    M,
    TAU: M.tau,
    P: (key) => params[key],
    rnd: (a = -1, b = 1) => (a + b) / 2,
    hue: (n) => `hsl(${n} 70% 60%)`,
    blue: "#35e0d0",
    green: "#83f3ce",
    pink: "#ff6b9d",
    gold: "#f4d35e",
    line: noop,
    dot: noop,
    text: noop,
    axes: noop,
    plot: noop,
    project: (x, y, z) => ({ x, y: y - z * 0.2 }),
    point: (x, y) => [x, y],
    ctx: new Proxy({}, { get: () => noop }),
    canvas: {},
    $: noop,
    bars: noop,
    report: (value) => {
      readout = value;
    },
    raster: (fn) => {
      for (const x of [-0.8, 0.2, 0.8])
        for (const y of [-0.7, 0.1, 0.7])
          assert.ok(
            fn(x, y, 48, 48).every(Number.isFinite),
            "Invalid raster color",
          );
    },
    randomPoints: (n) =>
      Array.from({ length: n }, (_, i) => ({
        x: Math.cos(i * 2.4) * 0.7,
        y: Math.sin(i * 2.4) * 0.7,
      })),
    get S() {
      return state;
    },
    get time() {
      return state.n / 30;
    },
    width: 900,
    height: 600,
    scale: 250,
    invalidate: noop,
    reset: noop,
    setParameters: noop,
  };
  vm.runInNewContext(fs.readFileSync(entry.path + "script.js", "utf8"), {
    startExperiment: (id, factory) => {
      assert.equal(id, entry.id);
      model = factory(api);
    },
    console,
    Math,
    Float64Array,
    Uint8Array,
  });
  for (const [key, min, max, value] of model.config.slice(1))
    params[key] = Array.isArray(min) ? max : value;
  const reset = () => {
    state = { n: 0, points: [], rotation: 0.5 };
    model.initialize?.();
  };
  const steps = (n) => {
    for (let i = 0; i < n; i++) {
      state.n++;
      model.update?.();
    }
  };
  reset();
  return {
    model,
    params,
    reset,
    steps,
    render: () => {
      model.render();
      return readout;
    },
    get state() {
      return state;
    },
  };
}

test("every new experiment owns its model, presets, explanation and custom controls", () => {
  for (const entry of catalogue.filter((e) => ![1, 3, 4, 31].includes(e.id))) {
    const page = fs.readFileSync(entry.path + "index.html", "utf8");
    assert.ok(page.includes("../shared/lab.js"));
    assert.ok(!page.includes("engine.js"));
    const p = load(entry);
    assert.ok(p.model.description.length > 80, entry.title);
    assert.ok(p.model.tryThis.length > 40, entry.title);
    assert.ok(p.model.presets.length >= 2, entry.title);
    assert.ok(p.model.config.length >= 3, entry.title);
    p.steps(3);
    assert.ok(p.render().length > 0, entry.title);
    for (const preset of p.model.presets) {
      Object.assign(p.params, preset.values);
      p.reset();
      p.steps(2);
      assert.ok(
        !/NaN|undefined/.test(p.render()),
        entry.title + " " + preset.name,
      );
    }
  }
});

test("calendar customization changes the exact birthday probability", () => {
  assert.equal(M.birthday(31, 30), 1);
  assert.ok(M.birthday(23, 60) > M.birthday(23, 365));
});

test("integration upper bound changes signed area and Simpson remains exact for quadratics", () => {
  const p = load(catalogue[31]);
  p.params.method = "simpson";
  p.params["upper bound"] = -1.5;
  p.reset();
  assert.ok(p.render().includes("Area ≈ -1.125000"));
});

test("Newton target customization converges to the chosen square root", () => {
  const p = load(catalogue[33]);
  p.params.target = 7;
  p.reset();
  p.steps(200);
  assert.ok(Math.abs(p.state.history.at(-1) - Math.sqrt(7)) < 1e-8);
});

test("double pendulum separation and trail controls affect independent trajectories", () => {
  const p = load(catalogue[4]);
  p.params["initial separation"] = 0.05;
  p.params["trail length"] = 100;
  p.reset();
  assert.ok(Math.abs(p.state.angle[0] - p.state.other[0] + 0.05) < 1e-10);
  p.steps(120);
  assert.equal(p.state.trail.length, 100);
  assert.ok(p.state.angle.every(Number.isFinite));
});

test("gradient curvature controls stability at a fixed learning rate", () => {
  const p = load(catalogue[34]);
  p.params["learning rate"] = 0.3;
  p.params["y curvature"] = 1;
  p.reset();
  p.steps(100);
  const low = Math.abs(p.state.history.at(-1).y);
  p.params["y curvature"] = 6;
  p.reset();
  p.steps(100);
  assert.ok(Math.abs(p.state.history.at(-1).y) > low * 100);
});
