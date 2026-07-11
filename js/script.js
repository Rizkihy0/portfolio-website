// ===== AMBIL DATA DARI API =====
const API_URL = 'http://localhost:3000/api';

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