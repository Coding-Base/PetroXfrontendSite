// src/components/lesson/courses/Physics.jsx
import React from "react";
import LessonPlayer from "../shared/LessonPlayer";

/**
 * Physics.jsx (REVISED - teaching-first)
 *
 * This file replaces the prior Physics content with a more pedagogical, step-by-step
 * teaching style. Each topic:
 *  - begins with a clear learning goal / motivation
 *  - explains the core concepts in plain language
 *  - walks through methods and common mistakes
 *  - provides 3+ worked examples with step-by-step solutions
 *  - offers short practice questions and direct answers (for self-check)
 *
 * Structure matches LessonPlayer expectations:
 * courseContent = [ { Session: "First Semester", Topics: [...], Content: [ { explanation, examples, quiz }, ... ] }, ... ]
 *
 * Drop this file into src/components/lesson/courses/ and it will render in the LessonPlayer component.
 */

const PhysicsContent = [
  {
    Session: "First Semester",
    Topics: [
      "Units, Dimensions & Problem Solving",
      "Vectors: Representation & Operations",
      "Kinematics: One & Two Dimensional Motion",
      "Newton's Laws & Free Body Diagrams",
      "Work, Energy & Power",
      "Linear Momentum, Impulse & Collisions",
      "Rotation: Torque, Moment of Inertia & Angular Kinematics",
      "Fluids: Pressure, Buoyancy & Flow"
    ],
    Content: [
      // 1 Units, Dimensions & Problem Solving
      {
        explanation:
`Learning goal: be confident checking formulas, converting units, and planning a solution before you compute.
 
Why this matters:
Units and dimensions are your first guard against mistakes. If the units don't match, the algebra is probably wrong. Before solving, a quick dimensional check and a short plan (what are knowns, what to find, which equation connects them) saves time.

How to approach problems:
1. Read the problem twice. Underline givens and what is asked.
2. Write down symbols with units (e.g., v0 = 5.0 m/s).
3. Check whether assumptions apply (constant acceleration? negligible air resistance? point-mass?).
4. Use units to select appropriate formulas. If the units don't match, stop and convert.
5. Solve algebraically first, then plug numbers.
6. Do a reasonableness check: signs, magnitude, and limiting cases.

Common mistakes:
- Mixing degrees and radians in trigonometric contexts (use radians for calculus).
- Forgetting to convert minutes/hours to seconds when using SI.
- Ignoring negative signs for direction-sensitive quantities (velocity, displacement).`,

        examples: [
          {
            title: "Example — Unit conversion & dimensional check",
            problem: "A car travels 90 km in 2 hours. Convert the speed to m/s and check units.",
            solution: "90 km / 2 hr = 45 km/hr = 12.5 m/s",
            steps: [
              "Convert km to m: 45 km/hr × (1000 m / 1 km) = 45000 m/hr.",
              "Convert hour to seconds: 1 hr = 3600 s, so 45000 / 3600 = 12.5 m/s.",
              "Dimensional check: (m)/(s) is correct for speed."
            ],
            hint: "Always convert length then time to base SI units (m, s)."
          },
          {
            title: "Example — Dimensional consistency",
            problem: "Would it make sense to compute acceleration with a formula a = v + t ?",
            solution: "No — v has units m/s and t has units s; summing them is invalid.",
            steps: [
              "Compare units: v (m/s) + t (s) is not dimensionally consistent.",
              "Correct approach: acceleration units must be m/s^2, e.g., a = Δv / Δt."
            ],
            hint: "Only add or subtract quantities with identical units."
          },
          {
            title: "Practice — Plan before calculation",
            problem: "A ball dropped from 20 m: estimate time to hit ground ignoring air resistance.",
            solution: "t = sqrt(2h/g) -> sqrt(40/9.8) ≈ 2.02 s",
            steps: [
              "Assume constant g = 9.8 m/s^2, initial velocity 0.",
              "Use y = 1/2 g t^2, solve for t: t = sqrt(2h/g).",
              "Plug numbers: sqrt(40/9.8) ≈ 2.02 s."
            ],
            hint: "Check your result — with g ≈ 10 m/s^2 you'd get t ≈ 2 s, close enough."
          }
        ],

        quiz: [
          { q: "Why use dimensional analysis before solving?", a: "To check formula consistency and catch unit mistakes early." },
          { q: "Convert 36 km/h to m/s.", a: "10 m/s" }
        ]
      },

      // 2 Vectors
      {
        explanation:
`Learning goal: add and decompose vectors confidently, determine components, and use vector algebra in mechanics.

Vectors vs scalars:
- Scalars: magnitude only (temperature, mass).
- Vectors: magnitude and direction (displacement, velocity, force).

Two methods for addition:
1. Graphical (tip-to-tail) — helpful for intuition.
2. Component method — robust and used in calculations.

Component method:
- For a 2D vector V at angle θ (from +x axis): Vx = V cosθ, Vy = V sinθ.
- To add vectors, sum x-components and y-components separately, then recombine: R = √(Rx^2 + Ry^2), angle = arctan(Ry / Rx).
- Use "min-w-0" and "truncate" in UI to avoid long labels when showing vectors — but conceptually always decompose onto orthogonal axes.

Remember:
- Choose a consistent sign convention (right/up positive).
- When working with directions like 'north of east', convert to standard +x/+y angles first.`,

        examples: [
          {
            title: "Example — Decompose a vector",
            problem: "A 20 N force at 30° above the horizontal. Find horizontal and vertical components.",
            solution: "Fx = 17.32 N, Fy = 10.00 N",
            steps: [
              "Fx = 20 cos 30° = 20 × 0.8660 = 17.32 N.",
              "Fy = 20 sin 30° = 20 × 0.5 = 10.00 N.",
              "Check: magnitude sqrt(17.32^2 + 10^2) ≈ 20 N (reconstruction)."
            ],
            hint: "Use a calculator in degree mode if angle is in degrees."
          },
          {
            title: "Example — Add two displacement vectors",
            problem: "Walk 3 m east, then 4 m north. Resultant displacement?",
            solution: "5 m at arctan(4/3) ≈ 53.13° north of east",
            steps: [
              "Rx = 3, Ry = 4 -> R = √(9 + 16) = 5.",
              "θ = arctan(4/3) ≈ 53.13°."
            ],
            hint: "This is a classic 3-4-5 right triangle."
          },
          {
            title: "Practice — Relative velocity",
            problem: "Boat speed 5 m/s east relative to water; river current 2 m/s north. Find speed relative to ground.",
            solution: "√(5^2 + 2^2) ≈ 5.385 m/s at arctan(2/5) ≈ 21.8° north of east",
            steps: [
              "Sum components: Vx = 5, Vy = 2",
              "Speed = √(25 + 4) ≈ 5.385 m/s; direction = arctan(2/5)."
            ],
            hint: "Treat current as a vector added to boat's velocity relative to water."
          }
        ],

        quiz: [
          { q: "What is vector dot product physical meaning for forces?", a: "F · d gives the work done when force acts along displacement." },
          { q: "Resolve 10 m/s at 120° into components (cos120 = −1/2, sin120 = √3/2).", a: "Vx = −5 m/s, Vy = 8.66 m/s" }
        ]
      },

      // 3 Kinematics
      {
        explanation:
`Learning goal: use kinematics equations confidently for motion with constant acceleration, and treat projectile motion as two independent 1D motions.

Strategy:
1. Pick axes — for projectile problems the usual choice is x horizontal, y vertical (take upward positive).
2. Identify knowns: initial velocity components, acceleration (ax = 0, ay = −g if up positive), displacement or time.
3. Use kinematic equations only when acceleration is constant:
   - v = u + at
   - s = ut + 1/2 a t^2
   - v^2 = u^2 + 2 a s
4. For projectile motion:
   - Horizontal: x = u_x t, u_x = u cosθ, a_x = 0
   - Vertical: y = u_y t + 1/2 a t^2, u_y = u sinθ, a_y = −g

Common pitfalls:
- Forgetting to break initial velocity into components.
- Using the wrong sign for g (consistency matters).
- Confusing displacement with distance (direction matters).`,

        examples: [
          {
            title: "Example — One-dimensional kinematics",
            problem: "Car accelerates from rest at 3 m/s^2 for 5 s. Find final speed and distance.",
            solution: "v = 15 m/s, s = 37.5 m",
            steps: [
              "v = u + at = 0 + 3*5 = 15 m/s.",
              "s = ut + 1/2 a t^2 = 0 + 0.5 * 3 * 25 = 37.5 m."
            ],
            hint: "Check units: m/s and m."
          },
          {
            title: "Example — Projectile range",
            problem: "Throw a ball with speed 20 m/s at 30° above horizontal. Find time of flight and horizontal range (ignore air resistance).",
            solution: "Time of flight ≈ 2.04 s, Range ≈ 35.3 m",
            steps: [
              "u_y = 20 sin30° = 10 m/s. Time to peak = u_y / g = 10/9.8 ≈ 1.020 s. Total time = 2 × 1.020 ≈ 2.04 s.",
              "u_x = 20 cos30° = 17.32 m/s. Range = u_x × total time ≈ 17.32 × 2.04 ≈ 35.3 m."
            ],
            hint: "Total time = 2 u_y / g for symmetric projectile launched/landing at same height."
          },
          {
            title: "Example — Vertical launch height",
            problem: "A ball launched vertically with initial speed 15 m/s. How high does it go?",
            solution: "h = u^2 / (2g) = 225 / (19.6) ≈ 11.48 m",
            steps: [
              "Use v^2 = u^2 + 2 a s with final v = 0 at peak: 0 = 15^2 − 2 g h.",
              "Solve: h = u^2 / (2 g) ≈ 225 / 19.6 ≈ 11.48 m."
            ],
            hint: "Use energy (ΔK to ΔU) as cross-check: mgh = 1/2 m u^2 -> h = u^2 / (2 g)."
          }
        ],

        quiz: [
          { q: "If acceleration is zero, which kinematics equation is simplest for displacement?", a: "s = ut (constant velocity) or s = ut + 1/2 a t^2 with a = 0." },
          { q: "Time to fall from rest from height h? (ignore air resistance)", a: "t = sqrt(2h/g)" }
        ]
      },

      // 4 Newton's Laws
      {
        explanation:
`Learning goal: draw free-body diagrams (FBDs), translate them to equations, and solve for unknown forces or acceleration.

Newton's three laws summarized:
1. Inertia: object maintains velocity unless acted upon by net force.
2. F_net = m a: net force equals mass times acceleration.
3. Every action has an equal and opposite reaction.

Free-body diagram steps:
1. Isolate the object.
2. Draw all forces acting (gravity mg down, normal N, tension T, friction f opposite motion).
3. Choose axes (align with motion when helpful).
4. Sum forces in each axis: ΣF_x = m a_x, ΣF_y = m a_y.

Friction notes:
- Static friction f_s ≤ μ_s N; it adjusts up to its maximum to prevent motion.
- Kinetic friction f_k = μ_k N, constant while sliding.

Common error: mixing up action/reaction pairs — they act on different bodies.`,

        examples: [
          {
            title: "Example — Block on incline with no friction",
            problem: "Find acceleration of block sliding down frictionless incline angle θ.",
            solution: "a = g sin θ",
            steps: [
              "Forces: gravity mg downward. Resolve into components: mg sinθ down the plane, mg cosθ perpendicular.",
              "No friction forces. ΣF = m a => m g sinθ = m a => a = g sinθ."
            ],
            hint: "Use component parallel to plane for acceleration."
          },
          {
            title: "Example — Block with kinetic friction",
            problem: "Block mass 5 kg on 30° incline with μ_k = 0.2. Find acceleration down the plane (take g=9.8).",
            solution: "a ≈ 9.8 sin30° − μ_k 9.8 cos30° ≈ 4.9 − 1.697 ≈ 3.203 m/s^2",
            steps: [
              "Normal N = mg cosθ = 5*9.8*cos30° ≈ 42.44 N.",
              "F_friction = μ_k N ≈ 0.2 * 42.44 ≈ 8.488 N down opposing motion (up the plane).",
              "Driving force down plane = mg sinθ = 5*9.8*0.5 = 24.5 N.",
              "Net force = 24.5 − 8.488 = 16.012 N. a = F_net / m = 16.012 / 5 ≈ 3.2024 m/s^2."
            ],
            hint: "Include direction: friction opposes motion."
          },
          {
            title: "Practice — Pulley system",
            problem: "Two masses m1 = 3 kg (on table, frictionless) and m2 = 2 kg hanging over a frictionless pulley. Find acceleration.",
            solution: "a = (m2 g) / (m1 + m2) = (2*9.8) / 5 = 3.92 m/s^2 downward for m2",
            steps: [
              "Tension same on both sides for massless string/pulley; write equations: m1 a = T (horizontal), m2 g − T = m2 a (vertical).",
              "Add: m2 g = (m1 + m2) a => a = m2 g / (m1 + m2)."
            ],
            hint: "Careful with sign convention; choose positive direction consistently for both masses."
          }
        ],

        quiz: [
          { q: "What is static friction's role before motion starts?", a: "It resists applied force up to a maximum μ_s N to prevent motion." },
          { q: "If net force is zero, what is acceleration?", a: "Zero (object moves with constant velocity or remains at rest)." }
        ]
      },

      // 5 Work, Energy & Power
      {
        explanation:
`Learning goal: use energy methods to solve mechanics problems — often simpler than force-based methods for variable forces or complex paths.

Key ideas:
- Work: W = ∫ F · ds. For constant force along displacement, W = F s cosθ.
- Kinetic energy: K = 1/2 m v^2.
- Work-energy theorem: Net work = ΔK.
- Potential energy (gravity near Earth): U = m g h.
- Conservative forces: path-independent (e.g., gravity) and allow energy conservation: K1 + U1 = K2 + U2 (if no non-conservative work like friction).
- Power: P = dW/dt = F v (instantaneous), average P = W / t.

Why energy is powerful:
- You can avoid solving differential equations in many cases.
- For collisions, use energy for elastic cases; for inelastic, track energy lost to other forms.`,

        examples: [
          {
            title: "Example — Work by a constant force",
            problem: "A 10 N horizontal force moves a box 5 m along the floor. Work done?",
            solution: "W = 10 N × 5 m = 50 J",
            steps: [
              "Assume force parallel to displacement; use W = F s.",
              "Multiply magnitude of force by displacement: 10 × 5 = 50 J."
            ],
            hint: "If force is at angle, include cosθ."
          },
          {
            title: "Example — Energy conservation check",
            problem: "A 2 kg mass slides down a 3 m high frictionless ramp from rest. Find final speed at bottom.",
            solution: "v = sqrt(2 g h) ≈ sqrt(58.8) ≈ 7.67 m/s",
            steps: [
              "Initial energy: m g h. Final energy: 1/2 m v^2. Set m g h = 1/2 m v^2.",
              "Solve: v = sqrt(2 g h) = sqrt(2*9.8*3) ≈ 7.67 m/s."
            ],
            hint: "Mass cancels out for gravitational potential -> kinetic problems."
          },
          {
            title: "Practice — Power",
            problem: "A motor does 12000 J of work in 10 s. What is its average power?",
            solution: "P = W/t = 1200 W",
            steps: [
              "Divide total work by time: 12000 / 10 = 1200 W."
            ],
            hint: "1 W = 1 J/s."
          }
        ],

        quiz: [
          { q: "When is mechanical energy conserved?", a: "When only conservative forces (e.g., gravity, spring) do work — no friction or air resistance." },
          { q: "Work unit in SI?", a: "Joule (J)" }
        ]
      },

      // 6 Momentum, Impulse & Collisions
      {
        explanation:
`Learning goal: use conservation of momentum to solve collision problems and interpret impulse.

Key points:
- Momentum p = m v. For an isolated system (no external net force), total momentum is conserved.
- Impulse J = Δp = F_avg Δt. Useful when forces are large but act for short time.
- Collisions:
  - Elastic: both momentum and kinetic energy conserved.
  - Inelastic: momentum conserved, kinetic energy not (some transforms to internal energy).
  - Perfectly inelastic: objects stick together.

Strategy:
1. Identify closed system and whether external forces are negligible during interaction.
2. Write conservation equations (vector form for 2D).
3. If elastic, also write energy conservation and solve the simultaneous equations.`,

        examples: [
          {
            title: "Example — Perfectly inelastic collision",
            problem: "Masses 2 kg (v=4 m/s) and 3 kg (v=−1 m/s) collide and stick. Find final speed.",
            solution: "Total momentum = 2*4 + 3*(−1) = 8 − 3 = 5 kg·m/s. Final mass = 5 kg. v_final = 5 / 5 = 1 m/s.",
            steps: [
              "Compute initial momentum for each mass, sum them.",
              "Divide by combined mass to get final velocity."
            ],
            hint: "Signs indicate direction; take right positive and left negative."
          },
          {
            title: "Example — Elastic head-on collision (1D)",
            problem: "m1 = 1 kg, u1 = 3 m/s; m2 = 2 kg, u2 = 0. Find v1 and v2 after elastic collision.",
            solution: "v1 = −1 m/s, v2 = 2 m/s",
            steps: [
              "Conserve momentum: m1 u1 + m2 u2 = m1 v1 + m2 v2 -> 3 = v1 + 2 v2.",
              "Conserve kinetic energy: 1/2 m1 u1^2 + 1/2 m2 u2^2 = 1/2 m1 v1^2 + 1/2 m2 v2^2 -> 4.5 = 0.5 v1^2 + v2^2.",
              "Solve simultaneous equations (algebra) to find v1 and v2."
            ],
            hint: "Algebra can be simplified using relative velocity relations for elastic collisions if remembered."
          },
          {
            title: "Practice — Impulse",
            problem: "A force of 50 N acts on a 0.2 kg ball for 0.1 s. What change in velocity?",
            solution: "Impulse = 50 * 0.1 = 5 N·s. Δv = J / m = 5 / 0.2 = 25 m/s.",
            steps: [
              "Compute impulse then divide by mass to get change in velocity."
            ],
            hint: "Large impulses for short times produce big Δv."
          }
        ],

        quiz: [
          { q: "In which collisions is kinetic energy conserved?", a: "Elastic collisions only." },
          { q: "What is impulse equal to?", a: "Change in momentum (Δp) = F_avg Δt." }
        ]
      },

      // 7 Rotation
      {
        explanation:
`Learning goal: draw parallels between linear motion and rotation (map variables), compute torque, and solve basic rotational dynamics.

Analogy:
- Linear: x, v, a, F, m, p.
- Rotational: θ (angle), ω (angular velocity), α (angular accel), τ (torque), I (moment of inertia), L (angular momentum).

Important relations:
- τ = r × F (magnitude τ = r F sinθ).
- τ_net = I α (rotational form of Newton's second law).
- Rotational kinetic energy: K_rot = 1/2 I ω^2.
- Moment of inertia depends on mass distribution; common shapes have standard formulas (solid disk, thin rod, etc.).

Strategy:
- Compute I for the object about the rotation axis.
- Sum torques to find α, or use energy to find ω.`,

        examples: [
          {
            title: "Example — Torque calculation",
            problem: "A 3 N force applied perpendicular to a wrench 0.2 m from bolt. Torque?",
            solution: "τ = r F = 0.2 * 3 = 0.6 N·m",
            steps: [
              "Since force is perpendicular, sinθ = 1. Multiply lever arm by force."
            ],
            hint: "If force isn't perpendicular, multiply by sin of angle between r and F."
          },
          {
            title: "Example — Rotational acceleration",
            problem: "Solid disk (I = 1/2 m r^2) of mass 2 kg and radius 0.5 m has net torque 1 N·m. Find α.",
            solution: "I = 0.5 * 2 * 0.25 = 0.25 kg·m^2. α = τ / I = 1 / 0.25 = 4 rad/s^2.",
            steps: [
              "Compute I using formula for solid disk.",
              "Apply α = τ / I."
            ],
            hint: "Units: rad/s^2 for α."
          },
          {
            title: "Practice — Rotational KE",
            problem: "A wheel (I = 0.4 kg·m^2) spins at ω = 10 rad/s. Rotational KE?",
            solution: "K = 1/2 I ω^2 = 0.5 * 0.4 * 100 = 20 J",
            steps: [
              "Plug into 1/2 I ω^2."
            ],
            hint: "Check magnitude against linear analogs to ensure plausibility."
          }
        ],

        quiz: [
          { q: "What is the rotational analog of F = m a?", a: "τ = I α" },
          { q: "Moment of inertia depends on?", a: "Mass distribution relative to the axis (shape & axis location)." }
        ]
      },

      // 8 Fluids
      {
        explanation:
`Learning goal: compute hydrostatic pressures, buoyant forces and apply continuity/Bernoulli for simple flow problems.

Key relations:
- Hydrostatic pressure: P = P0 + ρ g h (pressure increases with depth).
- Buoyant force (Archimedes): F_b = ρ_fluid V_displaced g.
- Continuity (incompressible): A1 v1 = A2 v2.
- Bernoulli (ideal flow along streamline): P + 1/2 ρ v^2 + ρ g h = constant.

Strategy:
- For pressure at depth, use difference in heights between measurement point and free surface.
- For floating objects, compare object's weight to buoyant force to find submerged fraction.`,

        examples: [
          {
            title: "Example — Hydrostatic pressure",
            problem: "Pressure 10 m below water (ρ = 1000 kg/m^3). What's gauge pressure?",
            solution: "P = ρ g h = 1000 * 9.8 * 10 = 98,000 Pa (gauge).",
            steps: [
              "Apply P = ρ g h with h measured below free surface.",
              "Add atmospheric pressure if absolute pressure required."
            ],
            hint: "Gauge pressure excludes atmospheric pressure."
          },
          {
            title: "Example — Buoyancy and floating fraction",
            problem: "A wooden block density 600 kg/m^3 floats in water. What fraction is submerged?",
            solution: "Fraction = ρ_block / ρ_water = 600 / 1000 = 0.6 (60%).",
            steps: [
              "Equate weight = buoyant force: ρ_block V g = ρ_water V_sub g -> V_sub/V = ρ_block/ρ_water."
            ],
            hint: "Works because gravitational acceleration cancels."
          },
          {
            title: "Practice — Continuity",
            problem: "Water flows through pipe narrowing from area 0.1 m^2 to 0.025 m^2. If v1 = 2 m/s, find v2.",
            solution: "A1 v1 = A2 v2 -> v2 = (0.1 * 2) / 0.025 = 8 m/s",
            steps: [
              "Use continuity: mass conservation -> area × velocity constant for incompressible fluid."
            ],
            hint: "Faster speed in narrower section."
          }
        ],

        quiz: [
          { q: "Archimedes principle states what?", a: "Buoyant force equals weight of displaced fluid." },
          { q: "Continuity equation for incompressible flow?", a: "A1 v1 = A2 v2." }
        ]
      }
    ]
  },

  // Second Semester
  {
    Session: "Second Semester",
    Topics: [
      "Circular Motion & Gravitation",
      "Simple Harmonic Motion & Waves",
      "Sound, Doppler & Standing Waves",
      "Electric Fields, Potential & DC Circuits",
      "Magnetism & Electromagnetic Induction",
      "Geometrical Optics & Wave Optics basics",
      "Modern Physics: Photons & Quantum ideas",
      "Thermodynamics: Temperature, Heat & Laws"
    ],
    Content: [
      // 1 Circular Motion & Gravitation
      {
        explanation:
`Learning goal: analyze centripetal/centrifugal dynamics and apply universal gravitation to orbital problems.

Core ideas:
- Centripetal acceleration a_c = v^2 / r = ω^2 r directed to center.
- Centripetal force F_c = m v^2 / r.
- Newton's law of universal gravitation: F = G m1 m2 / r^2.
- For circular orbits: centripetal force provided by gravity: m v^2 / r = G M m / r^2 -> v = √(G M / r).

Applications: satellite orbital speed and period, escape velocity, and gravitational potential energy (U = −G m1 m2 / r).`,

        examples: [
          {
            title: "Example — Orbital speed near Earth's surface (approx)",
            problem: "Estimate circular orbital speed v = √(GM/r) near Earth (use v ≈ 7.9 km/s known result).",
            solution: "v ≈ 7.9 km/s — use GM/R_earth approximation.",
            steps: [
              "Use v = √(GM/r) with GM ≈ 3.986e14 m^3/s^2 and r ≈ 6.37e6 m.",
              "Compute: v ≈ √(3.986e14 / 6.37e6) ≈ 7900 m/s."
            ],
            hint: "Memorize rough orbital speeds for low Earth orbit (~7.8–8 km/s)."
          },
          {
            title: "Example — Centripetal force",
            problem: "Car of mass 1000 kg takes a curve radius 50 m at 20 m/s. Required centripetal force?",
            solution: "F_c = m v^2 / r = 1000 * 400 / 50 = 8000 N",
            steps: [
              "Compute v^2 = 400, multiply by mass = 400000, divide by r = 50 -> 8000 N."
            ],
            hint: "Make sure velocity is in m/s and radius in m."
          },
          {
            title: "Practice — Escape velocity",
            problem: "Escape velocity from surface v_e = √(2GM/R). Remember Earth ~11.2 km/s.",
            solution: "v_e ≈ 11.2 km/s",
            steps: [
              "Apply formula v_e = √(2GM/R) and use Earth's GM and R values."
            ],
            hint: "Escape speed independent of mass of object escaping."
          }
        ],

        quiz: [
          { q: "Centripetal acceleration formula?", a: "a_c = v^2 / r" },
          { q: "If radius doubles and speed unchanged, centripetal acceleration?", a: "Halves (a ∝ 1/r)." }
        ]
      },

      // 2 SHM & Waves
      {
        explanation:
`Learning goal: model oscillatory systems and waves; relate physical parameters to motion.

SHM essentials:
- For mass-spring: m d^2x/dt^2 + k x = 0 -> solution x(t) = A cos(ω t + φ), ω = √(k/m).
- Period T = 2π / ω, frequency f = 1 / T.
- Energy oscillates between kinetic and potential: E_total = 1/2 k A^2.

Waves:
- Wave speed v = f λ.
- Superposition principle leads to interference and standing waves (nodes & antinodes).
- For a string fixed at both ends: λ_n = 2L / n, f_n = n v / 2L.`,

        examples: [
          {
            title: "Example — Spring period",
            problem: "Mass 0.5 kg on spring k = 200 N/m. Find period T.",
            solution: "ω = √(k/m) = √(200/0.5) = √400 = 20 rad/s. T = 2π/ω = 2π/20 = 0.314 s.",
            steps: [
              "Compute ω then period T.",
              "Check units: rad/s and seconds for period."
            ],
            hint: "Amplitude doesn't affect period for ideal SHM."
          },
          {
            title: "Example — Wave on string",
            problem: "String length 1.0 m, wave speed 100 m/s. Fundamental frequency?",
            solution: "f1 = v / (2 L) = 100 / 2 = 50 Hz.",
            steps: [
              "For fixed-fixed string, f_n = n v / 2 L. For n = 1, do above."
            ],
            hint: "Higher modes are integer multiples of fundamental frequency."
          },
          {
            title: "Practice — Superposition beats",
            problem: "Two sounds 440 Hz and 442 Hz produce beats. Beat frequency?",
            solution: "2 Hz (difference).",
            steps: [
              "Beat frequency = |f1 − f2| = 2 Hz."
            ],
            hint: "Beats are useful for tuning instruments."
          }
        ],

        quiz: [
          { q: "Period T relation with ω?", a: "T = 2π / ω" },
          { q: "Speed of wave relation?", a: "v = f λ" }
        ]
      },

      // 3 Sound & Doppler
      {
        explanation:
`Learning goal: understand Doppler shifts, intensity, and standing waves for sound.

Key formulas:
- Doppler (observer/source moving): f' = f (v ± v_o) / (v ∓ v_s) (choose sign so numerator increases frequency when observer moves toward source).
- Decibel scale: L = 10 log10(I/I0). Small multiplicative changes translate to additive dB changes.

Applications: radar, medical ultrasound, astronomy (redshift).`,

        examples: [
          {
            title: "Example — Doppler effect with moving observer",
            problem: "Observer moves toward stationary source at 10 m/s. Source frequency 1000 Hz, speed of sound 343 m/s. Observed frequency?",
            solution: "f' = 1000 * (343 + 10) / 343 ≈ 1029.2 Hz",
            steps: [
              "Use f' = f (v + v_o)/v because observer moves toward source.",
              "Compute numerator 353/343 ≈ 1.0292, multiply by 1000."
            ],
            hint: "If source moves toward stationary observer, denominator changes instead."
          },
          {
            title: "Practice — Intensity change",
            problem: "If intensity doubles, dB change?",
            solution: "ΔL = 10 log10(2) ≈ 3 dB",
            steps: [
              "Plug ratio into dB formula: 10 log10(2)."
            ],
            hint: "Small dB numbers correspond to noticeable but not huge changes."
          },
          {
            title: "Practice — Standing wave nodes",
            problem: "String fixed at both ends has length 0.5 m at fundamental mode with 256 Hz. Wave speed?",
            solution: "λ1 = 2L = 1.0 m -> v = f λ = 256 * 1 = 256 m/s",
            steps: [
              "Compute λ for n=1 and multiply by frequency."
            ],
            hint: "This is common in musical instrument physics."
          }
        ],

        quiz: [
          { q: "Formula for beat frequency when two frequencies close together?", a: "|f1 − f2|" },
          { q: "Doppler effect depends on which speeds?", a: "Speeds of source and observer relative to medium." }
        ]
      },

      // 4 Electric Fields, Potential & DC Circuits
      {
        explanation:
`Learning goal: calculate electric field and potential from point charges, and analyze simple DC circuits using Ohm's and Kirchhoff's laws.

Key relations:
- Coulomb: F = k q1 q2 / r^2, E = F / q = k q / r^2.
- Electric potential V = k q / r (scalar), work is q ΔV.
- Ohm's law: V = I R. Series: R_total = R1 + R2. Parallel: 1/R_total = 1/R1 + 1/R2.
- Kirchhoff's rules help solve loop circuits with multiple sources/resistors.

Strategy:
- Use sign conventions for potentials consistently.
- For circuits, simplify series/parallel when possible before applying Kirchhoff.`,

        examples: [
          {
            title: "Example — Electric field of point charge",
            problem: "Find magnitude of E at 0.2 m from a 2 μC charge (k = 8.99e9).",
            solution: "E = k q / r^2 = 8.99e9 * 2e-6 / 0.04 ≈ 4.495e5 N/C",
            steps: [
              "Compute r^2 = (0.2)^2 = 0.04. Plug values into E formula."
            ],
            hint: "Be careful with micro (μ) prefix: 1 μC = 1e-6 C."
          },
          {
            title: "Example — Simple circuit",
            problem: "Two resistors 4Ω and 6Ω in series on 12 V battery. Find current.",
            solution: "R_total = 10Ω, I = V / R = 12 / 10 = 1.2 A",
            steps: [
              "Add resistances in series then apply Ohm's law."
            ],
            hint: "Voltage drop across each resistor = I R_i."
          },
          {
            title: "Practice — Parallel resistors",
            problem: "Two resistors 3Ω and 6Ω in parallel. Find R_total.",
            solution: "1/R = 1/3 + 1/6 = 1/2 -> R_total = 2Ω",
            steps: [
              "Compute reciprocal sum and invert."
            ],
            hint: "Parallel reduces total resistance."
          }
        ],

        quiz: [
          { q: "Unit of electric field?", a: "N/C or V/m" },
          { q: "Ohm's law formula?", a: "V = I R" }
        ]
      },

      // 5 Magnetism & Induction
      {
        explanation:
`Learning goal: understand magnetic forces on moving charges and Faraday's law for induced EMF.

Key relations:
- Magnetic force: F = q v × B (magnitude q v B sinθ).
- Force on a current-carrying wire: F = I L × B.
- Faraday's law: ε = − dΦ_B / dt (induced EMF proportional to rate of change of magnetic flux).
- Lenz's law: induced current opposes the change in magnetic flux (sign gives direction).

Strategy:
- Use right-hand rule to get direction of force or induced current.
- For induction problems, compute flux Φ = B · A (consider angle between B and area vector).`,

        examples: [
          {
            title: "Example — Magnetic force",
            problem: "Charge q=1.6e−19 C moving at 10^6 m/s perpendicular to B=0.01 T. Force?",
            solution: "F = q v B = 1.6e-19 * 1e6 * 0.01 = 1.6e-15 N",
            steps: [
              "Multiply q, v, and B since sin90° = 1."
            ],
            hint: "Very small force on single charge but significant for currents."
          },
          {
            title: "Example — Faraday induction",
            problem: "Loop area decreases in a uniform magnetic field; compute induced emf from rate of change of area.",
            solution: "ε = B dA/dt (with sign from Lenz).",
            steps: [
              "Compute flux Φ = B A, find dΦ/dt = B dA/dt, ε = − dΦ/dt."
            ],
            hint: "Direction determined by Lenz's law."
          },
          {
            title: "Practice — Coil and changing field",
            problem: "If magnetic flux through coil increases, what is direction of induced current?",
            solution: "It creates magnetic field opposing the increase (use right-hand rule to find direction).",
            steps: [
              "Apply Lenz: induced B opposes the change so induced current direction produces that B."
            ],
            hint: "Think 'induced field fights change'."
          }
        ],

        quiz: [
          { q: "Faraday's law relates EMF to what quantity?", a: "Rate of change of magnetic flux (dΦ/dt)." },
          { q: "Lorentz force on moving charge formula?", a: "F = q (E + v × B)." }
        ]
      },

      // 6 Optics
      {
        explanation:
`Learning goal: predict image formation by lenses and mirrors and apply Snell's law for refraction.

Key formulas:
- Mirror/lens equation: 1/f = 1/do + 1/di (sign conventions matter).
- Magnification: m = −di/do for lenses/mirrors (sign indicates inverted image).
- Snell's law: n1 sinθ1 = n2 sinθ2.

Strategy:
- Draw ray diagrams to guide sign choices before computing numerically.
- Use sign conventions consistently: for thin lenses, real images often have positive di depending on convention.`,

        examples: [
          {
            title: "Example — Thin lens",
            problem: "Converging lens f=10 cm, object at 15 cm. Find image distance and magnification.",
            solution: "1/di = 1/f − 1/do = 1/10 − 1/15 = 1/30 => di = 30 cm. m = −di/do = −30/15 = −2 (inverted, twice size).",
            steps: [
              "Compute di using lens equation, then magnification.",
              "Interpret sign: negative magnification means inverted image."
            ],
            hint: "Sketch diagram to confirm result."
          },
          {
            title: "Example — Refraction angle",
            problem: "Light from air (n=1) into glass (n=1.5) at 30° incidence. Find refraction angle.",
            solution: "sinθ2 = sin30 / 1.5 = 0.5 / 1.5 ≈ 0.333 -> θ2 ≈ 19.47°",
            steps: [
              "Apply Snell's law: n1 sinθ1 = n2 sinθ2 and solve for θ2."
            ],
            hint: "If sinθ2 > 1, total internal reflection occurs (happens when light goes from high to low n)."
          },
          {
            title: "Practice — Image type",
            problem: "Object closer than focal length to converging lens — what kind of image?",
            solution: "Virtual, upright, and magnified (di negative in typical sign convention).",
            steps: [
              "Sketch rays: they diverge after lens, appear to come from virtual image on same side as object."
            ],
            hint: "This is how simple magnifiers work."
          }
        ],

        quiz: [
          { q: "Lens equation?", a: "1/f = 1/do + 1/di" },
          { q: "Snell's law formula?", a: "n1 sinθ1 = n2 sinθ2" }
        ]
      },

      // 7 Modern Physics
      {
        explanation:
`Learning goal: understand the particle nature of light, energy quantization, and basic atomic models.

Key ideas:
- Photon energy: E = h f = h c / λ.
- Photoelectric effect: light of frequency above threshold ejects electrons with K_max = h f − φ.
- Bohr model for hydrogen: E_n = −13.6 eV / n^2 (useful for energy-level calculations though replaced by quantum mechanics).
- Interpret spectra as transitions between quantized energy levels.`,

        examples: [
          {
            title: "Example — Photon energy",
            problem: "Find photon energy for λ = 500 nm in eV.",
            solution: "E = h c / λ ≈ 1240 eV·nm / 500 nm = 2.48 eV",
            steps: [
              "Use E (eV) ≈ 1240 / λ(nm). Alternatively use h = 6.626e−34 J·s then convert J -> eV."
            ],
            hint: "Useful quick constant: 1240 eV·nm."
          },
          {
            title: "Example — Photoelectric max KE",
            problem: "Work function φ = 2 eV, incident light 4 eV. K_max?",
            solution: "K_max = 4 − 2 = 2 eV",
            steps: [
              "Apply Einstein's photoelectric equation K_max = h f − φ."
            ],
            hint: "Convert energies to same units before subtracting."
          },
          {
            title: "Practice — Hydrogen spectrum",
            problem: "Photon emitted when electron falls from n=3 to n=2. Energy?",
            solution: "ΔE = E2 − E3 = (−13.6/4) − (−13.6/9) = (−3.4 + 1.511) = −1.889 eV -> photon 1.889 eV",
            steps: [
              "Compute energies and take difference; emitted photon energy is positive magnitude of ΔE."
            ],
            hint: "Wavelength from λ = 1240/ E(eV) nm if needed."
          }
        ],

        quiz: [
          { q: "Photoelectric effect supports what nature of light?", a: "Particle (photon) nature — light arrives in quanta h f." },
          { q: "Bohr energy levels scale as which power of n?", a: "1 / n^2" }
        ]
      },

      // 8 Thermodynamics
      {
        explanation:
`Learning goal: apply first law of thermodynamics, understand heat transfer modes and ideal gas relations.

Key relations:
- First law: ΔU = Q − W (internal energy change = heat added − work done by system).
- Ideal gas: PV = n R T.
- Heat capacities: For monoatomic ideal gas, C_v = 3/2 R, C_p = 5/2 R.

Strategy:
- Carefully track sign conventions for Q and W.
- For cyclic processes ΔU = 0 so Q = W (useful in engine problems).`,

        examples: [
          {
            title: "Example — Isothermal ideal gas work",
            problem: "Isothermal expansion of n = 1 mol ideal gas at T = 300 K from V1 = 0.01 m^3 to V2 = 0.02 m^3. Work done by gas?",
            solution: "W = n R T ln(V2/V1) = 1 * 8.314 * 300 * ln(2) ≈ 1728 J",
            steps: [
              "Use isothermal formula because T constant, integrate W = ∫ P dV with P = n R T / V.",
              "Compute ln(2) ≈ 0.693 and multiply."
            ],
            hint: "Sign: positive work means work done by gas on surroundings."
          },
          {
            title: "Practice — First law",
            problem: "If a system receives 500 J heat and does 200 J work, ΔU?",
            solution: "ΔU = Q − W = 500 − 200 = 300 J",
            steps: [
              "Apply ΔU = Q − W directly."
            ],
            hint: "Keep consistent sign convention for W as work done by system."
          },
          {
            title: "Practice — Ideal gas check",
            problem: "Compute pressure if 2 mol gas at 300 K occupies 0.05 m^3.",
            solution: "P = n R T / V = 2 * 8.314 * 300 / 0.05 ≈ 99,768 Pa ≈ 1.0 atm",
            steps: [
              "Plug values into ideal gas law and compute."
            ],
            hint: "Compare with ~1 atm (1.013e5 Pa) to sanity-check result."
          }
        ],

        quiz: [
          { q: "First law of thermodynamics?", a: "ΔU = Q − W" },
          { q: "Ideal gas law formula?", a: "PV = n R T" }
        ]
      }
    ]
  }
];

export default function Physics({ semester }) {
  // LessonPlayer expects courseContent and a semester string like "First Semester"
  return <LessonPlayer courseLabel="Physics 101" courseContent={PhysicsContent} semester={semester} />;
}


