// ===== AMBIL DATA DARI API =====
const API_URL = 'https://portfolio-website-production-b6ab.up.railway.app/api';

async function loadSiteContent() {
  try {
    const response = await fetch(`${API_URL}/content`);
    const content = await response.json();

    document.getElementById('heroGreeting').textContent = content.hero_greeting;
    document.getElementById('heroName').textContent = content.hero_name;
    document.getElementById('heroHeadline').textContent = content.hero_headline;
    document.getElementById('heroTagline').textContent = content.hero_tagline;

    document.getElementById('aboutTitle').textContent = content.about_title;
    document.getElementById('aboutText1').textContent = content.about_text_1;
    document.getElementById('aboutText2').textContent = content.about_text_2;

    document.getElementById('contactIntro').textContent = content.contact_intro;
    document.getElementById('contactGithub').href = content.contact_github;
    document.getElementById('contactLinkedin').href = content.contact_linkedin;
    document.getElementById('contactEmail').href = `mailto:${content.contact_email}`;

    document.title = `${content.hero_name} | Portfolio`;

  } catch (error) {
    console.error('Gagal memuat konten situs:', error);
  }
}

async function loadEducation() {
  try {
    const response = await fetch(`${API_URL}/education`);
    const educationList = await response.json();

    const timeline = document.getElementById('educationTimeline');
    timeline.innerHTML = '';

    educationList.forEach(edu => {
      const item = document.createElement('div');
      item.className = 'timeline-item';

      const majorHTML = edu.major ? `<p class="timeline-major">${edu.major}</p>` : '';
      const descHTML = edu.description ? `<p class="timeline-desc">${edu.description}</p>` : '';

      item.innerHTML = `
        <p class="timeline-year">${edu.year_start} — ${edu.year_end}</p>
        <h3>${edu.institution}</h3>
        ${majorHTML}
        ${descHTML}
      `;

      timeline.appendChild(item);
    });
  } catch (error) {
    console.error('Gagal memuat riwayat pendidikan:', error);
  }
}

async function loadSkills() {
  try {
    const response = await fetch(`${API_URL}/skills`);
    const skills = await response.json();

    const skillsGrid = document.getElementById('skillsGrid');
    skills.forEach(skill => {
      const card = document.createElement('div');
      card.className = 'skill-card';
      card.textContent = skill.name;
      skillsGrid.appendChild(card);
    });
  } catch (error) {
    console.error('Gagal memuat skills:', error);
  }
}

async function loadPortfolio() {
  try {
    const response = await fetch(`${API_URL}/portfolio`);
    const projects = await response.json();

    const portfolioGrid = document.getElementById('portfolioGrid');
    projects.forEach((project, index) => {
      const card = document.createElement('div');
      card.className = 'project-card';

      const tagsArray = project.tags.split(',').map(tag => tag.trim());
      const tagsHTML = tagsArray.map(tag => `<span>${tag}</span>`).join('');

      card.innerHTML = `
        <span class="project-number">0${index + 1}</span>
        <div class="project-info">
          <h3>${project.title}</h3>
          <p>${project.description}</p>
          <div class="tech-tags">${tagsHTML}</div>
          <a href="${project.link}" target="_blank" class="project-link">${project.link_text}</a>
        </div>
      `;

      portfolioGrid.appendChild(card);
    });
  } catch (error) {
    console.error('Gagal memuat portfolio:', error);
  }
}

loadSiteContent();
loadEducation();
loadSkills();
loadPortfolio();

const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

navToggle.addEventListener('click', () => {
  navLinks.classList.toggle('active');
  navToggle.classList.toggle('active');
});

document.querySelectorAll('.navbar-links a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('active');
    navToggle.classList.remove('active');
  });
});