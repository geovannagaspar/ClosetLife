const closetGrid = document.getElementById("closetGrid") || document.getElementById("inventarioGrid");

function pegarRoupas() {
    let lista = JSON.parse(localStorage.getItem("roupas"));
    if (!lista || lista.length === 0) {
        lista = [
            { nome: "Baby Tee", categoria: "Camisa", imagem: "img/baby.jpg", favorita: false },
            { nome: "Bolsa Baguette", categoria: "Bolsa", imagem: "img/bolsa.jpg", favorita: false },
            { nome: "Calça Wide Leg", categoria: "Calça", imagem: "img/calca.jpg", favorita: false },
            { nome: "Camisa de Linho", categoria: "Camisa", imagem: "img/camisa.jpg", favorita: false },
            { nome: "Camisa Masculina", categoria: "Camisa", imagem: "img/camisamascu.jpg", favorita: false },
            { nome: "Tênis Adidas Samba", categoria: "Sapato", imagem: "img/tenis.jpg", favorita: false },
            { nome: "Vestido Midi", categoria: "Vestido", imagem: "img/vestidomidi.jpg", favorita: false },
            { nome: "Jaqueta Jeans", categoria: "Casaco", imagem: "img/jaquetajeans.jpg", favorita: false },
            { nome: "Saia Plissada", categoria: "Saia", imagem: "img/saiaplissada.jpg", favorita: false },
            { nome: "Blusa de Seda", categoria: "Blusa", imagem: "img/blusaseda.jpg", favorita: false }
        ];
        localStorage.setItem("roupas", JSON.stringify(lista));
    }
    return lista;
}

function renderizar() {
    const roupas = pegarRoupas();
    if (!closetGrid) return;
    closetGrid.innerHTML = "";
    roupas.forEach((item, i) => {
        const card = document.createElement("div");
        card.classList.add("item-card");
        card.innerHTML = `
            <img src="${item.imagem}" onerror="this.src=\'https://via.placeholder.com/150\'" alt="${item.nome}">
            <div class="item-content">
                <div style="display:flex; justify-content:space-between; align-items:center;">
                    <h3>${item.nome}</h3>
                    <button onclick="favoritar(${i} )" style="border:none; background:none; cursor:pointer; font-size:22px;">
                        ${item.favorita ? "❤️" : "🤍"}
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
    localStorage.setItem("roupas", JSON.stringify(lista));
    renderizar();
}

function removerPeca(indice) {
    if (confirm("Deseja remover esta peça?")) {
        const lista = pegarRoupas();
        lista.splice(indice, 1);
        localStorage.setItem("roupas", JSON.stringify(lista));
        renderizar();
    }
}

document.addEventListener("DOMContentLoaded", renderizar);
