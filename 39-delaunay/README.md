# Delaunay Triangulation

A Delaunay triangulation joins points so that no triangle’s circumcircle contains another point in its interior. It is closely related to the dual Voronoi diagram.

## Try it

Show circumcircles and drag a point across an edge. The triangulation flips when a different diagonal satisfies the empty-circle rule.

Open `index.html` directly or serve the repository root. Presets change model parameters; Restart starts a new run with current parameters. View & playback contains display settings, speed and Restore defaults. Save PNG exports the current canvas. Sound, where available, starts only after pressing Play sound.

## Files

`script.js` owns this experiment's model, controls, presets and explanatory copy. `index.html` and `style.css` own its page. Only numerical helpers (`../shared/math.js`) and common canvas / control primitives (`../shared/lab.js`) are shared. No other experiment's implementation is loaded.

Formula: For every triangle, its open circumdisk contains no other site.
