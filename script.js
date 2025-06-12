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

/**
 * Aplica máscara ao campo de CEP e busca endereço quando completo
 * 
 * Este listener formata o CEP no padrão 00000-000 e, quando completo,
 * faz uma requisição à API ViaCEP para preencher automaticamente os campos de endereço.
 */
cepInput.addEventListener('input', (e) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length > 5) {
        value = value.substring(0, 5) + '-' + value.substring(5, 8);
    }
    e.target.value = value;
    
    // Buscar CEP quando tiver 9 caracteres (incluindo o traço)
    if (value.length === 9) {
        fetchCEP(value);
    }
});

/**
 * Busca informações de endereço usando a API ViaCEP
 * 
 * @param {string} cep - O CEP a ser consultado
 * 
 * Esta função faz uma requisição à API ViaCEP e preenche os campos de endereço
 * automaticamente quando o CEP é válido.
 */
function fetchCEP(cep) {
    cep = cep.replace('-', '');
    fetch(`https://viacep.com.br/ws/${cep}/json/`)
        .then(response => response.json())
        .then(data => {
            if (!data.erro) {
                streetInput.value = data.logradouro;
                neighborhoodInput.value = data.bairro;
                cityInput.value = data.localidade;
                stateInput.value = data.uf;
                
                // Remover borda vermelha se existir
                cepInput.style.borderColor = '#e2e8f0';
            } else {
                alert('CEP não encontrado. Por favor, verifique o número digitado.');
                cepInput.style.borderColor = 'red';
            }
        })
        .catch(error => {
            console.error('Erro ao buscar CEP:', error);
            alert('Erro ao buscar CEP. Por favor, tente novamente.');
            cepInput.style.borderColor = 'red';
        });
}

/**
 * Valida e envia o formulário de cadastro de necessidades
 * 
 * Esta função valida todos os campos obrigatórios do formulário e, se válidos,
 * cria um novo objeto de necessidade e adiciona ao array de necessidades.
 */
needForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Validar campos obrigatórios
    const requiredFields = needForm.querySelectorAll('[required]');
    let isValid = true;
    
    requiredFields.forEach(field => {
        if (!field.value.trim()) {
            field.style.borderColor = 'red';
            isValid = false;
        } else {
            field.style.borderColor = '#e2e8f0';
        }
    });
    
    if (!isValid) {
        alert('Por favor, preencha todos os campos obrigatórios.');
        return;
    }
    
    // Validar formato do CEP
    const cepRegex = /^\d{5}-\d{3}$/;
    if (!cepRegex.test(cepInput.value)) {
        alert('Por favor, insira um CEP válido no formato 00000-000.');
        cepInput.style.borderColor = 'red';
        return;
    }
    
    // Criar objeto com os dados da necessidade
    const newNeed = {
        id: Date.now(),
        institution: document.getElementById('institution-name').value,
        helpType: document.getElementById('help-type').value,
        title: document.getElementById('need-title').value,
        description: document.getElementById('need-description').value,
        cep: document.getElementById('cep').value,
        street: document.getElementById('street').value,
        neighborhood: document.getElementById('neighborhood').value,
        city: document.getElementById('city').value,
        state: document.getElementById('state').value,
        contact: document.getElementById('contact').value,
        date: new Date().toLocaleDateString('pt-BR')
    };
    
    // Adicionar ao array de necessidades
    needs.push(newNeed);
    
    // Limpar formulário
    needForm.reset();
    
    // Mostrar mensagem de sucesso com animação
    const successMsg = document.createElement('div');
    successMsg.textContent = 'Necessidade cadastrada com sucesso!';
    successMsg.style.position = 'fixed';
    successMsg.style.top = '20px';
    successMsg.style.left = '50%';
    successMsg.style.transform = 'translateX(-50%)';
    successMsg.style.backgroundColor = 'var(--success)';
    successMsg.style.color = 'white';
    successMsg.style.padding = '15px 30px';
    successMsg.style.borderRadius = '50px';
    successMsg.style.boxShadow = '0 4px 15px rgba(0,0,0,0.2)';
    successMsg.style.zIndex = '1000';
    successMsg.style.animation = 'fadeInUp 0.5s ease';
    document.body.appendChild(successMsg);
    
    setTimeout(() => {
        successMsg.style.animation = 'fadeOut 0.5s ease';
        setTimeout(() => {
            document.body.removeChild(successMsg);
        }, 500);
    }, 3000);
    
    // Redirecionar para a lista de necessidades
    showSection(needsSection);
});

