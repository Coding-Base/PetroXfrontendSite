// src/components/lesson/LessonContent.jsx
// Rich, expanded lesson content for 100-level courses (Maths, Chemistry, Physics, GST).
// Each Session contains Topics and Content objects with explanation (multi-paragraph), examples array with steps.

const LessonContent = {
  // ===============================
  // Mathematics (Maths 101) - Expanded
  // ===============================
  Maths: [
    {
      Session: "First Semester",
      Topics: [
        "Numbers, Sets & Real Number System",
        "Indices, Surds & Logarithms",
        "Algebraic Expressions & Factorization",
        "Functions, Graphs & Transformations",
        "Sequences, Series & Binomial",
        "Trigonometry Basics & Identities",
        "Matrices & Systems of Linear Equations",
        "Intro to Limits & Continuity"
      ],
      Content: [
        {
          explanation:
            `Foundations: We classify numbers (Natural, Whole, Integers, Rational, Irrational, Real) and use set notation (roster and set-builder). Learn how to manipulate intervals, represent sets on number line and reason about membership, complements, and subsets.

Practical skills include drawing two- and three-set Venn diagrams, solving membership problems, and applying interval arithmetic for inequalities. This topic prepares you for algebraic reasoning and probability tasks.`,
          examples: [
            {
              title: "Example — Set membership & Venn",
              problem: "U = {1..10}, A = {even numbers}, B = {multiples of 3}. Find A ∩ B and A ∪ B.",
              solution: "A = {2,4,6,8,10}, B = {3,6,9}. A ∩ B = {6}. A ∪ B = {2,3,4,6,8,9,10}.",
              steps: [
                "List each set explicitly using definition.",
                "Intersection: numbers common to both sets → {6}.",
                "Union: combine all unique elements in ascending order."
              ]
            },
            {
              title: "Example — Interval inequality",
              problem: "Solve |x − 3| ≤ 2",
              solution: "Equivalent to −2 ≤ x − 3 ≤ 2 ⇒ 1 ≤ x ≤ 5.",
              steps: [
                "Remove absolute value by writing two inequalities.",
                "Solve and present interval: [1,5]."
              ]
            }
          ]
        },

        {
          explanation:
            `Exponents and logarithms: rules of indices, rational exponents and simplifying surds (roots). Learn rationalization techniques and the laws of logarithms (product, quotient, power rules) and how logs turn multiplicative relationships into additive ones — crucial for solving exponential equations.

We'll also cover practical approximations and how to switch between exponential and log form.`,
          examples: [
            {
              title: "Example — Laws of exponents",
              problem: "Simplify (x^3 * x^−5) / x^−2",
              solution: "Use exponent rules: x^{3 − 5 + 2} = x^0 = 1 (for x ≠ 0).",
              steps: [
                "Subtract exponents where dividing, add when multiplying.",
                "Confirm domain excludes x = 0 if needed."
              ]
            },
            {
              title: "Example — Log equation",
              problem: "Solve log_2(x) + log_2(x − 2) = 3",
              solution: "Combine logs: log_2[x(x − 2)] = 3 ⇒ x(x − 2) = 8 ⇒ x^2 −2x −8 = 0 ⇒ (x −4)(x +2)=0 ⇒ x = 4 or −2; but x>2 (domain), so x=4.",
              steps: [
                "Use product rule for logs, convert to exponential form, solve quadratic, check domain."
              ]
            }
          ]
        },

        {
          explanation:
            `Algebraic factorization: factorization techniques for polynomials, recognizing quadratic patterns, difference of squares, factor by grouping, and completing the square. We practice manipulating rational expressions and simplifying algebraic fractions.

This chapter is highly procedural — practice pattern recognition and multiplication checking for accuracy.`,
          examples: [
            {
              title: "Example — Quadratic factorization",
              problem: "Factor x^2 + x − 12",
              solution: "(x + 4)(x − 3).",
              steps: [
                "Find pair multiplying to −12 that sum to +1 → +4 and −3.",
                "Write factors and optionally expand to check."
              ]
            },
            {
              title: "Example — Completing the square",
              problem: "Write x^2 + 6x + 5 in completed-square form",
              solution: "x^2 + 6x + 9 − 4 = (x + 3)^2 − 4.",
              steps: [
                "Add and subtract (b/2)^2 where b = 6, then factor perfect square."
              ]
            }
          ]
        },

        {
          explanation:
            `Functions and graph transformations: domain and range, inverse and composite functions, and common function types (linear, quadratic, polynomial, rational, exponential). Understand how translations, stretches and reflections modify graphs; identify intercepts, asymptotes and end behavior.

Graphical interpretation is used repeatedly in calculus and modelling.`,
          examples: [
            {
              title: "Example — Vertical stretch",
              problem: "How does y = 2(x − 1)^2 + 3 differ from y = x^2 ?",
              solution: "Shift right 1, up 3, and vertical stretch by factor 2 (narrows parabola).",
              steps: [
                "Translate base graph, then apply scaling factor to y-values."
              ]
            },
            {
              title: "Example — Inverse",
              problem: "Find inverse of f(x) = (x − 1)/2",
              solution: "Swap x and y → x = (y − 1)/2 ⇒ y = 2x + 1 so f^{-1}(x) = 2x + 1.",
              steps: [
                "Swap variables and solve algebraically."
              ]
            }
          ]
        },

        {
          explanation:
            `Sequences and series: arithmetic and geometric sequences, nth-term formula, partial sums, and an introduction to binomial expansion for positive integer powers. Recognize how series appear in approximations and why convergence matters for infinite geometric series.

We also link to calculus by showing how series approximate functions.`,
          examples: [
            {
              title: "Example — Sum of GP",
              problem: "Find sum of 1 + 1/2 + 1/4 + ... to infinity",
              solution: "It's a geometric series with a = 1, r = 1/2 ⇒ sum = a/(1 − r) = 2.",
              steps: [
                "Ensure |r| < 1 to apply infinite sum formula."
              ]
            }
          ]
        },

        {
          explanation:
            `Trigonometry basics: unit circle, sine/cosine/tangent definitions, exact values for common angles, and fundamental identities (Pythagorean, sum/difference). Learn solving basic trigonometric equations and using identities for simplification.

Trigonometry is used across physics and engineering problems; visualize on the unit circle to build intuition.`,
          examples: [
            {
              title: "Example — Exact trig value",
              problem: "Find sin(30°) and cos(60°)",
              solution: "sin(30°)=1/2, cos(60°)=1/2.",
              steps: [
                "Recall unit triangle or memorize standard angle values."
              ]
            }
          ]
        },

        {
          explanation:
            `Matrices and linear systems: representation of linear equations as matrices, solving 2×2 and 3×3 systems using substitution, elimination, and (briefly) matrix row operations. Interpret determinants and basic inverse matrix concepts for small systems.

These skills prepare you for numerical linear algebra and engineering modeling.`,
          examples: [
            {
              title: "Example — 2×2 linear system",
              problem: "Solve: x + y = 5, 2x − y = 1",
              solution: "Add equations => 3x = 6 ⇒ x = 2. Then y = 3.",
              steps: [
                "Use elimination to combine equations and back-substitute."
              ]
            }
          ]
        },

        {
          explanation:
            `Intro to limits and continuity: idea of approaching a value, removable discontinuities, and limit computation using algebraic simplification like factoring and rationalization. Continuity conditions and one-sided limits are introduced for later calculus topics.`,
          examples: [
            {
              title: "Example — Limit via factoring",
              problem: "lim_{x→1} (x^2 − 1)/(x − 1)",
              solution: "Factor numerator => (x − 1)(x + 1)/(x − 1) => limit = x + 1 at x=1 => 2.",
              steps: [
                "Factor and cancel common factor, evaluate limit."
              ]
            }
          ]
        }
      ]
    },

    {
      Session: "Second Semester",
      Topics: [
        "Differentiation rules & implicit differentiation",
        "Applications of derivatives (max/min & curve sketching)",
        "Integration techniques (substitution, parts)",
        "Definite integrals & area applications",
        "Sequences of functions & series intro",
        "Differential equations (first order separable/linear)",
        "Partial fractions & rational integrals",
        "Numerical methods (trapezoid rule intro)"
      ],
      Content: [
        {
          explanation:
            `We develop differentiation rules: power, product, quotient, and chain rules. Implicit differentiation handles relations not easily solved for y. Practice finding derivatives of polynomials, composites, exponentials, logs and simple trig functions.

Interpret derivative as slope and instantaneous rate of change; this is key for motion and optimization.`,
          examples: [
            {
              title: "Example — Chain rule",
              problem: "Differentiate y = (3x^2 + 2)^5",
              solution: "y' = 5(3x^2 + 2)^4 * 6x = 30x(3x^2 + 2)^4",
              steps: [
                "Set u = 3x^2 + 2; dy/dx = 5u^4 * du/dx; compute du/dx = 6x."
              ]
            },
            {
              title: "Example — Implicit differentiation",
              problem: "Differentiate x^2 + y^2 = 25",
              solution: "2x + 2y*y' = 0 ⇒ y' = −x/y",
              steps: [
                "Differentiate both sides wrt x, treat y as function of x (y')."
              ]
            }
          ]
        },

        {
          explanation:
            `Derivative applications include optimization (find maxima/minima), related rates, and curve sketching (critical points, inflection, concavity). Learn systematic steps: find derivative, solve f' = 0, classify with sign analysis or second derivative test, then interpret in context.

Examples include maximizing area/volume and minimizing cost problems.`,
          examples: [
            {
              title: "Example — Optimization",
              problem: "Find max area rectangle under curve y = 10 − x (x≥0).",
              solution: "Area A = x(10 − x) = 10x − x^2; A' = 10 − 2x ⇒ 0 at x = 5; A_max = 25.",
              steps: [
                "Set derivative equal to zero, test either sign or second derivative."
              ]
            }
          ]
        },

        {
          explanation:
            `Integration techniques: substitution (reverse chain rule), parts (product of functions), and basic trig integrals. Learn to verify by differentiating antiderivative and handle definite integrals with limits.

Applications to physics and area problems demonstrate real-world uses.`,
          examples: [
            {
              title: "Example — Integration by substitution",
              problem: "∫ x cos(x^2) dx",
              solution: "Let u = x^2 ⇒ du = 2x dx ⇒ integral = (1/2)∫ cos(u) du = (1/2) sin(u) + C = (1/2) sin(x^2) + C",
              steps: [
                "Identify u and du, replace variables, integrate, substitute back."
              ]
            }
          ]
        },

        {
          explanation:
            `Definite integrals compute signed areas; practice setting up integrals for area between curves and using symmetry where appropriate. Also cover average value of a function across interval and basic volume calculations (disks/washers).`,
          examples: [
            {
              title: "Example — Area between curves",
              problem: "Area between y = x^2 and y = x from 0 to 1",
              solution: "Integrate (x − x^2) from 0 to 1 => 1/2 − 1/3 = 1/6",
              steps: [
                "Identify top and bottom functions, set up integral top − bottom."
              ]
            }
          ]
        },

        {
          explanation:
            `Series introduction emphasizes understanding convergence tests and using geometric/power series to approximate functions. This is a primer to Taylor expansions used later.`,
          examples: [
            {
              title: "Example — Geometric series",
              problem: "Express 1/(1 − x) as series for |x| < 1",
              solution: "1 + x + x^2 + x^3 + ...",
              steps: [
                "Recognize standard geometric expansion and domain of convergence."
              ]
            }
          ]
        },

        {
          explanation:
            `Differential equations: separable and linear first-order ODEs. Solve simple population/growth-decay models and mixing problems. Emphasize forming the equation from verbal description.`,
          examples: [
            {
              title: "Example — Growth model",
              problem: "dy/dt = ky, y(0)=y0",
              solution: "Separate and integrate: y = y0 e^{kt}",
              steps: [
                "Integrate dy/y = k dt to get ln y = kt + C, exponentiate."
              ]
            }
          ]
        },

        {
          explanation:
            `Partial fraction decomposition helps integrate rational functions. Break into linear/quadratic factors and integrate term-by-term.`,
          examples: [
            {
              title: "Example — Partial fractions",
              problem: "Integrate ∫ 1/(x^2 − 1) dx",
              solution: "1/(x^2 − 1) = 1/2(1/(x − 1) − 1/(x + 1)), integrate to 1/2 ln| (x−1)/(x+1) | + C",
              steps: [
                "Factor denominator, decompose into partial fractions, integrate each term."
              ]
            }
          ]
        },

        {
          explanation:
            `Numerical methods: trapezoid rule and simple root-finding ideas (bisection). Useful for approximating definite integrals when analytic methods are hard.`,
          examples: [
            {
              title: "Example — Trapezoid rule (concept)",
              problem: "Approximate ∫_0^1 e^{x^2} dx with n=2",
              solution: "Compute endpoints and midpoints in trapezoid formula; this gives a quick approximation (exercise for the student).",
              steps: [
                "Divide interval, compute area of trapezoids, sum."
              ]
            }
          ]
        }
      ]
    }
  ], // End Maths

  // ===============================
  // Chemistry (Chem 101) - Expanded
  // ===============================
  Chemistry: [
    {
      Session: "First Semester",
      Topics: [
        "Measurements, Units & Lab Practice",
        "Atomic Structure & Electronic Configuration",
        "Periodic Table & Trends",
        "Chemical Bonding & Molecular Geometry",
        "Stoichiometry & Chemical Equations",
        "States of Matter & Intermolecular Forces",
        "Solutions & Concentration Units",
        "Basic Organic Functional Groups"
      ],
      Content: [
        {
          explanation:
            `Measurement fundamentals: SI units, significant figures, lab safety, glassware use, and error analysis. Learn how to design controlled experiments, record observations, and report uncertainties. Understanding how measurement precision impacts conclusions is central to good lab practice.`,
          examples: [
            {
              title: "Example — Unit conversion",
              problem: "Convert 250 mL to liters and cubic centimeters",
              solution: "250 mL = 0.250 L and 250 cm^3",
              steps: [
                "1 mL = 1 cm^3 and 1000 mL = 1 L; apply unit conversions."
              ]
            },
            {
              title: "Example — Significant figures",
              problem: "Multiply 2.50 × 3.4",
              solution: "Answer should have 2 significant figures (smallest) → 8.5",
              steps: [
                "Perform multiplication then round to correct sig figs."
              ]
            }
          ]
        },

        {
          explanation:
            `Atomic theory: protons, neutrons, electrons; isotopes; mass number vs atomic number. Electronic configuration describes how electrons occupy shells/subshells and explains periodic behavior, magnetism, and valence.`,
          examples: [
            {
              title: "Example — Electron configuration",
              problem: "Write for Neon (Z=10)",
              solution: "1s^2 2s^2 2p^6 (full shell, noble gas).",
              steps: [
                "Fill lowest energy subshells first (Aufbau principle)."
              ]
            }
          ]
        },

        {
          explanation:
            `Periodic trends: size, ionization, electronegativity, and reactivity. Predicting whether an element more likely forms cations/anions and comparing chemical behavior across groups are covered.`,
          examples: [
            {
              title: "Example — Trend comparison",
              problem: "Which is more electronegative: O or S?",
              solution: "Oxygen is more electronegative (higher up the group and smaller radius).",
              steps: [
                "Use periodic trend reasoning: across period increases, down group decreases."
              ]
            }
          ]
        },

        {
          explanation:
            `Bonding & molecular geometry: ionic vs covalent bonding, polarity, Lewis structures, VSEPR shapes, and hybridization basics. Discuss how shape affects boiling point, solubility and reaction mechanism tendencies.`,
          examples: [
            {
              title: "Example — Lewis & shape",
              problem: "Predict geometry for NH3",
              solution: "Trigonal pyramidal (one lone pair), bond angle ~107°.",
              steps: [
                "Count electron pairs, apply VSEPR, predict shape."
              ]
            }
          ]
        },

        {
          explanation:
            `Stoichiometry & balancing equations: mole concept, mass-to-mole conversions, limiting reagent, and percent yield. We teach step-by-step approaches to multi-step stoichiometry and how to use molar ratios effectively.`,
          examples: [
            {
              title: "Example — Limiting reagent",
              problem: "If 2 mol H2 reacts with 1 mol O2, how many moles H2O form?",
              solution: "2 mol H2 + O2 → 2 mol H2O ⇒ 2 mol H2O produced.",
              steps: [
                "Use balanced equation to relate moles of reactants and products."
              ]
            }
          ]
        },

        {
          explanation:
            `States of matter and intermolecular forces: compare gases, liquids and solids; explain why H2O has anomalous properties due to hydrogen bonding. Cover phase changes and phase diagrams conceptually.`,
          examples: [
            {
              title: "Example — IMF effect",
              problem: "Why does ethanol boil lower than water?",
              solution: "Ethanol has hydrogen bonding but weaker overall than water and lower molar mass → lower bp.",
              steps: [
                "Compare strengths of intermolecular interactions and molecular mass."
              ]
            }
          ]
        },

        {
          explanation:
            `Solutions: concentration units (molarity, molality, mass percent), colligative properties concept (boiling point elevation, freezing point depression) and dilution calculations.`,
          examples: [
            {
              title: "Example — Dilution",
              problem: "How to prepare 1.0 L of 0.1 M NaCl from 1.0 M stock?",
              solution: "C1V1 = C2V2 ⇒ V1 = (0.1 * 1.0)/1.0 = 0.1 L = 100 mL stock, dilute to 1 L.",
              steps: [
                "Use dilution formula and measure accurately."
              ]
            }
          ]
        },

        {
          explanation:
            `Intro to organic functional groups: alkanes, alkenes, alkynes, alcohols, carbonyls, amines and basic nomenclature. Recognize functional groups and predict simple reactivity patterns.`,
          examples: [
            {
              title: "Example — Functional group ID",
              problem: "Identify functional groups in CH3CH2OH",
              solution: "Alcohol (-OH) functional group; molecule is ethanol.",
              steps: [
                "Scan molecule for oxygen/hydrogen pattern indicating alcohol."
              ]
            }
          ]
        }
      ]
    },

    {
      Session: "Second Semester",
      Topics: [
        "Gases & Kinetic Theory",
        "Thermochemistry & Reaction Energetics",
        "Chemical Kinetics Fundamentals",
        "Chemical Equilibrium & Le Châtelier",
        "Acid-Base Chemistry & Buffers",
        "Electrochemistry & Redox Basics",
        "Intro to Organic Reactions",
        "Environmental & Industrial Chemistry Overview"
      ],
      Content: [
        {
          explanation:
            `Gas behavior and kinetic theory: ideal gas law, partial pressures, and the molecular interpretation of temperature and pressure. Real gas deviations and qualitative role of intermolecular forces are discussed.`,
          examples: [
            {
              title: "Example — Ideal gas use",
              problem: "Calculate mass of oxygen in 22.4 L at STP (1 mol gas occupies 22.4 L)",
              solution: "22.4 L → 1 mol O2 → mass 32 g.",
              steps: [
                "Use molar volume concept at STP, multiply by molar mass."
              ]
            }
          ]
        },

        {
          explanation:
            `Thermochemistry: heats of reaction, Hess's law, enthalpy changes, and calorimetry. We explain energy diagrams for exothermic and endothermic reactions and how to compute reaction heat from tables of formation.`,
          examples: [
            {
              title: "Example — Enthalpy by Hess",
              problem: "Compute ΔH of target reaction by combining known reactions (exercise).",
              solution: "Use algebraic manipulation of reaction enthalpies to arrive at target.",
              steps: [
                "Reverse/scale equations as needed and sum enthalpies accordingly."
              ]
            }
          ]
        },

        {
          explanation:
            `Reaction kinetics: rate laws, order of reaction, effect of concentration/temperature/catalyst, and activation energy concept. Learn how experiments determine rate law and how to interpret rate constants.`,
          examples: [
            {
              title: "Example — Rate reasoning",
              problem: "If rate doubles when concentration doubles, what is reaction order?",
              solution: "First order with respect to that reactant (rate ∝ [A]^1).",
              steps: [
                "Use proportional change to deduce order."
              ]
            }
          ]
        },

        {
          explanation:
            `Equilibrium: ICE tables, equilibrium constants, and Le Châtelier's predictions for concentration, pressure and temperature changes. Emphasize algebraic skill for solving K equations and approximations for weak dissociation.`,
          examples: [
            {
              title: "Example — ICE table solve",
              problem: "A ⇌ B with K=4 and initial A=1 M, B=0. Find equilibrium.",
              solution: "Let x = [B] at equilibrium ⇒ x/(1 − x)=4 ⇒ x = 0.8, [A]=0.2",
              steps: [
                "Build ICE table, substitute into K expression, solve, check reasonableness."
              ]
            }
          ]
        },

        {
          explanation:
            `Acids, bases & buffers: pH/pOH calculations, strong vs weak acids, Ka/Kb use, buffer design and Henderson-Hasselbalch equation. Titration curves and equivalence point reasoning are explained qualitatively.`,
          examples: [
            {
              title: "Example — Buffer pH",
              problem: "Given acetic acid 0.1 M and acetate 0.1 M (Ka=1.8E-5), estimate pH.",
              solution: "Henderson-Hasselbalch: pH = pKa + log([A-]/[HA]) = 4.74 + 0 = 4.74",
              steps: [
                "Use equal concentrations to cancel ratio term."
              ]
            }
          ]
        },

        {
          explanation:
            `Electrochemistry basics: redox balancing, galvanic cells, standard reduction potentials and calculating cell EMF. Introduce corrosion and simple electroplating concepts.`,
          examples: [
            {
              title: "Example — Cell potential concept",
              problem: "Use standard potentials to decide spontaneity (exercise).",
              solution: "Compute Ecell = E°cathode − E°anode; Ecell > 0 implies spontaneous reaction.",
              steps: [
                "Find half-reactions, use tabulated E° values, subtract properly."
              ]
            }
          ]
        },

        {
          explanation:
            `Intro to organic reactions: substitution, elimination and addition reaction basics; understand reaction types for alkanes, alkenes and simple functional group interconversions.`,
          examples: [
            {
              title: "Example — Addition to alkenes",
              problem: "Hydrogenation of ethene yields ethane. Mechanism conceptually involves addition across double bond.",
              solution: "Add H2 across C=C with a metal catalyst to give saturated product.",
              steps: [
                "Recognize addition reduces unsaturation; identify reagents and product."
              ]
            }
          ]
        },

        {
          explanation:
            `Environmental and industrial chemistry: fuel chemistry, pollution basics (SOx, NOx, CO2), water treatment overview and industrial chemical processes insight (overview of distillation, cracking).`,
          examples: [
            {
              title: "Example — Fuel energy",
              problem: "Compare energy density of petrol vs ethanol qualitatively.",
              solution: "Petrol has higher energy per unit mass; ethanol burns cleaner but lower energy output per volume.",
              steps: [
                "Consider carbon content and combustion enthalpy differences."
              ]
            }
          ]
        }
      ]
    }
  ], // End Chemistry

  // ===============================
  // Physics (Phys 101) - Expanded
  // ===============================
  Physics: [
    {
      Session: "First Semester",
      Topics: [
        "Units, Vectors & Dimensional Analysis",
        "Kinematics (1D & 2D) & Projectile Motion",
        "Newton's Laws, Friction & Applications",
        "Work, Energy & Power",
        "Momentum & Collisions (Intro)",
        "Statics & Equilibrium Basics",
        "Fluid Mechanics Intro",
        "Thermal Concepts & Heat Transfer Basics"
      ],
      Content: [
        {
          explanation:
            `Start with units and dimensional checks to avoid algebra mistakes. Vectors represent directed quantities; practice components and vector addition. Dimensional analysis is a quick way to verify formulas and catch incorrect terms.

We include problems converting units, decomposing vectors and solving vector geometry problems.`,
          examples: [
            {
              title: "Example — Dimensional check",
              problem: "Verify that kinetic energy 1/2 mv^2 has units of energy",
              solution: "m [kg] × v^2 [m^2/s^2] = kg·m^2/s^2 = Joules.",
              steps: [
                "Multiply units and compare to Joule definition."
              ]
            }
          ]
        },

        {
          explanation:
            `Kinematics covers displacement, velocity, acceleration and the equations for constant acceleration. For 2D projectile motion, treat horizontal and vertical motions independently. Graphs (x–t, v–t) give additional intuition.

We'll solve multi-step projectile problems with careful component decomposition.`,
          examples: [
            {
              title: "Example — Projectile with angle",
              problem: "Launch 25 m/s at 45°. Find range (g=9.8).",
              solution: "vx=25 cos45≈17.68, vy≈17.68, time=2vy/g≈3.61 s, range ≈ 63.9 m.",
              steps: [
                "Compute components, time-of-flight, multiply for range."
              ]
            }
          ]
        },

        {
          explanation:
            `Newton's Laws: formulation and problem solving using free-body diagrams. Include friction (static vs kinetic) and examples with pulleys and inclines. Real-world modeling often simplifies to components so algebra is tractable.`,
          examples: [
            {
              title: "Example — Friction on incline",
              problem: "Block m on incline θ with μ_k given; find acceleration.",
              solution: "a = g sinθ − μ_k g cosθ (if sliding down).",
              steps: [
                "Resolve forces along plane; subtract friction; use F=ma."
              ]
            }
          ]
        },

        {
          explanation:
            `Work-energy theorem and conservation of energy provide global methods for dynamics. Understand potential energy forms and when mechanical energy is conserved vs dissipated (non-conservative forces). Learn to compute power delivered by a force.`,
          examples: [
            {
              title: "Example — Work done by variable force",
              problem: "Compute work under force F(x)=kx from 0 to x_0 (elastic spring)",
              solution: "W = ∫_0^{x0} kx dx = 1/2 k x0^2.",
              steps: [
                "Integrate force over displacement to find work."
              ]
            }
          ]
        },

        {
          explanation:
            `Momentum and collisions: impulse concept and conservation. Distinguish elastic and perfectly inelastic collisions and analyze example collisions, using conservation laws appropriately.`,
          examples: [
            {
              title: "Example — Perfectly inelastic collision",
              problem: "m1=1kg at 4 m/s collides with m2=2kg at rest and they stick. Find final speed.",
              solution: "Total momentum 4 kg·m/s, total mass 3 kg ⇒ v = 4/3 ≈ 1.33 m/s.",
              steps: [
                "Conserve momentum, compute final common velocity."
              ]
            }
          ]
        },

        {
          explanation:
            `Statics: equilibrium conditions for rigid bodies, torque and simple structures. Learn when to apply ΣF=0 and Στ=0 to solve for unknown forces and reactions.`,
          examples: [
            {
              title: "Example — Torque balance",
              problem: "Find reaction force given beam with load and pivot (exercise).",
              solution: "Set sum of torques about pivot to zero and solve.",
              steps: [
                "Take moments, ensure sign consistent, solve for unknown."
              ]
            }
          ]
        },

        {
          explanation:
            `Fluid mechanics basics: density, pressure, buoyancy (Archimedes principle) and continuity. Qualitative Bernoulli ideas introduced to connect pressure and flow speed.`,
          examples: [
            {
              title: "Example — Buoyancy",
              problem: "Will an object of density 500 kg/m^3 float in water?",
              solution: "Yes — density less than water (1000 kg/m^3) so floats; displaced volume gives buoyant force.",
              steps: [
                "Compare densities, recall buoyant force equals weight of displaced fluid."
              ]
            }
          ]
        },

        {
          explanation:
            `Thermal concepts covering heat transfer modes and calorimetry; first-law intro linking heat, work and internal energy. Provide practice on specific heat and latent heat computations.`,
          examples: [
            {
              title: "Example — Specific heat",
              problem: "Heat required to raise 0.2 kg water by 30°C (c=4186 J/kg·°C).",
              solution: "q = m c ΔT = 0.2*4186*30 = 25116 J.",
              steps: [
                "Multiply mass, specific heat, and temperature change."
              ]
            }
          ]
        }
      ]
    },

    {
      Session: "Second Semester",
      Topics: [
        "Circular motion & centripetal force",
        "Gravitation & orbits",
        "Simple harmonic motion & waves",
        "Sound & Doppler effect",
        "Electric fields & basic circuits",
        "Magnetism & electromagnetic induction (intro)",
        "Optics: reflection & refraction basics",
        "Modern physics overview (photoelectric)"
      ],
      Content: [
        {
          explanation:
            `Circular motion: centripetal acceleration and force formula, rotating frames intuition (centrifugal as perceived), and uniform vs non-uniform circular motion examples.`,
          examples: [
            {
              title: "Example — Centripetal acceleration",
              problem: "Car takes curve radius 40 m at 15 m/s, compute a_c",
              solution: "a_c = v^2/r = 225/40 = 5.625 m/s^2.",
              steps: [
                "Apply formula directly and interpret direction toward center."
              ]
            }
          ]
        },

        {
          explanation:
            `Gravitation: Newton's law of universal gravitation, orbital motion basics, escape velocity and energy perspective for orbits. Estimate satellite period for circular orbit.`,
          examples: [
            {
              title: "Example — Orbital speed (concept)",
              problem: "Find speed for low-earth orbit (qualitative exercise).",
              solution: "Use v = sqrt(GM/R) using Earth mass M and radius R; compute numeric approximation for LEO.",
              steps: [
                "Plug values from constants table and compute."
              ]
            }
          ]
        },

        {
          explanation:
            `SHM and waves: simple harmonic oscillator models (spring-mass), period, frequency relations, and superposition leading to beats. Waves include transverse/longitudinal and parameter relations v = f λ.`,
          examples: [
            {
              title: "Example — SHM period",
              problem: "Period of mass-spring: T = 2π sqrt(m/k).",
              solution: "Compute T with given m and k values (exercise).",
              steps: [
                "Plug into formula and interpret units."
              ]
            }
          ]
        },

        {
          explanation:
            `Sound properties and Doppler shift: frequency, wavelength, intensity, and shifts due to source/observer motion. Applications in sonar and speed measurement.`,
          examples: [
            {
              title: "Example — Doppler (qualitative)",
              problem: "Predict frequency change when ambulance approaches",
              solution: "Observer hears higher frequency while approaching; use Doppler formula for quantitative estimate.",
              steps: [
                "Set relative velocities and plug into formula."
              ]
            }
          ]
        },

        {
          explanation:
            `Electric fields, potential and DC circuits: Coulomb's law, field lines, potential difference, series & parallel resistors, Ohm's law, Kirchhoff's rules in simple circuits.`,
          examples: [
            {
              title: "Example — Series resistor",
              problem: "Equivalent resistance of 10Ω and 20Ω in series",
              solution: "R_eq = 30Ω; use Ohm's law for current/value if voltage given.",
              steps: [
                "Sum resistances directly for series arrangement."
              ]
            }
          ]
        },

        {
          explanation:
            `Magnetism & induction basics: magnetic forces on currents, Faraday's law qualitatively, and simple circuit EM induction examples.`,
          examples: [
            {
              title: "Example — Induced EMF (qualitative)",
              problem: "A changing magnetic flux in a loop induces EMF per Faraday's law.",
              solution: "Rate of change of flux determines induced voltage direction per Lenz's law.",
              steps: [
                "Apply sign conventions and physical reasoning."
              ]
            }
          ]
        },

        {
          explanation:
            `Optics: reflection/refraction, Snell's law, total internal reflection, and lens equation for thin lenses; applications to imaging and instrument basics.`,
          examples: [
            {
              title: "Example — Snell",
              problem: "n1 sinθ1 = n2 sinθ2, compute angle in second medium given angle and indices.",
              solution: "Rearrange and compute using inverse sine.",
              steps: [
                "Ensure angles measured from normal and units correct."
              ]
            }
          ]
        },

        {
          explanation:
            `Modern physics: photoelectric effect, basic quantum ideas and atomic models; explain experimental evidence that led to quantum concepts.`,
          examples: [
            {
              title: "Example — Photoelectric (concept)",
              problem: "Light below threshold frequency produces no electrons regardless of intensity.",
              solution: "Explain particle nature of photons and energy quantization.",
              steps: [
                "Relate photon energy E = hf to work function of metal."
              ]
            }
          ]
        }
      ]
    }
  ], // End Physics

  // ===============================
  // GST (English / Study Skills) - Expanded
  // ===============================
  Gst: [
    {
      Session: "First Semester",
      Topics: [
        "Study Skills, Time Management & Active Recall",
        "Grammar Essentials: Parts of Speech & Sentence Structure",
        "Paragraph & Essay Writing (Structure)",
        "Reading Comprehension & Critical Reading",
        "Referencing, Avoiding Plagiarism & Academic Integrity",
        "Note-taking Systems & Revision Strategies"
      ],
      Content: [
        {
          explanation:
            `Study skills are practical techniques that dramatically improve retention: active recall (self-testing), spaced repetition scheduling, interleaving topics, and deliberate practice. Time-blocking and Pomodoro techniques aid concentration. We show how to create micro-goals, measure progress and iterate study plans based on past papers and weak topics.`,
          examples: [
            {
              title: "Example — Spaced repetition plan",
              problem: "Design a 10-day plan for 4 topics",
              solution: "Rotate topics with increasing intervals (1d,3d,7d), include short retrieval quizzes each revisit.",
              steps: [
                "Map days and allocate review slots; prioritize problem practice over rereading."
              ]
            }
          ]
        },

        {
          explanation:
            `Grammar essentials: identify parts of speech, subject-verb agreement, tense usage and punctuation. Practice rewriting complex sentences for clarity and learn commonly confused words. Good grammar strengthens formal writing and clarity of thought.`,
          examples: [
            {
              title: "Example — Tense consistency",
              problem: "Correct: 'She went to the store and buys milk.'",
              solution: "'She went to the store and bought milk.' Maintain past tense throughout.",
              steps: [
                "Identify tense mismatch, change verb to match narrative time frame."
              ]
            }
          ]
        },

        {
          explanation:
            `Essay writing: craft thesis statements, structure paragraphs (topic sentence, supporting sentences, concluding sentence), and use evidence effectively. Discuss planning, drafting and editing phases and how to adapt tone for academic audiences.`,
          examples: [
            {
              title: "Example — Thesis crafting",
              problem: "Write thesis for essay on renewable energy benefits",
              solution: "\"Investing in renewable energy increases energy security, reduces emissions, and creates skilled jobs in emerging industries.\"",
              steps: [
                "State clear claim and list supporting points to be developed."
              ]
            }
          ]
        },

        {
          explanation:
            `Reading comprehension techniques: previewing text, forming reading questions (who/what/why), annotating, summarizing, and synthesizing information across sources. Interpret author's intent and evaluate evidence quality.`,
          examples: [
            {
              title: "Example — Passage summary",
              problem: "Summarize a short passage in 2 sentences",
              solution: "Identify main idea and supporting details, condense with your own phrasing.",
              steps: [
                "Underline thesis sentence, note three key supporting points, combine into concise summary."
              ]
            }
          ]
        },

        {
          explanation:
            `Referencing and plagiarism avoidance: learn citation basics (APA/Harvard), paraphrasing correctly and using quotations sparingly. Understand academic integrity policies and how to document sources for credibility.`,
          examples: [
            {
              title: "Example — Quick citation",
              problem: "How to cite book author in text (APA)",
              solution: "Use (Author, Year) e.g., (Smith, 2020) and include full reference in bibliography.",
              steps: [
                "Format per chosen style guide; use reference manager for many sources."
              ]
            }
          ]
        },

        {
          explanation:
            `Note-taking systems: Cornell method, outline method, and mind-mapping for different tasks. Combine notes with active recall prompts and convert notes into short practice tests for self-assessment.`,
          examples: [
            {
              title: "Example — Cornell notes",
              problem: "Structure notes for lecture on photosynthesis",
              solution: "Left column: keywords, right column: notes, summary at bottom; create 3 recall questions from key points.",
              steps: [
                "Segment notes during lecture, then generate questions for later study."
              ]
            }
          ]
        }
      ]
    },

    {
      Session: "Second Semester",
      Topics: [
        "Research & Source Evaluation",
        "Presentation Skills & Slide Design",
        "CV/Interview Prep & Professional Communication",
        "Exam Strategy, Stress Management & Mindset"
      ],
      Content: [
        {
          explanation:
            `Research skills include forming search queries, evaluating source credibility, distinguishing peer-reviewed from non-reviewed, and building an annotated bibliography. We also show how to find primary data and interpret graphs/tables critically.`,
          examples: [
            {
              title: "Example — Evaluate a web source",
              problem: "Assess a blog post claiming 'miracle' study results",
              solution: "Check author credentials, check for peer-review, verify claims with primary sources, evaluate sample size/methodology.",
              steps: [
                "Use CRAAP test: Currency, Relevance, Authority, Accuracy, Purpose."
              ]
            }
          ]
        },

        {
          explanation:
            `Presentation skills: story arc for talks, clear slide layouts (minimal text, readable fonts, good contrast), and practice techniques to manage stage fright. Tips for remote presentations and Q&A handling are included.`,
          examples: [
            {
              title: "Example — Slide checklist",
              problem: "Design slide for a key statistic",
              solution: "Use big number, brief caption, single supporting image; cite the source.",
              steps: [
                "Avoid clutter, use high contrast, ensure number is prominent."
              ]
            }
          ]
        },

        {
          explanation:
            `Career readiness: craft achievement-oriented CVs, write tailored cover letters, and practice STAR method for interviews. Practical tips: quantify achievements, keep CV concise (1–2 pages), and practice mock interviews focusing on specific examples of experience and skills.`,
          examples: [
            {
              title: "Example — STAR answer",
              problem: "Answer: Describe a time you improved a process (STAR).",
              solution: "Situation: backlog caused delays; Task: coordinate catch-up; Action: reorganized tasks and communicated clearly; Result: completed project with improved process and met stakeholders' needs.",
              steps: [
                "Frame answer concisely with Situation, Task, Action, Result."
              ]
            }
          ]
        },

        {
          explanation:
            `Exam strategy & mindset: active review, practice under timed conditions, targeted revision of weak areas, and psychological techniques (sleep, nutrition, breathing) to optimize performance. Build a pre-exam checklist and debrief routine.`,
          examples: [
            {
              title: "Example — Mock exam plan",
              problem: "Create plan to tackle past-paper practice",
              solution: "Simulate exam conditions, time strictly, then mark and review mistakes to set a focused follow-up plan.",
              steps: [
                "Use timed blocks, keep a log of common errors, and prioritize topics with highest error rate."
              ]
            }
          ]
        }
      ]
    }
  ] // End Gst
};

export default LessonContent;
