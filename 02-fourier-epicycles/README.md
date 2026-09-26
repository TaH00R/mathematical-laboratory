# fourier epicycles

a complicated drawing can look like a completely arbitrary mess. Fourier analysis says it isn't. you can break the whole thing into simple rotating circles, add their endpoints together, and the final point traces the original shape.

this page takes a path, turns it into a bunch of frequencies, and lets you watch those frequencies physically rebuild the drawing. fewer circles gives you a rough approximation. add more and the shape starts snapping into place.

## how it works

the trick is to treat every point on the drawing as a complex number:

```text
z = x + yi
```

then the discrete Fourier transform finds the frequencies hidden inside that sequence of points.

each frequency gets three important values:

- **amplitude** — how big its circle is
- **frequency** — how quickly it rotates
- **phase** — where it starts

the visualizer sorts those components by amplitude and connects them together:

```text
circle → circle → circle → ... → endpoint
```

the endpoint is the thing that actually draws the shape.

the underlying idea is basically:

```text
f(t) = Σ cₙ eⁱⁿᵗ
```

where every `cₙ` is one rotating component of the final drawing.

## why circles can draw things

this is the weird part.

a single rotating vector draws a circle.

add another rotating vector with a different frequency and the endpoint starts making more complicated paths. keep adding frequencies and you can approximate increasingly complicated shapes.

so instead of thinking:

```text
"how do I draw this weird shape?"
```

you're thinking:

```text
"what combination of simple rotations produces this shape?"
```

the circles aren't decorations. they're literally the pieces making the drawing.

## the fourier decomposition

the page uses the **discrete Fourier transform** because the drawing is represented by a finite list of points.

for every frequency `k`, it calculates a coefficient:

```js
for (let k = 0; k < N; k++) {
    let re = 0;
    let im = 0;

    for (let n = 0; n < N; n++) {
        const phi = (2 * Math.PI * k * n) / N;

        re += points[n].re * Math.cos(phi)
            + points[n].im * Math.sin(phi);

        im += -points[n].re * Math.sin(phi)
            + points[n].im * Math.cos(phi);
    }

    re /= N;
    im /= N;
}
```

that's the part doing the actual decomposition.

the browser isn't using a Fourier library or some magic animation package. it's just doing the math.

## why the number of circles matters

you don't actually need every frequency.

the largest coefficients usually contain most of the important structure, so the visualizer sorts them by amplitude and lets you choose how many to use.

with something like:

```text
5 terms
```

you get a very rough version.

with:

```text
30 terms
```

the major structure starts appearing.

with:

```text
100+ terms
```

the endpoint can reproduce surprisingly fine details.

that's also why the circles get smaller and smaller as you go down the chain. the big circles carry the broad shape, while the tiny ones add detail.

## drawing your own shape

the presets are fun, but the interesting part is drawing something yourself.

click and drag on the canvas.

the page records the path as a sequence of points, closes the path, resamples it, and feeds those points into the Fourier transform.

so you can literally draw:

```text
a face
a word
a logo
a random scribble
something that looks vaguely mathematical
```

and then watch a bunch of rotating circles reconstruct it.

the more carefully sampled the path is, the more accurately the Fourier components can represent it.

## the presets

there are a few built-in shapes because watching Fourier analysis rebuild a shape is much easier when you have something immediate to play with:

```text
heart
star
circle
infinity
spiral
wave
```

each one is generated mathematically rather than loaded as an image.

so even the starting shapes are just equations.

## why it keeps moving

the animation isn't moving the drawing itself.

the Fourier coefficients stay fixed.

what changes is `t`.

each component rotates according to its frequency:

```text
angle = frequency × time + phase
```

so one component might rotate slowly while another spins several times faster.

the endpoint is the sum of all those rotating vectors.

when it completes one full cycle, the endpoint has traced the complete reconstruction.

then it starts again.

## what the trail actually means

the orange/pink line is the history of the endpoint.

every frame:

```text
calculate epicycles
        ↓
get final endpoint
        ↓
add endpoint to trail
        ↓
connect all previous endpoints
```

that's why you can actually see the shape emerge behind the rotating circles.

the circles are the machinery.

the trail is the result.

## why it's interactive

everything here is running directly in the browser.

the animation is drawn with the Canvas API and the Fourier coefficients are calculated in JavaScript.

there's no:

- animation library
- Fourier library
- backend
- image asset
- external dependency

it's just complex numbers, trigonometry, a DFT, and a canvas.

which is honestly kind of ridiculous when you see the final thing moving.

## controls

the page gives you a few knobs to mess with:

| control | what it does |
|---|---|
| **Fourier terms** | number of rotating components used |
| **speed** | how quickly the reconstruction moves |
| **trail** | how much of the completed path remains visible |
| **show circles** | displays the actual epicycle circles |
| **show connectors** | displays the vectors connecting them |
| **show original path** | overlays the original drawing |
| **pause** | freezes the current Fourier configuration |
| **clear drawing** | lets you start over |
| **reset preset** | returns to the default shape |

the fun one is definitely the Fourier-term slider.

drag it down until the drawing falls apart, then slowly increase it and watch the details come back.

## the mathematical connection

Fourier analysis is usually introduced with waves.

you take a complicated signal and decompose it into simpler sine and cosine waves.

here we're doing essentially the same thing, except the signal is **two-dimensional**.

instead of reconstructing:

```text
amplitude over time
```

we're reconstructing:

```text
x(t) + iy(t)
```

which gives us a moving point in the plane.

that point traces a shape.

so the same mathematics used to analyze signals can also be used to draw pictures.

that's the whole reason this looks so cool.

## limitations

| thing | reality |
|---|---|
| **number of terms** | more terms improve detail but require more work per frame |
| **drawing quality** | a messy or poorly sampled path produces a messier reconstruction |
| **closed paths** | the visualizer works best when the drawing forms a closed loop |
| **DFT cost** | calculating the decomposition is `O(N²)`, so huge drawings can take longer to process |
| **animation** | the canvas rendering itself is lightweight, but lots of circles means more drawing work |
| **what it proves** | absolutely nothing new. it's a visualization of Fourier decomposition, not a new theorem |
| **the circles** | sadly, they are not sentient |

open `index.html`. no server, no build, nothing to install.

draw something stupid.

then give it 100 Fourier terms and watch mathematics draw it back for you.
