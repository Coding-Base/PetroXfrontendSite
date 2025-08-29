// src/components/lesson/courses/Chemistry.jsx
import React from "react";
import LessonPlayer from "../shared/LessonPlayer";

/**
 * Chemistry.jsx
 *
 * - Matches the Physics.jsx array structure exactly (courseContent array with Sessions).
 * - Explanations are written in a teacher-first, conversational style.
 * - Important lines are prefixed with **Important:** or **Key point:** to emphasize them.
 * - No backticks or template literal traps that cause ESBuild errors.
 *
 * LessonPlayer expects:
 *  - courseContent: [ { Session: "First Semester", Topics: [...], Content: [ { explanation, examples, quiz }, ... ] }, ... ]
 */

const ChemistryContent = [
  {
    Session: "First Semester",
    Topics: [
      "Atomic Structure & Isotopes",
      "Electron Configuration & Periodic Trends",
      "Chemical Bonding (Ionic, Covalent, Polar)",
      "Lewis Structures & Molecular Geometry",
      "Stoichiometry & The Mole Concept",
      "Chemical Reactions & Balancing",
      "States of Matter & Gas Laws",
      "Acids, Bases, pH and Titration Fundamentals"
    ],
    Content: [
      // 1 Atomic Structure & Isotopes
      {
        explanation:
"Learning goal: By the end of this topic you should be able to describe the internal parts of an atom, explain what isotopes are, and use atomic number / mass number to compute protons, neutrons and electrons.\n\n" +
"I'm going to walk you through this like a tutor: imagine the atom as a tiny solar system with a dense nucleus and a cloud of electrons. The nucleus holds protons (positive) and neutrons (neutral). Electrons (negative) occupy energy levels or shells. The number of protons, the atomic number (Z), defines the element; changing neutrons gives isotopes.\n\n" +
"**Important:** In a neutral atom, number of electrons = number of protons. If you see a charge (for example Na+), adjust electrons accordingly.\n\n" +
"How to approach problems step-by-step:\n" +
"1. Locate atomic number Z on the periodic table — that's the number of protons.\n" +
"2. If mass number A is given, compute neutrons = A − Z.\n" +
"3. For ions: electrons = protons − charge (e.g., for 2+ charge subtract 2 electrons).\n\n" +
"Common student pitfalls: confusing mass number with atomic number and forgetting to change electron count for ions.",
        examples: [
          {
            title: "Example — Counting particles (worked)",
            problem: "Find protons, neutrons, electrons in neutral 23Na.",
            solution: "Protons = 11, Neutrons = 12, Electrons = 11",
            steps: [
              "Atomic number for Na is 11 → protons = 11.",
              "Mass number A = 23 → neutrons = 23 − 11 = 12.",
              "Neutral atom → electrons = protons = 11."
            ],
            hint: "Write down Z and A first, then compute neutrons."
          },
          {
            title: "Example — Ion adjustments",
            problem: "What are p, n, e for Ca2+ with A = 40?",
            solution: "Protons = 20, Neutrons = 20, Electrons = 18",
            steps: [
              "Ca atomic number Z = 20 → protons = 20.",
              "Neutrons = 40 − 20 = 20.",
              "Ca2+ means two fewer electrons than protons → electrons = 20 − 2 = 18."
            ],
            hint: "Positive ion → fewer electrons; negative ion → more electrons."
          },
          {
            title: "Practice — Isotope thinking",
            problem: "Which statement is true: C-12 and C-14 have different chemical reactivity?",
            solution: "False. Chemical reactivity is nearly identical; they differ in mass and nuclear stability.",
            steps: [
              "Isotopes have same proton/electron counts, so chemistry (controlled by electrons) is similar.",
              "Differences show up in mass-dependent properties and radioactivity (C-14 is radioactive)."
            ],
            hint: "Think: electrons control chemistry, neutrons affect mass and nuclear properties."
          }
        ],
        quiz: [
          { q: "What is the atomic number?", a: "Number of protons in the nucleus." },
          { q: "If Z = 8 and A = 17, how many neutrons?", a: "9 neutrons." }
        ]
      },

      // 2 Electron Configuration & Periodic Trends
      {
        explanation:
"Learning goal: You should be able to write simple electron configurations, use the noble-gas shorthand, and explain trends such as atomic radius and ionization energy.\n\n" +
"I'll teach you the logic: electrons fill orbitals in order of increasing energy (Aufbau principle). Within a subshell, Hund's rule tells you to place one electron per orbital before pairing. The periodic table is a map of these fillings.\n\n" +
"**Key point:** Valence electrons (outermost) control chemical behavior — learning to identify them quickly helps predict bonding.\n\n" +
"How to practice: when asked for configuration, first subtract core electrons using the nearest noble gas, then write the remaining orbitals.\n\n" +
"Common mistakes: removing electrons in the wrong order for transition metal ions — they lose 4s before 3d electrons.",
        examples: [
          {
            title: "Example — Writing configurations (step-by-step)",
            problem: "Write ground-state electron configuration for phosphorus (Z = 15).",
            solution: "[Ne] 3s2 3p3",
            steps: [
              "Total electrons = 15. Noble gas before P is Ne (10 electrons).",
              "Remaining electrons = 5 → fill 3s2 (2) and 3p3 (3).",
              "So configuration: [Ne] 3s2 3p3."
            ],
            hint: "Use the periodic table blocks (s, p, d, f) as a visual guide."
          },
          {
            title: "Example — Ion configuration (transition metal caution)",
            problem: "Electron configuration for Fe2+ (neutral Fe: [Ar] 4s2 3d6).",
            solution: "[Ar] 3d6",
            steps: [
              "Remove electrons from 4s first: neutral Fe loses the two 4s electrons to form Fe2+.",
              "Remaining 3d6 remains as is."
            ],
            hint: "For transition metals, always remove from the highest n-shell first."
          },
          {
            title: "Practice — Predict trend",
            problem: "Which is larger: atomic radius of K or Na? Explain.",
            solution: "K is larger (it has an extra electron shell).",
            steps: [
              "K is below Na in the same group, so it has one more principal energy level (shell).",
              "Greater distance from nucleus → larger radius."
            ],
            hint: "Down a group → add shells → larger radius."
          }
        ],
        quiz: [
          { q: "Which element is most electronegative (generally)?", a: "Fluorine." },
          { q: "What happens to ionization energy across a period?", a: "Generally increases (because electrons held more tightly)." }
        ]
      },

      // 3 Chemical Bonding (Ionic, Covalent, Polar)
      {
        explanation:
"Learning goal: Understand why atoms bond, distinguish ionic from covalent bonds, and recognize polarity.\n\n" +
"I teach bonding by following electrons: atoms seek a lower-energy, stable arrangement. Metals tend to lose electrons and form cations; nonmetals gain or share electrons to reach octets.\n\n" +
"**Important:** Electronegativity difference is a practical rule of thumb: large difference (≈ > 1.8) → largely ionic; small difference → covalent; intermediate → polar covalent.\n\n" +
"Approach to problems: identify participating atoms, compute electronegativity difference, then assign bond type and possible charges.",
        examples: [
          {
            title: "Example — Ionic bonding explained",
            problem: "Explain formation of NaCl in three steps.",
            solution: "Na loses one electron → Na+, Cl gains one electron → Cl−, Na+ and Cl− attract electrostatically to form NaCl.",
            steps: [
              "Write electron configurations: Na [Ne] 3s1, Cl [Ne] 3s2 3p5.",
              "Na can become stable by losing its single 3s electron; Cl becomes stable by gaining one electron to complete 3p.",
              "Opposite charges attract to create an ionic lattice."
            ],
            hint: "Ionic compounds form crystalline lattices, not individual NaCl molecules."
          },
          {
            title: "Example — Covalent bond demo",
            problem: "Why does two hydrogen atoms form H2 by sharing electrons?",
            solution: "Each H has 1 electron; by sharing, both attain a duet (2 electrons) and lower energy.",
            steps: [
              "Draw two H atoms approaching; overlapping orbitals allow shared electron pair.",
              "Shared pair counts for both atoms, fulfilling their valence requirement."
            ],
            hint: "Covalent bonds are directional and form discrete molecules."
          },
          {
            title: "Practice — Polar vs nonpolar",
            problem: "Is CO2 polar or nonpolar? Explain.",
            solution: "CO2 (linear) is nonpolar overall because bond dipoles cancel even though individual C=O bonds are polar.",
            steps: [
              "Each C=O bond has dipole toward oxygen.",
              "Linear geometry places dipoles 180 degrees apart → they cancel → net dipole = 0."
            ],
            hint: "Always consider molecular geometry when judging polarity."
          }
        ],
        quiz: [
          { q: "What type of bond forms between metal and nonmetal?", a: "Ionic bond." },
          { q: "How does polarity of a bond depend on electronegativity?", a: "Greater difference → more polar bond." }
        ]
      },

      // 4 Lewis Structures & Molecular Geometry
      {
        explanation:
"Learning goal: Draw Lewis structures, find electron-domain geometry with VSEPR, and predict molecular shapes and polarity.\n\n" +
"Think of Lewis structures as bookkeeping: count valence electrons, place bonds, distribute remaining electrons to satisfy octets, create multiple bonds if needed. Then apply VSEPR (Valence Shell Electron Pair Repulsion) to predict geometry: lone pairs repel more strongly than bonding pairs and compress bond angles.\n\n" +
"**Key point:** Formal charge helps choose the best Lewis structure — minimize formal charges across the molecule.\n\n" +
"Method (teacher steps):\n1. Count total valence electrons.\n2. Sketch a skeleton connecting atoms.\n3. Place remaining electrons to satisfy octets.\n4. If atoms lack octet, form double/triple bonds and recalc formal charges.",
        examples: [
          {
            title: "Example — Drawing CO2",
            problem: "Draw Lewis structure and determine shape for CO2.",
            solution: "O=C=O linear, 180°.",
            steps: [
              "Valence electrons: C (4) + 2×O (6×2) = 16 electrons.",
              "Skeleton O–C–O, place single bonds, distribute electrons to give octets, convert lone pairs on O to double bonds to satisfy C's octet.",
              "Final: O=C=O, no lone pairs on carbon → linear geometry."
            ],
            hint: "Check formal charges — correct structure has minimal formal charges."
          },
          {
            title: "Example — Water geometry",
            problem: "Explain why H2O has bent shape (~104.5°).",
            solution: "O has two lone pairs and two bonding pairs → electron domain geometry tetrahedral, but molecular shape is bent.",
            steps: [
              "Count electron domains on O = 4 (2 bonds + 2 lone pairs).",
              "Lone pairs compress bond angle from 109.5° to about 104.5°."
            ],
            hint: "Lone pair-lone pair repulsion > lone pair-bond pair > bond pair-bond pair."
          },
          {
            title: "Practice — Formal charge check",
            problem: "Which Lewis structure for NO2− is more stable (one with a negative formal charge on oxygen vs resonance)?",
            solution: "Resonance structures that place negative charge on oxygen are more stable; formal charge delocalization stabilizes the ion.",
            steps: [
              "Draw resonance forms and compute formal charges.",
              "Delocalized negative charge over oxygens lowers energy."
            ],
            hint: "Resonance leads to intermediate bond orders (e.g., 1.5)."
          }
        ],
        quiz: [
          { q: "VSEPR: what shape for 3 bonding pairs, 0 lone pairs?", a: "Trigonal planar." },
          { q: "What reduces bond angle: lone pairs or bonding pairs?", a: "Lone pairs reduce bond angles (they exert greater repulsion)." }
        ]
      },

      // 5 Stoichiometry & The Mole Concept
      {
        explanation:
"Learning goal: Convert between mass, moles, particles and use balanced equations to compute product or reactant quantities.\n\n" +
"I teach stoichiometry by always asking: what is known, what is asked, and what mole ratios connect them? The mole links the microscopic world (atoms/molecules) to the macroscopic (grams).\n\n" +
"**Important:** Always balance the chemical equation before any stoichiometric calculation. Use molar mass for converting grams ↔ moles and Avogadro's number for moles ↔ particles.\n\n" +
"Step-by-step method:\n1. Balance equation.\n2. Convert grams to moles (if needed) via molar mass.\n3. Use mole ratios from coefficients to find moles of target.\n4. Convert back to grams or number of particles as requested.",
        examples: [
          {
            title: "Example — Moles from mass",
            problem: "How many moles in 44 g of CO2? (Molar mass CO2 = 44 g/mol)",
            solution: "1.0 mol",
            steps: [
              "n = mass / M = 44 ÷ 44 = 1.0 mol."
            ],
            hint: "Always compute molar mass carefully from periodic table values."
          },
          {
            title: "Example — Mole-to-mole via balanced equation",
            problem: "Given 2H2 + O2 → 2H2O, how many moles of water from 3.0 mol H2?",
            solution: "3.0 mol H2O (1:1 ratio with H2).",
            steps: [
              "Use coefficients: 2 mol H2 produce 2 mol H2O → ratio 1:1.",
              "So 3.0 mol H2 → 3.0 mol H2O."
            ],
            hint: "Coefficients are conversion factors between species."
          },
          {
            title: "Practice — Limiting reagent quick",
            problem: "If you mix 4 mol A with 5 mol B for reaction A + 2B → products, which limits?",
            solution: "Compute how many B needed: for 4 mol A need 8 mol B; available 5 mol B → B is limiting.",
            steps: [
              "Use stoichiometry to calculate requirements; compare available amounts."
            ],
            hint: "Always compare required versus available moles for each reactant."
          }
        ],
        quiz: [
          { q: "Avogadro's number definition?", a: "6.022 × 10^23 particles per mole." },
          { q: "How to convert moles to mass?", a: "mass = moles × molar mass." }
        ]
      },

      // 6 Chemical Reactions & Balancing
      {
        explanation:
"Learning goal: Recognize reaction types, balance chemical equations systematically, and compute theoretical yields.\n\n" +
"I want you to practice balancing by inspection: start with the most complex molecule, then balance single elements last (often H and O). For quantitative problems, find the limiting reagent, compute theoretical yield, and then percent yield if actual mass is provided.\n\n" +
"**Key point:** Balance atoms, not molecules — count atoms on each side and adjust coefficients (not subscripts!).",
        examples: [
          {
            title: "Example — Balancing combustion",
            problem: "Balance C2H6 + O2 → CO2 + H2O.",
            solution: "2C2H6 + 7O2 → 4CO2 + 6H2O",
            steps: [
              "Balance C: 2C2H6 → 4CO2.",
              "Balance H: 2C2H6 → 6H2O (12 H atoms).",
              "Count O on right: 4×2 + 6×1 = 14 → need 7 O2 on left."
            ],
            hint: "Check each atom type after you set coefficients."
          },
          {
            title: "Example — Limiting reagent with numbers",
            problem: "React 10 g A (M=20 g/mol) with 20 g B (M=40 g/mol) in reaction A + B → product; which limits?",
            solution: "Moles A = 0.5, moles B = 0.5; stoichiometric ratio 1:1 → none in excess (both limit), both fully consumed.",
            steps: [
              "Compute moles: 10/20 = 0.5; 20/40 = 0.5.",
              "Compare with stoichiometric ratio (1:1) → both consumed."
            ],
            hint: "When moles match ratio exactly both are limiting simultaneously."
          },
          {
            title: "Practice — Percent yield",
            problem: "Theoretical yield 25.0 g, actual yield 20.0 g. Percent yield?",
            solution: "80 percent",
            steps: [
              "Percent yield = (actual/theoretical) × 100 = (20 / 25) × 100 = 80%."
            ],
            hint: "Percent yield indicates process efficiency."
          }
        ],
        quiz: [
          { q: "Should you change subscripts to balance an equation? (Yes/No)", a: "No — change coefficients only." },
          { q: "Percent yield formula?", a: "(actual ÷ theoretical) × 100%." }
        ]
      },

      // 7 States of Matter & Gas Laws
      {
        explanation:
"Learning goal: Describe the three classical states of matter and use basic gas laws to solve problems.\n\n" +
"I approach gas law problems by asking: which variable(s) change and which remain constant? Choose the law that connects those variables (Boyle, Charles, or ideal gas law). For temperature use Kelvin.\n\n" +
"**Important:** Always convert temperature to Kelvin for gas law calculations (K = °C + 273.15).\n\n" +
"Strategy: For P1V1 = P2V2 (Boyle), T constant. For V1/T1 = V2/T2 (Charles), P constant. For P V = n R T, use when multiple variables change.",
        examples: [
          {
            title: "Example — Boyle's law",
            problem: "A gas at 2.0 atm, 3.0 L is compressed to 1.5 L at constant temperature. Find final pressure.",
            solution: "P2 = (P1V1)/V2 = 2.0 × 3.0 / 1.5 = 4.0 atm",
            steps: [
              "Identify Boyle applies (T constant).",
              "Compute using P1V1 = P2V2."
            ],
            hint: "Inverse relationship between P and V."
          },
          {
            title: "Example — Ideal gas application",
            problem: "Find pressure of 0.50 mol gas in 10.0 L at 298 K (R = 0.08206 L·atm·mol−1·K−1).",
            solution: "P = nRT/V ≈ (0.5 × 0.08206 × 298) / 10 ≈ 1.22 atm",
            steps: [
              "Plug into PV = nRT and compute carefully."
            ],
            hint: "Check units of R you pick — use consistent units."
          },
          {
            title: "Practice — Temperature conversions",
            problem: "Convert 27°C to Kelvin and use in a Charles' law calculation.",
            solution: "27°C = 300.15 K (approx 300 K for many problems).",
            steps: [
              "Add 273.15 to Celsius to get Kelvin.",
              "Use Kelvin in V/T proportions."
            ],
            hint: "Small rounding of Kelvin often acceptable depending on sig figs."
          }
        ],
        quiz: [
          { q: "Equation for ideal gas law?", a: "PV = nRT." },
          { q: "Why use Kelvin in gas laws?", a: "Kelvin is absolute temperature scale; ratios require absolute temperatures." }
        ]
      },

      // 8 Acids, Bases, pH and Titration Fundamentals
      {
        explanation:
"Learning goal: Classify acids and bases, compute pH/pOH, and understand titration curves and equivalence points.\n\n" +
"I teach pH by connecting it to concentration: pH = −log10[H+]. Strong acids fully dissociate; weak acids only partially dissociate and require equilibrium thinking (Ka).\n\n" +
"**Key point:** In titration of a strong acid with a strong base, the equivalence point pH is about 7; for weak acid + strong base it is > 7.\n\n" +
"Useful workflow:\n1. Identify strong vs weak acid/base.\n2. For strong species, set [H+] or [OH−] equal to concentration (adjust stoichiometry for dilutions or reaction ratios).\n3. For weak species, set up Ka (or Kb) expression and solve the equilibrium.\n4. For titration endpoints, track moles of acid/base added and compute resulting concentrations.",
        examples: [
          {
            title: "Example — pH of strong acid",
            problem: "Find pH of 0.0010 M HCl.",
            solution: "pH = 3.00",
            steps: [
              "HCl is strong → [H+] = 0.0010 M.",
              "pH = −log10(0.0010) = 3.00."
            ],
            hint: "Logarithms turn decades in concentration into linear pH scales."
          },
          {
            title: "Example — Titration stoichiometry",
            problem: "How many mL of 0.1 M NaOH are needed to neutralize 25.0 mL of 0.10 M HCl?",
            solution: "25.0 mL (equal volumes at equal molarity).",
            steps: [
              "M1V1 = M2V2 (1:1 reaction).",
              "V_NaOH = (0.10 × 25.0) / 0.10 = 25.0 mL."
            ],
            hint: "Write neutralization equation HCl + NaOH → NaCl + H2O first."
          },
          {
            title: "Practice — Weak acid check",
            problem: "If acetic acid 0.10 M has Ka = 1.8×10^−5, estimate [H+].",
            solution: "Approx 1.34 × 10^−3 M (pH ≈ 2.87) — use ICE table and small x approximation.",
            steps: [
              "Write CH3COOH ⇌ H+ + CH3COO−. Ka = x^2/(0.10 − x).",
              "Assume x << 0.10 so Ka ≈ x^2/0.10 → x ≈ sqrt(1.8e−5 × 0.10).",
              "Compute x ≈ 1.34e−3 M."
            ],
            hint: "Check the approximation validity: x/0.10 ≈ 0.013 < 5% — OK."
          }
        ],
        quiz: [
          { q: "pH definition?", a: "pH = −log10[H+]." },
          { q: "At 25°C, pH + pOH = ?", a: "14 (approximately)." }
        ]
      }
    ]
  },

  // Second Semester
  {
    Session: "Second Semester",
    Topics: [
      "Thermochemistry & Enthalpy",
      "Chemical Kinetics & Activation Energy",
      "Chemical Equilibrium & Le Chatelier's Principle",
      "Electrochemistry & Redox",
      "Organic Chemistry Basics (Functional Groups)",
      "Coordination Chemistry & Transition Metals (intro)",
      "Nuclear Chemistry & Radioactivity",
      "Environmental & Green Chemistry Concepts"
    ],
    Content: [
      // 1 Thermochemistry & Enthalpy
      {
        explanation:
"Learning goal: Learn to track heat and enthalpy changes in chemical processes, apply q = m c ΔT, and use Hess's law for reaction enthalpies.\n\n" +
"When you solve enthalpy problems, ask if the process occurs at constant pressure (then ΔH applies) and whether you can use tabulated ΔHf° values or Hess's law to combine steps. Energy accounting is essential — track signs carefully (exothermic = heat released = negative ΔH).\n\n" +
"**Important:** Enthalpy is an extensive property — doubles with twice the material; per mole values let you compare reactions fairly.",
        examples: [
          {
            title: "Example — Heating/cooling calculation",
            problem: "Heat released when 200 g water cools from 90°C to 20°C (c = 4.18 J/g·K).",
            solution: "q = m c ΔT = 200 × 4.18 × (20 − 90) = −58,520 J (released).",
            steps: [
              "ΔT = 20 − 90 = −70 K (final − initial).",
              "Multiply m c ΔT to find q; negative sign means heat leaves the water."
            ],
            hint: "Temperature change sign indicates heat flow direction."
          },
          {
            title: "Example — Hess's law",
            problem: "Given two step enthalpies, find overall ΔH for A → C via A → B (ΔH1) and B → C (ΔH2).",
            solution: "ΔH_total = ΔH1 + ΔH2.",
            steps: [
              "Add the reaction enthalpies algebraically; reversing a step flips sign."
            ],
            hint: "Write equations and combine, don't just add numbers blindly."
          },
          {
            title: "Practice — Standard enthalpy formation",
            problem: "Compute ΔH° for reaction using formation enthalpies (products − reactants).",
            solution: "Sum(ν ΔHf°_products) − Sum(ν ΔHf°_reactants).",
            steps: [
              "Multiply ΔHf° values by stoichiometric coefficients, subtract reactants."
            ],
            hint: "Elements in standard state have ΔHf° = 0."
          }
        ],
        quiz: [
          { q: "Exothermic reaction sign for ΔH?", a: "Negative." },
          { q: "Formula for heat using mass and specific heat?", a: "q = m c ΔT." }
        ]
      },

      // 2 Chemical Kinetics & Activation Energy
      {
        explanation:
"Learning goal: Interpret rate laws, use the Arrhenius equation qualitatively, and understand how concentration and temperature affect reaction rates.\n\n" +
"I teach kinetics by experiments: the rate law is determined empirically — memorize forms, not assume them. Activation energy is the barrier; catalysts lower it.\n\n" +
"**Key point:** Reaction order is NOT necessarily related to stoichiometric coefficients; it is found from data.",
        examples: [
          {
            title: "Example — Rate law reasoning",
            problem: "If doubling [A] doubles rate and doubling [B] has no effect, what is rate law?",
            solution: "Rate = k [A]^1 [B]^0 → Rate = k [A]",
            steps: [
              "Observe how rate changes when you vary one reactant while keeping others constant.",
              "If varying B doesn't change rate, it is zero order in B."
            ],
            hint: "Collect initial rate data to infer orders."
          },
          {
            title: "Example — Temperature effect",
            problem: "General effect of raising temperature by 10°C on reaction rate?",
            solution: "Rule of thumb: rate roughly doubles for many reactions (not universal).",
            steps: [
              "Higher T increases fraction of molecules with energy > Ea.",
              "Arrhenius equation shows exponential sensitivity to T."
            ],
            hint: "Use Arrhenius for quantitative estimates if activation energy known."
          },
          {
            title: "Practice — First order half-life",
            problem: "For first-order reaction with k = 0.693 min−1, what's half-life?",
            solution: "t1/2 = 1.0 min (since t1/2 = ln2/k = 0.693/0.693 = 1).",
            steps: [
              "Use t1/2 = ln(2)/k for first order processes."
            ],
            hint: "Different orders have different half-life formulas."
          }
        ],
        quiz: [
          { q: "What does a catalyst do?", a: "Lowers activation energy and speeds reaction without being consumed." },
          { q: "Units of rate constant depend on?", a: "Overall reaction order." }
        ]
      },

      // 3 Chemical Equilibrium & Le Chatelier
      {
        explanation:
"Learning goal: Set up equilibrium expressions (Kc, Kp), use reaction quotient Q to predict direction, and apply Le Chatelier to perturbations.\n\n" +
"Equilibrium is dynamic — forward and reverse rates equal. K is fixed for a given reaction at a given temperature and helps predict composition.\n\n" +
"**Important:** Changing temperature changes K; changing concentration or pressure does not change K but shifts equilibrium position.",
        examples: [
          {
            title: "Example — Writing Kc",
            problem: "Write Kc for aA + bB ⇌ cC + dD.",
            solution: "Kc = [C]^c [D]^d / ([A]^a [B]^b)",
            steps: [
              "Only include species in the expression that are in the gas or aqueous phase; omit pure solids/liquids.",
              "Use concentrations at equilibrium."
            ],
            hint: "Use Q with current concentrations to judge direction."
          },
          {
            title: "Example — Le Chatelier shift",
            problem: "If more product is added, which way does equilibrium shift?",
            solution: "Shifts left (toward reactants) to reduce added product.",
            steps: [
              "System opposes the change by consuming added product."
            ],
            hint: "Think of the system doing work to restore equilibrium."
          },
          {
            title: "Practice — K magnitude meaning",
            problem: "If K >> 1, what is favored at equilibrium?",
            solution: "Products are strongly favored.",
            steps: [
              "Large K means numerator much larger than denominator at equilibrium."
            ],
            hint: "Compare K to 1 for quick insight."
          }
        ],
        quiz: [
          { q: "If Q < K which direction does reaction proceed?", a: "Forward (toward products)." },
          { q: "Does adding inert gas at constant volume shift equilibrium?", a: "No, partial pressures of reactants/products unchanged at constant volume." }
        ]
      },

      // 4 Electrochemistry & Redox
      {
        explanation:
"Learning goal: Balance redox equations, identify anode/cathode in galvanic cells, and compute E°cell using standard potentials.\n\n" +
"Strategy: split into half-reactions, balance electrons, combine. For cell potentials, E°cell = E°cathode − E°anode.\n\n" +
"**Key point:** Spontaneous galvanic cells have positive E°cell and negative ΔG° (ΔG° = −nFE°).",
        examples: [
          {
            title: "Example — Half-reaction balance",
            problem: "Balance MnO4− → Mn2+ in acidic solution.",
            solution: "MnO4− + 8 H+ + 5 e− → Mn2+ + 4 H2O",
            steps: [
              "Balance Mn, then O by adding H2O, then H by adding H+, finally balance charge by adding e−."
            ],
            hint: "Use acidic or basic conditions appropriately (add OH− for basic)."
          },
          {
            title: "Example — Cell potential compute",
            problem: "Given E°(Cu2+/Cu)=+0.34 V and E°(Zn2+/Zn)=−0.76 V, find E°cell for Zn|Cu cell.",
            solution: "E°cell = E°cathode − E°anode = 0.34 − (−0.76) = 1.10 V",
            steps: [
              "Identify cathode (reduction) and anode (oxidation).",
              "Apply difference of standard potentials."
            ],
            hint: "Do not multiply potentials by stoichiometric coefficients."
          },
          {
            title: "Practice — Relationship to ΔG",
            problem: "If a cell has E° = 0.5 V and n = 2 electrons transferred, what is ΔG° (F = 96485 C/mol)?",
            solution: "ΔG° = −n F E° ≈ −2 × 96485 × 0.5 ≈ −96,485 J ≈ −96.5 kJ",
            steps: [
              "Plug values into ΔG° = −n F E°."
            ],
            hint: "Watch units: convert J to kJ if asked."
          }
        ],
        quiz: [
          { q: "In which electrode does oxidation occur?", a: "Anode." },
          { q: "Sign of E°cell for spontaneous reaction?", a: "Positive." }
        ]
      },

      // 5 Organic Chemistry Basics (Functional Groups)
      {
        explanation:
"Learning goal: Recognize functional groups, name simple molecules, and understand how functional groups dictate reactivity.\n\n" +
"Approach: learn the common functional groups (alcohol, aldehyde, ketone, carboxylic acid, amine, ester) and practice simple nomenclature and reactivity patterns (e.g., nucleophilic addition to carbonyls).\n\n" +
"**Important:** Functional groups are the reactive centers of organic molecules; learning them by sight helps you predict behavior.",
        examples: [
          {
            title: "Example — Naming an alcohol",
            problem: "Name CH3CH2CH2OH.",
            solution: "1-propanol (or propan-1-ol).",
            steps: [
              "Three carbons ⇒ prop- root; suffix -anol for alcohol; OH on carbon 1 → 1-propanol."
            ],
            hint: "Number the chain to give the functional group the lowest possible number."
          },
          {
            title: "Example — Carbonyl reactivity",
            problem: "Why are aldehydes generally more reactive than ketones toward nucleophiles?",
            solution: "Aldehydes have one alkyl group (less electron donating) and less steric hindrance than ketones, so they are more electrophilic.",
            steps: [
              "Electron donation by alkyl groups reduces electrophilicity; steric hindrance also slows attack."
            ],
            hint: "Think about both electronic and steric effects."
          },
          {
            title: "Practice — Functional group recognition",
            problem: "Identify functional group in CH3COOH.",
            solution: "Carboxylic acid.",
            steps: [
              "Look for -COOH motif which defines carboxylic acids."
            ],
            hint: "Carboxylic acids are acidic (pKa ~ 4–5 for simple ones)."
          }
        ],
        quiz: [
          { q: "Give an example of a nucleophile.", a: "OH−, NH3, CN−, etc." },
          { q: "What functional group does an ester have?", a: "R–CO–O–R' (carbonyl adjacent to an oxygen linking to another carbon)." }
        ]
      },

      // 6 Coordination Chemistry & Transition Metals (intro)
      {
        explanation:
"Learning goal: Understand basic coordination compounds: ligands, coordination number, and simple naming rules.\n\n" +
"Coordination complexes form when transition metal ions bind to ligands (molecules or ions that donate electron pairs). The properties (color, magnetism) depend on d-electron configuration and ligand field.\n\n" +
"**Key point:** Ligands donate electron pairs to metals; geometry depends on coordination number (4 → tetrahedral or square planar, 6 → octahedral).",
        examples: [
          {
            title: "Example — Naming simple complex",
            problem: "Name [Cu(NH3)4]2+",
            solution: "Tetraamminecopper(II) ion",
            steps: [
              "Ligands named before the metal; 'ammine' indicates NH3 as ligand; copper oxidation state is +2."
            ],
            hint: "Brackets enclose the coordination sphere; charge shown after."
          },
          {
            title: "Practice — Coordination number idea",
            problem: "If a metal has 6 ligands, what geometry is common?",
            solution: "Octahedral.",
            steps: [
              "Six points around a central atom arrange in octahedral shape."
            ],
            hint: "Ligand size and electronic factors can change geometry."
          },
          {
            title: "Practice — Ligand types",
            problem: "Is CN− a strong or weak field ligand (qualitatively)?",
            solution: "Strong-field ligand (tends to pair electrons and create larger crystal field splitting).",
            steps: [
              "CN− is a π-acceptor and typically produces larger splitting."
            ],
            hint: "Strong-field vs weak-field affects magnetism and color."
          }
        ],
        quiz: [
          { q: "What donates electrons to a metal in coordination chemistry?", a: "Ligands (Lewis bases)." },
          { q: "Common geometry for coordination number 6?", a: "Octahedral." }
        ]
      },

      // 7 Nuclear Chemistry & Radioactivity
      {
        explanation:
"Learning goal: Identify nuclear decay types (alpha, beta, gamma) and use half-life concepts to compute remaining amounts.\n\n" +
"Alpha emission decreases A by 4 and Z by 2; beta minus converts neutron to proton (Z increases by 1); gamma is energy emission. Half-life calculations use successive halving or the exponential decay formula N = N0 e^(−λt).\n\n" +
"**Important:** Radioactivity involves nuclear changes — chemical methods cannot change nuclei (except in reactors or accelerators).",
        examples: [
          {
            title: "Example — Half-life halving",
            problem: "If a sample has half-life 10 days, what fraction remains after 30 days?",
            solution: "1/8 (three half-lives).",
            steps: [
              "30 days = 3 half-lives → remaining fraction = (1/2)^3 = 1/8."
            ],
            hint: "Use exponents for non-integer multiples of half-life."
          },
          {
            title: "Example — Identify decay",
            problem: "If atomic number increases by 1, what happened?",
            solution: "Beta minus decay (neutron → proton + electron).",
            steps: [
              "Charge increased by 1 while mass roughly unchanged."
            ],
            hint: "Alpha causes larger jumps in mass/charge."
          },
          {
            title: "Practice — Activity units",
            problem: "What is the SI unit for radioactive activity?",
            solution: "Becquerel (Bq) = one decay per second.",
            steps: [
              "Old unit is curie (Ci); 1 Ci = 3.7 × 10^10 Bq."
            ],
            hint: "Use proper units when calculating rates."
          }
        ],
        quiz: [
          { q: "Define half-life.", a: "Time for half of radioactive nuclei to decay." },
          { q: "Alpha particle composition?", a: "2 protons and 2 neutrons (a helium nucleus)." }
        ]
      },

      // 8 Environmental & Green Chemistry Concepts
      {
        explanation:
"Learning goal: Understand how chemical principles apply to environmental issues (pollution, water treatment, sustainable synthesis) and learn green chemistry basics.\n\n" +
"I teach environmental chemistry by connecting real problems (acid rain, water contamination, atmospheric pollutants) to chemical reactions and mitigation strategies.\n\n" +
"**Key point:** Prevention is preferable to cleanup — green chemistry emphasizes atom economy, safer solvents, and energy efficiency.",
        examples: [
          {
            title: "Example — Acid rain chain",
            problem: "How does SO2 become acid rain?",
            solution: "SO2 oxidizes to SO3, then reacts with water to form H2SO4 (sulfuric acid).",
            steps: [
              "SO2 + 1/2 O2 → SO3 (oxidation in atmosphere).",
              "SO3 + H2O → H2SO4 → acid deposition."
            ],
            hint: "Combustion of sulfur-containing fuels contributes to SO2 emissions."
          },
          {
            title: "Example — Water disinfection",
            problem: "Why use chlorination in water treatment?",
            solution: "Chlorine kills pathogens and provides residual protection against recontamination.",
            steps: [
              "Chlorination oxidizes cellular components of microbes.",
              "Residual chlorine prevents microbial regrowth in distribution."
            ],
            hint: "Balance disinfection benefits with formation of disinfection byproducts."
          },
          {
            title: "Practice — Green metric",
            problem: "What does high atom economy indicate for a synthesis?",
            solution: "Most atoms of reactants end up in desired product — less waste, more efficient.",
            steps: [
              "Compare atomic mass in product vs reactants to compute atom economy."
            ],
            hint: "Catalytic, selective reactions often improve atom economy."
          }
        ],
        quiz: [
          { q: "Name one product of fossil fuel combustion that contributes to acid rain.", a: "SO2 or NOx." },
          { q: "What is a pillar of green chemistry?", a: "Prevent waste, use safer solvents, improve energy efficiency." }
        ]
      }
    ]
  }
];

export default function Chemistry({ semester }) {
  // LessonPlayer expects courseContent and a semester string like "First Semester"
  return <LessonPlayer courseLabel="Chemistry 101" courseContent={ChemistryContent} semester={semester} />;
}
