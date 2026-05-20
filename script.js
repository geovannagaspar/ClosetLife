const closetGrid = document.getElementById('closetGrid') || document.getElementById('inventarioGrid');
const totalRoupas = document.getElementById('totalRoupas');

// 1. Função para buscar os dados e resetar erros antigos
function pegarRoupas() {
    // Se for a primeira vez, garante que o banco de dados comece limpo
    if (localStorage.getItem('versao_final') !== '3.0') {
        localStorage.clear();
        localStorage.setItem('versao_final', '3.0');
    }

    let lista = JSON.parse(localStorage.getItem('roupas'));

    if (!lista || lista.length === 0) {
        lista = [
            { nome: "Baby Tee", categoria: "Camisa", imagem: "img/baby.jpg", favorita: false },
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

// 2. Função para desenhar na tela
function renderizar() {
    const roupas = pegarRoupas();
    if (!closetGrid) return;
    
    closetGrid.innerHTML = '';

    for (let i = 0; i < roupas.length; i++) {
        const item = roupas[i];
        const card = document.createElement('div');
        card.classList.add('item-card');
        
        card.innerHTML = `
            <img src="${item.imagem}" onerror="this.src='https://via.placeholder.com/150?text=Erro+na+Imagem'">
            <div class="item-content">
                <div style="display:flex; justify-content:space-between; align-items:center;">
                    <h3>${item.nome}</h3>
                    <button onclick="favoritar(${i} )" style="border:none; background:none; cursor:pointer; font-size:22px;">
                        ${item.favorita ? '❤️' : '🤍'}
                    </button>
                </div>
                <p>${item.categoria}</p>
            </div>
        `;
        closetGrid.appendChild(card);
    }
}

// 3. Função para favoritar
function favoritar(indice) {
    const lista = pegarRoupas();
    lista[indice].favorita = !lista[indice].favorita;
    localStorage.setItem('roupas', JSON.stringify(lista));
    renderizar();
}

// Inicia o site
document.addEventListener('DOMContentLoaded', renderizar);
