import React from "react";
import LessonPlayer from "../shared/LessonPlayer";

/**
 * Physics.jsx
 * Comprehensive University Physics 101 Content.
 * Features:
 * - Pedagogical narrative (Why? How? Watch out!)
 * - Strategic use of visual aids via  tags.
 * - Standardized symbols and step-by-step logic.
 * - Conceptual bridging between topics.
 */

const PhysicsContent = [
  {
    Session: "First Semester",
    Topics: [
      "Measurement, Vectors & Dimensional Analysis",
      "Kinematics: Motion in 1D & 2D",
      "Newton's Laws & Free Body Diagrams",
      "Work, Energy & Power",
      "Linear Momentum & Collisions",
      "Rotational Motion & Torque",
      "Equilibrium & Elasticity",
      "Fluid Mechanics"
    ],
    Content: [
      // 1. Measurement & Vectors
      {
        explanation: `Physics is the art of approximation and the science of measurement. Before we calculate, we must ensure our dimensions make sense. If you equate Length to Time, you have already failed. Always check your units (Dimensional Analysis).



Vectors are the language of motion. You cannot simply add 5m North and 5m East to get 10m. You must use the Pythagorean theorem. Any vector V at angle θ can—and usually should—be broken into component parts:
* Vx = V cos(θ)
* Vy = V sin(θ)
We solve physics problems in the x-world and y-world separately, then combine them at the end.`,
        examples: [
          {
            title: "Example — Dimensional Consistency",
            problem: "Which formula for period T is physically possible: T = 2π√(g/L) or T = 2π√(L/g)?",
            solution: "T = 2π√(L/g)",
            steps: [
              "L has units of [L] (meters).",
              "g has units of [L]/[T]² (m/s²).",
              "Option 1: √(g/L) = √([L]/[T]² / [L]) = √(1/[T]²) = 1/[T]. Units: Hz (Frequency). Wrong.",
              "Option 2: √(L/g) = √([L] / ([L]/[T]²)) = √([T]²) = [T]. Units: Seconds. Correct."
            ]
          },
          {
            title: "Example — Vector Addition",
            problem: "A hiker walks 3 km East, then 4 km North. Find resultant displacement.",
            solution: "5 km at 53.1° North of East",
            steps: [
              "Draw components: x = 3, y = 4.",
              "Magnitude R = √(3² + 4²) = 5 km.",
              "Direction θ = arctan(opposite/adjacent) = arctan(4/3) ≈ 53.1°."
            ]
          },
          {
            title: "Example — Relative Velocity",
            problem: "A plane flies 100 m/s North. Wind blows 20 m/s East. Ground speed?",
            solution: "102 m/s",
            steps: [
              "Vectors are perpendicular.",
              "V_total = √(100² + 20²) = √(10000 + 400) = √10400 ≈ 101.98 m/s."
            ]
          }
        ],
        quiz: [
          { q: "Is 'Speed' a scalar or vector?", a: "Scalar (magnitude only). Velocity is the vector." },
          { q: "What is the unit of Force in base SI units?", a: "kg·m/s² (Newton)" }
        ]
      },

      // 2. Kinematics
      {
        explanation: `Kinematics describes *how* things move, not *why*.
        
For constant acceleration, we rely on the "Big Three" kinematic equations. 
1. v = v₀ + at
2. x = x₀ + v₀t + ½at²
3. v² = v₀² + 2a(Δx)



For Projectile Motion, the secret is independence of axes.
* Horizontal motion is constant velocity (a_x = 0).
* Vertical motion is free fall (a_y = -g).
They share only one variable: **Time (t)**. Solve for t in one dimension to unlock the other.`,
        examples: [
          {
            title: "Example — Free Fall",
            problem: "A stone is dropped from 45m. How long to hit the ground? (g=10 m/s²)",
            solution: "3 seconds",
            steps: [
              "Use x = x₀ + v₀t + ½at².",
              "Take down as positive. x = 45, v₀ = 0, a = 10.",
              "45 = 0 + ½(10)t² -> 45 = 5t².",
              "t² = 9 -> t = 3s."
            ]
          },
          {
            title: "Example — Projectile Range",
            problem: "Ball kicked at 20 m/s at 30°. How far does it travel? (g=10)",
            solution: "34.6 meters",
            steps: [
              "Break V into components: Vx = 20cos30 ≈ 17.3, Vy = 20sin30 = 10.",
              "Find time to top: Vy_final = 0. 0 = 10 - 10t -> t_up = 1s.",
              "Total flight time = 2s.",
              "Range = Vx * total_time = 17.3 * 2 = 34.6m."
            ]
          },
          {
            title: "Example — Stopping Distance",
            problem: "Car moving at 30 m/s brakes at -5 m/s². Distance to stop?",
            solution: "90 meters",
            steps: [
              "Use v² = v₀² + 2a(Δx).",
              "0 = 30² + 2(-5)Δx.",
              "0 = 900 - 10Δx.",
              "10Δx = 900 -> Δx = 90m."
            ]
          }
        ],
        quiz: [
          { q: "In projectile motion, what is the acceleration at the very top of the arc?", a: "Still g (9.8 m/s² down). Gravity never turns off." },
          { q: "What does the slope of a Velocity-Time graph represent?", a: "Acceleration." }
        ]
      },

      // 3. Newton's Laws
      {
        explanation: `Now we ask *why* things move. Forces.
        
1. **Inertia:** Objects keep doing what they're doing unless forced otherwise.
2. **F = ma:** The most important equation in mechanics. Net Force causes Acceleration.
3. **Action-Reaction:** Forces come in pairs acting on *different* objects.



[Image of free body diagram block on incline]


The Free Body Diagram (FBD) is your most powerful tool.
1. Draw the object as a dot.
2. Draw every force vector acting *on* it (Gravity, Normal, Friction, Tension).
3. Sum the forces in x and y components.
4. Set ΣF = ma.`,
        examples: [
          {
            title: "Example — Tension in Elevator",
            problem: "A 1000kg elevator accelerates upward at 2 m/s². Find cable tension. (g=10)",
            solution: "12,000 N",
            steps: [
              "Forces: Tension (T) up, Weight (mg) down.",
              "ΣF = ma -> T - mg = ma.",
              "T = m(g + a) = 1000(10 + 2) = 12,000 N.",
              "Note: Tension is higher than weight because it must accelerate mass upward."
            ]
          },
          {
            title: "Example — Inclined Plane (Frictionless)",
            problem: "Box slides down 30° ramp. Find acceleration.",
            solution: "5 m/s²",
            steps: [
              "Rotate axes so x is down the ramp.",
              "Gravity component pulling down ramp: Fg_x = mg sin(30).",
              "ΣF = ma -> mg sin(30) = ma.",
              "a = g sin(30) = 10 * 0.5 = 5 m/s²."
            ]
          },
          {
            title: "Example — Static Friction",
            problem: "Box (10kg) rests on floor (μs = 0.5). What horizontal force moves it?",
            solution: "> 50 N",
            steps: [
              "Calculate Normal force: N = mg = 10(10) = 100 N.",
              "Max Static Friction: f_max = μs * N = 0.5 * 100 = 50 N.",
              "You must exceed 50 N to start motion."
            ]
          }
        ],
        quiz: [
          { q: "If you push a wall, does the wall push back?", a: "Yes, with equal force (Newton's 3rd Law)." },
          { q: "Is the Normal force always equal to mg?", a: "No. (e.g., on a ramp, N = mg cosθ)." }
        ]
      },

      // 4. Work & Energy
      {
        explanation: `Solving problems with F=ma is hard if forces change (like a spring). Energy is often easier because it is a scalar—direction doesn't matter, only the state.



* **Work (W)** is the transfer of energy: W = F·d·cos(θ).
* **Kinetic Energy (K):** ½mv².
* **Potential Energy (U):** mgh (gravity) or ½kx² (springs).

**Conservation of Energy:** In a closed system with no friction, E_initial = E_final. If there is friction, E_initial + Work_friction = E_final.`,
        examples: [
          {
            title: "Example — Roller Coaster",
            problem: "Cart drops from 20m height. Speed at bottom? (g=10)",
            solution: "20 m/s",
            steps: [
              "Potential at top = Kinetic at bottom.",
              "mgh = ½mv² (mass cancels!).",
              "v = √(2gh) = √(2 * 10 * 20) = √400 = 20 m/s."
            ]
          },
          {
            title: "Example — Work by Friction",
            problem: "Box slides 5m on floor with friction force 10N. Work done?",
            solution: "-50 J",
            steps: [
              "Friction acts opposite to motion (180°).",
              "W = F * d * cos(180) = 10 * 5 * (-1) = -50 J.",
              "Negative work means energy is removed from the system (heat)."
            ]
          },
          {
            title: "Example — Power",
            problem: "An engine does 1000 J of work in 2 seconds. Wattage?",
            solution: "500 Watts",
            steps: [
              "Power = Work / Time.",
              "P = 1000 / 2 = 500 W."
            ]
          }
        ],
        quiz: [
          { q: "Does carrying a heavy bag while walking at constant speed do work on the bag?", a: "No. Force (up) is perpendicular to displacement (forward). cos(90) = 0." },
          { q: "Can Kinetic Energy be negative?", a: "No. Mass and v² are always positive." }
        ]
      },

      // 5. Momentum
      {
        explanation: `Momentum (p = mv) is "inertia in motion". Unlike energy, momentum is a Vector.
        
**Impulse:** A change in momentum caused by a force over time (FΔt = Δp). This is why airbags save lives—they increase Δt, reducing the Force F required to stop you.
        
**Conservation:** In a collision with no external forces, Total P_in = Total P_out.
* **Elastic:** Bounce. KE is conserved.
* **Inelastic:** Stick/Deform. KE is lost to heat/sound.`,
        examples: [
          {
            title: "Example — Inelastic Collision",
            problem: "Car A (1000kg, 20m/s) hits stopped Car B (1000kg). They stick. Speed?",
            solution: "10 m/s",
            steps: [
              "P_initial = (1000*20) + (1000*0) = 20,000.",
              "P_final = (2000) * v_final.",
              "20,000 = 2000v -> v = 10 m/s."
            ]
          },
          {
            title: "Example — Recoil",
            problem: "Cannon (500kg) fires ball (5kg) at 100 m/s. Cannon recoil speed?",
            solution: "-1 m/s",
            steps: [
              "Initial momentum = 0.",
              "0 = (5 * 100) + (500 * v_cannon).",
              "500 + 500v = 0 -> v = -1 m/s (backward)."
            ]
          },
          {
            title: "Example — Impulse",
            problem: "Bat hits ball (0.1kg) changing velocity from -20m/s to +30m/s. Impulse?",
            solution: "5 N·s",
            steps: [
              "Δp = m(v_final - v_initial).",
              "Δp = 0.1(30 - (-20)) = 0.1(50) = 5 N·s."
            ]
          }
        ],
        quiz: [
          { q: "Is momentum conserved in a car crash?", a: "Yes, momentum is always conserved in collisions. Kinetic Energy is not." },
          { q: "Why do rifles have 'kick'?", a: "Conservation of momentum (Recoil)." }
        ]
      }
    ]
  },

  // ----------------------------------------------------
  // SECOND SEMESTER
  // ----------------------------------------------------
  {
    Session: "Second Semester",
    Topics: [
      "Electric Force & Fields",
      "Electric Potential & Capacitance",
      "DC Circuits & Kirchhoff's Rules",
      "Magnetism & Induction",
      "Simple Harmonic Motion (SHM)",
      "Waves & Sound",
      "Optics (Reflection/Refraction)",
      "Thermodynamics Laws"
    ],
    Content: [
      // 1. Electrostatics
      {
        explanation: `We move from Mass to Charge. 
* Like charges repel, opposites attract.
* **Coulomb's Law:** F = k(q1*q2)/r². It looks exactly like Gravity, but much stronger.



[Image of electric field lines positive and negative charge]


The **Electric Field (E)** is the "force field" created by a charge. F = qE.
The **Electric Potential (V)** is the "energy landscape". Positive charges roll "downhill" (to lower V), negative charges roll "uphill".`,
        examples: [
          {
            title: "Example — Coulomb Force",
            problem: "Force between +1C and -1C separated by 1m? (k ≈ 9e9)",
            solution: "9 x 10^9 N (Attractive)",
            steps: [
              "F = k|q1q2|/r².",
              "F = 9e9 * (1*1) / 1² = 9e9 N.",
              "Attractive because signs are opposite."
            ]
          },
          {
            title: "Example — Field from Point Charge",
            problem: "E-field 2m from a 4μC charge?",
            solution: "9000 N/C",
            steps: [
              "E = kq/r².",
              "E = (9e9 * 4e-6) / 2².",
              "E = 36000 / 4 = 9000 N/C."
            ]
          },
          {
            title: "Example — Acceleration of Proton",
            problem: "Proton (m=1.67e-27, q=1.6e-19) in E=100 N/C field.",
            solution: "~9.6 x 10^9 m/s²",
            steps: [
              "F = qE = 1.6e-19 * 100 = 1.6e-17 N.",
              "a = F/m = 1.6e-17 / 1.67e-27 ≈ 9.58e9 m/s²."
            ]
          }
        ],
        quiz: [
          { q: "Is Electric Field a vector?", a: "Yes. It points away from positive sources." },
          { q: "What is the unit of Potential?", a: "Volt (Joules per Coulomb)." }
        ]
      },

      // 2. DC Circuits
      {
        explanation: `Current (I) is the flow of charge. Voltage (V) is the pressure pushing it. Resistance (R) is the friction fighting it.
**Ohm's Law:** V = IR.



[Image of series and parallel circuit diagrams]


* **Series:** One path. R_total = R1 + R2. Current is constant.
* **Parallel:** Multiple paths. 1/R_total = 1/R1 + 1/R2. Voltage is constant.
Use Kirchhoff's Loop Rule (Conservation of Energy) and Junction Rule (Conservation of Charge) for complex circuits.`,
        examples: [
          {
            title: "Example — Series Circuit",
            problem: "12V battery, two 6Ω resistors in series. Current?",
            solution: "1 A",
            steps: [
              "R_total = 6 + 6 = 12Ω.",
              "I = V / R_total = 12 / 12 = 1 A."
            ]
          },
          {
            title: "Example — Parallel Circuit",
            problem: "12V battery, two 6Ω resistors in parallel. Total Current?",
            solution: "4 A",
            steps: [
              "1/R_eq = 1/6 + 1/6 = 2/6 = 1/3 -> R_eq = 3Ω.",
              "I_total = 12 / 3 = 4 A.",
              "Or add branch currents: I1=12/6=2A, I2=12/6=2A. Total=4A."
            ]
          },
          {
            title: "Example — Power Dissipated",
            problem: "Current 2A flows through 5Ω resistor. Power?",
            solution: "20 Watts",
            steps: [
              "P = I²R.",
              "P = (2)² * 5 = 4 * 5 = 20 W."
            ]
          }
        ],
        quiz: [
          { q: "If you add a resistor in parallel, does total resistance go up or down?", a: "Down. You added another lane for traffic to flow." },
          { q: "What is a short circuit?", a: "A path with near-zero resistance, causing dangerous high current." }
        ]
      },

      // 3. Magnetism
      {
        explanation: `Magnetic fields (B) are created by moving charges (currents). 
        


[Image of right hand rule magnetic force]


**Lorentz Force:** F = qvB sin(θ).
* A stationary charge feels NO magnetic force.
* The force is perpendicular to velocity (Right Hand Rule). This causes charged particles to spiral in circles.

**Induction (Faraday's Law):** A changing magnetic field creates a voltage. This is how generators work. ε = -dΦ/dt.`,
        examples: [
          {
            title: "Example — Force on Wire",
            problem: "2m wire carrying 5A perpendicular to 0.1T field. Force?",
            solution: "1 N",
            steps: [
              "F = I * L * B * sin(θ).",
              "F = 5 * 2 * 0.1 * 1 = 1 N."
            ]
          },
          {
            title: "Example — Cyclotron Radius",
            problem: "Electron moving in B field. What provides centripetal force?",
            solution: "Magnetic Force",
            steps: [
              "F_magnetic = F_centripetal.",
              "qvB = mv²/r.",
              "Radius r = mv / qB."
            ]
          },
          {
            title: "Example — Induction",
            problem: "Flux changes from 10Wb to 2Wb in 2 seconds. EMF?",
            solution: "4 Volts",
            steps: [
              "dΦ = 2 - 10 = -8 Wb.",
              "ε = -dΦ/dt = -(-8) / 2 = 4 V."
            ]
          }
        ],
        quiz: [
          { q: "Do magnetic field lines start and end?", a: "No, they form closed loops (North to South outside magnet)." },
          { q: "Can a magnetic field do work on a particle?", a: "No. The force is always perpendicular to motion." }
        ]
      },

      // 4. SHM & Waves
      {
        explanation: `Simple Harmonic Motion (SHM) occurs when a restoring force is proportional to displacement (F = -kx).
        


[Image of simple harmonic motion mass spring system]


* **Springs:** Period T = 2π√(m/k).
* **Pendulums:** Period T = 2π√(L/g).
Notice mass doesn't matter for the pendulum!

Waves transport energy, not matter. v = fλ.
* **Transverse:** Displacement perpendicular to wave (Light).
* **Longitudinal:** Displacement parallel to wave (Sound).`,
        examples: [
          {
            title: "Example — Pendulum on Moon",
            problem: "L=1m pendulum on Earth (T=2s). On Moon (g/6), what is T?",
            solution: "≈ 4.9 seconds",
            steps: [
              "T ∝ 1/√g.",
              "If g decreases by factor of 6, T increases by factor √6.",
              "T_moon = 2 * √6 ≈ 2 * 2.45 = 4.9s."
            ]
          },
          {
            title: "Example — Wave Speed",
            problem: "Frequency 440 Hz, Wavelength 0.78m. Speed?",
            solution: "343.2 m/s",
            steps: [
              "v = fλ.",
              "v = 440 * 0.78 ≈ 343 m/s (Speed of sound)."
            ]
          },
          {
            title: "Example — Spring Energy",
            problem: "Spring stretched 0.1m (k=100 N/m). Energy stored?",
            solution: "0.5 J",
            steps: [
              "U = ½kx².",
              "U = 0.5 * 100 * (0.1)² = 50 * 0.01 = 0.5 J."
            ]
          }
        ],
        quiz: [
          { q: "If you double the amplitude of a pendulum, does the Period change?", a: "No (for small angles, T is independent of Amplitude)." },
          { q: "What happens when two waves overlap?", a: "Interference (Constructive or Destructive)." }
        ]
      },

      // 5. Optics
      {
        explanation: `Optics is the study of light as rays.
        


[Image of ray diagram convex lens]


1. **Reflection:** Angle of Incidence = Angle of Reflection.
2. **Refraction:** Light bends when changing speed (Snell's Law: n1 sinθ1 = n2 sinθ2).
3. **Lenses/Mirrors:** 1/f = 1/do + 1/di.
   * Real images (can be projected on screen) have positive di.
   * Virtual images (in the mirror) have negative di.`,
        examples: [
          {
            title: "Example — Snell's Law",
            problem: "Light from air (n=1) to water (n=1.33) at 45°. Refraction angle?",
            solution: "32.1°",
            steps: [
              "1 * sin(45) = 1.33 * sin(θ2).",
              "0.707 / 1.33 = sin(θ2) ≈ 0.53.",
              "θ2 = arcsin(0.53) ≈ 32.1°."
            ]
          },
          {
            title: "Example — Convex Lens",
            problem: "Object 20cm from lens (f=10cm). Image location?",
            solution: "20 cm (Real, Inverted)",
            steps: [
              "1/10 = 1/20 + 1/di.",
              "1/di = 1/10 - 1/20 = 1/20.",
              "di = 20cm."
            ]
          },
          {
            title: "Example — Magnification",
            problem: "From previous example (do=20, di=20). Magnification?",
            solution: "-1",
            steps: [
              "m = -di/do.",
              "m = -20/20 = -1.",
              "Image is same size, but inverted (negative)."
            ]
          }
        ],
        quiz: [
          { q: "Why does a pool look shallower than it is?", a: "Refraction bends light away from the normal as it exits water." },
          { q: "What type of lens corrects near-sightedness?", a: "Diverging (Concave) lens." }
        ]
      },

      // 6. Thermodynamics
      {
        explanation: `Thermodynamics rules the universe.
1. **Zeroth Law:** Thermometers work.
2. **First Law:** Energy is conserved (ΔU = Q - W). Heat added minus Work done.
3. **Second Law:** Entropy always increases. Heat flows from Hot to Cold. You cannot build a 100% efficient engine.



[Image of PV diagram carnot cycle]


**Ideal Gas Law:** PV = nRT.
Temperature is just a measure of average molecular kinetic energy.`,
        examples: [
          {
            title: "Example — Ideal Gas",
            problem: "1 mole of gas at 300K in 0.025 m³. Pressure?",
            solution: "99,768 Pa (~1 atm)",
            steps: [
              "P = nRT / V.",
              "P = (1 * 8.314 * 300) / 0.025.",
              "P ≈ 2494 / 0.025 ≈ 99,760 Pa."
            ]
          },
          {
            title: "Example — Efficiency",
            problem: "Engine takes 1000J heat, exhausts 600J. Efficiency?",
            solution: "40%",
            steps: [
              "Work = Qin - Qout = 1000 - 600 = 400J.",
              "Efficiency = Work / Qin = 400 / 1000 = 0.4."
            ]
          },
          {
            title: "Example — Thermal Expansion",
            problem: "Steel bridge (1000m) heats by 20°C (α=12e-6). Expansion?",
            solution: "0.24 meters",
            steps: [
              "ΔL = α * L * ΔT.",
              "ΔL = 12e-6 * 1000 * 20 = 0.24m."
            ]
          }
        ],
        quiz: [
          { q: "What is Absolute Zero?", a: "0 Kelvin. The point where molecular motion theoretically stops." },
          { q: "Can you cool a kitchen by leaving the fridge door open?", a: "No. The fridge motor generates more heat than it removes." }
        ]
      }
    ]
  }
];

export default function Physics({ semester }) {
  return <LessonPlayer courseLabel="Physics 101" courseContent={PhysicsContent} semester={semester} />;
}
