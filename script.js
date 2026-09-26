/*
 * MATH // LAB
 * Homepage experiment registry.
 *
 * When you create a new experiment:
 * 1. Make its folder.
 * 2. Put index.html inside it.
 * 3. Add one object below.
 *
 * Example:
 * {
 *     number: "03",
 *     title: "Collatz Conjecture",
 *     category: "number-theory",
 *     categoryName: "Number Theory",
 *     description: "Watch numbers rise, fall and eventually collapse.",
 *     path: "03-collatz"
 * }
 */

const experiments = [
    {
        number: "01",
        title: "Mandelbrot Set",
        category: "fractals",
        categoryName: "Fractals",
        description: "Explore an infinitely detailed universe hidden inside z² + c.",
        path: "01-mandelbrot",
        ready: true
    },

    {
        number: "02",
        title: "Fourier Epicycles",
        category: "calculus",
        categoryName: "Analysis",
        description: "Watch rotating circles reconstruct complex drawings from waves.",
        path: "02-fourier-epicycles",
        ready: true
    },

    {
        number: "03",
        title: "Strange Attractors",
        category: "fractals",
        categoryName: "Chaos",
        description: "Tiny changes in initial conditions create wildly different trajectories.",
        path: "03-strange-attractors",
        ready: true
    },

    {
        number: "06",
        title: "Double Pendulum",
        category: "calculus",
        categoryName: "Chaos",
        description: "Two simple pendulums become an unpredictable dynamical system.",
        path: "06-double-pendulum",
        ready: false
    },

    {
        number: "07",
        title: "Reaction-Diffusion",
        category: "geometry",
        categoryName: "Patterns",
        description: "Simple equations grow into organic, biological-looking patterns.",
        path: "07-reaction-diffusion",
        ready: false
    },

    {
        number: "08",
        title: "Galton Board",
        category: "probability",
        categoryName: "Probability",
        description: "Drop thousands of random balls and watch a bell curve emerge.",
        path: "08-galton-board",
        ready: false
    },

    {
        number: "09",
        title: "Monty Hall",
        category: "probability",
        categoryName: "Probability",
        description: "Stay or switch? Run thousands of games and watch the probabilities converge.",
        path: "09-monty-hall",
        ready: false
    },

    {
        number: "10",
        title: "Voronoi Universe",
        category: "geometry",
        categoryName: "Geometry",
        description: "Move points around and watch their territories continuously reshape.",
        path: "10-voronoi",
        ready: false
    }
];

const grid = document.getElementById("experimentGrid");
const count = document.getElementById("experimentCount");
const filters = document.getElementById("filters");

const readyExperiments = experiments.filter(experiment => experiment.ready);
count.textContent = String(readyExperiments.length).padStart(2, "0");

function render(category = "all") {
    const visible = experiments.filter(experiment => {
        return category === "all" || experiment.category === category;
    });

    grid.innerHTML = visible.map(experiment => {
        const classes = experiment.ready ? "card" : "card coming-soon";

        return `
            <a class="${classes}" href="${experiment.ready ? experiment.path + "/" : "#"}"
               ${experiment.ready ? "" : 'onclick="return false;"'}>

                <div class="card-number">${experiment.number}</div>

                <div class="card-category">${experiment.categoryName}</div>

                <h3>${experiment.title}</h3>

                <p>${experiment.description}</p>

                <div class="status">
                    <span class="status-dot"></span>
                    ${experiment.ready ? "available" : "coming soon"}
                </div>
            </a>
        `;
    }).join("");
}

filters.addEventListener("click", event => {
    const button = event.target.closest(".filter");
    if (!button) return;

    document.querySelectorAll(".filter").forEach(filter => {
        filter.classList.remove("active");
    });

    button.classList.add("active");
    render(button.dataset.category);
});

render();
