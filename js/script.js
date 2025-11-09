// Three.js 3D Background Animation
let scene, camera, renderer, particles, particleSystem;
let mouseX = 0,
  mouseY = 0;
let windowHalfX = window.innerWidth / 2;
let windowHalfY = window.innerHeight / 2;

// Initialize Three.js
function initThreeJS() {
  const canvas = document.getElementById("three-canvas");

  // Scene
  scene = new THREE.Scene();
  scene.fog = new THREE.Fog(0x0a0a0a, 1, 1000);

  // Camera
  camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    1,
    1000
  );
  camera.position.z = 100;

  // Renderer
  renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true,
    antialias: true,
    powerPreference: "high-performance",
  });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)); // Limit pixel ratio for performance

  // Create particles
  createParticles();

  // Create floating geometric shapes
  createFloatingShapes();

  // Add lighting
  const ambientLight = new THREE.AmbientLight(0x00ff88, 0.3);
  scene.add(ambientLight);

  const directionalLight = new THREE.DirectionalLight(0x00ff88, 0.5);
  directionalLight.position.set(50, 50, 50);
  scene.add(directionalLight);

  // Event listeners
  document.addEventListener("mousemove", onDocumentMouseMove);
  window.addEventListener("resize", onWindowResize);

  // Start animation
  animate();
}

// Create particle system
function createParticles() {
  const particleCount = 100;
  const particles = new THREE.BufferGeometry();
  const positions = new Float32Array(particleCount * 3);
  const colors = new Float32Array(particleCount * 3);

  for (let i = 0; i < particleCount; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 200;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 200;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 200;

    colors[i * 3] = 0; // R
    colors[i * 3 + 1] = 1; // G
    colors[i * 3 + 2] = 0.5; // B
  }

  particles.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  particles.setAttribute("color", new THREE.BufferAttribute(colors, 3));

  const particleMaterial = new THREE.PointsMaterial({
    size: 2,
    vertexColors: true,
    transparent: true,
    opacity: 0.8,
    blending: THREE.AdditiveBlending,
  });

  particleSystem = new THREE.Points(particles, particleMaterial);
  scene.add(particleSystem);
}

// Create floating geometric shapes
function createFloatingShapes() {
  const geometries = [
    new THREE.BoxGeometry(5, 5, 5),
    new THREE.SphereGeometry(3, 8, 8),
    new THREE.TetrahedronGeometry(4),
    new THREE.OctahedronGeometry(3),
  ];

  const material = new THREE.MeshPhongMaterial({
    color: 0x00ff88,
    transparent: true,
    opacity: 0.3,
    wireframe: true,
  });

  for (let i = 0; i < 15; i++) {
    const geometry = geometries[Math.floor(Math.random() * geometries.length)];
    const mesh = new THREE.Mesh(geometry, material.clone());

    mesh.position.x = (Math.random() - 0.5) * 150;
    mesh.position.y = (Math.random() - 0.5) * 150;
    mesh.position.z = (Math.random() - 0.5) * 150;

    mesh.rotation.x = Math.random() * Math.PI;
    mesh.rotation.y = Math.random() * Math.PI;

    mesh.userData = {
      rotationSpeed: {
        x: (Math.random() - 0.5) * 0.01,
        y: (Math.random() - 0.5) * 0.01,
        z: (Math.random() - 0.5) * 0.01,
      },
      floatSpeed: (Math.random() - 0.5) * 0.02,
      floatOffset: Math.random() * Math.PI * 2,
    };

    scene.add(mesh);
  }
}

// Mouse move handler
function onDocumentMouseMove(event) {
  mouseX = (event.clientX - windowHalfX) * 0.05;
  mouseY = (event.clientY - windowHalfY) * 0.05;
}

// Window resize handler
function onWindowResize() {
  windowHalfX = window.innerWidth / 2;
  windowHalfY = window.innerHeight / 2;

  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);
}

// Animation loop
function animate() {
  requestAnimationFrame(animate);

  // Rotate camera based on mouse position
  camera.position.x += (mouseX - camera.position.x) * 0.05;
  camera.position.y += (-mouseY - camera.position.y) * 0.05;
  camera.lookAt(scene.position);

  // Animate particles with enhanced effects
  if (particleSystem) {
    particleSystem.rotation.x += 0.0005;
    particleSystem.rotation.y += 0.0005;

    // Add pulsing effect to particles
    const time = Date.now() * 0.001;
    particleSystem.material.opacity = 0.6 + Math.sin(time) * 0.2;
  }

  // Animate floating shapes with enhanced effects
  scene.traverse((child) => {
    if (child.isMesh && child.userData.rotationSpeed) {
      child.rotation.x += child.userData.rotationSpeed.x;
      child.rotation.y += child.userData.rotationSpeed.y;
      child.rotation.z += child.userData.rotationSpeed.z;

      child.position.y +=
        Math.sin(Date.now() * 0.001 + child.userData.floatOffset) *
        child.userData.floatSpeed;

      // Add color cycling effect
      const time = Date.now() * 0.001;
      child.material.color.setHSL(
        0.3 + Math.sin(time + child.userData.floatOffset) * 0.1,
        1,
        0.5
      );
    }
  });

  renderer.render(scene, camera);

  // Performance monitoring
  updatePerformanceStats();
}

// Performance monitoring function
function updatePerformanceStats() {
  if (!window.performance || !window.performance.now) return;

  const now = performance.now();
  if (!window.lastFrameTime) window.lastFrameTime = now;

  const delta = now - window.lastFrameTime;
  window.lastFrameTime = now;

  if (!window.frameCount) window.frameCount = 0;
  window.frameCount++;

  if (window.frameCount % 60 === 0) {
    // Update every 60 frames (~1 second)
    const fps = Math.round(1000 / delta);
    console.log(`FPS: ${fps}`);

    // Optional: Display FPS on screen or adjust quality based on performance
    if (fps < 30 && window.devicePixelRatio > 1) {
      renderer.setPixelRatio(1); // Reduce quality if performance is poor
    } else if (fps > 50 && window.devicePixelRatio < 2) {
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)); // Increase quality if performance is good
    }
  }
}

// Create special 3D effects for hero section
function createHero3DEffects() {
  // Create floating tech icons in 3D space
  const techIcons = [
    { icon: "fab fa-js", color: "#f7df1e" },
    { icon: "fab fa-react", color: "#61dafb" },
    { icon: "fab fa-node-js", color: "#339933" },
    { icon: "fab fa-python", color: "#3776ab" },
    { icon: "fab fa-laravel", color: "#ff2d20" },
  ];

  // Create floating text elements
  const floatingTexts = ["CODE", "CREATE", "INNOVATE", "DESIGN", "BUILD"];

  // Add 3D text elements (simulated with floating divs)
  const heroSection = document.querySelector(".hero-section");

  floatingTexts.forEach((text, index) => {
    const textElement = document.createElement("div");
    textElement.className = "floating-3d-text";
    textElement.textContent = text;
    textElement.style.cssText = `
            position: absolute;
            color: rgba(0, 255, 136, 0.1);
            font-size: 2rem;
            font-weight: bold;
            z-index: 1;
            pointer-events: none;
            left: ${Math.random() * 80 + 10}%;
            top: ${Math.random() * 80 + 10}%;
            animation: float3d ${3 + Math.random() * 2}s ease-in-out infinite;
            animation-delay: ${index * 0.5}s;
        `;
    heroSection.appendChild(textElement);
  });

  // Add CSS for 3D text animation
  const style = document.createElement("style");
  style.textContent = `
        @keyframes float3d {
            0%, 100% { transform: translateY(0px) rotateY(0deg); }
            50% { transform: translateY(-20px) rotateY(180deg); }
        }
        
        .floating-3d-text {
            text-shadow: 0 0 10px rgba(0, 255, 136, 0.3);
        }
    `;
  document.head.appendChild(style);
}

// Static Data from Laravel Controller
const staticData = {
  projects: [
    {
      id: 1,
      title: "Ban's Coffee Shop",
      description:
        "A stylish and modern coffee shop website featuring an elegant design, menu display, and online ordering system built with HTML, CSS, JavaScript, and PHP.",
      technologies: ["HTML", "CSS", "JavaScript"],
      link: "#",
      github_link: "#",
      image: "Images/coffeshop.png",
      featured: true,
      order: 1,
    },
    {
      id: 2,
      title: "Nike Store",
      description:
        "An e-commerce Nike store clone with dynamic product pages, cart functionality, and responsive layout using JavaScript and PHP.",
      technologies: ["HTML", "CSS", "JavaScript", "PHP", "MySQL"],
      link: "https://bentaleb-mehdi.github.io/Nike-Project/",
      github_link: "https://github.com/BenTaleb-Mehdi/Nike-Project",
      image: "Images/nikeStore.png",
      featured: false,
      order: 2,
    },
    {
      id: 3,
      title: "Apple Store",
      description:
        "A clean and professional Apple Store website showcasing modern UI, smooth animations, and product details inspired by Apple’s official design.",
      technologies: ["HTML", "CSS", "JavaScript", "GSAP"],
      link: "https://bentaleb-mehdi.github.io/ProjectSiteweb_Ecom/",
      github_link: "https://github.com/BenTaleb-Mehdi/ProjectSiteweb_Ecom",
      image: "Images/appleStore.png",
      featured: true,
      order: 3,
    },
    {
      id: 4,
      title: "Market Store",
      description:
        "A full e-commerce marketplace website that allows browsing, adding products to cart, and managing orders through a PHP + MySQL backend.",
      technologies: ["PHP", "MySQL", "JavaScript", "Tailwindcss", "Laravel"],
      link: "#",
      github_link: "https://github.com/BenTaleb-Mehdi/Market-Store",
      image: "Images/imgStore.png",
      featured: true,
      order: 4,
    },
    {
      id: 5,
      title: "Flowers Dashboard",
      description:
        "An admin dashboard for managing flower shop data — including products, sales, and customers — built with PHP, MySQL, and Chart.js.",
      technologies: ["PHP", "MySQL", "Chart.js", "CSS", "MVC"],
      link: "#",
      github_link:
        "https://github.com/BenTaleb-Mehdi/Project_Managemment_flowers",
      image: "Images/dashboard.png",
      featured: true,
      order: 5,
    },
    {
      id: 6,
      title: "Portfolio Website",
      description:
        "A personal portfolio website showcasing projects, skills, and experience with a minimalist and responsive design.",
      technologies: ["HTML", "CSS", "JavaScript", "Laravel", "PHP", "MySQL"],
      link: "#",
      github_link:
        "https://github.com/BenTaleb-Mehdi/Portofolio-Bentaleb-mehdi",
      image: "Images/portfolio.png",
      featured: false,
      order: 6,
    },
  ],

  skills: [
    {
      name: "HTML5",
      category: "Frontend",
      proficiency: 98,
      icon: "fab fa-html5",
      color: "#e34f26",
      order: 1,
    },
    {
      name: "CSS3",
      category: "Frontend",
      proficiency: 95,
      icon: "fab fa-css3-alt",
      color: "#1572b6",
      order: 2,
    },
    {
      name: "JavaScript",
      category: "Frontend",
      proficiency: 90,
      icon: "fab fa-js",
      color: "#f7df1e",
      order: 3,
    },
    {
      name: "PHP",
      category: "Backend",
      proficiency: 85,
      icon: "fab fa-php",
      color: "#777bb4",
      order: 4,
    },
    {
      name: "MySQL",
      category: "Database",
      proficiency: 82,
      icon: "fas fa-database",
      color: "#00758f",
      order: 5,
    },
    {
      name: "Laravel",
      category: "Backend",
      proficiency: 80,
      icon: "fab fa-laravel",
      color: "#ff2d20",
      order: 6,
    },
    {
      name: "Bootstrap",
      category: "Frontend",
      proficiency: 88,
      icon: "fab fa-bootstrap",
      color: "#7952b3",
      order: 7,
    },
    {
      name: "Chart.js",
      category: "Frontend",
      proficiency: 75,
      icon: "fas fa-chart-line",
      color: "#ff6384",
      order: 8,
    },
    {
      name: "Tailwind CSS",
      category: "Frontend",
      proficiency: 87,
      icon: "fas fa-wind",
      color: "#38bdf8",
      order: 9,
    },
    {
      name: "GitHub",
      category: "Tools",
      proficiency: 90,
      icon: "fab fa-github",
      color: "#333",
      order: 10,
    },
  ],
  education: [
    {
      institution: "Allal Fassi High School - Tangier",
      degree: "Baccalaureate (2nd Year)",
      field_of_study: "General Education",
      start_date: "2021-09-01",
      end_date: "2022-06-30",
      description:
        "Completed secondary education with a focus on general studies before transitioning into the IT field.",
      grade: "Good",
      current: false,
      order: 1,
    },
    {
      institution: "Miage School - Tangier",
      degree: "Diploma: Technicien Spécialisé en Développement Informatique",
      field_of_study: "Software & Web Development",
      start_date: "2023-10-15",
      end_date: "2025-07-24",
      description:
        "Learned programming fundamentals, databases, and web technologies including PHP, MySQL, and JavaScript. Completed several academic projects.",
      grade: "Very Good",
      current: false,
      order: 2,
    },
    {
      institution: "SoliCode - Tangier",
      degree: "Professional Training (2nd Year)",
      field_of_study: "Mobile Development with Laravel",
      start_date: "2025-09-8",
      end_date: null,
      description:
        "Currently pursuing advanced studies focused on mobile app and backend development using Laravel, APIs, and responsive design.",
      grade: "In Progress",
      current: true,
      order: 3,
    },
  ],
};

// Comments storage (using localStorage for persistence)
let comments = JSON.parse(localStorage.getItem("portfolio_comments")) || [];

// DOM Ready
document.addEventListener("DOMContentLoaded", function () {
  initializeApp();
});

function initializeApp() {
  // Initialize Three.js first
  initThreeJS();

  // Create hero 3D effects
  createHero3DEffects();

  loadFeaturedProjects();
  loadSkills();
  loadEducation();
  loadComments();
  setupEventListeners();
  setupNavigation();
  animateOnScroll();
}

// Load Featured Projects
function loadFeaturedProjects() {
  const container = document.getElementById("featured-projects");
  const featuredProjects = staticData.projects
    .filter((p) => p.featured)
    .sort((a, b) => a.order - b.order);

  container.innerHTML = featuredProjects
    .map(
      (project) => `
        <div class="project-card">
            ${
              project.image
                ? `<img src="${project.image}" alt="${project.title}" class="project-image">`
                : ""
            }
            <h3>${project.title}</h3>
            <p>${project.description}</p>
            <div class="project-tech">
                ${project.technologies
                  .map((tech) => `<span class="tech-tag">${tech}</span>`)
                  .join("")}
            </div>
            <div class="project-links">
                ${
                  project.link
                    ? `<a href="${project.link}" target="_blank" class="project-link">Live Demo →</a>`
                    : ""
                }
                ${
                  project.github_link
                    ? `<a href="${project.github_link}" target="_blank" class="project-link">GitHub →</a>`
                    : ""
                }
            </div>
        </div>
    `
    )
    .join("");
}

// Load All Projects
function showAllProjects() {
  const container = document.getElementById("featured-projects");
  const allProjects = staticData.projects.sort((a, b) => a.order - b.order);

  container.innerHTML = allProjects
    .map(
      (project) => `
        <div class="project-card">
            ${
              project.image
                ? `<img src="${project.image}" alt="${project.title}" class="project-image">`
                : ""
            }
            <h3>${project.title}</h3>
            <p>${project.description}</p>
            <div class="project-tech">
                ${project.technologies
                  .map((tech) => `<span class="tech-tag">${tech}</span>`)
                  .join("")}
            </div>
            <div class="project-links">
                ${
                  project.link
                    ? `<a href="${project.link}" target="_blank" class="project-link">Live Demo →</a>`
                    : ""
                }
                ${
                  project.github_link
                    ? `<a href="${project.github_link}" target="_blank" class="project-link">GitHub →</a>`
                    : ""
                }
            </div>
        </div>
    `
    )
    .join("");

  // Hide the button after showing all projects
  event.target.style.display = "none";
}

// Load Skills
function loadSkills() {
  const container = document.getElementById("skills-grid");
  const skills = staticData.skills.sort((a, b) => a.order - b.order);

  container.innerHTML = skills
    .map(
      (skill) => `
        <div class="skill-item">
            <div class="skill-icon">
                ${
                  skill.icon
                    ? `<i class="${skill.icon}"></i>`
                    : `<span>${skill.name.substring(0, 2)}</span>`
                }
            </div>
            <h3>${skill.name}</h3>
            <div class="skill-bar">
                <div class="skill-progress" style="width: ${
                  skill.proficiency
                }%"></div>
            </div>
            <span class="skill-percentage">${skill.proficiency}%</span>
        </div>
    `
    )
    .join("");
}

// Load Education
function loadEducation() {
  const container = document.getElementById("education-timeline");
  const education = staticData.education.sort((a, b) => a.order - b.order);

  container.innerHTML = education
    .map(
      (edu) => `
        <div class="education-item">
            <div class="education-date">
                ${formatDate(edu.start_date)} - ${
        edu.current ? "Present" : formatDate(edu.end_date)
      }
            </div>
            <div class="education-content">
                <h3>${edu.degree}</h3>
                <h4>${edu.institution}</h4>
                <p>${edu.field_of_study}</p>
                <p>${edu.description}</p>
                ${
                  edu.grade
                    ? `<span class="education-grade">Grade: ${edu.grade}</span>`
                    : ""
                }
            </div>
        </div>
    `
    )
    .join("");
}

// Comments Management
function loadComments() {
  const container = document.getElementById("comments-container");
  const approvedComments = comments
    .filter((c) => c.approved)
    .sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

  if (approvedComments.length === 0) {
    container.innerHTML =
      '<p class="no-comments">No comments yet. Be the first to leave a comment!</p>';
    return;
  }

  container.innerHTML = approvedComments
    .map(
      (comment) => `
        <div class="comment-item">
            <div class="comment-header">
                <h4>${comment.name}</h4>
                <span class="comment-date">${formatDate(
                  comment.created_at
                )}</span>
            </div>
            <p>${comment.comment}</p>
        </div>
    `
    )
    .join("");
}
(function () {
  emailjs.init("52hFe6zN57O3zvqZE"); // 🔑 Your EmailJS public key
})();

// Contact Form Handler
document
  .getElementById("contact-form")
  .addEventListener("submit", function (e) {
    e.preventDefault();

    const formData = new FormData(this);
    const name = formData.get("name"); // Get user's name

    emailjs.sendForm("service_xpe39fm", "template_17q59pf", this).then(
      () => {
        showCustomAlert(
          `Thank you ${name}! Your message has been sent successfully.`,
          "success"
        );
        this.reset();
      },
      (error) => {
        showCustomAlert(
          "❌ Failed to send message. Please try again later.",
          "error"
        );
        console.error("EmailJS Error:", error);
      }
    );
  });

// Function to show custom alert
function showCustomAlert(message, type = "success") {
  const alertBox = document.getElementById("custom-alert");
  const alertMessage = document.getElementById("alert-message");

  alertMessage.textContent = message;

  // Set class based on type
  alertBox.className = `toast ${type} show`; // 'toast success' or 'toast error'

  // Remove after 4 seconds
  setTimeout(() => {
    alertBox.classList.remove("show");
    alertBox.classList.add("hidden");
  }, 4000);
}

// Comment Form Handler
document
  .getElementById("comment-form")
  .addEventListener("submit", function (e) {
    e.preventDefault();

    const formData = new FormData(e.target);
    const name = formData.get("name");
    const email = formData.get("email");
    const comment = formData.get("comment");

    // Create new comment
    const newComment = {
      id: Date.now(),
      name: name,
      email: email,
      comment: comment,
      approved: true, // Auto-approve for demo
      created_at: new Date().toISOString(),
    };

    // Add to storage
    comments.push(newComment);
    localStorage.setItem("portfolio_comments", JSON.stringify(comments));

    // Reload comments
    loadComments();

    // Reset form
    e.target.reset();

    alert("Thank you for your comment! It has been posted.");
  });

// AI Chat Handler
document
  .getElementById("ai-chat-form")
  .addEventListener("submit", function (e) {
    e.preventDefault();

    const formData = new FormData(e.target);
    const question = formData.get("question");
    const chatContainer = document.getElementById("ai-chat");

    // Add user message
    const userMessage = document.createElement("div");
    userMessage.className = "ai-message user-message";
    userMessage.innerHTML = `
        <div class="message-avatar">You</div>
        <div class="message-content">
            <p>${question}</p>
        </div>
    `;
    chatContainer.appendChild(userMessage);

    // Simulate AI response
    setTimeout(() => {
      const response = generateAIResponse(question);
      const aiMessage = document.createElement("div");
      aiMessage.className = "ai-message ai-response";
      aiMessage.innerHTML = `
            <div class="message-avatar">AI</div>
            <div class="message-content">
                <p>${response}</p>
            </div>
        `;
      chatContainer.appendChild(aiMessage);
      chatContainer.scrollTop = chatContainer.scrollHeight;
    }, 1000);

    // Reset form
    e.target.reset();
  });

// AI Response Generator
function generateAIResponse(question) {
  const lowerQuestion = question.toLowerCase();

  if (lowerQuestion.includes("skill") || lowerQuestion.includes("technology")) {
    return "BENTALEB MEHDI is skilled in HTML, CSS, JavaScript, PHP, MySQL, and Laravel, along with frontend tools like Tailwind CSS and Bootstrap. He focuses on creating responsive, dynamic, and user-friendly websites.";
  } else if (lowerQuestion.includes("project")) {
    return "BENTALEB MEHDI has built several projects including Ban’s Coffee Shop, Nike Store, Apple Store, Market Store, Flowers Dashboard, and his personal Portfolio. You can explore all these in the Projects section.";
  } else if (
    lowerQuestion.includes("education") ||
    lowerQuestion.includes("study")
  ) {
    return "BENTALEB MEHDI studied at Allal Fassi High School (2021–2022), earned a Diploma in Développement Informatique from Miage School Tangier (2022–2024), and is currently studying at SoliCode Tangier specializing in Mobile Development with Laravel (2024–present).";
  } else if (lowerQuestion.includes("experience")) {
    return "BENTALEB MEHDI has hands-on experience in front-end and full-stack web development, working on real-world projects using PHP, MySQL, and Laravel. He also creates content about web development to help others learn.";
  } else if (
    lowerQuestion.includes("contact") ||
    lowerQuestion.includes("reach")
  ) {
    return "You can contact BENTALEB MEHDI via email at mehdybentaleb548@gmail.com or connect through LinkedIn and GitHub. He is available for freelance and remote opportunities worldwide.";
  } else {
    return "I'm here to answer questions about BENTALEB MEHDI's skills, projects, education, and experience. Feel free to ask about any of these topics!";
  }
}

// Navigation Setup
function setupNavigation() {
  const hamburger = document.querySelector(".hamburger");
  const navMenu = document.querySelector(".nav-menu");
  const navLinks = document.querySelectorAll(".nav-link");

  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");
  });

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      hamburger.classList.remove("active");
      navMenu.classList.remove("active");
    });
  });
}

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

// Scroll Animation with 3D Integration
function animateOnScroll() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("animate-in");

        // Add 3D effects when elements come into view
        if (entry.target.classList.contains("project-card")) {
          // Create 3D sparkle effect for projects
          create3DSparkles(entry.target);
        } else if (entry.target.classList.contains("skill-item")) {
          // Create 3D glow effect for skills
          create3DGlow(entry.target);
        }
      }
    });
  });

  document
    .querySelectorAll(".project-card, .skill-item, .education-item")
    .forEach((el) => {
      observer.observe(el);
    });
}

// 3D Sparkle Effect for Projects
function create3DSparkles(element) {
  if (!window.scene) return;

  const rect = element.getBoundingClientRect();
  const centerX = ((rect.left + rect.width / 2) / window.innerWidth) * 2 - 1;
  const centerY = (-(rect.top + rect.height / 2) / window.innerHeight) * 2 + 1;

  // Create temporary sparkles
  for (let i = 0; i < 10; i++) {
    const sparkle = new THREE.Mesh(
      new THREE.SphereGeometry(0.02, 8, 8),
      new THREE.MeshBasicMaterial({
        color: new THREE.Color().setHSL(Math.random(), 0.8, 0.8),
        transparent: true,
        opacity: 1,
      })
    );

    sparkle.position.set(
      centerX + (Math.random() - 0.5) * 2,
      centerY + (Math.random() - 0.5) * 2,
      -2 + Math.random() * 2
    );

    window.scene.add(sparkle);

    // Animate sparkle
    const startTime = Date.now();
    function animateSparkle() {
      const elapsed = Date.now() - startTime;
      if (elapsed > 2000) {
        window.scene.remove(sparkle);
        sparkle.geometry.dispose();
        sparkle.material.dispose();
        return;
      }

      sparkle.material.opacity = 1 - elapsed / 2000;
      sparkle.position.y += 0.01;
      requestAnimationFrame(animateSparkle);
    }
    animateSparkle();
  }
}

// 3D Glow Effect for Skills
function create3DGlow(element) {
  if (!window.scene) return;

  const rect = element.getBoundingClientRect();
  const centerX = ((rect.left + rect.width / 2) / window.innerWidth) * 2 - 1;
  const centerY = (-(rect.top + rect.height / 2) / window.innerHeight) * 2 + 1;

  // Create glowing ring
  const ring = new THREE.Mesh(
    new THREE.RingGeometry(0.3, 0.5, 16),
    new THREE.MeshBasicMaterial({
      color: 0x00ff88,
      transparent: true,
      opacity: 0.6,
      side: THREE.DoubleSide,
    })
  );

  ring.position.set(centerX, centerY, -1);
  window.scene.add(ring);

  // Animate glow
  const startTime = Date.now();
  function animateGlow() {
    const elapsed = Date.now() - startTime;
    if (elapsed > 3000) {
      window.scene.remove(ring);
      ring.geometry.dispose();
      ring.material.dispose();
      return;
    }

    ring.rotation.z += 0.02;
    ring.material.opacity = 0.6 * (1 - elapsed / 3000);
    requestAnimationFrame(animateGlow);
  }
  animateGlow();
}

// Utility Functions
function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
  });
}

function setupEventListeners() {
  // Add any additional event listeners here
}

// Add CSS animations
const style = document.createElement("style");
style.textContent = `
    .animate-in {
        animation: fadeInUp 0.6s ease-out;
    }
    
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(style);
