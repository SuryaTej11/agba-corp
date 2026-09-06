/**
 * Static page copy.
 *
 * Everything already on agbacorp.com is reproduced verbatim; new sections are
 * marked. Components are content-agnostic — edit here, not in the JSX.
 *
 * (Dynamic content — batches, documents, testimonials, news — lives in
 * the database and is edited from /admin instead.)
 */

/* ============================================================== HOME ==== */

export const HERO = {
  eyebrow: "Rebar Coupler · IS 16172:2023",
  titleTop: "BUILD WITH",
  titleAccent: "TRUST.",
  titleBottom: "BUILD WITH AGBA.",
  lede: "Precision parallel-thread rebar couplers — forged before threaded, 100% gauge-checked and NABL tested. A splice that develops full tensile equivalence with the parent bar.",
  stats: [
    { value: "Ø12–40", unit: "", label: "mm bar range" },
    { value: "Class L & H", unit: "", label: "IS 16172:2023" },
    { value: "25", unit: "%", label: "slimmer wall", count: 25 },
    { value: "100", unit: "%", label: "gauge-checked", count: 100 },
  ],
} as const;

/** NEW — the prominent certification brandmark strip. */
export const CERTIFICATIONS = {
  eyebrow: "Certification & Compliance",
  title: "CERTIFIED TO THE STANDARDS THAT MATTER",
  lede: "Every AGBA coupler is manufactured and independently tested to national and international standards, with a NABL test certificate shipped on every single batch. The proof travels with your order.",
  marks: [
    {
      kind: "standard" as const,
      title: "IS 16172:2023",
      subtitle:
        "Couplers for mechanical splicing of bars — Class L & H, the governing Indian standard.",
    },
    {
      kind: "iso" as const,
      title: "ISO 9001:2015",
      subtitle:
        "Certified quality management system across manufacturing and dispatch.",
    },
    {
      kind: "safety" as const,
      title: "ISO 45001:2018",
      subtitle:
        "Occupational health & safety management certification at our works.",
    },
    {
      kind: "lab" as const,
      title: "NABL Tested",
      subtitle:
        "Independent lab testing with a signed test certificate on every batch.",
    },
  ],
} as const;

/** NEW — "What is a Coupler?" */
export const WHAT_IS = {
  eyebrow: "The Basics",
  title: "WHAT IS A COUPLER?",
  lede: "A rebar coupler is a threaded steel sleeve that joins two reinforcement bars end to end, so the join carries load as though the bar were continuous. It replaces the lap splice — the older method of simply overlapping two bars and trusting the concrete between them.",
  points: [
    {
      title: "It joins bar to bar, directly",
      body: "The load passes through steel threads in contact, not through the concrete surrounding an overlap. The splice behaves like the parent bar.",
    },
    {
      title: "The length is fixed",
      body: "A lap splice needs 40–60 bar diameters of overlap. A mechanical splice is a fixed short length, regardless of concrete grade or cover.",
    },
    {
      title: "It uncrowds the cage",
      body: "No doubled-up bars at column-beam junctions — exactly where congestion, honeycombing and vibrator access are already worst.",
    },
    {
      title: "It is verifiable",
      body: "Every coupler is gauged, every batch is tested, and the certificate ties back to the heat number of the steel it was forged from.",
    },
  ],
  spliceCaption:
    "Lap splice against mechanical splice, drawn at the same scale on the same bar.",
} as const;

export const FORGED = {
  eyebrow: "Why IS 16172 asks for the forge",
  title: "FORGED BEFORE THREADED",
  lede: "A splice depends on two halves — a cold-forged bar end and a precision-engineered coupler. In a high-rise column, both carry the load. Cut threads straight into the bar and you sever the grain at every root, reducing the load-bearing section. AGBA upsets the bar end first, so the net section is preserved and grain flows through the threads.",
  cards: [
    {
      variant: "machined" as const,
      title: "Machined — grain cut",
      body: "Threads cut into the bar. Cross-section reduced, grain severed — the coupler thread strips under load.",
    },
    {
      // The live site duplicates the "machined" card here by mistake. This is
      // the comparison it was always meant to be.
      variant: "forged" as const,
      title: "AGBA — grain preserved",
      body: "The bar end is cold-upset before threading. The original section is retained and grain flows around the thread form, so the splice fails in the parent bar, not the join.",
    },
  ],
} as const;

export const SLIM_WALL = {
  eyebrow: "Slimmer wall, stronger outcome",
  title: "25% SLIMMER WALL",
  lede: "AGBA couplers meet IS 16172 on thread engagement, tensile and fatigue performance — then go further. A 7.75 mm wall on a 32 mm bar versus a conventional 10–12 mm means engineered clearance, built to pour.",
  benefits: [
    "Lower honeycombing",
    "Better concrete flow",
    "Cost & schedule saving",
    "Better vibrator access",
    "Better cover & finish",
    "Maintains clear cover at the splice",
  ],
} as const;

export const PRODUCTS = {
  eyebrow: "Products & Services",
  title: "EVERYTHING A MECHANICAL SPLICE NEEDS",
  lede: "From the certified coupler to on-site forging, lab certification and pan-India dispatch — one accountable source for the whole connection.",
  items: [
    {
      icon: "coupler",
      title: "Parallel-Thread Coupler",
      body: "The core product — IS 16172:2023 Class L & H certified for Fe 500D/550D rebar across Ø12–40 mm.",
    },
    {
      icon: "forge",
      title: "Cold-Forging Service",
      body: "On-site bar-end upset forging and threading with gauge-verified output on every bar.",
    },
    {
      icon: "range",
      title: "Full Size Range",
      body: "Engineered couplers across all standard industry sizes — each one checked and verified.",
    },
    {
      icon: "lab",
      title: "Lab Certification",
      body: "A NABL-accredited independent test certificate ships with every single batch.",
    },
    {
      icon: "dispatch",
      title: "Pan-India Dispatch",
      body: "Direct-to-site logistics from Butibori MIDC, Nagpur, with full technical support.",
    },
    {
      icon: "gauge",
      title: "Go / No-Go QC",
      body: "Every coupler plug-gauged. Failures are scrapped — never reworked. No sampling.",
    },
  ],
} as const;

export const PROCESS = {
  eyebrow: "Butibori MIDC, Nagpur",
  title: "MADE AT SOURCE. TESTED AT EVERY STEP.",
  lede: "Six controlled stages from steel intake to dispatch — with quality verification built into each one, not bolted on at the end.",
  stages: [
    {
      no: "01",
      tag: "Intake QC",
      title: "Steel Intake",
      body: "Tested pipe. Heat number logged and carried with the batch to dispatch.",
    },
    {
      no: "02",
      tag: "Dimension Check",
      title: "Raw Material Cutting",
      body: "Pipe cut to required sizes and dimensionally verified.",
    },
    {
      no: "03",
      tag: "Plug Gauge",
      title: "Thread Cutting",
      body: "Parallel thread to IS 16172 Annex G. Pitch, form & depth gauge-verified.",
    },
    {
      no: "04",
      tag: "100% Check",
      title: "Go / No-Go",
      body: "Every coupler gauged. Fails are scrapped, not reworked. No sampling.",
    },
    {
      no: "05",
      tag: "Certified",
      title: "NABL Testing",
      body: "Every batch tested at a NABL-approved lab; certificate ships with the consignment.",
    },
    {
      no: "06",
      tag: "Pan-India",
      title: "BIS Marking & Dispatch",
      body: "Lot code, class and grade marked. Direct-to-site across India.",
    },
  ],
} as const;

/* ============================================================= ABOUT ==== */

export const ABOUT = {
  hero: {
    eyebrow: "About AGBA",
    title: "MADE AT SOURCE. TESTED AT EVERY STEP.",
    lede: "AGBA Corporation is a Nagpur-based manufacturer of precision parallel-thread rebar couplers. From our works at Butibori MIDC, we produce, gauge-check and certify every coupler in-house, then dispatch direct to site across India.",
    body: "We started from a simple conviction: a mechanical splice should be as trustworthy as the bar it joins. That means forging before threading, holding clear cover with slim-wall geometry, and putting independent test data in every box. Build with trust. Build with AGBA.",
  },
  stats: [
    { value: "Class L & H", label: "IS 16172:2023 certified across the range" },
    { value: "Ø12–40 mm", label: "Full standard size range, Fe 500D / 550D" },
    { value: "100%", label: "Couplers gauge-checked — no sampling" },
    { value: "Pan-India", label: "Direct-to-site dispatch from Nagpur" },
  ],
  principles: {
    eyebrow: "What we stand for",
    title: "OUR PRINCIPLES",
    items: [
      {
        title: "Integrity",
        body: "We engineer the whole connection — both halves of the splice — and stand behind every lot with independent data.",
      },
      {
        title: "Precision",
        body: "Gauge-verified threads, slim-wall geometry and 100% checking. No sampling, no shortcuts, no rework.",
      },
      {
        title: "Accountability",
        body: "Heat-number traceability and a certificate per batch mean every coupler can be verified from cage to closeout.",
      },
      {
        title: "Site-first thinking",
        body: "Our geometry is tuned for the realities of a congested cage — cleaner pours, fewer NCRs, lower cost.",
      },
    ],
  },
} as const;

/**
 * NEW — Knowledge Center. This is the section the client asked to have
 * renamed from "Understanding the Code"; no such section exists on the live
 * site yet, so it is written here from scratch. Two tabs, as specified.
 */
export const KNOWLEDGE = {
  eyebrow: "Knowledge Center",
  title: "UNDERSTANDING THE CODE",
  lede: "The standard, and the site practice that follows from it — written for the people who have to specify, install and sign off a mechanical splice.",
  tabs: [
    {
      id: "standard",
      label: "Understanding IS 16172:2023",
      intro:
        "IS 16172 is the Indian standard governing couplers for mechanical splicing of bars. The 2023 revision tightened thread form and residual slip requirements. These are the clauses that decide what you can specify.",
      blocks: [
        {
          title: "Class L and Class H — what separates them",
          body: "Both classes must develop the specified tensile strength of the parent bar. Class H additionally satisfies the tighter residual-slip limit and the fatigue requirement, which is what makes it the class to specify for seismic and dynamically loaded structures. AGBA manufactures both, and the class is marked on the coupler.",
        },
        {
          title: "Tensile equivalence, not just tensile strength",
          body: "The test that matters is where the assembly fails. A compliant splice fails in the parent bar, outside the coupler — never at the thread. That result, not a headline number, is what the certificate records.",
        },
        {
          title: "Residual slip",
          body: "After a specified load cycle, the permanent movement across the splice is measured. Slip is what turns a compliant lab result into a crack width on site, which is why the 2023 revision tightened it.",
        },
        {
          title: "Annex G — the thread form",
          body: "The parallel thread form is dimensioned in Annex G: pitch, flank angle and thread depth. All three are gauge-verified rather than measured by sample, which is why every AGBA coupler passes a go/no-go plug gauge.",
        },
        {
          title: "What to write into a specification",
          body: "Name the standard and the year, the class, the bar grade and the diameter range — for example: “Mechanical splices to IS 16172:2023, Class H, for Fe 500D rebar, Ø16–32 mm, with an independent NABL test certificate per batch.”",
        },
      ],
    },
    {
      id: "site",
      label: "Coupler Selection & Site Guide",
      intro:
        "Selecting the size is the easy part. These are the steps and the mistakes that decide whether the splice performs the way the certificate says it will.",
      blocks: [
        {
          title: "Sizing",
          body: "Match the coupler to the bar diameter and grade, not to the previous order. AGBA supplies Ø12, 16, 20, 25, 28, 32, 36 and 40 mm for Fe 500D and Fe 550D. The full size, thread and torque chart is in Downloads.",
        },
        {
          title: "Installation sequence",
          body: "Square saw-cut the bar end — never flame cut. Cold-upset the end and confirm the upset against the gauge. Thread to the marked length. Check with the go/no-go ring gauge. Hand-tighten, then torque to the value for the size.",
        },
        {
          title: "The witness mark",
          body: "Each bar end is marked at the correct engagement depth. After tightening, the mark must be fully covered at both ends of the coupler. A visible witness mark means the engagement is short — back it out and re-make the joint.",
        },
        {
          title: "Common site errors",
          body: "Flame-cut bar ends that lose temper; threading without upsetting first; reusing a coupler that has been torqued and released; and staggering splices without checking the drawing. All four are avoidable and all four show up in testing.",
        },
        {
          title: "What to keep for handover",
          body: "The batch number stamped on the coupler, and the NABL certificate issued for that batch. Both are recoverable at any time from Find Your Coupler — enter the number and the certificate comes back.",
        },
      ],
    },
  ],
} as const;

/* ====================================================== FIND YOUR COUPLER = */

export const TRACE = {
  eyebrow: "Find Your Coupler · Batch Traceability",
  title: "VERIFY YOUR BATCH",
  lede: "Every AGBA coupler carries a batch number stamped at manufacture. Enter it below to instantly trace the raw-material heat number, bar grade and size — full mill-to-pour accountability for the exact join in your structure.",
  sampleHint: "AGB-2504-0187",
  steps: {
    eyebrow: "Find Your Coupler · Traceability",
    title: "FROM HEAT NUMBER TO YOUR POUR",
    items: [
      {
        title: "Stamped at source",
        body: "Each coupler is marked with a unique batch number tied to the steel heat it was forged from.",
      },
      {
        title: "Logged in our system",
        body: "Batch ↔ heat number, grade, size and test data are recorded for every production lot.",
      },
      {
        title: "Verified by you",
        body: "Enter the batch number here anytime to confirm origin, then request the signed certificate.",
      },
    ],
  },
  cantFind: {
    title: "Can't find your batch?",
    body: "Send us the number stamped on your coupler and our QC team will trace the heat number and certificate for you — usually within one working day.",
  },
  downloads: {
    eyebrow: "Downloads",
    title: "DRAWINGS, DATA SHEETS & CERTIFICATES",
    lede: "Technical documentation for engineers, contractors and distributors. Tell us who you are once, and every document on this page unlocks.",
  },
} as const;

/* =========================================================== CONTACT ==== */

export const CONTACT_PAGE = {
  eyebrow: "Contact",
  title: "LET'S SPEC YOUR CONNECTION",
  lede: "Send us your bar grade, diameter range and quantity. Our technical team responds with sizing, test certificates and a quote — usually within one working day.",
} as const;

/* ============================================================== CTA ===== */

export const CTA_BAND = {
  title: "Let's build something that holds",
  body: "Whether you're a contractor, consultant or distributor, our team is ready with sizing, certificates and pricing.",
} as const;

/* ========================================================= ATS SYSTEM ==== */

/**
 * The AGBA Thread System page. Copy is reproduced verbatim from the reference
 * build the client supplied (agbaweb.netlify.app/ats) — do not paraphrase it.
 */
export const ATS = {
  hero: {
    eyebrow: "ATS System",
    title: "THE COUPLER IS THE EASY HALF",
    lede: "A connection is a system, not a component. The AGBA Thread System is our name for engineering all of it — bar end, upset, thread, tooling, coupler, gauges and fitting — as one thing, which is why we supply both halves.",
  },

  principle: {
    eyebrow: "Principle One",
    title: "A CONNECTION IS ONLY AS GOOD AS ITS LEAST CONTROLLED PROCESS",
    lede: "The chain does not care which link was set badly. Any single process, done poorly, sets the strength of the whole connection.",
    chain: ["Steel", "Upset", "Thread", "Tooling", "Coupler", "Gauging", "Fitting"],
    points: [
      {
        title: "A coupler cannot rescue a poor thread",
        body: "The coupler is the easiest part of a connection to certify and the least able to make up for the rest. A Standard Mark on the sleeve says nothing about the thread cut into the bar it is joining.",
      },
      {
        title: "A thread cannot rescue a bar that was never upset",
        body: "Thread a bar that was never cold forged and the finest thread form in the world has been cut into a section that has already lost a fifth of its area.",
      },
    ],
  },

  coldForging: {
    eyebrow: "Cold Forging",
    title: "CUT A THREAD ON A BARE BAR AND YOU CUT THE BAR",
    lede: "A thread is not added to steel — it is carved out of it. The only question is whether the metal was put back first. IS 16172:2023 Annex G-2(b) requires the bar end to be hydraulically enlarged by cold forging before any thread is cut.",
    cards: [
      {
        bad: true,
        title: "Threaded without cold forging",
        spec: "Ø32 bar · thread cut directly · M32 × 3.5",
        figure: "80%",
        figureLabel: "of parent bar section at the thread root",
        body: "One fifth of the bar machined away. The connection cannot reach 130% of yield, and it fails at the threads — brittle, inside the coupler, where nobody can see it.",
      },
      {
        bad: false,
        title: "Cold forged, then threaded",
        spec: "Ø32 bar · end upset, then threaded · M36 × 3.5",
        figure: "104%",
        figureLabel: "of parent bar section at the thread root",
        body: "Metal is displaced outward before any cutting begins. The threaded section is stronger than the bar, so failure is forced back into the parent bar.",
      },
    ],
    table: {
      head: [
        "Bar",
        "Parent area",
        "Threaded directly",
        "% of bar",
        "Cold forged, then threaded",
        "% of bar",
      ],
      rows: [
        ["20 mm", "314 mm²", "M20 × 2.5 · 245 mm²", "77.9%", "M24 × 3.0 · 353 mm²", "112.2%"],
        ["25 mm", "491 mm²", "M25 × 3.0 · 387 mm²", "78.8%", "M29 × 3.5 · 519 mm²", "105.8%"],
        ["32 mm", "804 mm²", "M32 × 3.5 · 648 mm²", "80.5%", "M36 × 3.5 · 841 mm²", "104.5%"],
      ],
    },
    note: "Stress area on ISO metric basis, As = π/4 · ((d₂+d₃)/2)². Cold forging applies to the rebar end only — AGBA couplers are machined from special alloy tube, never forged.",
  },

  thread: {
    eyebrow: "The Thread",
    title: "EVERY MILLIMETRE HAS A PURPOSE",
    lede: "IS 16172:2023 places no constraint on thread form. That freedom is where the difference between one coupler and another actually lives — so we treat the thread as a designed feature, not a copied one.",
    table: {
      head: ["Dimension", "What it is set for"],
      rows: [
        ["Root radius", "Fatigue resistance — a radiused root carries a connection through load reversal; a sharp one is where a crack starts"],
        ["Pitch", "Load distribution along the engaged threads"],
        ["Engagement length", "Strength transfer from bar to coupler"],
        ["Outside diameter", "Concrete flow and cover at the connection plane"],
        ["Chamfer", "Installation without cross-starting the thread"],
      ],
    },
    note: "A radius is only worth what the tooling actually forms. AGBA controls it as a drawing feature, gauges it, and audits sectioned couplers against it.",
    caption: "The connection in place · bar, thread, coupler, thread, bar",
  },

  otherHalf: {
    eyebrow: "The Other Half",
    title: "MADE ON YOUR SITE, BY OUR PEOPLE",
    lede: "AGBA deploys cold forging and threading machines with trained technicians, so the bar end and the coupler come out of the same quality system.",
  },
} as const;

/* =================================================== MACHINE SERVICES ==== */

/** Verbatim from the reference build (agbaweb.netlify.app/machine-services). */
export const MACHINE_SERVICES = {
  hero: {
    eyebrow: "Machine Services",
    title: "WE MAKE BOTH HALVES OF THE CONNECTION",
    lede: "Most suppliers sell the coupler and leave the bar end to whoever the contractor hires. AGBA deploys the cold forging and threading machines, the tooling, the gauges and the technicians — so one quality system covers the whole connection.",
  },

  deploy: {
    eyebrow: "What We Deploy",
    title: "MACHINES, TOOLING, AND THE PEOPLE TO RUN THEM",
    cards: [
      {
        kicker: "Cold forging",
        title: "Hydraulic upsetting",
        body: "The bar end is enlarged so the section after threading is not less than the parent bar. Single pass — double forging is not permitted by the standard.",
      },
      {
        kicker: "Threading",
        title: "Parallel thread",
        body: "Cut into the upset region only, to the designed length and depth for the size, using AGBA tooling matched to the coupler.",
      },
      {
        kicker: "Technicians",
        title: "Trained to the process",
        body: "Operators who know the clause, not just the machine. Gauging and proof loading are part of the job, not an extra.",
      },
    ],
    photoSlot: "Photographs of the machines on site — to be added",
  },

  models: {
    eyebrow: "Service Models",
    title: "THREE WAYS TO WORK WITH US",
    lede: "Which one suits depends on the size of the contract, the duration, and whether the bar is being processed in a yard or at the face.",
    options: [
      {
        title: "On-site deployment",
        body: "Machines stationed at your site for the duration of the contract, with our technician.",
        points: [
          "Machines and tooling supplied",
          "Technician deployed",
          "Monthly basis",
          "Suits sustained volume",
        ],
      },
      {
        title: "Mobile van service",
        body: "A van with the machines mounted, visiting on a scheduled day to process what is ready.",
        points: [
          "No machine on your site",
          "Booked by the day",
          "Suits intermittent volume",
          "Vidarbha and nearby",
        ],
      },
      {
        title: "Machine rental",
        body: "Machines and tooling on rent where you have your own trained operator.",
        points: [
          "Monthly rental",
          "Tooling supplied and consumed",
          "Servicing by AGBA",
          "Operator training available",
        ],
      },
    ],
    note: "Cold forging and threading are quoted as one combined rate per joint. Rates depend on bar size, volume and location — tell us the contract and we will quote it.",
  },

  onSite: {
    eyebrow: "On Site",
    title: "WHAT HAPPENS TO EVERY BAR END",
    lede: "The five steps of IS 16172:2023 Annex G-2, carried out and recorded. A manufacturer may add to them; nobody may subtract.",
    steps: [
      { no: "01", title: "Sawn cut", body: "Square to the axis. Disc cutting and gas cutting are named and excluded by the standard." },
      { no: "02", title: "Cold forge", body: "Hydraulically upset so the section after threading is not less than the parent bar." },
      { no: "03", title: "Thread", body: "Parallel thread cut into the upset region only, to the designed length and depth." },
      { no: "04", title: "Gauge", body: "GO and NO-GO on every end. A failed thread is cut off and the bar reprocessed." },
      { no: "05", title: "Proof load", body: "Loaded to 80% of specified yield and machine punched on passing." },
    ],
    note: "Threads are capped and protected until the next bar is offered up. A signed service slip is raised for every visit, with quantities by size, for your records and ours.",
  },
} as const;

/**
 * The Company section, taken from the client's reference build at
 * agbaweb.netlify.app/company and reproduced **verbatim** — the client asked
 * for it word for word, so do not reword or re-punctuate it.
 *
 * The reference page's `#enquiry` section is deliberately not here: the client
 * asked for everything except the enquiry, and the works/office/contact blocks
 * on that page sit inside `#enquiry`, so they are excluded with it. Our own
 * contact details already live in `CONTACT` in lib/site.ts.
 */
export const COMPANY = {
  intro: {
    eyebrow: "Company",
    title: "MADE IN NAGPUR, TO THE STANDARD",
    lede: "AGBA Corporation manufactures parallel-thread mechanical rebar couplers at C-94, MIDC Butibori, under BIS Licence CM/L-7400091707. We supply the couplers, and we deploy the machines and technicians that prepare the bar ends they join.",
    cards: [
      {
        kicker: "Both halves",
        title: "Coupler and bar end",
        body: "Cold forging and threading machines with trained technicians, so one quality system covers the whole connection.",
      },
      {
        kicker: "Traceable",
        title: "Marking to mill heat",
        body: "Batch and heat traceability from raw tube to despatch, recorded and retrievable against the marking on the coupler.",
      },
      {
        kicker: "Local",
        title: "Nagpur based",
        body: "Technical support, replacement stock and a site visit are a drive away, not a courier away.",
      },
    ],
  },
  credentials: {
    eyebrow: "Credentials",
    title: "LICENCE, CERTIFICATION AND REGISTRATION",
    rows: [
      ["BIS Licence", "CM/L-7400091707 — IS 16172:2023, Class L and Class H"],
      ["ISO 9001:2015", "GACB9028 — quality management, valid to April 2029"],
      ["ISO 45001:2018", "GACB9027 — occupational health and safety, valid to April 2029"],
      ["GSTIN", "27ACHFA9560G1Z6"],
      ["PAN", "ACHFA9560G"],
      ["UDYAM", "MH-20-0285831 — Micro enterprise"],
    ],
    affiliations: {
      title: "AFFILIATIONS & MEMBERSHIPS",
      rows: [["Indian Concrete Institute", "Organisational Member"]],
    },
    note: "Membership listed separately from the BIS licence and ISO certificates, as affiliation and certification are different things.",
  },
  works: {
    eyebrow: "The works",
    title: "C-94, MIDC BUTIBORI",
    body: "Tube inward with heat number logged, cutting, machining, threading, 100% GO / NO-GO gauging, batch marking and despatch — with a test certificate against every lot.",
  },
} as const;
