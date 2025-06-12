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