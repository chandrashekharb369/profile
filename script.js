// ===========================
// TYPING EFFECT
// ===========================
const roles = [
  'Data Scientist',
  'ML Engineer',
  'Python Developer',
  'Cybersecurity Enthusiast',
  'Data Analyst',
  'Problem Solver'
];

let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typingEl = document.getElementById('typingText');
const TYPING_SPEED = 90;
const DELETING_SPEED = 50;
const PAUSE = 1800;

function typeRole() {
  if (!typingEl) return;
  const current = roles[roleIndex];

  if (!isDeleting) {
    typingEl.textContent = current.slice(0, charIndex + 1);
    charIndex++;
    if (charIndex === current.length) {
      isDeleting = true;
      setTimeout(typeRole, PAUSE);
      return;
    }
    setTimeout(typeRole, TYPING_SPEED);
  } else {
    typingEl.textContent = current.slice(0, charIndex - 1);
    charIndex--;
    if (charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
    }
    setTimeout(typeRole, DELETING_SPEED);
  }
}

typeRole();

// ===========================
// NAVBAR SCROLL EFFECT
// ===========================
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
}, { passive: true });

// ===========================
// ACTIVE NAV LINK
// ===========================
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

function setActiveLink() {
  const scrollPos = window.scrollY + window.innerHeight / 3;
  sections.forEach((section) => {
    if (scrollPos >= section.offsetTop && scrollPos < section.offsetTop + section.offsetHeight) {
      navLinks.forEach((link) => {
        link.style.color = '';
        link.style.borderBottomColor = '';
      });
      const activeLink = document.querySelector(`.nav-link[href="#${section.id}"]`);
      if (activeLink) {
        activeLink.style.color = 'var(--accent)';
      }
    }
  });
}

window.addEventListener('scroll', setActiveLink, { passive: true });
setActiveLink();

// ===========================
// MOBILE NAV TOGGLE
// ===========================
const navToggle = document.getElementById('navToggle');
const navLinksContainer = document.getElementById('navLinks');

if (navToggle) {
  navToggle.addEventListener('click', () => {
    navLinksContainer.classList.toggle('open');
    const spans = navToggle.querySelectorAll('span');
    const isOpen = navLinksContainer.classList.contains('open');
    if (isOpen) {
      spans[0].style.transform = 'translateY(7px) rotate(45deg)';
      spans[1].style.opacity = '0';
      spans[2].style.transform = 'translateY(-7px) rotate(-45deg)';
    } else {
      spans[0].style.transform = '';
      spans[1].style.opacity = '';
      spans[2].style.transform = '';
    }
  });
}

// Close mobile nav on link click
document.querySelectorAll('.nav-link').forEach((link) => {
  link.addEventListener('click', () => {
    navLinksContainer.classList.remove('open');
    const spans = navToggle?.querySelectorAll('span');
    if (spans) {
      spans[0].style.transform = '';
      spans[1].style.opacity = '';
      spans[2].style.transform = '';
    }
  });
});

// ===========================
// SCROLL FADE-IN ANIMATION
// ===========================
const fadeEls = document.querySelectorAll(
  '.section, .skill-category, .featured-project, .project-card, .edu-item'
);

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, {
  threshold: 0.08,
  rootMargin: '0px 0px -40px 0px'
});

fadeEls.forEach((el) => {
  el.classList.add('fade-in');
  observer.observe(el);
});

// ===========================
// RESUME DOWNLOAD (placeholder)
// ===========================
function handleResumeClick(e) {
  e.preventDefault();
  // Create a simple text resume for demo
  const resumeContent = `CHANDRASHEKHAR B
Pavagada, Tumkur, Karnataka, India
+91 9141172963 | chandrashekharb200258700101@gmail.com
GitHub: github.com/chanrashekharb989
LinkedIn: linkedin.com/in/chandrashekharb369

PROFESSIONAL SUMMARY
Detail-oriented and passionate Data Science postgraduate with strong foundations in mathematics, statistics, and programming.

EDUCATION
M.Sc. in Data Science – Tumkur University (Expected 2025)
B.Sc. PMCs – Government First Grade College, Pavagada (2020-2024, 70%)

SKILLS
Languages: Python, C, Java, SQL, HTML, CSS, JavaScript
Libraries: Pandas, NumPy, Scikit-learn, TensorFlow, PyTorch, OpenCV, BeautifulSoup, Streamlit
Databases: MySQL, SQLite
Visualization: Matplotlib, Seaborn, Power BI, Excel

PROJECTS
- Stock Price Prediction (Python, NLP, Sentiment Analysis)
- Online Voting System (HTML, CSS, JS, MySQL, PHP)
- Data Cleaning Tool (Python, Streamlit, Pandas)
- Exam Evaluation Portal (Python, PHP, MySQL, AI)

INTERNSHIP
Deloitte Virtual Internship – Data Analysis`;

  const blob = new Blob([resumeContent], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'Chandrashekhar_B_Resume.txt';
  a.click();
  URL.revokeObjectURL(url);
}

document.getElementById('resumeBtn')?.addEventListener('click', handleResumeClick);
document.getElementById('resumeBtnHero')?.addEventListener('click', handleResumeClick);

// ===========================
// AVATAR FALLBACK (if no image)
// ===========================
const avatarImg = document.getElementById('heroAvatar');
if (avatarImg) {
  avatarImg.addEventListener('error', () => {
    avatarImg.style.display = 'none';
    const placeholder = document.createElement('div');
    placeholder.style.cssText = `
      width: 280px;
      height: 280px;
      border-radius: 50%;
      background: linear-gradient(135deg, #e8f3ff, #c8e0ff);
      border: 3px solid #e0e0e0;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 6rem;
      z-index: 2;
      position: relative;
    `;
    placeholder.innerHTML = '<span>👨‍💻</span>';
    avatarImg.parentNode.insertBefore(placeholder, avatarImg.nextSibling);
  });
}

// ===========================
// SMOOTH HOVER ON CARDS
// ===========================
document.querySelectorAll('.project-card, .skill-category').forEach((card) => {
  card.addEventListener('mouseenter', () => {
    card.style.willChange = 'transform';
  });
  card.addEventListener('mouseleave', () => {
    card.style.willChange = '';
  });
});

// ===========================
// VOTE BAR ANIMATION
// ===========================
const bars = document.querySelectorAll('.vbar-fill');
const barObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const target = entry.target;
      const targetWidth = target.style.width;
      target.style.width = '0%';
      setTimeout(() => {
        target.style.width = targetWidth;
      }, 200);
      barObserver.unobserve(target);
    }
  });
}, { threshold: 0.5 });

bars.forEach((bar) => barObserver.observe(bar));

console.log('🚀 Chandrashekhar B Portfolio loaded!');
