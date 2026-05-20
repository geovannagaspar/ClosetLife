// ==========================================
// 1. CONFIGURAÇÕES E VARIÁVEIS GERAIS
// ==========================================
const closetGrid = document.getElementById('closetGrid') || document.getElementById('inventarioGrid');
const totalRoupas = document.getElementById('totalRoupas');

// Elementos do Modal (Usados apenas na página de cadastro)
const modal = document.getElementById('modalOverlay');
const abrirModal = document.getElementById('abrirModal');
const fecharModal = document.getElementById('fecharModal');

// ==========================================
// 2. FUNÇÃO PARA BUSCAR OS DADOS (STORAGE)
// ==========================================
function pegarRoupas() {
    // Truque para limpar erros de versões antigas do site
    if (localStorage.getItem('versao') !== '2.0') {
        localStorage.clear();
        localStorage.setItem('versao', '2.0');
    }

    let lista = JSON.parse(localStorage.getItem('roupas'));

    // Se a lista estiver vazia, criamos as roupas padrão
    if (!lista || lista.length === 0) {
        lista = [
            { nome: "Baby Tee", categoria: "Camisa", imagem: "img/baby.jpg", favorita: false },
            { nome: "Baby Tee 2", categoria: "Camisa", imagem: "img/baby2.jpg", favorita: false },
            { nome: "Bolsa Baguette", categoria: "Bolsa", imagem: "img/bolsa.jpg", favorita: false },
            { nome: "Calça Wide Leg", categoria: "Calça", imagem: "img/calca.jpg", favorita: false },
            { nome: "Camisa de Linho", categoria: "Camisa", imagem: "img/camisa.jpg", favorita: false },
            { nome: "Camisa Masculina", categoria: "Camisa", imagem: "img/camisamascu.jpg", favorita: false },
            { nome: "Tênis Adidas Samba", categoria: "Sapato", imagem: "img/tenis.jpg", favorita: false }
        ];
        localStorage.setItem('roupas', JSON.stringify(lista));
    }
    return lista;
}

// ==========================================
// 3. FUNÇÃO PARA DESENHAR NA TELA (RENDER)
// ==========================================
function renderizar() {
    const roupas = pegarRoupas();
    if (!closetGrid) return; // Segurança: só executa se o grid existir na página
    
    closetGrid.innerHTML = ''; // Limpa a tela antes de desenhar

    if (totalRoupas) totalRoupas.textContent = roupas.length;

    // Percorre a lista e cria o HTML de cada card
    roupas.forEach(function(roupa, index) {
        const card = document.createElement('div');
        card.classList.add('item-card');
        
        card.innerHTML = `
            <img src="${roupa.imagem}" onerror="this.src='https://via.placeholder.com/150?text=Erro+na+Imagem'">
            <div class="item-content">
                <div style="display:flex; justify-content:space-between; align-items:center;">
                    <h3>${roupa.nome}</h3>
                    <button onclick="favoritarRoupa(${index} )" style="border:none; background:none; cursor:pointer; font-size:22px;">
                        ${roupa.favorita ? '❤️' : '🤍'}
                    </button>
                </div>
                <div class="item-category">${roupa.categoria}</div>
            </div>
            <button class="remove-btn" onclick="removerRoupa(${index})">Remover</button>
        `;
        closetGrid.appendChild(card);
    });
}

// ==========================================
// 4. FUNÇÕES DE INTERAÇÃO (FAVORITAR E REMOVER)
// ==========================================
function favoritarRoupa(index) {
    const lista = pegarRoupas();
    lista[index].favorita = !lista[index].favorita; // Inverte o estado (true/false)
    localStorage.setItem('roupas', JSON.stringify(lista));
    renderizar(); // Atualiza a tela
}

function removerRoupa(index) {
    const lista = pegarRoupas();
    lista.splice(index, 1); // Remove o item da lista
    localStorage.setItem('roupas', JSON.stringify(lista));
    renderizar();
}

// ==========================================
// 5. CONFIGURAÇÃO DOS BOTÕES DO MODAL
// ==========================================
if (abrirModal) {
    abrirModal.addEventListener('click', function() { modal.style.display = 'flex'; });
}
if (fecharModal) {
    fecharModal.addEventListener('click', function() { modal.style.display = 'none'; });
}

// Inicia o site assim que o navegador terminar de carregar o HTML
document.addEventListener('DOMContentLoaded', function() {
    renderizar();
});
