/**
 * Fallback corporate business data for Adhikari Group
 * Used when Strapi CMS has empty tables or during initial setup.
 */

export const FALLBACK_SITE_SETTINGS = {
  siteName: "Adhikari Group",
  tagline: "Diversified Business Group in Nepal",
  phone: "+977 1 4720000",
  email: "info@adhikarigroup.com",
  address: "Maharajgunj-3, Kathmandu, Nepal",
  officeHours: "Sun - Fri: 9:00 AM – 6:00 PM",
  facebook: "https://facebook.com",
  instagram: "https://instagram.com",
  linkedin: "https://linkedin.com",
  youtube: "https://youtube.com",
  tiktok: "https://tiktok.com",
  logo: "/images/logo.png"
};

export const FALLBACK_ABOUT = {
  whoWeAreTitle: "Who We Are",
  whoWeAreContent: "Adhikari Group is a diversified business group based in Nepal, leading the country's baby care journey through import, distribution, retail, and trusted consumer brands. With 6 subsidiaries dedicated to baby and mother care products, we bring together international manufacturing standards and the most demanded essentials for babies and mothers across Nepal.\n\nOur group manages an end-to-end ecosystem — from our own brand MumBuds USA, to the authorized dealership of Bambo Nature and PopyPapa, to our in-house clothing brand PUNTURO specializing in 3-Layer Malmal cotton garments, and a nationwide retail network NEOBUDS.",
  ourStoryTitle: "Our Story & Vision",
  ourStoryContent: "What began as a commitment to serving Nepal with quality products and dependable commercial practices has evolved into a premier business enterprise.\n\n### Our Vision\nTo be Nepal’s premier diversified business enterprise, recognized for commercial integrity, brand stewardship, and operational excellence.\n\n### Our Mission\nTo foster sustainable business growth by introducing world-class products, developing trusted dealer networks, and operating customer-focused retail and B2B platforms.\n\n### Core Values\n- **Integrity & Trust**: Open, honest relationships with all partners, suppliers, and customers.\n- **Quality Standards**: Delivering safe, certified, and essential products for every home.\n- **Continuous Growth**: Expanding distribution reach, digital B2B systems, and retail accessibility.\n- **Customer Commitment**: Providing reliable service and care through every brand we operate."
};

export const FALLBACK_COMPANIES = [
  {
    id: 1,
    name: "Shreesha Incorporated Pvt. Ltd.",
    slug: "shreesha-incorporated",
    tagline: "Authorized International Diaper Distributor",
    category: "Distribution",
    location: "Kathmandu, Nepal",
    shortDesc: "Authorized distributor of MumBuds USA and Bambo Nature, driving nationwide marketing, pharmacy supply, and brand growth.",
    fullDesc: "Shreesha Incorporated is a core subsidiary of Adhikari Group, established to lead the distribution, marketing, and branding of two of the most trusted diaper brands in Nepal — MumBuds USA and Bambo Nature. As the authorized distributor, the firm ensures these products reach every corner of the country, from urban retail chains to local pharmacies, maintaining consistent quality, availability, and brand integrity at every touchpoint.\n\nBeyond distribution, Shreesha Incorporated shapes how these brands are adopted in the Nepali market through targeted awareness initiatives, clinical engagements, and dealer support systems.",
    website: "https://www.shreeshaincorporated.com",
    logo: "/images/logo.png",
    coverImage: "/images/companies/shreesha-inc.jpeg",
    functions: ["Authorized Import", "Nationwide Distribution", "Pharmacy & Hospital Supply", "Brand Representation"]
  },
  {
    id: 2,
    name: "Wholesale Lobby Pvt. Ltd.",
    slug: "wholesale-lobby",
    tagline: "B2B Multivendor Marketplace & Brand Incubator",
    category: "B2B Commerce & Distribution",
    location: "Kathmandu, Nepal",
    shortDesc: "Authorized distributor of PopyPapa and brand owner of Punturo, driving wholesale commerce and international expansion.",
    fullDesc: "Wholesale Lobby Pvt Ltd is a key subsidiary of Adhikari Group, serving as the authorized distributor of PopyPapa (premium baby strollers and car seats) and the parent company behind Punturo Malmal apparel.\n\nWholesale Lobby is pioneering digital B2B trade in Nepal, streamlining bulk procurement, warehouse fulfillment, and supplier-retailer transactions across provincial hubs.",
    website: "https://www.wholesalelobby.com",
    logo: "/images/logo.png",
    coverImage: "/images/companies/wholesale-lobby.webp",
    functions: ["B2B Multivendor Commerce", "Wholesale Distribution", "Brand Acceleration", "Supply Chain Logistics"]
  },
  {
    id: 3,
    name: "NeoBuds Pvt. Ltd.",
    slug: "neobuds",
    tagline: "Specialized Baby & Mother Care Retail Chain",
    category: "Retail",
    location: "5 Branches across Nepal (Maharajgunj, Samakhusi, Chitwan, Tikathali, Golfutar)",
    shortDesc: "Nepal's fastest-growing baby retail chain with 5 physical stores offering curated maternal and baby essentials.",
    fullDesc: "NeoBuds is the flagship retail store chain under Adhikari Group, established with a vision to provide the finest baby care products and retail shopping experience across Nepal. With branches across Maharajgunj, Samakhusi, Chitwan, Tikathali, and Golfutar, NeoBuds brings quality, safety, and convenience closer to families.\n\nNeoBuds stores exclusively curate verified brands including MumBuds USA, Bambo Nature, Punturo, and PopyPapa, upholding strict standards of skin friendliness and infant safety.",
    website: "https://www.neobuds.com",
    logo: "/images/neobuds.png",
    coverImage: "/images/companies/neobuds.jpeg",
    functions: ["Direct Retail Stores", "Customer Guidance", "In-Store Consultation", "Online Delivery & Fulfillment"]
  },
  {
    id: 4,
    name: "AG Hygiene",
    slug: "ag-hygiene",
    tagline: "Kathmandu Valley Regional Hygiene Dealer",
    category: "Distribution & Dealership",
    location: "Kathmandu Valley, Nepal",
    shortDesc: "Authorized dealer of MumBuds USA diapers and hygiene supplies across Kathmandu Valley.",
    fullDesc: "AG Hygiene operates as the dedicated regional dealership for MumBuds USA within Kathmandu Valley. Working in close tandem with pharmacies, superstores, and maternity clinics, AG Hygiene ensures uninterrupted supply and rapid local dispatch.",
    website: "https://www.mumbudsnepal.com",
    logo: "/images/logo.png",
    coverImage: "/images/companies/ag-hygiene.png",
    functions: ["Valley Dealership", "Local Retail Supply", "Rapid Inventory Dispatch"]
  },
  {
    id: 5,
    name: "Adhik Brothers",
    slug: "adhik-brothers",
    tagline: "Chitwan & Regional Distribution Hub",
    category: "Distribution & Dealership",
    location: "Chitwan, Nepal",
    shortDesc: "Authorized regional distribution hub managing diaper and hygiene logistics across Chitwan and central Nepal.",
    fullDesc: "Adhik Brothers operates as the primary regional distribution center in Chitwan district, connecting healthcare outlets and local stores with MumBuds USA and Adhikari Group products.",
    website: "https://www.mumbudsnepal.com",
    logo: "/images/logo.png",
    coverImage: "/images/companies/adhik-brothers.png",
    functions: ["Provincial Dealership", "Regional Supply Chain", "Sub-Dealer Management"]
  },
  {
    id: 6,
    name: "NeoBaby Pvt. Ltd.",
    slug: "neobaby",
    tagline: "Specialized Baby & Mother Care E-commerce",
    category: "Retail & E-commerce",
    location: "Nationwide Delivery, Nepal",
    shortDesc: "Digital e-commerce platform extending direct home delivery of baby care essentials across Nepal.",
    fullDesc: "NeoBaby Pvt Ltd is the digital arm of Adhikari Group's retail ecosystem, enabling parents across all 7 provinces of Nepal to order safe baby hygiene and apparel directly to their doorsteps.",
    website: "https://www.neobuds.com",
    logo: "/images/logo.png",
    coverImage: "/images/companies/neobaby.png",
    functions: ["E-commerce Retail", "Nationwide Home Delivery", "Customer Support"]
  }
];

export const FALLBACK_BRANDS = [
  {
    id: 1,
    name: "MumBuds USA",
    slug: "mumbuds-usa",
    origin: "USA / Nepal",
    relationship: "Owned & Distributed Brand",
    shortDesc: "Ultra-thin, highly absorbent diapers with bubble topsheet, Japan SAP paper, and wetness indicator.",
    fullDesc: "MumBuds USA is a premium baby care brand dedicated to providing safe, gentle, and high-quality products for infants and toddlers. Its diapers are crafted with an ultra-thin design that offers superior comfort and absorbency without compromising on protection.\n\nEach MumBuds diaper features a special bubble topsheet that quickly draws moisture away from the skin to prevent rash and irritation, combined with premium Japan SAP core that locks wetness for 12+ hours.",
    website: "https://www.mumbudsnepal.com",
    logo: "/images/mumbuds.png",
    image: "/images/mumbuds.png"
  },
  {
    id: 2,
    name: "Bambo Nature",
    slug: "bambo-nature",
    origin: "Denmark",
    relationship: "Authorized Distributor (Shreesha Inc.)",
    shortDesc: "Certified eco-friendly baby diapers combining Nordic quality, high absorbency, and 40+ years of trusted care.",
    fullDesc: "Bambo Nature is a Danish baby care brand certified under Nordic Swan Ecolabel and Asthma Allergy Nordic. Made with sustainably sourced wood pulp and 100% chlorine-free materials, Bambo Nature is gentle on newborn skin and kind to the planet.",
    website: "https://www.bambonature.com",
    logo: "/images/bambo-nature.png",
    image: "/images/bambo-nature.png"
  },
  {
    id: 3,
    name: "Punturo",
    slug: "punturo",
    origin: "Nepal",
    relationship: "Owned Brand (Wholesale Lobby)",
    shortDesc: "Premium Nepali clothing brand crafting 3-layer Malmal essentials for babies and postpartum mothers.",
    fullDesc: "Punturo is a homegrown clothing label celebrating traditional Nepali 3-layer Malmal cotton. Breathable, hypoallergenic, and ultra-soft, Punturo produces traditional Bhoto sets, swaddles, handkerchiefs, and postpartum maternity gowns.",
    website: "https://www.punturonepal.com",
    logo: "/images/punturo.png",
    image: "/images/punturo.png"
  },
  {
    id: 4,
    name: "NeoBuds",
    slug: "neobuds",
    origin: "Nepal",
    relationship: "Retail Chain Brand",
    shortDesc: "Nepal's fastest growing specialty retail store chain dedicated exclusively to trusted maternal and baby supplies.",
    fullDesc: "NeoBuds represents the modern face of baby retail in Nepal, offering clean, welcoming retail stores where parents can receive personalized advice and choose verified, premium infant hygiene products.",
    website: "https://www.neobuds.com",
    logo: "/images/neobuds.png",
    image: "/images/neobuds.png"
  },
  {
    id: 5,
    name: "PopyPapa",
    slug: "popypapa",
    origin: "International",
    relationship: "Authorized Distributor (Wholesale Lobby)",
    shortDesc: "Durable, safety-certified strollers, car seats, and travel systems engineered for modern families.",
    fullDesc: "PopyPapa specializes in baby mobility equipment. Every stroller, pram, and car seat meets international crash-safety and durability standards, ensuring everyday convenience and child protection.",
    website: "#",
    logo: "/images/popypapa.png",
    image: "/images/popypapa.png"
  }
];

export const FALLBACK_NEWS = [
  {
    id: 1,
    title: "NeoBuds Expands Retail Footprint with 5th Branch in Golfutar",
    slug: "neobuds-expands-retail-footprint-golfutar",
    category: "Retail Expansion",
    publishedAt: "2026-08-15T00:00:00.000Z",
    summary: "NeoBuds Pvt. Ltd. officially opens its Golfutar branch, extending accessible mother and baby hygiene supplies to central Kathmandu.",
    content: "Adhikari Group's retail subsidiary NeoBuds has launched its newest location in Golfutar. Joining branches in Maharajgunj, Samakhushi, Chitwan, and Tikathali, the store provides an elevated in-person shopping experience featuring MumBuds, Bambo Nature, and Punturo Malmal apparel.\n\nThe new branch features private nursing stations, trained maternal advisors, and instant home dispatch services.",
    coverImage: "/images/companies/neobuds.jpeg"
  },
  {
    id: 2,
    title: "Wholesale Lobby Launches Digital B2B Portal for Nepalese Retailers",
    slug: "wholesale-lobby-launches-b2b-portal",
    category: "B2B Commerce",
    publishedAt: "2026-07-22T00:00:00.000Z",
    summary: "Connecting provincial wholesalers directly with top brands, accelerating digital order fulfillment nationwide.",
    content: "Wholesale Lobby Pvt. Ltd. announces the rollout of its proprietary digital B2B commerce marketplace. The platform enables over 500+ independent retail partners to view live stock, place wholesale orders, and track deliveries in real time.",
    coverImage: "/images/companies/wholesale-lobby.webp"
  },
  {
    id: 3,
    title: "Shreesha Inc. Strengthens Partnership with Bambo Nature Denmark",
    slug: "shreesha-inc-strengthens-bambo-nature-partnership",
    category: "International Distribution",
    publishedAt: "2026-06-10T00:00:00.000Z",
    summary: "Delivering certified eco-friendly Danish baby hygiene lines to medical centers and specialty outlets across Nepal.",
    content: "Shreesha Incorporated Pvt. Ltd. has renewed its exclusive national distribution agreement with Bambo Nature (Abena Group, Denmark). The partnership reinforces both organizations' commitment to sustainable, certified non-toxic infant hygiene for Nepali families.",
    coverImage: "/images/bambo-nature.png"
  }
];

export const FALLBACK_GALLERY = [
  { id: 1, url: "/images/gallery/gallery-1.jpg", caption: "NeoBuds Flagship Store - Maharajgunj" },
  { id: 2, url: "/images/gallery/gallery-2.jpg", caption: "Shreesha Inc. Central Distribution Hub" },
  { id: 3, url: "/images/gallery/gallery-3.jpg", caption: "Adhikari Group Corporate Headquarters" },
  { id: 4, url: "/images/gallery/gallery-4.webp", caption: "Wholesale Lobby B2B Logistics & Warehousing" },
  { id: 5, url: "/images/gallery/gallery-5.jpg", caption: "Executive Leadership & Board Strategy" },
  { id: 6, url: "/images/about-corporate.jpg", caption: "Corporate Team & Operations" }
];

export const FALLBACK_CHAIRMAN = {
  name: "Mr. Ganesh Prasad Adhikari",
  designation: "Chairman, Adhikari Group",
  photo: "/images/chairman.jpg",
  shortMessage: "Building businesses that create lasting value through trust, commercial integrity, and dedicated partnerships across Nepal and beyond.",
  fullMessage: "At Adhikari Group, we believe that a successful business is built not only through financial growth, but through trust, integrity, responsibility, and long-term relationships. What began as a commitment to serving the market with quality products and dependable business practices has grown into a group of companies operating across import, distribution, retail, B2B commerce, baby care, hygiene, and consumer products.\n\nEach business within the Adhikari Group has its own purpose, while sharing a common vision of creating sustainable value for our customers, partners, employees, and communities. Our journey has always been guided by the belief that strong businesses are built by understanding people and responding to their changing needs—shaping the brands we represent and the relationships we establish.\n\nAs we move forward, our ambition is not simply to become larger, but to become better, stronger, and more responsible. We are committed to the highest standards, continuous innovation, and building businesses that stand for quality, reliability, and lasting value. Together, we look forward to building a stronger future."
};

export const FALLBACK_LEADERS = [
  {
    id: 1,
    name: "Mr. Ganesh Prasad Adhikari",
    position: "Chairman & Founder",
    photo: "/images/chairman.jpg",
    shortBio: "Visionary business leader steering the group's diversified growth, ethics, and strategic direction across Nepal.",
    biography: "Mr. Ganesh Prasad Adhikari has spearheaded the group's journey from a focused import and distribution venture into one of Nepal's most respected conglomerates in mother and child care.",
    displayOrder: 1
  }
];

export const FALLBACK_VACANCIES = [
  {
    id: 1,
    title: "Chief Financial Officer (CFO)",
    slug: "chief-financial-officer-cfo",
    department: "Executive Management",
    location: "Corporate HQ, Kathmandu",
    employmentType: "Full-Time",
    deadline: "2026-09-30",
    isActive: true,
    shortDesc: "Seeking a seasoned CFO to lead corporate financial strategy, auditing, treasury, and capital allocation across all 6 subsidiaries.",
    description: "The Chief Financial Officer will oversee financial reporting, statutory compliance, budget forecasting, and group investment evaluation across Shreesha Inc., Wholesale Lobby, NeoBuds, and regional branches.",
    responsibilities: "- Formulate and execute multi-entity financial strategy and annual budgets.\n- Ensure robust accounting controls and compliance with Nepal regulatory standards.\n- Oversee capital structure, working capital management, and banking partnerships.\n- Deliver executive financial insights to the Board of Directors.",
    requirements: "- Master's Degree in Finance, CA/CPA or ACCA certification.\n- Minimum 8+ years of progressive financial leadership in commercial or corporate group environments.\n- Strong expertise in financial analytics, tax planning, and ERP systems.",
    applyLink: "mailto:careers@adhikarigroup.com?subject=Application%20for%20CFO%20Position"
  },
  {
    id: 2,
    title: "Regional Sales & Distribution Manager",
    slug: "regional-sales-distribution-manager",
    department: "Sales & Supply Chain",
    location: "Chitwan / Central Hub",
    employmentType: "Full-Time",
    deadline: "2026-09-25",
    isActive: true,
    shortDesc: "Manage regional wholesale channel relations, dealer networks, and diaper distribution expansion across central Nepal.",
    description: "Lead regional distributor performance, retail merchandising, and stock fulfillment for MumBuds and Bambo Nature product lines.",
    responsibilities: "- Drive monthly sales targets and channel penetration across Bagmati and Gandaki provinces.\n- Expand dealer network and manage key pharmacy/hospital accounts.\n- Monitor inventory turnover and logistics coordination with Kathmandu warehouse.",
    requirements: "- Bachelor's or Master's degree in Business Administration, Marketing or related field.\n- 4+ years of FMCG or pharmaceutical distribution experience in Nepal.\n- Proven leadership in managing field sales forces.",
    applyLink: "mailto:careers@adhikarigroup.com?subject=Application%20for%20Regional%20Sales%20Manager"
  },
  {
    id: 3,
    title: "Retail Store Supervisor - NeoBuds",
    slug: "retail-store-supervisor-neobuds",
    department: "NeoBuds Retail",
    location: "Kathmandu Branches",
    employmentType: "Full-Time",
    deadline: "2026-09-20",
    isActive: true,
    shortDesc: "Supervise daily retail store operations, customer advisory services, inventory audits, and team performance.",
    description: "Ensure world-class customer experience, store visual merchandising, and product recommendations at NeoBuds specialty baby care stores.",
    responsibilities: "- Oversee daily store floor operations, staff scheduling, and customer support.\n- Manage POS billing, stock replenishment, and shrink prevention.\n- Train retail associates on product knowledge and hygiene standards.",
    requirements: "- 2+ years of retail store supervisor or customer service experience.\n- Excellent communication skills and passion for maternal & baby care.",
    applyLink: "mailto:careers@adhikarigroup.com?subject=Application%20for%20NeoBuds%20Store%20Supervisor"
  }
];

export const FALLBACK_POLICIES = [
  {
    id: 1,
    title: "Corporate Governance & Ethics Policy",
    slug: "corporate-governance-ethics-policy",
    content: "### 1. Purpose\nAdhikari Group is committed to the highest standards of integrity, transparency, and ethical conduct across all its operating entities.\n\n### 2. Standards of Business Conduct\n- All employees and representatives must act with honesty, fairness, and diligence in dealing with customers, suppliers, competitors, and government authorities.\n- Conflicts of interest must be disclosed promptly to executive management.\n- Bribery, kickbacks, or corrupt business practices are strictly prohibited."
  },
  {
    id: 2,
    title: "Product Quality & Safety Standards Policy",
    slug: "product-quality-safety-standards-policy",
    content: "### 1. Commitment to Infant & Maternal Safety\nBecause our core operations focus on baby care and hygiene, product safety is our utmost priority.\n\n### 2. Quality Verification\n- Every imported diaper line (MumBuds, Bambo Nature) must hold legitimate international dermatological and safety certifications.\n- In-house manufactured clothing (Punturo) must use 100% skin-safe, breathable, dye-tested Malmal cotton.\n- Products failing safety inspections are rejected prior to market entry."
  },
  {
    id: 3,
    title: "Equal Opportunity & Workplace Welfare Policy",
    slug: "equal-opportunity-workplace-welfare-policy",
    content: "### 1. Fair Employment Practices\nAdhikari Group provides equal employment opportunities to all qualified persons without discrimination based on gender, ethnicity, religion, or background.\n\n### 2. Safe & Supportive Workplace\nWe maintain a safe, respectful, and harassment-free work environment for our office teams, retail store staff, and warehouse personnel nationwide."
  }
];

export const FALLBACK_HOMEPAGE = {
  heroTitle: "Growing from Nepal, Building Beyond Borders",
  heroSubtitle: "From our own brand MUMBUDS USA to Nepal's fastest-growing baby retail network NEOBUDS, we're building the nation's most trusted baby care ecosystem.",
  heroImage: "/images/about-corporate.jpg",
  heroVideo: "/images/mumbuds-production.mp4",
  aboutBadge: "Corporate Profile",
  aboutTitle: "Building Nepal's Leading Baby Care & Consumer Ecosystem",
  aboutContent: "Adhikari Group is a diversified business group based in Nepal, operating across 6 specialized subsidiaries dedicated to maternal and infant wellness, certified diaper distribution, Malmal cotton apparel manufacturing, and modern retail chains.\n\nWith international partnerships spanning Denmark and the USA alongside local manufacturing and provincial wholesale hubs, we connect certified quality to thousands of Nepali homes daily.",
  businessesBadge: "Subsidiaries",
  businessesSectionTitle: "Our Operating Companies",
  businessesSectionSubtitle: "Explore our diversified operations spanning nationwide distribution, B2B wholesale commerce, retail chains, and regional hubs.",
  brandsBadge: "Brand Stewardship",
  brandsSectionTitle: "Trusted Consumer Brands",
  brandsSectionSubtitle: "From internationally recognized diaper labels to in-house developed mother & baby apparel.",
  chairmanBadge: "Leadership Perspective",
  chairmanSectionTitle: "Building businesses that create lasting value through trust, commercial integrity, and dedicated partnerships.",
  careersBadge: "Join Our Journey",
  careersTitle: "Partner With Us or Build Your Career",
  careersDescription: "Whether you are looking to become an authorized provincial dealer, supply products, or join our growing workforce across Nepal, we welcome collaboration.",
  contactCTATitle: "Contact & Business Inquiry",
  contactCTADescription: "Connect with our corporate team for dealerships, wholesale inquiries, and partnerships.",
  stats: [
    { number: "06", label: "Operating Companies", icon: "building" },
    { number: "05", label: "Retail Locations", icon: "store" },
    { number: "04+", label: "International Partners", icon: "globe" },
    { number: "05+", label: "Key Brands", icon: "award" },
    { number: "50+", label: "Dealer Network", icon: "network" }
  ]
};

