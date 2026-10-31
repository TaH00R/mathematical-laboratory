# Gambler’s Ruin

A gambler wins or loses one unit per turn and stops at zero or a target wealth. Even a small bias changes the chance of reaching the target before ruin.

## Try it

Start with half the target wealth. Compare a fair game with a 45% chance of winning each turn.

Open `index.html` directly or serve the repository root. Presets change model parameters; Restart starts a new run with current parameters. View & playback contains display settings, speed and Restore defaults. Save PNG exports the current canvas. Sound, where available, starts only after pressing Play sound.

## Files

`script.js` owns this experiment's model, controls, presets and explanatory copy. `index.html` and `style.css` own its page. Only numerical helpers (`../shared/math.js`) and common canvas / control primitives (`../shared/lab.js`) are shared. No other experiment's implementation is loaded.

Formula: P(win)=i/N when p=½; otherwise (1−((1−p)/p)ⁱ)/(1−((1−p)/p)ᴺ)
