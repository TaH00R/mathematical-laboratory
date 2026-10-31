/* Canvas and control primitives only. Each project supplies its own model. */
function startExperiment(id, createModel) {
  "use strict";
  const entry = catalogue.find((item) => item.id === id);
  const $ = (name) => document.getElementById(name);
  const canvas = $("canvas");
  const ctx = canvas.getContext("2d");
  const M = LabMath;
  const TAU = M.tau;
  const colors = {
    blue: "#35e0d0",
    green: "#83f3ce",
    pink: "#ff6b9d",
    gold: "#f4d35e",
  };
  let width = 800,
    height = 550,
    scale = 240,
    scaleX = 240,
    time = 0,
    S = {},
    dirty = true;
  let running = !matchMedia("(prefers-reduced-motion: reduce)").matches;
  let lastFrame = 0,
    accumulator = 0,
    model;
  const params = {},
    defaults = {},
    inputs = new Map();
  const view = { speed: 1, zoom: 1, weight: 1.5, grid: true };
  const P = (key) => params[key];
  const rnd = (a = -1, b = 1) => a + Math.random() * (b - a);
  const hue = (value) => `hsl(${value % 360} 70% 64%)`;
  const point = (x, y) => [width / 2 + x * scaleX, height / 2 - y * scale];

  function line(points, color = colors.blue, close = false, fill = null) {
    if (!points.length) return;
    ctx.beginPath();
    points.forEach((p, i) => {
      const position = point(p.x ?? p[0], p.y ?? p[1]);
      if (i) ctx.lineTo(...position);
      else ctx.moveTo(...position);
    });
    if (close) ctx.closePath();
    if (fill) {
      ctx.fillStyle = fill;
      ctx.fill();
    }
    ctx.strokeStyle = color;
    ctx.lineWidth = view.weight;
    ctx.stroke();
  }

  function dot(x, y, color = colors.green, radius = 3) {
    ctx.beginPath();
    ctx.arc(...point(x, y), radius, 0, TAU);
    ctx.fillStyle = color;
    ctx.fill();
  }

  function text(value, x, y, color = "#9bbdb7") {
    ctx.fillStyle = color;
    ctx.font = '11px "Courier New", monospace';
    ctx.fillText(value, ...point(x, y));
  }

  function axes(xOrigin = 0, yOrigin = 0) {
    line(
      [
        [-3, yOrigin],
        [3, yOrigin],
      ],
      "#244649",
    );
    line(
      [
        [xOrigin, -3],
        [xOrigin, 3],
      ],
      "#244649",
    );
  }

  function plot(fn, color = colors.blue, from = -5, to = 5, yScale = 0.2) {
    let path = [];
    for (let i = 0; i <= 600; i++) {
      const x = from + ((to - from) * i) / 600,
        y = fn(x) * yScale;
      if (!Number.isFinite(y) || Math.abs(y) > 8) {
        line(path, color);
        path = [];
      } else path.push([-1.2 + (2.4 * i) / 600, y]);
    }
    line(path, color);
  }

  function project(x, y, z) {
    const angle = S.rotation ?? 0.5,
      tilt = 0.6;
    const xx = x * Math.cos(angle) - z * Math.sin(angle);
    const zz = x * Math.sin(angle) + z * Math.cos(angle);
    return { x: xx, y: y * Math.cos(tilt) - zz * Math.sin(tilt) };
  }

  function randomPoints(count) {
    return Array.from({ length: count }, () => ({
      x: rnd(-1, 1),
      y: rnd(-0.8, 0.8),
    }));
  }

  function bars(values, labels = []) {
    const max = Math.max(1, ...values);
    values.forEach((value, i) => {
      const x = -1.15 + (i * 2.3) / values.length,
        w = 2.1 / values.length;
      const top = -0.75 + (1.4 * value) / max;
      line(
        [
          [x, -0.75],
          [x, top],
          [x + w, top],
          [x + w, -0.75],
        ],
        colors.blue,
        true,
        "#123e3f",
      );
      if (labels[i]) text(labels[i], x, -0.87);
    });
  }

  const offscreen = document.createElement("canvas");
  function raster(fn, cols = 240, rows = 160) {
    const image = ctx.createImageData(cols, rows);
    for (let y = 0; y < rows; y++)
      for (let x = 0; x < cols; x++) {
        const rgb = fn((x / cols) * 2 - 1, 1 - (y / rows) * 2, x, y);
        image.data.set([...rgb, 255], (y * cols + x) * 4);
      }
    offscreen.width = cols;
    offscreen.height = rows;
    offscreen.getContext("2d").putImageData(image, 0, 0);
    ctx.imageSmoothingEnabled = false;
    ctx.drawImage(offscreen, 0, 0, width, height);
  }

  function report(value) {
    if ($("readout").textContent !== value) $("readout").textContent = value;
    $("sampleCount").textContent = String(S.n);
  }

  function reset() {
    time = 0;
    accumulator = 0;
    S = { n: 0, points: [], rotation: S.rotation ?? 0.5 };
    model.initialize?.();
    dirty = true;
  }

  function draw() {
    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = "#071015";
    ctx.fillRect(0, 0, width, height);
    if (view.grid && !model.raster) {
      ctx.strokeStyle = "#35e0d00b";
      ctx.lineWidth = 1;
      for (let x = (width / 2) % 40; x < width; x += 40) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = (height / 2) % 40; y < height; y += 40) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }
    }
    ctx.save();
    model.render();
    ctx.restore();
    dirty = false;
  }

  function step() {
    S.n++;
    time += 1 / 30;
    model.update?.();
    dirty = true;
  }

  function setRunning(value) {
    running = value;
    $("play").textContent = running ? "Pause" : "Resume";
    $("play").setAttribute("aria-pressed", String(running));
    $("stateLabel").textContent = model.animated
      ? running
        ? "RUNNING"
        : "PAUSED"
      : "INTERACTIVE";
  }

  function syncInputs() {
    for (const [key, { input, output }] of inputs) {
      input.value = params[key];
      output.textContent = input.value;
    }
  }

  function setParameters(values, restart = true) {
    for (const [key, value] of Object.entries(values)) {
      if (!inputs.has(key)) continue;
      const { input } = inputs.get(key);
      input.value = value;
      params[key] =
        input.tagName === "SELECT" ? input.value : Number(input.value);
    }
    syncInputs();
    model.onParametersChange?.();
    if (restart) reset();
    else dirty = true;
  }

  const api = {
    M,
    TAU,
    $,
    canvas,
    ctx,
    P,
    rnd,
    hue,
    point,
    line,
    dot,
    text,
    axes,
    plot,
    project,
    randomPoints,
    bars,
    raster,
    report,
    ...colors,
    reset,
    draw,
    setParameters,
    invalidate() {
      dirty = true;
    },
    get S() {
      return S;
    },
    get time() {
      return time;
    },
    get width() {
      return width;
    },
    get height() {
      return height;
    },
    get scale() {
      return scale;
    },
  };
  model = createModel(api);
  canvas.parentElement.classList.toggle("plot-layout", !!model.plot);
  document.title = `${entry.title} : Math Lab`;
  $("title").textContent = entry.title;
  $("category").textContent =
    `${String(id).padStart(2, "0")} / ${entry.category.replace("-", " ")}`;
  $("formula").textContent = model.formula;
  $("hint").textContent = model.config[0];
  $("aboutText").textContent = model.description;
  $("tryText").textContent = model.tryThis;
  $("aboutFormula").textContent = model.formula;
  $("canvas").setAttribute(
    "aria-label",
    `${entry.title} visualization. ${model.config[0]}`,
  );
  $("previous").href = "../" + catalogue[(id + 48) % 50].path;
  $("next").href = "../" + catalogue[id % 50].path;

  for (const [key, min, max, value, stepSize] of model.config.slice(1)) {
    const field = document.createElement("label");
    field.className = "field";
    const label = document.createElement("span");
    label.textContent = key;
    const output = document.createElement("b");
    const input = document.createElement(
      Array.isArray(min) ? "select" : "input",
    );
    input.setAttribute("aria-label", key);
    if (Array.isArray(min)) {
      for (const text of min) {
        const option = document.createElement("option");
        option.textContent = text;
        input.append(option);
      }
      input.value = max;
    } else {
      input.type = "range";
      Object.assign(input, { min, max, step: stepSize, value });
    }
    defaults[key] = params[key] =
      input.tagName === "SELECT" ? input.value : Number(input.value);
    output.textContent = input.value;
    input.oninput = () => {
      params[key] =
        input.tagName === "SELECT" ? input.value : Number(input.value);
      output.textContent = input.value;
      $("presetStatus").textContent = "CUSTOM";
      document
        .querySelectorAll("[data-preset]")
        .forEach((button) => button.setAttribute("aria-pressed", "false"));
      model.onParametersChange?.(key);
      if (model.liveParameters?.includes(key)) dirty = true;
      else reset();
    };
    inputs.set(key, { input, output });
    field.append(label, output, input);
    $("controls").append(field);
  }

  for (const preset of model.presets) {
    const button = document.createElement("button");
    button.textContent = preset.name;
    button.dataset.preset = preset.name;
    button.setAttribute("aria-pressed", "false");
    button.onclick = () => {
      setParameters({ ...defaults, ...preset.values });
      $("presetStatus").textContent = preset.name.toUpperCase();
      document
        .querySelectorAll("[data-preset]")
        .forEach((item) =>
          item.setAttribute("aria-pressed", String(item === button)),
        );
    };
    $("presets").append(button);
  }

  $("reset").onclick = reset;
  $("defaults").onclick = () => {
    S.rotation = 0.5;
    setParameters(defaults);
    $("presetStatus").textContent = "DEFAULT";
    document
      .querySelectorAll("[data-preset]")
      .forEach((button) => button.setAttribute("aria-pressed", "false"));
    view.zoom = 1;
    view.weight = 1.5;
    view.speed = 1;
    view.grid = true;
    $("viewZoom").value = 1;
    $("lineWeight").value = 1.5;
    $("speed").value = 1;
    $("showGrid").checked = true;
    for (const id of ["viewZoom", "lineWeight", "speed"])
      $(id).previousElementSibling.textContent = $(id).value;
    resize();
  };
  $("play").hidden = $("step").hidden = !model.animated;
  $("sampleCount").parentElement.hidden = !model.animated;
  $("speedField").hidden = !model.animated;
  $("viewZoomField").hidden = !!model.raster;
  $("gridField").hidden = !!model.raster;
  $("play").onclick = () => setRunning(!running);
  $("step").onclick = () => {
    setRunning(false);
    step();
    draw();
  };
  $("speed").oninput = () => {
    view.speed = Number($("speed").value);
    $("speed").previousElementSibling.textContent = view.speed;
  };
  $("viewZoom").oninput = () => {
    view.zoom = Number($("viewZoom").value);
    $("viewZoom").previousElementSibling.textContent = view.zoom;
    resize();
  };
  $("lineWeight").oninput = () => {
    view.weight = Number($("lineWeight").value);
    $("lineWeight").previousElementSibling.textContent = view.weight;
    dirty = true;
  };
  $("showGrid").onchange = () => {
    view.grid = $("showGrid").checked;
    dirty = true;
  };
  $("save").onclick = () => {
    draw();
    const link = document.createElement("a");
    link.download = `${entry.path.replace("/", "")}.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
  };
  $("fullscreen").onclick = async () => {
    try {
      if (document.fullscreenElement) await document.exitFullscreen();
      else await canvas.parentElement.requestFullscreen();
    } catch {
      $("viewStatus").textContent =
        "Fullscreen is unavailable in this browser.";
    }
  };

  let drag = null;
  const coordinates = (event) => {
    const bounds = canvas.getBoundingClientRect();
    return {
      x: (event.clientX - bounds.left - width / 2) / scaleX,
      y: -(event.clientY - bounds.top - height / 2) / scale,
    };
  };
  canvas.onpointerdown = (event) => {
    canvas.setPointerCapture(event.pointerId);
    const p = coordinates(event);
    const index = S.points.findIndex(
      (q) => Math.hypot(q.x - p.x, q.y - p.y) < 22 / scale,
    );
    drag = { index, x: event.clientX, y: event.clientY };
    if (
      model.interaction === "points-add" &&
      index < 0 &&
      S.points.length < 80
    ) {
      S.points.push(p);
      drag.index = S.points.length - 1;
      dirty = true;
    }
    model.pointerDown?.(p, event);
  };
  canvas.onpointermove = (event) => {
    if (!drag) return;
    const dx = event.clientX - drag.x,
      dy = event.clientY - drag.y;
    drag.x = event.clientX;
    drag.y = event.clientY;
    if (
      ["points", "points-add", "disk"].includes(model.interaction) &&
      drag.index >= 0
    ) {
      const p = S.points[drag.index];
      p.x += dx / scaleX;
      p.y -= dy / scale;
      if (model.interaction === "disk" && Math.hypot(p.x, p.y) > 0.94) {
        const factor = 0.94 / Math.hypot(p.x, p.y);
        p.x *= factor;
        p.y *= factor;
      }
      model.pointsChanged?.();
    } else if (model.interaction === "rotate") S.rotation += dx * 0.01;
    model.pointerMove?.(dx, dy, coordinates(event));
    dirty = true;
  };
  canvas.onpointerup = canvas.onpointercancel = () => {
    drag = null;
  };
  canvas.addEventListener(
    "wheel",
    (event) => {
      if (!model.wheel || !event.ctrlKey) return;
      event.preventDefault();
      model.wheel(event);
      dirty = true;
    },
    { passive: false },
  );

  function resize() {
    const rect = canvas.getBoundingClientRect(),
      dpr = Math.min(devicePixelRatio || 1, 2);
    width = rect.width;
    height = rect.height;
    const padding = Math.min(24, width * 0.04);
    const horizontalScale = (width - padding * 2) / 2.4;
    const verticalScale = (height - padding * 2) / 2;
    scale =
      (model.plot ? verticalScale : Math.min(horizontalScale, verticalScale)) *
      view.zoom;
    scaleX = model.plot ? horizontalScale * view.zoom : scale;
    canvas.width = Math.max(1, Math.round(width * dpr));
    canvas.height = Math.max(1, Math.round(height * dpr));
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    dirty = true;
  }
  new ResizeObserver(resize).observe(canvas);
  document.addEventListener("visibilitychange", () => {
    lastFrame = 0;
    accumulator = 0;
  });
  window.addEventListener("keydown", (event) => {
    if (event.target.matches("input,select,button,textarea")) return;
    if (event.code === "Space" && model.animated) {
      event.preventDefault();
      setRunning(!running);
    }
    if (event.key.toLowerCase() === "r") reset();
  });

  model.mount?.();
  reset();
  resize();
  setRunning(running);
  function frame(now) {
    const elapsed = lastFrame ? Math.min(0.1, (now - lastFrame) / 1000) : 0;
    lastFrame = now;
    if (!document.hidden && running && model.animated) {
      accumulator += elapsed * 30 * view.speed;
      while (accumulator >= 1) {
        step();
        accumulator--;
      }
    }
    if (dirty) draw();
    requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);
}
