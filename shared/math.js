/* Pure numerical and geometry routines, also usable by the Node checks. */
const LabMath = (() => {
  const tau = Math.PI * 2;
  function prime(n) {
    if (n < 2) return false;
    for (let d = 2; d * d <= n; d++) if (n % d === 0) return false;
    return true;
  }
  function factors(n) {
    const a = [];
    for (let d = 2; d * d <= n; d++)
      while (n % d === 0) {
        a.push(d);
        n /= d;
      }
    if (n > 1) a.push(n);
    return a;
  }
  const cross = (o, a, b) =>
    (a.x - o.x) * (b.y - o.y) - (a.y - o.y) * (b.x - o.x);
  function hull(points) {
    const p = points.slice().sort((a, b) => a.x - b.x || a.y - b.y);
    if (p.length < 3) return p;
    const lo = [],
      hi = [];
    for (const x of p) {
      while (lo.length > 1 && cross(lo.at(-2), lo.at(-1), x) <= 0) lo.pop();
      lo.push(x);
    }
    for (const x of p.slice().reverse()) {
      while (hi.length > 1 && cross(hi.at(-2), hi.at(-1), x) <= 0) hi.pop();
      hi.push(x);
    }
    return lo.slice(0, -1).concat(hi.slice(0, -1));
  }
  function circum(a, b, c) {
    const d = 2 * (a.x * (b.y - c.y) + b.x * (c.y - a.y) + c.x * (a.y - b.y));
    if (Math.abs(d) < 1e-12) return null;
    const aa = a.x * a.x + a.y * a.y,
      bb = b.x * b.x + b.y * b.y,
      cc = c.x * c.x + c.y * c.y;
    const x = (aa * (b.y - c.y) + bb * (c.y - a.y) + cc * (a.y - b.y)) / d,
      y = (aa * (c.x - b.x) + bb * (a.x - c.x) + cc * (b.x - a.x)) / d;
    return { x, y, r2: (x - a.x) ** 2 + (y - a.y) ** 2 };
  }
  function delaunay(points) {
    const p = points.concat([
      { x: -100, y: -100 },
      { x: 100, y: -100 },
      { x: 0, y: 100 },
    ]);
    const n = points.length;
    let triangles = [[n, n + 1, n + 2]];
    for (let i = 0; i < n; i++) {
      const bad = triangles.filter((t) => {
        const c = circum(...t.map((j) => p[j]));
        return c && (p[i].x - c.x) ** 2 + (p[i].y - c.y) ** 2 < c.r2 + 1e-10;
      });
      const edges = new Map();
      for (const t of bad)
        for (let j = 0; j < 3; j++) {
          const e = [t[j], t[(j + 1) % 3]].sort((a, b) => a - b),
            k = e.join(",");
          if (edges.has(k)) edges.delete(k);
          else edges.set(k, e);
        }
      triangles = triangles.filter((t) => !bad.includes(t));
      for (const e of edges.values()) triangles.push([...e, i]);
    }
    return triangles.filter((t) => t.every((i) => i < n));
  }
  function dft(samples) {
    return samples.map((_, k) => {
      let re = 0,
        im = 0;
      samples.forEach((v, n) => {
        re += v * Math.cos((tau * k * n) / samples.length);
        im -= v * Math.sin((tau * k * n) / samples.length);
      });
      return Math.hypot(re, im) / samples.length;
    });
  }
  function integrate(f, a, b, n, method = "simpson") {
    if (method === "simpson" && n % 2) n++;
    const h = (b - a) / n;
    let sum = 0;
    for (let i = 0; i < n; i++) {
      const x = a + i * h;
      sum +=
        method === "left"
          ? f(x)
          : method === "midpoint"
            ? f(x + h / 2)
            : method === "trapezoid"
              ? (f(x) + f(x + h)) / 2
              : (f(x) + 4 * f(x + h / 2) + f(x + h)) / 6;
    }
    return h * sum;
  }
  function birthday(n, days = 365) {
    let no = 1;
    for (let k = 0; k < n; k++) no *= Math.max(0, (days - k) / days);
    return 1 - no;
  }
  function bayes(prevalence, sensitivity, specificity) {
    const a = prevalence * sensitivity;
    return a / (a + (1 - prevalence) * (1 - specificity));
  }
  function bezier(p, t) {
    let a = p.map((x) => ({ ...x }));
    while (a.length > 1)
      a = a
        .slice(0, -1)
        .map((v, i) => ({
          x: v.x * (1 - t) + a[i + 1].x * t,
          y: v.y * (1 - t) + a[i + 1].y * t,
        }));
    return a[0];
  }
  function rk4(y, dt, f) {
    const a = f(y),
      b = f(y.map((v, i) => v + (dt * a[i]) / 2)),
      c = f(y.map((v, i) => v + (dt * b[i]) / 2)),
      d = f(y.map((v, i) => v + dt * c[i]));
    return y.map((v, i) => v + (dt * (a[i] + 2 * b[i] + 2 * c[i] + d[i])) / 6);
  }
  return {
    tau,
    prime,
    factors,
    cross,
    hull,
    circum,
    delaunay,
    dft,
    integrate,
    birthday,
    bayes,
    bezier,
    rk4,
  };
})();
if (typeof module !== "undefined") module.exports = LabMath;
