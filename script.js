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

/**
 * Carrega e exibe as necessidades na seção de oportunidades
 * 
 * Esta função filtra as necessidades com base nos critérios de busca e tipo,
 * e renderiza os cards correspondentes na página.
 */
function loadNeeds() {
    // Filtrar e pesquisar necessidades
    let filteredNeeds = [...needs];
    const searchTerm = searchInput.value.toLowerCase();
    const filterValue = filterType.value;
    
    if (searchTerm) {
        filteredNeeds = filteredNeeds.filter(need => 
            need.title.toLowerCase().includes(searchTerm) || 
            need.description.toLowerCase().includes(searchTerm) ||
            need.institution.toLowerCase().includes(searchTerm)
        );
    }
    
    if (filterValue) {
        filteredNeeds = filteredNeeds.filter(need => need.helpType === filterValue);
    }
    
    // Exibir necessidades
    if (filteredNeeds.length === 0) {
        needsContainer.innerHTML = '<p class="no-results">Nenhuma necessidade encontrada. Cadastre uma nova necessidade ou ajuste seus critérios de busca.</p>';
        return;
    }
    
    needsContainer.innerHTML = filteredNeeds.map(need => `
        <div class="card">
            <div class="card-header">
                <h3 class="card-title">${need.title}</h3>
            </div>
            <div class="card-body">
                <p class="card-text">${need.description}</p>
                <p class="card-text"><strong>Instituição:</strong> ${need.institution}</p>
                <p class="card-text"><strong>Local:</strong> ${need.street}, ${need.neighborhood}, ${need.city} - ${need.state}</p>
                <p class="card-text"><strong>Contato:</strong> ${need.contact}</p>
            </div>
            <div class="card-footer">
                <span class="tag ${getTagClass(need.helpType)}">${need.helpType}</span>
                <small>${need.date}</small>
            </div>
        </div>
    `).join('');
}

/**
 * Retorna a classe CSS correspondente ao tipo de ajuda
 * 
 * @param {string} helpType - O tipo de ajuda (Educação, Saúde, etc.)
 * @return {string} - A classe CSS correspondente
 * 
 * Esta função mapeia os tipos de ajuda para classes CSS que definem cores diferentes
 * para cada tipo de tag.
 */
function getTagClass(helpType) {
    switch(helpType) {
        case 'Educação': return 'education';
        case 'Saúde': return 'health';
        case 'Meio Ambiente': return 'environment';
        case 'Doação de Alimentos': return 'food';
        case 'Doação de Roupas': return 'clothes';
        default: return 'other';
    }
}

// Eventos de pesquisa/filtro
searchInput.addEventListener('input', loadNeeds);
filterType.addEventListener('change', loadNeeds);

/**
 * Inicializa a aplicação
 * 
 * Esta função é chamada quando o DOM está completamente carregado e:
 * 1. Mostra a seção de boas-vindas
 * 2. Cria os corações flutuantes
 * 3. Adiciona alguns dados de exemplo para demonstração
 */
function init() {
    showSection(welcomeSection);
    createHearts();
    
    // Adicionar alguns dados de exemplo
    needs = [
        {
            id: 1,
            institution: "Associação Educar",
            helpType: "Educação",
            title: "Aulas de reforço escolar",
            description: "Precisamos de voluntários para ajudar crianças com dificuldades em matemática e português. As aulas acontecem às terças e quintas, das 14h às 16h.",
            cep: "01001-000",
            street: "Praça da Sé",
            neighborhood: "Sé",
            city: "São Paulo",
            state: "SP",
            contact: "contato@educar.org.br",
            date: "10/06/2023"
        },
        {
            id: 2,
            institution: "ONG Verde Vida",
            helpType: "Meio Ambiente",
            title: "Limpeza de praia",
            description: "Vamos realizar uma ação de limpeza na praia no próximo sábado. Precisamos de voluntários para ajudar na coleta de resíduos e conscientização ambiental.",
            cep: "22010-000",
            street: "Avenida Atlântica",
            neighborhood: "Copacabana",
            city: "Rio de Janeiro",
            state: "RJ",
            contact: "verdevida@ong.org",
            date: "08/06/2023"
        },
        {
            id: 3,
            institution: "Casa do Pão",
            helpType: "Doação de Alimentos",
            title: "Arrecadação de alimentos não perecíveis",
            description: "Estamos coletando alimentos para distribuir para famílias carentes da região. Precisamos de ajuda para arrecadar e organizar as doações.",
            cep: "30150-000",
            street: "Avenida Afonso Pena",
            neighborhood: "Centro",
            city: "Belo Horizonte",
            state: "MG",
            contact: "(31) 99999-9999",
            date: "05/06/2023"
        },
        {
            id: 4,
            institution: "Abrigo Amor e Cuidado",
            helpType: "Doação de Roupas",
            title: "Doação de agasalhos",
            description: "Estamos arrecadando agasalhos, cobertores e calçados para pessoas em situação de rua. As doações podem ser entregues de segunda a sexta, das 9h às 17h.",
            cep: "90010-000",
            street: "Rua dos Andradas",
            neighborhood: "Centro Histórico",
            city: "Porto Alegre",
            state: "RS",
            contact: "abrigoamorecuidado@gmail.com",
            date: "01/06/2023"
        },
        {
            id: 5,
            institution: "Saúde para Todos",
            helpType: "Saúde",
            title: "Ação de saúde comunitária",
            description: "Precisamos de profissionais de saúde e voluntários para auxiliar em uma ação comunitária que oferecerá aferição de pressão, teste de glicemia e orientações sobre saúde preventiva.",
            cep: "70070-100",
            street: "Setor Hospitalar",
            neighborhood: "Asa Sul",
            city: "Brasília",
            state: "DF",
            contact: "(61) 3333-4444",
            date: "12/06/2023"
        }
    ];
}

// Iniciar a aplicação quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', init);
