// src/components/lesson/courses/Chemistry.jsx
import React from "react";
import LessonPlayer from "../shared/LessonPlayer";

/**
 * Chemistry.jsx (Expanded - tutor-friendly, ~1 page per topic)
 *
 * - Matches Physics.jsx structure: courseContent array with Sessions
 * - Each topic uses a teaching tone, step-by-step guidance, common mistakes,
 *   teacher tips, and worked examples (3+) plus quick quizzes.
 *
 * Note: Explanations use plain strings (no backticks) to avoid build issues.
 */

const ChemistryContent = [
  {
    Session: "First Semester",
    Topics: [
      "Matter, Measurement & Significant Figures",
      "Atomic Structure & Isotopes",
      "Electron Configuration & Periodic Trends",
      "Chemical Bonding & Polarity",
      "Lewis Structures & Molecular Geometry (VSEPR)",
      "Stoichiometry, Limiting Reagents & Yield",
      "States of Matter & Gas Laws",
      "Acids, Bases, pH, and Titration Fundamentals"
    ],
    Content: [
      // 1 Matter, Measurement & Significant Figures
      {
        explanation:
"The goal of this lesson is to build a habit of precise measurement and reporting. " +
"In chemistry every numerical answer carries an implied quality: how well was it measured? " +
"I teach students to write numbers with units always, to convert units with dimensional analysis, and to round results according to significant figures. Start every calculation by writing what you know and the units. If you need to convert, multiply by conversion factors written as fractions so units cancel cleanly. When using instruments, report the final digit as the estimated one — this is what sig figs represent.\n\n" +
"**Practical steps I recommend:**\n" +
"1) Write values with units. 2) Convert to consistent units before combining. 3) Track sig fig rules: nonzero digits are significant; zeros between digits are significant; leading zeros are not significant; trailing zeros are significant only if a decimal is shown. 4) For multiplication/division round to the fewest sig figs among inputs; for addition/subtraction round to the fewest decimal places. 5) Keep an extra guard digit internally and only round at the end of a multi-step solution.\n\n" +
"**Common mistakes:** mixing units (e.g., meters and centimeters), forgetting that exact counted values (like 3 apples) or defined conversion constants (1 in = 2.54 cm exactly) do not limit sig figs, and prematurely rounding intermediate steps. " +
"**Teacher tip:** if your answer is physically impossible (negative mass, an absurdly large temperature), re-check units and arithmetic.",
        examples: [
          {
            title: "Example — Unit conversion",
            problem: "Convert 120 km/h to m/s.",
            solution: "120 km/h = 33.333... m/s → report as 33.3 m/s (3 sig figs)",
            steps: [
              "120 km/h × (1000 m / 1 km) = 120000 m/h",
              "Convert hours to seconds: 120000 / 3600 = 33.333... m/s",
              "120 has 3 sig figs so report 33.3 m/s."
            ],
            hint: "Keep exact factors for conversion, then round at the end."
          },
          {
            title: "Example — Significant figures in multiplication",
            problem: "Multiply 2.50 × 3.1",
            solution: "2.50 × 3.1 = 7.75 → 2 sig figs (3.1) => 7.8",
            steps: [
              "Compute exact: 2.50 × 3.1 = 7.75",
              "Fewest sig figs among inputs is 2 (3.1), so round to 2 sig figs -> 7.8."
            ],
            hint: "Keep a clear record of sig figs for each input."
          },
          {
            title: "Practice — Addition with decimals",
            problem: "Add 12.11 + 0.3 + 1.234",
            solution: "12.11 + 0.3 + 1.234 = 13.644 -> least decimal place is tenths -> 13.6",
            steps: [
              "Add to get 13.644.",
              "Round to one decimal place (0.3 has only 1 decimal) -> 13.6."
            ],
            hint: "Align decimal points when adding; match decimal place accuracy."
          }
        ],
        quiz: [
          { q: "How many sig figs does 0.00450 have?", a: "3 (4, 5, and trailing 0)"},
          { q: "Multiplication sig-figs rule in one line?", a: "Result has same number of sig figs as the input with fewest sig figs." }
        ]
      },

      // 2 Atomic Structure & Isotopes
      {
        explanation:
"This topic explains what atoms are and why isotopes matter. I like to start by describing the three subatomic particles: protons, neutrons, and electrons. Protons (positive) and neutrons (neutral) are in the nucleus; electrons (negative) occupy shells around the nucleus. The number of protons is the atomic number Z and defines the element. The mass number A is protons plus neutrons. Isotopes are atoms of the same element that differ in neutron count. Chemically they behave very similarly, but their masses differ and some isotopes are radioactive.\n\n" +
"When solving problems: first find Z from the periodic table, then use A to compute neutrons by subtraction. For ions, adjust the electron count by the charge sign. For average atomic mass questions, multiply each isotopic mass by its fractional abundance and sum the results.\n\n" +
"**Teacher tip:** Always state whether an atom is neutral before assuming electrons = protons. For isotope practice, compare physical properties (like mass-dependent behavior) and nuclear properties (radioactivity).",
        examples: [
          {
            title: "Example — Basic counting",
            problem: "For 35Cl, find protons, neutrons, electrons (neutral atom).",
            solution: "Protons = 17 (atomic number), Neutrons = 35 − 17 = 18, Electrons = 17",
            steps: [
              "Look up Cl atomic number = 17.",
              "Neutrons = mass number − atomic number = 18.",
              "Neutral atom => electrons = protons = 17."
            ],
            hint: "Write Z and A before doing calculations."
          },
          {
            title: "Example — Ion example",
            problem: "For 27Al3+, how many electrons?",
            solution: "Al has Z = 13, so electrons = 13 − 3 = 10",
            steps: [
              "Identify atomic number 13.",
              "3+ means loss of three electrons, so electrons = 10."
            ],
            hint: "Positive charge reduces electron count; negative charge increases it."
          },
          {
            title: "Practice — Average atomic mass",
            problem: "Isotopes: 60 amu (70% abundance), 62 amu (30%). Find average mass.",
            solution: "0.70×60 + 0.30×62 = 42 + 18.6 = 60.6 amu",
            steps: [
              "Convert percentages to decimals, multiply each mass by its fraction, add results."
            ],
            hint: "The average will be between the isotope masses, nearer the more abundant isotope."
          }
        ],
        quiz: [
          { q: "What defines the element identity?", a: "Number of protons (atomic number)."},
          { q: "Do isotopes have the same chemical behavior?", a: "Generally yes; electrons determine chemistry, neutrons affect mass and nuclear properties." }
        ]
      },

      // 3 Electron Configuration & Periodic Trends
      {
        explanation:
"Here I teach how electrons are arranged and how this arrangement produces periodic trends. Electrons occupy orbitals in order of increasing energy (Aufbau principle). Hund's rule and Pauli exclusion are practical guides: fill orbitals singly first, then pair; no two electrons in the same atom have identical quantum numbers. Use noble-gas shorthand to compress configurations.\n\n" +
"Understanding electron configuration lets you predict valence electrons, typical charges, bonding behavior, and periodic trends. Across a period nuclear charge increases and electrons are pulled closer (atomic radius decreases); ionization energy and electronegativity generally increase. Down a group, principal quantum number increases (more shells) and the atom gets larger; electronegativity and ionization energy tend to decrease.\n\n" +
"**Common student errors:** writing configurations blindly — always check total electron count and use the periodic table blocks (s, p, d, f) for guidance. For transition metals, remember 4s electrons are removed before 3d when forming cations.",
        examples: [
          {
            title: "Example — Write a configuration",
            problem: "Write electron configuration for sulfur (Z = 16).",
            solution: "1s2 2s2 2p6 3s2 3p4 or [Ne] 3s2 3p4",
            steps: [
              "Total electrons = 16.",
              "Use noble gas [Ne] for core (10), then 6 electrons => 3s2 3p4."
            ],
            hint: "Check periodic table: sulfur is in p-block, period 3."
          },
          {
            title: "Example — Predict trend",
            problem: "Which is more electronegative: O or S?",
            solution: "Oxygen is more electronegative than sulfur (same group, O is above S).",
            steps: [
              "Electronegativity increases up a group and across a period; oxygen above sulfur -> O more EN."
            ],
            hint: "Higher electronegativity means stronger pull on shared electrons."
          },
          {
            title: "Practice — Ion formation",
            problem: "Predict the common ion for magnesium (Mg).",
            solution: "Mg tends to lose 2 electrons to form Mg2+ completing the noble gas configuration of neon.",
            steps: [
              "Mg has 2 valence electrons (group 2) and reaches stable octet by losing them."
            ],
            hint: "Metals on left of table commonly form cations; nonmetals form anions."
          }
        ],
        quiz: [
          { q: "How many valence electrons does chlorine have?", a: "7 (3s2 3p5 → 7 valence electrons)."},
          { q: "Trend: ionization energy across a period?", a: "Generally increases (harder to remove electrons as nuclear pull rises)." }
        ]
      },

      // 4 Chemical Bonding & Polarity
      {
        explanation:
"In this lesson we build an intuitive view of bonding: atoms combine to lower energy and achieve stable electron arrangements. When one atom donates and another accepts electrons (metal + nonmetal), an ionic bond forms — think cation and anion held by electrostatic attraction. When two nonmetals share electrons, they form covalent bonds; sharing may be equal (nonpolar) or unequal (polar) depending on electronegativity differences. Metallic bonding is characterized by a sea of delocalized electrons giving metals conductivity and malleability.\n\n" +
"When assessing polarity, evaluate both bond polarity and molecular geometry. Even polar bonds can cancel in a symmetric molecule (for example CO2), producing a nonpolar molecule overall. Use electronegativity difference as a guide: differences > ~1.8 are often ionic, 0.4–1.8 often polar covalent, < 0.4 largely nonpolar covalent — but geometry decides molecular polarity.\n\n" +
"**Teacher cue:** Always ask: what is the electronegativity difference? Then ask: what is the shape? That two-step gives molecular polarity quickly.",
        examples: [
          {
            title: "Example — Ionic formation",
            problem: "Explain how Na and Cl form NaCl.",
            solution: "Na donates its single 3s electron becoming Na+; Cl gains one electron becoming Cl−. Opposite charges attract forming an ionic lattice.",
            steps: [
              "Write electron configurations to show instability.",
              "Remove electron from metal to form cation, add to nonmetal to form anion, note electrostatic attraction."
            ],
            hint: "Ionic compounds form extended lattices and often dissolve in water to give ions."
          },
          {
            title: "Example — Polar covalent",
            problem: "Is HCl polar? Explain.",
            solution: "Yes. Cl is more electronegative than H, so the shared electron pair is closer to Cl giving a permanent dipole (δ+ on H, δ− on Cl).",
            steps: [
              "Compute electronegativity difference qualitatively (Cl ≫ H).",
              "Conclude bond is polar and molecule is polar (diatomic polar)."
            ],
            hint: "In diatomics any electronegativity difference produces molecular polarity."
          },
          {
            title: "Practice — Molecular polarity",
            problem: "CH4 vs NH3: which is polar and why?",
            solution: "CH4 is nonpolar (symmetrical tetrahedral with identical bonds); NH3 is polar (trigonal pyramidal with lone pair creating net dipole).",
            steps: [
              "Draw geometry; check whether bond dipoles cancel.",
              "Note effect of lone pairs on geometry for NH3."
            ],
            hint: "Geometry and electron domains matter as much as individual bond polarity."
          }
        ],
        quiz: [
          { q: "If a molecule has polar bonds but is symmetric, is it polar?", a: "No, bond dipoles can cancel producing a nonpolar molecule." },
          { q: "Give a quick rule of thumb for ionic vs covalent bonds.", a: "Large electronegativity difference tends toward ionic; small difference toward covalent." }
        ]
      },

      // 5 Lewis Structures & Molecular Geometry (VSEPR)
      {
        explanation:
"This lesson teaches a concrete recipe for drawing Lewis structures and using VSEPR to predict shape. Start by counting total valence electrons for the molecule or ion. Place the least electronegative atom in the center (usually), connect atoms with single bonds, then distribute remaining electrons to satisfy octets on outer atoms. If the central atom lacks an octet, form double or triple bonds. Finally, compute formal charges to choose the best resonance structure if needed.\n\n" +
"Once you have the Lewis structure, VSEPR (Valence Shell Electron Pair Repulsion) tells you electron-domain geometry: electron domains (bonding pairs + lone pairs) arrange to minimize repulsion. Lone pairs repel more strongly than bonding pairs, compressing bond angles. Use VSEPR names (linear, trigonal planar, tetrahedral, trigonal bipyramidal, octahedral) then convert to molecular shape (bent, trigonal pyramidal) depending on lone pairs.\n\n" +
"**Teacher tip:** Draw resonance forms where possible and remember that formal charges should be minimized; negative formal charges should reside on more electronegative atoms.",
        examples: [
          {
            title: "Example — CO2 Lewis & shape",
            problem: "Draw Lewis structure and predict shape for CO2.",
            solution: "O=C=O, linear geometry (180°), nonpolar overall",
            steps: [
              "Count electrons: C (4) + 2×O (6) = 16.",
              "Place C central, draw two double bonds to saturate octets, check formal charges are zero."
            ],
            hint: "If a molecule has no lone pairs on the central atom and two bonding domains, it must be linear."
          },
          {
            title: "Example — H2O geometry",
            problem: "Explain why water is bent (~104.5°).",
            solution: "O has two lone pairs and two bonding pairs (4 electron domains → tetrahedral electron geometry); lone pair repulsion compresses H-O-H angle from 109.5° to ~104.5°.",
            steps: [
              "Count electron domains on O = 4 (2 bond pairs + 2 lone pairs).",
              "Translate electron geometry to molecular shape (bent)."
            ],
            hint: "Lone pair–lone pair repulsion > lone pair–bond pair > bond pair–bond pair."
          },
          {
            title: "Practice — Formal charge choice",
            problem: "Which resonance structure for NO2− is favored?",
            solution: "Structures that minimize formal charges and place negative charge on oxygen are favored; resonance delocalizes charge across oxygens.",
            steps: [
              "Draw possible resonance forms, compute formal charges, choose those with smaller magnitude and appropriate electronegativity placement."
            ],
            hint: "Resonance stabilizes species by delocalizing charge."
          }
        ],
        quiz: [
          { q: "Electron domains for trigonal planar geometry?", a: "3 domains (all bonding pairs), 120°."},
          { q: "Which repels more: lone pair or bonding pair?", a: "Lone pair repels more strongly." }
        ]
      },

      // 6 Stoichiometry, Limiting Reagents & Yield
      {
        explanation:
"This lesson makes stoichiometry practical: converting grams to moles, using mole ratios from balanced equations, finding limiting reagents, computing theoretical yields, and calculating percent yield. Begin every stoichiometry problem by balancing the chemical equation. Balanced coefficients become conversion factors (mole ratios) between reactants and products. Convert given masses to moles using molar masses (sum atomic masses from periodic table). Use mole ratios to find moles of product one reactant would produce; compare across reactants to identify the limiting reagent (the one that produces the least product). Compute theoretical yield, compare to actual yield to find percent yield.\n\n" +
"**Teacher tip:** Keep units visible at each step. Many students lose track of grams vs moles — write dimensional analysis fractions (grams → moles → moles product → grams product) explicitly.\n\n" +
"**Common pitfalls:** not balancing the equation first, using incorrect molar masses, or failing to identify limiting reagent when multiple reactants are given.",
        examples: [
          {
            title: "Example — From mass to mass",
            problem: "How many grams of CO2 are produced when 10.0 g of C reacts with excess O2? (C + O2 → CO2)",
            solution: "10.0 g C × (1 mol C / 12.01 g) × (1 mol CO2 / 1 mol C) × (44.01 g CO2 / 1 mol CO2) = 36.6 g CO2",
            steps: [
              "Convert grams C to moles: 10.0 / 12.01 ≈ 0.833 mol.",
              "Use mole ratio 1:1 to find moles CO2 = 0.833 mol.",
              "Multiply by CO2 molar mass 44.01 g/mol -> 36.6 g."
            ],
            hint: "Carry units to avoid mistakes; keep more digits then round final result."
          },
          {
            title: "Example — Limiting reagent",
            problem: "If you have 2.0 mol A and 3.0 mol B for reaction A + 2B → products, which is limiting?",
            solution: "A consumes 2B per A; for 2.0 mol A need 4.0 mol B; only 3.0 mol B available -> B is limiting.",
            steps: [
              "Compute required B for given A, compare with available B, limiting is the one that runs out first."
            ],
            hint: "Alternatively compute moles of product each reactant would produce and pick smaller."
          },
          {
            title: "Practice — Percent yield",
            problem: "Theoretical yield = 25.0 g, actual yield = 20.0 g. Percent yield?",
            solution: "Percent yield = (20.0 / 25.0) × 100% = 80%",
            steps: [
              "Apply percent yield formula and state answer with percentage sign."
            ],
            hint: "Percent yield measures practical efficiency of reaction."
          }
        ],
        quiz: [
          { q: "First step in any stoichiometry problem?", a: "Balance the chemical equation." },
          { q: "How to identify the limiting reagent quickly?", a: "Compare moles available to mole ratio demands or compute product moles possible from each reactant." }
        ]
      },

      // 7 States of Matter & Gas Laws
      {
        explanation:
"Here we study macroscopic behavior of matter and gases. States of matter (solid, liquid, gas) differ in particle arrangement and energy. For gases we use simple laws to relate pressure (P), volume (V), temperature (T) and amount (n). Boyle's law (P1V1 = P2V2) holds at constant temperature; Charles's law (V1/T1 = V2/T2) at constant pressure. The ideal gas law PV = nRT is a general relation useful for many problems; R depends on chosen units (0.08206 L·atm·mol−1·K−1 often used). When combining gases or partial pressures, Dalton's law states total pressure is sum of partial pressures. Real gases deviate from ideal behavior at high pressure/low temperature; van der Waals correction accounts qualitatively for molecular size and attraction.\n\n" +
"**Teacher strategy:** Convert temperature to Kelvin early, keep n in moles, and choose R consistent with pressure units. Use combined gas equations for state changes that involve multiple variable changes.\n\n" +
"**Common mistakes:** using Celsius in PV = nRT directly; forgetting to convert volumes to liters if using standard R.",
        examples: [
          {
            title: "Example — Boyle's law",
            problem: "A 2.0 L gas at 1.00 atm is compressed to 0.50 L at constant T. What is P2?",
            solution: "P2 = P1V1 / V2 = (1.00 × 2.0) / 0.50 = 4.0 atm",
            steps: [
              "Identify constant temperature -> Boyle's law applies.",
              "Compute P2 using inverse relation."
            ],
            hint: "Volume decreases -> pressure increases."
          },
          {
            title: "Example — Ideal gas law",
            problem: "Find pressure of 0.25 mol gas in 5.00 L at 298 K (R = 0.08206 L·atm·mol−1·K−1).",
            solution: "P = nRT / V ≈ (0.25 × 0.08206 × 298) / 5.00 ≈ 1.22 atm",
            steps: [
              "Plug known values into PV = nRT and compute.",
              "Use consistent units and round sensibly."
            ],
            hint: "Always check units of R and convert accordingly."
          },
          {
            title: "Practice — Partial pressure",
            problem: "If container has 1.0 mol N2 and 2.0 mol O2 at same T and V, what is partial pressure ratio P_N2 : P_O2?",
            solution: "Partial pressure proportional to moles -> ratio 1:2",
            steps: [
              "At constant V and T, P ∝ n, so pressures follow mole ratios directly."
            ],
            hint: "Dalton's law relates total pressure to partial pressures."
          }
        ],
        quiz: [
          { q: "Why use Kelvin in gas law calculations?", a: "Kelvin is absolute temperature; gas laws require absolute scale."},
          { q: "State the ideal gas law.", a: "PV = nRT." }
        ]
      },

      // 8 Acids, Bases, pH, and Titration Fundamentals
      {
        explanation:
"This lesson explores acid-base behavior and measurement. An acid increases hydrogen ion concentration [H+] in water; a base increases hydroxide ion concentration [OH−]. Strong acids/bases fully dissociate in water; weak ones only partially dissociate and require equilibrium treatment with Ka or Kb. pH = −log10[H+] is a logarithmic scale that compresses concentration ranges into manageable numbers. For titrations, track moles of acid and base to find the equivalence point; the pH at equivalence depends on whether conjugate species are acidic or basic.\n\n" +
"When solving acid/base problems: identify strong vs weak, write dissociation equations, set up ICE tables for weak species, and use approximations (small x) when justified. For titration stoichiometry use M1V1 = M2V2 for 1:1 neutralizations; for polyprotic or non-1:1 reactions adjust ratios accordingly.\n\n" +
"**Teacher tip:** When dealing with small concentrations (like 1e-6 M), water autoionization (Kw = 1.0e-14 at 25°C) can affect pH and must be considered.",
        examples: [
          {
            title: "Example — pH of strong acid",
            problem: "Find pH of 0.010 M HCl.",
            solution: "HCl fully dissociates -> [H+] = 0.010 M -> pH = −log(0.010) = 2.00",
            steps: [
              "Recognize strong acid assumption -> direct concentration equals [H+].",
              "Compute pH with logarithm."
            ],
            hint: "Use a calculator with log10 function."
          },
          {
            title: "Example — Weak acid approximation",
            problem: "Estimate [H+] for 0.10 M acetic acid (Ka = 1.8e-5).",
            solution: "Assume x << 0.10: Ka = x^2 / 0.10 -> x = sqrt(1.8e-6) ≈ 1.34e-3 M -> pH ≈ 2.87",
            steps: [
              "Set up ICE: HA ⇌ H+ + A−; solve Ka ≈ x^2 / c.",
              "Validate approximation: x/c ≈ 0.013 < 5% -> OK."
            ],
            hint: "If x/c > 5%, solve quadratic instead of approximation."
          },
          {
            title: "Practice — Titration volume",
            problem: "Volume of 0.1 M NaOH to neutralize 25.0 mL of 0.1 M HCl?",
            solution: "Equal molarity and volume for 1:1 reaction -> 25.0 mL NaOH required",
            steps: [
              "Use M1V1 = M2V2 with equal molarities -> equal volumes."
            ],
            hint: "Write balanced neutralization before applying formula."
          }
        ],
        quiz: [
          { q: "Define pH in one line.", a: "pH = −log10[H+]."},
          { q: "What is Kw at 25°C and relation to pH & pOH?", a: "Kw = [H+][OH−] = 1.0e-14; pH + pOH = 14." }
        ]
      }
    ]
  },

  // Second Semester (expanded, tutor-style)
  {
    Session: "Second Semester",
    Topics: [
      "Thermochemistry & Enthalpy",
      "Chemical Kinetics & Activation Energy",
      "Chemical Equilibrium & Le Chatelier's Principle",
      "Electrochemistry & Redox Reactions",
      "Organic Chemistry Basics (Functional Groups & Reactions)",
      "Coordination Chemistry & Transition Metals",
      "Nuclear Chemistry & Radioactivity",
      "Environmental & Green Chemistry Applications"
    ],
    Content: [
      // 1 Thermochemistry & Enthalpy
      {
        explanation:
"Thermochemistry studies heat changes during chemical processes. The central idea is energy conservation: systems exchange heat (q) and work (w) with surroundings. At constant pressure, the enthalpy change ΔH measures heat flow and is widely tabulated. Use q = m c ΔT for sensible heat changes and Hess's law to combine reaction steps when direct measurement is unavailable. Sign conventions matter: exothermic reactions release heat and have negative ΔH; endothermic absorb heat and have positive ΔH.\n\n" +
"When teaching this I emphasize careful sign tracking, unit consistency (J vs kJ), and converting mass to moles when using molar enthalpies. For calorimetry problems isolate system and calorimeter, apply energy conservation, and solve for unknowns. For reaction enthalpies, formation enthalpies allow calculation via products minus reactants weighted by coefficients.\n\n" +
"**Teacher tip:** Write a short energy table listing q_system and q_surroundings to avoid sign confusion.",
        examples: [
          {
            title: "Example — q = mcΔT",
            problem: "How much heat is released when 100 g of water cools from 80°C to 25°C (c = 4.18 J/g·K)?",
            solution: "q = 100 × 4.18 × (25 − 80) = −23,510 J (negative => released)",
            steps: [
              "ΔT = 25 − 80 = −55 K, multiply by m and c.",
              "Interpret negative sign as heat leaving the water."
            ],
            hint: "Report units and sign; convert to kJ if requested."
          },
          {
            title: "Example — Hess's law",
            problem: "If A → B ΔH1 = −100 kJ and B → C ΔH2 = +40 kJ, what is ΔH for A → C?",
            solution: "ΔH = ΔH1 + ΔH2 = −60 kJ",
            steps: [
              "Add step enthalpies algebraically following reaction sequence."
            ],
            hint: "If you reverse a step change sign; scale enthalpies when multiplying equations."
          },
          {
            title: "Practice — Standard enthalpy calculation",
            problem: "Compute ΔH°rxn for reaction using tabulated ΔHf°: ΔH°rxn = Σ ν ΔHf°(products) − Σ ν ΔHf°(reactants).",
            solution: "Apply formula; sum formation enthalpies multiplied by stoichiometric coefficients.",
            steps: [
              "List ΔHf° for each species, multiply by coefficients, subtract sums."
            ],
            hint: "Elements in standard state ΔHf° = 0."
          }
        ],
        quiz: [
          { q: "Sign of ΔH for exothermic reaction?", a: "Negative."},
          { q: "Formula for sensible heat?", a: "q = m c ΔT." }
        ]
      },

      // 2 Chemical Kinetics & Activation Energy
      {
        explanation:
"Kinetics studies how fast reactions proceed and what factors affect speed. Rate laws express how rate depends on concentrations (rate = k [A]^m [B]^n where m and n are orders determined experimentally). Activation energy Ea is the energetic barrier; the Arrhenius equation k = A e^(−Ea/RT) shows how temperature strongly affects rates. Catalysts lower Ea and increase rate without being consumed. Reaction mechanisms (sequences of elementary steps) explain rate laws: slow step often controls the observed rate.\n\n" +
"When teaching kinetics I give experiments where students determine orders by varying concentrations. Also emphasize units of rate constants depend on overall order. For practical problems, learn integrated rate forms: first-order ln([A]t/[A]0) = −kt and half-life relationships t1/2 = ln2/k for first order.\n\n" +
"**Teacher cue:** sketch an energy diagram to visualize Ea and the effect of a catalyst.",
        examples: [
          {
            title: "Example — Rate law identification",
            problem: "If doubling [A] quadruples the rate, what's the order in A?",
            solution: "Rate ∝ [A]^2 -> second order in A",
            steps: [
              "Observe rate change factor (4) when concentration doubles -> 2^n = 4 -> n=2."
            ],
            hint: "Use simple algebra with rate ratios from experiments."
          },
          {
            title: "Example — Temperature effect (Arrhenius)",
            problem: "Qualitatively explain why many reactions speed up when temperature increases by 10°C.",
            solution: "Higher T increases fraction of molecules with energy > Ea, so more collisions lead to reaction. A rough rule-of-thumb is rate roughly doubles for many processes, though exact change depends on Ea.",
            steps: [
              "Sketch Maxwell-Boltzmann distribution showing more molecules crossing Ea at higher T."
            ],
            hint: "Use Arrhenius for quantitative estimates if Ea known."
          },
          {
            title: "Practice — First-order half-life",
            problem: "If k = 0.02 s−1 for a first-order reaction, find t1/2.",
            solution: "t1/2 = ln2 / k ≈ 0.693 / 0.02 ≈ 34.65 s",
            steps: [
              "Use first-order half-life formula directly."
            ],
            hint: "Different orders have different half-life expressions."
          }
        ],
        quiz: [
          { q: "How does a catalyst affect Ea and rate?", a: "Catalyst lowers Ea and increases rate without changing equilibrium."},
          { q: "First order integrated rate law?", a: "ln([A]t) = ln([A]0) − kt (or ln([A]t/[A]0) = −kt)." }
        ]
      },

      // 3 Chemical Equilibrium & Le Chatelier's Principle
      {
        explanation:
"Equilibrium describes a dynamic balance: forward and reverse reaction rates equal at equilibrium concentrations. The equilibrium constant K (Kc for concentration, Kp for pressure) quantifies product vs reactant preference and depends only on temperature. The reaction quotient Q has the same form as K but uses current concentrations; comparing Q to K predicts direction of shift. Le Chatelier's principle gives a qualitative response to disturbances: add reactant -> shifts to consume it; increase pressure -> shifts to side with fewer moles of gas; change temperature -> changes K (exothermic reactions: higher T shifts left and reduces K).\n\n" +
"When teaching equilibrium I stress writing the equilibrium expression correctly (exclude pure solids/liquids), using ICE tables for quantitative work, and remembering temperature is the only factor that changes K. Practice problems include solving for unknown concentrations from K and predicting shifts when conditions change.\n\n" +
"**Teacher note:** always check units and magnitudes of K: K >> 1 favors products; K << 1 favors reactants.",
        examples: [
          {
            title: "Example — Writing Kc",
            problem: "Write Kc for aA + bB ⇌ cC + dD.",
            solution: "Kc = [C]^c [D]^d / ([A]^a [B]^b) (exclude pure solids/liquids)",
            steps: [
              "Place equilibrium concentrations raised to stoichiometric powers; omit phases that are pure solids or liquids."
            ],
            hint: "K expressions use equilibrium concentrations (not initial)."
          },
          {
            title: "Example — ICE table solve",
            problem: "For N2 + 3H2 ⇌ 2NH3 with initial [N2]=1.0 M, [H2]=3.0 M, and Kc = 0.5, find equilibrium [NH3] (sketch only).",
            solution: "Set change variable x for NH3 formation; write concentrations and solve quadratic from Kc expression.",
            steps: [
              "Write initial, change, equilibrium rows; substitute into Kc and solve for x numerically."
            ],
            hint: "Often approximations help when K is very small or large; check validity."
          },
          {
            title: "Practice — Le Chatelier quick",
            problem: "Add more product to an equilibrium mixture; what happens?",
            solution: "System shifts toward reactants to re-establish equilibrium (consumes added product).",
            steps: [
              "Compare Q to K after change and deduce direction."
            ],
            hint: "Think of the system trying to counteract change."
          }
        ],
        quiz: [
          { q: "What does K >> 1 imply?", a: "Products are favored at equilibrium."},
          { q: "Which variable changes K?", a: "Temperature only." }
        ]
      },

      // 4 Electrochemistry & Redox Reactions
      {
        explanation:
"Electrochemistry connects redox chemistry to electrical work. Oxidation is loss of electrons; reduction is gain. In galvanic (voltaic) cells spontaneous redox reactions produce electrical current: oxidation occurs at the anode, reduction at the cathode. Standard electrode potentials E° tabulated allow calculation of cell potential: E°cell = E°cathode − E°anode. A positive E°cell means the reaction is spontaneous and ΔG° = −nFE° is negative (F is Faraday's constant).\n\n" +
"When balancing redox in solution, split into half-reactions, balance atoms excluding H and O, then add H2O, H+, and e− as needed (in acidic solution) or use OH− in basic solution. Practice includes computing cell potentials, writing cell notation, and doing simple electrolysis calculations where non-spontaneous reactions occur under applied potential.\n\n" +
"**Teacher tip:** memorize common electrodes and practice identifying oxidation vs reduction quickly by tracking electron flow.",
        examples: [
          {
            title: "Example — Identify redox",
            problem: "Which species is oxidized: Fe → Fe2+ or Cu2+ → Cu?",
            solution: "Fe → Fe2+ is oxidation (loss of electrons); Cu2+ → Cu is reduction (gain of electrons).",
            steps: [
              "Oxidation increases oxidation state; reduction decreases it."
            ],
            hint: "Electron bookkeeping is the fastest check."
          },
          {
            title: "Example — Cell potential",
            problem: "Given E°(Cu2+/Cu)=+0.34 V and E°(Zn2+/Zn)=−0.76 V, calculate E°cell for Zn|Cu cell.",
            solution: "E°cell = E°cathode − E°anode = 0.34 − (−0.76) = 1.10 V",
            steps: [
              "Identify cathode (reduction) with higher potential and anode (oxidation) with lower potential.",
              "Subtract."
            ],
            hint: "Positive E°cell -> spontaneous reaction."
          },
          {
            title: "Practice — Stoichiometry in electrolysis",
            problem: "How many moles of electrons are needed to reduce 1 mol Cu2+ to Cu?",
            solution: "2 moles of electrons per mole Cu2+.",
            steps: [
              "Cu2+ + 2 e− → Cu, so n = 2."
            ],
            hint: "Relate moles electrons to charge via Faraday constant for practical charge calculations."
          }
        ],
        quiz: [
          { q: "Which electrode is oxidized in a galvanic cell?", a: "Anode."},
          { q: "Relation between ΔG° and E°cell?", a: "ΔG° = −n F E°." }
        ]
      },

      // 5 Organic Chemistry Basics (Functional Groups & Reactions)
      {
        explanation:
"Organic chemistry focuses on carbon-containing molecules. Functional groups (alcohols, aldehydes, ketones, carboxylic acids, amines, esters, etc.) determine reactivity patterns. I teach recognition first: learn the structural motif for each functional group and common reactions (e.g., nucleophilic addition to carbonyls, esterification, substitution reactions). Simple nomenclature helps you communicate structures precisely. Reaction mechanisms are often built from two core ideas: nucleophiles (electron-rich) attack electrophiles (electron-poor), and leaving groups depart.\n\n" +
"**Teacher activity:** practice drawing functional groups from names and vice versa, and follow simple mechanisms step by step showing electron pushing (curved arrows) to illustrate bond making and breaking.\n\n" +
"**Common trap:** confusing functional group priority in naming — refer to IUPAC rules when needed but learn common patterns first.",
        examples: [
          {
            title: "Example — Functional group ID",
            problem: "Identify functional group in CH3CH2COOH.",
            solution: "Carboxylic acid (-COOH).",
            steps: [
              "Spot the carbonyl (C=O) adjacent to an OH group -> carboxylic acid."
            ],
            hint: "Carboxylic acids are acidic: they can donate H+."
          },
          {
            title: "Example — Simple reaction",
            problem: "What product forms when ethanol reacts with acetic acid under acid catalysis?",
            solution: "Esterification -> ethyl acetate (an ester) + water.",
            steps: [
              "Acid-catalyzed esterification mechanism: protonate carbonyl, nucleophilic attack by alcohol, loss of water, deprotonation."
            ],
            hint: "Esterification is reversible; remove water to drive reaction to products."
          },
          {
            title: "Practice — Nucleophile/electrophile",
            problem: "Is OH− a nucleophile or electrophile?",
            solution: "OH− is a nucleophile (electron-rich, attacks electrophilic centers).",
            steps: [
              "OH− donates an electron pair to form a bond with an electrophile."
            ],
            hint: "Nucleophiles are often negatively charged or neutral species with lone pairs."
          }
        ],
        quiz: [
          { q: "Name two common functional groups.", a: "Alcohol (-OH), carbonyls (aldehyde/ketone), carboxylic acid (-COOH), amine (-NH2) etc."},
          { q: "Define nucleophile in one line.", a: "An electron-rich species that seeks a positive or electron-poor center to donate electrons." }
        ]
      },

      // 6 Coordination Chemistry & Transition Metals
      {
        explanation:
"Coordination chemistry deals with complexes formed when central transition metal ions bind ligands (molecules or ions donating electron pairs). Coordination number (commonly 4 or 6) determines geometry (tetrahedral, square planar, octahedral). Ligands influence color, magnetism, and reactivity through crystal field splitting: strong-field ligands cause large splitting and can pair electrons, affecting magnetic properties. Naming follows conventions: ligands listed alphabetically, then metal with oxidation state in parentheses.\n\n" +
"**Teacher strategy:** practice drawing simple complexes, assign oxidation states to the metal, count electrons, and predict geometry. Use examples like [Fe(CN)6]4− and [Cu(NH3)4]2+ to link theory to observable properties like color.\n\n" +
"**Common mistake:** forgetting to include charges and oxidation states when naming complexes.",
        examples: [
          {
            title: "Example — Naming",
            problem: "Name [Co(NH3)6]3+",
            solution: "Hexaamminecobalt(III) ion",
            steps: [
              "List ligands (ammine) with prefixes, then metal name and oxidation state in Roman numerals."
            ],
            hint: "Neutral ligands get normal names; anionic ligands often end with -o (e.g., chloro for Cl−)."
          },
          {
            title: "Example — Geometry",
            problem: "Coordination number 6 usually gives which geometry?",
            solution: "Octahedral.",
            steps: [
              "Visualize six ligands at vertices of an octahedron around central metal."
            ],
            hint: "Steric size and ligand type can cause deviations."
          },
          {
            title: "Practice — Ligand field effect",
            problem: "How does strong-field CN− affect d-electron arrangement?",
            solution: "Large splitting may pair electrons (low-spin) reducing paramagnetism compared to weak-field ligands.",
            steps: [
              "Compare pairing energy vs splitting energy to predict high-spin vs low-spin."
            ],
            hint: "Magnetic measurements help distinguish spin states."
          }
        ],
        quiz: [
          { q: "What is a ligand?", a: "A molecule or ion that donates an electron pair to a metal center."},
          { q: "Typical geometry for coordination number 4?", a: "Tetrahedral or square planar (depends on metal and ligand)." }
        ]
      },

      // 7 Nuclear Chemistry & Radioactivity
      {
        explanation:
"Nuclear chemistry studies changes in the atomic nucleus: radioactive decay, nuclear reactions, and applications (radiocarbon dating, medical isotopes). Common decay modes: alpha (He nucleus emitted), beta (electron or positron emitted changing proton/neutron counts), and gamma (high-energy photon emitted). The decay law is exponential: N(t) = N0 e^(−λt) where λ is decay constant; half-life t1/2 = ln2 / λ. For practical problems we convert between half-lives and remaining fractions easily, and for activity calculations we use Becquerel (Bq) or curie (Ci).\n\n" +
"**Teacher advice:** distinguish chemical changes (electrons) from nuclear changes (protons/neutrons) — chemistry cannot change one element to another under normal lab conditions. Also, handle radioactive materials with appropriate safety protocols and respect units when computing activities and doses.\n\n" +
"**Common calculations:** converting activity to decays per second, fraction remaining after several half-lives, and identifying daughter isotopes from decay equations.",
        examples: [
          {
            title: "Example — Half-life",
            problem: "If half-life is 5 days, fraction remaining after 15 days?",
            solution: "15 days = 3 half-lives -> remaining fraction (1/2)^3 = 1/8",
            steps: [
              "Divide elapsed time by half-life to get number of half-lives, raise 1/2 to that power."
            ],
            hint: "Use continuous exponential formula for non-integer multiples."
          },
          {
            title: "Example — Identify decay",
            problem: "Beta minus decay increases which atomic number change?",
            solution: "Atomic number increases by 1 (neutron -> proton + electron).",
            steps: [
              "Track proton and neutron changes; mass number (A) typically unchanged for beta."
            ],
            hint: "Alpha reduces atomic number by 2 and mass by 4."
          },
          {
            title: "Practice — Activity units",
            problem: "Convert 1 Ci to Bq (approx).",
            solution: "1 Ci ≈ 3.7 × 10^10 Bq",
            steps: [
              "Use definition 1 Ci = 3.7e10 decays per second."
            ],
            hint: "Use SI units (Bq) in calculations where possible."
          }
        ],
        quiz: [
          { q: "What is an alpha particle composed of?", a: "2 protons + 2 neutrons (He nucleus)."},
          { q: "Definition of half-life?", a: "Time required for half of a radioactive sample to decay." }
        ]
      },

      // 8 Environmental & Green Chemistry Applications
      {
        explanation:
"This final topic connects chemistry to real-world environmental and sustainability challenges. Green chemistry focuses on preventing pollution at the source by designing more efficient reactions, using safer solvents, maximizing atom economy, and designing for degradation. Environmental chemistry studies how chemicals move and transform in air, water, and soil — examples include acid rain formation from SO2/NOx emissions, persistent organic pollutants, and nutrient runoff causing eutrophication.\n\n" +
"When teaching this subject I emphasize cause-effect chains and remediation strategies. For example, reduce SO2 emissions by switching to low-sulfur fuels and using scrubbers; use catalytic converters to lower NOx emissions. For water treatment, chlorination disinfects but must be balanced against disinfection byproducts. Life-cycle thinking helps choose materials and processes that minimize overall environmental impact.\n\n" +
"**Teacher tip:** use case studies (local or national) to show how chemical knowledge guides policy and engineering solutions.",
        examples: [
          {
            title: "Example — Acid rain chemistry",
            problem: "How does SO2 become acid rain?",
            solution: "SO2 oxidizes to SO3, which reacts with water to form H2SO4, leading to acid deposition.",
            steps: [
              "SO2 + 1/2 O2 -> SO3 (atmospheric oxidation).",
              "SO3 + H2O -> H2SO4 (sulfuric acid) -> deposition."
            ],
            hint: "Control emissions to reduce downstream acidification of ecosystems."
          },
          {
            title: "Example — Eutrophication",
            problem: "Why do excess nutrients cause algal blooms?",
            solution: "Excess N or P stimulates rapid algae growth; decomposition consumes oxygen causing hypoxia and fish kills.",
            steps: [
              "Identify nutrient source (agriculture runoff), biological response (algal bloom), and ecological consequence (oxygen depletion)."
            ],
            hint: "Reducing fertilizer runoff and buffer strips mitigates the problem."
          },
          {
            title: "Practice — Green chemistry metric",
            problem: "What does atom economy measure?",
            solution: "Fraction of total mass of reactants that ends up in desired product — higher atom economy => less waste.",
            steps: [
              "Compute sum of product atomic masses divided by sum of reactant atomic masses × 100%."
            ],
            hint: "Designing catalytic, selective routes often improves atom economy."
          }
        ],
        quiz: [
          { q: "One goal of green chemistry?", a: "Prevent waste and reduce hazard (e.g., design safer chemicals)."},
          { q: "Name one common pollutant causing acid rain.", a: "SO2 or NOx." }
        ]
      }
    ]
  }
];

export default function Chemistry({ semester }) {
  return <LessonPlayer courseLabel="Chemistry 101" courseContent={ChemistryContent} semester={semester} />;
}
