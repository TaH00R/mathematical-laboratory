# Mathematical Laboratory

50 interactive experiments in HTML, CSS and JavaScript. Open `index.html` to browse or open any project folder directly. No installation or build step is needed.

For local HTTP hosting, run `python -m http.server 8000` from this directory and visit `http://localhost:8000`.

## Projects

| # | Experiment | Category |
| --- | --- | --- |
| 01 | [Mandelbrot Explorer](01-mandelbrot/) | fractals |
| 02 | [Burning Ship Fractal](02-burning-ship/) | fractals |
| 03 | [Fourier Epicycles](02-fourier-epicycles/) | calculus |
| 04 | [Strange Attractors](03-strange-attractors/) | fractals |
| 05 | [Double Pendulum Chaos](05-double-pendulum/) | calculus |
| 06 | [Reaction-Diffusion](06-reaction-diffusion/) | geometry |
| 07 | [Voronoi Universe](07-voronoi/) | geometry |
| 08 | [Newton Fractal](08-newton-fractal/) | fractals |
| 09 | [Cellular Automata](09-cellular-automata/) | fractals |
| 10 | [Double-Slit Simulation](10-double-slit/) | probability |
| 11 | [Lissajous Galaxy](11-lissajous/) | geometry |
| 12 | [Möbius Strip Explorer](12-mobius-strip/) | geometry |
| 13 | [Hyperbolic Geometry](13-hyperbolic-geometry/) | geometry |
| 14 | [Prime Number Spirals](14-prime-spirals/) | number theory |
| 15 | [Collatz 3D Landscape](15-collatz/) | number theory |
| 16 | [Prime Factorization Galaxy](16-prime-factorization/) | number theory |
| 17 | [N-Body Gravity](17-n-body-gravity/) | calculus |
| 18 | [Fourier Terrain](18-fourier-terrain/) | calculus |
| 19 | [Numerical Methods Race](19-numerical-methods/) | calculus |
| 20 | [Grand Fractal Explorer](20-fractal-explorer/) | fractals |
| 21 | [Monty Hall](21-monty-hall/) | probability |
| 22 | [Birthday Universe](22-birthday-universe/) | probability |
| 23 | [Galton Board](23-galton-board/) | probability |
| 24 | [Buffon’s Needle → π](24-buffons-needle/) | probability |
| 25 | [Gambler’s Ruin](25-gamblers-ruin/) | probability |
| 26 | [Random Walk → Diffusion](26-random-walk/) | probability |
| 27 | [Bayesian Detective](27-bayesian-detective/) | probability |
| 28 | [Markov Chain Universe](28-markov-chain/) | probability |
| 29 | [Percolation](29-percolation/) | probability |
| 30 | [Monte Carlo Universe](30-monte-carlo/) | probability |
| 31 | [Derivative Visualizer](31-derivates/) | calculus |
| 32 | [Integral Builder](32-integral-builder/) | calculus |
| 33 | [Taylor Series](33-taylor-series/) | calculus |
| 34 | [Newton-Raphson](34-newton-raphson/) | calculus |
| 35 | [Gradient Descent](35-gradient-descent/) | calculus |
| 36 | [Eigenvectors](36-eigenvectors/) | geometry |
| 37 | [Matrix Transformations](37-matrix-transformations/) | geometry |
| 38 | [Convex Hull](38-convex-hull/) | geometry |
| 39 | [Delaunay Triangulation](39-delaunay/) | geometry |
| 40 | [Traveling Salesman](40-traveling-salesman/) | geometry |
| 41 | [Bézier Curves](41-bezier-curves/) | geometry |
| 42 | [Chaos Game](42-chaos-game/) | fractals |
| 43 | [Penrose Tiling](43-penrose-tiling/) | geometry |
| 44 | [Sphere Projections](44-sphere-projections/) | geometry |
| 45 | [Geodesics](45-geodesics/) | geometry |
| 46 | [Integration Race](46-integration-race/) | calculus |
| 47 | [Fourier Transform](47-fourier-transform/) | calculus |
| 48 | [Prime Gaps](48-prime-gaps/) | number theory |
| 49 | [Mathematical Music](49-mathematical-music/) | calculus |
| 50 | [Mathematical Universe](50-mathematical-universe/) | geometry |

## Controls and layout

Each experiment lives in a numbered folder with `index.html`, `style.css`, `script.js` and `README.md`. Each project owns its model, parameters, presets and explanatory copy in its own `script.js`. The shared `shared/lab.js` supplies canvas and control primitives; `shared/math.js` supplies pure numerical helpers. No project loads another experiment’s model. The homepage catalogue is `experiments.js`.

On desktop, controls sit beside the visualization. On narrow screens, they move below it. Drag points and shapes using a mouse or touch. Ordinary scrolling moves the page without panning or zooming a graph. Use Ctrl+scroll, pinch gestures or the visible zoom controls to change the view. Graphs remain in the normal page layout, without sticky positioning. Charts use the full panel width; geometry panels adapt their height to preserve proportions, and canvases resize with their containers. Dynamic experiments support Pause, Step and Reset; static experiments expose only Reset. Space toggles animation and R resets when focus is outside a control. Reduced-motion preferences start new simulations paused. Sound requires an explicit Play sound press. Each page includes a short concept explanation, a formula and a suggested experiment. Presets configure the model; Restart preserves the current parameters. Display-only and live controls preserve edited points, trajectories and views, while controls that change a statistical trial restart its sample history. View & playback controls speed, view scale, line weight and the reference grid. Save PNG and Fullscreen are available above the canvas; Restore defaults resets both parameters and display settings.

## Verification

- `node --test tests/math.test.js tests/projects.test.js` checks reference calculations, expression parsing, independent models, presets, custom parameters and project links.
- `node tests/browser-check.js` checks every project at 1440, 390 and 320 pixel widths, exercises control extremes, and captures selected screenshots in `artifacts/`. This optional check requires Microsoft Edge on Windows; it has no npm dependencies. Pass `--port=8771` if the default local port is already in use.

## Numerical scope

These are finite interactive models. Fractals have bounded iteration counts; the new fractal explorers cap zoom at 50x, while the original Mandelbrot page retains its deep-zoom renderer. N-body gravity uses softening and fixed steps. Random trials fluctuate around their theoretical values. The traveling-salesman result is a nearest-neighbor / 2-opt approximation. Penrose uses a finite patch of Robinson triangles, sphere routes assume a unit sphere, and terrain uses a finite sine-wave sum. Unsupported symbolic derivatives use numerical stencils, whose accuracy decreases at high order or discontinuities.
