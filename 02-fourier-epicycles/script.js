/*
 * FOURIER EPICYCLES
 *
 * The main idea:
 *
 * 1. Take a closed path made from points.
 * 2. Treat every point as a complex number: x + yi.
 * 3. Use the Discrete Fourier Transform to find the frequencies.
 * 4. Sort the frequencies by amplitude.
 * 5. Draw one rotating vector for every frequency.
 * 6. The endpoint of all those vectors reconstructs the original path.
 *
 * No libraries. Just Canvas + JavaScript.
 */

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const termsInput = document.getElementById("terms");
const speedInput = document.getElementById("speed");
const trailInput = document.getElementById("trail");

const termsLabel = document.getElementById("termsLabel");
const speedLabel = document.getElementById("speedLabel");
const trailLabel = document.getElementById("trailLabel");

const pointValue = document.getElementById("pointValue");
const fpsValue = document.getElementById("fpsValue");
const animateButton = document.getElementById("animate");

const showCircles = document.getElementById("showCircles");
const showLines = document.getElementById("showLines");
const showOriginal = document.getElementById("showOriginal");

let width = 900;
let height = 650;
let drawing = [];
let coefficients = [];
let trail = [];
let time = 0;
let running = true;
let drawingMode = true;
let lastFrame = performance.now();
let fps = 60;

const TAU = Math.PI * 2;

function resizeCanvas() {
    const rect = canvas.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    width = rect.width;
    height = rect.height;

    canvas.width = Math.floor(width * dpr);
    canvas.height = Math.floor(height * dpr);

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
}

window.addEventListener("resize", resizeCanvas);
resizeCanvas();

function complex(re, im) {
    return { re, im };
}

function dft(points) {
    const N = points.length;
    const result = [];

    for (let k = 0; k < N; k++) {
        let re = 0;
        let im = 0;

        for (let n = 0; n < N; n++) {
            const phi = (TAU * k * n) / N;
            const cos = Math.cos(phi);
            const sin = Math.sin(phi);

            re += points[n].re * cos + points[n].im * sin;
            im += -points[n].re * sin + points[n].im * cos;
        }

        re /= N;
        im /= N;

        result.push({
            re,
            im,
            freq: k,
            amplitude: Math.hypot(re, im),
            phase: Math.atan2(im, re)
        });
    }

    return result.sort((a, b) => b.amplitude - a.amplitude);
}

function createPath(type, count = 700) {
    const points = [];

    for (let i = 0; i < count; i++) {
        const t = i / count * TAU;
        let x = 0;
        let y = 0;

        if (type === "circle") {
            x = Math.cos(t);
            y = Math.sin(t);
        }

        if (type === "heart") {
            x = 16 * Math.pow(Math.sin(t), 3) / 17;
            y = -(13 * Math.cos(t) - 5 * Math.cos(2*t) - 2 * Math.cos(3*t) - Math.cos(4*t)) / 17;
        }

        if (type === "star") {
            const r = 0.62 + 0.28 * Math.cos(5 * t);
            x = r * Math.cos(t);
            y = r * Math.sin(t);
        }

        if (type === "infinity") {
            x = Math.sin(t);
            y = Math.sin(t) * Math.cos(t) * 1.8;
        }

        if (type === "spiral") {
            const r = 0.08 + 0.85 * (i / count);
            x = r * Math.cos(4 * t);
            y = r * Math.sin(4 * t);
        }

        if (type === "wave") {
            x = Math.cos(t);
            y = 0.55 * Math.sin(3 * t) + 0.18 * Math.sin(9 * t);
        }

        points.push(complex(x, y));
    }

    return fitToCanvas(points);
}

function fitToCanvas(points) {
    const padding = 80;

    let minX = Infinity;
    let maxX = -Infinity;
    let minY = Infinity;
    let maxY = -Infinity;

    for (const p of points) {
        minX = Math.min(minX, p.re);
        maxX = Math.max(maxX, p.re);
        minY = Math.min(minY, p.im);
        maxY = Math.max(maxY, p.im);
    }

    const scaleX = (width - padding * 2) / Math.max(maxX - minX, 0.001);
    const scaleY = (height - padding * 2) / Math.max(maxY - minY, 0.001);
    const scale = Math.min(scaleX, scaleY);

    const cx = (minX + maxX) / 2;
    const cy = (minY + maxY) / 2;

    return points.map(p => complex(
        (p.re - cx) * scale,
        (p.im - cy) * scale
    ));
}

function rebuild(points) {
    if (!points.length) return;

    drawing = resample(points, Math.min(900, Math.max(200, points.length)));
    coefficients = dft(drawing);

    trail = [];
    time = 0;

    pointValue.textContent = drawing.length.toLocaleString();
    drawingMode = false;
    document.getElementById("canvasHint").textContent = "click + drag to draw a new shape";
}

function resample(points, count) {
    if (points.length <= count) return points.slice();

    const result = [];

    for (let i = 0; i < count; i++) {
        const index = Math.floor(i * points.length / count);
        result.push(points[index]);
    }

    return result;
}

function normalizedToCanvas(points) {
    return points.map(p => complex(
        p.re * Math.min(width, height) * 0.34,
        p.im * Math.min(width, height) * 0.34
    ));
}

function getCanvasPoint(event) {
    const rect = canvas.getBoundingClientRect();

    return {
        re: event.clientX - rect.left - width / 2,
        im: event.clientY - rect.top - height / 2
    };
}

let pointerDown = false;

canvas.addEventListener("pointerdown", event => {
    pointerDown = true;
    drawingMode = true;
    running = false;
    animateButton.textContent = "play";

    drawing = [];
    coefficients = [];
    trail = [];

    drawing.push(getCanvasPoint(event));
    canvas.setPointerCapture(event.pointerId);
});

canvas.addEventListener("pointermove", event => {
    if (!pointerDown) return;

    const p = getCanvasPoint(event);

    const last = drawing[drawing.length - 1];

    if (!last || Math.hypot(p.re - last.re, p.im - last.im) > 3) {
        drawing.push(p);
    }

    pointValue.textContent = drawing.length.toLocaleString();
});

canvas.addEventListener("pointerup", finishDrawing);
canvas.addEventListener("pointercancel", finishDrawing);

function finishDrawing() {
    if (!pointerDown) return;
    pointerDown = false;

    if (drawing.length < 10) {
        loadPreset("heart");
        return;
    }

    const closed = drawing.slice();

    // Close the hand-drawn path by adding a few interpolated points
    // between the last and first points.
    const first = closed[0];
    const last = closed[closed.length - 1];

    for (let i = 1; i <= 20; i++) {
        const t = i / 20;
        closed.push(complex(
            last.re + (first.re - last.re) * t,
            last.im + (first.im - last.im) * t
        ));
    }

    rebuild(closed);
    running = true;
    animateButton.textContent = "pause";
}

function epicycles(x, y, rotation, count) {
    let px = x;
    let py = y;

    const used = Math.min(count, coefficients.length);

    for (let i = 0; i < used; i++) {
        const c = coefficients[i];

        const prevX = px;
        const prevY = py;

        px += c.amplitude * Math.cos(c.freq * time + c.phase + rotation);
        py += c.amplitude * Math.sin(c.freq * time + c.phase + rotation);

        if (showCircles.checked) {
            ctx.beginPath();
            ctx.arc(prevX, prevY, c.amplitude, 0, TAU);
            ctx.strokeStyle = i === 0
                ? "rgba(91,156,255,.22)"
                : "rgba(126,138,157,.12)";
            ctx.lineWidth = 1;
            ctx.stroke();
        }

        if (showLines.checked) {
            ctx.beginPath();
            ctx.moveTo(prevX, prevY);
            ctx.lineTo(px, py);
            ctx.strokeStyle = i === 0
                ? "rgba(91,156,255,.55)"
                : "rgba(126,138,157,.32)";
            ctx.lineWidth = i === 0 ? 1.4 : 1;
            ctx.stroke();
        }
    }

    return { x: px, y: py };
}

function drawPath(points, stroke, lineWidth = 2) {
    if (!points.length) return;

    ctx.beginPath();
    ctx.moveTo(points[0].re, points[0].im);

    for (let i = 1; i < points.length; i++) {
        ctx.lineTo(points[i].re, points[i].im);
    }

    ctx.strokeStyle = stroke;
    ctx.lineWidth = lineWidth;
    ctx.stroke();
}

function render() {
    ctx.clearRect(0, 0, width, height);

    // Subtle center crosshair.
    ctx.strokeStyle = "rgba(255,255,255,.025)";
    ctx.lineWidth = 1;

    ctx.beginPath();
    ctx.moveTo(width / 2, 0);
    ctx.lineTo(width / 2, height);
    ctx.moveTo(0, height / 2);
    ctx.lineTo(width, height / 2);
    ctx.stroke();

    if (drawingMode) {
        if (drawing.length > 1) {
            drawPath(
                drawing,
                "rgba(91,156,255,.9)",
                2
            );
        }

        return;
    }

    if (!coefficients.length) return;

    const x = width / 2;
    const y = height / 2;

    const endpoint = epicycles(x, y, 0, Number(termsInput.value));

    if (trail.length > 0) {
        drawPath(
            trail,
            "rgba(255,112,67,.95)",
            2.4
        );
    }

    if (showOriginal.checked) {
        const original = drawing.map(p => complex(
            p.re + width / 2,
            p.im + height / 2
        ));

        drawPath(
            original,
            "rgba(255,255,255,.12)",
            1
        );
    }

    ctx.beginPath();
    ctx.arc(endpoint.x, endpoint.y, 3.5, 0, TAU);
    ctx.fillStyle = "#ff7043";
    ctx.fill();

    if (running) {
        trail.push(complex(endpoint.x, endpoint.y));

        const maxTrail = Math.floor(
            drawing.length * Number(trailInput.value) / 100
        );

        if (trail.length > maxTrail) {
            trail.splice(0, trail.length - maxTrail);
        }

        time += TAU / drawing.length * Number(speedInput.value);
        if (time > TAU) time -= TAU;
    }
}

function loop(now) {
    const delta = now - lastFrame;
    lastFrame = now;

    const instantFps = 1000 / Math.max(delta, 1);
    fps = fps * 0.9 + instantFps * 0.1;
    fpsValue.textContent = Math.round(Math.min(fps, 60));

    render();
    requestAnimationFrame(loop);
}

function loadPreset(type) {
    rebuild(createPath(type));
    running = true;
    animateButton.textContent = "pause";
}

termsInput.addEventListener("input", () => {
    termsLabel.textContent = termsInput.value;
});

speedInput.addEventListener("input", () => {
    speedLabel.textContent = `${Number(speedInput.value).toFixed(1)}×`;
});

trailInput.addEventListener("input", () => {
    trailLabel.textContent = `${trailInput.value}%`;
});

animateButton.addEventListener("click", () => {
    if (!coefficients.length) return;

    running = !running;
    animateButton.textContent = running ? "pause" : "play";
});

document.getElementById("clear").addEventListener("click", () => {
    drawing = [];
    coefficients = [];
    trail = [];
    time = 0;
    drawingMode = true;
    pointValue.textContent = "0";
    document.getElementById("canvasHint").textContent = "Draw a shape here";
});

document.getElementById("reset").addEventListener("click", () => {
    loadPreset("heart");
});

document.querySelectorAll("[data-preset]").forEach(button => {
    button.addEventListener("click", () => {
        loadPreset(button.dataset.preset);
    });
});

loadPreset("heart");
requestAnimationFrame(loop);
