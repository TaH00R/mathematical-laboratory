# Grand Fractal Explorer

Mandelbrot, Julia and Burning Ship images all test repeated complex iteration, but change either the starting value or the recurrence. Colors show how quickly points escape a bounded region.

## Try it

Choose Julia and change its real and imaginary constants. Switch back to Mandelbrot or Burning Ship and drag to explore the boundary.

Open `index.html` directly or serve the repository root. Presets change model parameters; Restart starts a new run with current parameters. View & playback contains display settings, speed and Restore defaults. Save PNG exports the current canvas. Sound, where available, starts only after pressing Play sound.

## Files

`script.js` owns this experiment's model, controls, presets and explanatory copy. `index.html` and `style.css` own its page. Only numerical helpers (`../shared/math.js`) and common canvas / control primitives (`../shared/lab.js`) are shared. No other experiment's implementation is loaded.

Formula: Mandelbrot: z₀=0; Julia: c fixed; zₙ₊₁=zₙ²+c
