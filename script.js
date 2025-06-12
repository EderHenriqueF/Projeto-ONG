/**
 * ConectaVoluntários - Aplicação para conectar voluntários a instituições
 * 
 * Este script contém toda a lógica JavaScript da aplicação, incluindo:
 * - Navegação entre seções
 * - Formulário de cadastro de necessidades
 * - Listagem e filtragem de oportunidades
 * - Efeitos visuais e animações
 */

// Dados das necessidades (simulando um banco de dados)
let needs = [];

// Elementos da navegação
const navHome = document.getElementById('nav-home');
const navRegister = document.getElementById('nav-register');
const navNeeds = document.getElementById('nav-needs');

// Seções da página
const homeSection = document.getElementById('home-section');
const welcomeSection = document.getElementById('welcome-section');
const registerSection = document.getElementById('register-section');
const needsSection = document.getElementById('needs-section');

// Botões de ação
const heroRegister = document.getElementById('hero-register');
const heroNeeds = document.getElementById('hero-needs');
const welcomeRegister = document.getElementById('welcome-register');
const welcomeNeeds = document.getElementById('welcome-needs');

// Formulário
const needForm = document.getElementById('need-form');
const cepInput = document.getElementById('cep');
const streetInput = document.getElementById('street');
const neighborhoodInput = document.getElementById('neighborhood');
const cityInput = document.getElementById('city');
const stateInput = document.getElementById('state');

// Listagem de necessidades
const needsContainer = document.getElementById('needs-container');
const searchInput = document.getElementById('search-input');
const filterType = document.getElementById('filter-type');

/**
 * Cria corações flutuantes animados no fundo da página
 * 
 * Esta função cria múltiplos elementos de coração com posições e tempos de animação aleatórios
 * para criar um efeito visual agradável no plano de fundo.
 */
function createHearts() {
    const heartsContainer = document.getElementById('hearts-container');
    const heartCount = 15;
    
    for (let i = 0; i < heartCount; i++) {
        const heart = document.createElement('div');
        heart.classList.add('heart');
        heart.innerHTML = '❤️';
        heart.style.left = `${Math.random() * 100}%`;
        heart.style.animationDuration = `${5 + Math.random() * 10}s`;
        heart.style.animationDelay = `${Math.random() * 5}s`;
        heartsContainer.appendChild(heart);
    }
}

/**
 * Mostra uma seção específica e esconde as outras
 * 
 * @param {HTMLElement} sectionToShow - A seção que deve ser exibida
 * 
 * Esta função controla a navegação entre as diferentes seções da aplicação,
 * garantindo que apenas a seção ativa seja visível.
 */
function showSection(sectionToShow) {
    const sections = [welcomeSection, registerSection, needsSection];
    sections.forEach(section => {
        if (section === sectionToShow) {
            section.classList.remove('hidden');
        } else {
            section.classList.add('hidden');
        }
    });

    // Ajustar a exibição do hero
    if (sectionToShow === welcomeSection) {
        homeSection.style.display = 'flex';
    } else {
        homeSection.style.display = 'none';
    }
    
    // Atualizar navegação ativa
    const navItems = [navHome, navRegister, navNeeds];
    navItems.forEach(item => item.classList.remove('active'));
    
    if (sectionToShow === welcomeSection) navHome.classList.add('active');
    if (sectionToShow === registerSection) navRegister.classList.add('active');
    if (sectionToShow === needsSection) navNeeds.classList.add('active');
    
    // Se for a seção de necessidades, carregar os dados
    if (sectionToShow === needsSection) {
        loadNeeds();
    }
}

// Eventos de navegação
navHome.addEventListener('click', (e) => {
    e.preventDefault();
    showSection(welcomeSection);
});

navRegister.addEventListener('click', (e) => {
    e.preventDefault();
    showSection(registerSection);
});

navNeeds.addEventListener('click', (e) => {
    e.preventDefault();
    showSection(needsSection);
});

heroRegister.addEventListener('click', (e) => {
    e.preventDefault();
    showSection(registerSection);
});

heroNeeds.addEventListener('click', (e) => {
    e.preventDefault();
    showSection(needsSection);
});

welcomeRegister.addEventListener('click', (e) => {
    e.preventDefault();
    showSection(registerSection);
});

welcomeNeeds.addEventListener('click', (e) => {
    e.preventDefault();
    showSection(needsSection);
});
