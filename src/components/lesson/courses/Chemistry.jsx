import React from "react";
import LessonPlayer from "../shared/LessonPlayer";

/**
 * Chemistry.jsx
 * Expanded Chemistry 101 content for First & Second Semester
 * Teaching-style explanations, multiple examples, practice questions
 */

const ChemistryContent = [
  {
    Session: "First Semester",
    Topics: [
      "Measurements, Units, Significant Figures & Safety",
      "Atomic Structure & Periodic Trends",
      "Chemical Bonding & Molecular Geometry",
      "Stoichiometry & Reaction Calculations",
      "States of Matter & Intermolecular Forces",
      "Solutions, Concentration Units & Colligative Properties",
      "Acids, Bases & pH Basics",
      "Introductory Organic Chemistry: Functional Groups"
    ],
    Content: [
      // 1 Measurements & Safety
      {
        explanation:
`Good experimental practice starts with precise measurements and safety. Understand SI base units and convert consistently. Significant figures reflect measurement precision—operations follow rules for multiplication/division (least significant figures) and addition/subtraction (least decimal places). Safety requires PPE, understanding SDS sheets, and proper waste disposal.

When planning calculations, check units at each step; dimensional analysis can catch errors early.`,
        examples: [
          {
            title: "Example — Unit conversion & dim analysis",
            problem: "Convert 72.5 km/h to m/s",
            solution: "72.5 * 1000 / 3600 = 20.1389... ≈ 20.14 m/s (4 sig figs)",
            steps: ["Use factors 1 km = 1000 m and 1 h = 3600 s", "Maintain sig figs at end"]
          },
          {
            title: "Example — Significant figures",
            problem: "Multiply 2.50 (3 sf) by 3.42 (3 sf)",
            solution: "8.55 (3 sf)",
            steps: ["Result carries the least number of significant figures in inputs"]
          },
          {
            title: "Practice — Safety planning",
            problem: "You must heat concentrated acid. List safety steps.",
            solution: "Use fume hood, PPE, add acid to water slowly if dilution needed, have neutralizer/waste plan",
            steps: ["Always check protocol and SDS before starting an experiment"]
          }
        ],
        quiz: [
          { q: "How many meters in 1 km?", a: "1000 meters" },
          { q: "When adding 2.3 + 0.45, how many decimal places should result have?", a: "Two decimal places (2.75 -> 2.75)" }
        ]
      },

      // 2 Atomic Structure & Periodic Trends
      {
        explanation:
`Atomic structure describes protons, neutrons, and electrons. Electron configuration determines chemical reactivity: valence electrons participate in bonding. Periodic trends (atomic radius, ionization energy, electronegativity) arise from nuclear charge and electron shielding. When predicting reactivity, identify valence electrons and think about how atoms achieve noble gas configurations (octet rule).

Practice writing electron configurations and using periodic trends to infer ionic charges and reactivity.`,
        examples: [
          {
            title: "Example — Electron configuration",
            problem: "Write configuration for Sulfur (Z=16)",
            solution: "1s2 2s2 2p6 3s2 3p4",
            steps: ["Fill subshells in order of increasing energy; use aufbau principle"]
          },
          {
            title: "Example — Trend usage",
            problem: "Predict which atom has larger atomic radius: Na or K",
            solution: "K is larger (further down group, more shells)",
            steps: ["Compare principal quantum numbers; more shells -> larger radius"]
          },
          {
            title: "Practice — Ionization energy",
            problem: "Why does ionization energy increase across a period?",
            solution: "Increasing nuclear charge pulls electrons closer making them harder to remove",
            steps: ["Consider effective nuclear charge and shielding"]
          }
        ],
        quiz: [
          { q: "Which has higher electronegativity, F or I?", a: "Fluorine (F)" },
          { q: "What is atomic number?", a: "Number of protons in nucleus" }
        ]
      },

      // 3 Chemical Bonding & Geometry
      {
        explanation:
`Bonding models (ionic, covalent, polar covalent, metallic) explain compounds' properties. Use Lewis structures to determine bonding and lone pairs, then apply VSEPR (Valence Shell Electron Pair Repulsion) theory to predict geometry and approximate bond angles. Polarity depends on both bond polarity and molecular shape.

Practice drawing Lewis structures carefully, count electrons, and distribute them to satisfy octets where possible.`,
        examples: [
          {
            title: "Example — Lewis & shape",
            problem: "Draw Lewis structure and geometry for CO2",
            solution: "O=C=O (linear), nonpolar overall since bond dipoles cancel",
            steps: ["Count valence electrons, place double bonds for octet, determine linear geometry"]
          },
          {
            title: "Example — VSEPR",
            problem: "Predict shape of NH3",
            solution: "Trigonal pyramidal (3 bonds + 1 lone pair) ~107°",
            steps: ["Account for lone pair repulsion reducing bond angle from 109.5°"]
          },
          {
            title: "Practice — Polarity",
            problem: "Is CH3Cl polar?",
            solution: "Yes — bond dipoles don't cancel (C-Cl bond is polar and molecule is asymmetrical)",
            steps: ["Draw vector sum of bond dipoles"]
          }
        ],
        quiz: [
          { q: "Which type of bond involves electron transfer?", a: "Ionic bond" },
          { q: "VSEPR stands for?", a: "Valence Shell Electron Pair Repulsion" }
        ]
      },

      // 4 Stoichiometry
      {
        explanation:
`Stoichiometry converts between masses, moles and numbers of particles using balanced chemical equations as the roadmap. Always balance equation first, then convert given quantities to moles, use molar ratios from coefficients, and convert to desired unit (mass, molecules, volume of gas at STP).

Identifying limiting reagent is critical for real yield predictions: find how much product each reactant could form and the smaller value identifies the limiting reactant.`,
        examples: [
          {
            title: "Example — Mole conversion",
            problem: "How many moles in 18 g of water (H2O)?",
            solution: "Molar mass ≈ 18 g/mol -> 1 mol",
            steps: ["Compute molar mass then divide mass by molar mass"]
          },
          {
            title: "Example — Limiting reagent",
            problem: "2 H2 + O2 -> 2 H2O. If 3 mol H2 and 1 mol O2 available, limiting reagent?",
            solution: "H2 needed 2:1 mol ratio -> needs 1.5 mol H2 for 1 mol O2. We have 3 mol H2 so O2 is limiting? Wait carefully: with 1 mol O2, you need 2 mol H2 => produce 2 mol H2O. We have 3 mol H2 so O2 is limiting.",
            steps: ["Compare required ratios and available amounts to find limiting reactant"]
          },
          {
            title: "Practice — Yield calculation",
            problem: "Theoretical yield of water from 3 mol H2 and 1 mol O2?",
            solution: "2 mol H2O (based on limiting O2)",
            steps: ["Use balanced coefficients to find product moles"]
          }
        ],
        quiz: [
          { q: "How many particles in 1 mole?", a: "Avogadro's number ≈ 6.022 × 10^23" },
          { q: "What is molar mass of CO2?", a: "44.01 g/mol (approx)" }
        ]
      },

      // 5 States of Matter & IMFs
      {
        explanation:
`States of matter behavior is controlled by intermolecular forces (IMFs). Understand dispersion (London), dipole-dipole, and hydrogen bonding. Stronger IMFs increase boiling point and viscosity. Phase changes involve latent heat; closure of energy input doesn't change temperature until the phase transition completes.

When predicting properties, consider molecular mass, shape, and presence of polar bonds or hydrogen bond donors/acceptors.`,
        examples: [
          {
            title: "Example — Boiling point reasoning",
            problem: "Why does water boil at higher temp than methane despite similar molar masses?",
            solution: "Water forms hydrogen bonds (strong IMFs) while methane has only dispersion forces; hydrogen bonding raises boiling point.",
            steps: ["Compare IMFs and molecular polarity"]
          },
          {
            title: "Example — Phase change energy",
            problem: "Calculate q to melt 10 g ice (L_fusion = 334 J/g).",
            solution: "q = m L = 10 × 334 = 3340 J",
            steps: ["Multiply mass by latent heat"]
          },
          {
            title: "Practice — Viscosity influence",
            problem: "Which molecule will likely have higher viscosity: long-chain alkane or small alcohol?",
            solution: "Long-chain alkane (larger surface area increases dispersion, more viscous), but hydrogen bonding in alcohols can increase viscosity too — think case-by-case.",
            steps: ["Compare molecular size and type of IMF"]
          }
        ],
        quiz: [
          { q: "Which IMF is strongest commonly observed in small molecules?", a: "Hydrogen bonding (when present)" },
          { q: "What happens to temperature during a phase change?", a: "Temperature remains constant until phase change completes." }
        ]
      },

      // 6 Solutions & Colligative Properties
      {
        explanation:
`Concentration units (molarity, molality, mass percent) and solution behavior are foundational. Molarity (M = mol/L) depends on volume; molality (m = mol/kg) is mass-based and better for temperature-change problems. Colligative properties (boiling point elevation, freezing point depression) depend on solute particle number, not identity: ΔT = k * m * i (van't Hoff factor i counts particles per formula unit).`,
        examples: [
          {
            title: "Example — Dilution calculation",
            problem: "Dilute 1.0 L of 1.0 M stock to 0.1 M final. How much stock needed?",
            solution: "Use C1V1 = C2V2 => V1 = (C2V2)/C1 = 0.1 * 1 / 1 = 0.1 L = 100 mL",
            steps: ["Plug values into C1V1 = C2V2 and solve"]
          },
          {
            title: "Example — Freezing point depression",
            problem: "Calculate ΔTf for 0.5 m NaCl solution (i ≈ 2, k_f water = 1.86 °C·kg/mol)",
            solution: "ΔTf = i * k_f * m = 2 * 1.86 * 0.5 = 1.86 °C",
            steps: ["Multiply van't Hoff factor, cryoscopic constant, and molality"]
          },
          {
            title: "Practice — Molarity to moles",
            problem: "How many moles in 250 mL of 0.2 M solution?",
            solution: "n = M * V = 0.2 mol/L * 0.25 L = 0.05 mol",
            steps: ["Convert mL to L and multiply"]
          }
        ],
        quiz: [
          { q: "Molarity units?", a: "mol/L" },
          { q: "Which depends on number of particles, not identity?", a: "Colligative properties" }
        ]
      },

      // 7 Acids & Bases (Intro)
      {
        explanation:
`Acids donate protons (Bronsted-Lowry) while bases accept them. pH = −log[H+]; for weak acids use Ka expressions and approximations when Ka << initial concentration. Buffers maintain pH by using conjugate acid-base pairs; Henderson–Hasselbalch equation gives pH = pKa + log([A−]/[HA]). Learn to set up ICE tables for weak acid/base equilibrium calculations.`,
        examples: [
          {
            title: "Example — pH calculation",
            problem: "Calculate pH of 0.01 M HCl (strong acid).",
            solution: "HCl fully dissociates: [H+] = 0.01 M => pH = 2",
            steps: ["Assume complete dissociation for strong acids and take −log10"]
          },
          {
            title: "Example — Weak acid ICE",
            problem: "0.1 M acetic acid, Ka = 1.8e−5. Estimate [H+].",
            solution: "x^2/(0.1−x) ≈ 1.8e−5 => x ≈ sqrt(1.8e−6) ≈ 1.34e−3 => pH ≈ 2.87",
            steps: ["Set up ICE table, apply small x approximation, solve quadratic if necessary"]
          },
          {
            title: "Practice — Buffer pH",
            problem: "Calculate pH of a buffer with [HA]=0.1 and [A−]=0.1 with pKa=4.76",
            solution: "pH = pKa + log(1) = 4.76",
            steps: ["Use Henderson–Hasselbalch directly"]
          }
        ],
        quiz: [
          { q: "What is pH of pure water at 25°C?", a: "7 (neutral)" },
          { q: "Strong vs weak acid: which dissociates completely?", a: "Strong acid" }
        ]
      },

      // 8 Intro Organic Functional Groups
      {
        explanation:
`Organic functional groups (alcohols, alkenes, carbonyls, amines) define reactivity. Learn naming basics and typical reactions: alkenes undergo addition, alcohols undergo substitution/oxidation, carbonyls participate in nucleophilic addition. Functional groups also influence physical properties (polarity, solubility).

When approaching organic problems, draw structures, identify functional groups and possible reaction sites, then think mechanistically (which bonds break/form?).`,
        examples: [
          {
            title: "Example — Identify functional group",
            problem: "CH3CH2OH -> which group?",
            solution: "Alcohol (–OH)",
            steps: ["Spot the –OH attached to carbon chain"]
          },
          {
            title: "Example — Addition to alkene",
            problem: "What product forms when HBr adds to CH2=CH2?",
            solution: "CH3CH2Br (bromoethane) via Markovnikov addition if unsymmetrical substituents exist",
            steps: ["Add H to one carbon and Br to the other across the double bond"]
          },
          {
            title: "Practice — Nomenclature",
            problem: "Name CH3CH2COOH",
            solution: "Propanoic acid",
            steps: ["Identify functional group (carboxylic acid) and longest chain"]
          }
        ],
        quiz: [
          { q: "Functional group with C=O and –OH attached?", a: "Carboxylic acid" },
          { q: "What type of reaction does an alkene typically undergo?", a: "Addition reaction" }
        ]
      }
    ]
  },

  // Second Semester
  {
    Session: "Second Semester",
    Topics: [
      "Gases & Kinetic Molecular Theory",
      "Thermochemistry & Enthalpy Calculations",
      "Chemical Kinetics & Rate Laws",
      "Chemical Equilibrium & Le Chatelier's Principle",
      "Electrochemistry & Redox Reactions",
      "Advanced Organic Reactions: substitution, elimination & addition",
      "Analytical Techniques: titration & spectroscopy basics",
      "Industrial & Environmental Chemistry"
    ],
    Content: [
      // 1 Gases
      {
        explanation:
`Gases are modeled by ideal gas law PV = nRT under many conditions. Kinetic molecular theory links macroscopic properties to microscopic particle motion: pressure due to collisions, temperature proportional to average kinetic energy. Real gases deviate due to volume and intermolecular forces (van der Waals equation accounts for these).

Practice converting conditions and using partial pressures for gas mixtures (Dalton's law) and gas stoichiometry.`,
        examples: [
          {
            title: "Example — Ideal gas calc",
            problem: "How many moles in 11.2 L of gas at STP (22.4 L per mole)?",
            solution: "0.5 mol",
            steps: ["N = V / 22.4 L/mol"]
          },
          {
            title: "Example — Dalton's law",
            problem: "Total pressure 1 atm, mole fraction of A is 0.2. What is partial pressure of A?",
            solution: "P_A = x_A * P_total = 0.2 atm",
            steps: ["Multiply mole fraction by total pressure"]
          },
          {
            title: "Practice — Real gas",
            problem: "At high pressure, would ideal gas law overestimate or underestimate pressure?",
            solution: "It can underestimate pressure because it ignores particle volume that becomes significant at high pressures, and attractive forces can reduce pressure below ideal prediction — direction depends on conditions; van der Waals corrects for both."
          }
        ],
        quiz: [
          { q: "Ideal gas constant R in L·atm/mol·K?", a: "0.08206 L·atm·mol^{-1}·K^{-1}" },
          { q: "PV = nRT rearrange for density ρ = mass/volume?", a: "ρ = PM/(RT)" }
        ]
      },

      // 2 Thermochemistry
      {
        explanation:
`Thermochemistry studies heat flows in chemical processes. Enthalpy ΔH indicates heat at constant pressure; Hess's law allows combining reactions to find unknown ΔH. Calorimetry measures heat changes. Always track sign conventions (exothermic negative ΔH).

Understand bond enthalpies qualitatively: breaking bonds consumes energy, forming bonds releases energy.`,
        examples: [
          {
            title: "Example — Heat calculation",
            problem: "Heat required to raise 100 g of water by 25°C (c = 4.18 J/g°C)",
            solution: "q = m*c*ΔT = 100*4.18*25 = 10450 J",
            steps: ["Multiply mass by specific heat and temperature change"]
          },
          {
            title: "Example — Hess's law",
            problem: "Given A->B ΔH1 and B->C ΔH2, find A->C ΔH",
            solution: "ΔH = ΔH1 + ΔH2",
            steps: ["Add enthalpies for sequential steps"]
          },
          {
            title: "Practice — Bond enthalpy",
            problem: "Estimate ΔH for a simple reaction using bond enthalpy tables",
            solution: "Sum of bonds broken − sum of bonds formed (approximation)",
            steps: ["List bonds broken and formed, use table values"]
          }
        ],
        quiz: [{ q: "Exothermic reaction sign for ΔH?", a: "Negative" }]
      },

      // 3 Kinetics
      {
        explanation:
`Kinetics examines rates of reactions and factors controlling them (concentration, temperature, catalyst). Rate laws (rate = k [A]^m [B]^n) must be determined experimentally; orders m and n are not necessarily stoichiometric coefficients. Activation energy and the Arrhenius equation explain temperature sensitivity of rates.

Understand how to design experiments to infer rate laws (initial rates method) and how catalysts lower activation energy without being consumed.`,
        examples: [
          {
            title: "Example — Rate law determination",
            problem: "If doubling [A] doubles rate and doubling [B] quadruples rate, what is rate law?",
            solution: "Rate ∝ [A]^1 [B]^2",
            steps: ["Use proportional changes to deduce reaction orders for each reactant"]
          },
          {
            title: "Example — Arrhenius",
            problem: "How does temperature affect rate constant k?",
            solution: "k = A e^{−Ea/(RT)}; increasing T increases k exponentially",
            steps: ["Understand role of activation energy and temperature in exponent"]
          },
          {
            title: "Practice — Catalyst effect",
            problem: "Explain why an enzyme speeds a biochemical reaction",
            solution: "Lowers activation energy by stabilizing transition state and providing alternative pathway",
            steps: ["Describe how binding reduces energetic barrier"]
          }
        ],
        quiz: [{ q: "What method finds reaction order experimentally?", a: "Initial rates method" }]
      },

      // 4 Equilibrium
      {
        explanation:
`Chemical equilibrium is dynamic: forward and reverse rates equal. Equilibrium constant K (K_c, K_p) quantifies ratio of products to reactants at equilibrium. Reaction quotient Q tells instantaneous ratio — compare Q with K to predict direction of net reaction. Le Chatelier's principle qualitatively predicts response to stress (concentration, pressure, temperature changes). Temperature changes can change K because ΔG = −RT ln K depends on T.`,
        examples: [
          {
            title: "Example — ICE table",
            problem: "For A ⇌ B with K = 4, initial [A] = 1, [B] = 0, find equilibrium",
            solution: "Let x = [B] at eq: K = x/(1 − x) = 4 -> x = 4 − 4x -> 5x = 4 -> x = 0.8, [A]=0.2",
            steps: ["Set up ICE table and solve algebraically"]
          },
          {
            title: "Example — Le Chatelier",
            problem: "What happens if you add more product?",
            solution: "Equilibrium shifts left to consume product (favor reactants).",
            steps: ["Apply Le Chatelier qualitatively"]
          },
          {
            title: "Practice — K vs Q",
            problem: "If Q < K which way reaction proceeds?",
            solution: "Forward to make more products",
            steps: ["Compare Q with K"]
          }
        ],
        quiz: [{ q: "If Q > K, does reaction proceed forward or backward?", a: "Backward (toward reactants)" }]
      },

      // 5 Electrochemistry
      {
        explanation:
`Electrochemistry deals with redox reactions, galvanic cells and electrolysis. Standard reduction potentials (E°) indicate tendency to gain electrons. Cell potential E_cell = E°_cathode − E°_anode; positive E_cell indicates spontaneity. Balancing redox reactions often uses half-reaction method accounting for mass and charge (add H+, H2O, e− accordingly).`,
        examples: [
          {
            title: "Example — Cell potential",
            problem: "Compute E_cell with E° (cathode) = 0.80 V and E° (anode) = −0.44 V",
            solution: "E_cell = 0.80 − (−0.44) = 1.24 V",
            steps: ["Subtract anode potential from cathode potential"]
          },
          {
            title: "Example — Balancing redox (acidic)",
            problem: "Balance MnO4− -> Mn^{2+}",
            solution: "Use half-reaction method: balance atoms (O with H2O), H with H+, add electrons to balance charge etc.",
            steps: ["Write reduction and oxidation half-reactions, balance O by H2O, H by H+, add electrons, combine"]
          },
          {
            title: "Practice — Faraday's law",
            problem: "How much charge required to deposit 1 mole of monovalent ion?",
            solution: "One mole electrons: F ≈ 96485 C",
            steps: ["Use Faraday constant and stoichiometry"]
          }
        ],
        quiz: [{ q: "E_cell > 0 indicates what about reaction?", a: "Spontaneous (thermodynamically favorable) under standard conditions" }]
      },

      // 6 Advanced Organic Reactions
      {
        explanation:
`Substitution (SN1, SN2), elimination (E1, E2), and addition reactions are the core classes. Mechanism matters: SN2 is concerted backside attack (inversion) favored by strong nucleophiles and less hindered substrates; SN1 proceeds via carbocation intermediate favored by tertiary carbons. In elimination, identify β-hydrogen and leaving group, and note base strength and sterics affect outcome.

Practice by thinking mechanistically: which bonds break first, where positive/negative charges localize, and what the rate-limiting step is.`,
        examples: [
          {
            title: "Example — SN2",
            problem: "CH3Br + OH− → ?",
            solution: "CH3OH (methyl halide undergoes SN2 substitution, inversion irrelevant for methyl), mechanism concerted",
            steps: ["Nucleophile attacks backside, leaving group departs simultaneously"]
          },
          {
            title: "Example — E2 vs E1",
            problem: "Explain when E2 is favored over E1",
            solution: "Strong base and high substrate β-hydrogen availability favor E2; tertiary substrates with weak base may go E1",
            steps: ["Consider substrate, base, leaving group, solvent"]
          },
          {
            title: "Practice — Stereochemistry",
            problem: "Predict stereochemical outcome of SN2 on chiral center",
            solution: "Inversion of configuration (R→S or S→R)",
            steps: ["Determine stereocenter configuration before and after backside attack"]
          }
        ],
        quiz: [{ q: "SN1 vs SN2: which shows racemization on chiral centers?", a: "SN1 (carbocation intermediate can be attacked from either face)" }]
      },

      // 7 Analytical Techniques
      {
        explanation:
`Titration determines concentration by reacting analyte with titrant of known concentration: pH indicators or pH meters signal end point. Spectroscopy (UV-Vis, IR) identifies functional groups or quantifies concentration (Beer-Lambert law A = ε c l).

Good lab practice requires calibration curves, blanks, and controls to ensure accurate quantitative results.`,
        examples: [
          {
            title: "Example — Titration calculation",
            problem: "0.025 L of 0.1 M NaOH neutralizes 0.050 L of HCl. What is [HCl]?",
            solution: "Moles NaOH = 0.0025 mol -> moles HCl = 0.0025 -> [HCl] = 0.0025 / 0.05 = 0.05 M",
            steps: ["Use n = M V and stoichiometry 1:1 for NaOH & HCl"]
          },
          {
            title: "Example — Beer-Lambert",
            problem: "If A=0.5, ε=100 L·mol^{-1}·cm^{-1}, l=1 cm, find c",
            solution: "c = A/(ε l) = 0.005 mol/L",
            steps: ["Rearrange A = ε c l"]
          },
          {
            title: "Practice — Calibration",
            problem: "Why run a blank in spectroscopy?",
            solution: "To correct for instrument and solvent baseline absorbance",
            steps: ["Subtract blank from sample measurements"]
          }
        ],
        quiz: [{ q: "What does a titration endpoint indicate?", a: "The point at which stoichiometric amount of titrant has been added (approx equivalence point)" }]
      },

      // 8 Industrial & Environmental Chemistry
      {
        explanation:
`Chemistry underpins many industrial processes (Haber-Bosch for ammonia, catalytic cracking in petroleum). Consider energy, catalysts, selectivity and environmental impact. Environmental chemistry studies pollutants, fate and remediation methods (adsorption, biodegradation). Sustainable practices aim to reduce waste, energy use and toxic by-products.

Study using case studies to connect chemistry to policy and real-world impacts.`,
        examples: [
          {
            title: "Example — Haber process summary",
            problem: "Why is catalyst and pressure used in Haber process?",
            solution: "High pressure shifts equilibrium toward ammonia (fewer gas molecules), catalysts increase rate while allowing lower temperatures to moderate equilibrium constraints.",
            steps: ["Apply Le Chatelier and rate considerations in process design"]
          },
          {
            title: "Example — Pollution chemistry",
            problem: "How are NOx gases formed and controlled in combustion?",
            solution: "High temperatures cause N2 + O2 to react producing NO/NO2; control via catalytic converters and lower combustion temps or staged combustion",
            steps: ["Identify formation mechanism and engineering solutions"]
          },
          {
            title: "Practice — Green chemistry principle",
            problem: "Suggest greener alternative for a solvent-heavy process",
            solution: "Use water or ionic liquids if compatible, or switch to solvent-free synthesis where possible",
            steps: ["Propose alternatives and rationale"]
          }
        ],
        quiz: [
          { q: "Haber process produces what important compound?", a: "Ammonia (NH3)" },
          { q: "Name one method for remediating contaminated water", a: "Adsorption, activated carbon, membrane filtration, biodegradation" }
        ]
      }
    ]
  }
];

export default function Chemistry({ semester }) {
  return <LessonPlayer courseLabel="Chemistry 101" courseContent={ChemistryContent} semester={semester} />;
}
