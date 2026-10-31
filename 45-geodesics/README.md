# Geodesics

A geodesic is a locally shortest path on a surface. On a sphere, it lies along a great circle; interpolating latitude and longitude generally traces a different route.

## Try it

Drag the endpoints far apart and compare the green great-circle route with the pink coordinate interpolation. Change sphere radius to convert the angular separation to distance.

Open `index.html` directly or serve the repository root. Presets change model parameters; Restart starts a new run with current parameters. View & playback contains display settings, speed and Restore defaults. Save PNG exports the current canvas. Sound, where available, starts only after pressing Play sound.

## Files

`script.js` owns this experiment's model, controls, presets and explanatory copy. `index.html` and `style.css` own its page. Only numerical helpers (`../shared/math.js`) and common canvas / control primitives (`../shared/lab.js`) are shared. No other experiment's implementation is loaded.

Formula: distance = R arccos(a·b),  for unit direction vectors a,b
