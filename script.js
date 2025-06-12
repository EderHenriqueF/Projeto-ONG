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