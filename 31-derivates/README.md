# Derivative Visualizer

Calculus usually gets introduced as a wall of algebraic rules. You memorize the power rule, you memorize the product rule, you take a test, and you forget what the derivative actually *is*.

This interactive instrument strips away the memorization and makes the geometry impossible to miss: **the derivative is simply the slope of the tangent line turned into a height**.

As you slide the probe along $f(x)$, the tangent line rotates to match the steepness of the curve at every moment. Read how steep that line is, plot that steepness as a vertical height, and those heights trace out $f'(x)$.

Because rates of change also have their own rates of change, you can stack derivative graphs underneath: $f(x) \to f'(x) \to f''(x) \to f'''(x) \dots$ up to 6 synchronized tiers.

---

## How It Works

### 1. The Tangent Line as Instantaneous Rate of Change
Take two points on a curve separated by a distance $h$. The line passing through both is a secant line with average slope:

```text
m_secant = [f(x + h) - f(x)] / h
```

When you shrink $h \to 0$, the second point slides into the first. The secant line locks into the **tangent line**:

```text
f'(x) = lim_{h → 0} [f(x + h) - f(x)] / h
```

### 2. The Slope Becomes the Height
Observe the connection between any graph tier and the graph directly below it:

- **Flat Tangent ($m = 0$)**: Whenever $f(x)$ levels off at a peak, a valley, or a saddle point, its tangent line goes horizontal. At that exact same $x$, the derivative curve $f'(x)$ crosses the zero axis.
- **Rising Curve ($m > 0$)**: When $f(x)$ climbs upward, the tangent tilts up, so $f'(x)$ sits above zero.
- **Falling Curve ($m < 0$)**: When $f(x)$ dives downward, the tangent tilts down, so $f'(x)$ drops below zero.
- **Steepest Incline**: The moment $f(x)$ is climbing fastest, $f'(x)$ reaches its highest peak.

The vertical dashed laser guide cuts through all active tiers at probe position $a$, visually proving that $(a, \text{slope of tier } k) = (a, \text{height of tier } k+1)$.

---

## The Derivative Cascade ($f \to f' \to f'' \to f'''$)

Differentiation is recursive. What holds between $f$ and $f'$ also holds between $f'$ and $f''$:

| Tier | Function | Description | Geometric Meaning |
| :--- | :--- | :--- | :--- |
| **0** | $f(x)$ | Base Function | The original curve landscape |
| **1** | $f'(x)$ | 1st Derivative | Instantaneous slope of $f(x)$ |
| **2** | $f''(x)$ | 2nd Derivative | Concavity & rate of slope change |
| **3** | $f'''(x)$ | 3rd Derivative | Shift in concavity / inflection dynamics |
| **4** | $f^{(4)}(x)$ | 4th Derivative | 4th-order derivative rate |
| **5** | $f^{(5)}(x)$ | 5th Derivative | 5th-order higher-order rate |

When $f''(x) > 0$, the curve is concave up (holds water). When $f''(x) < 0$, it is concave down (spills water). Where $f''(x) = 0$, you get an **inflection point** where curvature changes direction.

---

## Features

- **Custom Mathematical Function Parsing**: Type any mathematical expression like `x^3 - 3*x`, `sin(2*x)*exp(-0.2*x)`, `1/(1+x^2)`, or `x^4 - 4*x^2`. Features Pratt parsing with implicit multiplication, trig, exponential, logarithmic, and power functions.
- **Symbolic AST Differentiator + Numerical Stencil Fallback**: Computes exact symbolic derivatives via AST transformation with 5-point central stencil fallbacks.
- **Full 2D Isotropic Pan & Zoom**: 1:1 synchronized canvas navigation (Desmos-style). Click and drag to pan both axes, scroll wheel to zoom into features, and use the Reset View button to instantly return to $10 \times 10$ isotropic scale.
- **Dynamic Slope Triangle**: Automatically appears at close zoom levels to reveal $\Delta x$, $\Delta y$, and slope $m = \Delta y / \Delta x$.
- **Synchronized Probe Focus**: Hovering or dragging in any tier automatically centers the probe and zooms focus into the derivative point on adjacent tiers.
- **Auto-Sweep Animation**: Smooth real-time sweep across the domain with adjustable playback speed.
- **High-Performance Curve Caching**: Pre-evaluates plot point samples into Float64Array arrays to ensure silky smooth 60 FPS rendering during probe scrubbing.

---

## Keyboard Controls

- `←` / `→`: Scrub probe position $x$
- `Space`: Play / pause auto-sweep
- `+` / `-`: Add / remove derivative tier order
- `r`: Reset viewport zoom & pan to default 1:1 scale

---

## Architecture

- Zero external dependencies (built with pure HTML5 Canvas, modern CSS, and vanilla ES6 JavaScript).
- High-DPI canvas rendering (`window.devicePixelRatio` aware).
- Efficient AST parsing & evaluation compiler with numerical stencil fallback.
- Thread-safe Float64Array curve sampling cache for zero-lag probe interaction.
