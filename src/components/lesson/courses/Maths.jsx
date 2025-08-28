import React from "react";
import LessonPlayer from "../shared/LessonPlayer";

/**
 * Maths.jsx
 * Expanded, teaching-style content for Mathematics 101
 * - Two sessions (First & Second Semester)
 * - Each topic includes step-by-step explanation, ≥3 examples and quizzes
 */

const MathsContent = [
  {
    Session: "First Semester",
    Topics: [
      "Numbers, Sets & Number Theory",
      "Indices, Surds & Logarithms",
      "Algebraic Expressions, Factorization & Equations",
      "Functions, Transformations & Graphs",
      "Trigonometry (Unit Circle & Identities)",
      "Sequences, Series & Binomial Theorem",
      "Matrices & Systems of Linear Equations",
      "Intro to Limits & Continuity"
    ],
    Content: [
      // 1 Numbers & Sets
      {
        explanation:
`Numbers & sets form the language of mathematics. To truly understand them, practice translating everyday statements into set notation and back again. For example, \"all positive even numbers less than 20\" becomes {x ∈ Z | 0 < x < 20, x mod 2 = 0}. Think about why certain sets are closed under operations (the sum of two integers is an integer), and how properties like closure, associativity, commutativity and identity elements shape algebraic manipulations.

Number theory introduces divisibility, primes and modular arithmetic. When solving divisibility problems, list divisors, use prime factorization, and apply the Euclidean algorithm for greatest common divisors (GCD). Understand proofs by working through small cases, then generalize.`,
        examples: [
          {
            title: "Example — Set notation & Venn",
            problem: "Let U = {1..20}, A = multiples of 3, B = multiples of 4. Find A ∩ B and A \\ B.",
            solution: "A ∩ B = {12}; A \\ B = {3,6,9,15,18}",
            steps: [
              "List multiples of 3: 3,6,9,12,15,18",
              "List multiples of 4: 4,8,12,16,20",
              "Intersection: elements appearing in both lists (12).",
              "A \\ B: elements in A not in B."
            ],
            hint: "A quick way: compute lcm(3,4)=12 for the intersection."
          },
          {
            title: "Example — GCD using Euclidean algorithm",
            problem: "Find gcd(252, 198).",
            solution: "gcd = 18",
            steps: [
              "252 = 198 × 1 + 54",
              "198 = 54 × 3 + 36",
              "54 = 36 × 1 + 18",
              "36 = 18 × 2 + 0 -> gcd = 18"
            ]
          },
          {
            title: "Practice — Prime factorization",
            problem: "Prime factors of 360?",
            solution: "360 = 2^3 × 3^2 × 5",
            steps: ["Divide by small primes: 360/2=180 -> 90 -> 45", "45/3=15 -> 15/3=5 -> 5 prime"]
          }
        ],
        quiz: [
          { q: "Is 1 a prime number?", a: "No — primes have exactly two distinct positive divisors (1 and itself) and 1 has one." },
          { q: "What is lcm(6,8)?", a: "24" }
        ]
      },

      // 2 Indices, Surds, Logs
      {
        explanation:
`Indices (exponents) compress repeated multiplication: x^n means multiply x by itself n times. When solving expressions with exponents, apply rules: a^m × a^n = a^{m+n}, (a^m)^n = a^{mn}, (ab)^n = a^n b^n. Surds are roots (square roots, cube roots). Simplifying surds is about extracting perfect powers (√72 = √(36×2) = 6√2).

Logarithms are the inverses of exponentials: log_b(y) = x means b^x = y. Use log rules to simplify and solve: log(ab) = log a + log b, log(a^k) = k log a. Many equations become solvable only after applying logs or exponent rules.`,
        examples: [
          {
            title: "Example — Indices manipulation",
            problem: "Simplify (2^5 × 2^{-3}) / 2^2",
            solution: "2^{5 − 3 − 2} = 2^0 = 1",
            steps: ["Combine exponents: 5 + (−3) − 2 = 0", "2^0 = 1"]
          },
          {
            title: "Example — Surd simplification",
            problem: "Simplify √200",
            solution: "√(100 × 2) = 10√2",
            steps: ["Factor 200 into perfect square × remainder, take sqrt of perfect square"]
          },
          {
            title: "Example — Log equation",
            problem: "Solve log_3(x) + log_3(x − 2) = 2",
            solution: "x(x − 2) = 9 => x^2 − 2x − 9 = 0 -> x = 1 ± √10. Discard negative or invalid roots (check domain x>2).",
            steps: ["Product rule for logs, convert to exponential form, solve quadratic, check domain"]
          }
        ],
        quiz: [
          { q: "What is log_10 1000?", a: "3" },
          { q: "Simplify (x^{1/2})^4", a: "x^2" }
        ]
      },

      // 3 Algebra & Factorization
      {
        explanation:
`Algebraic fluency is about recognizing patterns and transforming expressions. Factorization reduces polynomials to product of simpler polynomials; this helps solve equations and integrate later. Start by checking for common factors, then special patterns (difference of squares, perfect square trinomials), and if needed, use quadratic formula.

Solving equations requires checking domain and extraneous solutions especially when manipulating denominators or squaring both sides. For inequalities, multiply/divide by negatives flips inequality signs — track carefully.`,
        examples: [
          {
            title: "Example — Quadratic factorization",
            problem: "Factor x^2 + 5x + 6",
            solution: "(x + 2)(x + 3)",
            steps: ["Find two numbers multiply to 6 and sum to 5", "Decompose middle term"]
          },
          {
            title: "Example — Completing the square",
            problem: "Solve x^2 + 6x + 5 = 0 by completing square",
            solution: "(x + 3)^2 − 4 = 0 => x + 3 = ±2 => x = −1 or x = −5",
            steps: ["Add/subtract (b/2)^2 to create perfect square", "Solve for x"]
          },
          {
            title: "Practice — Rational equation with check",
            problem: "(x/(x − 2)) = 3/2",
            solution: "2x = 3x − 6 => x = 6. Check x≠2 allowed.",
            steps: ["Cross-multiply, solve, check excluded values"]
          }
        ],
        quiz: [
          { q: "Quadratic formula for ax^2+bx+c=0?", a: "x = [−b ± √(b^2 − 4ac)] / (2a)" },
          { q: "Why check domain after solving rational equations?", a: "Because multiplying by expressions can introduce extraneous solutions (denominator zeros)" }
        ]
      },

      // 4 Functions & Graphs
      {
        explanation:
`A function maps each element of a domain to one element of a range. Graphs visualize function behaviour: intercepts, asymptotes, maxima/minima and continuity points. For transformations: f(x − a) shifts right by a, f(x) + b shifts up by b, af(x) scales vertically, f(bx) scales horizontally. Practice by starting with base functions (linear, quadratic, exponential, trig) and applying transformations step-by-step.

Inverse functions undo outputs to inputs. For an inverse to exist, function must be one-to-one (strictly monotonic in relevant domain). To find inverse, swap x and y and solve for y.`,
        examples: [
          {
            title: "Example — Transformations",
            problem: "Sketch y = −2(x − 1)^2 + 3 starting from y = x^2",
            solution: "Flip vertically (−), vertical stretch by 2, shift right 1, up 3.",
            steps: ["Apply horizontal shift, scale, reflection, vertical shift in that order (or logically that helps)"]
          },
          {
            title: "Example — Inverse",
            problem: "Find inverse of f(x) = (x − 5)/2",
            solution: "Swap x and y: x=(y−5)/2 -> y=2x+5 => f^{-1}(x)=2x+5",
            steps: ["Swap roles of x and y then rearrange"]
          },
          {
            title: "Practice — Domain restrictions",
            problem: "Domain of f(x) = √(x − 3)",
            solution: "x ≥ 3",
            steps: ["Ensure expression under square root is non-negative"]
          }
        ],
        quiz: [
          { q: "What is the inverse of f(x) = 3x − 4?", a: "f^{-1}(x) = (x + 4)/3" },
          { q: "If f(x)=x^2 on all reals, does inverse exist?", a: "No (not one-to-one). Restrict domain x≥0 to get inverse." }
        ]
      },

      // 5 Trigonometry
      {
        explanation:
`Trigonometry connects geometry and algebra using ratios in right triangles and points on the unit circle. Learn exact values for special angles (30°, 45°, 60°) using standard triangles. Identities (Pythagorean, double-angle, sum/difference) are tools for simplifying expressions and solving equations. When solving trig equations, consider periodicity and general solutions.

Practice converting between degrees and radians; for calculus later, radians are essential.`,
        examples: [
          {
            title: "Example — Unit circle values",
            problem: "Find sin, cos for 30°, 45°, 60°",
            solution: "sin30=1/2 cos30=√3/2, sin45=√2/2 cos45=√2/2, sin60=√3/2 cos60=1/2",
            steps: ["Use 30-60-90 and 45-45-90 triangle ratios"]
          },
          {
            title: "Example — Identity use",
            problem: "Simplify sin^2 x + cos^2 x",
            solution: "1 (Pythagorean identity)",
            steps: ["Directly apply identity"]
          },
          {
            title: "Practice — Solve trig equation",
            problem: "Solve sin x = 0.5 for 0 ≤ x < 2π",
            solution: "x = π/6, 5π/6",
            steps: ["Find principal angle and then other solutions in range"]
          }
        ],
        quiz: [
          { q: "tan x in terms of sin and cos?", a: "tan x = sin x / cos x" },
          { q: "Radians in a full circle?", a: "2π radians" }
        ]
      },

      // 6 Sequences, Series, Binomial
      {
        explanation:
`Sequences list numbers in an order defined by a rule. For arithmetic sequences, differences are constant; geometric sequences have constant ratios. Series sum sequence terms; formulas for sums (arithmetic: n/2 (first+last); geometric: a (1−r^n)/(1−r)) are useful. The binomial theorem expands (a + b)^n into sum of terms with binomial coefficients C(n,k).

Practice by deriving nth term formulas and checking with small values.`,
        examples: [
          {
            title: "Example — Arithmetic sequence",
            problem: "Find nth term of 3,7,11,...",
            solution: "a_n = 4n − 1",
            steps: ["Common difference d = 4, general form a_n = a1 + (n−1)d"]
          },
          {
            title: "Example — Geometric series sum",
            problem: "Sum 1 + 1/2 + 1/4 + ... to infinity",
            solution: "1/(1 − 1/2) = 2",
            steps: ["Recognize geometric with r = 1/2 < 1; use sum formula"]
          },
          {
            title: "Practice — Binomial coefficient",
            problem: "Coefficient of x^2 in (1 + 3x)^4",
            solution: "C(4,2) * 3^2 = 6 * 9 = 54",
            steps: ["Use binomial theorem general term C(n,k) a^{n−k} b^k"]
          }
        ],
        quiz: [
          { q: "Sum of first n natural numbers?", a: "n(n + 1)/2" },
          { q: "What is binomial coefficient C(5,2)?", a: "10" }
        ]
      },

      // 7 Matrices & Linear Systems
      {
        explanation:
`Matrices provide compact operations for linear systems and transformations. Learn row operations for solving Ax = b (Gaussian elimination), find determinants to test invertibility (det ≠ 0 => inverse exists), and use matrix inverse for small systems (x = A^{-1} b). For larger systems, elimination and LU decomposition are practical.

Interpret matrices geometrically: a 2×2 matrix can rotate, scale, or reflect vectors in the plane.`,
        examples: [
          {
            title: "Example — Solve 2×2 system",
            problem: "x + y = 5, 2x − y = 1",
            solution: "x = 2, y = 3",
            steps: ["Add equations to eliminate y: 3x = 6 => x = 2", "Substitute back for y"]
          },
          {
            title: "Example — Determinant intuition",
            problem: "What does det [[1,2],[3,4]] tell us?",
            solution: "det = 1*4 − 3*2 = −2 -> area scaling factor (magnitude 2) and orientation reversed (negative).",
            steps: ["Compute ad − bc and interpret geometrically"]
          },
          {
            title: "Practice — Inverse 2×2",
            problem: "Find inverse of [[1,2],[3,4]]",
            solution: "1/(−2) * [[4, −2], [−3, 1]] = [[−2, 1], [1.5, −0.5]]",
            steps: ["Compute adjugate and divide by determinant"]
          }
        ],
        quiz: [
          { q: "When is a matrix singular?", a: "When its determinant is 0 (no inverse)" },
          { q: "Name a valid row operation.", a: "Swap two rows; multiply a row by a nonzero scalar; add a multiple of one row to another." }
        ]
      },

      // 8 Intro to Limits & Continuity
      {
        explanation:
`Limits explore the behavior of functions as inputs approach particular values. When direct substitution gives indeterminate forms (0/0, ∞/∞), use algebraic simplification, factoring, rationalization, or L'Hôpital's rule (once you know derivatives). Continuity requires that limit equals function value; check both sides for one-sided limits. Recognize removable and non-removable discontinuities.

Practice by rewriting expressions and testing substitutions before applying heavy machinery.`,
        examples: [
          {
            title: "Example — Factor limit",
            problem: "lim_{x→1} (x^2 − 1)/(x − 1)",
            solution: "2 (factor x^2 − 1 = (x − 1)(x + 1) and cancel)",
            steps: ["Factor numerator, cancel common factor, evaluate at x = 1"]
          },
          {
            title: "Example — One-sided limit",
            problem: "lim_{x→0^+} ln x",
            solution: "−∞ (logarithm tends to negative infinity approaching 0 from right)",
            steps: ["Consider values approaching 0 from positive side"]
          },
          {
            title: "Practice — Removable discontinuity",
            problem: "f(x) = (x^2 − 4)/(x − 2) with f(2) defined as 4. Is f continuous at 2?",
            solution: "Yes, because limit equals 4 after simplification (cancel x − 2), so function value matches limit.",
            steps: ["Simplify to x + 2 and evaluate at 2"]
          }
        ],
        quiz: [
          { q: "Compute lim_{x→0} (sin x) / x", a: "1" },
          { q: "Does continuity at a point require differentiability?", a: "No — differentiability implies continuity, but not vice versa." }
        ]
      }
    ]
  },

  // Second Semester
  {
    Session: "Second Semester",
    Topics: [
      "Differentiation rules & techniques",
      "Applications of derivatives (optimization & motion)",
      "Integration techniques & substitution/parts",
      "Definite integrals, area & volume",
      "Infinite series & convergence tests",
      "Differential equations (first & second order intro)",
      "Partial fractions & rational integration",
      "Numerical methods & approximation (Simpson, trapezoid)"
    ],
    Content: [
      {
        explanation:
`Differentiation is a limit process giving instantaneous rates. Master common rules (power, product, quotient, chain) and practice implicit differentiation for equations not solved for y. Learn to interpret derivative graphically (slope) and physically (velocity as derivative of position). Work carefully with higher order derivatives for motion and curvature analyses.`,
        examples: [
          {
            title: "Example — Chain rule",
            problem: "d/dx (sin(3x^2 + 1))",
            solution: "cos(3x^2 + 1) × 6x",
            steps: ["Differentiate outer (sin) -> cos(inner) × derivative of inner (6x)"]
          },
          {
            title: "Example — Implicit differentiation",
            problem: "Differentiate x^2 + y^2 = 25",
            solution: "2x + 2y y' = 0 -> y' = −x/y",
            steps: ["Differentiate each term w.r.t x, treat y as y(x), solve for y'"]
          },
          {
            title: "Practice — Higher derivatives",
            problem: "Find d^2/dx^2 (e^{2x})",
            solution: "4 e^{2x}",
            steps: ["Differentiate twice; each differentiation multiplies by 2"]
          }
        ],
        quiz: [{ q: "Derivative of ln x?", a: "1/x" }, { q: "Derivative of cos x?", a: "−sin x" }]
      },

      {
        explanation:
`Derivatives find maxima, minima and points of inflection. For optimization, set derivative to zero to find critical points and use second-derivative test or first-derivative sign changes. In motion problems, relate position, velocity, and acceleration via derivatives and apply kinematic constraints to solve real-life problems.`,
        examples: [
          {
            title: "Example — Optimization",
            problem: "Find dimensions of rectangle with max area under y = 10 − x",
            solution: "Area A = x(10 − x). A' = 10 − 2x => x = 5 => area = 25.",
            steps: ["Form expression, differentiate, solve A'=0, check second derivative negative -> max"]
          },
          {
            title: "Example — Motion",
            problem: "Position s(t) = t^3 − 6t^2 + 9t. Find velocity and acceleration at t = 1.",
            solution: "v = 3t^2 − 12t + 9 => v(1)=0; a=6t − 12 => a(1)=−6",
            steps: ["Differentiate once for velocity, twice for acceleration, evaluate"]
          },
          {
            title: "Practice — Economic application",
            problem: "Maximize profit P(x) given revenue and cost functions",
            solution: "Set marginal profit P'(x)=0 and solve, check second derivative",
            steps: ["Translate economics terms to derivatives and optimize"]
          }
        ],
        quiz: [{ q: "How find local min using derivatives?", a: "Set f'=0 and check f''>0" }]
      },

      {
        explanation:
`Integration reverses differentiation and computes accumulation. Practice substitution (reverse chain rule), integration by parts (reverse product rule) and handle trigonometric integrals. Always verify by differentiating your antiderivative. For definite integrals, evaluate antiderivative at bounds; for improper integrals analyze limits.`,
        examples: [
          {
            title: "Example — Substitution",
            problem: "∫ x cos(x^2) dx",
            solution: "1/2 sin(x^2) + C",
            steps: ["u = x^2 -> du = 2x dx -> integral becomes 1/2 ∫ cos u du"]
          },
          {
            title: "Example — Integration by parts",
            problem: "∫ x e^x dx",
            solution: "e^x (x − 1) + C",
            steps: ["Let u = x, dv = e^x dx. u' = 1, v = e^x; apply uv − ∫ v du"]
          },
          {
            title: "Practice — Trig integral",
            problem: "∫ sin^2 x dx",
            solution: "Use identity sin^2 x = (1 − cos 2x)/2 then integrate -> x/2 − (sin 2x)/4 + C",
            steps: ["Apply identity, integrate term by term"]
          }
        ],
        quiz: [{ q: "Antiderivative of 2x is?", a: "x^2 + C" }]
      },

      {
        explanation:
`Definite integrals compute areas and can be extended to volume calculations (disks, washers, shells). When integrating to find area between curves, take ∫ (top − bottom) dx across intersection points. For volumes, decide rotation axis and method accordingly (disks when slicing perpendicular and no holes; shells when easier with cylindrical shells).`,
        examples: [
          {
            title: "Example — Area between curves",
            problem: "Area between y = x and y = x^2 from 0 to 1",
            solution: "∫_0^1 (x − x^2) dx = [x^2/2 − x^3/3]_0^1 = 1/2 − 1/3 = 1/6",
            steps: ["Sketch graphs, identify top and bottom, integrate difference"]
          },
          {
            title: "Example — Volume by revolution (disk)",
            problem: "Rotate y = x from 0 to 1 around x-axis",
            solution: "V = π ∫_0^1 x^2 dx = π/3",
            steps: ["Set up π∫ y^2 dx and evaluate"]
          },
          {
            title: "Practice — Shell method",
            problem: "Find volume by shells for rotation around y-axis",
            solution: "V = 2π ∫ x f(x) dx across interval",
            steps: ["Set up shell radius x and height f(x) then integrate"]
          }
        ],
        quiz: [{ q: "Area under constant y = c from a to b?", a: "c(b − a)" }]
      },

      {
        explanation:
`Infinite series approximate functions and define convergence. Learn tests for convergence (geometric, p-series, comparison, ratio, alternating series test). Power series and Taylor expansions let you approximate functions locally with polynomials — crucial in analysis and applied math.`,
        examples: [
          {
            title: "Example — Geometric series",
            problem: "Sum 1 + r + r^2 + ... for |r| < 1",
            solution: "1 / (1 − r)",
            steps: ["Recognize geometric form and apply formula"]
          },
          {
            title: "Example — Ratio test",
            problem: "Test ∑ (n!)/n^n for convergence",
            solution: "Use ratio test; limit tends to 0 so convergent",
            steps: ["Compute a_{n+1}/a_n and take limit"]
          },
          {
            title: "Practice — Taylor polynomial",
            problem: "Approx e^x around 0 with first 3 terms",
            solution: "1 + x + x^2/2",
            steps: ["Compute derivatives at 0 and build polynomial"]
          }
        ],
        quiz: [{ q: "When is geometric series convergent?", a: "When |r| < 1" }]
      },

      {
        explanation:
`Differential equations model change. Start with separable equations and linear first-order forms using integrating factors. Interpret solutions with initial conditions to produce particular solutions. For second-order linear constant-coefficient ODEs, learn homogeneous solutions (characteristic equation) and particular solutions via undetermined coefficients.`,
        examples: [
          {
            title: "Example — Separable",
            problem: "dy/dx = ky -> solve",
            solution: "y = C e^{kx}",
            steps: ["Separate variables dy/y = k dx, integrate both sides, exponentiate"]
          },
          {
            title: "Example — Integrating factor",
            problem: "dy/dx + P(x) y = Q(x)",
            solution: "y * μ(x) = ∫ μ(x) Q(x) dx + C where μ(x)=e^{∫P dx}",
            steps: ["Compute integrating factor then multiply and integrate"]
          },
          {
            title: "Practice — Second order",
            problem: "Solve y'' − 3y' + 2y = 0",
            solution: "Characteristic r^2 − 3r + 2 = 0 -> r=1,2 => y = C1 e^{x} + C2 e^{2x}",
            steps: ["Find roots of characteristic polynomial and construct general solution"]
          }
        ],
        quiz: [{ q: "Is y' = cos x separable?", a: "Yes — trivial separable (dy = cos x dx) integrate both sides." }]
      },

      {
        explanation:
`Partial fractions decompose rational functions enabling easier integration. For improper fractions (degree numerator ≥ denominator) divide first then decompose. Identify linear and irreducible quadratic factors and solve coefficients by equating numerators or plugging convenient values.`,
        examples: [
          {
            title: "Example — Partial fractions",
            problem: "Integrate ∫ 1/(x^2 − 1) dx",
            solution: "1/2 ln |(x − 1)/(x + 1)| + C",
            steps: ["Decompose 1/(x^2 − 1)=1/2(1/(x − 1) − 1/(x + 1)), integrate logs"]
          },
          {
            title: "Example — Improper fraction",
            problem: "Integrate ∫ (x^2)/(x−1) dx",
            solution: "Long division gives x + 1 + 1/(x − 1), then integrate",
            steps: ["Divide polynomial then decompose remainder"]
          },
          {
            title: "Practice — Factor matching",
            problem: "Decompose A/(x−2) + B/(x+3) for 1/((x−2)(x+3))",
            solution: "A = 1/5, B = −1/5",
            steps: ["Solve for A and B by equating numerators or plugging x"]
          }
        ],
        quiz: [{ q: "When do you perform polynomial long division before decomposition?", a: "When numerator degree ≥ denominator degree (improper fraction)." }]
      },

      {
        explanation:
`Numerical methods approximate integrals and roots when analytic solutions are difficult. Trapezoid and Simpson's rule estimate integrals — Simpson's typically more accurate if function is smooth. Root finding methods (bisection, Newton-Raphson) have different speed/robustness trade-offs: Newton is fast but requires derivative and good initial guess; bisection is slow but robust.`,
        examples: [
          {
            title: "Example — Trapezoid rule",
            problem: "Approx ∫_0^1 e^{x^2} dx using n=2",
            solution: "Compute f(0), f(0.5), f(1) then apply formula -> approximate value",
            steps: ["Compute nodes, apply trapezoid formula: h/2 (f0 + 2f1 + fn)"]
          },
          {
            title: "Example — Newton's method",
            problem: "Find root of f(x)=x^2 − 2 starting guess x0=1.5",
            solution: "Iterate x_{n+1} = x_n − f(x_n)/f'(x_n) -> converges to √2",
            steps: ["Compute successive approximations until tolerance"]
          },
          {
            title: "Practice — Error estimate",
            problem: "How does halving step-size affect trapezoid error?",
            solution: "Error scales roughly with h^2 for trapezoid rule; halving h reduces error by ~4x",
            steps: ["Use error term proportionality to deduce scale"]
          }
        ],
        quiz: [{ q: "Which root-finding method is guaranteed to converge on an interval with sign change?", a: "Bisection method" }]
      }
    ]
  }
];

export default function Maths({ semester }) {
  return <LessonPlayer courseLabel="Mathematics 101" courseContent={MathsContent} semester={semester} />;
}
