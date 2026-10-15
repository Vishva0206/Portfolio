export const profile = {
  name: "Vishva N R",
  first: "Vishva",
  last: "N R",
  role: "Software Engineer",
  focus: "Healthcare Technology",
  location: "Sirkali, Mayiladuthurai, Tamil Nadu",
  email: "vishva2002nr@gmail.com",
  phone: "8925053848",
  phoneHref: "tel:+918925053848",
  emailHref: "mailto:vishva2002nr@gmail.com",
  availability: "Open to healthcare product engineering conversations",
  summary:
    "Software engineer working inside a large-scale US healthcare SaaS platform. I manage and enhance Patient Payment, Insurance, and Eligibility workflows on athenaOne — troubleshooting production issues and shipping upgrades across Perl and React. Growing focus on healthcare interoperability and X12/EDI data exchange.",
};

export const experience = {
  company: "CitiusTech Healthcare Technology Pvt. Ltd.",
  title: "Software Engineer",
  dates: "Apr 2024 – Present",
  engagement: "Client: AthenaHealth (athenaOne) — contractor since Jun 2024",
  bullets: [
    "Manage and enhance Patient Payment and Insurance workflow features on athenaOne using a combined Perl and React stack.",
    "Maintain and upgrade eligibility-verification using EDI 270 (inquiry) and 271 (response) transaction sets.",
    "Troubleshoot and fix production bugs in payment and eligibility modules, and deliver enhancements that improve stability.",
    "Work inside a large-scale healthcare SaaS codebase with direct exposure to US billing, insurance, and interoperability standards.",
  ],
};

export const skills = {
  languages: ["Java", "JavaScript", "Perl"],
  frameworks: ["React.js", "Node.js"],
  databases: ["MongoDB", "SQL"],
  tools: ["Git & GitHub", "Perforce"],
  practices: ["Agile / Scrum", "Linux"],
  domain: ["athenaOne", "EDI 270/271", "X12", "HL7", "FHIR", "Eligibility", "Patient Payments"],
};

export const projects = [
  {
    slug: "sports-equipment",
    title: "Sports Product Equipment Platform",
    dates: "Jan 2024 – Present",
    stack: ["MongoDB", "Express.js", "React.js", "Node.js"],
    summary:
      "A modular MERN e-commerce platform for sports equipment — catalog, cart, and checkout as independent surfaces so each flow can ship on its own cadence.",
    highlights: [
      "Catalog discovery with a product grid designed for scanning, not dumping SKUs.",
      "Cart and checkout isolated as modules so payment logic does not leak into browsing.",
      "End-to-end full-stack ownership from schema to UI.",
    ],
  },
  {
    slug: "hunk-fitness",
    title: "Hunk Fitness Studio",
    dates: "Personal",
    stack: ["React.js"],
    summary:
      "A responsive landing site for a fitness studio — dynamic layout, immersive browsing, and a mobile-first reading rhythm.",
    highlights: [
      "Responsive composition from phone to laptop without a separate codebase.",
      "Emphasis on motion that respects reduced-motion preferences.",
    ],
  },
];

export const education = [
  {
    school: "Kongu Engineering College",
    credential: "Master of Computer Applications (MCA)",
    year: "2024",
    score: "81.8%",
  },
  {
    school: "PSG College of Arts & Science",
    credential: "Bachelor of Computer Applications (BCA)",
    year: "2022",
    score: "78.44%",
  },
  {
    school: "Vivekananda Matriculation Higher Secondary School",
    credential: "HSC",
    year: "2019",
    score: "70.6%",
  },
  {
    school: "Vivekananda Matriculation Higher Secondary School",
    credential: "SSLC",
    year: "2017",
    score: "87.6%",
  },
];

export const achievements = [
  {
    title: "Top 10 — CitiusTech Hackathon",
    detail:
      "Team-built HL7/X12-to-FHIR conversion engine with embedding-based mapping (~700ms per message). Built the UI, implemented HL7/X12-to-FHIR parsing and mapping, and validated the pipeline against synthetic datasets.",
  },
  {
    title: "NCC ‘B’ Certificate",
    detail: "National Cadet Corps — B certificate.",
  },
];

export const nav = [
  { to: "/", label: "Index" },
  { to: "/work", label: "Work" },
  { to: "/projects", label: "Projects" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
] as const;
