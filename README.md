# ConectaVoluntários - Plataforma de Conexão Solidária

🌟 Sobre o Projeto
O ConectaVoluntários é uma plataforma web que conecta pessoas dispostas a ajudar com instituições que precisam de apoio voluntário. Nosso objetivo é facilitar o encontro entre quem quer fazer a diferença e quem precisa de ajuda, criando uma rede de solidariedade eficiente e impactante.

✨ Funcionalidades Principais
Cadastro de Necessidades: Instituições podem cadastrar suas necessidades de forma simples e detalhada.

Busca Inteligente: Voluntários encontram oportunidades que combinam com suas habilidades e localização.

Filtros Avançados: Busque por tipo de ajuda, localização ou palavras-chave.

Interface Intuitiva: Design moderno e responsivo que funciona em qualquer dispositivo.

Conexão Direta: Informações de contato claras para facilitar a conexão.

🛠 Tecnologias Utilizadas
Frontend:

HTML5 semântico

CSS3 com variáveis e animações

JavaScript puro (Vanilla JS)

Font Awesome para ícones

Google Fonts (Poppins e Fredoka One)

APIs:

ViaCEP para consulta de endereços

🎨 Design System
Cores Principais
Cor	Código	Uso
Azul Primário	#013dc0	Cabeçalho.

botões Azul Secundário	#3a6bd6.

Elementos ativos Vermelho	#dc2626.

Botões de ação Destaque	#07ebfc.

Elementos de foco Tipografia.

Títulos: Fredoka One (cursiva e amigável)

Texto Corrido: Poppins (limpa e legível)

🚀 Como Usar
Como Voluntário:

Navegue até "Oportunidades"

Filtre por tipo de ajuda ou localização

Encontre uma causa que combine com você

Entre em contato diretamente com a instituição

Como Instituição:

Acesse "Cadastrar Necessidade"

Preencha o formulário com detalhes da sua necessidade

Aguarde voluntários entrarem em contato

📂 Estrutura do Código
text
conecta-voluntarios/

├── index.html          # Página principal com toda a estrutura.

├── style.css           # Estilos CSS (incorporado no HTML).

└── script.js           # Lógica JavaScript (incorporado no HTML).


🔍 Detalhes Técnicos

Features Implementadas

Validação de Formulário: Todos os campos obrigatórios são validados antes do envio.

Consulta de CEP: Integração com a API ViaCEP para preenchimento automático de endereço.

Filtragem em Tempo Real: Atualização instantânea dos resultados conforme o usuário digita.

Responsividade: Layout adaptável para mobile, tablet e desktop.

Feedback Visual: Animações e transições para melhor experiência do usuário.

Trechos de Código Destacados
Consulta de CEP:

javascript

function fetchCEP(cep) {

    cep = cep.replace('-', '');

    fetch(`https://viacep.com.br/ws/${cep}/json/`)

        .then(response => response.json())

        .then(data => {

            if (!data.erro) {

                streetInput.value = data.logradouro;

                neighborhoodInput.value = data.bairro;

                // ... outros campos

            }

        });

}

Filtragem de Oportunidades:

javascript

function loadNeeds() {

    let filteredNeeds = [...needs];

    const searchTerm = searchInput.value.toLowerCase();
    
    if (searchTerm) {

        filteredNeeds = filteredNeeds.filter(need => 

            need.title.toLowerCase().includes(searchTerm) || 

            need.description.toLowerCase().includes(searchTerm)
    }


    // ... renderiza os resultados
}

🌱 Roadmap e Melhorias Futuras

Sistema de login para instituições:

Avaliação de voluntários e instituições.

Chat integrado na plataforma.

Notificações por e-mail.

Dashboard com métricas de impacto.