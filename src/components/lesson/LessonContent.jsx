// src/components/lesson/LessonContent.jsx
const LessonContent = {
  // ===============================
  // Mathematics (Maths 101)
  // ===============================
  Maths: [
    // First Semester
    {
      Session: "First Semester",
      Topics: [
        "Numbers, Sets & Real Number System",
        "Algebraic Expressions & Factorization",
        "Functions & Graphs",
        "Limits & Continuity"
      ],
      Content: [
        {
          explanation: `This topic is foundational. We examine the complete hierarchy of numbers: natural, whole, integers, rational, irrational, and real numbers. You will learn formal set notation, basic set operations (union, intersection, difference, complement), and how to represent sets using roster and set-builder notation. We'll also cover interval notation for real number ranges and how these notations map to the number line.

Key ideas include membership testing (is x ∈ A?), subset relations, Venn diagrams for two- and three-set overlaps, and practical reasoning about sets in word problems. We'll apply these concepts to solve problems that combine counting, membership, and basic probability intuition.`,
          examples: [
            {
              title: "Example 1 — Classifying numbers",
              problem: "Classify these numbers: −3, 0, 1/2, √2, 7",
              solution: "Answer with categories each belongs to.",
              steps: [
                "−3 is an integer (ℤ), rational (ℚ), and real (ℝ); not natural.",
                "0 is an integer and whole number; rational and real.",
                "1/2 is rational (ℚ) and real (ℝ).",
                "√2 is irrational (not expressible as p/q with integers p and q) so belongs to ℝ but not ℚ.",
                "7 is natural (ℕ), whole, integer, rational, and real."
              ]
            },
            {
              title: "Example 2 — Set operations",
              problem: "If A = {1,2,3,4}, B = {3,4,5,6}, compute A ∪ B, A ∩ B, A \\ B.",
              solution: "Perform the operations directly.",
              steps: [
                "A ∪ B = {1,2,3,4,5,6}",
                "A ∩ B = {3,4}",
                "A \\ B = elements in A not in B = {1,2}"
              ]
            }
          ]
        },
        {
          explanation: `Algebraic expressions are formulas built from numbers, variables, and operators. Mastery of simplification, manipulation, laws of indices (exponents), and working with surds (roots) is crucial. Factorization transforms a polynomial into product form and is essential for solving polynomial equations and simplifying rational expressions.

We cover techniques such as factoring common factors, grouping, quadratic trinomials, difference of squares, sum/difference of cubes, completing the square, and basic rationalization of denominators. The goal is to make you comfortable recognizing patterns and applying the correct factorization approach quickly.`,
          examples: [
            {
              title: "Example — Factorization",
              problem: "Factor x^2 − 5x + 6",
              solution: "Find two numbers whose product is 6 and sum −5.",
              steps: [
                "Numbers: −2 and −3 (since (−2)(−3)=6 and −2+(−3)=−5).",
                "So x^2 −5x +6 = (x−2)(x−3)."
              ]
            },
            {
              title: "Example — Rationalize a denominator",
              problem: "Rationalize 1 / (√3 − 1)",
              solution: "Multiply numerator and denominator by (√3 + 1).",
              steps: [
                "1/(√3 − 1) × (√3 + 1)/(√3 + 1) = (√3 + 1)/(3 − 1) = (√3 + 1)/2."
              ]
            }
          ]
        },
        {
          explanation: `Functions describe relationships mapping inputs to outputs. You'll learn formal definitions of domain (allowable inputs) and range (possible outputs), the idea of injective/surjective/bijective functions, inverse functions, composition, and transformations (translations, stretches, reflections). Graphical intuition—identifying intercepts, asymptotes, and key behavior—gives insight into problem solving and calculus readiness.

We'll handle polynomial, rational, exponential, and logarithmic functions at an introductory level, focussing on how algebraic manipulations affect the graph and how to sketch or reason about simple transformations.`,
          examples: [
            {
              title: "Example — Domain and range",
              problem: "Find domain and range of f(x) = √(x − 1)",
              solution: "Think about the radicand demand.",
              steps: [
                "Require x − 1 ≥ 0 ⇒ x ≥ 1, so domain: [1, ∞).",
                "The square root yields non-negative outputs ⇒ range: [0, ∞)."
              ]
            },
            {
              title: "Example — Inverse function",
              problem: "Find f^{-1}(x) for f(x)=2x+3",
              solution: "Swap x and y and solve.",
              steps: [
                "Let y = 2x + 3. Swap: x = 2y + 3 ⇒ solve for y: y = (x − 3)/2.",
                "So f^{-1}(x) = (x − 3)/2."
              ]
            }
          ]
        },
        {
          explanation: `Limits formalize the behavior of functions near a point and are the gateway to continuity, differentiation, and integration. We introduce limits via intuitive examples (approaching a value), precise algebraic computation (factor and cancel, rationalize, squeeze theorem), one-sided limits, and infinite limits. Continuity links the limit concept to function value: a function is continuous at a point if the limit equals the function value there.

Understanding common limit forms and algebraic techniques prepares you to evaluate derivatives as limits later in the course.`,
          examples: [
            {
              title: "Example — Evaluate a limit",
              problem: "lim_{x→2} (x^2 − 4)/(x − 2)",
              solution: "Factor numerator and simplify.",
              steps: [
                "x^2 − 4 = (x − 2)(x + 2)",
                "Cancel (x − 2) to get x + 2. Evaluate at x = 2 ⇒ 4."
              ]
            },
            {
              title: "Example — One-sided limit",
              problem: "lim_{x→0^+} ln(x)",
              solution: "As x approaches 0 from the right, ln(x) → −∞.",
              steps: [
                "ln(x) decreases without bound as x→0^+; this is an infinite limit."
              ]
            }
          ]
        }
      ]
    },
    // Second Semester
    {
      Session: "Second Semester",
      Topics: [
        "Differentiation: Rules & Applications",
        "Integration: Techniques & Interpretation",
        "Applications of Calculus (Area, Volume, Optimization)",
        "Differential Equations: First Order"
      ],
      Content: [
        {
          explanation: `Differentiation is the process of finding the instantaneous rate of change — the derivative. You will master derivative rules (power, constant, constant multiple, sum/difference, product, quotient, chain rule) and learn how to differentiate polynomial, rational, exponential, logarithmic, and trigonometric functions. Applications include finding tangents, rates of change, velocity/acceleration relationships, critical points for optimization, and modelling physical processes.

We underline problem solving strategies: identify the rule, simplify the function if possible, apply algebra carefully, and check units/interpretations in applied problems.`,
          examples: [
            {
              title: "Example — Differentiate a product",
              problem: "Find d/dx [x^2 sin x]",
              solution: "Use product rule: (u v)' = u' v + u v'.",
              steps: [
                "u = x^2, u' = 2x; v = sin x, v' = cos x.",
                "Derivative = 2x sin x + x^2 cos x."
              ]
            },
            {
              title: "Example — Chain rule",
              problem: "d/dx [ln(3x^2 + 1)]",
              solution: "Derivative of ln(u) is u'/u.",
              steps: [
                "u = 3x^2 + 1, u' = 6x.",
                "Derivative = 6x / (3x^2 + 1)."
              ]
            }
          ]
        },
        {
          explanation: `Integration reverses differentiation and recovers accumulated quantities. Learn indefinite integrals (antiderivatives), definite integrals as limits of Riemann sums, and properties of integrals. Techniques include substitution, integration by parts, basic trigonometric integrals, and partial fraction decomposition for rational functions. Interpretation: integrals compute area under curves, accumulated distance from velocity, and many physical quantities.

We emphasize careful algebra, verifying results by differentiating antiderivatives, and applying definite integrals to compute exact areas.`,
          examples: [
            {
              title: "Example — Substitution",
              problem: "Compute ∫ 2x cos(x^2) dx",
              solution: "Let u = x^2 ⇒ du = 2x dx.",
              steps: [
                "Integral becomes ∫ cos(u) du = sin(u) + C = sin(x^2) + C."
              ]
            },
            {
              title: "Example — Definite integral",
              problem: "∫_{0}^{1} 3x^2 dx",
              solution: "Find antiderivative: x^3, evaluate between 0 and 1.",
              steps: [
                "x^3 |_{0}^{1} = 1^3 − 0 = 1."
              ]
            }
          ]
        },
        {
          explanation: `Applications: Use calculus to compute areas between curves, volumes of solids of revolution (disk/washer), arc length (intro), and solve optimization problems (maximize/minimize). We teach systematic approaches: set up the integral carefully (choose correct variable and limits), sketch the region, choose method (slicing, cylindrical shells), and interpret results.

Optimization: identify objective function, constraint (if any), differentiate, locate critical points, and determine maxima/minima via second derivative test or sign analysis.`,
          examples: [
            {
              title: "Example — Area between curves",
              problem: "Find area between y = x^2 and y = x on [0,1]",
              solution: "Integrate (top − bottom): ∫_0^1 (x − x^2) dx.",
              steps: [
                "Antiderivative: 1/2 x^2 − 1/3 x^3, evaluate 0→1 ⇒ 1/2 − 1/3 = 1/6."
              ]
            },
            {
              title: "Example — Optimization",
              problem: "Maximize A = x(10 − x) where x ∈ [0,10]",
              solution: "A = 10x − x^2; derivative A' = 10 − 2x, set to 0 ⇒ x=5",
              steps: [
                "Second derivative A'' = −2 < 0 ⇒ maximum at x = 5. A_max = 25."
              ]
            }
          ]
        },
        {
          explanation: `Differential equations model change — first-order ODEs appear in growth/decay, mixing problems, and basic circuits. We introduce separable equations and linear first-order equations using integrating factors. Emphasis is on setting up the DE from problem description, solving analytically where possible, and interpreting the solution physically.

Examples illustrate exponential growth/decay (dy/dt = ky) and population models; we also show how initial conditions produce particular solutions.`,
          examples: [
            {
              title: "Example — Separable ODE",
              problem: "Solve dy/dx = 3y, given y(0) = 2",
              solution: "Separate: dy/y = 3 dx; integrate both sides.",
              steps: [
                "ln|y| = 3x + C ⇒ y = C' e^{3x}. Use y(0)=2 ⇒ C'=2.",
                "Solution: y = 2 e^{3x}."
              ]
            },
            {
              title: "Example — Mixing (conceptual)",
              problem: "Salt flows in/out of a tank; write basic DE.",
              solution: "The rate of change = inflow concentration × inflow rate − outflow concentration × outflow rate; set up and solve as linear first-order ODE."
            }
          ]
        }
      ]
    }
  ], // End Maths

  // ===============================
  // Chemistry (Chem 101)
  // ===============================
  Chemistry: [
    // First Semester
    {
      Session: "First Semester",
      Topics: [
        "Measurements, Units & Laboratory Practice",
        "Atomic Structure & Electronic Configuration",
        "Periodic Trends & Chemical Properties",
        "Chemical Bonding & Molecular Geometry"
      ],
      Content: [
        {
          explanation: `Precise measurement and clear units are the base of chemistry. Learn SI units, significant figures, scientific notation, and error propagation basics. Laboratory practice covers safe handling, glassware recognition, accurate mass/volume measurements, and simple titration/dilution procedures. Good lab technique and record-keeping are emphasized because proper technique reduces experimental error and ensures reproducible data.

We also give examples of converting units, estimating uncertainties, and designing an elementary experiment with control/comparative conditions.`,
          examples: [
            {
              title: "Example — Unit conversion",
              problem: "Convert 5.0 cm^3 to liters",
              solution: "1 L = 1000 cm^3; 5.0 cm^3 = 5.0 × 10^{-3} L = 0.005 L.",
              steps: [
                "Divide by 1000 because cm^3 → L; keep significant figure rules."
              ]
            },
            {
              title: "Example — Significant figures",
              problem: "Add 12.3 + 0.456 + 1.20",
              solution: "Result limited by least decimal places: 12.3 (1 decimal) => round final to 1 decimal: sum = 13.956 → 14.0 (rounded to 1 decimal)."
            }
          ]
        },
        {
          explanation: `Atomic structure explores protons, neutrons, electrons, isotopes, atomic number (Z) and mass number (A). Electronic configuration (shells and subshells) explains chemical behavior: valence electrons drive bonding. We discuss Aufbau principle, Hund's rule, and Pauli exclusion principle briefly and show how configurations predict magnetism and reactivity.

Practice writing electron configurations, identifying valence shell electrons, and deducing ionic charges from the periodic position.`,
          examples: [
            {
              title: "Example — Electronic configuration",
              problem: "Write configuration for Carbon (Z=6)",
              solution: "1s^2 2s^2 2p^2; valence: 2s^2 2p^2 (4 valence electrons).",
              steps: [
                "Fill from lowest to highest energy using 2,8,18 rules for simple atoms."
              ]
            },
            {
              title: "Example — Isotope notation",
              problem: "Express Carbon-14",
              solution: "^{14}C or C-14 (A = 14, Z = 6)."
            }
          ]
        },
        {
          explanation: `Periodic trends (atomic radius, ionization energy, electron affinity, electronegativity) arise from nuclear charge and electron shielding. Across a period atomic radius decreases (stronger nuclear pull), while down a group radius increases due to added shells. Ionization energy often shows opposite trends, impacting reactivity — metals lose electrons easily while non-metals tend to gain.

We provide qualitative reasoning for exceptions and examples comparing elements to deduce likely ionic states and bond types.`,
          examples: [
            {
              title: "Example — Trend reasoning",
              problem: "Which is larger: Na or Cl?",
              solution: "Na (group 1) is much larger because Cl has more nuclear charge in same period pulling electrons closer; thus atomic radius: Na > Cl."
            },
            {
              title: "Example — Ionization energy",
              problem: "Which requires more energy to remove an electron: Mg or Na?",
              solution: "Mg requires more ionization energy (higher nuclear charge for same period and similar shielding)."
            }
          ]
        },
        {
          explanation: `Bonding and molecular geometry describe how atoms share or transfer electrons and how 3D shapes determine molecule properties. Learn ionic vs covalent bonding, polar vs nonpolar covalent bonds, and the valence shell electron pair repulsion (VSEPR) model for predicting shapes. Lewis structures show bonding and lone pairs, while hybridization (sp, sp^2, sp^3) helps explain bond angles and molecular symmetry.

Understanding molecular shape allows prediction of dipole moments, boiling points, solubility trends, and reactivity patterns.`,
          examples: [
            {
              title: "Example — Lewis and shape",
              problem: "Predict shape of CH4 and H2O",
              solution: "CH4: tetrahedral (sp^3 hybridization) with bond angle ~109.5°; H2O: bent shape due to two lone pairs on O (~104.5°).",
              steps: [
                "Draw Lewis structures, count bonding pairs and lone pairs, apply VSEPR to predict geometry."
              ]
            },
            {
              title: "Example — Ionic vs covalent",
              problem: "Compare properties of NaCl and CO2",
              solution: "NaCl is ionic (solid crystalline, high mp, conducts when molten); CO2 is covalent (molecular, low mp, gas at room temp)."
            }
          ]
        }
      ]
    },
    // Second Semester
    {
      Session: "Second Semester",
      Topics: [
        "Gases: Laws & Kinetic Theory",
        "Thermochemistry & Energetics",
        "Chemical Equilibrium & Le Châtelier",
        "Acids, Bases & pH"
      ],
      Content: [
        {
          explanation: `Gases obey idealized laws (PV = nRT) and kinetic theory explains macroscopic gas behavior from molecular motion. Learn partial pressures (Dalton's law), gas stoichiometry, and real gas deviations (Van der Waals idea qualitatively). Temperature affects average kinetic energy and root mean square speed.

Work through typical calculation problems: converting between pressure units, using ideal gas law for moles/volume/pressure relationships, and using gas density formulas.`,
          examples: [
            {
              title: "Example — Ideal gas calculation",
              problem: "Find moles of gas at 2.0 atm, 5.0 L and 300 K (R = 0.08206 L·atm·mol−1·K−1)",
              solution: "n = PV/(RT) = 2.0*5.0/(0.08206*300) ≈ 0.406 mol.",
              steps: [
                "Plug values into PV = nRT and solve for n."
              ]
            },
            {
              title: "Example — Partial pressures",
              problem: "Two gases in a container: P_total = 1.0 atm; gas A has 30% mole fraction. Find P_A.",
              solution: "P_A = x_A * P_total = 0.3 * 1.0 atm = 0.3 atm."
            }
          ]
        },
        {
          explanation: `Thermochemistry involves heat transfer (q), internal energy changes (ΔU), enthalpy (ΔH), and calorimetry. Exothermic vs endothermic reactions are categorized by sign of ΔH. Hess's law allows using enthalpy of formation or reaction tables to compute unknown ΔH. Bond enthalpies provide approximate energy changes for reactions.

We also discuss specific heat capacity, calorimeter calculations, and how to determine reaction heat experimentally.`,
          examples: [
            {
              title: "Example — Calorimetry",
              problem: "How much heat to raise 200 g of water by 10°C? (c = 4.18 J/g·°C)",
              solution: "q = mcΔT = 200*4.18*10 = 8360 J.",
              steps: [
                "Multiply mass, specific heat, and temperature change."
              ]
            },
            {
              title: "Example — Hess's law",
              problem: "Use given reaction enthalpies to compute ΔH for overall reaction (exercise).",
              solution: "Sum the enthalpies according to reaction algebra; flip and multiply as needed."
            }
          ]
        },
        {
          explanation: `Chemical equilibrium is the dynamic balance when forward and reverse reaction rates equalize. Understand the equilibrium constant (Kc, Kp) and how it relates to concentrations/partial pressures. Le Châtelier's principle predicts system response to stress (concentration, pressure, temperature changes). We explore equilibrium calculations, equilibrium shifts, and how to set up ICE (Initial-Change-Equilibrium) tables for quantitative problems.

Key concept: K values far from 1 indicate product- or reactant-favored systems; K is temperature-dependent.`,
          examples: [
            {
              title: "Example — ICE table",
              problem: "For A ⇌ B with initial [A]=1.0 M, [B]=0, Kc=4, find equilibrium concentrations.",
              solution: "Let change be −x for A, +x for B; solve K = x/(1−x) = 4 ⇒ x = 4(1 − x) ⇒ x = 4 − 4x ⇒ 5x = 4 ⇒ x = 0.8 M; [A]=0.2, [B]=0.8.",
              steps: [
                "Set up ICE table, express equilibrium concentrations in terms of x, plug into K expression, solve algebraically."
              ]
            }
          ]
        },
        {
          explanation: `Acids and bases can be treated via Arrhenius, Brønsted-Lowry, and Lewis concepts. pH, pOH, and the relationships between [H+] and [OH−] guide calculations. For weak acids/bases, equilibrium expressions with Ka/Kb determine acid strength and degree of dissociation. Buffer systems combine weak acid and conjugate base to resist pH changes — Henderson-Hasselbalch equation is a practical tool.

We cover titration curves qualitatively and interpret equivalence points and indicator selection.`,
          examples: [
            {
              title: "Example — pH calculation",
              problem: "Find pH of 0.01 M HCl (strong acid).",
              solution: "HCl dissociates completely: [H+] = 0.01 ⇒ pH = −log(0.01) = 2.",
              steps: [
                "Recognize strong acid complete dissociation; compute −log[H+]."
              ]
            },
            {
              title: "Example — Weak acid equilibrium",
              problem: "Find [H+] for 0.1 M acetic acid (Ka = 1.8×10^{−5}).",
              solution: "Set up ICE: Ka = x^2/(0.1 − x) ≈ x^2/0.1 ⇒ x = sqrt(Ka*0.1) ≈ sqrt(1.8e-6) ≈ 0.00134 ⇒ pH ≈ 2.87.",
              steps: [
                "Use approximation x << 0.1 to simplify quadratic, then check validity."
              ]
            }
          ]
        }
      ]
    }
  ], // End Chemistry

  // ===============================
  // Physics (Phys 101)
  // ===============================
  Physics: [
    // First Semester
    {
      Session: "First Semester",
      Topics: [
        "Units, Vectors & Dimensional Analysis",
        "Kinematics in One & Two Dimensions",
        "Newton's Laws & Dynamics",
        "Work, Energy & Power"
      ],
      Content: [
        {
          explanation: `Physics begins with clearly defined units and vector reasoning. Dimensional analysis helps check equations and convert units reliably. Vectors represent quantities with direction (displacement, velocity, force) and are manipulated via components, dot product, and (later) cross product for 3D contexts. Understanding vectors is necessary to analyze motion and forces in multiple dimensions.

We include examples of resolving vectors into components, vector addition, and interpreting magnitudes/angles from component form.`,
          examples: [
            {
              title: "Example — Vector components",
              problem: "Resolve vector 10 N at 30° above horizontal into x and y components.",
              solution: "Fx = 10 cos30 ≈ 8.66 N, Fy = 10 sin30 = 5 N.",
              steps: [
                "Use cosine for adjacent/horizontal and sine for vertical."
              ]
            }
          ]
        },
        {
          explanation: `Kinematics studies motion without considering forces. We examine position, displacement, velocity, and acceleration in 1D and 2D. Constant-acceleration equations (v = u + at; s = ut + 1/2 at^2; v^2 = u^2 + 2as) are applied to problems including projectiles. For 2D motion, treat orthogonal components independently (horizontal motion constant if no horizontal force).

Graphical interpretation of motion (position–time, velocity–time) provides insight into instantaneous and average quantities.`,
          examples: [
            {
              title: "Example — Projectile motion",
              problem: "A projectile launched at 20 m/s at 30°; find time of flight and range (g=9.8 m/s^2).",
              solution: "vx = 20 cos30 ≈ 17.32 m/s; vy = 20 sin30 = 10 m/s; time = 2vy/g ≈ 2.04 s; range = vx × time ≈ 35.34 m.",
              steps: [
                "Compute horizontal and vertical components, use vertical motion to find flight time, multiply by horizontal speed for range."
              ]
            }
          ]
        },
        {
          explanation: `Newton's laws link forces to motion. Free-body diagrams help translate physical situations into equations (ΣF = ma). We'll handle friction (static and kinetic), normal force calculations, tension, and combined mass systems. Use component resolution for inclined planes and pulleys. Real problems require isolating objects, writing ΣF along chosen axes, and solving for unknown acceleration or force.

Practice constructing FBDs carefully and checking units.`,
          examples: [
            {
              title: "Example — Inclined plane (frictionless)",
              problem: "5 kg block on 30° incline; find acceleration down the plane (no friction).",
              solution: "a = g sin30 = 9.8 × 0.5 = 4.9 m/s^2.",
              steps: [
                "Resolve gravity into components parallel (mg sinθ) and perpendicular (mg cosθ); set ΣF = mg sinθ = ma."
              ]
            }
          ]
        },
        {
          explanation: `Work and energy concepts provide powerful global methods for solving problems. Work equals force times displacement in the direction of force; energy appears as kinetic and potential forms. Conservation of energy simplifies many problems where forces are conservative (gravity, spring). Power measures rate of doing work. We'll practice energy conservation in collisions (when applicable) and in potential-to-kinetic transformations.

The energy method often avoids vector component algebra and yields simpler paths to solutions.`,
          examples: [
            {
              title: "Example — Energy conversion",
              problem: "2 kg mass falls 3 m. Find speed before impact (ignore air resistance).",
              solution: "Use conservation: mgh = 1/2 mv^2 ⇒ v = sqrt(2gh) ≈ sqrt(2*9.8*3) ≈ 7.67 m/s.",
              steps: [
                "Compute potential energy drop and equate to kinetic energy gain."
              ]
            }
          ]
        }
      ]
    },
    // Second Semester
    {
      Session: "Second Semester",
      Topics: [
        "Momentum, Impulse & Collisions",
        "Circular Motion & Gravitation",
        "Waves & Sound",
        "Thermal Physics & Heat"
      ],
      Content: [
        {
          explanation: `Momentum (p = mv) and impulse (Δp = FΔt) are conservation-friendly tools especially useful for collisions. Distinguish elastic collisions (kinetic energy conserved) and inelastic collisions (some KE lost). Use conservation of momentum for closed systems and combine with energy conservation for elastic collisions to solve final velocities; for inelastic collisions compute common velocity after impact.

These methods are crucial for analyzing interactions in mechanics and engineering contexts.`,
          examples: [
            {
              title: "Example — Elastic collision (1D)",
              problem: "Two masses m1 = 1 kg (v1 = 3 m/s) and m2 = 2 kg (v2 = 0) collide elastically. Find final velocities.",
              solution: "Use conservation of momentum and kinetic energy (or standard elastic collision formulas).",
              steps: [
                "Momentum: m1 v1 + m2 v2 = m1 v1' + m2 v2'.",
                "Kinetic energy: 0.5 m1 v1^2 + 0.5 m2 v2^2 = 0.5 m1 v1'^2 + 0.5 m2 v2'^2.",
                "Solve simultaneously (algebra) to find v1' and v2'."
              ]
            }
          ]
        },
        {
          explanation: `Uniform circular motion involves centripetal acceleration a_c = v^2/r and centripetal force F_c = m v^2/r directed toward center. Gravitational interactions are described by Newton's law of universal gravitation and lead to orbital motion mechanics (centripetal force provided by gravity for satellites). Learn to compute orbital speed, period, and escape velocity using energy or force balances.

Applications include designing safe curves, banking roads, and understanding planetary motion approximations.`,
          examples: [
            {
              title: "Example — Circular speed",
              problem: "A car takes a turn of radius 50 m at speed 20 m/s; compute centripetal acceleration.",
              solution: "a_c = v^2/r = 400/50 = 8 m/s^2.",
              steps: [
                "Plug numbers into v^2/r and interpret direction toward center."
              ]
            }
          ]
        },
        {
          explanation: `Waves transmit energy; understand transverse vs longitudinal waves, parameters (wavelength, frequency, period), and relationships v = f λ. Superposition and interference explain beats and standing waves (nodes/antinodes). Sound specifics include intensity, decibel scale, and Doppler effect (frequency shift due to relative motion).

We'll work through problems: wave speeds on strings, frequency calculations, and simple interference patterns.`,
          examples: [
            {
              title: "Example — Wave speed",
              problem: "A wave with frequency 5 Hz and wavelength 2 m travels on a string. Find speed.",
              solution: "v = f λ = 5 * 2 = 10 m/s.",
              steps: [
                "Multiply frequency by wavelength; ensure units are consistent."
              ]
            }
          ]
        },
        {
          explanation: `Thermal physics covers temperature scales, heat transfer modes (conduction, convection, radiation), specific heat, calorimetry, and the first law of thermodynamics (energy conservation for thermodynamic systems). Real applications include heating/cooling problems, phase changes with latent heat, and estimations using specific heat formulas (q = mcΔT).

We also introduce ideal gas law connections to thermal concepts and basic engine efficiency ideas conceptually.`,
          examples: [
            {
              title: "Example — Calorimetry",
              problem: "How much heat to raise 0.5 kg of water by 20°C (c=4186 J/kg·°C)?",
              solution: "q = mcΔT = 0.5*4186*20 = 41860 J.",
              steps: [
                "Plug into q = m c ΔT and compute; convert units if needed."
              ]
            }
          ]
        }
      ]
    }
  ], // End Physics

  // ===============================
  // GST (English / Study Skills)
  // ===============================
  Gst: [
    // First Semester
    {
      Session: "First Semester",
      Topics: [
        "Study Skills & Time Management",
        "Grammar Essentials & Sentence Construction",
        "Academic Writing: Paragraphs & Essays",
        "Reading Comprehension Techniques"
      ],
      Content: [
        {
          explanation: `Academic success depends on effective study techniques. Learn active recall, spaced repetition, Pomodoro-style focused study sessions, and how to build a realistic study timetable. We emphasize planning (setting goals, chunking material), effective note-taking (Cornell method), and deliberate practice with feedback loops. Reducing passive rereading and increasing self-testing boosts retention significantly.

Practical examples include designing a two-week revision schedule for a subject, balancing breadth and depth, and integrating past questions for retrieval practice.`,
          examples: [
            {
              title: "Example — Study plan",
              problem: "Design a 2-week revision plan for four topics with spaced repetition.",
              solution: "Divide topics across days, revisit each topic after increasing intervals (1 day, 3 days, 7 days). Use active recall and short practice tests to strengthen memory."
            }
          ]
        },
        {
          explanation: `Grammar essentials include parts of speech (nouns, verbs, adjectives, adverbs), subject-verb agreement, tense consistency, and punctuation rules for clarity. We'll practice identifying sentence fragments, run-on sentences, and common misuse patterns (their/there/they're, it's/its). Strong grammar builds crisp academic writing and avoids miscommunication.

Exercises include correcting poorly written sentences and rewriting for clarity and concision.`,
          examples: [
            {
              title: "Example — Subject-verb agreement",
              problem: "Choose correct verb: 'The list of items (is/are) on the table.'",
              solution: "Correct: 'is' because 'list' is the subject (singular); 'of items' is a prepositional phrase."
            }
          ]
        },
        {
          explanation: `Academic writing focuses on structure and logic: paragraph unity (topic sentence, supporting details, concluding sentence), coherent essay structure (introduction with thesis, body paragraphs with evidence, conclusion with synthesis), and formal tone. Learn paraphrasing, summarizing, quoting, and basic referencing to avoid plagiarism.

We show how to build a strong thesis, decide on evidence hierarchy, and craft transitions that guide the reader.`,
          examples: [
            {
              title: "Example — Paragraph structure",
              problem: "Write a paragraph supporting the claim that renewable energy creates jobs.",
              solution: "Start with a topic sentence, present evidence (statistics, case studies), explain significance, and end with a concluding sentence linking back to thesis."
            }
          ]
        },
        {
          explanation: `Reading comprehension improves by active strategies: previewing text, forming questions, skimming for main ideas, scanning for details, and summarizing content in your own words. We emphasize critical reading—evaluating author claims and evidence, recognizing bias, and synthesizing multiple sources.

Practice exercises include timed passages with targeted questions and structured note-taking templates.`,
          examples: [
            {
              title: "Example — Skimming & scanning",
              problem: "Given a passage, identify the thesis sentence and three supporting arguments quickly.",
              solution: "Scan headings, first and last sentences of paragraphs for main idea; then read key paragraphs for evidence."
            }
          ]
        }
      ]
    },
    // Second Semester
    {
      Session: "Second Semester",
      Topics: [
        "Research Skills & Referencing",
        "Presentation & Oral Communication",
        "CV, Cover Letter & Interview Essentials",
        "Exam Strategy & Stress Management"
      ],
      Content: [
        {
          explanation: `Research skills include using library databases, distinguishing primary vs secondary sources, evaluating source credibility, and synthesizing evidence across papers. Referencing (APA/Harvard) shows academic honesty and allows readers to trace claims. We demonstrate citation basics, paraphrasing rules, and quick tools for managing references (e.g., using simple citation managers).

Practice includes building a short annotated bibliography and writing a research question with appropriate search terms.`,
          examples: [
            {
              title: "Example — Evaluating sources",
              problem: "Given two web articles, decide which is more credible and why.",
              solution: "Use authority (author credentials), accuracy (citations), currency (date), and purpose (bias) as evaluation metrics."
            }
          ]
        },
        {
          explanation: `Good presentations combine clear structure, concise slides, and confident delivery. Learn to craft an opening, three key points, and a memorable close. Slide design should favor readability (large fonts, minimal text, clear visuals). Practice voice projection, pacing, and handling Q&A. We include use of storytelling and signposting to keep audiences engaged.

Also cover remote presentation etiquette and using basic software tools effectively.`,
          examples: [
            {
              title: "Example — Slide outline",
              problem: "Create a 5-slide structure for a 7-minute talk on plastic pollution.",
              solution: "Slides: Title & hook; Problem statement & data; Causes; Solutions & examples; Conclusion & call-to-action."
            }
          ]
        },
        {
          explanation: `Job application readiness includes crafting a results-focused CV, tailoring cover letters to job descriptions, and preparing STAR-style answers for interviews. Practical tips: quantify achievements, keep CV concise (1–2 pages), and practice mock interviews focusing on specific examples of experience and skills.

We show good vs poor CV examples and provide checklists for interview preparation.`,
          examples: [
            {
              title: "Example — STAR answer",
              problem: "Describe a time you solved a team problem (use STAR).",
              solution: "Situation: team missed a deadline; Task: coordinate catch-up; Action: reorganized tasks and communicated clearly; Result: completed project with improved process and met stakeholders' needs."
            }
          ]
        },
        {
          explanation: `Exam strategy includes active recall, spaced repetition, practice under timed conditions, and smart review cycles. Stress management techniques (breathing, sleep, nutrition, realistic planning) help performance. Learn how to analyze past papers to identify recurring topics and allocate study time accordingly.

We include a practical pre-exam checklist and day-of tips to optimize recall and reduce anxiety.`,
          examples: [
            {
              title: "Example — Timed practice",
              problem: "Design a 60-minute mock test session for 3 topics.",
              solution: "Split 60 minutes into 45 minutes of focused problem-solving (15 min per topic) and 15 minutes review. Mark mistakes and plan targeted follow-up."
            }
          ]
        }
      ]
    }
  ] // End Gst
};

export default LessonContent;
