// All copy on the site lives here. Edit this file to update the portfolio.

export const profile = {
  name: "Hassan Ftouni",
  role: "Software engineer",
  location: "Beirut, Lebanon",
  timezone: "Asia/Beirut",
  email: "hassan.ftounne@gmail.com",
  phone: "+961 81 790 836",
  available: "Open to work & freelance",
  photo: "/hassanpro.jpeg",
  links: {
    github: "https://github.com/hassanftouni",
    linkedin: "https://www.linkedin.com/in/hassan-ftouni-2a9716269",
    freelancer: "https://www.freelancer.com/Hassanftouni",
  },
}

export const intro =
  "Full-stack developer working across Laravel, Django and React — currently building AI applications with RAG at Tabbiq AI."

export const about = [
  "I'm finishing my BSc in Computer Science at the Arab Open University in Beirut. Most of what I know, though, I learned by shipping: client projects since 2024, a cinema streaming platform and a real-time social app.",
  "Right now I'm an AI intern at Tabbiq AI, working with retrieval-augmented generation and Dify. This summer I went through the 42 Beirut Piscine — four weeks of C, Unix and peer review that sharpened how I debug.",
  "Before tech, I spent 2.5+ years in customer-facing work, leading a restaurant floor. It's why I care about clear communication and deadlines as much as clean code.",
]

export type Project = {
  title: string
  kind: string
  date: string
  description: string
  stack: string[]
  live?: string
  repo?: string
}

export const projects: Project[] = [
  {
    title: "Cinema City Beirut Souks",
    kind: "Streaming & booking platform",
    date: "Jan 2026",
    description:
      "A cinema platform with search and filters over a large catalogue, accounts and profiles, favourites, and detail pages with ratings, cast and trailers. Designed as a multi-tenant SaaS for cinemas in the region, with real-time booking.",
    stack: ["Next.js", "React", "Tailwind CSS", "Vercel"],
    live: "https://cinema-booking-platform.vercel.app",
    repo: "https://github.com/hassanftouni/cinema-booking-platform",
  },
  {
    title: "Garbage Lb",
    kind: "Real-time social web app",
    date: "Dec 2025 — Mar 2026",
    description:
      "Users post, like, comment and message each other in real time. Role-based access with a full admin dashboard for users, posts and activity. Built with the Youbee Academy team.",
    stack: ["Laravel", "Livewire", "WebSockets", "Tailwind CSS", "MySQL"],
  },
  {
    title: "AI fitness app",
    kind: "Web app",
    date: "Apr 2025",
    description:
      "Generates personalised workout plans, tips and images from a user's profile. Django REST API behind a Next.js front end, with auth, an admin dashboard and workout reminders.",
    stack: ["Next.js", "Django REST Framework", "Python", "Framer Motion"],
  },
  {
    title: "E-commerce store",
    kind: "Online shop",
    date: "Jan — Apr 2024",
    description:
      "Product listings, cart and checkout, with a Laravel and MySQL backend and API integrations for managing products.",
    stack: ["Laravel", "PHP", "MySQL", "JavaScript"],
    repo: "https://github.com/hassanftouni/laravel-ecommerce",
  },
  {
    title: "JavaScript study platform",
    kind: "Client work",
    date: "Freelance",
    description: "A study website for learning JavaScript, built for a client in Beirut. Delivered on time and on budget.",
    stack: ["JavaScript", "HTML", "CSS"],
  },
  {
    title: "PDF data extraction & integrations",
    kind: "Client work",
    date: "Freelance",
    description:
      "Extracting structured data from PDF documents and wiring it into the client's other systems. Turned into repeat work.",
    stack: ["Python", "Pandas", "REST APIs"],
  },
  {
    title: "Web scraping toolkit",
    kind: "Client work",
    date: "Freelance",
    description: "Scrapers that collect and clean data from websites, built for a repeat client.",
    stack: ["Python", "Selenium", "SQL"],
  },
]

export const skills: { group: string; items: string[] }[] = [
  { group: "Languages", items: ["PHP", "Python", "JavaScript", "Java", "C", "HTML & CSS"] },
  { group: "Frameworks", items: ["Laravel", "Livewire", "Django / DRF", "React", "Next.js", "Spring Boot"] },
  { group: "Data & AI", items: ["MySQL", "MongoDB", "SQL Server", "RAG", "Dify"] },
  { group: "Tools", items: ["Git & GitHub", "Tailwind CSS", "Vite", "Composer", "Vercel", "PowerShell"] },
]

// Words for the scrolling band between sections
export const marquee = ["Laravel", "Django", "React", "Next.js", "RAG", "Livewire", "MySQL", "C", "Python", "Tailwind"]

export type TimelineItem = {
  period: string
  title: string
  place: string
  note?: string
  logo?: string
}

export const experience: TimelineItem[] = [
  {
    period: "2026 — Now",
    title: "AI intern",
    place: "Tabbiq AI, Beirut",
    note: "Building AI applications with retrieval-augmented generation, and configuring and testing AI workflows in Dify.",
  },
  {
    period: "Jul — Aug 2026",
    title: "Piscine — software development trainee",
    place: "42 Beirut",
    logo: "/logos/42.svg",
    note: "Four intensive weeks of C, algorithms and Unix: pointers, memory management, data structures, Makefiles, timed exams and peer code review.",
  },
  {
    period: "2026",
    title: "IT & database support",
    place: "Orthopharma, Beirut",
    note: "Traced low disk space on a production Libra ERP server (SQL Server) to 22 GB of stale backups, then wrote a PowerShell cleanup that keeps the latest ones.",
  },
  {
    period: "Nov 2024 — Now",
    title: "Full-stack developer",
    place: "Freelance, remote",
    note: "Web apps, scrapers and data pipelines for clients, with several repeat clients.",
  },
]

export const education: TimelineItem[] = [
  { period: "2022 — 2026", title: "BSc Computer Science", place: "Arab Open University, Beirut", logo: "/logos/aou.png" },
  { period: "Cert.", title: "Full Stack Web Development", place: "Youbee.ai", logo: "/logos/youbee.png" },
  { period: "Cert.", title: "Fundamentals of Cyber Security", place: "Youbee.ai", logo: "/logos/youbee.png" },
  { period: "Cert.", title: "Machine Learning", place: "Analytics Vidhya" },
  { period: "Cert.", title: "Gemini Certified Educator", place: "Google for Education" },
  { period: "Lang.", title: "Arabic — native · English — B2", place: "Aptis, British Council" },
]

// Logos for the orbit section. `logo` is an image in /public; without one a monogram is shown.
export type OrbitItem = { name: string; logo?: string; round?: boolean }

export const orbitInner: OrbitItem[] = [
  { name: "42 Beirut", logo: "/logos/42.svg" },
  { name: "Tabbiq AI" },
  { name: "Youbee.ai", logo: "/logos/youbee.png" },
  { name: "Orthopharma" },
]

export const orbitOuter: OrbitItem[] = [
  { name: "Arab Open University", logo: "/logos/aou.png" },
  { name: "Ibrahim Dabees", logo: "/ibrahimdabeesimg.jpeg", round: true },
  { name: "Freelancer.com", logo: "/logos/freelancer.png" },
  { name: "Hadi Soufan", logo: "/hadisoufanimg.jpeg", round: true },
  { name: "Moussa Jafaar", logo: "/moussajafaarimg.jpg", round: true },
]

export const testimonials = [
  {
    quote:
      "Unbelievable knowledge and work rate. Hassan has excelled in everything I have asked him to do!",
    name: "Ibrahim Dabees",
    project: "PDF data extraction",
    avatar: "/ibrahimdabeesimg.jpeg",
  },
  {
    quote: "This is exactly what I was looking for, and delivered on time and on budget.",
    name: "Hadi Soufan",
    project: "JavaScript study platform",
    avatar: "/hadisoufanimg.jpeg",
  },
  {
    quote:
      "Consistently delivers high-quality work on time. His expertise in web scraping and data extraction is excellent — I'd recommend him for any project that needs technical skill and dedication.",
    name: "Moussa Jafaar",
    project: "Web scraping",
    avatar: "/moussajafaarimg.jpg",
  },
]
