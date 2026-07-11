const API_URL = 'https://portfolio-website-production-b6ab.up.railway.app/api';
let adminKey = '';

// ===== LOGIN =====
function login() {
  const inputKey = document.getElementById('adminKeyInput').value;

  fetch(`${API_URL}/skills`, {
    method: 'GET'
  })
  .then(() => {
    adminKey = inputKey;
    testAdminKey();
  });
}

async function testAdminKey() {
  try {
    const response = await fetch(`${API_URL}/skills`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-admin-key': adminKey
      },
      body: JSON.stringify({ name: '__test__' })
    });

    if (response.status === 401) {
      document.getElementById('loginError').textContent = 'Password salah';
      return;
    }

    const result = await response.json();
    await fetch(`${API_URL}/skills/${result.id}`, {
      method: 'DELETE',
      headers: { 'x-admin-key': adminKey }
    });

    document.getElementById('loginBox').classList.add('hidden');
    document.getElementById('adminPanel').classList.remove('hidden');
    loadSkillsList();
    loadPortfolioList();

  } catch (error) {
    document.getElementById('loginError').textContent = 'Gagal terhubung ke server';
  }
}

// ===== SKILLS =====
async function loadSkillsList() {
  const response = await fetch(`${API_URL}/skills`);
  const skills = await response.json();

  document.getElementById('statSkills').textContent = skills.length;

  const container = document.getElementById('skillsList');
  container.innerHTML = '';

  if (skills.length === 0) {
    container.innerHTML = '<p class="item-empty">Belum ada skill. Tambahkan lewat form di atas.</p>';
    return;
  }

  skills.forEach(skill => {
    const row = document.createElement('div');
    row.className = 'item-row';
    row.innerHTML = `
      <span>${skill.name}</span>
      <button class="btn-delete" onclick="deleteSkill(${skill.id})">Hapus</button>
    `;
    container.appendChild(row);
  });
}

async function addSkill() {
  const name = document.getElementById('skillName').value.trim();
  if (!name) return;

  await fetch(`${API_URL}/skills`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-admin-key': adminKey
    },
    body: JSON.stringify({ name })
  });

  document.getElementById('skillName').value = '';
  loadSkillsList();
}

async function deleteSkill(id) {
  await fetch(`${API_URL}/skills/${id}`, {
    method: 'DELETE',
    headers: { 'x-admin-key': adminKey }
  });
  loadSkillsList();
}

// ===== PORTFOLIO =====
async function loadPortfolioList() {
  const response = await fetch(`${API_URL}/portfolio`);
  const projects = await response.json();

  document.getElementById('statProjects').textContent = projects.length;

  const container = document.getElementById('portfolioList');
  container.innerHTML = '';

  if (projects.length === 0) {
    container.innerHTML = '<p class="item-empty">Belum ada proyek. Tambahkan lewat form di atas.</p>';
    return;
  }

  projects.forEach(project => {
    const row = document.createElement('div');
    row.className = 'item-row';
    row.innerHTML = `
      <span>${project.title}</span>
      <button class="btn-delete" onclick="deleteProject(${project.id})">Hapus</button>
    `;
    container.appendChild(row);
  });
}

async function addProject() {
  const title = document.getElementById('projTitle').value.trim();
  const description = document.getElementById('projDesc').value.trim();
  const tags = document.getElementById('projTags').value.trim();
  const link = document.getElementById('projLink').value.trim();
  const link_text = document.getElementById('projLinkText').value.trim();

  if (!title || !description) return;

  await fetch(`${API_URL}/portfolio`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-admin-key': adminKey
    },
    body: JSON.stringify({ title, description, tags, link, link_text })
  });

  document.getElementById('projTitle').value = '';
  document.getElementById('projDesc').value = '';
  document.getElementById('projTags').value = '';
  document.getElementById('projLink').value = '';
  document.getElementById('projLinkText').value = '';
  loadPortfolioList();
}

async function deleteProject(id) {
  await fetch(`${API_URL}/portfolio/${id}`, {
    method: 'DELETE',
    headers: { 'x-admin-key': adminKey }
  });
  loadPortfolioList();
}