import type { Dict } from "./ru";

const en: Dict = {
  meta: {
    title: "Defcode — apps, web services and bots built end to end",
    description:
      "We build mobile apps, web services and SaaS, Telegram bots, tracking and control systems, AI solutions. Contract-based work, source code handed over to you.",
  },

  nav: {
    home: "Home",
    about: "About",
    services: "Services",
    cases: "Case studies",
    process: "Process",
    faq: "FAQ",
    contacts: "Contact",
    cta: "Discuss your project",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    language: "Language",
    skipToContent: "Skip to content",
  },

  pages: {
    services: {
      title: "Services",
      lead: "Six areas and the full list of work we take on. A project almost always combines several of them — and that's how we scope it.",
      metaTitle: "Services — development, bots, AI, tracking systems · Defcode",
      metaDescription:
        "Mobile apps, web services and SaaS, bots and automation, tracking and control systems, AI solutions, websites and landing pages. The full list of work we take on.",
    },
    cases: {
      title: "Case studies",
      lead: "What clients came to us with and what changed after launch. Industry, problem, solution and outcome — without company names.",
      metaTitle: "Case studies — real projects · Defcode",
      metaDescription:
        "Projects in real estate, distribution, early childhood education, hospitality, manufacturing and online education: the problem, the solution and the outcome.",
    },
    process: {
      title: "How we work",
      lead: "Five steps from the first call to support after launch. You see the result at each one, not just at the end.",
      metaTitle: "Our process and technology · Defcode",
      metaDescription:
        "Mapping the process, spec and quote, design and prototype, building in sprints, launch and support. Plus the stack we build with.",
    },
    about: {
      title: "About us",
      lead: "What we put in writing, and answers to the questions people usually ask on the first call.",
      metaTitle: "About us, guarantees and FAQ · Defcode",
      metaDescription:
        "A contract with fixed scope, payment by milestone, source code handed over to you, support after handover. Plus answers on timelines and cost.",
    },
    contacts: {
      metaTitle: "Contact — discuss your project · Defcode",
      metaDescription:
        "Tell us about your project: we reply within one business day. Phone, email, Telegram and WhatsApp.",
    },
  },

  links: {
    allServices: "All services",
    allCases: "All case studies",
    howWeWork: "More about the process",
  },

  ctaBand: {
    title: "Tell us what needs building",
    text: "We'll unpack the problem on a call, propose a solution and give you a range on timeline and budget. Free, and it commits you to nothing.",
    button: "Discuss your project",
    note: "We reply within one business day.",
  },

  mega: {
    heading: "What we do",
    note: "We take the whole thing — from mapping your process to support after launch.",
    cta: "All services",
    groups: [
      {
        title: "Product & discovery",
        tags: [
          "Business process mapping",
          "Technical specification",
          "MVP scoping",
          "Timeline and budget estimate",
          "Launch consulting",
          "Audit of an existing product",
        ],
      },
      {
        title: "Development",
        tags: [
          "Web development",
          "Mobile development",
          "SaaS platforms",
          "Customer portals and admin panels",
          "E-commerce",
          "Marketplaces",
          "Taking over someone else's codebase",
        ],
      },
      {
        title: "Design",
        tags: [
          "UI design",
          "UX prototyping",
          "Responsive design",
          "Product redesign",
          "Mobile app design",
          "Design systems",
        ],
      },
      {
        title: "AI & automation",
        tags: [
          "AI assistants for business",
          "LLM-powered chatbots",
          "Telegram bots",
          "WhatsApp bots",
          "AI inside your CRM or ERP",
          "Automated request handling",
          "Content auto-generation",
        ],
      },
      {
        title: "Tracking & control",
        tags: [
          "Staff and shift tracking",
          "Field visit geotracking",
          "Inventory management",
          "Receivables control",
          "Document workflows",
          "In-app staff training",
        ],
      },
      {
        title: "Infrastructure & support",
        tags: [
          "Server setup",
          "Docker and containerisation",
          "CI/CD",
          "Monitoring",
          "SLA-backed support",
          "Post-launch maintenance",
          "Bug fixing",
        ],
      },
    ],
  },

  hero: {
    lead: "We build",
    rotating: [
      "mobile apps",
      "web services",
      "Telegram bots",
      "tracking systems",
      "AI solutions",
      "landing pages",
    ],
    tail: "for businesses and personal projects",
    subtitle:
      "We take the whole problem: map the process, design it, write the code, ship it and stay on after handover. No disappearing act once the invoice clears.",
    ctaPrimary: "Discuss your project",
    ctaSecondary: "How we work",
    statLabels: {
      years: "years in business",
      projects: "projects delivered",
      team: "people on the team",
      avgWeeks: "weeks to launch on average",
    },
    fallbackBadges: [
      "Contract-based work",
      "You own the source code",
      "Support after launch",
    ],
  },

  hooks: {
    heading: "What people come to us with",
    sub: "Four situations we already know how to handle.",
    items: [
      {
        quote: "I can't see what my team is actually doing",
        answer:
          "Apps that geotrack the working day and verify every action automatically. A report stops being a story.",
      },
      {
        quote: "Everything lives in Excel and WhatsApp, and nothing adds up",
        answer:
          "We move the bookkeeping into a system where data is entered once and reconciles itself. No parallel spreadsheets.",
      },
      {
        quote: "Leads get lost between managers",
        answer:
          "We connect your site, messengers and CRM into one flow. A lead reaches the right person the moment it's submitted.",
      },
      {
        quote: "I have an idea but no development team",
        answer:
          "We build the product from scratch: from unpacking the idea and quoting it to store release and ongoing growth.",
      },
    ],
  },

  services: {
    heading: "Services",
    sub: "Six areas. Most projects combine several of them.",
    tagsHeading: "The full list of work",
    tagsNote: "Tap a task and it goes straight into the enquiry form.",
    items: [
      {
        title: "Mobile apps",
        desc: "iOS and Android, for customers and for staff alike. Offline mode, geolocation, push notifications, store publishing.",
        tags: ["iOS", "Android", "Offline mode", "Geolocation"],
      },
      {
        title: "Web services & SaaS",
        desc: "Customer portals, admin panels, dashboards, multi-tenant platforms with proper permission control.",
        tags: ["Portals", "Admin panels", "Multi-tenancy"],
      },
      {
        title: "Bots & automation",
        desc: "Telegram and WhatsApp as a working tool, not a toy. Intake, approvals, reports, CRM connectivity.",
        tags: ["Telegram", "WhatsApp", "CRM integrations"],
      },
      {
        title: "Tracking & control systems",
        desc: "Staff, shifts, visits, inventory, documents and debts in one place. Data gets entered once.",
        tags: ["Staff tracking", "Inventory", "Document workflows"],
      },
      {
        title: "AI solutions",
        desc: "Chatbots on language models, document parsing, content generation, AI embedded into processes you already run.",
        tags: ["LLM", "Document processing", "Generation"],
      },
      {
        title: "Websites & landing pages",
        desc: "Fast pages for a product launch or ad campaign, with the form wired straight into your CRM.",
        tags: ["Landing pages", "Corporate sites", "Form integrations"],
      },
    ],
  },

  cases: {
    heading: "Case studies",
    sub: "Industry, problem, solution and outcome. No client names — we work on internal systems.",
    labels: {
      task: "The problem",
      solution: "What we built",
      result: "What changed",
    },
    items: [
      {
        industry: "Real estate",
        scale: "100+ agents",
        task: "Agents handled client enquiries by hand, and the CRM was so bloated that nobody actually used it.",
        solution:
          "We simplified the CRM and moved daily work into a Telegram bot — where the agents already spend their day. We also added automatic generation of property ad collages.",
        result:
          "A property ad card is assembled in a couple of clicks instead of being laid out by hand in an editor. Daily enquiries from all 100+ agents run through a single window.",
        tags: ["Telegram bot", "CRM", "Content generation"],
      },
      {
        industry: "Distribution & merchandising",
        scale: "Field sales reps",
        task: "Supervisors couldn't see what reps actually did and took reports on trust. New hires were trained by hand for weeks, and inventory and debts lived in spreadsheets.",
        solution:
          "A mobile app with visits and geotracking across the whole working day. Every action is logged and checked automatically — any attempt to game the system is immediately visible to the supervisor and admin. Onboarding, orders, inventory and receivables are built in.",
        result:
          "Managers see the actual route of the day, not a retelling of it. New hires train inside the app without pulling a mentor away from work.",
        tags: ["iOS / Android", "Geotracking", "Fraud detection", "Inventory"],
      },
      {
        industry: "Early childhood education",
        scale: "SaaS for a nursery chain",
        task: "Attendance and staff records were kept on paper, and parents had no idea how their child's day was going.",
        solution:
          "A SaaS platform for the nursery plus a mobile app for parents: attendance, the child's status through the day, staff records.",
        result:
          "Parents check their child's status on the phone instead of calling the teacher. Group reporting compiles itself.",
        tags: ["SaaS", "Mobile app", "Multi-tenancy"],
      },
      {
        industry: "Food & beverage",
        scale: "Coffee shop",
        task: "There was no shift tracking, and nothing to motivate the team with.",
        solution:
          "A staff and shift tracking system with personal QR codes that give employees discounts and perks at partner venues.",
        result:
          "Shifts and accounts live in one place, and the perks programme runs without paper cards or manual lists.",
        tags: ["Web service", "QR codes", "Staff tracking"],
      },
      {
        industry: "Manufacturing",
        scale: "Tractor plant",
        task: "Leads from the website got lost between managers and were copied into the system by hand.",
        solution:
          "A landing page with the form wired directly into the CRM: a lead lands in the system the moment it's submitted and is assigned instantly.",
        result:
          "No lead goes missing, and the full enquiry history lives in the CRM rather than in chat threads.",
        tags: ["Landing page", "CRM integration"],
      },
      {
        industry: "Online education",
        scale: "Programming school",
        task: "They needed to test demand for new courses quickly and run ads for every intake.",
        solution:
          "A series of landing pages for individual courses and intakes on a shared foundation — a new page can be assembled without rewriting everything.",
        result: "A page for a new intake ships in days rather than weeks.",
        tags: ["Landing pages", "Fast launch"],
      },
    ],
  },

  process: {
    heading: "How we work",
    sub: "Five steps. You see the result at each one, not just at the end.",
    steps: [
      {
        title: "Map the process",
        desc: "A call and a lot of questions: how things run today, where time and money leak. Sometimes this step reveals the problem is cheaper and simpler to solve than it looked.",
      },
      {
        title: "Write the spec and the quote",
        desc: "Scope, timeline and cost, fixed in writing. You know exactly what you're paying for before work starts.",
      },
      {
        title: "Design and prototype",
        desc: "You see how the product will look and behave before a single line of code is written. Changes are cheap at this stage.",
      },
      {
        title: "Build in sprints",
        desc: "We show a working version every one to two weeks. You steer as we go instead of accepting everything at the end.",
      },
      {
        title: "Launch and support",
        desc: "We ship it, train your team and stay reachable. We fix and keep developing it.",
      },
    ],
  },

  stack: {
    heading: "What we build with",
    sub: "We pick the tool to fit the problem, not the problem to fit a favourite tool.",
  },

  guarantees: {
    heading: "What we guarantee",
    sub: "The dull but important things people always ask about on the first call.",
    items: [
      {
        title: "A contract with fixed scope",
        desc: "What gets built, by when and for how much — all written down. We work with companies, sole traders and individuals.",
      },
      {
        title: "Payment by milestone",
        desc: "We don't ask for everything up front. You pay as stages are delivered and you can see what for.",
      },
      {
        title: "The code is yours",
        desc: "We hand over the source and every credential on delivery. You're not locked in and can continue with anyone.",
      },
      {
        title: "Your data stays yours",
        desc: "We don't publish your interfaces, your data or your company name. We'll sign a non-disclosure agreement on request.",
      },
      {
        title: "Support after handover",
        desc: "A warranty period for fixes, and the option to keep developing the product with us.",
      },
    ],
  },

  faq: {
    heading: "Frequently asked",
    sub: "If something's missing, ask in the form — we'll answer honestly.",
    items: [
      {
        q: "How much does development cost?",
        a: "It depends on scope: a small bot and a SaaS platform differ by orders of magnitude. We don't put prices on the site because any number quoted before understanding the problem would be a lie. After the first call we give a range; after the spec, an exact quote.",
      },
      {
        q: "How long will it take?",
        a: "A landing page: one to two weeks. A bot or a small system: from a month. A mobile app or SaaS: from two to three months. The exact timeline arrives with the spec and goes into the contract.",
      },
      {
        q: "Do you work under contract?",
        a: "Always. We work with companies, sole traders and individuals, and provide full closing documents.",
      },
      {
        q: "Who owns the code after delivery?",
        a: "You do. We hand over the source code and all credentials. Nothing is tied to our infrastructure unless you want it to be.",
      },
      {
        q: "What if I need changes six months later?",
        a: "Come back — it's our code, so there's no relearning curve. You can also set up a maintenance arrangement from the start so changes happen as needed.",
      },
      {
        q: "Why are there no screenshots in the case studies?",
        a: "Almost every project we do is a client's internal system. We don't publish or show their interfaces, data or company names — and the same rule will apply to your project. Publicly we describe only the problem and the outcome.",
      },
      {
        q: "Do you work with clients in other cities and countries?",
        a: "Yes. The process is built around remote work from the start: calls, a demo every one to two weeks, and messaging in whatever channel suits you.",
      },
      {
        q: "Can you take over code somebody else wrote?",
        a: "We can. We start with an audit of the code and architecture, then tell you honestly whether extending or rewriting is cheaper. It goes both ways.",
      },
    ],
  },

  contact: {
    heading: "Tell us about your project",
    sub: "We reply within one business day. A couple of sentences is enough — we'll get into the details on a call.",
    name: "What should we call you",
    namePlaceholder: "Your name",
    contact: "Phone, email or Telegram",
    contactPlaceholder: "+7 (___) ___-__-__ or @username",
    task: "Briefly, what you need",
    taskPlaceholder:
      "What needs building, who it's for, whether there's a deadline. A couple of sentences is plenty.",
    submit: "Send request",
    sending: "Sending…",
    successTitle: "Request sent",
    successText:
      "We'll be in touch within one business day. If it's urgent, message us directly.",
    errorRequired: "Please fill in this field",
    errorContact: "Leave a phone, email or Telegram so we can reply",
    errorSend: "Couldn't send it. Please message us directly instead.",
    privacy:
      "By submitting the form you agree to us processing your details in order to reply.",
    orWrite: "Or message us directly",
  },

  footer: {
    tagline: "Apps, web services and bots for businesses and personal projects.",
    navHeading: "Sections",
    contactsHeading: "Contact",
    servicesHeading: "Services",
    rights: "All rights reserved.",
    madeWith: "Built with Next.js",
  },
};

export default en;
