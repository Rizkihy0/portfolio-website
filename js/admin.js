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
    loadContentForm();
    loadEducationList();
    loadSkillsList();
    loadPortfolioList();

  } catch (error) {
    document.getElementById('loginError').textContent = 'Gagal terhubung ke server';
  }
}

// ===== SITE CONTENT =====
async function loadContentForm() {
  const response = await fetch(`${API_URL}/content`);
  const content = await response.json();

  Object.keys(content).forEach(key => {
    const el = document.getElementById(`edit_${key}`);
    if (el) el.value = content[key];
  });
}

async function saveContent(key, inputId) {
  const value = document.getElementById(inputId).value.trim();
  const msg = document.getElementById('contentSaveMsg');

  try {
    const response = await fetch(`${API_URL}/content/${key}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'x-admin-key': adminKey
      },
      body: JSON.stringify({ value })
    });

    if (!response.ok) {
      msg.textContent = 'Gagal menyimpan. Coba lagi.';
      msg.style.color = 'var(--danger)';
      return;
    }

    msg.textContent = 'Tersimpan.';
    msg.style.color = 'var(--blue-dark)';
    setTimeout(() => { msg.textContent = ''; }, 2000);

  } catch (error) {
    msg.textContent = 'Gagal terhubung ke server.';
    msg.style.color = 'var(--danger)';
  }
}

// ===== EDUCATION =====
async function loadEducationList() {
  const response = await fetch(`${API_URL}/education`);
  const educationList = await response.json();

  document.getElementById('statEducation').textContent = educationList.length;

  const container = document.getElementById('educationList');
  container.innerHTML = '';

  if (educationList.length === 0) {
    container.innerHTML = '<p class="item-empty">Belum ada riwayat pendidikan. Tambahkan lewat form di atas.</p>';
    return;
  }

  educationList.forEach(edu => {
    const row = document.createElement('div');
    row.className = 'item-row-multiline';
    const majorText = edu.major ? ` — ${edu.major}` : '';
    row.innerHTML = `
      <div class="item-top">
        <div>
          <p class="item-year">${edu.level} · ${edu.year_start} — ${edu.year_end}</p>
          <span>${edu.institution}${majorText}</span>
        </div>
        <button class="btn-delete" onclick="deleteEducation(${edu.id})">Hapus</button>
      </div>
    `;
    container.appendChild(row);
  });
}

async function addEducation() {
  const level = document.getElementById('eduLevel').value.trim();
  const institution = document.getElementById('eduInstitution').value.trim();
  const major = document.getElementById('eduMajor').value.trim();
  const year_start = document.getElementById('eduYearStart').value.trim();
  const year_end = document.getElementById('eduYearEnd').value.trim();
  const description = document.getElementById('eduDescription').value.trim();

  if (!level || !institution || !year_start || !year_end) return;

  await fetch(`${API_URL}/education`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-admin-key': adminKey
    },
    body: JSON.stringify({ level, institution, major, year_start, year_end, description })
  });

  document.getElementById('eduLevel').value = '';
  document.getElementById('eduInstitution').value = '';
  document.getElementById('eduMajor').value = '';
  document.getElementById('eduYearStart').value = '';
  document.getElementById('eduYearEnd').value = '';
  document.getElementById('eduDescription').value = '';
  loadEducationList();
}

async function deleteEducation(id) {
  await fetch(`${API_URL}/education/${id}`, {
    method: 'DELETE',
    headers: { 'x-admin-key': adminKey }
  });
  loadEducationList();
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