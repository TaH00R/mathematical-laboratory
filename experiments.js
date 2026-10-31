const catalogue = [
  {
    "id": 1,
    "title": "Mandelbrot Explorer",
    "category": "fractals",
    "path": "01-mandelbrot/"
  },
  {
    "id": 2,
    "title": "Burning Ship Fractal",
    "category": "fractals",
    "path": "02-burning-ship/"
  },
  {
    "id": 3,
    "title": "Fourier Epicycles",
    "category": "calculus",
    "path": "02-fourier-epicycles/"
  },
  {
    "id": 4,
    "title": "Strange Attractors",
    "category": "fractals",
    "path": "03-strange-attractors/"
  },
  {
    "id": 5,
    "title": "Double Pendulum Chaos",
    "category": "calculus",
    "path": "05-double-pendulum/"
  },
  {
    "id": 6,
    "title": "Reaction-Diffusion",
    "category": "geometry",
    "path": "06-reaction-diffusion/"
  },
  {
    "id": 7,
    "title": "Voronoi Universe",
    "category": "geometry",
    "path": "07-voronoi/"
  },
  {
    "id": 8,
    "title": "Newton Fractal",
    "category": "fractals",
    "path": "08-newton-fractal/"
  },
  {
    "id": 9,
    "title": "Cellular Automata",
    "category": "fractals",
    "path": "09-cellular-automata/"
  },
  {
    "id": 10,
    "title": "Double-Slit Simulation",
    "category": "probability",
    "path": "10-double-slit/"
  },
  {
    "id": 11,
    "title": "Lissajous Galaxy",
    "category": "geometry",
    "path": "11-lissajous/"
  },
  {
    "id": 12,
    "title": "Möbius Strip Explorer",
    "category": "geometry",
    "path": "12-mobius-strip/"
  },
  {
    "id": 13,
    "title": "Hyperbolic Geometry",
    "category": "geometry",
    "path": "13-hyperbolic-geometry/"
  },
  {
    "id": 14,
    "title": "Prime Number Spirals",
    "category": "number-theory",
    "path": "14-prime-spirals/"
  },
  {
    "id": 15,
    "title": "Collatz 3D Landscape",
    "category": "number-theory",
    "path": "15-collatz/"
  },
  {
    "id": 16,
    "title": "Prime Factorization Galaxy",
    "category": "number-theory",
    "path": "16-prime-factorization/"
  },
  {
    "id": 17,
    "title": "N-Body Gravity",
    "category": "calculus",
    "path": "17-n-body-gravity/"
  },
  {
    "id": 18,
    "title": "Fourier Terrain",
    "category": "calculus",
    "path": "18-fourier-terrain/"
  },
  {
    "id": 19,
    "title": "Numerical Methods Race",
    "category": "calculus",
    "path": "19-numerical-methods/"
  },
  {
    "id": 20,
    "title": "Grand Fractal Explorer",
    "category": "fractals",
    "path": "20-fractal-explorer/"
  },
  {
    "id": 21,
    "title": "Monty Hall",
    "category": "probability",
    "path": "21-monty-hall/"
  },
  {
    "id": 22,
    "title": "Birthday Universe",
    "category": "probability",
    "path": "22-birthday-universe/"
  },
  {
    "id": 23,
    "title": "Galton Board",
    "category": "probability",
    "path": "23-galton-board/"
  },
  {
    "id": 24,
    "title": "Buffon’s Needle → π",
    "category": "probability",
    "path": "24-buffons-needle/"
  },
  {
    "id": 25,
    "title": "Gambler’s Ruin",
    "category": "probability",
    "path": "25-gamblers-ruin/"
  },
  {
    "id": 26,
    "title": "Random Walk → Diffusion",
    "category": "probability",
    "path": "26-random-walk/"
  },
  {
    "id": 27,
    "title": "Bayesian Detective",
    "category": "probability",
    "path": "27-bayesian-detective/"
  },
  {
    "id": 28,
    "title": "Markov Chain Universe",
    "category": "probability",
    "path": "28-markov-chain/"
  },
  {
    "id": 29,
    "title": "Percolation",
    "category": "probability",
    "path": "29-percolation/"
  },
  {
    "id": 30,
    "title": "Monte Carlo Universe",
    "category": "probability",
    "path": "30-monte-carlo/"
  },
  {
    "id": 31,
    "title": "Derivative Visualizer",
    "category": "calculus",
    "path": "31-derivates/"
  },
  {
    "id": 32,
    "title": "Integral Builder",
    "category": "calculus",
    "path": "32-integral-builder/"
  },
  {
    "id": 33,
    "title": "Taylor Series",
    "category": "calculus",
    "path": "33-taylor-series/"
  },
  {
    "id": 34,
    "title": "Newton-Raphson",
    "category": "calculus",
    "path": "34-newton-raphson/"
  },
  {
    "id": 35,
    "title": "Gradient Descent",
    "category": "calculus",
    "path": "35-gradient-descent/"
  },
  {
    "id": 36,
    "title": "Eigenvectors",
    "category": "geometry",
    "path": "36-eigenvectors/"
  },
  {
    "id": 37,
    "title": "Matrix Transformations",
    "category": "geometry",
    "path": "37-matrix-transformations/"
  },
  {
    "id": 38,
    "title": "Convex Hull",
    "category": "geometry",
    "path": "38-convex-hull/"
  },
  {
    "id": 39,
    "title": "Delaunay Triangulation",
    "category": "geometry",
    "path": "39-delaunay/"
  },
  {
    "id": 40,
    "title": "Traveling Salesman",
    "category": "geometry",
    "path": "40-traveling-salesman/"
  },
  {
    "id": 41,
    "title": "Bézier Curves",
    "category": "geometry",
    "path": "41-bezier-curves/"
  },
  {
    "id": 42,
    "title": "Chaos Game",
    "category": "fractals",
    "path": "42-chaos-game/"
  },
  {
    "id": 43,
    "title": "Penrose Tiling",
    "category": "geometry",
    "path": "43-penrose-tiling/"
  },
  {
    "id": 44,
    "title": "Sphere Projections",
    "category": "geometry",
    "path": "44-sphere-projections/"
  },
  {
    "id": 45,
    "title": "Geodesics",
    "category": "geometry",
    "path": "45-geodesics/"
  },
  {
    "id": 46,
    "title": "Integration Race",
    "category": "calculus",
    "path": "46-integration-race/"
  },
  {
    "id": 47,
    "title": "Fourier Transform",
    "category": "calculus",
    "path": "47-fourier-transform/"
  },
  {
    "id": 48,
    "title": "Prime Gaps",
    "category": "number-theory",
    "path": "48-prime-gaps/"
  },
  {
    "id": 49,
    "title": "Mathematical Music",
    "category": "calculus",
    "path": "49-mathematical-music/"
  },
  {
    "id": 50,
    "title": "Mathematical Universe",
    "category": "geometry",
    "path": "50-mathematical-universe/"
  }
];
if(typeof module!=="undefined") module.exports=catalogue;
