import React from "react";
import LessonPlayer from "../shared/LessonPlayer";

const BiologyContent = [
  {
    Session: "First Semester",
    Topics: [
      "Cell Structure & Function",
      "Biomolecules: Carbohydrates, Proteins & Lipids",
      "Nucleic Acids: DNA & RNA (structure & replication)",
      "Enzymes & Metabolism (kinetics and regulation)",
      "Cellular Respiration: glycolysis to oxidative phosphorylation",
      "Photosynthesis: light reactions & Calvin cycle",
      "Genetics & Mendelian Inheritance (Punnett squares)",
      "Cell Division: Mitosis & Meiosis (detailed stages and significance)"
    ],
    Content: [
      // 1. Cell Structure & Function
      {
        explanation:
`Cells are the basic structural and functional units of life. To learn cells effectively, imagine a factory: each organelle is a department with a role. The nucleus stores the genetic blueprint (DNA) and controls production by sending instructions (mRNA) to ribosomes. Ribosomes are the assembly lines that synthesize proteins using mRNA templates. The endoplasmic reticulum (rough ER with ribosomes) folds and modifies proteins; the smooth ER synthesizes lipids and detoxifies chemicals. The Golgi apparatus packages, modifies and ships proteins to their destinations.

Mitochondria are the power plants: they convert stored chemical energy into ATP via oxidative phosphorylation — note they have their own DNA and double membrane which reflects evolutionary origin. Chloroplasts (in plants) house the light-harvesting systems and carbon-fixation machinery. The plasma membrane is a selectively permeable barrier — its phospholipid bilayer with embedded proteins controls exchange. When studying, always ask: What is synthesized here? What is transported? How does this organelle contribute to the cell's energy or information flow?`,
        examples: [
          {
            title: "Example — Nucleus role",
            problem: "How does the nucleus control protein production?",
            solution: "By storing DNA and producing mRNA transcripts that are translated by ribosomes.",
            steps: [
              "DNA is transcribed into pre-mRNA in the nucleus.",
              "Pre-mRNA is processed (splicing, 5' cap, poly-A tail) to become mRNA.",
              "mRNA exits the nucleus through nuclear pores to the cytoplasm where ribosomes translate it to protein."
            ],
            hint: "Follow the information flow: DNA → RNA → Protein."
          },
          {
            title: "Example — Membrane transport",
            problem: "Distinguish diffusion, facilitated diffusion, and active transport.",
            solution: "Diffusion is passive movement down a gradient; facilitated uses channels/carriers but still down gradient; active transport uses ATP to move substances against their gradient.",
            steps: [
              "Diffusion: small nonpolar molecules (O2) pass directly.",
              "Facilitated: glucose uses GLUT transporters (no ATP).",
              "Active: Na+/K+ ATPase pumps Na+ out and K+ in using ATP."
            ]
          },
          {
            title: "Practice — Organelle identification",
            problem: "Which organelle is most abundant in a cell that synthesizes steroid hormones?",
            solution: "Smooth endoplasmic reticulum (SER) — site of lipid and steroid synthesis.",
            steps: ["Link biochemical function (lipid/steroid synthesis) to organelle specialty (SER)."]
          }
        ],
        quiz: [
          { q: "Which organelle contains its own DNA and is involved in ATP production?", a: "Mitochondria" },
          { q: "Where are proteins packaged for secretion?", a: "Golgi apparatus" }
        ]
      },

      // 2. Biomolecules
      {
        explanation:
`Biomolecules are the chemical building blocks of life. Carbohydrates primarily provide short-term energy and structural support (cellulose in plants), proteins perform almost every job — enzymes, structure, transport — and lipids form membranes and store long-term energy. Understand them by moving from monomer → polymer: glucose monomers link to form starch (energy) or cellulose (structure); amino acids link via peptide bonds to form polypeptides that fold into functional proteins.

Focus on how structure determines function: the polarity of a carbohydrate, the side chain properties (hydrophobic, polar, charged) of amino acids, and the amphipathic nature of phospholipids which drives membrane formation. When faced with a question, ask: what monomers compose this molecule, and what functional groups determine its chemistry?`,
        examples: [
          {
            title: "Example — Carbohydrate roles",
            problem: "Why can humans digest starch but not cellulose?",
            solution: "Starch has α(1→4) linkages digestible by human amylase; cellulose has β(1→4) linkages and requires cellulase (not produced by humans).",
            steps: [
              "Compare bond type: α vs β glycosidic bonds.",
              "Recognize enzymes specificity (amylase vs cellulase).",
              "Link structure to digestibility."
            ]
          },
          {
            title: "Example — Protein folding",
            problem: "Explain why cysteine residues can stabilize tertiary structure.",
            solution: "Cysteine side chains form disulfide bridges (–S–S–) which covalently link distant parts of the polypeptide, stabilizing the 3D shape.",
            steps: ["Identify cysteines in sequence", "Oxidation forms disulfide link", "Bridge reduces conformational flexibility"]
          },
          {
            title: "Practice — Lipid bilayer",
            problem: "Explain why cell membranes self-assemble into bilayers in water.",
            solution: "Phospholipids are amphipathic; hydrophobic tails avoid water and pack inward, hydrophilic heads face water — this minimizes free energy and forms a stable bilayer.",
            steps: ["Identify amphipathic structure", "Consider hydrophobic effect", "Predict membrane formation"]
          }
        ],
        quiz: [
          { q: "Name the bond that links amino acids.", a: "Peptide bond (amide linkage)" },
          { q: "Are lipids soluble in water?", a: "No — generally hydrophobic (insoluble) unless modified" }
        ]
      },

      // 3. Nucleic Acids
      {
        explanation:
`DNA and RNA store and transmit genetic information. DNA is a double helix with complementary base-pairing (A–T, G–C) held by hydrogen bonds. RNA (mRNA, tRNA, rRNA) is typically single-stranded and acts as the messenger and functional component in translation. Replication is semi-conservative: each daughter DNA receives one parental strand and one newly-synthesized strand.

Learn replication by steps: origin recognition, unwinding by helicase, primer synthesis by primase, extension by DNA polymerase (5'→3'), and ligation of Okazaki fragments on the lagging strand. For replication mistakes, cells use proofreading and repair systems; these are essential for genomic stability.`,
        examples: [
          {
            title: "Example — Base pairing & transcription",
            problem: "Given the DNA coding strand 5'–ATG CCT GAA–3', what is the mRNA sequence?",
            solution: "5'–AUG CCU GAA–3' (replacing T with U and taking coding strand except when transcribed from template — this example assumes coding strand given).",
            steps: [
              "If coding strand is given, replace T with U to get mRNA.",
              "If template strand is given, transcribe complementary bases (A↔U, C↔G)."
            ]
          },
          {
            title: "Example — Replication forks",
            problem: "Explain leading vs lagging strand synthesis.",
            solution: "Leading strand synthesized continuously toward replication fork; lagging synthesized as Okazaki fragments away from fork, later joined by DNA ligase.",
            steps: ["Identify directionality of DNA polymerase (5'→3')", "Understand fork movement and why discontinuous synthesis is needed"]
          },
          {
            title: "Practice — Mutation consequence",
            problem: "What is a frameshift mutation and why is it severe?",
            solution: "Insertion/deletion not multiple of three shifts reading frame altering every downstream codon, producing incorrect protein sequence and likely premature stop codons.",
            steps: ["Compare normal codon grouping vs shifted grouping", "Predict new amino acid sequence and potential stop codons"]
          }
        ],
        quiz: [
          { q: "Which base pairs with adenine in DNA?", a: "Thymine (T)" },
          { q: "Replication is semi-conservative — what does that mean?", a: "Each daughter DNA contains one original and one new strand" }
        ]
      },

      // 4. Enzymes & Metabolism
      {
        explanation:
`Enzymes are biological catalysts that increase reaction rates by providing alternate reaction pathways with lower activation energies. They bind substrates at an active site forming an enzyme–substrate complex; via induced fit they optimize catalysis. Consider factors: temperature increases rate up to an optimum, then denatures enzymes; pH affects ionization of residues; inhibitors either compete with substrate (competitive) or alter enzyme function at other sites (noncompetitive).

Kinetics: the Michaelis–Menten model describes how reaction velocity depends on substrate concentration with parameters Vmax and Km. Low [S] gives rate ~ linear with [S]; high [S] approaches Vmax where enzyme is saturated. Regulatory mechanisms include allosteric control, covalent modification (phosphorylation), and feedback inhibition.`,
        examples: [
          {
            title: "Example — Michaelis–Menten concept",
            problem: "If an enzyme has Km = 2 mM and Vmax = 100 μmol/min, what happens to rate when [S] = Km?",
            solution: "Rate = Vmax/2 = 50 μmol/min (by definition at [S] = Km)",
            steps: ["Recall that Km is substrate conc at half Vmax", "Plug into expression to confirm"]
          },
          {
            title: "Example — Inhibition types",
            problem: "How does a competitive inhibitor affect Km and Vmax?",
            solution: "Km increases (lower apparent affinity), Vmax unchanged (can be overcome by high [S]).",
            steps: ["Reason that inhibitor competes for active site so more substrate needed to reach half Vmax"]
          },
          {
            title: "Practice — Temperature effect",
            problem: "Why does enzyme activity fall at high temperature despite faster molecular motion?",
            solution: "Proteins denature (lose tertiary structure and active site shape), decreasing catalytic activity.",
            steps: ["Explain folding stability and irreversible changes at high heat"]
          }
        ],
        quiz: [
          { q: "What does a low Km indicate?", a: "High affinity between enzyme and substrate" },
          { q: "Name an example of covalent enzyme regulation.", a: "Phosphorylation" }
        ]
      },

      // 5. Cellular Respiration
      {
        explanation:
`Cellular respiration is a multi-stage process converting biochemical energy in nutrients into ATP. Start with glycolysis (cytoplasm): glucose (6C) is split into two pyruvate molecules (3C), generating a small amount of ATP and NADH. Pyruvate enters mitochondria and is converted to acetyl-CoA which enters the Krebs (TCA) cycle producing NADH and FADH2. These electron carriers donate electrons to the electron transport chain (ETC) in the inner mitochondrial membrane; the ETC creates a proton gradient that drives ATP synthesis via ATP synthase (oxidative phosphorylation).

Key ideas: substrate-level phosphorylation (direct ATP formation) vs oxidative phosphorylation (ETC-driven). Aerobic respiration yields far more ATP per glucose than anaerobic pathways (fermentation). Understand each stage's inputs and outputs and how regulation (e.g., feedback inhibition by ATP) tunes flux.`,
        examples: [
          {
            title: "Example — Glycolysis yield",
            problem: "What is the net ATP yield from glycolysis per glucose under aerobic conditions (before Krebs/ETC)?",
            solution: "Net 2 ATP and 2 NADH per glucose (4 produced but 2 used in early steps).",
            steps: ["Count ATP consumed (investment) and ATP produced (payoff)", "Note NADH is produced as reducing equivalents."]
          },
          {
            title: "Example — TCA role",
            problem: "What are the main products of one acetyl-CoA in Krebs cycle?",
            solution: "3 NADH, 1 FADH2, 1 GTP (or ATP), and 2 CO2 per acetyl-CoA (approx).",
            steps: ["Trace carbon atoms entering as acetyl group and leaving as CO2", "Count reduced cofactors"]
          },
          {
            title: "Practice — Oxidative phosphorylation",
            problem: "Why does inhibition of the ETC (e.g., cyanide) halt respiration?",
            solution: "ETC inhibition prevents electron transfer to oxygen, collapsing the proton gradient and stopping ATP synthase; without ATP production cells cannot maintain vital processes.",
            steps: ["Link electron flow to proton gradient to ATP production"]
          }
        ],
        quiz: [
          { q: "Which stage produces the most ATP?", a: "Oxidative phosphorylation (ETC + ATP synthase)" },
          { q: "What is the final electron acceptor in aerobic respiration?", a: "Oxygen (O2)" }
        ]
      },

      // 6. Photosynthesis
      {
        explanation:
`Photosynthesis in plants and some microbes converts light energy into chemical energy. Separate light-dependent reactions and the Calvin cycle (light-independent). In thylakoid membranes, photosystems absorb photons, exciting electrons that travel through an electron transport chain, produce ATP and reduce NADP+ to NADPH. The Calvin cycle (in stroma) uses ATP and NADPH to fix CO2 into 3-carbon sugars (G3P), which can be converted to glucose or stored as starch.

Focus on energy currency: ATP & NADPH produced by light reactions power the carbon-fixation steps. Understand the role of RuBisCO (the CO2-fixing enzyme) and limitations like photorespiration. Practice by tracing carbon atoms from CO2 to sugar to observe how many turns of the cycle are needed per glucose.`,
        examples: [
          {
            title: "Example — Light reactions",
            problem: "What do photosystems II and I produce respectively?",
            solution: "PSII initiates water splitting producing O2 and protons; PSI contributes electrons to reduce NADP+ to NADPH. ATP is produced via chemiosmosis.",
            steps: ["PSII oxidizes water; electrons flow PSII → ETC → PSI → NADP+.", "Proton gradient created powers ATP synthase."]
          },
          {
            title: "Example — Calvin cycle stoichiometry",
            problem: "How many CO2 molecules are required to make one glucose (C6H12O6)?",
            solution: "Six CO2 molecules are fixed to build one glucose (but it requires multiple turns and energy: 18 ATP and 12 NADPH approximately).",
            steps: ["Each turn fixes one CO2 producing one 3-carbon product; combine to six carbons for glucose."]
          },
          {
            title: "Practice — Photorespiration",
            problem: "Why is RuBisCO's oxygenase activity wasteful?",
            solution: "When it binds O2 instead of CO2 it leads to photorespiration, consuming ATP and releasing CO2 — reducing photosynthetic efficiency.",
            steps: ["Recognize competition between O2 and CO2 for RuBisCO's active site", "Link to environmental conditions (high O2/low CO2)"]
          }
        ],
        quiz: [
          { q: "Where do the light and Calvin cycle reactions occur?", a: "Light reactions in thylakoid membranes; Calvin cycle in stroma of chloroplasts." },
          { q: "What gas is released by splitting water?", a: "Oxygen (O2)" }
        ]
      },

      // 7. Genetics & Mendelian Inheritance
      {
        explanation:
`Mendelian genetics explains inheritance using discrete units (genes) with alleles that can be dominant or recessive. Start with single-gene crosses (monohybrid): set up parent genotypes, predict gametes, then combine in Punnett squares to obtain offspring genotype/phenotype ratios. Extend to dihybrid crosses for two genes and analyze independent assortment probabilities.

Also consider real-world complications: incomplete dominance (blend), codominance (both alleles expressed), linked genes (do not assort independently), and sex-linked inheritance (traits carried on sex chromosomes). Always annotate parental genotype and work through gamete formation explicitly.`,
        examples: [
          {
            title: "Example — Monohybrid cross",
            problem: "Cross Aa × Aa (A dominant). What are genotype and phenotype ratios?",
            solution: "Genotypes: 1 AA : 2 Aa : 1 aa. Phenotypes: 3 dominant : 1 recessive (assuming A fully dominant).",
            steps: ["List parental gametes (A and a each)", "Fill 2×2 Punnett square and count results"]
          },
          {
            title: "Example — Dihybrid 9:3:3:1",
            problem: "Cross AaBb × AaBb with independent assortment. What is phenotypic ratio?",
            solution: "9:3:3:1 for the four phenotype classes (both dominant : first dom/second rec : first rec/second dom : both recessive).",
            steps: ["Separate as product of two independent monohybrid probabilities (3:1 × 3:1)"]
          },
          {
            title: "Practice — Sex-linked traits",
            problem: "If a recessive X-linked trait is present in a male, what does that imply about the allele?",
            solution: "Males are hemizygous for X, so a single recessive allele on X shows the trait; female would require both alleles recessive.",
            steps: ["Consider chromosome complement: male XY vs female XX", "Map allele presence to phenotype"]
          }
        ],
        quiz: [
          { q: "What does 'homozygous' mean?", a: "Both alleles are the same (AA or aa)" },
          { q: "What is a Punnett square used for?", a: "Predicting offspring genotype and phenotype probabilities" }
        ]
      },

      // 8. Cell Division: Mitosis & Meiosis
      {
        explanation:
`Cell division ensures growth, repair, and sexual reproduction. Mitosis produces two genetically identical daughter cells (same chromosome number), vital for growth and tissue repair. Meiosis reduces chromosome number by half producing gametes and increases genetic diversity via crossing over (prophase I) and independent assortment.

Learn the stages by focusing on key events at each step: Prophase (chromosomes condense), Metaphase (alignment on metaphase plate), Anaphase (sister chromatids separate in mitosis; homologs separate in meiosis I), Telophase & Cytokinesis (nuclear envelope reforms and cytoplasm divides). For meiosis, emphasize two sequential divisions (meiosis I and II) and the production of four genetically distinct haploid cells.`,
        examples: [
          {
            title: "Example — Mitosis quick check",
            problem: "What distinguishes anaphase in mitosis from anaphase I in meiosis?",
            solution: "In mitosis, sister chromatids separate; in meiosis I, homologous chromosomes separate while sister chromatids remain together.",
            steps: ["Identify whether chromatids or homologs are being separated", "Relate to genetic consequence: ploidy change occurs in meiosis I"]
          },
          {
            title: "Example — Crossing over",
            problem: "Why is crossing over important?",
            solution: "It exchanges genetic material between homologous chromosomes creating new combinations of alleles that enhance variation in offspring.",
            steps: ["Visualize homologous chromosomes pairing and swapping segments", "Understand recombination frequency as mapping tool"]
          },
          {
            title: "Practice — Ploidy",
            problem: "If a diploid organism has 8 chromosomes (2n = 8), what is the chromosome number after meiosis II?",
            solution: "Haploid gametes have n = 4 chromosomes.",
            steps: ["Meiosis reduces 2n → n across meiosis I, meiosis II separates sister chromatids without further halving chromosome count"]
          }
        ],
        quiz: [
          { q: "Which process halves the chromosome number?", a: "Meiosis (meiosis I reduces diploid to haploid)" },
          { q: "Name the stage when homologous chromosomes pair.", a: "Prophase I of meiosis" }
        ]
      }
    ]
  },

  // Second Semester - expanded
  {
    Session: "Second Semester",
    Topics: [
      "Plant Biology: structure, transport & reproduction",
      "Animal Physiology: circulatory & respiratory systems",
      "Cell Signalling & Immune System Basics",
      "Microbiology: bacteria, viruses & basic lab methods",
      "Molecular Techniques: PCR, gel electrophoresis, DNA cloning basics",
      "Population Genetics & Hardy-Weinberg",
      "Biotechnology Applications & CRISPR overview",
      "Conservation Biology & Ecosystem Management"
    ],
    Content: [
      // 1. Plant Biology
      {
        explanation:
`Plants have specialized structures for survival: roots (absorb water/minerals), stems (transport and support), leaves (photosynthesis). Xylem conducts water and dissolved minerals upward using transpiration pull and cohesive forces; phloem transports sugars from sources (leaves) to sinks (roots, fruits) via pressure-flow. Reproduction can be sexual (flowers producing seeds after pollination and fertilization) or asexual (vegetative propagation).

When studying plant transport, visualize the pathway water takes: soil → root hairs → xylem vessels → leaves → atmosphere. For reproduction, learn flower parts (stamen, pistil) and pollination mechanisms (wind, insects) and how they affect genetic exchange.`,
        examples: [
          {
            title: "Example — Xylem transport",
            problem: "How does water move against gravity from roots to leaves?",
            solution: "Transpiration creates negative pressure at leaf surfaces; cohesion between water molecules and adhesion to xylem walls transmits this pull down to the roots.",
            steps: ["Evaporation at stomata reduces water potential", "Tension is transmitted through continuous water column", "Root uptake replenishes lost water"]
          },
          {
            title: "Example — Phloem source-sink",
            problem: "Where does sucrose travel after being made in leaves?",
            solution: "From source leaves to sinks like growing roots, developing fruit or storage organs via phloem mass flow.",
            steps: ["Active loading at source increases osmotic pressure", "Water influx generates pressure to drive flow to sink where sugars are unloaded"]
          },
          {
            title: "Practice — Flower structure",
            problem: "Identify the male and female parts of the flower.",
            solution: "Stamen (anther + filament) male; pistil/carpel (stigma, style, ovary) female.",
            steps: ["Relate parts to function: pollen produced in anther; ovules in ovary become seeds"]
          }
        ],
        quiz: [
          { q: "What tissue transports water in plants?", a: "Xylem" },
          { q: "What is transpiration?", a: "Evaporation of water from plant aerial surfaces (mainly leaves)" }
        ]
      },

      // 2. Animal Physiology
      {
        explanation:
`Animal physiology examines organ systems that maintain homeostasis. The circulatory system (heart, blood vessels) delivers oxygen and nutrients and removes waste. The respiratory system (lungs, airways) exchanges gases — oxygen in, carbon dioxide out — across alveolar membranes. Understand how ventilation, perfusion, and diffusion interplay to maintain blood gas levels.

When learning, map the path of a red blood cell: from heart to lungs (pulmonary circulation), picks up O2, returns to heart, then systemic circulation to tissues. Connect structure to function: alveoli provide large surface area, thin epithelium for diffusion, and surfactant reduces surface tension preventing collapse.`,
        examples: [
          {
            title: "Example — Oxygen transport",
            problem: "How is oxygen predominantly carried in blood?",
            solution: "Bound to hemoglobin inside red blood cells; a small fraction is dissolved in plasma.",
            steps: ["Hemoglobin binds O2 cooperatively (sigmoidal curve)", "Affinity influenced by pH, CO2, temperature (Bohr effect)"]
          },
          {
            title: "Example — Cardiac output",
            problem: "If stroke volume is 70 mL and heart rate is 70 bpm, what is cardiac output?",
            solution: "CO = SV × HR = 70 mL × 70 bpm = 4900 mL/min ≈ 4.9 L/min.",
            steps: ["Multiply stroke volume by heart rate", "Convert units appropriately"]
          },
          {
            title: "Practice — Gas exchange",
            problem: "Why does emphysema impair oxygen uptake?",
            solution: "Loss of alveolar surface area reduces diffusion capacity, lowering blood oxygenation.",
            steps: ["Relate structural loss to functional outcome (reduced area → less diffusion)"]
          }
        ],
        quiz: [
          { q: "What molecule carries O2 in blood?", a: "Hemoglobin" },
          { q: "What drives gas exchange in alveoli?", a: "Partial pressure gradients (diffusion)" }
        ]
      },

      // 3. Cell Signalling & Immune Basics
      {
        explanation:
`Cells communicate using chemical signals: hormones, neurotransmitters, cytokines. Cell signalling often involves a ligand binding to a receptor (membrane or intracellular), triggering a cascade (second messengers like cAMP, phosphorylation cascades) that alters cell behavior or gene expression.

The immune system has innate (immediate, non-specific) and adaptive (delayed, specific, memory) arms. Innate includes barriers, phagocytes and inflammation; adaptive includes B cells (antibodies) and T cells (cell-mediated immunity). Vaccination trains the adaptive immune system to produce memory cells without causing disease.`,
        examples: [
          {
            title: "Example — Signal transduction",
            problem: "How does adrenaline raise blood glucose?",
            solution: "Adrenaline binds β-adrenergic receptors → G protein activation → adenylate cyclase increases cAMP → PKA phosphorylates enzymes that stimulate glycogen breakdown.",
            steps: ["Ligand binds to membrane receptor", "G protein transduces signal to effector enzyme", "Second messenger activates downstream kinases"]
          },
          {
            title: "Example — Innate vs adaptive",
            problem: "Describe a key difference between innate and adaptive immunity.",
            solution: "Innate is immediate and non-specific; adaptive is specific and develops memory.",
            steps: ["Give examples (barrier + phagocytes vs antibodies + T cells)"]
          },
          {
            title: "Practice — Antibody function",
            problem: "List three functions of antibodies.",
            solution: "Neutralization of toxins/pathogens, opsonization (marking for phagocytosis), activation of complement cascade.",
            steps: ["Explain each function briefly with biological consequence"]
          }
        ],
        quiz: [
          { q: "What is a second messenger often used in hormone signalling?", a: "cAMP (cyclic AMP)" },
          { q: "Which immune cells produce antibodies?", a: "B cells (plasma cells)" }
        ]
      },

      // 4. Microbiology
      {
        explanation:
`Microbiology studies microscopic life (bacteria, archaea, viruses, fungi). Bacteria are prokaryotes with diverse metabolisms (aerobic, anaerobic, obligate/facultative), often characterized by cell wall structure (Gram-positive vs Gram-negative), which affects antibiotic sensitivity.

Viruses are acellular and replicate inside host cells using host machinery. Methods in microbiology include aseptic technique, culturing on selective media, staining (Gram stain), and microscopy. Always interpret lab results critically — contamination and culture conditions shape what you observe.`,
        examples: [
          {
            title: "Example — Gram stain",
            problem: "Why do Gram-positive bacteria retain crystal violet?",
            solution: "Thick peptidoglycan layer traps the crystal violet-iodine complex even after alcohol wash.",
            steps: ["Stain cells, add iodine (mordant), wash with alcohol, counterstain; thick wall retains purple color"]
          },
          {
            title: "Example — Bacterial growth curve",
            problem: "Name and describe phases of a bacterial growth curve.",
            solution: "Lag (acclimation), Log/exponential (rapid division), Stationary (nutrient depletion/toxin accumulation), Death (decline).",
            steps: ["Plot bacterial number vs time and label phases"]
          },
          {
            title: "Practice — Viral replication",
            problem: "Outline replication of a simple RNA virus.",
            solution: "Attachment → entry → uncoating → replication of genome by viral polymerase → protein synthesis → assembly → release.",
            steps: ["List steps in order and identify where host machinery is hijacked"]
          }
        ],
        quiz: [
          { q: "What distinguishes bacteria from viruses?", a: "Bacteria are cellular living organisms; viruses are acellular obligate intracellular parasites." },
          { q: "What is the function of antibiotics like penicillin?", a: "Inhibit cell wall synthesis in bacteria (effective mainly on Gram-positive bacteria)." }
        ]
      },

      // 5. Molecular Techniques
      {
        explanation:
`Modern molecular biology relies on a few core techniques. PCR (polymerase chain reaction) amplifies specific DNA fragments exponentially via thermal cycling (denaturation, annealing, extension). Gel electrophoresis separates DNA fragments by size allowing visualization and approximate sizing. DNA cloning inserts fragments into vectors for propagation or expression.

Understanding applications is key: PCR for diagnostics, gel for checking PCR product size, cloning for producing recombinant proteins. When designing experiments, choose primers, controls (positive/negative), and think about contamination prevention.`,
        examples: [
          {
            title: "Example — PCR steps",
            problem: "Describe the three main steps of a PCR cycle and their purpose.",
            solution: "Denaturation (separate DNA strands), Annealing (primers bind target), Extension (DNA polymerase extends primers to synthesize new strand).",
            steps: ["Repeat cycles to exponentially amplify target sequence", "Choose annealing temperature based on primer Tm"]
          },
          {
            title: "Example — Gel electrophoresis interpretation",
            problem: "A sample shows a single bright band at expected size; what does this imply?",
            solution: "Successful amplification of target fragment with minimal non-specific products.",
            steps: ["Check ladder for size, confirm single band, consider concentration brightness for yield"]
          },
          {
            title: "Practice — Controls",
            problem: "Why include a no-template control in PCR?",
            solution: "To detect contamination; a band in the no-template control suggests contamination of reagents.",
            steps: ["Interpret presence/absence of bands in all controls"]
          }
        ],
        quiz: [
          { q: "What does PCR stand for?", a: "Polymerase Chain Reaction" },
          { q: "What separates DNA fragments during gel electrophoresis?", a: "An electric field; smaller fragments run faster/further through the gel matrix." }
        ]
      },

      // 6. Population Genetics & Hardy-Weinberg
      {
        explanation:
`Population genetics applies Mendelian genetics to populations. The Hardy–Weinberg principle provides a null model: allele frequencies remain constant across generations in absence of selection, migration, mutation, non-random mating, and genetic drift. Genotype frequencies can be predicted from allele frequencies: for a two-allele system p and q, genotype frequencies are p^2 (AA), 2pq (Aa), q^2 (aa).

Use H-W to detect evolution: deviations imply that one or more assumptions are violated. Practice by calculating allele frequencies from genotype counts and checking if observed genotype frequencies match expected H-W values.`,
        examples: [
          {
            title: "Example — Allele frequency",
            problem: "In a population of 100 individuals: 36 AA, 48 Aa, 16 aa. What are p and q?",
            solution: "p = frequency of A = (2*36 + 48) / (2*100) = (72 + 48)/200 = 120/200 = 0.6; q = 0.4.",
            steps: ["Count total alleles = 2N", "Compute A allele count from homozygotes and heterozygotes"]
          },
          {
            title: "Example — H-W expected",
            problem: "Given p = 0.6, what are expected genotype frequencies?",
            solution: "p^2 = 0.36, 2pq = 0.48, q^2 = 0.16; matches sample above indicating H-W equilibrium (no evolution for that trait).",
            steps: ["Compute p^2, 2pq, q^2 and compare with observed proportions"]
          },
          {
            title: "Practice — Detect selection",
            problem: "If observed heterozygotes are fewer than expected, what might that suggest?",
            solution: "Possible inbreeding (non-random mating) or selection against heterozygotes; further investigation required.",
            steps: ["Propose hypotheses and consider additional data (fitness measures)"]
          }
        ],
        quiz: [
          { q: "Hardy-Weinberg equation for two alleles?", a: "p^2 + 2pq + q^2 = 1" },
          { q: "What does p represent?", a: "Frequency of allele A in the population" }
        ]
      },

      // 7. Biotechnology & CRISPR
      {
        explanation:
`Biotechnology uses biological systems for practical applications: recombinant proteins (insulin), gene therapy, and agricultural improvements. CRISPR-Cas9 is a genome-editing tool where a guide RNA directs Cas9 nuclease to a specific DNA sequence to create a double-strand break; repair by non-homologous end joining (NHEJ) or homology-directed repair (HDR) allows targeted edits.

Ethical and safety considerations are central: off-target effects, germline editing concerns, and equitable access. When studying CRISPR, understand guide design, PAM sequences requirement, and how edits are screened (PCR + sequencing).`,
        examples: [
          {
            title: "Example — CRISPR mechanism",
            problem: "Outline the basic steps of CRISPR-Cas9 editing.",
            solution: "Design gRNA → deliver Cas9 + gRNA into cells → Cas9 cuts at target → cell repairs break (NHEJ or HDR) leading to mutation or insertion.",
            steps: ["Recognize PAM requirements (e.g., NGG for SpCas9)", "Differentiate between repair outcomes"]
          },
          {
            title: "Example — Recombinant protein production",
            problem: "How is human insulin produced in bacteria?",
            solution: "Insert human insulin gene into a bacterial expression vector, transform bacteria, induce protein expression, purify insulin, and carry out necessary processing.",
            steps: ["Vector selection, promoter control, host strain, purification steps"]
          },
          {
            title: "Practice — Ethical consideration",
            problem: "Why should germline editing be approached cautiously?",
            solution: "Changes are heritable and can have unforeseen long-term effects across generations; raises social and ethical issues.",
            steps: ["List potential benefits and risks", "Consider regulatory frameworks"]
          }
        ],
        quiz: [
          { q: "What does CRISPR stand for (broadly)?", a: "Clustered Regularly Interspaced Short Palindromic Repeats (CRISPR) — part of bacterial adaptive immunity" },
          { q: "Name one repair pathway after Cas9 cut.", a: "Non-homologous end joining (NHEJ) or Homology-directed repair (HDR)" }
        ]
      },

      // 8. Conservation Biology
      {
        explanation:
`Conservation biology aims to preserve biodiversity and ecosystem function. Core concepts: genetic diversity (essential for adaptation), population viability analyses (assessing extinction risk), and habitat connectivity (allowing gene flow and migration). Human activities (deforestation, climate change, pollution) are major drivers of biodiversity loss; conservation combines science, policy, and community engagement.

Study by linking problem → cause → solution: e.g., habitat fragmentation (problem) reduces gene flow (cause) → wildlife corridors and protected areas (solution). Use case studies (e.g., reintroduction programs) to see principles applied.`,
        examples: [
          {
            title: "Example — Habitat fragmentation",
            problem: "How does fragmentation affect small mammal populations?",
            solution: "It isolates populations reducing gene flow and increasing inbreeding risk, which can reduce fitness and increase extinction risk.",
            steps: ["Describe landscape change", "Predict demographic and genetic consequences"]
          },
          {
            title: "Example — Reintroduction",
            problem: "What considerations are important when reintroducing a species?",
            solution: "Genetic diversity of founder population, habitat suitability, predator/prey dynamics, and human-wildlife conflict management.",
            steps: ["Assess ecological and social factors", "Plan long-term monitoring"]
          },
          {
            title: "Practice — Conservation metric",
            problem: "Define 'effective population size' (Ne).",
            solution: "Ne is the number of individuals in an idealized population that would show the same amount of genetic drift as the actual population; often less than census size (N).",
            steps: ["Explain factors that reduce Ne (unequal sex ratio, variance in reproductive success)"]
          }
        ],
        quiz: [
          { q: "What is a major human driver of biodiversity loss?", a: "Habitat destruction (deforestation, urbanization) among others" },
          { q: "Why is genetic diversity important?", a: "It allows populations to adapt to changing environments and resist diseases" }
        ]
      }
    ]
  }
];

export default function Biology({ semester }) {
  return <LessonPlayer courseLabel="Biology 101" courseContent={BiologyContent} semester={semester} />;
}

