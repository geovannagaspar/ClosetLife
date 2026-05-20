const closetGrid = document.getElementById('closetGrid') || document.getElementById('inventarioGrid');

function pegarRoupas() {
    if (localStorage.getItem('versao_final') !== '3.0') {
        localStorage.clear();
        localStorage.setItem('versao_final', '3.0');
    }
    let lista = JSON.parse(localStorage.getItem('roupas'));
    if (!lista || lista.length === 0) {
        lista = [
            { nome: "Baby Tee", categoria: "Camisa", imagem: "img/baby.jpg", favorita: false },
            { nome: "Bolsa Baguette", categoria: "Bolsa", imagem: "img/bolsa.jpg", favorita: false },
            { nome: "Calça Wide Leg", categoria: "Calça", imagem: "img/calca.jpg", favorita: false }
        ];
        localStorage.setItem('roupas', JSON.stringify(lista));
    }
    return lista;
}

function renderizar() {
    const roupas = pegarRoupas();
    if (!closetGrid) return;
    closetGrid.innerHTML = '';
    roupas.forEach((item, i) => {
        const card = document.createElement('div');
        card.classList.add('item-card');
        card.innerHTML = `
            <img src="${item.imagem}" onerror="this.src='https://via.placeholder.com/150'">
            <div class="item-content">
                <div style="display:flex; justify-content:space-between; align-items:center;">
                    <h3>${item.nome}</h3>
                    <button onclick="favoritar(${i} )" style="border:none; background:none; cursor:pointer; font-size:22px;">
                        ${item.favorita ? '❤️' : '🤍'}
                    </button>
                </div>
                <p class="item-category">${item.categoria}</p>
                <button onclick="removerPeca(${i})" class="remove-btn" style="margin-top:15px; border-radius:12px;">Remover</button>
            </div>`;
        closetGrid.appendChild(card);
    });
}

function favoritar(indice) {
    const lista = pegarRoupas();
    lista[indice].favorita = !lista[indice].favorita;
    localStorage.setItem('roupas', JSON.stringify(lista));
    renderizar();
}

function removerPeca(indice) {
    if (confirm('Deseja remover esta peça?')) {
        const lista = pegarRoupas();
        lista.splice(indice, 1);
        localStorage.setItem('roupas', JSON.stringify(lista));
        renderizar();
    }
}

document.addEventListener('DOMContentLoaded', renderizar);
