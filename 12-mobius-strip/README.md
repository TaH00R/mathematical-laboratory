# Möbius Strip Explorer

A Möbius strip is formed by joining a ribbon after a half twist. It has one continuous surface and one boundary, unlike an ordinary cylindrical band.

## Try it

Drag the strip to inspect the half twist. Make the ribbon wider and increase its wire density to follow lines around the surface.

Open `index.html` directly or serve the repository root. Presets change model parameters; Restart starts a new run with current parameters. View & playback contains display settings, speed and Restore defaults. Save PNG exports the current canvas. Sound, where available, starts only after pressing Play sound.

## Files

`script.js` owns this experiment's model, controls, presets and explanatory copy. `index.html` and `style.css` own its page. Only numerical helpers (`../shared/math.js`) and common canvas / control primitives (`../shared/lab.js`) are shared. No other experiment's implementation is loaded.

Formula: r(u,v) = ((R+v cos(u/2))cos u, v sin(u/2), (R+v cos(u/2))sin u)
