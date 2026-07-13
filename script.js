/* =========================================================
   SLIMZY CONCEPTS — SITE SCRIPT
   -------------------------------------------------------
   HOW TO ADD YOUR OWN WORK:
   1. Scroll to VIDEO PROJECTS or BRANDING PROJECTS below.
   2. Copy one object inside the array and edit its fields.
   3. thumb: path to an image, e.g. "images/launch-01.jpg"
      (drop your image files into the /images folder).
   4. link: where the "view project" click should go
      (Behance, Vimeo, YouTube, Instagram post, etc).
   That's it — the page rebuilds the gallery automatically.
   ========================================================= */

/* ---------- VIDEO / MOTION PROJECTS ---------- */
const videoProjects = [
  {
    category: "Launch Video",
    title: "Product Launch — Add Title",
    desc: "Short one-line description of the video and what it delivers.",
    thumb: "",
    link: "#"
  },
  {
    category: "Promo video",
    title: "Zidi of Subandgain",
    desc: "Promo Video for Zidi AI whatsapp assitant.",
    thumb: "",
    link: "https://vimeo.com/1209531331?fl=ip&fe=ec"
  },
  {
    category: "Explainer",
    title: "Explainer Video — Add Title",
    desc: "Turns a complex idea into a clear, simple visual story.",
    thumb: "",
    link: "#"
  },
  {
    category: "Motion Graphics",
    title: "Motion Graphics — Add Title",
    desc: "Purposeful animation and graphics supporting the message.",
    thumb: "",
    link: "#"
  },
  {
    category: "Social Edit",
    title: "Social / Short-form — Add Title",
    desc: "Scroll-stopping short-form edit optimized for reach.",
    thumb: "",
    link: "#"
  }
];

/* ---------- BRANDING / IDENTITY PROJECTS ---------- */
const brandingProjects = [
  {
    category: "Brand Identity",
    title: "Fintech Brand — Add Title",
    desc: "Logo, color system and brand guidelines for a fintech client.",
    thumb: "",
    mark: "V",
    link: "#"
  },
  {
    category: "Web3 / Crypto",
    title: "Web3 Identity — Add Title",
    desc: "Visual identity and social kit for a Web3 / NFT project.",
    thumb: "",
    mark: "N",
    link: "#"
  },
  {
    category: "SaaS",
    title: "SaaS Brand — Add Title",
    desc: "Clean, credible brand system for a B2B SaaS product.",
    thumb: "",
    mark: "K",
    link: "#"
  }
];

/* ========================================================= */

const videoGrid = document.getElementById('videoGrid');
const frameRowA = document.getElementById('frameRowA');
const frameRowB = document.getElementById('frameRowB');
const filterRow = document.getElementById('videoFilters');

function playIcon(){
  return `<svg width="18" height="18" viewBox="0 0 18 18"><path d="M4 2.5v13l12-6.5z"/></svg>`;
}

function sprocket(){
  let dots = '';
  for(let i=0;i<10;i++){ dots += '<i></i>'; }
  return `<div class="sprocket top">${dots}</div><div class="sprocket bottom">${dots}</div>`;
}

function renderVideoCards(list){
  videoGrid.innerHTML = list.map(p => `
    <a class="video-card" href="${p.link}" target="_blank" rel="noopener">
      <div class="video-thumb" style="${p.thumb ? `background-image:url('${p.thumb}');background-size:cover;background-position:center;` : ''}">
        ${sprocket()}
        <div class="play-btn">${playIcon()}</div>
      </div>
      <div class="video-info">
        <span class="video-tag">${p.category}</span>
        <h3>${p.title}</h3>
        <p>${p.desc}</p>
      </div>
    </a>
  `).join('');
}

function frameTile(p){
  return `
    <a class="frame-tile" href="${p.link}" target="_blank" rel="noopener">
      <div class="frame-tile-inner" style="${p.thumb ? `background-image:url('${p.thumb}');background-size:cover;background-position:center;` : ''}">
        ${p.thumb ? '' : `<span class="frame-mark">${p.mark || p.title.charAt(0)}</span>`}
        <span class="frame-tag">${p.category}</span>
      </div>
    </a>
  `;
}

function renderFrameWall(list){
  // Repeat the list enough times to fill a wide screen and loop seamlessly.
  const repeated = [...list, ...list, ...list, ...list, ...list];
  frameRowA.innerHTML = repeated.map(frameTile).join('');
  frameRowB.innerHTML = [...repeated].reverse().map(frameTile).join('');
}

function renderFilters(){
  const cats = ['All', ...new Set(videoProjects.map(p => p.category))];
  filterRow.innerHTML = cats.map((c,i) => `
    <button class="filter-btn ${i===0 ? 'active' : ''}" data-filter="${c}">${c}</button>
  `).join('');

  filterRow.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      filterRow.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const val = btn.dataset.filter;
      const filtered = val === 'All' ? videoProjects : videoProjects.filter(p => p.category === val);
      renderVideoCards(filtered);
    });
  });
}

renderVideoCards(videoProjects);
renderFrameWall(brandingProjects);
renderFilters();

/* ---------- MOBILE NAV TOGGLE ---------- */
const navToggle = document.getElementById('navToggle');
const mainNav = document.getElementById('mainNav');

navToggle.addEventListener('click', () => {
  const isOpen = mainNav.classList.toggle('open');
  navToggle.classList.toggle('open', isOpen);
  navToggle.setAttribute('aria-expanded', isOpen);
});

mainNav.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    mainNav.classList.remove('open');
    navToggle.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
  });
});

/* ---------- ACTIVE NAV LINK ON SCROLL ---------- */
const navLinks = document.querySelectorAll('[data-nav]');
const sections = Array.from(navLinks).map(link => document.querySelector(link.getAttribute('href')));

function updateActiveNav(){
  const scrollPos = window.scrollY + 120;
  let current = null;
  sections.forEach(sec => {
    if(sec && sec.offsetTop <= scrollPos){ current = sec.id; }
  });
  navLinks.forEach(link => {
    link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
  });
}
window.addEventListener('scroll', updateActiveNav);
updateActiveNav();

/* ---------- CONTACT FORM -> MAILTO ---------- */
const contactForm = document.getElementById('contactForm');
const formNote = document.getElementById('formNote');

contactForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const projectType = document.getElementById('projectType').value;
  const budget = document.getElementById('budget').value;
  const message = document.getElementById('message').value.trim();

  const subject = encodeURIComponent(`New project inquiry — ${projectType || 'Slimzy Concepts'}`);
  const body = encodeURIComponent(
    `Name: ${name}\nEmail: ${email}\nProject type: ${projectType}\nBudget: ${budget}\n\nDetails:\n${message}`
  );

  window.location.href = `mailto:slimzyconcept@gmail.com?subject=${subject}&body=${body}`;

  formNote.textContent = "Opening your email app... if nothing happens, email slimzyconcept@gmail.com directly.";
});

/* ---------- FOOTER YEAR ---------- */
document.getElementById('year').textContent = new Date().getFullYear();
