// lib/data.ts
export const translations = {
  en: {
    profile: {
      name: "Mehdi Bentaleb",
      role: "Full-Stack Developer",
      bio: "Specialized in building robust web applications using the Laravel ecosystem and modern frontend technologies. Based in Tangier, Morocco.",
      email: "Mehdibentaleb548@gmail.com",
      socials: { github: "https://github.com/BenTaleb-Mehdi", linkedin: "https://www.linkedin.com/in/mehdi-bentaleb" }
    },
    nav: { work: "Work", about: "About", expertise: "Expertise", contact: "Contact", letsTalk: "Let's Talk" },
    sections: { 
      selectedWorks: "Selected Works.", 
      technologies: "Technologies",
      livePreview: "Live Preview",
      noDemo: "No Demo",
      sourceCode: "Source Code",
      privateCode: "Private Code",
      viewDetails: "View Details"
    },
    education: [
      { school: "Solicode Tangier", degree: "Full-Stack Web Development And Mobile", duration: "2025/09 - 2026/06", description: "Advanced training in modern web frameworks." },
      { school: "Miage Tangier", degree: "IT Development Technician", duration: "2022/09 - 2025/06", description: "Deep dive into Backend architecture, MVC patterns, and Database optimization." }
    ],
    skills: ["Laravel", "PHP", "MySQL", "Next.js", "React", "Tailwind CSS", "JavaScript ES6", "Java", "Git"],
    experience: [
      { company: "Coach Achraf (PFE)", role: "Full-Stack Web Developer", duration: "Feb 2026 - Jun 2026", description: "Designed and developed a complete digital fitness ecosystem, featuring a public landing page, interactive progress trackers for clients, and a dynamic admin dashboard for personalized training management." },
      { company: "Freelance Developer", role: "Full-Stack Web Developer", duration: "Dec 2025 - Jan 2026", description: "Developed custom E-commerce platforms and responsive landing pages." },
      { company: "Miage Tangier (PFE)", role: "Full-Stack Web Developer", duration: "Apr 2025 - Jun 2025", description: "Designed an internal School Management System module." }
    ],
    projects: [
      {
        title: "E-Commerce - Flower Shop",
        shortDescription: "A beautiful product showcase and shopping platform.",
        longDescription: "A modern, highly interactive e-commerce website built for a premium flower boutique. It features fluid animations for showcasing dynamic product catalogs, a fully functional shopping cart, and a seamless checkout experience that sends orders directly to the owner via pre-filled WhatsApp messages.",
        techStack: { Frontend: ["Next.js", "Tailwind CSS", "Framer Motion", "Lucide React"] },
        links: { github: "https://github.com/BenTaleb-Mehdi/Business-flowers", demo: "https://hand-touch.vercel.app/" },
        coverImage: "/images/projects/project-flowers/pro1.png",
        gallery: ["/images/projects/project-flowers/pro1.png", "/images/projects/project-flowers/pro2.png","/images/projects/project-flowers/pro3.png","/images/projects/project-flowers/pro4.png","/images/projects/project-flowers/pro5.png","/images/projects/project-flowers/pro6.png","/images/projects/project-flowers/pro7.png","/images/projects/project-flowers/pro8.png"]
      },
      {
        title: "Coach Achraf - Personal Fitness",
        shortDescription: "A robust full-stack client management and fitness platform tailored for personal trainers.",
        longDescription: "An advanced Graduation Project (PFE) designed as a comprehensive digital hub for online fitness coaching. The platform features an elegant public landing page, personalized workout and nutrition plan distribution, interactive progress trackers for clients, and a dynamic admin dashboard for the coach to manage clients, sessions, and subscriptions seamlessly.",
        techStack: { Backend: ["Laravel", "MySQL" ,"PHP","Laravel ui","Design pattern", "UnitTest"], Frontend: ["Lucide", "Tailwind CSS", "Alpine.js"] , Methodologies: ["Scrum","Design Thinking"]},
        links: { github: "https://github.com/BenTaleb-Mehdi/Project-PFE", demo: "https://coachachraf.online" },
        coverImage: "/images/projects/project-fitness/pro1.png",
        gallery: ["/images/projects/project-fitness/pro1.png", "/images/projects/project-fitness/pro2.png","/images/projects/project-fitness/pro3.png","/images/projects/project-fitness/pro4.png","/images/projects/project-fitness/pro5.png","/images/projects/project-fitness/pro6.png","/images/projects/project-fitness/pro7.png","/images/projects/project-fitness/pro8.png","/images/projects/project-fitness/pro9.png"],
      },
      {
        title: "Plomberie Pro",
        shortDescription: "A sleek, high-converting service showcase and landing page for professional plumbing services.",
        longDescription: "A modern web platform designed to present professional plumbing services and capture local leads. Built with high performance in mind, it features smooth interactive animations to guide potential customers, beautifully structured service sections (installations, emergency repairs, maintenance), and a seamless contact structure optimized for mobile users who need quick assistance.",
        techStack: { Frontend: ["Next.js", "Tailwind CSS", "Framer Motion", "Lucide React"] },
        links: { github: "https://github.com/BenTaleb-Mehdi/Plombeie-Pro", demo: "https://plombeie-pro.vercel.app/" },
        coverImage: "/images/projects/project-plomberie/pro1.png",
        gallery: ["/images/projects/project-plomberie/pro1.png", "/images/projects/project-plomberie/pro2.png", "/images/projects/project-plomberie/pro3.png", "/images/projects/project-plomberie/pro4.png", "/images/projects/project-plomberie/pro5.png", "/images/projects/project-plomberie/pro6.png", "/images/projects/project-plomberie/pro7.png", "/images/projects/project-plomberie/pro8.png", "/images/projects/project-plomberie/pro9.png"]
      },
      {
        title: "SupplementStack",
        shortDescription: "A professional inventory management system and product catalog tailored for fitness supplement retailers.",
        longDescription: "A specialized web platform designed specifically for supplement stores and fitness nutrition brands. It streamlines day-to-day retail operations by featuring real-time inventory tracking, low-stock reorder alerts, comprehensive sales reporting, and an organized product presentation layer built to handle distinct brands, categories, and batch variations efficiently.",
        techStack: { Backend: ["Laravel", "MySQL" ,"PHP" , "Breeze"], Frontend: ["Tailwind CSS"] }, 
        links: { github: "https://github.com/BenTaleb-Mehdi/SupplementStack", demo: "" }, 
        coverImage: "/images/projects/project-supplements/pro1.png",
        gallery: ["/images/projects/project-supplements/pro1.png", "/images/projects/project-supplements/pro2.png", "/images/projects/project-supplements/pro3.png", "/images/projects/project-supplements/pro4.png", "/images/projects/project-supplements/pro5.png", "/images/projects/project-supplements/pro6.png", "/images/projects/project-supplements/pro7.png", "/images/projects/project-supplements/pro8.png"]
      },
      {
        title: "StockMaster Pro",
        shortDescription: "A robust full-stack inventory and order management system with real-time tracking and secure RBAC.",
        longDescription: "A comprehensive enterprise-grade management system engineered to streamline warehouse operations. Powered by Laravel 12 and Livewire 3, it offers an entirely reactive SPA-like experience featuring real-time stock tracking, advanced role-based access control (RBAC) via Spatie permissions, automated invoice generation, and an optimized dashboard for seamless day-to-day business monitoring.",
        techStack: { Backend: ["Laravel 12", "PHP", "Spatie", "MySQL"], Frontend: ["Livewire 3", "Tailwind CSS", "Alpine.js", "Preline UI"] },
        links: { github: "https://github.com/BenTaleb-Mehdi/StockMaster-Pro/tree/develop/StockMaster-Pro", demo: "" },
        coverImage: "/images/projects/project-management-stock/pro1.png",
        gallery: ["/images/projects/project-management-stock/pro1.png", "/images/projects/project-management-stock/pro2.png","/images/projects/project-management-stock/pro3.png","/images/projects/project-management-stock/pro4.png","/images/projects/project-management-stock/pro5.png","/images/projects/project-management-stock/pro6.png","/images/projects/project-management-stock/pro7.png"]
      }
    ]
  },
  
  fr: {
    profile: {
      name: "Mehdi Bentaleb",
      role: "Développeur Full-Stack",
      bio: "Spécialisé dans la création d'applications web robustes avec l'écosystème Laravel et les technologies frontend modernes. Basé à Tanger, Maroc.",
      email: "Mehdibentaleb548@gmail.com",
      socials: { github: "https://github.com/BenTaleb-Mehdi", linkedin: "https://www.linkedin.com/in/mehdi-bentaleb" }
    },
    nav: { work: "Projets", about: "À propos", expertise: "Expertise", contact: "Contact", letsTalk: "Parlons-en" },
    sections: { 
      selectedWorks: "Projets Sélectionnés.", 
      technologies: "Technologies",
      livePreview: "Voir en direct",
      noDemo: "Pas de Démo",
      sourceCode: "Code Source",
      privateCode: "Code Privé",
      viewDetails: "Voir les détails"
    },
    education: [
      { school: "Solicode Tanger", degree: "Développement Web Full-Stack et Mobile", duration: "2025/09 - 2026/06", description: "Formation avancée sur les frameworks web modernes." },
      { school: "Miage Tanger", degree: "Technicien en Développement Informatique", duration: "2022/09 - 2025/06", description: "Étude approfondie de l'architecture Backend, des modèles MVC et de l'optimisation des bases de données." }
    ],
    skills: ["Laravel", "PHP", "MySQL", "Next.js", "React", "Tailwind CSS", "JavaScript ES6", "Java", "Git"],
    experience: [
      { company: "Coach Achraf (PFE)", role: "Développeur Web Full-Stack", duration: "Fév 2026 - Juin 2026", description: "Conception et développement d'un écosystème de fitness numérique complet, comprenant une page de destination, des suivis interactifs pour les clients et un tableau de bord d'administration dynamique." },
      { company: "Développeur Indépendant", role: "Développeur Web Full-Stack", duration: "Déc 2025 - Jan 2026", description: "Développement de plateformes E-commerce sur mesure et de landing pages responsives." },
      { company: "Miage Tanger (PFE)", role: "Développeur Web Full-Stack", duration: "Avr 2025 - Juin 2025", description: "Conception d'un module interne de système de gestion scolaire." }
    ],
    projects: [
      {
        title: "E-Commerce - Flower Shop",
        shortDescription: "Une magnifique plateforme de présentation de produits et d'achat.",
        longDescription: "Un site e-commerce moderne et hautement interactif conçu pour une boutique de fleurs haut de gamme. Il propose des animations fluides pour présenter des catalogues de produits dynamiques, un panier d'achat entièrement fonctionnel et une expérience de paiement fluide qui envoie les commandes directement au propriétaire via des messages WhatsApp pré-remplis.",
        techStack: { Frontend: ["Next.js", "Tailwind CSS", "Framer Motion", "Lucide React"] },
        links: { github: "https://github.com/BenTaleb-Mehdi/Business-flowers", demo: "https://hand-touch.vercel.app/" },
        coverImage: "/images/projects/project-flowers/pro1.png",
        gallery: ["/images/projects/project-flowers/pro1.png", "/images/projects/project-flowers/pro2.png","/images/projects/project-flowers/pro3.png","/images/projects/project-flowers/pro4.png","/images/projects/project-flowers/pro5.png","/images/projects/project-flowers/pro6.png","/images/projects/project-flowers/pro7.png","/images/projects/project-flowers/pro8.png"]
      },
      {
        title: "Coach Achraf - Personal Fitness",
        shortDescription: "Une plateforme robuste de gestion des clients et de fitness conçue pour les entraîneurs personnels.",
        longDescription: "Un projet de fin d'études (PFE) avancé conçu comme un hub numérique complet pour le coaching sportif en ligne. La plateforme comprend une page de destination élégante, une distribution personnalisée de plans d'entraînement et de nutrition, des suivis de progression interactifs, et un tableau de bord pour gérer facilement les clients.",
        techStack: { Backend: ["Laravel", "MySQL" ,"PHP","Laravel ui","Design pattern", "UnitTest"], Frontend: ["Lucide", "Tailwind CSS", "Alpine.js"] , Methodologies: ["Scrum","Design Thinking"]},
        links: { github: "https://github.com/BenTaleb-Mehdi/Project-PFE", demo: "https://coachachraf.online" },
        coverImage: "/images/projects/project-fitness/pro1.png",
        gallery: ["/images/projects/project-fitness/pro1.png", "/images/projects/project-fitness/pro2.png","/images/projects/project-fitness/pro3.png","/images/projects/project-fitness/pro4.png","/images/projects/project-fitness/pro5.png","/images/projects/project-fitness/pro6.png","/images/projects/project-fitness/pro7.png","/images/projects/project-fitness/pro8.png","/images/projects/project-fitness/pro9.png"],
      },
      {
        title: "Plomberie Pro",
        shortDescription: "Une vitrine de services élégante et une landing page à fort taux de conversion pour des services de plomberie.",
        longDescription: "Une plateforme web moderne conçue pour présenter des services de plomberie professionnels et capturer des prospects locaux. Construite en gardant la performance à l'esprit, elle propose des animations interactives fluides pour guider les clients potentiels et une structure de contact optimisée pour les utilisateurs mobiles.",
        techStack: { Frontend: ["Next.js", "Tailwind CSS", "Framer Motion", "Lucide React"] },
        links: { github: "https://github.com/BenTaleb-Mehdi/Plombeie-Pro", demo: "https://plombeie-pro.vercel.app/" },
        coverImage: "/images/projects/project-plomberie/pro1.png",
        gallery: ["/images/projects/project-plomberie/pro1.png", "/images/projects/project-plomberie/pro2.png", "/images/projects/project-plomberie/pro3.png", "/images/projects/project-plomberie/pro4.png", "/images/projects/project-plomberie/pro5.png", "/images/projects/project-plomberie/pro6.png", "/images/projects/project-plomberie/pro7.png", "/images/projects/project-plomberie/pro8.png", "/images/projects/project-plomberie/pro9.png"]
      },
      {
        title: "SupplementStack",
        shortDescription: "Un système professionnel de gestion des stocks et de catalogue de produits adapté aux détaillants de suppléments.",
        longDescription: "Une plateforme web spécialisée conçue spécifiquement pour les magasins de suppléments et les marques de nutrition sportive. Elle rationalise les opérations de vente au détail quotidiennes en offrant un suivi des stocks en temps réel, des alertes de réapprovisionnement, des rapports de ventes détaillés et une présentation organisée des produits.",
        techStack: { Backend: ["Laravel", "MySQL" ,"PHP" , "Breeze"], Frontend: ["Tailwind CSS"] }, 
        links: { github: "https://github.com/BenTaleb-Mehdi/SupplementStack", demo: "" }, 
        coverImage: "/images/projects/project-supplements/pro1.png",
        gallery: ["/images/projects/project-supplements/pro1.png", "/images/projects/project-supplements/pro2.png", "/images/projects/project-supplements/pro3.png", "/images/projects/project-supplements/pro4.png", "/images/projects/project-supplements/pro5.png", "/images/projects/project-supplements/pro6.png", "/images/projects/project-supplements/pro7.png", "/images/projects/project-supplements/pro8.png"]
      },
      {
        title: "StockMaster Pro",
        shortDescription: "Un système robuste de gestion des stocks et des commandes avec suivi en temps réel et RBAC sécurisé.",
        longDescription: "Un système de gestion complet de niveau entreprise conçu pour rationaliser les opérations d'entrepôt. Propulsé par Laravel 12 et Livewire 3, il offre une expérience SPA entièrement réactive, un suivi des stocks en temps réel, un contrôle d'accès avancé basé sur les rôles (RBAC) via les autorisations Spatie et une génération de factures automatisée.",
        techStack: { Backend: ["Laravel 12", "PHP", "Spatie", "MySQL"], Frontend: ["Livewire 3", "Tailwind CSS", "Alpine.js", "Preline UI"] },
        links: { github: "https://github.com/BenTaleb-Mehdi/StockMaster-Pro/tree/develop/StockMaster-Pro", demo: "" },
        coverImage: "/images/projects/project-management-stock/pro1.png",
        gallery: ["/images/projects/project-management-stock/pro1.png", "/images/projects/project-management-stock/pro2.png","/images/projects/project-management-stock/pro3.png","/images/projects/project-management-stock/pro4.png","/images/projects/project-management-stock/pro5.png","/images/projects/project-management-stock/pro6.png","/images/projects/project-management-stock/pro7.png"]
      }
    ]
  },

  es: {
    profile: {
      name: "Mehdi Bentaleb",
      role: "Desarrollador Full-Stack",
      bio: "Especializado en la creación de aplicaciones web robustas utilizando el ecosistema Laravel y tecnologías frontend modernas. Basado en Tánger, Marruecos.",
      email: "Mehdibentaleb548@gmail.com",
      socials: { github: "https://github.com/BenTaleb-Mehdi", linkedin: "https://www.linkedin.com/in/mehdi-bentaleb" }
    },
    nav: { work: "Proyectos", about: "Sobre mí", expertise: "Experiencia", contact: "Contacto", letsTalk: "Hablemos" },
    sections: { 
      selectedWorks: "Proyectos Destacados.", 
      technologies: "Tecnologías",
      livePreview: "Ver en vivo",
      noDemo: "Sin Demo",
      sourceCode: "Código Fuente",
      privateCode: "Código Privado",
      viewDetails: "Ver Detalles"
    },
    education: [
      { school: "Solicode Tánger", degree: "Desarrollo Web Full-Stack y Móvil", duration: "2025/09 - 2026/06", description: "Formación avanzada en frameworks web modernos." },
      { school: "Miage Tánger", degree: "Técnico en Desarrollo Informático", duration: "2022/09 - 2025/06", description: "Inmersión profunda en la arquitectura Backend, patrones MVC y optimización de bases de datos." }
    ],
    skills: ["Laravel", "PHP", "MySQL", "Next.js", "React", "Tailwind CSS", "JavaScript ES6", "Java", "Git"],
    experience: [
      { company: "Coach Achraf (PFE)", role: "Desarrollador Web Full-Stack", duration: "Feb 2026 - Jun 2026", description: "Diseñó y desarrolló un ecosistema digital de fitness completo, que presenta una página de destino, rastreadores de progreso interactivos para clientes y un panel de administración dinámico." },
      { company: "Desarrollador Independiente", role: "Desarrollador Web Full-Stack", duration: "Dic 2025 - Ene 2026", description: "Desarrollo de plataformas de comercio electrónico personalizadas y landing pages responsivas." },
      { company: "Miage Tánger (PFE)", role: "Desarrollador Web Full-Stack", duration: "Abr 2025 - Jun 2025", description: "Diseño de un módulo interno de sistema de gestión escolar." }
    ],
    projects: [
      {
        title: "E-Commerce - Flower Shop",
        shortDescription: "Una hermosa plataforma de presentación de productos y compras.",
        longDescription: "Un sitio de comercio electrónico moderno y altamente interactivo creado para una boutique de flores premium. Cuenta con animaciones fluidas para mostrar catálogos de productos dinámicos, un carrito de compras completamente funcional y una experiencia de pago perfecta que envía pedidos directamente al propietario a través de mensajes de WhatsApp.",
        techStack: { Frontend: ["Next.js", "Tailwind CSS", "Framer Motion", "Lucide React"] },
        links: { github: "https://github.com/BenTaleb-Mehdi/Business-flowers", demo: "https://hand-touch.vercel.app/" },
        coverImage: "/images/projects/project-flowers/pro1.png",
        gallery: ["/images/projects/project-flowers/pro1.png", "/images/projects/project-flowers/pro2.png","/images/projects/project-flowers/pro3.png","/images/projects/project-flowers/pro4.png","/images/projects/project-flowers/pro5.png","/images/projects/project-flowers/pro6.png","/images/projects/project-flowers/pro7.png","/images/projects/project-flowers/pro8.png"]
      },
      {
        title: "Coach Achraf - Personal Fitness",
        shortDescription: "Una robusta plataforma de gestión de clientes y fitness adaptada a entrenadores personales.",
        longDescription: "Un proyecto avanzado de graduación (PFE) diseñado como un centro digital integral para el entrenamiento físico en línea. La plataforma presenta una elegante página de destino pública, distribución personalizada de planes de entrenamiento y nutrición, y un panel de administración dinámico para que el entrenador gestione clientes sin problemas.",
        techStack: { Backend: ["Laravel", "MySQL" ,"PHP","Laravel ui","Design pattern", "UnitTest"], Frontend: ["Lucide", "Tailwind CSS", "Alpine.js"] , Methodologies: ["Scrum","Design Thinking"]},
        links: { github: "https://github.com/BenTaleb-Mehdi/Project-PFE", demo: "https://coachachraf.online" },
        coverImage: "/images/projects/project-fitness/pro1.png",
        gallery: ["/images/projects/project-fitness/pro1.png", "/images/projects/project-fitness/pro2.png","/images/projects/project-fitness/pro3.png","/images/projects/project-fitness/pro4.png","/images/projects/project-fitness/pro5.png","/images/projects/project-fitness/pro6.png","/images/projects/project-fitness/pro7.png","/images/projects/project-fitness/pro8.png","/images/projects/project-fitness/pro9.png"],
      },
      {
        title: "Plomberie Pro",
        shortDescription: "Un escaparate de servicios elegante y una landing page de alta conversión para servicios de fontanería.",
        longDescription: "Una plataforma web moderna diseñada para presentar servicios profesionales de plomería y captar clientes potenciales locales. Construida teniendo en cuenta el alto rendimiento, presenta animaciones interactivas fluidas para guiar a los clientes potenciales y una estructura de contacto perfecta optimizada para usuarios móviles.",
        techStack: { Frontend: ["Next.js", "Tailwind CSS", "Framer Motion", "Lucide React"] },
        links: { github: "https://github.com/BenTaleb-Mehdi/Plombeie-Pro", demo: "https://plombeie-pro.vercel.app/" },
        coverImage: "/images/projects/project-plomberie/pro1.png",
        gallery: ["/images/projects/project-plomberie/pro1.png", "/images/projects/project-plomberie/pro2.png", "/images/projects/project-plomberie/pro3.png", "/images/projects/project-plomberie/pro4.png", "/images/projects/project-plomberie/pro5.png", "/images/projects/project-plomberie/pro6.png", "/images/projects/project-plomberie/pro7.png", "/images/projects/project-plomberie/pro8.png", "/images/projects/project-plomberie/pro9.png"]
      },
      {
        title: "SupplementStack",
        shortDescription: "Un sistema profesional de gestión de inventario y catálogo de productos para minoristas de suplementos.",
        longDescription: "Una plataforma web especializada diseñada específicamente para tiendas de suplementos y marcas de nutrición deportiva. Optimiza las operaciones minoristas diarias al presentar seguimiento de inventario en tiempo real, alertas de reabastecimiento, informes de ventas completos y una capa de presentación de productos organizada.",
        techStack: { Backend: ["Laravel", "MySQL" ,"PHP" , "Breeze"], Frontend: ["Tailwind CSS"] }, 
        links: { github: "https://github.com/BenTaleb-Mehdi/SupplementStack", demo: "" }, 
        coverImage: "/images/projects/project-supplements/pro1.png",
        gallery: ["/images/projects/project-supplements/pro1.png", "/images/projects/project-supplements/pro2.png", "/images/projects/project-supplements/pro3.png", "/images/projects/project-supplements/pro4.png", "/images/projects/project-supplements/pro5.png", "/images/projects/project-supplements/pro6.png", "/images/projects/project-supplements/pro7.png", "/images/projects/project-supplements/pro8.png"]
      },
      {
        title: "StockMaster Pro",
        shortDescription: "Un sistema integral de gestión de inventario y pedidos con seguimiento en tiempo real y RBAC seguro.",
        longDescription: "Un sistema integral de gestión de nivel empresarial diseñado para optimizar las operaciones de almacén. Desarrollado con Laravel 12 y Livewire 3, ofrece una experiencia SPA completamente reactiva que presenta seguimiento de existencias en tiempo real, control de acceso basado en roles (RBAC) avanzado a través de permisos Spatie y generación automática de facturas.",
        techStack: { Backend: ["Laravel 12", "PHP", "Spatie", "MySQL"], Frontend: ["Livewire 3", "Tailwind CSS", "Alpine.js", "Preline UI"] },
        links: { github: "https://github.com/BenTaleb-Mehdi/StockMaster-Pro/tree/develop/StockMaster-Pro", demo: "" },
        coverImage: "/images/projects/project-management-stock/pro1.png",
        gallery: ["/images/projects/project-management-stock/pro1.png", "/images/projects/project-management-stock/pro2.png","/images/projects/project-management-stock/pro3.png","/images/projects/project-management-stock/pro4.png","/images/projects/project-management-stock/pro5.png","/images/projects/project-management-stock/pro6.png","/images/projects/project-management-stock/pro7.png"]
      }
    ]
  }
};