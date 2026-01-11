import React from "react";
import LessonPlayer from "../shared/LessonPlayer";

/**
 * Maths.jsx
 * Comprehensive University Mathematics 101 Content.
 * * Features:
 * - Teacher-oriented narrative explanations.
 * - Conceptual bridging (Why do we learn this?).
 * - Standardized symbols (Unicode).
 * - 3+ Detailed Examples per topic.
 * - Conceptual Quizzes.
 */

const MathsContent = [
  {
    Session: "First Semester",
    Topics: [
      "Logic, Sets & Number Systems",
      "Complex Numbers & De Moivre's Theorem",
      "Polynomials & Partial Fractions",
      "Vectors & Coordinate Geometry",
      "Matrices & Linear Transformations",
      "Trigonometry: Identities & Equations",
      "Sequences, Series & The Binomial Theorem",
      "Functions, Limits & Continuity"
    ],
    Content: [
      // 1. Logic, Sets & Number Systems
      {
        explanation: `Mathematics is built on logic. Before we calculate, we must define what is true. We start with Propositional Logic—analyzing statements that are either True or False. Understanding implications (p → q) is crucial for proving theorems later.
        


[Image of Truth Table for Implication]


We then move to Set Theory, the language of collecting objects. You must master set-builder notation: {x ∈ ℝ | x > 0}. This says "the set of all x belonging to Real numbers such that x is positive." We use Venn Diagrams to visualize relationships like Unions (∪) and Intersections (∩). Finally, we explore Number Systems: from Naturals (ℕ) to Integers (ℤ), Rationals (ℚ), and Reals (ℝ).`,
        examples: [
          {
            title: "Example — Logic & Implication",
            problem: "Construct a truth table for (p ∧ q) → p.",
            solution: "The result is always True (Tautology).",
            steps: [
              "Row 1: p=T, q=T => (T∧T)=T. T→T is True.",
              "Row 2: p=T, q=F => (T∧F)=F. F→T is True (vacuously).",
              "Row 3: p=F, q=T => (F∧T)=F. F→T is True.",
              "Row 4: p=F, q=F => (F∧F)=F. F→F is True."
            ]
          },
          {
            title: "Example — Set Operations",
            problem: "Let A = {1, 2, 3, 4} and B = {3, 4, 5, 6}. Find A ∪ B and A ∩ B.",
            solution: "Union = {1, 2, 3, 4, 5, 6}; Intersection = {3, 4}",
            steps: [
              "Union (∪): Combine all elements, removing duplicates.",
              "Intersection (∩): Identify elements present in BOTH sets."
            ]
          },
          {
            title: "Example — Proof by Contradiction",
            problem: "Prove that √2 is irrational.",
            solution: "Assume √2 is rational, derive a contradiction.",
            steps: [
              "Assume √2 = a/b (simplest form).",
              "2 = a²/b² => a² = 2b². Thus a is even.",
              "Let a = 2k. Then (2k)² = 2b² => 4k² = 2b² => b² = 2k².",
              "This implies b is also even.",
              "Contradiction: a and b share a common factor (2), contradicting 'simplest form'."
            ]
          }
        ],
        quiz: [
          { q: "What is the negation of 'For all x, P(x) is true'?", a: "There exists at least one x where P(x) is false." },
          { q: "Is the set of integers (ℤ) closed under division?", a: "No. (e.g., 1 divided by 2 is 0.5, which is not an integer)." }
        ]
      },

      // 2. Complex Numbers
      {
        explanation: `What happens when you square a number? It becomes positive. So, what is √(-1)? For centuries, this was 'impossible', until we defined the imaginary unit i, where i² = -1. This unlocks Complex Numbers (z = x + iy).
        


[Image of Argand Diagram Complex Plane]


Complex numbers are not just abstract; they are 2D vectors. We graph them on an Argand Diagram. The most powerful form is Polar Form (r(cosθ + i sinθ)) and Euler’s Form (re^(iθ)). These forms make multiplication and rotation incredibly easy.`,
        examples: [
          {
            title: "Example — Basic Arithmetic",
            problem: "Simplify z = (3 + 2i) / (1 - i).",
            solution: "0.5 + 2.5i",
            steps: [
              "Multiply numerator and denominator by the conjugate of the bottom (1 + i).",
              "Bottom: (1 - i)(1 + i) = 1 - i² = 1 - (-1) = 2.",
              "Top: (3 + 2i)(1 + i) = 3 + 3i + 2i + 2i² = 3 + 5i - 2 = 1 + 5i.",
              "Result: (1 + 5i) / 2."
            ]
          },
          {
            title: "Example — Polar Conversion",
            problem: "Convert z = 1 + i√3 to polar form.",
            solution: "2(cos(π/3) + i sin(π/3))",
            steps: [
              "Find modulus r = √(1² + (√3)²) = √4 = 2.",
              "Find argument θ = arctan(√3 / 1) = 60° or π/3.",
              "Write as r(cosθ + i sinθ)."
            ]
          },
          {
            title: "Example — De Moivre's Theorem",
            problem: "Calculate (1 + i)¹⁰.",
            solution: "32i",
            steps: [
              "Convert 1+i to polar: √2(cis π/4).",
              "Apply theorem: rⁿ(cis nθ).",
              "(√2)¹⁰ (cis 10π/4) = 32 (cis 2.5π).",
              "2.5π is equivalent to π/2 (90°). cos(90)=0, sin(90)=1.",
              "Result: 32(0 + i) = 32i."
            ]
          }
        ],
        quiz: [
          { q: "What is i⁴?", a: "1 (since i² = -1, and (-1)² = 1)." },
          { q: "What is the geometric effect of multiplying a complex number by i?", a: "It rotates the number 90° (π/2) counter-clockwise about the origin." }
        ]
      },

      // 3. Polynomials & Partial Fractions
      {
        explanation: `Polynomials are the "friendly" functions of math—continuous and smooth. But finding their roots requires tools like the Remainder Theorem and Factor Theorem. If P(a) = 0, then (x-a) is a factor.



[Image of Polynomial Long Division]


We also do the reverse: breaking complex fractions into simpler parts, called Partial Fraction Decomposition. This is a critical skill for Integration in the second semester. You must learn to handle distinct linear factors, repeated factors, and irreducible quadratic factors.`,
        examples: [
          {
            title: "Example — Factor Theorem",
            problem: "Factorize P(x) = x³ - 7x + 6.",
            solution: "(x-1)(x-2)(x+3)",
            steps: [
              "Guess roots: Try P(1) = 1 - 7 + 6 = 0. So (x-1) is a factor.",
              "Perform long division: (x³ - 7x + 6) ÷ (x-1) = x² + x - 6.",
              "Factor the quadratic: x² + x - 6 = (x+3)(x-2)."
            ]
          },
          {
            title: "Example — Partial Fractions (Distinct)",
            problem: "Decompose (5x + 1) / ((x - 1)(x + 2)).",
            solution: "2/(x - 1) + 3/(x + 2)",
            steps: [
              "Set A/(x-1) + B/(x+2) = original expression.",
              "Multiply by denominator: 5x + 1 = A(x+2) + B(x-1).",
              "Let x = 1: 6 = 3A → A = 2.",
              "Let x = -2: -9 = -3B → B = 3."
            ]
          },
          {
            title: "Example — Partial Fractions (Quadratic)",
            problem: "Decompose 3 / (x(x² + 1)).",
            solution: "3/x - 3x/(x² + 1)",
            steps: [
              "Form: A/x + (Bx + C)/(x² + 1).",
              "3 = A(x² + 1) + (Bx + C)x.",
              "Compare coeffs: A=3. x² terms: A+B=0 → B=-3. x terms: C=0."
            ]
          }
        ],
        quiz: [
          { q: "If dividing P(x) by (x-2) gives a remainder of 5, what is P(2)?", a: "5 (Remainder Theorem)." },
          { q: "How many roots does a degree n polynomial have?", a: "Exactly n (counting complex and repeated roots)." }
        ]
      },

      // 4. Vectors & Coordinate Geometry
      {
        explanation: `Vectors have magnitude and direction. They describe forces, velocities, and spatial relationships. We define vectors using i, j, k components. The Dot Product (a · b) tells us about angles (it's zero if vectors are perpendicular). The Cross Product (a × b) gives us a vector perpendicular to both (useful for finding normal vectors to planes).

Coordinate geometry applies algebra to shapes. You should know the general equation of a circle, distances between points and lines, and how to define 3D lines using parameters.`,
        examples: [
          {
            title: "Example — Dot Product & Angles",
            problem: "Find angle between a = i + j and b = i - j.",
            solution: "90° (π/2)",
            steps: [
              "Calculate a · b = (1)(1) + (1)(-1) = 1 - 1 = 0.",
              "If dot product is 0, vectors are orthogonal (perpendicular).",
              "Formula: cosθ = (a·b) / (|a||b|)."
            ]
          },
          {
            title: "Example — Cross Product",
            problem: "Find vector perpendicular to a=(1,0,0) and b=(0,1,0).",
            solution: "(0,0,1)",
            steps: [
              "Set up determinant with i, j, k in top row.",
              "Compute determinant minors.",
              "Result is k vector (0,0,1), which is the z-axis."
            ]
          },
          {
            title: "Example — Circle Geometry",
            problem: "Find center and radius of x² + y² - 4x + 6y = 12.",
            solution: "Center (2, -3), Radius 5",
            steps: [
              "Complete the square for x: (x² - 4x + 4). Add 4 to RHS.",
              "Complete the square for y: (y² + 6y + 9). Add 9 to RHS.",
              "(x-2)² + (y+3)² = 12 + 4 + 9 = 25.",
              "Standard form: (x-h)² + (y-k)² = r²."
            ]
          }
        ],
        quiz: [
          { q: "Is the dot product a vector or scalar?", a: "Scalar (it's just a number)." },
          { q: "What is the projection of vector a onto b?", a: "((a·b) / |b|²) * b" }
        ]
      },

      // 5. Matrices
      {
        explanation: `Matrices are arrays of numbers that act as machines to transform space. A 2x2 matrix can rotate, stretch, or shear a plane. 

To solve Systems of Linear Equations (simultaneous equations), we use Gaussian Elimination (row operations) or matrix inverses (X = A⁻¹B). The Determinant implies if a unique solution exists; if det(A) = 0, the matrix is "Singular" (it squashes space into a lower dimension) and has no inverse.`,
        examples: [
          {
            title: "Example — Matrix Multiplication",
            problem: "Multiply A=[[1,2],[3,4]] by B=[[2,0],[1,2]].",
            solution: "[[4, 4], [10, 8]]",
            steps: [
              "Row 1 x Col 1: 1*2 + 2*1 = 4",
              "Row 1 x Col 2: 1*0 + 2*2 = 4",
              "Row 2 x Col 1: 3*2 + 4*1 = 10",
              "Row 2 x Col 2: 3*0 + 4*2 = 8"
            ]
          },
          {
            title: "Example — Inverse & Determinant",
            problem: "Find inverse of A = [[4, 7], [2, 6]].",
            solution: "[[0.6, -0.7], [-0.2, 0.4]]",
            steps: [
              "Det(A) = (4)(6) - (7)(2) = 24 - 14 = 10.",
              "Swap main diagonal, change signs of off-diagonal.",
              "[[6, -7], [-2, 4]] divided by 10."
            ]
          },
          {
            title: "Example — Solving Systems",
            problem: "Solve: 2x + y = 5, x - y = 4 using matrices.",
            solution: "x=3, y=-1",
            steps: [
              "Write as AX = B: [[2,1],[1,-1]][x,y] = [5,4].",
              "Find A⁻¹ = -1/3 [[-1, -1], [-1, 2]].",
              "Multiply X = A⁻¹B."
            ]
          }
        ],
        quiz: [
          { q: "Does AB always equal BA?", a: "No, matrix multiplication is non-commutative." },
          { q: "What is the identity matrix I?", a: "A square matrix with 1s on the diagonal and 0s elsewhere." }
        ]
      },

      // 6. Trigonometry
      {
        explanation: `Trig is not just about triangles; it's about cycles and waves. You must memorize the Unit Circle—it is your compass.
        


[Image of Unit Circle with Exact Values]


Key skills:
1. **Identities:** sin²x + cos²x = 1 is the most famous. But you also need Compound Angle formulas (sin(A+B)) and Double Angle formulas (cos(2A)).
2. **Equations:** Solving sin(x) = 0.5 isn't just x=30°. It repeats every 360°. You must find the General Solution.`,
        examples: [
          {
            title: "Example — Double Angle",
            problem: "Solve sin(2x) = cos(x) for 0 ≤ x ≤ 360°.",
            solution: "30°, 90°, 150°, 270°",
            steps: [
              "Use identity sin(2x) = 2sin(x)cos(x).",
              "2sin(x)cos(x) - cos(x) = 0.",
              "Factor: cos(x)(2sin(x) - 1) = 0.",
              "Case 1: cos(x)=0 → 90°, 270°.",
              "Case 2: sin(x)=0.5 → 30°, 150°."
            ]
          },
          {
            title: "Example — R-Addition Formula",
            problem: "Express 3sin(x) + 4cos(x) in form Rsin(x+α).",
            solution: "5sin(x + 53.1°)",
            steps: [
              "R = √(3² + 4²) = 5.",
              "tan(α) = 4/3 → α ≈ 53.1°."
            ]
          },
          {
            title: "Example — Identity Proof",
            problem: "Prove (1 - cos 2x) / sin 2x = tan x.",
            solution: "LHS simplifies to tan x.",
            steps: [
              "Use cos 2x = 1 - 2sin²x.",
              "Numerator: 1 - (1 - 2sin²x) = 2sin²x.",
              "Denominator: 2sin x cos x.",
              "Result: (2sin²x) / (2sin x cos x) = sin x / cos x = tan x."
            ]
          }
        ],
        quiz: [
          { q: "Convert 270° to radians.", a: "3π/2" },
          { q: "What is sec(x)?", a: "1/cos(x)" }
        ]
      },

      // 7. Sequences & Series
      {
        explanation: `Sequences are ordered lists; Series are the sums of those lists.
We focus on Arithmetic (adding a constant) and Geometric (multiplying by a constant).

The Binomial Theorem is a powerful tool for expanding (a+b)ⁿ without multiplying brackets manually n times. It uses Pascal's Triangle (Combinations). We also look at infinite geometric series—can you add infinite numbers and get a finite result? Yes, if the ratio |r| < 1.`,
        examples: [
          {
            title: "Example — Geometric Series",
            problem: "Find the sum to infinity of 16 + 8 + 4 + ...",
            solution: "32",
            steps: [
              "First term a = 16. Common ratio r = 0.5.",
              "Check convergence: |0.5| < 1. Valid.",
              "Formula S = a / (1 - r) = 16 / 0.5 = 32."
            ]
          },
          {
            title: "Example — Binomial Expansion",
            problem: "Expand (2 + x)⁴.",
            solution: "16 + 32x + 24x² + 8x³ + x⁴",
            steps: [
              "Coefficients (Row 4): 1, 4, 6, 4, 1.",
              "Terms: 1(2⁴) + 4(2³)(x) + 6(2²)(x²) + 4(2¹)(x³) + 1(x⁴).",
              "Simplify: 16 + 32x + 24x² + 8x³ + x⁴."
            ]
          },
          {
            title: "Example — Arithmetic Sum",
            problem: "Sum of integers from 1 to 100.",
            solution: "5050",
            steps: [
              "a=1, l=100, n=100.",
              "Formula S = n/2 * (a + l).",
              "S = 50 * 101 = 5050."
            ]
          }
        ],
        quiz: [
          { q: "What is 0! (zero factorial)?", a: "1" },
          { q: "What is the condition for an infinite geometric series to converge?", a: "-1 < r < 1" }
        ]
      },

      // 8. Functions & Limits (Calc Prep)
      {
        explanation: `This is the bridge to Calculus. A Limit asks: "Where is the function *going*, even if it never gets there?"
        
We analyze Continuity (can you draw the graph without lifting the pen?) and Domain/Range. You must handle indeterminate forms like 0/0 using algebraic manipulation or rationalization. If a limit exists from the left and right and they match, the limit exists.`,
        examples: [
          {
            title: "Example — Indeterminate Limit",
            problem: "Evaluate lim(x→3) (x² - 9) / (x - 3).",
            solution: "6",
            steps: [
              "Direct sub gives 0/0 (Indeterminate).",
              "Factor top: (x-3)(x+3).",
              "Cancel (x-3). Now evaluate x+3 at x=3.",
              "3 + 3 = 6."
            ]
          },
          {
            title: "Example — Limits at Infinity",
            problem: "Evaluate lim(x→∞) (2x² + 1) / (x² - 5).",
            solution: "2",
            steps: [
              "Divide every term by highest power (x²).",
              "(2 + 1/x²) / (1 - 5/x²).",
              "As x→∞, 1/x² → 0.",
              "Result: 2/1 = 2."
            ]
          },
          {
            title: "Example — Domain",
            problem: "Find domain of f(x) = ln(x - 5).",
            solution: "x > 5",
            steps: [
              "Log arguments must be strictly positive.",
              "x - 5 > 0 => x > 5."
            ]
          }
        ],
        quiz: [
          { q: "Can a function have a limit at a point where it is undefined?", a: "Yes (e.g., a hole in the graph)." },
          { q: "What is lim(x→0) sin(x)/x?", a: "1" }
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
      "Differentiation: Rules & Techniques",
      "Applications of Differentiation (Max/Min)",
      "Integration: Methods & Techniques",
      "Definite Integrals: Area & Volume",
      "First Order Differential Equations",
      "Second Order Linear ODEs",
      "Sequences & Series Convergence",
      "Hyperbolic Functions"
    ],
    Content: [
      // 1. Differentiation
      {
        explanation: `Calculus is the study of change. The Derivative, f'(x) or dy/dx, measures the instantaneous rate of change (the slope of the tangent).

You must move beyond simple power rules. 
1. **Chain Rule:** For composite functions f(g(x)). "Differentiate the outside, keep the inside, multiply by derivative of inside."
2. **Product/Quotient Rules:** For multiplying or dividing functions.
3. **Implicit Differentiation:** When you can't isolate y (e.g., x² + y² = 25).`,
        examples: [
          {
            title: "Example — Chain Rule",
            problem: "Differentiate y = (3x² + 1)⁵.",
            solution: "30x(3x² + 1)⁴",
            steps: [
              "Outer function is u⁵ -> 5u⁴.",
              "Inner function is 3x² + 1 -> 6x.",
              "Multiply: 5(3x² + 1)⁴ * 6x."
            ]
          },
          {
            title: "Example — Product Rule",
            problem: "Differentiate y = x² sin(x).",
            solution: "2x sin(x) + x² cos(x)",
            steps: [
              "u = x², v = sin(x).",
              "u' = 2x, v' = cos(x).",
              "Formula: u'v + uv'."
            ]
          },
          {
            title: "Example — Implicit Diff",
            problem: "Find dy/dx for x² + y² = 10.",
            solution: "-x/y",
            steps: [
              "Differentiate w.r.t x: 2x + 2y(dy/dx) = 0.",
              "Isolate dy/dx: 2y(dy/dx) = -2x.",
              "dy/dx = -x/y."
            ]
          }
        ],
        quiz: [
          { q: "What is the derivative of e^x?", a: "e^x (It is its own derivative)." },
          { q: "What is the derivative of ln(x)?", a: "1/x" }
        ]
      },

      // 2. Applications of Derivatives
      {
        explanation: `Why find the slope? Because when the slope is zero, we are at a peak (Maximum) or a valley (Minimum). This is Optimization.
        


Procedure:
1. Find f'(x).
2. Set f'(x) = 0 to find Critical Points.
3. Use the Second Derivative Test (f''(x)). If f'' > 0, it's a smiley face (Min). If f'' < 0, it's a frowny face (Max).
We also use derivatives for Kinematics: Position (s) → Velocity (v) → Acceleration (a).`,
        examples: [
          {
            title: "Example — Optimization",
            problem: "Find the max area of a rectangle with perimeter 20m.",
            solution: "25 m²",
            steps: [
              "Perimeter 2x + 2y = 20 => y = 10 - x.",
              "Area A = x * y = x(10 - x) = 10x - x².",
              "Differentiate: dA/dx = 10 - 2x.",
              "Set to 0: 10 - 2x = 0 => x = 5.",
              "If x=5, y=5. Area = 25."
            ]
          },
          {
            title: "Example — Inflection Points",
            problem: "Find inflection point of y = x³.",
            solution: "(0,0)",
            steps: [
              "f'(x) = 3x².",
              "f''(x) = 6x.",
              "Set f'' = 0 => x = 0.",
              "Check sign change: f'' goes negative to positive. It is an inflection point."
            ]
          },
          {
            title: "Example — Rates of Change",
            problem: "A balloon radius grows at 2 cm/s. How fast is Volume increasing when r=10?",
            solution: "800π cm³/s",
            steps: [
              "V = (4/3)πr³. Differentiate wrt time t.",
              "dV/dt = 4πr² (dr/dt).",
              "Plug in: 4π(10)²(2) = 800π."
            ]
          }
        ],
        quiz: [
          { q: "If f'(x) is positive, what is f(x) doing?", a: "Increasing." },
          { q: "What is the acceleration if velocity is constant?", a: "Zero." }
        ]
      },

      // 3. Integration Techniques
      {
        explanation: `Integration is the reverse of differentiation. It is finding the accumulated area or restoring the function from its rate of change.
        
Standard integrals are easy, but composites require techniques:
1. **U-Substitution:** The reverse Chain Rule. Look for a function and its derivative inside the integral.
2. **Integration by Parts:** The reverse Product Rule. Formula: ∫udv = uv - ∫vdu. Used for products like x*e^x.
3. **Partial Fractions:** Used for rational functions (polynomial/polynomial).`,
        examples: [
          {
            title: "Example — U-Substitution",
            problem: "Integrate ∫ 2x(x² + 1)³ dx.",
            solution: "0.25(x² + 1)⁴ + C",
            steps: [
              "Let u = x² + 1. Then du = 2x dx.",
              "Integral becomes ∫ u³ du.",
              "Result: u⁴/4 + C.",
              "Sub back: (x² + 1)⁴ / 4 + C."
            ]
          },
          {
            title: "Example — Integration by Parts",
            problem: "Integrate ∫ x cos(x) dx.",
            solution: "x sin(x) + cos(x) + C",
            steps: [
              "u = x (algebra), dv = cos(x) (trig).",
              "du = 1 dx, v = sin(x).",
              "uv - ∫vdu = x sin(x) - ∫ sin(x) dx.",
              "Integral of -sin(x) is cos(x)."
            ]
          },
          {
            title: "Example — Trig Substitution",
            problem: "Integrate ∫ cos³(x) dx.",
            solution: "sin(x) - sin³(x)/3 + C",
            steps: [
              "Split into cos²(x) * cos(x).",
              "Convert cos²(x) to (1 - sin²(x)).",
              "Let u = sin(x), du = cos(x) dx.",
              "Integrate 1 - u²."
            ]
          }
        ],
        quiz: [
          { q: "What is ∫ 1/x dx?", a: "ln|x| + C" },
          { q: "What is the 'C' in indefinite integrals?", a: "The Constant of Integration (family of curves)." }
        ]
      },

      // 4. Definite Integrals & Applications
      {
        explanation: `Definite integrals give a number, not a function. They represent the net area between the curve and the x-axis. 
        
We extend this to 3D. If you rotate a curve around an axis, you create a solid. We calculate this Volume of Revolution using:
1. **Disk Method:** V = π ∫ (radius)² dx.
2. **Shell Method:** V = 2π ∫ (radius)(height) dx.`,
        examples: [
          {
            title: "Example — Area Between Curves",
            problem: "Find area between y=x and y=x² from 0 to 1.",
            solution: "1/6",
            steps: [
              "Upper curve is y=x, lower is y=x².",
              "Integrate (x - x²) dx from 0 to 1.",
              "[x²/2 - x³/3] from 0 to 1.",
              "1/2 - 1/3 = 1/6."
            ]
          },
          {
            title: "Example — Volume (Disk)",
            problem: "Rotate y=x² around x-axis from 0 to 2.",
            solution: "32π/5",
            steps: [
              "V = π ∫ (y)² dx = π ∫ (x²)² dx = π ∫ x⁴ dx.",
              "Evaluate π[x⁵/5] from 0 to 2.",
              "π(32/5)."
            ]
          },
          {
            title: "Example — Average Value",
            problem: "Find average value of y = x² on [0,3].",
            solution: "3",
            steps: [
              "Formula: (1/(b-a)) ∫ f(x) dx.",
              "1/3 * ∫_0^3 x² dx.",
              "1/3 * [x³/3] = 1/3 * 9 = 3."
            ]
          }
        ],
        quiz: [
          { q: "If ∫ from a to b is 5, what is ∫ from b to a?", a: "-5" },
          { q: "Does the integral represent area if the curve is below the x-axis?", a: "It represents 'signed' area (negative)." }
        ]
      },

      // 5. Differential Equations (First Order)
      {
        explanation: `A Differential Equation (DE) relates a function to its derivatives. "Solving" a DE means finding the function y = f(x).
        


We cover:
1. **Separable Variables:** Move all y's to one side, all x's to the other. Integrate.
2. **Integrating Factor:** For linear equations (dy/dx + Py = Q). We multiply by an exponential factor to turn the LHS into a clean product rule derivative.`,
        examples: [
          {
            title: "Example — Separable",
            problem: "Solve dy/dx = -x/y with y(0)=5.",
            solution: "x² + y² = 25 (Circle)",
            steps: [
              "y dy = -x dx.",
              "Integrate: y²/2 = -x²/2 + C.",
              "x² + y² = K.",
              "Use initial condition (0,5): 25 = K."
            ]
          },
          {
            title: "Example — Integrating Factor",
            problem: "Solve dy/dx + y = e^x.",
            solution: "y = 0.5e^x + Ce^{-x}",
            steps: [
              "P(x) = 1. Integrating Factor IF = e^{∫1dx} = e^x.",
              "Multiply all: e^x y' + e^x y = e^{2x}.",
              "LHS is d/dx(y e^x). Integrate RHS: ∫e^{2x} = 0.5e^{2x}.",
              "y e^x = 0.5e^{2x} + C. Divide by e^x."
            ]
          },
          {
            title: "Example — Newton's Cooling",
            problem: "Rate is proportional to temp difference: dT/dt = -k(T - Tm).",
            solution: "T(t) = Tm + (T₀ - Tm)e^{-kt}",
            steps: [
              "Separate variables: dT/(T-Tm) = -k dt.",
              "ln|T-Tm| = -kt + C.",
              "Exponentiate."
            ]
          }
        ],
        quiz: [
          { q: "What is the order of d²y/dx² + y = 0?", a: "Second Order" },
          { q: "What does the General Solution contain that a Particular Solution does not?", a: "Arbitrary constants (C)." }
        ]
      },

      // 6. Second Order ODEs
      {
        explanation: `Second order linear equations (ay'' + by' + cy = 0) describe vibrations, springs, and circuits. 
        
We assume a solution of form y = e^{rx}. Substituting this gives a "Characteristic Equation" (ar² + br + c = 0).
- **Two real roots:** Overdamping (slow return).
- **Repeated root:** Critical damping.
- **Complex roots:** Underdamping (oscillation with sine/cosine).`,
        examples: [
          {
            title: "Example — Real Distinct Roots",
            problem: "Solve y'' - 5y' + 6y = 0.",
            solution: "y = A e^{2x} + B e^{3x}",
            steps: [
              "Characteristic Eq: r² - 5r + 6 = 0.",
              "Factors: (r-2)(r-3) = 0. Roots r=2, 3.",
              "General form: A e^{r1 x} + B e^{r2 x}."
            ]
          },
          {
            title: "Example — Complex Roots",
            problem: "Solve y'' + y = 0.",
            solution: "y = A cos(x) + B sin(x)",
            steps: [
              "r² + 1 = 0 => r = ±i.",
              "Real part α=0, Imag part β=1.",
              "Formula: e^{αx}(A cos βx + B sin βx)."
            ]
          },
          {
            title: "Example — Particular Integral",
            problem: "Solve y'' - y = 2x.",
            solution: "y = Ae^x + Be^{-x} - 2x",
            steps: [
              "Homogeneous: r²-1=0 => y_h = Ae^x + Be^{-x}.",
              "Particular guess: y_p = Cx + D. y_p'' = 0.",
              "Sub into ODE: 0 - (Cx + D) = 2x.",
              "C = -2, D = 0. Combine y_h + y_p."
            ]
          }
        ],
        quiz: [
          { q: "What physical system does y'' + y = 0 represent?", a: "Simple Harmonic Motion (undamped spring)." },
          { q: "Do we use the Quadratic Formula for Characteristic Equations?", a: "Yes, if it doesn't factor easily." }
        ]
      },

      // 7. Convergence of Series
      {
        explanation: `We revisit Series with a stricter eye. Does ∑ (1/n) converge? (No, it's the Harmonic Series). Does ∑ (1/n²) converge? (Yes).
        
To prove convergence, we use tests:
1. **Ratio Test:** Look at limit of |a_{n+1} / a_n|. If < 1, it converges fast.
2. **Comparison Test:** Compare your messy series to a simple known one.
This leads to Taylor Series: representing ANY smooth function as an infinite polynomial.`,
        examples: [
          {
            title: "Example — Ratio Test",
            problem: "Does ∑ (2^n / n!) converge?",
            solution: "Yes (Converges)",
            steps: [
              "Ratio: [2^{n+1} / (n+1)!] * [n! / 2^n].",
              "Simplifies to 2 / (n+1).",
              "As n→∞, limit is 0. Since 0 < 1, it converges."
            ]
          },
          {
            title: "Example — P-Series",
            problem: "Does ∑ 1/√n converge?",
            solution: "No (Diverges)",
            steps: [
              "Rewrite as ∑ 1 / n^(1/2).",
              "p = 1/2.",
              "p-series test: Converges only if p > 1."
            ]
          },
          {
            title: "Example — Maclaurin Series",
            problem: "Find first 3 terms of e^x at x=0.",
            solution: "1 + x + x²/2",
            steps: [
              "f(0) = e^0 = 1.",
              "f'(0) = 1, f''(0) = 1.",
              "Series: f(0) + f'(0)x + f''(0)x²/2! ..."
            ]
          }
        ],
        quiz: [
          { q: "Does the Alternating Series 1 - 1/2 + 1/3 - 1/4... converge?", a: "Yes (Conditional Convergence)." },
          { q: "What is the Maclaurin series for sin(x)?", a: "x - x³/3! + x⁵/5! - ..." }
        ]
      },

      // 8. Hyperbolic Functions
      {
        explanation: `Just as sin/cos are related to the circle (x² + y² = 1), Hyperbolic functions (sinh, cosh) are related to the hyperbola (x² - y² = 1).
        
Definitions:
- sinh(x) = (e^x - e^{-x}) / 2
- cosh(x) = (e^x + e^{-x}) / 2
        
Cosh(x) is the shape of a hanging cable (catenary). Their derivatives cycle similarly to trig but without the negative signs (mostly).`,
        examples: [
          {
            title: "Example — Identity",
            problem: "Prove cosh²x - sinh²x = 1.",
            solution: "Algebraic proof via exponentials",
            steps: [
              "Substitute definitions: [(e^x + e^{-x})/2]² - [(e^x - e^{-x})/2]².",
              "Expand squares: (e^{2x} + 2 + e^{-2x})/4 - (e^{2x} - 2 + e^{-2x})/4.",
              "Subtract: 4/4 = 1."
            ]
          },
          {
            title: "Example — Derivative",
            problem: "Differentiate y = cosh(3x).",
            solution: "3 sinh(3x)",
            steps: [
              "d/dx(cosh u) = sinh u * du/dx.",
              "u = 3x -> du = 3.",
              "Result: 3 sinh(3x)."
            ]
          },
          {
            title: "Example — Inverse",
            problem: "Solve sinh(x) = 0.",
            solution: "x = 0",
            steps: [
              "(e^x - e^{-x}) / 2 = 0.",
              "e^x = e^{-x} => e^{2x} = 1.",
              "2x = 0 => x = 0."
            ]
          }
        ],
        quiz: [
          { q: "Is cosh(x) an even or odd function?", a: "Even (symmetric about y-axis)." },
          { q: "What is the derivative of sinh(x)?", a: "cosh(x) (No negative sign)." }
        ]
      }
    ]
  }
];

export default function Maths({ semester }) {
  return <LessonPlayer courseLabel="Mathematics 101" courseContent={MathsContent} semester={semester} />;
}
