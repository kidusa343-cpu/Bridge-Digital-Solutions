// Static data — replaces API calls so the site runs fully offline/standalone

export const company = {
  id: 1,
  name: "Bridge Digital Solutions",
  tagline: "Engineering clarity. Delivering scale.",
  description:
    "Full-service digital solutions for businesses ready to build, scale, and lead. We combine deep software engineering with strategic media production to deliver measurable outcomes.",
  email: "bridgedigitalsoulution9@gmail.com",
  phone: "+251955329318 | +251953395975",
  address: ".",
  city: "Addis Ababa",
  country: "Ethiopia",
  foundedYear: "2023",
  teamSize: "24",
  missionStatement:
    "To build software and media that creates real competitive advantage — not just deliverables, but lasting systems.",
  visionStatement:
    "A world where ambitious companies have access to the same quality of engineering and storytelling as the Fortune 500.",
  linkedinUrl: "https://linkedin.com",
  twitterUrl: "https://twitter.com",
  instagramUrl: "https://instagram.com",
};

export const services = [
  {
    id: 1,
    title: "Software Development",
    slug: "software-development",
    description:
      "End-to-end custom software engineering — from UI/UX design to deployment and ongoing maintenance. We build systems that scale.",
    content:
      "We design, build and ship production-ready software across every platform. Whether you need a consumer-facing web app, a cross-platform mobile application, an internal business tool or a complex API platform, our engineers own the full delivery lifecycle. We write clean, maintainable code backed by rigorous testing and CI/CD from day one.",
    iconName: "Code2",
    coverImageUrl: "/images/proj-sw-1.png",
    active: true,
    features: JSON.stringify([
      "UI/UX Design",
      "Custom Software Development",
      "Web Application Development",
      "Mobile Application Development",
      "Desktop Application Development",
      "Secure and Reliable Systems",
      "Database Design and Management",
      "API Integration",
      "Testing and Quality Assurance",
      "Deployment and Maintenance",
      "End-to-End Project Delivery",
    ]),
  },
  {
    id: 2,
    title: "Promotion & Media",
    slug: "promotion-media",
    description:
      "Professional multimedia production and strategic marketing campaigns that build your brand and grow your audience.",
    content:
      "From brand films to social media content engines, we produce high-quality multimedia assets and run the campaigns that put them in front of the right audience. Our production team handles everything from concept and scripting to filming, editing, and publishing — so your brand shows up consistently and compellingly across every channel.",
    iconName: "Film",
    coverImageUrl: "/images/proj-md-1.png",
    active: true,
    features: JSON.stringify([
      "Professional Videography and Photography",
      "Video Editing and Production",
      "Social Media Content Creation",
      "Marketing Campaign Management",
      "Brand Promotion",
      "Content Planning and Publishing",
      "Creative Media Solutions",
    ]),
  },
];

export const projects = [
  {
    id: 1,
    title: "PriceFlow — SaaS Pricing Platform",
    slug: "priceflow-saas-platform",
    client: "Leora Trading PLC , Electra Ev import",
    year: "2024-present",
    category: "Software Development",
    description:
      "Full redesign and rebuild of an internal price management system — microservices architecture, sub-200ms load times.",
    content:
      "PriceFlow needed to modernize a monolithic codebase that was collapsing under scale. We rebuilt the entire platform using a React frontend, Node.js microservices, and PostgreSQL — reducing infrastructure costs by 40% while achieving sub-200ms response times across all endpoints.",
    coverImageUrl: "/images/proj-sw-1.png",
    imageUrls: JSON.stringify(["/images/proj-sw-1.png"]),
    featured: true,
    tags: JSON.stringify(["React", "Node.js", "PostgreSQL", "AWS", "Microservices"]),
  },
  {
    id: 2,
    title: "ScholarsHub — Global Study Abroad Platform",
    slug: "scholarshub-global",
    client: "ScholarsHub",
    year: "2024-present",
    category: "Software Development",
    description:
      "For ScholarsHub, we built a comprehensive web-based platform to simplify global academic placement and funding. We created an intuitive, data-driven portal featuring dynamic destination search, country-specific eligibility guidance, and an integrated scholarship matching database, all designed with a sophisticated and premium aesthetic to instill confidence in international students.",
    content:
      "ScholarsHub needed a modern, centralized platform to streamline global study opportunities and scholarship matching. We designed and built a web application using a React frontend, Node.js microservices, and PostgreSQL — delivering a clean, luxury dark UI, real-time notification feeds, dynamic destination filtering, and seamless integration with international university databases.",
    coverImageUrl: "/images/proj-sw-2.png",
    imageUrls: JSON.stringify(["/images/proj-sw-2.png"]),
    featured: true,
    tags: JSON.stringify(["React Native", "TypeScript", "Plaid API", "Firebase"]),
  },
  {
    id: 3,
    title: "Aksan glass technology",
    slug: "aksan-glass",
    client: "Aksan Glass",
    year: "2024-present",
    category: "Promotion & Media",
    description:
      "A modern social media campaign showcasing high-end architectural glass installations for luxury urban developments.",
    content:
      "Aksan Glass Technology specializes in installing premium glass for modern, high-end buildings. We developed a visual-first promotional strategy on Instagram and TikTok to highlight the beauty and precision of their work. By creating high-definition content that emphasizes the clarity and modern look of their glass installations, we successfully positioned the brand as the top choice for architects and developers looking for luxury solutions. The campaign drove significant engagement and inquiries from construction firms and luxury property owners.",
    videoUrl: "/images/kidaksan.mp4",
      coverImageUrl: "/images/proj-md-111.png",
    imageUrls: JSON.stringify(["/images/proj-md-111.png"]),
    featured: true,
    tags: JSON.stringify(["Brand Film", "Social Media", "Influencer", "Content Strategy"]),
  },
  {
    id: 4,
    title: "Glory Travel — Brand Launch Campaign",
    slug: "glory-travel-brand-launch",
    client: "Glory Travel",
    year: "2023-present",
    category: "Promotion & Media",
    description:
      "Complete media and promotion campaign designed to help students discover and apply for international education opportunities.",
    content:
      "Glory Travel wanted to create an engaging campaign that connects students with life-changing global education opportunities. Many students want to study abroad but find the process confusing and overwhelming. We created a targeted promotional campaign for Glory Travel Agency to reach high school and university students looking for international programs. The project included high-quality social media content, student success video stories, and clear informational graphics that explained visa and university application steps, significantly increasing student inquiries and consultations.",
    videoUrl: "/images/kidglory.mp4",
      coverImageUrl: "/images/proj-md-2.png",
    imageUrls: JSON.stringify(["/images/proj-md-2.png"]),
    featured: false,
    tags: JSON.stringify(["Social Media", "Instagram", "TikTok", "Content Creation", "Video Production"]),
  },
  {
    id: 5,
    title: "ProForma Core — Enterprise Invoicing Platform",
    slug: "proforma-core-invoicing",
    client: "Leora Trading PLC , Electra Ev import",
    year: "2024-present",
    category: "Software Development",
    description:
      "High-speed enterprise invoice generator and proforma tracking software system featuring multi-parameter lookup, pre-indexed items, and automated client validation.",
    content:
      "Businesses lose countless hours manually drafting and tracing proforma documentation for client evaluations and processing. We designed and engineered a robust financial portal utilizing a React frontend, Node.js microservices, and PostgreSQL — enabling instant invoice creation with pre-loaded company listings and full item catalogs to completely eliminate manual typing. The software system features rapid multi-field searching (by VIN, plate number, reference ID, or client name) alongside a comprehensive analytics dashboard providing clear daily and monthly productivity reports.",
    coverImageUrl: "/images/proj-sw-3.png",
    imageUrls: JSON.stringify(["/images/proj-sw-3.png"]),
    featured: false,
    tags: JSON.stringify(["React", "Python", "AI/ML", "PostgreSQL", "Docker"]),
  },
  {
    id: 6,
    title: "Memoria — Digital Yearbook Platform",
    slug: "memoria-digital-yearbook",
    client: "YTS",
    year: "2024-present",
    category: "Software Development",
    description:
      "Interactive graduation archive featuring real-time messaging, digital signatures, and permanent multimedia memory sharing.",
    content:
      "Graduating classes needed a secure, permanent digital space to preserve memories beyond physical books. We designed and engineered a full-stack platform using a React frontend, Node.js backend, and PostgreSQL database — delivering live chat rooms, custom digital signature pads, interactive memory walls with real-time liking, and zero-latency legacy profile updates.",
    coverImageUrl: "/images/proj-sw-4.png",
    imageUrls: JSON.stringify(["/images/proj-sw-4.png"]),
    featured: false,
    tags: JSON.stringify(["React Native", "Stripe", "Real-time", "Maps API"]),
  },
  {
    id: 7,
    title: "MenuFlow — QR Code Menu System",
    slug: "menuflow-qr-menu",
    client: "MenuFlow",
    year: "2025-present",
    category: "Software Development",
    description:
      "A fast digital menu web app for restaurants, cafés, and hotels that lets customers view dishes instantly by scanning a QR code.",
    content:
      "Restaurants and cafés waste a lot of time and money printing new paper menus whenever prices or dishes change. We designed and built a clean, mobile-friendly web application using a React frontend, Node.js backend, and a PostgreSQL database. The system allows business owners to change food items, updates prices, and hide out-of-stock meals instantly, giving guests a smooth experience right on their phones without downloading any apps.",
    coverImageUrl: "/images/proj-sw-5.png",
    imageUrls: JSON.stringify(["/images/proj-sw-5.png"]),
    featured: false,
    tags: JSON.stringify(["React", "Node.js", "GraphQL", "PostgreSQL"]),
  },
  {
    id: 8,
    title: "Gift Real Estate PLC — Corporate Brand Identity Campaign",
    slug: "Gift Real Estate",
    client: "Gift Real Estate",
    year: "2025",
    category: "Promotion & Media",
    description:
      "Strategic social media promotion rollout — content strategy, audience engagement, high-impact property showcases, and targeted digital storytelling framework.",
    content:
      "Gift Real Estate focuses on delivering premium residential and commercial property solutions. We crafted and executed a dynamic social media promotion to drive brand visibility and engage potential buyers through high-impact content creation, sleek property showcases, and targeted digital storytelling.",
    videoUrl: "/images/bi.mp4",
      coverImageUrl: "/images/proj-md-3.png",
    imageUrls: JSON.stringify(["/images/proj-md-3.png"]),
    featured: false,
    tags: JSON.stringify(["Brand Identity", "Photography", "Video", "Content"]),
  },
  {
    id: 9,
    title: "New Life Dental Clinic — Digital Presence & Social Media Strategy",
    slug: "New Life Dental Clinic",
    client: "New Life Dental Clinic",
    year: "2025-present",
    category: "Promotion & Media",
    description:
      "Strategic social media promotion and brand elevation — content creation, patient-centered storytelling, and digital engagement framework.",
    content:
      "New Life Dental Clinic needed to strengthen its connection with patients and build a more inviting digital presence. We elevated their brand by executing a strategic social media promotion, creative content production, and patient-centered storytelling to increase engagement and community trust.",
    videoUrl: "/images/bii.mp4",
      coverImageUrl: "/images/proj-md-4.png",
    imageUrls: JSON.stringify(["/images/proj-md-4.png"]),
    featured: false,
    tags: JSON.stringify(["Real Estate", "Cinematic Video", "Social Media", "Aerial"]),
  },
];

export const caseStudies = [
  {
    id: 1,
    title: "ProForma Core — Enterprise Invoicing Platform",
    slug: "proforma-core",
    client: "ProForma Inc.",
    industry: "Financial Technology",
    summary:
      "A legacy monolith was strangling growth. We rebuilt the architecture incrementally — zero downtime, 40% lower infrastructure costs, and a platform ready for the next 10x.",
    challenge:
      "Before this software, the operations team relied entirely on manual document handling. Every invoice had to be filed, searched for, and retrieved by hand, which became impossible to manage as the company took on more clients. The process was prone to human error, and the staff was overwhelmed by the sheer volume of paperwork, preventing them from focusing on higher-value work.",
    solution:
      "We created a custom desktop application designed specifically to replace the manual workflow. We built a centralized database to hold all financial records and created an automated filing system that instantly organizes incoming documents. We also designed a simple, clean search interface that allows employees to pull up any invoice in seconds without digging through physical or digital folders.",
    outcome:
      "Over 4 weeks, we launched the software and fully transitioned the team away from manual filing. Finding a specific invoice now takes less than two seconds. By removing the need for manual data sorting, the operations team has significantly reduced their daily workload, allowing them to process invoices much faster and handle a higher volume of work without extra stress.",
    featured: true,
    metrics: JSON.stringify([
      { label: "Reduction in manual document filing time", value: "75%" },
      { label: "Increase in daily office productivity", value: "50%" },
      { label: "Faster invoice retrieval speed", value: "10x" },
    ]),
    duration: "4 weeks",
    tags: JSON.stringify(["Microservices", "Node.js", "PostgreSQL", "Redis", "AWS"]),
  },
  {
    id: 2,
    title: "Building Glory Travel Agency",
    slug: "Glory-brand-launch",
    client: "Glory Travel Agency — Student Recruitment Campaign",
    industry: "Consumer Products",
    summary:
      "Scaling Glory Travel Agency’s digital reach from zero to 10K followers in 90 days. The agency needed a modern online presence to attract students for study abroad programs. We built their brand identity, created a library of 40+ promotional assets, and launched a social media strategy that made them a recognized name for students.",
    challenge:
      "Glory Travel Agency is doing a great job helping students navigate their academic journeys, but they lacked a social media presence to showcase their success. They had no online way to share their services, leaving many students unaware of the support they provide. With the busy student recruitment season approaching, they needed to translate their real-world reputation into a powerful digital presence from scratch.",
    solution:
      "We started by defining a clear brand voice and visual style that highlights the agency's 6-year history of helping students succeed. Over 6 weeks, we produced a content library including a flagship promotional film, 25 short-form social media videos, and 15 high-quality photographs that humanized their work by showing real student success stories. To build trust, we partnered with 5 student influencers and academic ambassadors to share their personal experiences regarding how the agency has consistently guided them over the years.",
    outcome:
      "The agency now has a community of over 29,000 followers. Our content strategy has generated over 1.7 million views, serving as the top of the funnel that brought thousands of new students to their programs. This digital expansion directly contributed to a 40% increase in student enrollment compared to previous years, positioning Glory as the leading choice for students looking to study abroad.",
    featured: true,
    metrics: JSON.stringify([
      { label: "Total followers", value: "29K" },
      { label: "Total video views", value: "1.7M+" },
      { label: "Enrollment above projection", value: "40%" },
    ]),
    duration: "12 weeks",
    tags: JSON.stringify(["Brand Strategy", "Content Production", "Influencer Marketing", "Social Media"]),
  },
  {
    id: 3,
    title: "Price Management System — Internal Business Tool",
    slug: "velo-app-design",
    client: "Velo Financial",
    industry: "Fintech",
    summary:
      "A centralized platform to streamline inventory and pricing for retail and wholesale operations. We developed a secure, role-based management system that replaced manual price updates with an automated, single-source-of-truth dashboard, reducing data entry errors and saving hours of administrative time each week.",
    challenge:
      "Managing thousands of product prices across different channels was a manual, error-prone process. The team had no centralized way to update prices, leading to inconsistencies between internal records and customer-facing quotes. They needed a system that allowed for real-time price management while maintaining strict control over who could edit critical financial data.",
    solution:
      "We built a custom web-based platform with a strict Role-Based Access Control (RBAC) architecture: Admin Dashboard: Full permissions to add, edit, or delete items and perform bulk pricing updates. Worker Portal: View-only access to search, filter, and track product prices, ensuring that staff can access the information they need without the ability to alter core financial data. Security: Implemented session-based authentication to ensure that only authorized personnel can make changes, creating a safe environment for business-critical data.",
    outcome:
      "The system successfully unified the pricing strategy across the entire business. With the Admin/Worker role separation, the agency eliminated accidental pricing errors. The tool is now used daily to manage inventory, providing a clean, fast, and reliable interface that has significantly reduced the time spent on administrative maintenance.",
    featured: true,
    metrics: JSON.stringify([
      { label: "Admin & Worker access", value: "2 Roles" },
      { label: "100%", value: "Automated price syncing" },
      { label: "Zero", value: "Data entry errors" },
    ]),
    duration: "5 weeks",
    tags: JSON.stringify(["Web app", "Software Development", "React Native", "Fintech", "UI/UX"]),
  },
];
