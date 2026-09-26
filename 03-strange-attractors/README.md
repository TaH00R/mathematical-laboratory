# Strange Attractors

simple rules can produce motion that looks completely impossible to predict.

a strange attractor is the geometric object you get when a deterministic dynamical system keeps evolving without settling into a simple fixed point or repeating cycle. the trajectory stays bounded, but it keeps stretching, folding, and wandering through the same region of phase space.

this page lets you play with a few of those systems and watch the trajectory build itself one numerical step at a time.

## how it works

the main system is the **Lorenz system**:

```text
dx/dt = σ(y - x)

dy/dt = x(ρ - z) - y

dz/dt = xy - βz
```

with the classic starting parameters:

```text
σ = 10
ρ = 28
β = 8/3
```

start with something like:

```text
x = 0.1
y = 0
z = 0
```

then repeatedly integrate the equations forward in time.

the browser isn't loading a picture of the famous butterfly.

it is generating the butterfly.

every point on the screen comes from the previous state of the system.

## why it looks like a butterfly

the Lorenz system describes the motion of a point in three-dimensional **phase space**.

the three coordinates are:

```text
x
y
z
```

as the equations evolve, the point moves through that space.

for the classic parameters it never settles at one location, but it also doesn't escape to infinity. instead, the trajectory keeps getting pulled toward a complicated region with two characteristic lobes.

after thousands of steps, those points reveal the famous butterfly-shaped attractor.

the shape is an emergent property of the equations.

there isn't a line of code saying:

```text
draw butterfly
```

which is probably the coolest part.

## deterministic does not mean predictable

this is the bit that makes chaotic systems interesting.

run the simulation twice with exactly the same:

```text
parameters
+
initial conditions
+
numerical method
```

and you get the same trajectory.

there's no random number generator involved in the attractor.

but change the starting point by an extremely small amount and the two trajectories eventually separate.

for example:

```text
A: x = 0.100000
B: x = 0.100001
```

at first they are almost indistinguishable.

after enough time, they can be nowhere near each other.

this is called **sensitive dependence on initial conditions**.

it's one of the defining ideas behind chaotic dynamics.

## the numerical part

a computer doesn't normally solve these differential equations in one magical operation.

it takes small steps.

this project uses **fourth-order Runge-Kutta (RK4)** integration.

instead of simply doing:

```js
x += dx * dt;
```

RK4 evaluates the derivatives several times during each timestep and combines those estimates.

the basic structure is:

```js
const k1 = derivatives(x, y, z);

const k2 = derivatives(
    x + k1.dx * dt / 2,
    y + k1.dy * dt / 2,
    z + k1.dz * dt / 2
);

const k3 = derivatives(
    x + k2.dx * dt / 2,
    y + k2.dy * dt / 2,
    z + k2.dz * dt / 2
);

const k4 = derivatives(
    x + k3.dx * dt,
    y + k3.dy * dt,
    z + k3.dz * dt
);
```

then the four estimates are combined:

```js
x += (dt / 6) * (
    k1.dx + 2*k2.dx + 2*k3.dx + k4.dx
);
```

and the same thing happens for `y` and `z`.

the result is a much better numerical approximation than taking one crude derivative estimate per step.

## why the timestep matters

`dt` is basically the size of each jump through the system.

too large:

```text
large jump
→ less accurate trajectory
→ possible numerical instability
```

smaller:

```text
small jump
→ more calculations
→ smoother numerical approximation
```

the page lets you change it so you can actually see the tradeoff.

the equations haven't changed.

only the way we're approximating their continuous motion has changed.

## the Rössler system

the page also includes another classic chaotic system: the **Rössler attractor**.

its equations are:

```text
dx/dt = -y - z

dy/dt = x + ay

dz/dt = b + z(x - c)
```

a common parameter set is:

```text
a = 0.2
b = 0.2
c = 5.7
```

it produces a very different shape from Lorenz.

that's useful because it shows that "strange attractor" isn't the name of one specific picture.

it's a broader class of behavior.

different equations can create completely different attractors.

## phase space

the visualization isn't showing physical space.

it's showing **state space**.

that's an important distinction.

if the system has three variables:

```text
(x, y, z)
```

then every possible state of the system corresponds to one point in a three-dimensional phase space.

the trajectory is:

```text
state₀
  ↓
state₁
  ↓
state₂
  ↓
state₃
  ↓
...
```

so the butterfly is really a map of how the system moves through its possible states.

## rotating the attractor

the canvas is actually rendering a 3D trajectory.

drag it around to change the viewing angle.

scroll to zoom.

this isn't changing the mathematics at all.

you're just changing the camera looking at the same collection of points.

that's useful because some structures are much easier to understand from a different angle.

## changing the parameters

the sliders are where things get interesting.

for Lorenz:

```text
σ
ρ
β
```

control the differential equations themselves.

change them and you're no longer looking at exactly the same dynamical system.

in particular, `ρ` has a major effect on the behavior of the classic Lorenz system.

try:

```text
ρ ≈ 20
```

then:

```text
ρ = 28
```

and then push it around further.

don't expect every parameter combination to produce a nice butterfly. that's the point.

the equations can move between qualitatively different behaviors.

## initial conditions

the starting point is separate from the parameters.

for example:

```text
parameters:
σ = 10
ρ = 28
β = 8/3

initial state:
x = 0.1
y = 0
z = 0
```

changing the initial state doesn't change the equations.

it changes where the trajectory begins.

the **random starting point** button exists specifically so you can see how quickly different starting states can diverge.

## what the controls do

| control | what it does |
|---|---|
| **Lorenz** | uses the classic three-variable Lorenz system |
| **Rössler** | switches to the Rössler chaotic system |
| **σ / a** | first system parameter |
| **ρ / b** | second system parameter |
| **β / c** | third system parameter |
| **x₀, y₀, z₀** | initial state of the trajectory |
| **time step** | numerical integration step size |
| **trail length** | number of recent trajectory points kept |
| **pause** | freezes the simulation |
| **reset simulation** | starts again from the current initial state |
| **random starting point** | chooses a new initial state |
| **drag** | rotates the 3D camera |
| **scroll** | zooms the camera |

## why the trajectory doesn't need randomness

it's tempting to look at the attractor and think:

```text
"this is basically random."
```

but it isn't.

the system is deterministic.

if the state at time `t` is known exactly, the equations determine the derivative, and therefore the next state.

the apparent unpredictability comes from the dynamics amplifying tiny differences.

so the chain is:

```text
simple deterministic equations
        ↓
tiny differences
        ↓
repeated stretching / folding
        ↓
large separation
        ↓
chaotic-looking trajectory
```

that's the strange part.

## limitations

| thing | reality |
|---|---|
| **numerical integration** | the browser is approximating continuous differential equations with finite timesteps |
| **RK4** | more accurate than a basic Euler step, but still an approximation |
| **parameter ranges** | the sliders expose only a useful range; not every possible parameter regime is represented |
| **3D rendering** | the visualization uses a simple canvas projection rather than a full 3D graphics engine |
| **trajectory length** | very long trails require more memory and more drawing work |
| **chaos** | changing parameters can produce regular, transient, or unbounded behavior instead of a classic strange attractor |
| **random starting point** | the initial state is random, but the resulting trajectory is still deterministic once that state is chosen |
| **what it proves** | this page visualizes chaotic dynamical systems; it doesn't prove that a particular parameter choice is chaotic |

open `index.html`. no server, no build, nothing to install.

drag the attractor around.

change `ρ`.

change the starting point by a tiny amount.

then watch a few simple differential equations turn into something that looks like the universe forgot what it was doing.
