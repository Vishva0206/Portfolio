export type SocialLink = {
  id: string;
  label: string;
  href: string;
};

export type Skill = {
  name: string;
  category:
    | "Languages"
    | "Frontend"
    | "Backend"
    | "Databases"
    | "Tools"
    | "Practices";
};

export type Project = {
  slug: string;
  title: string;
  description: string;
  problem: string;
  solution: string;
  role: string;
  technologies: string[];
  featured: boolean;
  status: string;
  outcome?: string;
  lessonsLearned?: string;
  liveUrl?: string;
  sourceUrl?: string;
  category: "Production" | "Personal";
};

export const personalInfo = {
  name: "Vishva N R",
  initials: "VN",
  role: "Full Stack Software Developer",
  greeting: "Hello, I’m Vishva",
  shortBio:
    "I ship full-stack web applications — production features, fixes, and independent products from catalog to checkout.",
  longBio:
    "Full stack developer skilled across React, Node.js, Java, JavaScript, and Perl. I work inside a large-scale SaaS codebase — troubleshooting production issues, shipping enhancements, and keeping critical customer workflows stable — and I build full-stack products independently. Completed MCA in April 2024.",
  location: "Sirkali, Mayiladuthurai, Tamil Nadu",
  email: "vishva2002nr@gmail.com",
  phone: "8925053848",
  phoneHref: "tel:+918925053848",
  emailHref: "mailto:vishva2002nr@gmail.com",
  profileImage: "/profile.jpg",
  resumeUrl: "/Vishva_NR_Resume.pdf",
  resumeFileName: "Vishva_NR_Resume.pdf",
  availability: "Open to full stack software engineering roles",
  highlights: [
    "React · Node.js",
    "Java · JavaScript · Perl",
    "Production SaaS experience",
  ],
  currentlyFocusing:
    "Production SaaS features and full-stack React/Node work, with a focus on clean interfaces and reliable APIs.",
};

export const socials: SocialLink[] = [
  // Rendered in the footer. Add another entry with { id, label, href } and it shows up.
  { id: "github", label: "GitHub", href: "https://github.com/Vishva0206" },
  // { id: "linkedin", label: "LinkedIn", href: "https://linkedin.com/in/<handle>" },
];

export const nav = [
  { href: "#home", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#projects", label: "Projects" },
  { href: "#experience", label: "Experience" },
  { href: "#contact", label: "Contact" },
] as const;

export const skills: Skill[] = [
  // Languages — things you actually write syntax in.
  { name: "Java", category: "Languages" },
  { name: "JavaScript", category: "Languages" },
  { name: "Perl", category: "Languages" },
  { name: "SQL", category: "Languages" },
  // Frontend — runs in the browser.
  { name: "React", category: "Frontend" },
  // Backend — server-side runtimes and frameworks.
  { name: "Node.js", category: "Backend" },
  // Databases — specific products, not query languages.
  { name: "MongoDB", category: "Databases" },
  // Tools — version control, OS, and ways of working.
  { name: "Git & GitHub", category: "Tools" },
  { name: "Perforce", category: "Tools" },
  { name: "Linux", category: "Tools" },
  { name: "Agile / Scrum", category: "Practices" },
];

export const projects: Project[] = [
  {
    slug: "sports-equipment",
    title: "Sports Product Equipment Platform",
    description:
      "Full-stack e-commerce platform for sports equipment using the MERN stack.",
    problem:
      "Buyers need a straightforward way to discover and purchase sports equipment without a tangled checkout.",
    solution:
      "Broke the application into modular components that independently handle catalog, cart, and checkout.",
    role: "Independent full-stack builder",
    technologies: ["MongoDB", "Express.js", "React", "Node.js"],
    featured: false,
    status: "In progress (Jan 2024 – Present)",
    category: "Personal",
  },
  {
    slug: "hunk-fitness",
    title: "Hunk Fitness Studio - Landing Page",
    description:
      "Animated single-page marketing site for a gym, with a membership form wired to the studio's inbox.",
    problem:
      "The studio needed a browsing experience that works comfortably on phones and laptops, and a way to collect sign-ups without running a server.",
    solution:
      "Built a responsive React landing page with scroll-triggered motion, a plans section driven by plain data files, and a signup form that posts through a transactional email service.",
    role: "Independent frontend developer",
    technologies: [
      "JavaScript",
      "React",
      "Framer Motion",
      "EmailJS",
      "Cloudflare Pages",
    ],
    featured: false,
    status: "Shipped",
    liveUrl: "https://fitness-studio.pages.dev/",
    sourceUrl: "https://github.com/Vishva0206/Hunk_Fitness_Studio",
    category: "Personal",
  },
];

export const experience = [
  {
    title: "Software Engineer",
    company: "CitiusTech Healthcare Technology Pvt. Ltd.",
    dates: "Apr 2024 – Present",
    extra: "Client project: AthenaHealth (athenaOne) — contractor since Jun 2024",
    responsibilities: [
      "Manage and enhance Patient Payment and Insurance workflow features on athenaOne using Perl and React.",
      "Maintain and upgrade eligibility-verification functionality using EDI 270 and 271 transaction sets.",
      "Troubleshoot and fix production bugs in payment and eligibility modules, and deliver enhancements.",
      "Work within a large-scale SaaS codebase spanning billing, insurance, and data-exchange standards.",
    ],
    technologies: ["Perl", "React", "JavaScript", "EDI 270/271", "X12"],
  },
];

export const education = [
  {
    credential: "Master of Computer Applications (MCA)",
    school: "Kongu Engineering College",
    year: "2024",
    score: "81.8%",
  },
  {
    credential: "Bachelor of Computer Applications (BCA)",
    school: "PSG College of Arts & Science",
    year: "2022",
    score: "78.44%",
  },
  {
    credential: "HSC",
    school: "Vivekananda Matriculation Higher Secondary School",
    year: "2019",
    score: "70.6%",
  },
  {
    credential: "SSLC",
    school: "Vivekananda Matriculation Higher Secondary School",
    year: "2017",
    score: "87.6%",
  },
];

export const certifications = [
  {
    title: "Top 10 finish, CitiusTech Hackathon",
    detail:
      "HL7/X12-to-FHIR conversion engine (embedding-based mapping, ~700ms per message).",
  },
  {
    title: "NCC ‘B’ Certificate",
    detail: "National Cadet Corps — B certificate.",
  },
];
