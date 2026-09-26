const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const systemButtons = document.querySelectorAll(".system-btn");

const param1 = document.getElementById("param1");
const param2 = document.getElementById("param2");
const param3 = document.getElementById("param3");

const param1Label = document.getElementById("param1Label");
const param2Label = document.getElementById("param2Label");
const param3Label = document.getElementById("param3Label");

const param1Value = document.getElementById("param1Value");
const param2Value = document.getElementById("param2Value");
const param3Value = document.getElementById("param3Value");

const initialX = document.getElementById("initialX");
const initialY = document.getElementById("initialY");
const initialZ = document.getElementById("initialZ");

const xValue = document.getElementById("xValue");
const yValue = document.getElementById("yValue");
const zValue = document.getElementById("zValue");

const dtSlider = document.getElementById("dt");
const trailSlider = document.getElementById("trail");

const dtValue = document.getElementById("dtValue");
const trailValue = document.getElementById("trailValue");

const pauseBtn = document.getElementById("pauseBtn");
const resetBtn = document.getElementById("resetBtn");
const randomBtn = document.getElementById("randomBtn");

const systemStat = document.getElementById("systemStat");
const pointsStat = document.getElementById("pointsStat");
const stateStat = document.getElementById("stateStat");

let system = "lorenz";
let running = true;

let points = [];
let x = 0.1;
let y = 0;
let z = 0;

let rotationX = -0.35;
let rotationY = 0.65;
let zoom = 1.0;

let dragging = false;
let lastMouseX = 0;
let lastMouseY = 0;

let lastFrame = performance.now();
let accumulator = 0;

const colors = {
    point: "rgba(255, 94, 168, .95)",
    pointGlow: "rgba(184, 121, 255, .28)",
    axis: "rgba(184, 121, 255, .12)"
};

function resizeCanvas() {
    const rect = canvas.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    canvas.width = Math.floor(rect.width * dpr);
    canvas.height = Math.floor(rect.height * dpr);

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
}

window.addEventListener("resize", resizeCanvas);
resizeCanvas();

function getParams() {
    return {
        p1: Number(param1.value),
        p2: Number(param2.value),
        p3: Number(param3.value)
    };
}

function derivatives(x, y, z) {
    const { p1, p2, p3 } = getParams();

    if (system === "lorenz") {
        return {
            dx: p1 * (y - x),
            dy: x * (p2 - z) - y,
            dz: x * y - p3 * z
        };
    }

    // Rössler:
    // dx/dt = -y-z
    // dy/dt = x+a*y
    // dz/dt = b+z*(x-c)
    return {
        dx: -y - z,
        dy: x + p1 * y,
        dz: p2 + z * (x - p3)
    };
}

function step() {
    const dt = Number(dtSlider.value);

    // Classical RK4 is more stable than a plain Euler step while
    // still being simple enough to see exactly what is happening.
    const k1 = derivatives(x, y, z);

    const k2 = derivatives(
        x + k1.dx * dt / 2,
        y + k1.dy * dt / 2,
        z + k1.dz * dt / 2
    );

    const k3 = derivatives(
        x + k2.dx * dt / 2,
        y + k2.dy * dt / 2,
        z + k2.dz * dt / 2
    );

    const k4 = derivatives(
        x + k3.dx * dt,
        y + k3.dy * dt,
        z + k3.dz * dt
    );

    x += (dt / 6) * (k1.dx + 2 * k2.dx + 2 * k3.dx + k4.dx);
    y += (dt / 6) * (k1.dy + 2 * k2.dy + 2 * k3.dy + k4.dy);
    z += (dt / 6) * (k1.dz + 2 * k2.dz + 2 * k3.dz + k4.dz);

    // Ignore numerical explosions if somebody drags the parameters
    // into a region where the chosen system becomes unbounded.
    if (
        !Number.isFinite(x) ||
        !Number.isFinite(y) ||
        !Number.isFinite(z) ||
        Math.abs(x) > 100000 ||
        Math.abs(y) > 100000 ||
        Math.abs(z) > 100000
    ) {
        resetSimulation();
        return;
    }

    points.push({ x, y, z });

    const maxPoints = Number(trailSlider.value);

    if (points.length > maxPoints) {
        points.splice(0, points.length - maxPoints);
    }
}

function project(point, width, height) {
    let px = point.x;
    let py = point.y;
    let pz = point.z;

    // Rotate around X.
    const cosX = Math.cos(rotationX);
    const sinX = Math.sin(rotationX);

    const y1 = py * cosX - pz * sinX;
    const z1 = py * sinX + pz * cosX;

    // Rotate around Y.
    const cosY = Math.cos(rotationY);
    const sinY = Math.sin(rotationY);

    const x2 = px * cosY - z1 * sinY;
    const z2 = px * sinY + z1 * cosY;

    // Simple perspective projection.
    const cameraDistance = 260;
    const perspective = cameraDistance / (cameraDistance - z2);

    return {
        x: width / 2 + x2 * 8.5 * zoom * perspective,
        y: height / 2 - y1 * 8.5 * zoom * perspective,
        depth: z2
    };
}

function drawAxes(width, height) {
    ctx.save();

    ctx.strokeStyle = colors.axis;
    ctx.lineWidth = 1;

    const centerX = width / 2;
    const centerY = height / 2;

    ctx.beginPath();
    ctx.moveTo(centerX - 100, centerY);
    ctx.lineTo(centerX + 100, centerY);
    ctx.moveTo(centerX, centerY - 100);
    ctx.lineTo(centerX, centerY + 100);
    ctx.stroke();

    ctx.restore();
}

function draw() {
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;

    ctx.clearRect(0, 0, width, height);

    drawAxes(width, height);

    if (points.length < 2) {
        return;
    }

    const projected = points.map(point =>
        project(point, width, height)
    );

    // Glow layer.
    ctx.save();
    ctx.lineWidth = 3;
    ctx.lineJoin = "round";
    ctx.lineCap = "round";
    ctx.shadowBlur = 14;
    ctx.shadowColor = "rgba(184, 121, 255, .55)";
    ctx.strokeStyle = colors.pointGlow;

    ctx.beginPath();

    for (let i = 0; i < projected.length; i++) {
        const p = projected[i];

        if (i === 0) {
            ctx.moveTo(p.x, p.y);
        } else {
            ctx.lineTo(p.x, p.y);
        }
    }

    ctx.stroke();
    ctx.restore();

    // Main trajectory.
    ctx.save();
    ctx.lineWidth = 1.15;
    ctx.lineJoin = "round";
    ctx.lineCap = "round";

    const gradient = ctx.createLinearGradient(
        0,
        0,
        width,
        height
    );

    gradient.addColorStop(0, "#66c7ff");
    gradient.addColorStop(.45, "#b879ff");
    gradient.addColorStop(1, "#ff5ea8");

    ctx.strokeStyle = gradient;

    ctx.beginPath();

    for (let i = 0; i < projected.length; i++) {
        const p = projected[i];

        if (i === 0) {
            ctx.moveTo(p.x, p.y);
        } else {
            ctx.lineTo(p.x, p.y);
        }
    }

    ctx.stroke();
    ctx.restore();

    // Current point.
    const current = projected[projected.length - 1];

    ctx.save();

    ctx.beginPath();
    ctx.arc(current.x, current.y, 4, 0, Math.PI * 2);
    ctx.fillStyle = "#ffffff";
    ctx.shadowBlur = 18;
    ctx.shadowColor = "#ff5ea8";
    ctx.fill();

    ctx.restore();
}

function animate(now) {
    const elapsed = Math.min(now - lastFrame, 40);
    lastFrame = now;

    if (running) {
        accumulator += elapsed;

        // Generate several integration steps per frame so the attractor
        // develops quickly without tying the math directly to FPS.
        const steps = Math.max(1, Math.floor(accumulator / 3));

        for (let i = 0; i < steps; i++) {
            step();
        }

        accumulator = 0;
    }

    draw();

    pointsStat.textContent = points.length.toLocaleString();
    requestAnimationFrame(animate);
}

function resetSimulation() {
    x = Number(initialX.value);
    y = Number(initialY.value);
    z = Number(initialZ.value);

    points = [];

    // Skip the initial transient so the attractor appears quickly.
    for (let i = 0; i < 1200; i++) {
        step();
    }

    points = [];
}

function updateParameterLabels() {
    if (system === "lorenz") {
        param1Label.textContent = "σ";
        param2Label.textContent = "ρ";
        param3Label.textContent = "β";

        param1Value.textContent = Number(param1.value).toFixed(2);
        param2Value.textContent = Number(param2.value).toFixed(2);
        param3Value.textContent = Number(param3.value).toFixed(2);
    } else {
        param1Label.textContent = "a";
        param2Label.textContent = "b";
        param3Label.textContent = "c";

        param1Value.textContent = Number(param1.value).toFixed(2);
        param2Value.textContent = Number(param2.value).toFixed(2);
        param3Value.textContent = Number(param3.value).toFixed(2);
    }

    xValue.textContent = Number(initialX.value).toFixed(2);
    yValue.textContent = Number(initialY.value).toFixed(2);
    zValue.textContent = Number(initialZ.value).toFixed(2);

    dtValue.textContent = Number(dtSlider.value).toFixed(3);
    trailValue.textContent = Number(trailSlider.value).toLocaleString();
}

function setSystem(name) {
    system = name;

    systemButtons.forEach(button => {
        button.classList.toggle(
            "primary",
            button.dataset.system === system
        );
    });

    if (system === "lorenz") {
        param1.min = "0";
        param1.max = "30";
        param1.value = "10";

        param2.min = "0";
        param2.max = "60";
        param2.value = "28";

        param3.min = "0";
        param3.max = "10";
        param3.value = "2.6667";

        x = 0.1;
        y = 0;
        z = 0;
    } else {
        param1.min = "0";
        param1.max = "1";
        param1.value = "0.2";

        param2.min = "0";
        param2.max = "1";
        param2.value = "0.2";

        param3.min = "0";
        param3.max = "20";
        param3.value = "5.7";

        x = 0.1;
        y = 0;
        z = 0;
    }

    systemStat.textContent = system.toUpperCase();
    updateParameterLabels();
    resetSimulation();
}

systemButtons.forEach(button => {
    button.addEventListener("click", () => {
        setSystem(button.dataset.system);
    });
});

[
    param1,
    param2,
    param3,
    initialX,
    initialY,
    initialZ,
    dtSlider,
    trailSlider
].forEach(input => {
    input.addEventListener("input", () => {
        updateParameterLabels();

        // Parameters change the attractor itself, so rebuild immediately.
        if (
            input === param1 ||
            input === param2 ||
            input === param3 ||
            input === initialX ||
            input === initialY ||
            input === initialZ
        ) {
            resetSimulation();
        }
    });
});

pauseBtn.addEventListener("click", () => {
    running = !running;

    pauseBtn.textContent = running ? "pause" : "resume";
    stateStat.textContent = running ? "RUNNING" : "PAUSED";
});

resetBtn.addEventListener("click", () => {
    resetSimulation();
});

randomBtn.addEventListener("click", () => {
    initialX.value = (Math.random() * 2 - 1).toFixed(2);
    initialY.value = (Math.random() * 2 - 1).toFixed(2);
    initialZ.value = (Math.random() * 2).toFixed(2);

    updateParameterLabels();
    resetSimulation();
});

canvas.addEventListener("mousedown", event => {
    dragging = true;
    lastMouseX = event.clientX;
    lastMouseY = event.clientY;
});

window.addEventListener("mouseup", () => {
    dragging = false;
});

window.addEventListener("mousemove", event => {
    if (!dragging) {
        return;
    }

    const dx = event.clientX - lastMouseX;
    const dy = event.clientY - lastMouseY;

    rotationY += dx * 0.008;
    rotationX += dy * 0.008;

    lastMouseX = event.clientX;
    lastMouseY = event.clientY;
});

canvas.addEventListener("wheel", event => {
    event.preventDefault();

    zoom *= event.deltaY < 0 ? 1.08 : 0.93;
    zoom = Math.max(.25, Math.min(5, zoom));
}, { passive: false });

canvas.addEventListener("touchstart", event => {
    if (event.touches.length !== 1) {
        return;
    }

    dragging = true;
    lastMouseX = event.touches[0].clientX;
    lastMouseY = event.touches[0].clientY;
}, { passive: true });

canvas.addEventListener("touchmove", event => {
    if (!dragging || event.touches.length !== 1) {
        return;
    }

    const touch = event.touches[0];

    const dx = touch.clientX - lastMouseX;
    const dy = touch.clientY - lastMouseY;

    rotationY += dx * 0.008;
    rotationX += dy * 0.008;

    lastMouseX = touch.clientX;
    lastMouseY = touch.clientY;
}, { passive: true });

canvas.addEventListener("touchend", () => {
    dragging = false;
});

updateParameterLabels();
resetSimulation();
requestAnimationFrame(animate);
