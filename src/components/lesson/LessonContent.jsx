// src/components/lesson/LessonContent.jsx
// Rich, expanded lesson content for 100-level courses (Maths, Chemistry, Physics, GST).
// Each Session contains Topics and Content objects with explanation (multi-paragraph), examples array with >=3 examples.

const LessonContent = {
  // ===============================
  // Mathematics (Maths 101)
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

Practical skills include drawing two- and three-set Venn diagrams, solving membership problems, and applying interval arithmetic for inequalities. This topic prepares you for algebraic reasoning and probability tasks.

Worked problems focus on identifying set relations in real-word contexts and translating words into set expressions.`,

          examples: [
            {
              title: "Example — Set membership & Venn",
              problem: "U = {1..10}, A = {even numbers}, B = {multiples of 3}. Find A ∩ B and A ∪ B.",
              solution: "A = {2,4,6,8,10}, B = {3,6,9}. A ∩ B = {6}. A ∪ B = {2,3,4,6,8,9,10}.",
              steps: [
                "List each set using their definitions.",
                "Intersection: numbers common to both sets → {6}.",
                "Union: combine all unique elements and order them."
              ]
            },
            {
              title: "Example — Interval inequality",
              problem: "Solve |x − 3| ≤ 2",
              solution: "Equivalent to −2 ≤ x − 3 ≤ 2 ⇒ 1 ≤ x ≤ 5.",
              steps: [
                "Break absolute value into two inequalities.",
                "Solve and present interval: [1,5]."
              ]
            },
            {
              title: "Practice — Subset identification",
              problem: "Given A = {1,2,3}, B = {1,2,3,4}, is A ⊂ B? Is B ⊂ A?",
              solution: "A is a proper subset of B (A ⊂ B). B is not a subset of A.",
              steps: ["Check that every element of A is in B; check if B contains elements not in A."]
            }
          ]
        },

        {
          explanation:
            `Exponents, surds and logarithms: rules of indices, rational exponents and simplifying surds (roots). Learn rationalization techniques and the laws of logarithms (product, quotient, power rules) and how logs turn multiplicative relationships into additive ones — crucial for solving exponential equations.

We cover converting between exponential/log forms and solving basic exponential and logarithmic equations used in growth/decay contexts.`,

          examples: [
            {
              title: "Example — Laws of exponents",
              problem: "Simplify (x^3 * x^−5) / x^−2",
              solution: "Use exponent rules: x^{3 − 5 + 2} = x^0 = 1 (for x ≠ 0).",
              steps: [
                "Combine exponents using addition/subtraction rules.",
                "Confirm domain excludes x = 0 if expression has division by x."
              ]
            },
            {
              title: "Example — Log equation",
              problem: "Solve log_2(x) + log_2(x − 2) = 3",
              solution: "Combine logs → log_2[x(x − 2)] = 3 ⇒ x(x − 2) = 8 ⇒ x^2 − 2x − 8 = 0 ⇒ x = 4 (x = −2 rejected due domain).",
              steps: [
                "Use product rule, convert to exponential, solve quadratic, check domain."
              ]
            },
            {
              title: "Practice — Surd simplification",
              problem: "Simplify √72",
              solution: "√72 = √(36*2) = 6√2.",
              steps: ["Factor under the root to extract perfect squares."]
            }
          ]
        },

        {
          explanation:
            `Algebraic factorization: techniques for polynomials, difference of squares, factor by grouping, and completing the square. Manipulate rational expressions and simplify algebraic fractions.

Focus on pattern recognition and checking your factorization by expansion. These skills are essential for solving equations and simplifying calculus expressions.`,

          examples: [
            {
              title: "Example — Quadratic factorization",
              problem: "Factor x^2 + x − 12",
              solution: "(x + 4)(x − 3).",
              steps: [
                "Find integers that multiply to −12 and sum +1: +4 and −3.",
                "Write the factorized form and optionally expand to check."
              ]
            },
            {
              title: "Example — Completing the square",
              problem: "Write x^2 + 6x + 5 in completed-square form",
              solution: "x^2 + 6x + 9 − 4 = (x + 3)^2 − 4.",
              steps: [
                "Add and subtract (b/2)^2 and factor the perfect square term."
              ]
            },
            {
              title: "Practice — Factor by grouping",
              problem: "Factor x^3 + x^2 − x − 1",
              solution: "Group: (x^3 + x^2) − (x + 1) = x^2(x + 1) − 1(x + 1) = (x + 1)(x^2 − 1) = (x + 1)(x − 1)(x + 1).",
              steps: ["Group terms, factor common factors, and further factor simple quadratics"]
            }
          ]
        },

        {
          explanation:
            `Functions and graph transformations: domain, range, inverse and composite functions. Study polynomial, rational, exponential, and logarithmic functions. Learn how translations, stretches and reflections modify graphs; identify intercepts, asymptotes and end behaviour. Graphical interpretation becomes essential in calculus and modelling.`,

          examples: [
            {
              title: "Example — Vertical transform",
              problem: "How does y = 2(x − 1)^2 + 3 differ from y = x^2 ?",
              solution: "Shift right 1, up 3, vertical stretch by factor 2 (narrower parabola).",
              steps: ["Apply translation then scaling to the base graph."]
            },
            {
              title: "Example — Inverse",
              problem: "Find inverse of f(x) = (x − 1)/2",
              solution: "f^{-1}(x) = 2x + 1.",
              steps: ["Swap x and y, solve for y algebraically."]
            },
            {
              title: "Practice — Domain restriction",
              problem: "Find domain of f(x) = 1/(x − 4)",
              solution: "x ≠ 4 → domain is (−∞,4) U (4,∞).",
              steps: ["Identify values making denominator zero and exclude them."]
            }
          ]
        },

        {
          explanation:
            `Sequences and series: arithmetic and geometric sequences, nth-term formula and partial sums. Understand binomial expansion for positive integer powers and the meaning of convergence for infinite geometric series.`,

          examples: [
            {
              title: "Example — Sum of GP",
              problem: "Find sum of 1 + 1/2 + 1/4 + ... to infinity",
              solution: "a=1, r=1/2 ⇒ sum = a/(1−r) = 2.",
              steps: ["Check |r|<1 then apply infinite geometric sum formula."]
            },
            {
              title: "Example — Arithmetic sequence",
              problem: "Nth term of 3,7,11,...",
              solution: "a_n = 3 + (n−1)*4 => a_n = 4n − 1.",
              steps: ["Use common difference and first term to form formula."]
            },
            {
              title: "Practice — Binomial coefficient",
              problem: "Coefficient of x^2 in (1 + 3x)^4",
              solution: "Use binomial expansion: C(4,2)*(3x)^2 = 6 * 9 x^2 = 54 x^2 => coefficient 54.",
              steps: ["Compute combination then multiply by power of 3^2."]
            }
          ]
        },

        {
          explanation:
            `Trigonometry basics: unit circle, definitions of sine/cosine/tangent, common exact values and fundamental identities like sin^2 + cos^2 = 1. Solve simple trig equations and apply identities for simplification.`,

          examples: [
            {
              title: "Example — Exact trig value",
              problem: "Find sin(30°) and cos(60°)",
              solution: "sin(30°) = 1/2, cos(60°) = 1/2.",
              steps: ["Use unit triangle facts for standard angles."]
            },
            {
              title: "Example — Pythagorean identity",
              problem: "Given cos θ = 3/5 (θ in QI), find sin θ",
              solution: "sin θ = 4/5 (positive in QI).",
              steps: ["Compute sqrt(1 − cos^2 θ) and choose sign per quadrant."]
            },
            {
              title: "Practice — Solve basic equation",
              problem: "Solve sin x = 1/2 for x in [0, 2π)",
              solution: "x = π/6, 5π/6.",
              steps: ["Find principal values and consider periodicity."]
            }
          ]
        },

        {
          explanation:
            `Matrices & linear systems: represent linear equations in matrix form, solve small systems via elimination and matrix inversion for 2×2. Learn determinant meaning and when systems have unique/no/infinitely many solutions.`,

          examples: [
            {
              title: "Example — 2×2 linear system",
              problem: "Solve x + y = 5, 2x − y = 1",
              solution: "Add => 3x = 6 => x = 2, y = 3",
              steps: ["Eliminate y by addition, solve for x, back-substitute for y."]
            },
            {
              title: "Example — Determinant test",
              problem: "Does system with coefficient matrix [[1,2],[2,4]] have unique solution?",
              solution: "Determinant = 1*4 − 2*2 = 0 -> no unique solution (dependent rows).",
              steps: ["Compute determinant; zero -> no unique solution."]
            },
            {
              title: "Practice — Solve by substitution",
              problem: "Solve x − 2y = 3 and y = x − 5",
              solution: "Substitute y => x − 2(x − 5) = 3 => x − 2x + 10 = 3 => −x = −7 => x = 7, y = 2.",
              steps: ["Substitute and solve algebraically."]
            }
          ]
        },

        {
          explanation:
            `Limits & continuity: compute simple limits using algebraic manipulation (factoring, cancellation, rationalization) and understand removable/essential discontinuities and one-sided limits.`,

          examples: [
            {
              title: "Example — Limit via factoring",
              problem: "lim_{x→1} (x^2 − 1)/(x − 1)",
              solution: "Factor numerator => (x − 1)(x + 1)/(x − 1) => limit = 2",
              steps: ["Cancel common factor and evaluate at x=1."]
            },
            {
              title: "Example — One-sided",
              problem: "lim_{x→0^+} ln(x)",
              solution: "−∞ (diverges to minus infinity).",
              steps: ["Understand behavior of ln near 0 from right."]
            },
            {
              title: "Practice — Removable discontinuity",
              problem: "Consider f(x) = (x^2 − 1)/(x − 1) for x ≠ 1, define f(1)=2. Is f continuous at 1?",
              solution: "Yes — limit is 2 and f(1) = 2, so continuous after defining value.",
              steps: ["Check limit equals defined value at point."]
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
        "Series & Taylor intro",
        "Differential equations (first order)",
        "Partial fractions & rational integrals",
        "Numerical methods (trapezoid rule)"
      ],
      Content: [
        {
          explanation:
            `Differentiation: power, product, quotient and chain rules; implicit differentiation for relations. Interpret derivatives as instantaneous rate of change, slopes of tangents and use them in applied problems.`,

          examples: [
            {
              title: "Example — Chain rule",
              problem: "Differentiate y = (3x^2 + 2)^5",
              solution: "y' = 5(3x^2 + 2)^4 * 6x = 30x(3x^2 + 2)^4",
              steps: ["Set u = 3x^2 + 2; dy/dx = 5u^4 * du/dx."]
            },
            {
              title: "Example — Implicit differentiation",
              problem: "Differentiate x^2 + y^2 = 25",
              solution: "2x + 2y*y' = 0 ⇒ y' = −x/y",
              steps: ["Differentiate both sides w.r.t x, treat y as y(x)."]
            },
            {
              title: "Practice — Higher order",
              problem: "Find d^2/dx^2 of y=x^3",
              solution: "y' = 3x^2, y'' = 6x",
              steps: ["Differentiate twice using power rule."]
            }
          ]
        },

        {
          explanation:
            `Applications: optimization, related rates and curve sketching. Use derivative tests for maxima/minima and interpret physical meanings.`,

          examples: [
            {
              title: "Example — Optimization",
              problem: "Maximize area rectangle under y=10−x (x≥0).",
              solution: "A = x(10 − x) => A' = 10 − 2x => x=5 => A=25.",
              steps: ["Differentiate A, find critical point and test second derivative."]
            },
            {
              title: "Example — Related rates (simple)",
              problem: "If area A of square increases at 2 cm^2/s, how fast is side s changing when s=4?",
              solution: "A = s^2 => dA/dt = 2s ds/dt => ds/dt = (dA/dt)/(2s) = 2/(8)=0.25 cm/s",
              steps: ["Differentiate relationship wrt time and solve for ds/dt."]
            },
            {
              title: "Practice — Concavity",
              problem: "Given f''(x) > 0 on interval, what is function shape?",
              solution: "Concave up (cup shaped).",
              steps: ["Interpret sign of second derivative."]
            }
          ]
        },

        {
          explanation:
            `Integration techniques: substitution and parts. Check antiderivative by differentiating result; apply definite integrals using limits.`,

          examples: [
            {
              title: "Example — Substitution",
              problem: "∫ 2x cos(x^2) dx",
              solution: "Let u=x^2 => du=2x dx => ∫ cos(u) du = sin(u)+C = sin(x^2)+C",
              steps: ["Identify u and du, change variables and integrate."]
            },
            {
              title: "Example — Integration by parts",
              problem: "∫ x e^x dx",
              solution: "u=x, dv=e^x dx => du=dx, v=e^x => x e^x − ∫ e^x dx = x e^x − e^x + C",
              steps: ["Choose u and dv, apply formula ∫ u dv = u v − ∫ v du."]
            },
            {
              title: "Practice — Definite integral check",
              problem: "∫_0^1 3x^2 dx",
              solution: "Antiderivative x^3 | 0→1 = 1.",
              steps: ["Compute antiderivative and evaluate bounds."]
            }
          ]
        },

        {
          explanation:
            `Definite integrals and area between curves; disks/washers for volumes; interpret definite integrals as accumulation.`,

          examples: [
            {
              title: "Example — Area between curves",
              problem: "Area between y=x and y=x^2 from 0 to1",
              solution: "∫_0^1 (x − x^2) dx = 1/6",
              steps: ["Top minus bottom integrated across interval."]
            },
            {
              title: "Example — Volume by disks",
              problem: "Volume of revolution of y=x from 0 to1 about x-axis",
              solution: "π∫_0^1 (x^2) dx = π*(1/3)",
              steps: ["Set up disk formula and integrate."]
            },
            {
              title: "Practice — Average value",
              problem: "Average value of f on [a,b] is (1/(b−a))∫_a^b f(x) dx",
              solution: "Apply formula directly in examples.",
              steps: ["Compute definite integral and divide by interval length."]
            }
          ]
        },

        {
          explanation:
            `Series & Taylor intro: geometric and power series; radius of convergence idea and using series for approximation.`,

          examples: [
            {
              title: "Example — Geometric expansion",
              problem: "1/(1 − x) = 1 + x + x^2 + ... for |x|<1",
              solution: "Standard expansion used widely for approximations.",
              steps: ["Recognize standard series and domain of validity."]
            },
            {
              title: "Example — Use of partial sums",
              problem: "Approximate 1/(1−0.2) by first 3 terms",
              solution: "1 + 0.2 + 0.04 = 1.24 (actual 1/0.8 = 1.25)",
              steps: ["Compare partial sum to true value to see error."]
            },
            {
              title: "Practice — Radius test",
              problem: "State domain for which geometric series converges",
              solution: "|r| < 1",
              steps: ["Recall convergence criteria."]
            }
          ]
        },

        {
          explanation:
            `Differential equations (first order): separable equations and linear first-order ODEs. Solve simple growth/decay and mixing models.`,

          examples: [
            {
              title: "Example — Exponential growth",
              problem: "dy/dt = ky, y(0)=y0",
              solution: "y = y0 e^{kt}",
              steps: ["Separate variables and integrate."]
            },
            {
              title: "Example — Mixing problem (simple)",
              problem: "Salt water mixing tank problem (conceptual)",
              solution: "Set up ODE dx/dt = rate_in * conc_in − rate_out * (x/volume).",
              steps: ["Write balance equation and solve linear ODE."]
            },
            {
              title: "Practice — Initial value",
              problem: "Solve dy/dx = 3y, y(0)=2",
              solution: "y=2 e^{3x}",
              steps: ["Separate variables and apply initial condition."]
            }
          ]
        },

        {
          explanation:
            `Partial fractions & rational integrals: decompose rational expressions into simpler fractions for integration.`,

          examples: [
            {
              title: "Example — Partial fraction",
              problem: "Integrate 1/(x^2 − 1) dx",
              solution: "1/2 ln | (x − 1)/(x + 1) | + C",
              steps: ["Decompose into 1/2(1/(x−1) − 1/(x+1)) then integrate."]
            },
            {
              title: "Example — Linear factors",
              problem: "Integrate 1/((x+2)(x+3)) dx",
              solution: "Use partial fractions A/(x+2) + B/(x+3) solve A and B then integrate.",
              steps: ["Set up decomposition, solve coefficients, integrate."]
            },
            {
              title: "Practice — Improper rational",
              problem: "Perform long division then integrate",
              solution: "If degree numerator ≥ degree denominator, divide first.",
              steps: ["Divide, then decompose remainder if needed."]
            }
          ]
        },

        {
          explanation:
            `Numerical methods (intro): trapezoid rule and simple root-finding to approximate integrals and roots when analytic solutions are hard.`,

          examples: [
            {
              title: "Example — Trapezoid rule",
              problem: "Approximate ∫_0^1 e^{x^2} dx with n=2",
              solution: "Compute f(0), f(0.5), f(1), apply trapezoid formula.",
              steps: ["Divide interval, compute trapezoid areas, sum."]
            },
            {
              title: "Example — Bisection method (concept)",
              problem: "Find root of f(x) with sign change",
              solution: "Repeatedly bisect interval and choose subinterval with sign change.",
              steps: ["Iterate until desired precision."]
            },
            {
              title: "Practice — Error estimate",
              problem: "Trapezoid rule error scales with function's second derivative",
              solution: "Review error bound formula for trapezoid rule.",
              steps: ["Check second derivative magnitude on interval."]
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
            `Measurement fundamentals: SI units, significant figures, lab safety, glassware use, and error analysis. Designing controlled experiments and recording uncertainties ensures reproducible results.`,

          examples: [
            {
              title: "Example — Unit conversion",
              problem: "Convert 250 mL to liters and cubic centimeters",
              solution: "0.250 L and 250 cm^3.",
              steps: ["1 mL = 1 cm^3 and 1000 mL = 1 L."]
            },
            {
              title: "Example — Significant figures",
              problem: "Multiply 2.50 × 3.4",
              solution: "8.5 (2 significant figures).",
              steps: ["Round final result to least number of sig figs among factors."]
            },
            {
              title: "Practice — Uncertainty",
              problem: "If mass = 12.3 ± 0.1 g and 5.0 ± 0.1 g are added, what is total uncertainty?",
              solution: "Uncertainties add (approx) => ±0.2 g",
              steps: ["Add absolute uncertainties for independent measurements."]
            }
          ]
        },

        {
          explanation:
            `Atomic theory and electronic configurations: protons/neutrons/electrons, isotopes, and how electron configuration determines chemical behavior.`,

          examples: [
            {
              title: "Example — Electron configuration",
              problem: "Neon (Z=10)",
              solution: "1s^2 2s^2 2p^6",
              steps: ["Fill subshells from lowest energy upwards."]
            },
            {
              title: "Example — Valence electrons",
              problem: "How many valence electrons in Oxygen?",
              solution: "6 valence electrons (group 16).",
              steps: ["Look at group number to deduce valence."]
            },
            {
              title: "Practice — Isotope notation",
              problem: "Write carbon-14",
              solution: "^{14}C (A=14, Z=6).",
              steps: ["Use mass number and atomic number."]
            }
          ]
        },

        {
          explanation:
            `Periodic trends: atomic radius, ionization energy, electronegativity. Use trends to predict reactivity and ionic/covalent tendencies.`,

          examples: [
            {
              title: "Example — Trend comparison",
              problem: "Which is more electronegative: O or S?",
              solution: "Oxygen (higher across period, smaller radius).",
              steps: ["Apply periodic trend logic."]
            },
            {
              title: "Example — Ionization energy",
              problem: "Compare Mg and Na",
              solution: "Mg has higher ionization energy.",
              steps: ["More nuclear charge for Mg in same period."]
            },
            {
              title: "Practice — Predict ion",
              problem: "Does chlorine form Cl− or Cl+?",
              solution: "Cl− (gains electron to achieve noble gas config).",
              steps: ["Consider octet rule and electron affinity trends."]
            }
          ]
        },

        {
          explanation:
            `Bonding & molecular geometry: Lewis structures, VSEPR, hybridization and how shape influences polarity and physical properties.`,

          examples: [
            {
              title: "Example — Lewis & shape",
              problem: "NH3 geometry",
              solution: "Trigonal pyramidal (~107°).",
              steps: ["Count bonding and lone pairs, apply VSEPR."]
            },
            {
              title: "Example — Polarity",
              problem: "Is CO2 polar?",
              solution: "No — linear molecule with equal bond dipoles cancel.",
              steps: ["Check molecular geometry and vector sum of dipoles."]
            },
            {
              title: "Practice — Hybridization",
              problem: "What is hybridization of carbon in CH4?",
              solution: "sp^3",
              steps: ["Count sigma bonds and lone pairs on the atom."]
            }
          ]
        },

        {
          explanation:
            `Stoichiometry: mole concept, balancing equations, limiting reagent, percent yield — core problem-solving skills in chemistry.`,

          examples: [
            {
              title: "Example — Limiting reagent",
              problem: "2 mol H2 + 1 mol O2 -> how many mol H2O?",
              solution: "2 mol H2O produced.",
              steps: ["Use balanced equation stoichiometry."]
            },
            {
              title: "Example — Molar mass calc",
              problem: "Molar mass of H2SO4",
              solution: "2*1 + 32 + 4*16 = 98 g/mol",
              steps: ["Sum atomic masses per formula."]
            },
            {
              title: "Practice — Percent yield",
              problem: "If theoretical yield 10 g and actual 8 g, percent yield?",
              solution: "80%",
              steps: ["(actual/theoretical)*100"]
            }
          ]
        },

        {
          explanation:
            `States of matter & IMFs: compare gas/liquid/solid; hydrogen bonding and its effect on properties like boiling points and specific heat.`,

          examples: [
            {
              title: "Example — Boiling point reason",
              problem: "Why water high bp?",
              solution: "Strong hydrogen bonding between molecules increases bp.",
              steps: ["Compare IMF strengths across molecules."]
            },
            {
              title: "Example — Phase change energy",
              problem: "Latent heat needed to melt ice (qualitative)",
              solution: "Calculate using mass*latent heat if numbers given.",
              steps: ["Differentiate heat for phase vs temperature change."]
            },
            {
              title: "Practice — Relative IMF",
              problem: "Which has stronger IMFs: CH4 or H2O?",
              solution: "H2O",
              steps: ["Use polarity and H-bonding presence as guide."]
            }
          ]
        },

        {
          explanation:
            `Solutions & concentration: molarity, molality, mass percent, dilution, colligative effects; practical lab calculations.`,

          examples: [
            {
              title: "Example — Dilution",
              problem: "Prepare 1 L of 0.1 M from 1.0 M stock",
              solution: "V1 = 0.1 L = 100 mL stock, dilute to 1 L.",
              steps: ["Use C1V1 = C2V2."]
            },
            {
              title: "Example — Molarity calc",
              problem: "How many moles in 0.5 L of 2 M solution?",
              solution: "1.0 mol",
              steps: ["n = M * V (L)"]
            },
            {
              title: "Practice — Mass percent",
              problem: "Compute mass percent given masses of solute and solvent",
              solution: "mass% = (mass solute / total mass)*100",
              steps: ["Plug numbers and compute."]
            }
          ]
        },

        {
          explanation:
            `Basic organic functional groups: identification of alcohols, alkenes, alkynes, carbonyls and how functional groups influence reactivity.`,

          examples: [
            {
              title: "Example — Identify group",
              problem: "CH3CH2OH",
              solution: "Alcohol: ethanol.",
              steps: ["Look for -OH group attached to carbon."]
            },
            {
              title: "Example — Addition example",
              problem: "HBr + CH2=CH2 -> ?",
              solution: "CH3CH2Br (Markovnikov addition).",
              steps: ["Add H and Br across double bond per rule."]
            },
            {
              title: "Practice — Nomenclature",
              problem: "Name CH3-CH2-CH2-OH",
              solution: "1-propanol",
              steps: ["Identify longest chain and functional group position."]
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
            `Gases and kinetic theory: ideal gas law, partial pressures, kinetic interpretation of temperature and pressure; applications and unit conversions.`,

          examples: [
            {
              title: "Example — Ideal gas calc",
              problem: "n at 2.0 atm, 5.0 L, 300 K (R=0.08206)",
              solution: "n ≈ 0.406 mol",
              steps: ["Use PV = nRT and solve for n."]
            },
            {
              title: "Example — Partial pressure",
              problem: "P_A = x_A * P_total for mixture",
              solution: "If mole fraction 0.3 and total 1.0 atm, P_A = 0.3 atm",
              steps: ["Apply Dalton's law"]
            },
            {
              title: "Practice — Gas density",
              problem: "Density of gas using ideal gas law (ρ = PM/RT)",
              solution: "Compute by plugging molar mass M, P, R, T.",
              steps: ["Use correct units for molar mass and R."]
            }
          ]
        },

        {
          explanation:
            `Thermochemistry: heats of reaction, Hess's law, calorimetry and enthalpy changes. Use thermochemical cycles and bond enthalpies conceptually.`,

          examples: [
            {
              title: "Example — Calorimetry",
              problem: "Heat to raise 200 g water by 10°C (c=4.18 J/g°C)",
              solution: "q = 200*4.18*10 = 8360 J",
              steps: ["Apply q = mcΔT formula."]
            },
            {
              title: "Example — Hess",
              problem: "Combine enthalpies to find unknown ΔH",
              solution: "Reverse and sum reactions with enthalpy algebra.",
              steps: ["Flip/sign and add equations as required."]
            },
            {
              title: "Practice — Bond enthalpy estimate",
              problem: "Approximate ΔH for simple combustion using bond energies",
              solution: "Sum bonds broken minus formed using lookup values.",
              steps: ["Use bond enthalpy table to estimate."]
            }
          ]
        },

        {
          explanation:
            `Chemical kinetics: rate laws, orders, activation energy and temperature effect (Arrhenius). Experimental determination via concentration vs time data.`,

          examples: [
            {
              title: "Example — Reaction order",
              problem: "If rate doubles when [A] doubles, order is 1",
              solution: "First order with respect to that reactant",
              steps: ["Use proportional comparison to infer exponent."]
            },
            {
              title: "Example — Half-life first order",
              problem: "t1/2 = ln2 / k for first order",
              solution: "Compute given k to get t1/2.",
              steps: ["Apply formula for first-order decay."]
            },
            {
              title: "Practice — Rate constant units",
              problem: "Units of k for second-order reaction",
              solution: "mol^{-1} L s^{-1}",
              steps: ["Use rate expression units to deduce k units."]
            }
          ]
        },

        {
          explanation:
            `Equilibrium: Kc/Kp, ICE tables, and Le Châtelier predictions for stress on chemical systems.`,

          examples: [
            {
              title: "Example — ICE table solve",
              problem: "A ⇌ B, K=4, initial [A]=1, [B]=0",
              solution: "x=0.8 → [A]=0.2 [B]=0.8",
              steps: ["Set x, form K expression, solve algebraically."]
            },
            {
              title: "Example — Le Chatelier qualitative",
              problem: "Add more reactant, what happens?",
              solution: "System shifts to produce more product.",
              steps: ["Apply principle of shifting to reduce stress."]
            },
            {
              title: "Practice — Kc vs Q",
              problem: "If Q<K, which side favored?",
              solution: "Forward reaction to reach equilibrium (products increase).",
              steps: ["Compare reaction quotient to K."]
            }
          ]
        },

        {
          explanation:
            `Acids, bases & buffers: pH/pOH, Ka/Kb, Henderson-Hasselbalch for buffer pH and titration curves qualitatively.`,

          examples: [
            {
              title: "Example — Strong acid pH",
              problem: "0.01 M HCl pH?",
              solution: "pH = 2",
              steps: ["Strong acid dissociates completely [H+] = 0.01."]
            },
            {
              title: "Example — Weak acid approx",
              problem: "0.1 M acetic acid Ka=1.8e-5",
              solution: "x ≈ sqrt(Ka*C) ≈ 0.00134 => pH ~ 2.87",
              steps: ["Use approximation x << C to simplify Ka expression."]
            },
            {
              title: "Practice — Buffer calc",
              problem: "pH of buffer with equal concentrations",
              solution: "pH = pKa",
              steps: ["Use Henderson-Hasselbalch with ratio=1 -> log 0 = 0."]
            }
          ]
        },

        {
          explanation:
            `Electrochemistry basics: redox half-reactions, balancing, cell potentials and simple battery concepts.`,

          examples: [
            {
              title: "Example — Cell potential",
              problem: "Compute Ecell = E°cathode − E°anode",
              solution: "If given table values, subtract accordingly",
              steps: ["Identify which half is cathode/anode under spontaneous conditions."]
            },
            {
              title: "Example — Balancing redox (acidic)",
              problem: "Balance MnO4− → Mn2+",
              solution: "Use half-reaction method with H2O and H+ in acidic solution.",
              steps: ["Separate oxidation/reduction, balance atoms and charges."]
            },
            {
              title: "Practice — Corrosion idea",
              problem: "Why is iron prone to rust?",
              solution: "Galvanic cells form with moisture and oxygen leading to oxidation of Fe.",
              steps: ["Consider electrochemical couples and environmental factors."]
            }
          ]
        },

        {
          explanation:
            `Intro to organic reactions: basic substitution, addition and elimination conceptual mechanisms for simple transforms.`,

          examples: [
            {
              title: "Example — Addition to alkenes",
              problem: "Hydrogenation of ethene → ethane",
              solution: "Add H2 across double bond with catalyst.",
              steps: ["Recognize addition reduces unsaturation."]
            },
            {
              title: "Example — Substitution (SN1 vs SN2)",
              problem: "Primary vs tertiary substrates favor which mechanism?",
              solution: "Primary favors SN2, tertiary favors SN1",
              steps: ["Consider carbocation stability and steric hindrance."]
            },
            {
              title: "Practice — Functional group transformation",
              problem: "Convert alcohol to alkyl halide (concept)",
              solution: "Use HCl/HBr or PBr3 depending on conditions.",
              steps: ["Identify reagent and mechanism type."]
            }
          ]
        },

        {
          explanation:
            `Environmental & industrial chemistry: overview of fuel chemistry, pollution, water treatment and industrial processes like distillation.`,

          examples: [
            {
              title: "Example — Fuel comparison",
              problem: "Energy density: petrol vs ethanol",
              solution: "Petrol has higher energy per volume; ethanol cleaner but lower energy.",
              steps: ["Compare calorific values and oxygen content."]
            },
            {
              title: "Example — Water treatment (conceptual)",
              problem: "Primary steps in treatment",
              solution: "Screening, sedimentation, filtration, disinfection",
              steps: ["Understand purpose of each step to remove contaminants."]
            },
            {
              title: "Practice — Emissions overview",
              problem: "Major products of combustion",
              solution: "CO2, H2O, NOx and possibly CO if incomplete",
              steps: ["Relate fuel composition to combustion products."]
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
            `Units and dimensional analysis first — check formulas and convert units reliably. Vectors represent quantity and direction; resolve into components and add them using geometry or components.`,

          examples: [
            {
              title: "Example — Dimensional check",
              problem: "Confirm units of 1/2 mv^2",
              solution: "kg * (m^2/s^2) = J",
              steps: ["Multiply units and match to Joule definition"]
            },
            {
              title: "Example — Vector components",
              problem: "Resolve 10 N at 30°",
              solution: "Fx = 8.66 N, Fy = 5 N",
              steps: ["Fx = F cosθ, Fy = F sinθ"]
            },
            {
              title: "Practice — Unit conversion",
              problem: "Convert 5 m/s to km/h",
              solution: "5 * 3.6 = 18 km/h",
              steps: ["Multiply m/s by 3.6"]
            }
          ]
        },

        {
          explanation:
            `Kinematics: position, velocity, acceleration relations; projectiles decomposed into independent horizontal and vertical motions.`,

          examples: [
            {
              title: "Example — Projectile",
              problem: "25 m/s at 45°, find range",
              solution: "range ≈ 63.9 m (compute components and time of flight)",
              steps: ["vx = v cosθ, vy = v sinθ, time = 2 vy / g, range = vx * time"]
            },
            {
              title: "Example — Constant acceleration eqns",
              problem: "s = ut + 1/2 at^2",
              solution: "Use to compute displacement given u,a,t",
              steps: ["Plug known values and solve"]
            },
            {
              title: "Practice — Average velocity",
              problem: "If object moves 10 m in 2 s and then 20 m in 4 s, average velocity?",
              solution: "Total displacement 30 m / total time 6 s = 5 m/s",
              steps: ["Sum displacements divide by total time"]
            }
          ]
        },

        {
          explanation:
            `Newton's laws: free-body diagrams, solve for acceleration and forces including friction and normal reactions.`,

          examples: [
            {
              title: "Example — Inclined plane frictionless",
              problem: "5 kg on 30°, a = ?",
              solution: "a = g sin30 = 4.9 m/s^2",
              steps: ["Resolve gravitational component along plane."]
            },
            {
              title: "Example — With friction",
              problem: "Include μ_k in calculation",
              solution: "a = g sinθ − μ_k g cosθ",
              steps: ["Subtract friction magnitude from driving component"]
            },
            {
              title: "Practice — Tension problem",
              problem: "Two masses over pulley find acceleration",
              solution: "Use Newton's 2nd on both masses and solve simultaneously",
              steps: ["Write equations for each mass and solve"]
            }
          ]
        },

        {
          explanation:
            `Work, energy & power: energy conservation, power as rate of doing work, and solving using energy methods.`,

          examples: [
            {
              title: "Example — Energy conversion",
              problem: "2 kg falls 3 m, speed before impact?",
              solution: "v = sqrt(2gh) ≈ 7.67 m/s",
              steps: ["mgh = 1/2 mv^2 -> solve for v"]
            },
            {
              title: "Example — Work by variable force",
              problem: "W = ∫ F(x) dx",
              solution: "Compute integral for given function",
              steps: ["Set up integral and integrate"]
            },
            {
              title: "Practice — Power",
              problem: "Power if 100 J is done in 5 s",
              solution: "20 W",
              steps: ["P = W/t"]
            }
          ]
        },

        {
          explanation:
            `Momentum & collisions: impulse and conservation of momentum; classify elastic and inelastic collisions.`,

          examples: [
            {
              title: "Example — Perfectly inelastic",
              problem: "m1=1kg (4 m/s) collides with m2=2kg at rest, stick",
              solution: "v_final = 4/3 m/s",
              steps: ["Conserve momentum total and divide by combined mass"]
            },
            {
              title: "Example — Elastic collision (concept)",
              problem: "Solve using conservation of momentum and energy",
              solution: "Use algebraic simultaneous equations or formulas",
              steps: ["Set up two equations and solve"]
            },
            {
              title: "Practice — Impulse",
              problem: "Force 10 N applied for 0.5 s, change in momentum?",
              solution: "Δp = F Δt = 5 N·s",
              steps: ["Multiply force by time to get impulse"]
            }
          ]
        },

        {
          explanation:
            `Statics & equilibrium: ΣF=0 and Στ=0 to solve for reactions in simple beams and structures.`,

          examples: [
            {
              title: "Example — Beam reaction",
              problem: "Calculate support reaction given distributed load",
              solution: "Use moments and force balances",
              steps: ["Sum torques about a pivot and solve"]
            },
            {
              title: "Example — Center of mass idea",
              problem: "Find center for two mass system",
              solution: "Weighted average of positions",
              steps: ["Compute using sum(m_i x_i)/sum(m_i)"]
            },
            {
              title: "Practice — Simple equilibrium",
              problem: "Balance forces: F1 + F2 + F3 = 0",
              solution: "Find unknown vector that satisfies balance",
              steps: ["Add components and set to zero"]
            }
          ]
        },

        {
          explanation:
            `Fluid mechanics intro: density, pressure, buoyancy and continuity.`,

          examples: [
            {
              title: "Example — Buoyancy",
              problem: "Does object density 500 kg/m^3 float?",
              solution: "Yes (less than water 1000 kg/m^3).",
              steps: ["Compare densities"]
            },
            {
              title: "Example — Continuity",
              problem: "A1 v1 = A2 v2",
              solution: "If area halves speed doubles",
              steps: ["Apply conservation of mass for incompressible flow"]
            },
            {
              title: "Practice — Pressure calc",
              problem: "Pressure at depth h in fluid ρ",
              solution: "P = ρ g h",
              steps: ["Multiply density, g and depth"]
            }
          ]
        },

        {
          explanation:
            `Thermal basics: specific heat, latent heat, heat transfer modes.`,

          examples: [
            {
              title: "Example — Specific heat",
              problem: "Heat to raise 0.2 kg water by 30°C",
              solution: "q = 0.2*4186*30 = 25116 J",
              steps: ["Use q = m c ΔT"]
            },
            {
              title: "Example — Phase change",
              problem: "Energy to melt mass m with latent L",
              solution: "q = m L",
              steps: ["Apply latent heat formula"]
            },
            {
              title: "Practice — Conduction idea",
              problem: "Qualitatively compare conduction in metals vs nonmetals",
              solution: "Metals conduct better due to free electrons",
              steps: ["Reason by microscopic carriers of heat"]
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
        "Modern physics: photoelectric effect intro"
      ],
      Content: [
        {
          explanation:
            `Circular motion: keep track of centripetal acceleration a_c = v^2/r and centripetal force F = m v^2 / r.`,

          examples: [
            {
              title: "Example — Centripetal acceleration",
              problem: "Car radius 40 m at 15 m/s",
              solution: "a_c = v^2/r = 225/40 = 5.625 m/s^2",
              steps: ["Apply formula directly"]
            },
            {
              title: "Example — Banking curve idea",
              problem: "Find safe speed on banked curve given angle",
              solution: "Use force balances including normal component",
              steps: ["Resolve forces into radial components and solve"]
            },
            {
              title: "Practice — Period/ frequency",
              problem: "Relate T and f (T=1/f)",
              solution: "Compute one from the other as needed",
              steps: ["Use reciprocal relation"]
            }
          ]
        },

        {
          explanation:
            `Gravitation: Newton's law and orbital basics; escape velocity concept.`,

          examples: [
            {
              title: "Example — Orbital speed (concept)",
              problem: "v = sqrt(GM/R)",
              solution: "Plug Earth mass & radius for LEO estimate",
              steps: ["Use constants and compute approximate numbers"]
            },
            {
              title: "Example — Escape velocity",
              problem: "v_escape = sqrt(2GM/R)",
              solution: "Larger than orbital speed by sqrt(2)",
              steps: ["Use energy argument equating kinetic to gravitational potential"]
            },
            {
              title: "Practice — Gravitational acceleration",
              problem: "Compute g at surface of planet with given mass/radius",
              solution: "g = GM/R^2",
              steps: ["Plug numbers to find g"]
            }
          ]
        },

        {
          explanation:
            `SHM and waves: spring-mass T = 2π sqrt(m/k), wave relations v = f λ and energy transport concepts.`,

          examples: [
            {
              title: "Example — SHM period",
              problem: "T = 2π sqrt(m/k)",
              solution: "Plug m and k to compute T",
              steps: ["Check units and compute"]
            },
            {
              title: "Example — Wave speed",
              problem: "v = f λ with f=5 Hz and λ=2 m",
              solution: "v = 10 m/s",
              steps: ["Multiply frequency by wavelength"]
            },
            {
              title: "Practice — Energy in oscillator",
              problem: "Total mechanical energy = 1/2 k A^2",
              solution: "Use amplitude A and spring constant k",
              steps: ["Plug numbers to compute energy"]
            }
          ]
        },

        {
          explanation:
            `Sound & Doppler effect: frequency shift due to relative motion and intensity/decibel basics.`,

          examples: [
            {
              title: "Example — Doppler qualitative",
              problem: "Ambulance approaching frequency increase",
              solution: "Observer hears higher frequency",
              steps: ["Apply Doppler formula for quantitative estimate"]
            },
            {
              title: "Example — Intensity relation",
              problem: "Decibel change with power ratio",
              solution: "ΔdB = 10 log10(P2/P1)",
              steps: ["Use log rules to find dB difference"]
            },
            {
              title: "Practice — Wavelength in medium",
              problem: "Given f and v in medium compute λ",
              solution: "λ = v/f",
              steps: ["Compute from relation"]
            }
          ]
        },

        {
          explanation:
            `Electric fields & circuits: Coulomb's law, simple resistor circuits, Ohm's law and series/parallel rules.`,

          examples: [
            {
              title: "Example — Series resistors",
              problem: "10Ω and 20Ω series => R_eq",
              solution: "30Ω",
              steps: ["Sum resistances"]
            },
            {
              title: "Example — Parallel resistors",
              problem: "10Ω // 20Ω => R_eq",
              solution: "R_eq = 1/(1/10 + 1/20) = 6.667Ω",
              steps: ["Compute reciprocal sum"]
            },
            {
              title: "Practice — Ohm's law",
              problem: "V=IR compute I for V=12V, R=6Ω",
              solution: "I = 2A",
              steps: ["Divide voltage by resistance"]
            }
          ]
        },

        {
          explanation:
            `Magnetism & induction intro: Lorentz force conceptually and Faraday's law for induced emf.`,

          examples: [
            {
              title: "Example — Faraday concept",
              problem: "Changing flux induces emf",
              solution: "emf = −dΦ/dt",
              steps: ["Understand sign via Lenz' law"]
            },
            {
              title: "Example — Force on current",
              problem: "F = I L × B magnitude",
              solution: "Compute using current, length and B field",
              steps: ["Use cross product magnitude formula"]
            },
            {
              title: "Practice — Induced current direction",
              problem: "Predict direction using Lenz' law",
              solution: "Opposes change causing it",
              steps: ["Set up cause and effect"]
            }
          ]
        },

        {
          explanation:
            `Optics basics: reflection/refraction, Snell's law and thin lens equation for image formation.`,

          examples: [
            {
              title: "Example — Snell's law",
              problem: "n1 sinθ1 = n2 sinθ2",
              solution: "Solve for angle in second medium",
              steps: ["Rearrange and apply inverse sine"]
            },
            {
              title: "Example — Total internal reflection",
              problem: "Occurs when sinθ2>1 (beyond critical angle)",
              solution: "Condition depends on indices n1>n2",
              steps: ["Compute critical angle"]
            },
            {
              title: "Practice — Lens equation",
              problem: "1/f = 1/do + 1/di",
              solution: "Find image distance given object distance and focal length",
              steps: ["Rearrange and solve"]
            }
          ]
        },

        {
          explanation:
            `Modern physics intro: photoelectric effect introduces quantum behaviour; E=hf and threshold frequency ideas.`,

          examples: [
            {
              title: "Example — Photoelectric concept",
              problem: "Light below threshold frequency ejects no electrons",
              solution: "Photon energy insufficient to overcome work function",
              steps: ["Relate E=hf to material work function"]
            },
            {
              title: "Example — Photon energy calc",
              problem: "Compute energy of photon with f",
              solution: "E = h f (in joules)",
              steps: ["Use Planck's constant and frequency"]
            },
            {
              title: "Practice — Work function idea",
              problem: "Given λ threshold compute minimum frequency",
              solution: "f_threshold = c/λ_threshold",
              steps: ["Convert wavelength to frequency using c."]
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
            `Study skills: active recall, spaced repetition, focused practice and planning. Learn how to create a study timetable and apply evidence-based techniques like interleaving and retrieval practice.`,

          examples: [
            {
              title: "Example — Spaced repetition plan",
              problem: "Design a 10-day plan for 4 topics",
              solution: "Rotate topics with increasing intervals (1d,3d,7d) and include short quizzes.",
              steps: ["Map days, set micro-goals and schedule reviews."]
            },
            {
              title: "Example — Pomodoro application",
              problem: "Use 25/5 minutes for focused study",
              solution: "4 cycles then longer break to maintain focus",
              steps: ["Set timer and remove distractions."]
            },
            {
              title: "Practice — Active recall",
              problem: "Convert notes into questions for self-testing",
              solution: "Produce short flashcards and test yourself without looking",
              steps: ["Form question from each key point."]
            }
          ]
        },

        {
          explanation:
            `Grammar essentials: parts of speech, subject-verb agreement, tense consistency and punctuation for clarity.`,

          examples: [
            {
              title: "Example — Tense consistency",
              problem: "Correct 'She went to the store and buys milk.'",
              solution: "'She went to the store and bought milk.'",
              steps: ["Match verbs to the same tense"]
            },
            {
              title: "Example — Subject-verb",
              problem: "'The list of items (is/are) on the desk.'",
              solution: "is (list is singular)",
              steps: ["Identify subject and ignore prepositional phrase"]
            },
            {
              title: "Practice — Punctuation",
              problem: "Use commas correctly in a complex sentence",
              solution: "Place commas after introductory clauses and between independent clauses when joined by conjunctions.",
              steps: ["Follow comma rules and check clarity."]
            }
          ]
        },

        {
          explanation:
            `Essay & paragraph structure: thesis, topic sentences, evidence and synthesis; drafting and editing strategies.`,

          examples: [
            {
              title: "Example — Thesis crafting",
              problem: "Write thesis for renewable energy benefits",
              solution: "\"Investment in renewable energy increases energy security, reduces emissions, and creates jobs.\"",
              steps: ["State claim and major supporting points."]
            },
            {
              title: "Example — Paragraph unity",
              problem: "Construct paragraph supporting a thesis",
              solution: "Begin with topic sentence, provide evidence, conclude linking back to thesis.",
              steps: ["Ensure each sentence supports the topic sentence."]
            },
            {
              title: "Practice — Transition usage",
              problem: "Add transitions between paragraphs",
              solution: "Use linking phrases to guide reader (e.g., however, moreover).",
              steps: ["Choose transitions that reflect logical relation."]
            }
          ]
        },

        {
          explanation:
            `Reading comprehension: previewing, questioning, annotating, summarizing and evaluating arguments critically.`,

          examples: [
            {
              title: "Example — Preview strategy",
              problem: "Scan headings and first sentences to capture structure",
              solution: "Identify thesis and main supporting points before deep read",
              steps: ["Skim then formulate questions to answer on full read."]
            },
            {
              title: "Example — Summarization",
              problem: "Summarize a short passage in two sentences",
              solution: "Condense main idea and key evidence concisely.",
              steps: ["Pick thesis and two supporting points."]
            },
            {
              title: "Practice — Critical read",
              problem: "Evaluate an article's evidence quality",
              solution: "Check source, methodology and potential bias.",
              steps: ["Apply CRAAP test."]
            }
          ]
        },

        {
          explanation:
            `Referencing & plagiarism: citation basics, paraphrasing techniques and academic honesty principles.`,

          examples: [
            {
              title: "Example — APA citation",
              problem: "Cite a book author in text",
              solution: "(Author, Year) e.g., (Smith, 2020)",
              steps: ["Provide full reference in references section."]
            },
            {
              title: "Example — Paraphrase test",
              problem: "How to paraphrase without plagiarism",
              solution: "Rewrite idea in your own words and cite original source.",
              steps: ["Avoid copying sentence structure; cite appropriately."]
            },
            {
              title: "Practice — Reference formatting",
              problem: "Format a journal article reference (simple)",
              solution: "Author(s). (Year). Title. Journal, volume(issue), pages.",
              steps: ["Follow style guide rules for punctuation and order."]
            }
          ]
        },

        {
          explanation:
            `Note-taking systems: Cornell, mapping and outlines; converting notes into practice questions for retrieval practice.`,

          examples: [
            {
              title: "Example — Cornell structure",
              problem: "Take notes for lecture effectively",
              solution: "Left cues, main notes right, summary at bottom.",
              steps: ["Review and produce recall questions from cues."]
            },
            {
              title: "Example — Mind-map usage",
              problem: "Organize complex topic visually",
              solution: "Central node with branches for subtopics and examples",
              steps: ["Use for brainstorming and linking concepts."]
            },
            {
              title: "Practice — Revision cards",
              problem: "Convert notes to flashcards",
              solution: "Write question on front, answer on back and review daily",
              steps: ["Use spaced repetition scheduling for cards."]
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
            `Research skills include database searching, source evaluation, annotated bibliographies and forming research questions.`,

          examples: [
            {
              title: "Example — Evaluate source",
              problem: "Assess blog claiming 'miracle' results",
              solution: "Check author, citations, methodology and peer-review status.",
              steps: ["Apply CRAAP test."]
            },
            {
              title: "Example — Search strategy",
              problem: "Construct search query for climate change impacts",
              solution: "Use boolean operators and key terms e.g., \"climate change\" AND \"crop yield\"",
              steps: ["Refine terms and use filters for recency/peer-reviewed sources."]
            },
            {
              title: "Practice — Annotated bibliography",
              problem: "Write 2–3 sentences summarizing article relevance",
              solution: "Summarize purpose, methods and key findings and note usefulness.",
              steps: ["Be brief and evaluative, not just descriptive."]
            }
          ]
        },

        {
          explanation:
            `Presentation skills: structure, slide design, delivery techniques and remote presentation best practices.`,

          examples: [
            {
              title: "Example — Slide structure",
              problem: "Design title slide for 7-min talk",
              solution: "Clear title, speaker name, short subtitle and visual hook",
              steps: ["Keep text minimal and highlight key message."]
            },
            {
              title: "Example — Delivery tip",
              problem: "Manage nervousness before talk",
              solution: "Practice, breathe and start with a strong opening line",
              steps: ["Rehearse with timer and visualize success."]
            },
            {
              title: "Practice — Q&A prep",
              problem: "Anticipate 3 tough questions and prepare answers",
              solution: "Create concise, evidence-backed responses",
              steps: ["Practice responding in 1–2 minutes per question."]
            }
          ]
        },

        {
          explanation:
            `CV & interview preparation: achievements-based CVs, STAR answers and professional communication norms.`,

          examples: [
            {
              title: "Example — STAR answer",
              problem: "Describe leading a team to deliver a project",
              solution: "S: context, T: task, A: actions, R: results (quantify)",
              steps: ["Follow STAR structure and practice concise delivery."]
            },
            {
              title: "Example — CV bullet",
              problem: "Rewrite 'worked on project' to impact bullet",
              solution: "'Led 5-person team to deliver X, improving Y by 20%'",
              steps: ["Quantify impact and highlight role."]
            },
            {
              title: "Practice — Cover letter hook",
              problem: "Write opening sentence for cover letter",
              solution: "Mention role, highlight strongest match to job.",
              steps: ["Be specific and tailored to the posting."]
            }
          ]
        },

        {
          explanation:
            `Exam strategy & stress management: timed practice, sleep, nutrition and focus techniques to optimize exam performance.`,

          examples: [
            {
              title: "Example — Mock exam strategy",
              problem: "Plan 60-min mock for 3 topics",
              solution: "45 min solving (15 per topic), 15 min review",
              steps: ["Time strictly and record error types for follow-up."]
            },
            {
              title: "Example — Stress tool",
              problem: "Quick breathing technique",
              solution: "4-4-4 box breathing to calm nerves",
              steps: ["Inhale 4 sec, hold 4 sec, exhale 4 sec."]
            },
            {
              title: "Practice — Post-exam debrief",
              problem: "How to use mistakes to improve",
              solution: "Log errors by topic and plan targeted practice next week",
              steps: ["Prioritize high-frequency and high-weight topics."]
            }
          ]
        }
      ]
    }
  ] // End Gst
};

export default LessonContent;
