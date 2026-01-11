import React from "react";
import LessonPlayer from "../shared/LessonPlayer";

/**
 * Chemistry.jsx (Expanded - tutor-friendly)
 *
 * - Matches Physics.jsx structure: courseContent array with Sessions
 * - "Professor's Narrative" style: Why are we learning this? How do you avoid traps?
 * - Includes  tags for diagram generation.
 * - Uses string concatenation instead of backticks to prevent potential build issues with large text blocks.
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
      // 1. Matter & Measurement
      {
        explanation:
"Chemistry is an exact science. A number without a unit is meaningless, and a number with too many decimal places is a lie. We start with Significant Figures (Sig Figs), which tell us the precision of our measurement.\n\n" +
"

[Image of accuracy vs precision targets]
\n\n" +
"**The Golden Rules:**\n" +
"1. Non-zero digits are always significant.\n" +
"2. Zeros between non-zeros are significant (Sandwich rule).\n" +
"3. Leading zeros are NEVER significant (they are just placeholders).\n" +
"4. Trailing zeros are significant ONLY if there is a decimal point.\n\n" +
"**Dimensional Analysis:** Never just multiply numbers. Multiply units. If you are converting km/h to m/s, set up the fractions so 'km' cancels 'km' and 'h' cancels 'h'. If the units don't cancel to give the answer you want, the math is wrong, guaranteed.",
        examples: [
          {
            title: "Example — Unit Conversion",
            problem: "Convert 120 km/h to m/s.",
            solution: "33.3 m/s",
            steps: [
              "Setup: (120 km/1 h) * (1000 m / 1 km) * (1 h / 3600 s).",
              "Cancel units: km cancels km, h cancels h.",
              "Math: 120 * 1000 / 3600 = 33.333...",
              "Sig Figs: 120 has 3 sig figs (if decimal assumed) or 2. Standard is 3 here -> 33.3 m/s."
            ]
          },
          {
            title: "Example — Sig Figs in Addition",
            problem: "12.52 + 349.0 + 8.24",
            solution: "369.8",
            steps: [
              "Sum raw: 369.76.",
              "Rule: Round to the least precise decimal place.",
              "12.52 (hundredths), 349.0 (tenths), 8.24 (hundredths).",
              "Limiter is tenths. Round 369.76 to 369.8."
            ]
          },
          {
            title: "Example — Density",
            problem: "Object mass 50.0 g, volume 12.0 mL. Density?",
            solution: "4.17 g/mL",
            steps: [
              "D = m / V = 50.0 / 12.0.",
              "Raw: 4.1666...",
              "Sig Figs: 3 inputs / 3 inputs -> 3 outputs.",
              "Result: 4.17 g/mL."
            ]
          }
        ],
        quiz: [
          { q: "How many sig figs in 0.00500?", a: "3 (The leading zeros are placeholders, trailing zeros count)." },
          { q: "What is the result of 2.0 * 3.00?", a: "6.0 (2 sig figs)." }
        ]
      },

      // 2. Atomic Structure
      {
        explanation:
"An atom is mostly empty space. The nucleus (protons + neutrons) is tiny but heavy; the electrons are vast but light. \n\n" +
"\n\n" +
"We identify atoms using:\n" +
"* **Z (Atomic Number):** Number of protons. This defines the element.\n" +
"* **A (Mass Number):** Protons + Neutrons.\n" +
"**Isotopes** are siblings: same Z, different A (different neutrons). They behave chemically the same but weigh different amounts. To find the Average Atomic Mass (the number on the Periodic Table), we take a weighted average of all natural isotopes.",
        examples: [
          {
            title: "Example — Subatomic Particles",
            problem: "How many p, n, e in Carbon-14 (neutral)?",
            solution: "6p, 8n, 6e",
            steps: [
              "Carbon is atomic number 6 -> 6 Protons.",
              "Neutral atom means Electrons = Protons -> 6 Electrons.",
              "Mass number 14. Neutrons = 14 - 6 = 8 Neutrons."
            ]
          },
          {
            title: "Example — Ion Count",
            problem: "Count particles in O-16 with -2 charge.",
            solution: "8p, 8n, 10e",
            steps: [
              "Oxygen is Z=8 -> 8 Protons.",
              "Mass 16 -> 8 Neutrons.",
              "Charge -2 means it GAINED 2 electrons. 8 + 2 = 10 Electrons."
            ]
          },
          {
            title: "Example — Average Atomic Mass",
            problem: "Element X: 20% is mass 10, 80% is mass 11.",
            solution: "10.8 amu",
            steps: [
              "Avg = (0.20 * 10) + (0.80 * 11).",
              "Avg = 2.0 + 8.8 = 10.8 amu."
            ]
          }
        ],
        quiz: [
          { q: "What changes between isotopes?", a: "Number of neutrons." },
          { q: "Where is the mass of the atom concentrated?", a: "In the nucleus." }
        ]
      },

      // 3. Electron Config
      {
        explanation:
"Electrons don't orbit like planets; they exist in probability clouds called orbitals (s, p, d, f). We fill them from lowest energy up (Aufbau Principle). \n\n" +
"

[Image of orbital filling diagram]
\n\n" +
"The Periodic Table is a map of these orbitals. \n" +
"* **Atomic Radius:** Decreases Left-to-Right (more suction from protons), Increases Down (more shells).\n" +
"* **Ionization Energy:** Opposite of radius. Harder to remove electrons from small, tight atoms.\n\n" +
"\n\n" +
"**Teacher Tip:** Transition metals lose 's' electrons BEFORE 'd' electrons when forming ions. Fe is [Ar] 4s2 3d6, but Fe2+ is [Ar] 3d6.",
        examples: [
          {
            title: "Example — Configuration",
            problem: "Electron config for Chlorine (Z=17).",
            solution: "1s2 2s2 2p6 3s2 3p5",
            steps: [
              "Fill order: 1s, 2s, 2p, 3s, 3p.",
              "2+2+6+2+5 = 17.",
              "Shorthand: [Ne] 3s2 3p5."
            ]
          },
          {
            title: "Example — Periodic Trends",
            problem: "Larger radius: Na or Mg?",
            solution: "Na",
            steps: [
              "Same row (Period 3).",
              "Mg has more protons (12 vs 11), pulling the shell tighter.",
              "Therefore Na is larger."
            ]
          },
          {
            title: "Example — Ion Config",
            problem: "Config for Fe3+ (Iron Z=26).",
            solution: "[Ar] 3d5",
            steps: [
              "Neutral Fe: [Ar] 4s2 3d6.",
              "Remove 3 electrons. First take the two 4s, then one 3d.",
              "Result: [Ar] 3d5 (Half-filled d-shell is stable!)."
            ]
          }
        ],
        quiz: [
          { q: "Which group consists of Noble Gases?", a: "Group 18." },
          { q: "What is the trend for Electronegativity?", a: "Increases up and to the right (Fluorine is king)." }
        ]
      },

      // 4. Bonding
      {
        explanation:
"Atoms bond to lower their energy, usually seeking 8 valence electrons (The Octet Rule). \n\n" +
"\n\n" +
"* **Ionic:** Transfer of electrons. Metal + Nonmetal. Held together by charge attraction (Lattice Energy).\n" +
"* **Covalent:** Sharing of electrons. Nonmetal + Nonmetal. \n" +
"* **Polar Covalent:** Unequal sharing. The greedy atom (higher electronegativity) pulls the electrons closer, creating a dipole.\n\n" +
"**Check:** If ΔEN > 1.7, it's Ionic. Between 0.4 and 1.7, Polar Covalent. < 0.4, Nonpolar.",
        examples: [
          {
            title: "Example — Bond Type",
            problem: "Classify bond in KCl.",
            solution: "Ionic",
            steps: [
              "K is Group 1 (Metal). Cl is Group 17 (Nonmetal).",
              "Metal + Nonmetal = Ionic.",
              "ΔEN is large."
            ]
          },
          {
            title: "Example — Polarity",
            problem: "Is the H-Cl bond polar?",
            solution: "Yes",
            steps: [
              "Cl is very electronegative (3.0), H is moderate (2.1).",
              "Difference is 0.9.",
              "Polar Covalent. Cl gets δ-, H gets δ+."
            ]
          },
          {
            title: "Example — Lattice Energy",
            problem: "Which has higher lattice energy: NaCl or MgO?",
            solution: "MgO",
            steps: [
              "Lattice energy depends on charge magnitude (q1*q2).",
              "Na+ Cl- is (+1)*(-1).",
              "Mg2+ O2- is (+2)*(-2) = 4x magnitude.",
              "MgO holds together much stronger."
            ]
          }
        ],
        quiz: [
          { q: "What bond involves a sea of delocalized electrons?", a: "Metallic Bond." },
          { q: "How many electrons in a double bond?", a: "4 electrons." }
        ]
      },

      // 5. VSEPR
      {
        explanation:
"Lewis structures show connectivity; VSEPR shows 3D shape. Electrons define the shape because they repel each other.\n\n" +
"

[Image of VSEPR molecular geometries chart]
\n\n" +
"1. Draw Lewis Structure.\n" +
"2. Count 'Domains' around center (Bonds + Lone Pairs).\n" +
"3. Arrange domains to maximize space.\n" +
"   - 2 Domains: Linear (180°)\n" +
"   - 3 Domains: Trigonal Planar (120°)\n" +
"   - 4 Domains: Tetrahedral (109.5°)\n" +
"**Crucial:** Lone pairs are 'fat'. They push bond angles down. (e.g., Water is Tetrahedral geometry but 'Bent' shape because of 2 lone pairs).",
        examples: [
          {
            title: "Example — Methane (CH4)",
            problem: "Shape of CH4?",
            solution: "Tetrahedral",
            steps: [
              "Lewis: C in middle, 4 H around. 0 Lone pairs.",
              "4 Bond domains.",
              "Geometry: Tetrahedral. Shape: Tetrahedral."
            ]
          },
          {
            title: "Example — Ammonia (NH3)",
            problem: "Shape of NH3?",
            solution: "Trigonal Pyramidal",
            steps: [
              "Lewis: N in middle, 3 H, 1 Lone Pair (5 valence e-).",
              "4 Domains total -> Tetrahedral geometry.",
              "1 Lone pair makes the shape 'Trigonal Pyramidal'. Angle < 109.5."
            ]
          },
          {
            title: "Example — CO2",
            problem: "Shape of CO2?",
            solution: "Linear",
            steps: [
              "Lewis: O=C=O.",
              "Double bonds count as 1 domain.",
              "2 Domains -> Linear -> 180°."
            ]
          }
        ],
        quiz: [
          { q: "Bond angle of BF3 (Trigonal Planar)?", a: "120°." },
          { q: "Is CO2 polar?", a: "No. The bonds are polar, but they pull in opposite directions and cancel out." }
        ]
      },

      // 6. Stoichiometry
      {
        explanation:
"Stoichiometry is the recipe of chemistry. The coefficients in a balanced equation are the MOLE RATIOS. Not gram ratios. \n\n" +
"\n\n" +
"**The Process:**\n" +
"Grams A -> Moles A -> Moles B -> Grams B.\n\n" +
"**Limiting Reagent:** If you have 2 slices of bread and 100 slices of cheese, you can only make 1 sandwich. The bread limits you. To find the limiting reagent, calculate how much product EACH reactant can make. The smallest answer is the truth.",
        examples: [
          {
            title: "Example — Grams to Grams",
            problem: "2H2 + O2 -> 2H2O. How much water from 4.0g H2?",
            solution: "36 g",
            steps: [
              "Moles H2: 4.0g / 2.0 g/mol = 2.0 mol.",
              "Ratio: 2 mol H2 makes 2 mol H2O (1:1). So 2.0 mol H2O.",
              "Grams H2O: 2.0 mol * 18.0 g/mol = 36 g."
            ]
          },
          {
            title: "Example — Limiting Reagent",
            problem: "5 mol H2 and 2 mol O2. How much water?",
            solution: "4 mol H2O (O2 is limiting)",
            steps: [
              "Check H2: 5 mol H2 -> 5 mol H2O.",
              "Check O2: 2 mol O2 * (2 H2O / 1 O2) = 4 mol H2O.",
              "4 < 5. O2 runs out first. Answer is 4 mol."
            ]
          },
          {
            title: "Example — Percent Yield",
            problem: "Theoretical yield 50g. Actual 40g. % Yield?",
            solution: "80%",
            steps: [
              "(Actual / Theoretical) * 100.",
              "40/50 = 0.8 -> 80%."
            ]
          }
        ],
        quiz: [
          { q: "What connects Grams to Moles?", a: "Molar Mass (from Periodic Table)." },
          { q: "What connects Moles A to Moles B?", a: "Coefficients from the balanced equation." }
        ]
      },

      // 7. Gas Laws
      {
        explanation:
"Gases are wild particles flying around. We describe them with PV=nRT (Ideal Gas Law).\n\n" +
"\n\n" +
"**Teacher Tip:** \n" +
"1. Temperature must ALWAYS be in Kelvin (C + 273).\n" +
"2. Pressure and Volume units must match your R constant (usually atm and L for R=0.0821).\n" +
"**Relationships:**\n" +
"* Boyle's Law: P and V are inverse (Squish balloon -> Pressure up).\n" +
"* Charles's Law: V and T are direct (Heat balloon -> Volume expands).",
        examples: [
          {
            title: "Example — Ideal Gas Law",
            problem: "V=10L, T=27°C, n=2 mol. Find P. (R=0.0821)",
            solution: "4.9 atm",
            steps: [
              "Convert T: 27 + 273 = 300 K.",
              "PV = nRT -> P = nRT/V.",
              "P = (2 * 0.0821 * 300) / 10.",
              "P = 49.26 / 10 = 4.926 atm."
            ]
          },
          {
            title: "Example — Combined Gas Law",
            problem: "P1=1atm, V1=2L. P2=2atm. Find V2 (T constant).",
            solution: "1 L",
            steps: [
              "P1V1 = P2V2.",
              "1 * 2 = 2 * V2.",
              "2 = 2V2 -> V2 = 1 L."
            ]
          },
          {
            title: "Example — STP",
            problem: "Volume of 1 mol gas at STP?",
            solution: "22.4 L",
            steps: [
              "STP is 1 atm and 273 K.",
              "V = nRT/P = (1 * 0.0821 * 273) / 1 ≈ 22.4 L."
            ]
          }
        ],
        quiz: [
          { q: "What is 0°C in Kelvin?", a: "273 K." },
          { q: "What causes gas pressure?", a: "Collisions of particles with the container walls." }
        ]
      },

      // 8. Acids & Bases
      {
        explanation:
"Acids donate H+ (protons). Bases accept H+ (or donate OH-). \n" +
"The pH scale is logarithmic. A change of 1 pH unit is a 10x change in concentration.\n\n" +
"

[Image of pH scale examples]
\n\n" +
"* **Strong Acids** (HCl, HNO3, H2SO4) split 100%. [H+] = [Acid].\n" +
"* **Weak Acids** (HF, Vinegar) split barely. You must use an ICE table and Ka.\n" +
"* **Titration:** Neutralizing an acid with a base. At the equivalence point, moles Acid = moles Base. M1V1 = M2V2 (for 1:1 ratios).",
        examples: [
          {
            title: "Example — pH Calculation",
            problem: "pH of 0.01 M HCl?",
            solution: "2.0",
            steps: [
              "Strong acid -> [H+] = 0.01.",
              "pH = -log[H+] = -log(10^-2) = 2."
            ]
          },
          {
            title: "Example — pOH",
            problem: "[OH-] = 1e-4. Find pH.",
            solution: "10",
            steps: [
              "pOH = -log(1e-4) = 4.",
              "pH + pOH = 14.",
              "pH = 14 - 4 = 10."
            ]
          },
          {
            title: "Example — Titration",
            problem: "20mL HCl of unknown conc neutralized by 10mL of 0.1M NaOH.",
            solution: "0.05 M",
            steps: [
              "M1V1 = M2V2.",
              "M_acid * 20 = 0.1 * 10.",
              "20 M_acid = 1 -> M_acid = 1/20 = 0.05 M."
            ]
          }
        ],
        quiz: [
          { q: "Is pH 2 acidic or basic?", a: "Acidic." },
          { q: "What is the conjugate base of HCl?", a: "Cl-." }
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
      "Thermochemistry & Enthalpy",
      "Chemical Kinetics & Activation Energy",
      "Chemical Equilibrium & Le Chatelier",
      "Electrochemistry (Redox)",
      "Organic Chemistry Basics",
      "Coordination Chemistry",
      "Nuclear Chemistry",
      "Environmental Chemistry"
    ],
    Content: [
      // 1. Thermochemistry
      {
        explanation:
"Energy is neither created nor destroyed. In chemistry, we track Heat (q) and Enthalpy (ΔH).\n\n" +
"

[Image of exothermic and endothermic reaction profile diagrams]
\n\n" +
"* **Exothermic (-ΔH):** Heat released. System gets cooler, surroundings get hotter. (Diagram goes DOWN).\n" +
"* **Endothermic (+ΔH):** Heat absorbed. (Diagram goes UP).\n" +
"We calculate heat using q = mcΔT (for temp changes) or Hess's Law (adding reaction steps together).",
        examples: [
          {
            title: "Example — Calorimetry",
            problem: "Heat to warm 10g water by 10°C? (c=4.18)",
            solution: "418 J",
            steps: [
              "q = mcΔT.",
              "q = 10 * 4.18 * 10 = 418 J."
            ]
          },
          {
            title: "Example — Hess's Law",
            problem: "A->B (ΔH=10), B->C (ΔH=20). Find A->C.",
            solution: "30",
            steps: [
              "Add equations: A->B + B->C = A->C.",
              "Add enthalpies: 10 + 20 = 30."
            ]
          },
          {
            title: "Example — Phase Change",
            problem: "Heat to melt 18g ice at 0°C? (ΔHfus = 6 kJ/mol)",
            solution: "6 kJ",
            steps: [
              "18g water = 1 mol.",
              "q = n * ΔHfus = 1 * 6 = 6 kJ.",
              "Note: Temp does not change during phase change!"
            ]
          }
        ],
        quiz: [
          { q: "If ΔH is negative, is the reaction exo- or endothermic?", a: "Exothermic." },
          { q: "What is the specific heat of water?", a: "4.18 J/g°C." }
        ]
      },

      // 2. Kinetics
      {
        explanation:
"Thermodynamics tells us IF a reaction happens; Kinetics tells us HOW FAST. \n" +
"Rate depends on:\n" +
"1. Concentration (Collision Theory)\n" +
"2. Temperature (More energy to break bonds)\n" +
"3. Activation Energy (Ea)\n\n" +
"

[Image of reaction coordinate diagram with catalyst]
\n\n" +
"**Catalysts** speed up reactions by lowering Ea. They provide a tunnel through the energy mountain. They do NOT change the start or end energy (ΔH).",
        examples: [
          {
            title: "Example — Rate Law",
            problem: "Doubling [A] doubles rate. Order?",
            solution: "First Order",
            steps: [
              "Rate = k[A]^n.",
              "2 = 2^n -> n=1."
            ]
          },
          {
            title: "Example — Second Order",
            problem: "Doubling [A] quadruples rate.",
            solution: "Second Order",
            steps: [
              "4 = 2^n -> n=2."
            ]
          },
          {
            title: "Example — Activation Energy",
            problem: "If T increases, what happens to Rate?",
            solution: "Increases",
            steps: [
              "Higher T means more molecules have energy > Ea.",
              "More successful collisions per second."
            ]
          }
        ],
        quiz: [
          { q: "Does a catalyst change the equilibrium position?", a: "No. It just gets you there faster." },
          { q: "What is the slow step of a reaction called?", a: "The Rate-Determining Step." }
        ]
      },

      // 3. Equilibrium
      {
        explanation:
"Most reactions don't go 100% to completion. They hit a balance point where Rate_forward = Rate_reverse. This is Equilibrium (K).\n" +
"K = [Products] / [Reactants].\n" +
"* K > 1: Products favored.\n" +
"* K < 1: Reactants favored.\n\n" +
"\n\n" +
"**Le Chatelier's Principle:** If you stress a system, it fights back.\n" +
"- Add product? System shifts Left.\n" +
"- Increase Pressure? System shifts to side with FEWER gas moles.",
        examples: [
          {
            title: "Example — Writing K",
            problem: "N2 + 3H2 <-> 2NH3. Write K expression.",
            solution: "[NH3]^2 / ([N2][H2]^3)",
            steps: [
              "Products on top. Reactants on bottom.",
              "Coefficients become exponents."
            ]
          },
          {
            title: "Example — Le Chatelier (Conc)",
            problem: "Remove NH3 from above. Which way shift?",
            solution: "Right",
            steps: [
              "System wants to replace missing NH3.",
              "Forward reaction produces NH3. Shift Right."
            ]
          },
          {
            title: "Example — Le Chatelier (Pressure)",
            problem: "Increase pressure on N2 + 3H2 <-> 2NH3.",
            solution: "Shift Right",
            steps: [
              "Left: 1+3 = 4 moles gas.",
              "Right: 2 moles gas.",
              "System wants to reduce pressure, so it moves to side with fewer moles (2)."
            ]
          }
        ],
        quiz: [
          { q: "Do we include solids in the K expression?", a: "No. Solids and liquids have constant concentration." },
          { q: "What is the only thing that changes the value of K?", a: "Temperature." }
        ]
      },

      // 4. Electrochemistry
      {
        explanation:
"Redox = Electron Transfer. LEO says GER (Lose Electrons Oxidation, Gain Electrons Reduction).\n" +
"We separate these into two half-cells to make a battery (Galvanic Cell).\n\n" +
"

[Image of galvanic cell diagram Zn Cu]
\n\n" +
"**Anode:** Oxidation happens here. (An Ox).\n" +
"**Cathode:** Reduction happens here. (Red Cat).\n" +
"**E_cell = E_cathode - E_anode.** Positive E means spontaneous battery.",
        examples: [
          {
            title: "Example — Oxidation State",
            problem: "Oxidation state of S in SO4(2-)?",
            solution: "+6",
            steps: [
              "O is usually -2. 4*(-2) = -8.",
              "S + (-8) = -2 (total charge).",
              "S = +6."
            ]
          },
          {
            title: "Example — Cell Potential",
            problem: "Cu (+0.34V) and Zn (-0.76V). Calculate E_cell.",
            solution: "1.10 V",
            steps: [
              "Identify higher potential as Cathode (Cu). Zn is Anode.",
              "E = 0.34 - (-0.76) = 1.10 V."
            ]
          },
          {
            title: "Example — Spontaneity",
            problem: "Is E_cell = -1.5V spontaneous?",
            solution: "No",
            steps: [
              "Negative E means non-spontaneous (requires energy input, like Electrolysis)."
            ]
          }
        ],
        quiz: [
          { q: "Where do electrons flow in a wire?", a: "From Anode to Cathode." },
          { q: "What is the function of the Salt Bridge?", a: "To balance charge by allowing ions to flow." }
        ]
      },

      // 5. Organic
      {
        explanation:
"Carbon is the backbone of life. It forms 4 bonds. We categorize organic molecules by **Functional Groups**.\n\n" +
"

[Image of organic functional groups list]
\n\n" +
"* **Alkane:** Single bonds (C-C). Boring.\n" +
"* **Alkene:** Double bonds (C=C). Reactive.\n" +
"* **Alcohol:** -OH group.\n" +
"* **Carboxylic Acid:** -COOH (Acidic).\n" +
"* **Amine:** -NH2 (Basic, smells like fish).\n" +
"Naming follows IUPAC rules: Prefix (Meth, Eth, Prop) + Suffix (-ane, -ene, -ol).",
        examples: [
          {
            title: "Example — Naming",
            problem: "Name C2H6.",
            solution: "Ethane",
            steps: [
              "2 Carbons -> 'Eth'.",
              "All single bonds -> 'ane'.",
              "Ethane."
            ]
          },
          {
            title: "Example — Functional ID",
            problem: "CH3-OH",
            solution: "Methanol (Alcohol)",
            steps: [
              "-OH group indicates Alcohol.",
              "1 Carbon indicates Meth-."
            ]
          },
          {
            title: "Example — Isomers",
            problem: "C4H10 has how many isomers?",
            solution: "2 (Butane and Isobutane)",
            steps: [
              "Straight chain: n-Butane.",
              "Branched: 2-methylpropane."
            ]
          }
        ],
        quiz: [
          { q: "What functional group makes vinegar sour?", a: "Carboxylic Acid (Acetic Acid)." },
          { q: "Prefix for 1, 2, 3 carbons?", a: "Meth-, Eth-, Prop-." }
        ]
      },

      // 6. Coordination
      {
        explanation:
"Transition metals are colorful because they have d-orbitals. \n" +
"A **Complex** is a metal ion surrounded by Ligands (molecules donating electron pairs).\n\n" +
"\n\n" +
"The ligands split the d-orbital energies. When electrons jump between these split levels, they absorb light. The color you see is the complement of the color absorbed.",
        examples: [
          {
            title: "Example — Ligands",
            problem: "Ligands in [Cu(H2O)6]2+?",
            solution: "Water molecules",
            steps: [
              "6 Water molecules surround the Copper ion.",
              "Coordination number is 6 (Octahedral)."
            ]
          },
          {
            title: "Example — Charge",
            problem: "Charge of Fe in [Fe(CN)6]3-? (CN is -1)",
            solution: "+3",
            steps: [
              "Total = -3.",
              "6 * CN(-1) = -6.",
              "Fe + (-6) = -3 -> Fe = +3."
            ]
          }
        ],
        quiz: [
          { q: "What shape is coordination number 6?", a: "Octahedral." },
          { q: "Why are Zn2+ solutions colorless?", a: "Full d-subshell (d10). No room for electron transitions." }
        ]
      },

      // 7. Nuclear
      {
        explanation:
"Chemical reactions rearrange electrons. Nuclear reactions rearrange the nucleus (Protons/Neutrons). Massive energy change.\n\n" +
"\n\n" +
"* **Alpha Decay:** Loses Helium nucleus (2p, 2n). Mass drops by 4.\n" +
"* **Beta Decay:** Neutron turns into Proton + Electron. Atomic number goes UP by 1.\n" +
"* **Half-Life:** Time for 50% of stuff to disappear.",
        examples: [
          {
            title: "Example — Alpha Decay",
            problem: "U-238 emits Alpha. What is left?",
            solution: "Th-234",
            steps: [
              "Uranium is Z=92.",
              "Lose 2p, 2n. New Z=90 (Thorium).",
              "Mass 238 - 4 = 234."
            ]
          },
          {
            title: "Example — Half Life",
            problem: "Start 100g. Half life 10 min. How much left after 30 min?",
            solution: "12.5g",
            steps: [
              "30 min = 3 half lives.",
              "100 -> 50 -> 25 -> 12.5g."
            ]
          }
        ],
        quiz: [
          { q: "Which radiation is most penetrating?", a: "Gamma Rays." },
          { q: "Does temperature affect nuclear half-life?", a: "No. Nuclear processes are independent of environment." }
        ]
      },

      // 8. Environmental
      {
        explanation:
"Chemistry happens in the wild too. \n" +
"* **Acid Rain:** SO2 and NOx from cars/factories mix with rain to make H2SO4 and HNO3.\n\n" +
"\n\n" +
"* **Ozone Layer:** O3 in stratosphere protects us from UV. CFCs destroy it.\n" +
"* **Greenhouse Effect:** CO2 and Methane trap heat like a blanket.\n" +
"Green Chemistry aims to reduce waste (Atom Economy) and avoid toxic solvents.",
        examples: [
          {
            title: "Example — pH of Rain",
            problem: "Normal rain pH vs Acid rain pH?",
            solution: "5.6 vs <5.0",
            steps: [
              "Normal rain is slightly acidic due to carbonic acid (CO2).",
              "Acid rain is much lower due to sulfuric/nitric acids."
            ]
          },
          {
            title: "Example — Atom Economy",
            problem: "Reaction A makes 100g product + 200g waste. Reaction B makes 100g product + 5g waste.",
            solution: "Reaction B is greener",
            steps: [
              "Atom Economy = (Mass Desired / Mass Total reactants).",
              "Reaction B wastes less mass."
            ]
          }
        ],
        quiz: [
          { q: "What gas is the main driver of climate change?", a: "Carbon Dioxide (CO2)." },
          { q: "What is eutrophication?", a: "Excess nutrients (N, P) causing algae blooms that kill fish." }
        ]
      }
    ]
  }
];

export default function Chemistry({ semester }) {
  return <LessonPlayer courseLabel="Chemistry 101" courseContent={ChemistryContent} semester={semester} />;
}
