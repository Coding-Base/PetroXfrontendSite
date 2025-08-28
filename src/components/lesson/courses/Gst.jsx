import React from "react";
import LessonPlayer from "../shared/LessonPlayer";

/**
 * Gst.jsx
 * Expanded GST (General Studies & English) 101 content
 * Focus on study skills, English essentials, academic writing and communication
 */

const GstContent = [
  {
    Session: "First Semester",
    Topics: [
      "Study Skills: Active Learning & Spaced Repetition",
      "Time Management & Exam Preparation",
      "Grammar Essentials: Sentence structure & tense",
      "Essay Writing: thesis, structure & coherence",
      "Reading Comprehension & Critical Analysis",
      "Note-taking systems: Cornell, mapping & synthesis",
      "Academic Integrity & Referencing basics"
    ],
    Content: [
      // 1 Study Skills
      {
        explanation:
`Active learning beats passive rereading. Techniques include retrieval practice (test yourself), spaced repetition (increase intervals between reviews), and elaboration (explain concepts in your own words). When learning complex topics, interleave practice across related skills rather than blocking only one topic — it increases transfer and retention.

Design a study plan that alternates subjects and schedules periodic review of older material to keep it fresh.`,
        examples: [
          {
            title: "Example — Spaced plan",
            problem: "Plan reviews for a topic across 10 days",
            solution: "Study Day 1, review Day 2, Day 4, Day 7, Day 10 (increasing intervals)",
            steps: ["Schedule initial learning then spaced reviews", "Use flashcards with spaced repetition software if possible"]
          },
          {
            title: "Example — Active recall",
            problem: "How to turn notes into active recall tasks?",
            solution: "Convert headings and key sentences into questions and test yourself without notes",
            steps: ["Make flashcards Q/A and self-test regularly"]
          },
          {
            title: "Practice — Elaborative encoding",
            problem: "Explain a concept to a peer in your own words",
            solution: "Teaching reinforces understanding and reveals gaps",
            steps: ["Try to answer 'why' and 'how' not just 'what'"]
          }
        ],
        quiz: [{ q: "What is active recall?", a: "Self-testing without looking at notes" }]
      },

      // 2 Time Management
      {
        explanation:
`Use time-blocking and Pomodoro technique to create high-quality focused study sessions. Prioritize tasks by importance and urgency (Eisenhower matrix). For exam prep, create a revision timetable with topic weight proportional to marks and personal weakness.

Practice planning with realistic time estimates and buffer slots for catch-up.`,
        examples: [
          {
            title: "Example — Pomodoro",
            problem: "Implement 25/5 technique for a 2-hour study session",
            solution: "4 cycles of 25 min work + 5 min break, then a longer break",
            steps: ["Set timer, remove distractions, track completed cycles"]
          },
          {
            title: "Example — Prioritisation",
            problem: "Which topic first: high-weight low-understanding or low-weight high-understanding?",
            solution: "High-weight low-understanding first (big impact on result)",
            steps: ["Allocate more time to high-impact weak areas"]
          },
          {
            title: "Practice — Weekly plan",
            problem: "Draft weekly blocks for 5 subjects",
            solution: "Divide day into morning/evening slots and assign subjects, include revision and mock tests",
            steps: ["Balance distribution to avoid cognitive overload"]
          }
        ],
        quiz: [{ q: "Why schedule breaks during study?", a: "To reduce fatigue and maintain high concentration levels" }]
      },

      // 3 Grammar Essentials
      {
        explanation:
`Good grammar clarifies thought. Focus on sentence structure (subject, verb, object), verb tenses for temporal clarity, and punctuation for readability. Avoid run-on sentences and dangling modifiers by making sure each clause has a clear subject and verb. Use active voice for directness unless passive serves clarity.

Edit sentences aloud to hear awkward phrasing and improve flow.`,
        examples: [
          {
            title: "Example — Tense consistency",
            problem: "Correct: 'She finished the exam and now she finishes her lunch.'",
            solution: "'She finished the exam and then finished her lunch.' or 'She has finished the exam and is now finishing her lunch.' (choose consistent tenses)",
            steps: ["Identify time frames and align tenses accordingly"]
          },
          {
            title: "Example — Subject-verb agreement",
            problem: "Correct: 'The list of items (is/are) on the desk.'",
            solution: "is (the list is the subject)",
            steps: ["Find subject and match singular/plural verb"]
          },
          {
            title: "Practice — Punctuation",
            problem: "Where to place comma in complex sentence?",
            solution: "After introductory clause or to separate independent clauses joined by conjunctions",
            steps: ["Review rules and apply to example sentences"]
          }
        ],
        quiz: [{ q: "Which voice is usually clearer for instructions: active or passive?", a: "Active voice" }]
      },

      // 4 Essay Writing
      {
        explanation:
`A strong essay has a clear thesis, organized paragraphs, evidence and analysis. Each paragraph should start with a topic sentence, include supporting evidence (data, quotes, examples), interpret the evidence (analysis), and connect back to thesis. Use transitions to guide the reader and avoid repetition.

During editing, tighten sentences, eliminate filler, and check argument logic and references.`,
        examples: [
          {
            title: "Example — Thesis formulation",
            problem: "Construct thesis for 'Renewable energy benefits'",
            solution: "Investment in renewable energy enhances national security, reduces greenhouse gas emissions, and spurs economic growth through job creation.",
            steps: ["Express concise claim and list supporting points for body paragraphs"]
          },
          {
            title: "Example — Paragraph structure",
            problem: "Write a paragraph about job creation",
            solution: "Topic sentence -> evidence (jobs statistic) -> analysis linking policy to job growth -> concluding sentence tying to thesis",
            steps: ["Follow P-E-A (Point-Evidence-Analysis) structure"]
          },
          {
            title: "Practice — Counterargument",
            problem: "Add and refute one counterargument",
            solution: "Acknowledge adoption costs then argue long-term savings and social benefits",
            steps: ["Use concession but rebut with evidence"]
          }
        ],
        quiz: [{ q: "What should a thesis be?", a: "A clear, specific statement of the essay's central claim" }]
      },

      // 5 Reading Comprehension
      {
        explanation:
`Active reading uses pre-reading, annotation, summarizing and questioning. Preview titles and headings to form expectations, annotate main ideas and supporting evidence while reading, and write short summaries in your own words. For critical analysis, ask about author purpose, assumptions, and evidence quality.

Practice by summarizing paragraphs in one sentence and identifying the author's thesis and supporting structure.`,
        examples: [
          {
            title: "Example — Previewing",
            problem: "Before reading an article, what to note?",
            solution: "Look at title, headings, abstract/intro to predict main ideas and to set reading goals",
            steps: ["Formulate questions you want answered while reading"]
          },
          {
            title: "Example — Annotation strategy",
            problem: "How to mark a text effectively?",
            solution: "Highlight main ideas sparingly, write margin notes to paraphrase, underline key evidence",
            steps: ["Avoid highlighting everything; be selective"]
          },
          {
            title: "Practice — Summary",
            problem: "Summarize a short passage in one sentence",
            solution: "Identify topic sentence and condense to essential claim",
            steps: ["Paraphrase concisely"]
          }
        ],
        quiz: [{ q: "What is the first step in active reading?", a: "Preview the text (titles, headings, intro) to get an overview" }]
      },

      // 6 Note-taking Systems
      {
        explanation:
`Cornell notes split page into cue column, notes, and summary: take notes in main area, write key questions in cue column, and summarise at bottom. Mind maps show relationships visually. After class, convert notes into recall questions and flashcards for spaced review.

Practice transforming a lecture into 5 flashcards to reinforce active recall.`,
        examples: [
          {
            title: "Example — Cornell",
            problem: "How to process notes into study questions?",
            solution: "After class, read notes, write 5 questions in left cue column that test key ideas, summarize main idea at bottom",
            steps: ["Turn headings into questions and add to flashcard deck"]
          },
          {
            title: "Example — Mind map usage",
            problem: "Outline a complex topic (e.g., cell biology)",
            solution: "Put central topic in middle, draw branches for organelles, functions, and interactions",
            steps: ["Use visuals to connect related concepts"]
          },
          {
            title: "Practice — Flashcard creation",
            problem: "Create Q/A for 'what is PCR?'",
            solution: "Q: What are main PCR steps? A: Denaturation, annealing, extension",
            steps: ["Keep Q concise and answer precise"]
          }
        ],
        quiz: [{ q: "What is the purpose of the summary section in Cornell notes?", a: "To condense key points into a short reviewable statement" }]
      },

      // 7 Academic Integrity & Referencing
      {
        explanation:
`Academic integrity is essential: always cite sources to avoid plagiarism. Paraphrase properly by changing sentence structure and citing source. Use consistent referencing style (APA, MLA, Chicago) as required. Plagiarism detection tools flag verbatim copying; learn to quote sparingly and cite everything that isn't common knowledge or your original idea.

Practice writing a short paraphrase and add a proper citation.`,
        examples: [
          {
            title: "Example — Paraphrase vs quote",
            problem: "How to paraphrase a sentence about climate change?",
            solution: "Read, internalize, then rewrite in your own words and cite original author and year",
            steps: ["Change structure, use different vocabulary, include citation"]
          },
          {
            title: "Example — In-text citation APA",
            problem: "Cite a 2020 article by Smith in-text",
            solution: "(Smith, 2020)",
            steps: ["Include full citation in reference list with author, year, title, journal"]
          },
          {
            title: "Practice — Reference entry",
            problem: "Format a journal article in APA",
            solution: "Author(s). (Year). Title. Journal, volume(issue), pages.",
            steps: ["Follow punctuation and order exactly"]
          }
        ],
        quiz: [{ q: "Why cite sources?", a: "To give credit, allow verification, and avoid plagiarism" }]
      }
    ]
  },

  // Second Semester
  {
    Session: "Second Semester",
    Topics: [
      "Research skills & source evaluation",
      "Presentation skills: slide design & delivery",
      "Professional writing: CVs, emails & reports",
      "Exam strategies & stress management",
      "Advanced reading & argument analysis",
      "Group work & collaboration techniques",
      "Digital literacy & evaluating online sources",
      "Career preparation & interview basics"
    ],
    Content: [
      {
        explanation:
`Second semester focuses on practical academic and professional skills: research (forming search queries, using academic databases), presentation (clear slides, practiced delivery), professional communication (concise emails, CV tailoring) and exam technique (practice exams, time allocation). Evaluate online sources for authority, accuracy and bias before using them as references.

Practice by designing a presentation outline, building slides with one main idea each, and rehearsing aloud.`,
        examples: [
          {
            title: "Example — Research query",
            problem: "How to find peer-reviewed articles on renewable energy storage?",
            solution: "Use academic databases (Google Scholar, JSTOR), refine with boolean operators: \"renewable energy\" AND \"energy storage\" AND \"battery\"; filter peer-reviewed and recent years",
            steps: ["Choose keywords, use filters, evaluate abstracts"]
          },
          {
            title: "Example — Slide design",
            problem: "What makes a good slide?",
            solution: "One idea per slide, minimal text, clear headline, use visuals (graphs) and readable fonts",
            steps: ["Avoid clutter and read slides aloud in rehearsal"]
          },
          {
            title: "Practice — Mock interview",
            problem: "Prepare STAR answers for 'Tell me about a time you led a team.'",
            solution: "Situation, Task, Action, Result structure; rehearse for clarity",
            steps: ["Outline each part and practice concise delivery"]
          }
        ],
        quiz: [{ q: "What checklist to use for source evaluation?", a: "CRAAP: Currency, Relevance, Authority, Accuracy, Purpose" }]
      }
    ]
  }
];

export default function Gst({ semester }) {
  return <LessonPlayer courseLabel="GST 101 (Study Skills & English)" courseContent={GstContent} semester={semester} />;
}

