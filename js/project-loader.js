// Variables globales
let currentProjectImages = [];

async function loadProject(projectId) {
  try {
    // 1. Cargar datos JSON
    const response = await fetch(`data/${projectId}.json`);
    if (!response.ok) throw new Error('Project not found');
    const projectData = await response.json();

    // 2. Actualizar metadatos
    document.title = projectData.meta.title;
    document.getElementById('dynamic-desc').content = projectData.meta.description;

    // 3. Preparar imágenes para lightbox
    currentProjectImages = projectData.content.screenshots || [];

    // 4. Generar HTML
    const html = generateProjectHTML(projectData);
    document.getElementById('project-content').innerHTML = html;

    // 5. Inicializar eventos
    initEventListeners(projectData);

  } catch (error) {
    console.error('Error loading project:', error);
    showError();
  }
}

function generateProjectHTML(projectData) {
  return `
    <div class="row">
      <!-- Columna izquierda -->
      <div class="col-lg-8">
        <h1 class="mb-4">${projectData.content.title}</h1>
        
        ${generateMediaHTML(projectData.content.media)}
        
        <h3>About This Project</h3>
        ${projectData.content.about.map(p => `<p>${p}</p>`).join('')}
        
        <h3 class="mt-4">Key Features</h3>
        <ul>
          ${projectData.content.features.map(f => `<li>${f}</li>`).join('')}
        </ul>
        
        <h3 class="mt-4">Technologies Used</h3>
        <div class="tech-grid">
          ${projectData.content.technologies.map(tech => `
            <div class="tech-item">
              <i class="tech-icon ${tech.icon}"></i>
              <span class="tech-label">${tech.name}</span>
            </div>
          `).join('')}
        </div>
      </div>
      
      <!-- Columna derecha -->
      <div class="col-lg-4" style="margin-top: 4.5rem; !important">
        ${generateDetailsCard(projectData)}
        ${generateScreenshots(projectData.content.screenshots)}
        ${generateLearnings(projectData.content.learnings)}
      </div>
    </div>
    
    <!-- Navegación -->
    ${generateNavigation(projectData.content.navigation)}
  `;
}

function generateMediaHTML(media) {
  if (media.type === 'youtube') {
    return `
      <div class="video-container ratio ratio-16x9 mb-4">


       

        <img src="https://img.youtube.com/vi/${media.url}/maxresdefault.jpg" alt="Video thumbnail" class="video-thumbnail">
        <div class="play-overlay">
          <div class="play-button position-absolute top-50 start-50 translate-middle">
                <svg xmlns="http://www.w3.org/2000/svg" width="72" height="72" viewBox="0 0 24 24" fill="var(--accent-color) " style="
                    width: 100%;
                    height: 100%;
                    scale: 1;
                ">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z"/>
                </svg>
              </div>
        </div>
      </div>
    `;
  }
  return ''; // Puedes añadir más tipos (image, vimeo, etc.)
}

function generateDetailsCard(projectData) {
  const linksHTML = [];
  if (projectData.content.links.webpage) {
    linksHTML.push(`
        <div class="col p-0">
            <a href="${projectData.content.links.webpage}" class="btn btn-primary btn-custom" target="_blank" style="
    width: 100%;
">
                <i class="fas fa-globe"></i><br>Game Webpage
            </a>
        </div>
    `);
  }
  if (projectData.content.links.github) {
    linksHTML.push(`
        <div class="col p-0">
            <a href="${projectData.content.links.github}" class="btn btn-outline-secondary btn-custom" target="_blank" style="
    width: 100%;
">
                <i class="fab fa-github"></i><br>GitHub repository
            </a>
        </div>
    `);
  }
  if (projectData.content.links.download) {
    linksHTML.push(`
        <div class="col p-0">
            <a href="${projectData.content.links.download}" class="btn btn-outline-secondary btn-custom" target="_blank" style="
    width: 100%;
">
                <i class="fas fa-download"></i><br>Direct Download
            </a>
        </div>
    `);
  }

  return `
    <div class="project-details-card mb-4">
      <h4 class="mb-3">Project Details</h4>
      <p><strong>Role:</strong> ${projectData.content.details.role}</p>
      <p><strong>Date:</strong> ${projectData.content.details.date}</p>
      <p><strong>Category:</strong> ${projectData.content.details.category}</p>
      <p><strong>Team Size:</strong> ${projectData.content.details.teamSize}</p>
      <p class="mb-3"><strong>Duration:</strong> ${projectData.content.details.duration}</p>
      
      <div class="row gap-2 mt-3">
        ${linksHTML.join('')}
      </div>
    </div>
  `;
}

function generateScreenshots(screenshots) {
  if (!screenshots || screenshots.length === 0) return '';
  
  return `
    <div class="project-details-card mb-4">
      <h4 class="mb-3">Screenshots</h4>
      <div class="row g-2">
        ${screenshots.map((img, idx) => `
          <div class="col-6 col-md-4">
            <img src="${img}" 
                 alt="Screenshot ${idx + 1}" 
                 class="img-fluid screenshot-thumb rounded"
                 onclick="openLightbox('${img}', ${idx})"
                 loading="lazy">
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

function generateLearnings(learnings) {
  return `
    <div class="project-details-card">
      <h4 class="mb-3">What I Learned</h4>
      <ul class="mb-0">
        ${learnings.map(l => `<li>${l}</li>`).join('')}
      </ul>
    </div>
  `;
}

function generateNavigation(nav) {
  return `
    <div class="project-navigation mt-5 pt-4 border-top">
      <div class="d-flex justify-content-between">
        ${nav.previous ? `
          <a href="project.html?id=${nav.previous}" class="btn btn-outline-secondary">
            ← Previous Project
          </a>
        ` : '<div></div>'}
        
        <a href="./index.html" class="btn btn-primary">
          Back to Portfolio
        </a>
        
        ${nav.next ? `
          <a href="project.html?id=${nav.next}" class="btn btn-outline-secondary">
            Next Project →
          </a>
        ` : '<div></div>'}
      </div>
    </div>
  `;
}

function initEventListeners(projectData) {
  // Video play button
  const playBtn = document.querySelector('.play-button');
  if (playBtn && projectData.content.media.type === 'youtube') {
    playBtn.addEventListener('click', () => {
      loadYoutubeVideo(projectData.content.media.url);
    });
  }
}

function loadYoutubeVideo(videoId) {
  const container = document.querySelector('.video-container');
  container.innerHTML = `
    <div class="ratio ratio-16x9">
      <iframe 
        src="https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&rel=0&modestbranding=1" 
        title="Gameplay Video"
        frameborder="0" 
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen>
      </iframe>
    </div>
  `;
}

// Lightbox functions
function openLightbox(imgSrc, index) {
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  
  currentImageIndex = index;
  lightboxImg.src = imgSrc;
  lightbox.style.display = 'flex';
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  document.getElementById('lightbox').style.display = 'none';
  document.body.style.overflow = 'auto';
}

function changeImage(n) {
  currentImageIndex = (currentImageIndex + n + currentProjectImages.length) % currentProjectImages.length;
  document.getElementById('lightbox-img').src = currentProjectImages[currentImageIndex];
}

// Global functions
window.openLightbox = openLightbox;
window.closeLightbox = closeLightbox;
window.changeImage = changeImage;

function showError() {
  document.getElementById('project-content').innerHTML = `
    <div class="alert alert-danger">
      <h4>Error loading project</h4>
      <p>Please try again later or <a href="./index.html">return to portfolio</a></p>
    </div>
  `;
}