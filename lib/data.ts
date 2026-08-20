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
    {
      // Deliberately empty. See components/ui/CertBadge.tsx — a certification
      // mark is never drawn before the licence is confirmed.
      kind: "reserved" as const,
      title: "ISI Mark",
      subtitle: "BIS licence pending confirmation.",
      note: "Reserved slot — the official ISI mark and CM/L licence number drop in here once issued.",
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
  lede: "AGBA couplers meet IS 16172 on thread engagement, tensile and fatigue performance — then go further. A 7.5 mm wall on a 32 mm bar versus a conventional 10–12 mm means engineered clearance, built to pour.",
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
