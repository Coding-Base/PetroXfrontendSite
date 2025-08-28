import React from "react";
import LessonPlayer from "../shared/LessonPlayer";

/**
 * Physics.jsx
 * Expanded Physics 101 content (First & Second Semester)
 */

const PhysicsContent = [
  {
    Session: "First Semester",
    Topics: [
      "Units, Dimensions & Vector Methods",
      "Kinematics in One and Two Dimensions",
      "Forces & Newton's Laws of Motion",
      "Work, Energy & Power",
      "Linear Momentum & Collisions",
      "Rotational Motion & Torque basics",
      "Fluids: pressure, buoyancy & flow",
      "Thermal Physics: heat, specific heat & phase changes"
    ],
    Content: [
      // 1 Units & Vectors
      {
        explanation:
`Start physics with units and dimensions — they are tools to verify formulas. Dimensional analysis checks if proposed relationships are consistent. Vectors describe quantities with direction; represent them by components and use trigonometry for decomposition. Solve 2D problems by separating axes (x and y) and treating them independently.

Practice vector addition graphically and analytically (component method) to build intuition.`,
        examples: [
          {
            title: "Example — Dimensional check",
            problem: "Check if t = 2π √(l/g) has time units",
            solution: "l/g has units m/(m/s^2) = s^2; sqrt gives s and multiplied by dimensionless 2π gives seconds.",
            steps: ["Compute units inside root and take square root to confirm"]
          },
          {
            title: "Example — Component method",
            problem: "Resolve 20 N at 30° into x and y",
            solution: "Fx = 20 cos30 ≈ 17.32 N; Fy = 20 sin30 = 10 N",
            steps: ["Use cos for adjacent (x), sin for opposite (y)"]
          },
          {
            title: "Practice — Vector addition",
            problem: "Add vectors (3,4) and (−1,2)",
            solution: "(2,6) magnitude √(4 + 36)=√40 ≈ 6.32",
            steps: ["Add components and compute magnitude"]
          }
        ],
        quiz: [
          { q: "Unit of force in SI?", a: "Newton (N) = kg·m/s^2" },
          { q: "How to add vectors analytically?", a: "Add corresponding components" }
        ]
      },

      // 2 Kinematics
      {
        explanation:
`Kinematics covers displacement, velocity, and acceleration as functions of time. For constant acceleration use SUVAT equations (s = ut + 1/2 at^2, v = u + at, v^2 = u^2 + 2as). In projectile motion, treat horizontal motion with constant velocity and vertical motion with gravitational acceleration separately, then combine results.

Draw sketch, label initial conditions and use component equations reliably.`,
        examples: [
          {
            title: "Example — Projectile range",
            problem: "Projectile at 20 m/s at 45°; find range (g=9.8)",
            solution: "vx = vy = 20/√2 ≈ 14.14 m/s, time = 2 vy/g ≈ 2.887 s, range = vx * time ≈ 40.8 m",
            steps: ["Break into components, compute time using vertical motion, compute horizontal displacement"]
          },
          {
            title: "Example — SUVAT usage",
            problem: "A car accelerates from 0 to 20 m/s in 10 s. Find acceleration and distance.",
            solution: "a = 2 m/s^2, s = 1/2 * a * t^2 = 100 m",
            steps: ["Compute a = Δv/Δt then use s = ut + 1/2 a t^2"]
          },
          {
            title: "Practice — Relative motion",
            problem: "If two objects approach each other can you treat velocities additively?",
            solution: "Yes — relative speed is sum of magnitudes if opposite directions",
            steps: ["Compute relative speed and use to find closing time"]
          }
        ],
        quiz: [{ q: "Equation for displacement with constant acceleration?", a: "s = ut + 1/2 a t^2" }]
      },

      // 3 Forces & Newton
      {
        explanation:
`Newton's laws relate forces to motion. Draw free-body diagrams to identify forces (gravity, normal, friction, tension). Apply ΣF = ma in chosen directions. Friction has static and kinetic forms; static friction adjusts up to a maximum (μ_s N) and kinetic friction is μ_k N opposing motion.

For complex systems, break into components and write equations for each mass, then solve simultaneously.`,
        examples: [
          {
            title: "Example — Inclined plane with friction",
            problem: "Block on 30° incline, μ_k = 0.1, find acceleration if sliding",
            solution: "a = g sin30 − μ_k g cos30 ≈ 9.8*0.5 − 0.1*9.8*0.866 = 4.9 − 0.849 ≈ 4.051 m/s^2",
            steps: ["Resolve weight along and perpendicular to plane, subtract friction = μ_k N, divide net force by mass"]
          },
          {
            title: "Example — Tension in pulley",
            problem: "Two masses 3 kg and 1 kg connected over frictionless pulley, find acceleration",
            solution: "a = (m1 − m2) g / (m1 + m2) = (3 − 1) *9.8 / 4 = 4.9 m/s^2",
            steps: ["Write Newton's second law for each mass and eliminate tension"]
          },
          {
            title: "Practice — Normal force trick",
            problem: "A car on banked curve: how to minimize reliance on friction?",
            solution: "Bank angle provides centripetal component of normal force; design angle so horizontal component supplies required centripetal force."
          }
        ],
        quiz: [{ q: "Newton's third law statement?", a: "For every action there is an equal and opposite reaction." }]
      },

      // 4 Work, Energy & Power
      {
        explanation:
`Work equals integral of force along displacement (W = ∫ F · ds), and for constant force W = F s cos θ. Kinetic and potential energies interchange under conservative forces; conservation of mechanical energy holds if non-conservative work (friction) is negligible. Power is rate of doing work: P = W/t or P = F v.

Use energy methods when forces are conservative or when path details make force analysis messy.`,
        examples: [
          {
            title: "Example — Work by constant force",
            problem: "50 N pushes crate 4 m at 30° to direction, how much work?",
            solution: "W = F s cosθ = 50 * 4 * cos30 ≈ 50 * 4 * 0.866 = 173.2 J",
            steps: ["Multiply force by displacement and cos of angle between them"]
          },
          {
            title: "Example — Conservation energy",
            problem: "Mass 2 kg dropped from 5 m, find v before impact",
            solution: "mgh = 1/2 m v^2 -> v = sqrt(2 g h) ≈ sqrt(98) ≈ 9.9 m/s",
            steps: ["Potential energy converts to kinetic energy"]
          },
          {
            title: "Practice — Power",
            problem: "If 2000 J is done in 10 s, what is power?",
            solution: "200 W",
            steps: ["Divide energy by time"]
          }
        ],
        quiz: [{ q: "Unit of work in SI?", a: "Joule (J) = N·m" }]
      },

      // 5 Momentum & Collisions
      {
        explanation:
`Momentum p = m v is conserved in isolated systems. For collisions, use conservation of momentum; kinetic energy might or might not be conserved (elastic vs inelastic). Impulse (J = F Δt) equals change in momentum. In two-dimensional collisions, conserve momentum vectorially.

Practice solving collision problems by writing conservation equations and applying energy conservation only if elastic.`,
        examples: [
          {
            title: "Example — Inelastic collision",
            problem: "1 kg at 4 m/s collides with 2 kg at rest and they stick, find final v",
            solution: "Total momentum = 1*4 = 4 -> v = 4 / (1+2) = 4/3 m/s",
            steps: ["Compute total momentum and divide by combined mass"]
          },
          {
            title: "Example — Elastic collision 1D",
            problem: "Use conservation of momentum and kinetic energy to solve for velocities",
            solution: "Set up two equations and solve simultaneously (algebra needed)",
            steps: ["Write m1 u1 + m2 u2 = m1 v1 + m2 v2 and 1/2 m1 u1^2 + 1/2 m2 u2^2 = 1/2 m1 v1^2 + 1/2 m2 v2^2"]
          },
          {
            title: "Practice — Impulse",
            problem: "If force 20 N applied for 0.2 s to mass 2 kg initially at rest, final velocity?",
            solution: "Impulse = 20*0.2 = 4 N·s -> Δp = 4 -> v = 4/2 = 2 m/s",
            steps: ["Compute impulse → change in momentum → final velocity"]
          }
        ],
        quiz: [{ q: "If external net force is zero, momentum is?", a: "Conserved (constant)" }]
      },

      // 6 Rotational Motion & Torque basics
      {
        explanation:
`Rotational analogues: angular displacement θ (rad), angular velocity ω, angular acceleration α. Torque τ = r × F causes rotational acceleration: τ = I α (I is moment of inertia). For extended bodies, compute I by integrating mass distribution or recall standard forms (rod, disk).

Practice by mapping linear to rotational variables and using conservation of angular momentum when no external torque acts.`,
        examples: [
          {
            title: "Example — Torque",
            problem: "Calculate torque of 10 N force applied at 0.5 m perpendicular to lever",
            solution: "τ = r F = 0.5 * 10 = 5 N·m",
            steps: ["Multiply force by perpendicular lever arm"]
          },
          {
            title: "Example — Rotational kinetic energy",
            problem: "K_rot = 1/2 I ω^2 for rotating rigid body",
            solution: "Compute I for object and plug in ω",
            steps: ["Identify shape and use table of moments then compute energy"]
          },
          {
            title: "Practice — Angular momentum",
            problem: "Figure skater pulls arms in (reducing I); what happens to ω?",
            solution: "ω increases to conserve angular momentum L = I ω",
            steps: ["Explain trade-off between moment of inertia and angular velocity"]
          }
        ],
        quiz: [{ q: "Torque units?", a: "N·m (same as Joule but conceptually torque)" }]
      },

      // 7 Fluids
      {
        explanation:
`Pressure in fluids: P = ρ g h for hydrostatic situations. Buoyancy equals weight of displaced fluid (Archimedes' principle): F_b = ρ_fluid V_displaced g. Continuity equation A1 v1 = A2 v2 for incompressible flow and Bernoulli's principle relates pressure, kinetic, potential energy along streamline: P + 1/2 ρ v^2 + ρ g h = constant (ideal conditions, no viscosity).

Practice by tracing water column pressures and applying mass conservation in pipes.`,
        examples: [
          {
            title: "Example — Hydrostatic pressure",
            problem: "Pressure at depth 10 m in freshwater (ρ=1000 kg/m^3)",
            solution: "P = 1000*9.8*10 = 98,000 Pa (plus atmospheric)",
            steps: ["Multiply density, g and depth"]
          },
          {
            title: "Example — Buoyancy",
            problem: "Will a block of density 800 kg/m^3 float in water?",
            solution: "Yes — density less than water implies float; fraction submerged ≈ 0.8",
            steps: ["Compare densities and compute displaced volume fraction"]
          },
          {
            title: "Practice — Bernoulli",
            problem: "Why plane wings create lift? (qualitative)",
            solution: "Pressure difference created by faster flow above wing vs below creates net upward force (Bernoulli along streamline approximation).",
            steps: ["Connect faster speed to lower pressure and net force"]
          }
        ],
        quiz: [{ q: "What is Archimedes' principle?", a: "Buoyant force equals weight of fluid displaced" }]
      },

      // 8 Thermal Physics
      {
        explanation:
`Heat transfer modes: conduction (through materials), convection (via fluid motion), radiation (electromagnetic). Specific heat capacity c quantifies energy needed to raise unit mass by 1°C (q = m c ΔT). Phase changes involve latent heat q = m L with no temperature change. Thermodynamics introduces internal energy, heat, work and the laws governing them (zeroth, first, second law basics).

Practice by tracking energy flow and sign conventions for heat/work.`,
        examples: [
          {
            title: "Example — Specific heat calc",
            problem: "Energy to heat 0.5 kg of water from 20°C to 80°C (c=4186 J/kg·K)",
            solution: "q = m c ΔT = 0.5 * 4186 * 60 = 125,580 J",
            steps: ["Multiply mass, specific heat, temperature change"]
          },
          {
            title: "Example — Latent heat",
            problem: "How much energy to vaporize 10 g of water at 100°C (L_vapor = 2260 J/g)?",
            solution: "q = 10 * 2260 = 22,600 J",
            steps: ["Multiply mass by latent heat"]
          },
          {
            title: "Practice — Combined steps",
            problem: "Heat 50 g ice at −10°C to water at 30°C: steps?",
            solution: "Heat ice to 0°C (q1), melt (q2), heat water to 30°C (q3) and sum",
            steps: ["Compute each stage q = m c ΔT / m L + m c ΔT"]
          }
        ],
        quiz: [{ q: "Unit of specific heat?", a: "J/kg·K" }]
      }
    ]
  },

  // Second Semester
  {
    Session: "Second Semester",
    Topics: [
      "Circular motion & Gravitation",
      "Simple Harmonic Motion & Waves",
      "Sound & Doppler effect",
      "Electric fields & circuits (DC)",
      "Magnetism & Electromagnetic induction",
      "Optics: reflection, refraction & lenses",
      "Modern Physics: Photoelectric effect & atomic models",
      "Thermal & Statistical physics intro"
    ],
    Content: [
      // 1 Circular & Gravitation
      {
        explanation:
`Circular motion requires centripetal acceleration a_c = v^2 / r directed toward center; centripetal force F = m v^2 / r. Gravitation follows Newton's law F = G m1 m2 / r^2 describing mutual attraction and pointing to orbital dynamics (Kepler's laws and escape velocity). When working with orbits, convert between orbital speed, period, and radius carefully.`,
        examples: [
          {
            title: "Example — Centripetal accel",
            problem: "Find a_c for v=10 m/s, r=5 m",
            solution: "a_c = v^2/r = 100/5 = 20 m/s^2",
            steps: ["Square speed and divide by radius"]
          },
          {
            title: "Example — Orbital speed",
            problem: "Speed of satellite in circular orbit: v = √(GM/r)",
            solution: "Plug values for Earth mass and radius-distance to compute v",
            steps: ["Use gravitational parameter GM and radius of orbit"]
          },
          {
            title: "Practice — Escape velocity",
            problem: "v_escape = √(2GM/R). Estimate for Earth",
            solution: "≈ 11.2 km/s",
            steps: ["Plug Earth parameters or memorize standard result"]
          }
        ],
        quiz: [{ q: "Formula for centripetal force?", a: "F = m v^2 / r" }]
      },

      // 2 SHM & Waves
      {
        explanation:
`Simple harmonic motion (SHM) is oscillatory motion like mass-spring (x(t) = A cos ωt). Energy oscillates between potential and kinetic. Waves transfer energy: characterize by wavelength λ, frequency f, period T, and speed v = f λ. Superposition leads to interference patterns; standing waves result from superposition of oppositely travelling waves.

Practice by solving for ω and period for springs and pendulums (small-angle approximation).`,
        examples: [
          {
            title: "Example — Mass-spring period",
            problem: "T = 2π √(m/k) for mass m=0.5 kg and k=200 N/m",
            solution: "T ≈ 2π √(0.5/200) ≈ 0.314 s",
            steps: ["Compute square root then multiply by 2π"]
          },
          {
            title: "Example — Wave calculations",
            problem: "If f=500 Hz and λ=0.68 m, find speed",
            solution: "v = f λ = 500 * 0.68 = 340 m/s",
            steps: ["Multiply frequency by wavelength"]
          },
          {
            title: "Practice — Interference",
            problem: "Two-source constructive interference conditions",
            solution: "Path difference = n λ (integer multiple)",
            steps: ["Use path difference rule to locate maxima"]
          }
        ],
        quiz: [{ q: "Relationship between frequency and period?", a: "f = 1/T" }]
      },

      // 3 Sound & Doppler
      {
        explanation:
`Sound is longitudinal mechanical wave; pitch relates to frequency. The Doppler effect shifts perceived frequency when source or observer moves: f' = f (v ± v_o)/(v ∓ v_s) (choose signs carefully). Applications include radar, astronomy (redshift/blueshift), and medical imaging.`,
        examples: [
          {
            title: "Example — Doppler shift",
            problem: "Observer moving towards source at 10 m/s, source stationary, f=1000 Hz, v=343 m/s",
            solution: "f' = f*(v+v_o)/v = 1000*(343+10)/343 ≈ 1029 Hz",
            steps: ["Add observer speed to numerator as approaching"]
          },
          {
            title: "Example — Sound intensity",
            problem: "Change in dB when intensity doubles",
            solution: "ΔL = 10 log10(2) ≈ 3 dB",
            steps: ["Use decibel formula 10 log(I2/I1)"]
          },
          {
            title: "Practice — Beats",
            problem: "Two tones 440 Hz and 442 Hz produce beat frequency?",
            solution: "2 Hz",
            steps: ["Beat frequency = difference in frequencies"]
          }
        ],
        quiz: [{ q: "What speed of sound approx at 20°C in air?", a: "≈ 343 m/s" }]
      },

      // 4 Electric fields & DC circuits
      {
        explanation:
`Electric fields produce forces on charges: E = F/q. Electric potential (voltage) is potential energy per unit charge. For circuits, Ohm's law V = IR relates voltage, current, and resistance; series and parallel combinations determine total resistance. Kirchhoff's laws (junction and loop rules) handle complex circuits.

Practice solving circuit networks: simplify series/parallel blocks then apply loop/junction equations.`,
        examples: [
          {
            title: "Example — Field between plates",
            problem: "Uniform field E = V/d with V=100 V, d=0.01 m",
            solution: "E = 100 / 0.01 = 10000 V/m",
            steps: ["Divide voltage by distance"]
          },
          {
            title: "Example — Series resistors",
            problem: "R_total of 5Ω and 10Ω in series",
            solution: "R_total = 15Ω",
            steps: ["Add resistances in series"]
          },
          {
            title: "Practice — Kirchhoff",
            problem: "Solve simple loop with two sources and resistors",
            solution: "Write loop equation summing voltage rises and drops = 0 and solve for unknown current",
            steps: ["Be careful with sign conventions"]
          }
        ],
        quiz: [{ q: "Unit of resistance?", a: "Ohm (Ω)" }]
      },

      // 5 Magnetism & Induction
      {
        explanation:
`Moving charges create magnetic fields; charges moving in magnetic fields feel Lorentz force F = q v × B. Changing magnetic flux induces EMF (Faraday's law): ε = −dΦ/dt. Inductance stores energy in magnetic fields (U = 1/2 L I^2). Applications range from transformers to motors and generators.`,
        examples: [
          {
            title: "Example — Magnetic force",
            problem: "Charge q=1 C moving at 5 m/s perpendicular to B=0.2 T, find force",
            solution: "F = q v B = 1 * 5 * 0.2 = 1 N",
            steps: ["Multiply q, v, B when perpendicular; include direction via right-hand rule"]
          },
          {
            title: "Example — Faraday's law",
            problem: "A loop area changes causing ΔΦ, compute induced emf",
            solution: "ε = −dΦ/dt; plug in numbers for flux change rate",
            steps: ["Compute flux as B·A and differentiate w.r.t time"]
          },
          {
            title: "Practice — Lenz's law",
            problem: "Direction of induced current opposes change in flux. Use right-hand rule to find sign.",
            solution: "Apply Lenz's qualitative rule to pick direction."
          }
        ],
        quiz: [{ q: "What does Faraday's law relate?", a: "Changing magnetic flux to induced EMF" }]
      },

      // 6 Optics
      {
        explanation:
`Geometrical optics: reflection follows angle of incidence equals angle of reflection. Refraction follows Snell's law n1 sinθ1 = n2 sinθ2 and leads to lens focusing behavior. Use ray diagrams to locate images produced by mirrors and lenses (real vs virtual, magnification).

Practice sketching rays for convex/concave lenses and computing image distances via lens equation 1/f = 1/do + 1/di.`,
        examples: [
          {
            title: "Example — Snell's law",
            problem: "Light from air (n=1) to water (n=1.33) at 30° incidence, find refraction angle",
            solution: "sinθ2 = sin30/1.33 = 0.5/1.33 = 0.375 -> θ2 ≈ 22.0°",
            steps: ["Apply n1 sinθ1 = n2 sinθ2 and solve for θ2"]
          },
          {
            title: "Example — Lens equation",
            problem: "Converging lens f=10 cm object at 15 cm, image distance?",
            solution: "1/10 = 1/15 + 1/di => 1/di = 1/10 − 1/15 = (3−2)/30 = 1/30 => di = 30 cm (real inverted image)",
            steps: ["Use lens formula 1/f = 1/do + 1/di"]
          },
          {
            title: "Practice — Magnification",
            problem: "Compute magnification m = −di/do with previous numbers",
            solution: "m = −30/15 = −2 (image twice size inverted)",
            steps: ["Compute ratio and interpret sign"]
          }
        ],
        quiz: [{ q: "Snell's law equation?", a: "n1 sinθ1 = n2 sinθ2" }]
      },

      // 7 Modern Physics
      {
        explanation:
`Modern physics introduces quantum phenomena. Photoelectric effect supports particle nature of light: light above threshold frequency ejects electrons with kinetic energy K_max = hf − φ. Atomic models evolved from Bohr (discrete energy levels) to quantum mechanical orbitals with probability distributions.

Understand concepts qualitatively and practice energy quantization calculations using E = hf and E_n formulas for hydrogen-like atoms.`,
        examples: [
          {
            title: "Example — Photoelectric",
            problem: "If incident photon energy is 5 eV and work function φ = 2 eV, K_max?",
            solution: "K_max = 5 − 2 = 3 eV",
            steps: ["Subtract work function from photon energy to get kinetic energy of ejected electron"]
          },
          {
            title: "Example — Bohr atom",
            problem: "Energy of n=2 level in hydrogen (E_n = −13.6 eV / n^2)",
            solution: "E2 = −13.6 / 4 = −3.4 eV",
            steps: ["Plug n into formula"]
          },
          {
            title: "Practice — Photoelectric threshold",
            problem: "Find threshold frequency for a metal with φ = 4 eV",
            solution: "f_threshold = φ/h ~ 4 eV/(4.136e−15 eV·s) ≈ 9.67e14 Hz",
            steps: ["Use Planck's constant and energy->frequency conversion"]
          }
        ],
        quiz: [{ q: "Einstein's photoelectric equation?", a: "K_max = hf − φ" }]
      },

      // 8 Thermal & Statistical intro
      {
        explanation:
`Statistics in physics links microscopic states to macroscopic properties: temperature relates to average kinetic energy; Boltzmann distribution gives probability of states at given energy. Familiarity with Maxwell-Boltzmann distributions and thermodynamic ensembles is groundwork for advanced thermodynamics.

Practice by relating particle speed distributions to temperature qualitatively and applying ideal gas relations for macroscopic predictions.`,
        examples: [
          {
            title: "Example — Average kinetic energy",
            problem: "Average translational KE per particle = 3/2 k_B T",
            solution: "For given T compute average energy using Boltzmann constant k_B",
            steps: ["Multiply 1.5 by k_B and temperature in K"]
          },
          {
            title: "Example — Maxwell speed",
            problem: "Higher T -> effect on speed distribution?",
            solution: "Distribution broadens and peak shifts to higher speeds",
            steps: ["Relate thermal energy to speed distribution shape"]
          },
          {
            title: "Practice — Entropy conceptually",
            problem: "Why does entropy increase in spontaneous processes?",
            solution: "Because more microstates become accessible; systems evolve toward macrostates with maximal multiplicity",
            steps: ["Use statistical idea of microstate counting"]
          }
        ],
        quiz: [{ q: "Average KE ∝ what variable?", a: "Temperature (T)" }]
      }
    ]
  }
];

export default function Physics({ semester }) {
  return <LessonPlayer courseLabel="Physics 101" courseContent={PhysicsContent} semester={semester} />;
}
