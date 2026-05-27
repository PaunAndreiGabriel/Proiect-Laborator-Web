const GITHUB_USERNAME = 'PaunAndreiGabriel';
const REPOS_PER_PAGE = 6;

let allRepositories = [];
let displayedCount = 0;

const container = document.getElementById('projects-container');
const loadingState = document.getElementById('loading-state');
const errorState = document.getElementById('error-state');
const errorMessage = document.getElementById('error-message');
const loadMoreBtn = document.getElementById('load-more-btn');
const fewProjectsNotice = document.getElementById('few-projects-notice');
const avatarImg = document.getElementById('avatar-img');
const avatarFallback = document.getElementById('avatar-fallback');

if (avatarImg && avatarFallback) {
    avatarImg.addEventListener('error', () => {
        avatarImg.classList.add('hidden');
        avatarFallback.classList.remove('hidden');
    });
}

async function fetchGitHubProfile() {
    try {
        const response = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}`);
        if (!response.ok) return;

        const data = await response.json();
        const roleEl = document.getElementById('profile-role');
        const bioEl = document.getElementById('profile-bio');

        if (data.avatar_url && avatarImg) avatarImg.src = data.avatar_url;
        if (data.company && roleEl) roleEl.textContent = data.company;
        if (data.bio && bioEl) bioEl.textContent = data.bio;
    } catch (error) {
        console.warn('Profil GitHub indisponibil:', error);
    }
}

async function fetchGitHubRepositories() {
    if (loadingState) loadingState.hidden = false;
    if (errorState) errorState.hidden = true;
    if (fewProjectsNotice) fewProjectsNotice.hidden = true;
    if (errorMessage) errorMessage.textContent = '';

    try {
        const response = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated`);

        if (!response.ok) {
            throw new Error('GitHub API a returnat o eroare.');
        }

        const repositories = await response.json();
        // Keep only repos created by the user (exclude forks) and not archived
        allRepositories = repositories.filter(repo => repo.fork === false && !repo.archived);

        if (loadingState) loadingState.hidden = true;

        if (allRepositories.length === 0) {
            showFewProjectsNotice('Nu s-au găsit proiecte publice. Se afișează o listă de rezervă.');
            displayFallbackProjects();
            return;
        }

        if (allRepositories.length < 5) {
            showFewProjectsNotice('Sunt puține proiecte publice (<5). Se afișează o listă de rezervă suplimentară.');
            displayFallbackProjects();
            return;
        }

        // Render initial batch
        renderInitialRepos();

    } catch (error) {
        if (loadingState) loadingState.hidden = true;
        if (errorState) errorState.hidden = false;
        if (errorMessage) errorMessage.textContent = `${error.message} Se afișează lista de rezervă.`;
        displayFallbackProjects();
    }
}

function showFewProjectsNotice(message) {
    if (!fewProjectsNotice) return;
    fewProjectsNotice.textContent = `Notă: ${message}`;
    fewProjectsNotice.hidden = false;
    if (loadMoreBtn) loadMoreBtn.hidden = true;
}

function renderInitialRepos() {
    container.innerHTML = '';
    displayedCount = 0;
    displayNextRepos();
    if (allRepositories.length > REPOS_PER_PAGE) {
        if (loadMoreBtn) loadMoreBtn.hidden = false;
    } else {
        if (loadMoreBtn) loadMoreBtn.hidden = true;
    }
}

function displayNextRepos() {
    const nextBatch = allRepositories.slice(displayedCount, displayedCount + REPOS_PER_PAGE);

    nextBatch.forEach(repo => {
        const description = repo.description ? repo.description : 'Fără descriere disponibilă.';
        const language = repo.language ? repo.language : 'Markdown/Text';

        const card = document.createElement('article');
        card.className = 'card repo-card';
        card.innerHTML = `
            <div>
                <div class="repo-top">
                    <span class="badge">Limbaj: ${language}</span>
                    <div class="repo-meta">
                        <span>Stele: ${repo.stargazers_count ?? 0}</span>
                        <span>Fork-uri: ${repo.forks_count ?? 0}</span>
                    </div>
                </div>
                <h3><a href="${repo.html_url}" target="_blank" rel="noreferrer">${repo.name}</a></h3>
                <p class="repo-description">${description}</p>
            </div>
        `;
        container.appendChild(card);
    });

    displayedCount += nextBatch.length;

    if (displayedCount >= allRepositories.length) {
        if (loadMoreBtn) loadMoreBtn.hidden = true;
    } else {
        if (loadMoreBtn) loadMoreBtn.hidden = false;
    }
}

function displayFallbackProjects() {
    container.innerHTML = '';

    const localRepos = [
        { name: 'Proiect-OOP-Java', description: 'Aplicație desktop dezvoltată în Java.', language: 'Java', stargazers_count: 2, forks_count: 0 },
        { name: 'Grafica-Pe-Calculator', description: 'Implementări de algoritmi pentru randare grafică 2D și 3D.', language: 'C++', stargazers_count: 0, forks_count: 1 },
        { name: 'Web-Landing-Page', description: 'Pagină web modernă realizată cu HTML și CSS.', language: 'HTML/CSS', stargazers_count: 1, forks_count: 0 },
        { name: 'Algoritmi-C++', description: 'Colecție de probleme rezolvate pentru structuri de date și algoritmi.', language: 'C++', stargazers_count: 1, forks_count: 0 },
        { name: 'UI-Components', description: 'Componente reutilizabile pentru interfețe web curate și responsive.', language: 'JavaScript', stargazers_count: 1, forks_count: 0 }
    ];

    localRepos.forEach(repo => {
        const card = document.createElement('article');
        card.className = 'card repo-card';
        card.innerHTML = `
            <div>
                <div class="repo-top">
                    <span class="badge">Limbaj: ${repo.language}</span>
                    <div class="repo-meta">
                        <span>Stele: ${repo.stargazers_count}</span>
                        <span>Fork-uri: ${repo.forks_count}</span>
                    </div>
                </div>
                <h3><a href="${repo.html_url ? repo.html_url : '#'}" target="_blank" rel="noreferrer">${repo.name}</a></h3>
                <p class="repo-description">${repo.description}</p>
            </div>
        `;
        container.appendChild(card);
    });

    if (loadMoreBtn) loadMoreBtn.hidden = true;
}

if (loadMoreBtn) loadMoreBtn.addEventListener('click', displayNextRepos);

document.addEventListener('DOMContentLoaded', () => {
    fetchGitHubProfile();
    fetchGitHubRepositories();
});
