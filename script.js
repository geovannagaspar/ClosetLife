const pecasPadrao = [
  { nome: "Camisa Casual", categoria: "Camisas", imagem: "img/camisa.jpg", favorita: true },
  { nome: "Calça Jeans", categoria: "Calças", imagem: "img/jeans.webp", favorita: false },
  { nome: "Tênis Esportivo", categoria: "Calçados", imagem: "img/tenis.jpg", favorita: true },
  { nome: "Bolsa Elegante", categoria: "Acessórios", imagem: "img/bolsa.jpg", favorita: false },
  { nome: "Camisa Masculina", categoria: "Camisas", imagem: "img/camisamascu.jpg", favorita: false },
  { nome: "Calça Sarja", categoria: "Calças", imagem: "img/calca.jpg", favorita: false },
  { nome: "Bolsa Modern", categoria: "Acessórios", imagem: "img/bolsa1.webp", favorita: false },
  { nome: "Roupa Baby 1", categoria: "Outros", imagem: "img/baby.jpg", favorita: false },
  { nome: "Roupa Baby 2", categoria: "Outros", imagem: "img/baby2.webp", favorita: false }
];

function pegarRoupas() {
  const roupas = JSON.parse(localStorage.getItem('roupas'));
  return (roupas && roupas.length > 0) ? roupas : pecasPadrao;
}

function salvarRoupasStorage(lista) {
  localStorage.setItem('roupas', JSON.stringify(lista));
}

const modal = document.getElementById('modalOverlay');
const abrirModal = document.getElementById('abrirModal');
const fecharModal = document.getElementById('fecharModal');
const salvarRoupa = document.getElementById('salvarRoupa');
const closetGrid = document.getElementById('closetGrid');

if (abrirModal) abrirModal.onclick = () => modal.style.display = 'flex';
if (fecharModal) fecharModal.onclick = () => modal.style.display = 'none';

function renderizar() {
  if (!closetGrid) return;
  const roupas = pegarRoupas();
  closetGrid.innerHTML = '';
  roupas.forEach((roupa, index) => {
    const card = document.createElement('div');
    card.className = 'item-card';
    card.innerHTML = `
      <img src="${roupa.imagem}" onerror="this.src='https://via.placeholder.com/300x400?text=Erro+Imagem'" style="width:100%; height:280px; object-fit:cover;">
      <div class="item-content">
        <div style="display:flex; justify-content:space-between;">
          <h3>${roupa.nome}</h3>
          <button onclick="favoritarRoupa(${index} )" style="border:none; background:none; cursor:pointer; font-size:20px;">
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

if (salvarRoupa) {
  salvarRoupa.onclick = async () => {
    const nome = document.getElementById('nomeRoupa').value;
    const categoria = document.getElementById('categoriaRoupa').value;
    const arquivo = document.getElementById('imagemRoupa').files[0];

    if (!nome || !categoria || !arquivo) {
      Swal.fire('Atenção', 'Preencha todos os campos!', 'warning');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const roupas = pegarRoupas();
      roupas.push({ nome, categoria, imagem: e.target.result, favorita: false });
      salvarRoupasStorage(roupas);
      renderizar();
      modal.style.display = 'none';
      Swal.fire('Sucesso', 'Peça adicionada!', 'success');
    };
    reader.readAsDataURL(arquivo);
  };
}

window.removerRoupa = (i) => {
  const r = pegarRoupas(); r.splice(i, 1); salvarRoupasStorage(r); renderizar();
};

window.favoritarRoupa = (i) => {
  const r = pegarRoupas(); r[i].favorita = !r[i].favorita; salvarRoupasStorage(r); renderizar();
};

document.addEventListener('DOMContentLoaded', renderizar);
