const modal = document.getElementById('modalOverlay');
const abrirModal = document.getElementById('abrirModal');
const fecharModal = document.getElementById('fecharModal');
const salvarRoupa = document.getElementById('salvarRoupa');
const closetGrid = document.getElementById('closetGrid');
const totalRoupas = document.getElementById('totalRoupas');
const totalCategorias = document.getElementById('totalCategorias');

/* =====================================
CLASSE POO
===================================== */
class Roupa {
  constructor(nome, categoria, imagem) {
    this.nome = nome;
    this.categoria = categoria;
    this.imagem = imagem;
    this.favorita = false;
  }
}

/* =====================================
STORAGE
===================================== */
function pegarRoupas() {
  const roupasSalvas = JSON.parse(localStorage.getItem('roupas'));

  if (roupasSalvas && roupasSalvas.length > 0) {
    return roupasSalvas;
  }

  const roupasPadrao = [
    { nome: "Baby Tee", categoria: "Camisa", imagem: "./img/baby.jpg", favorita: false },
    { nome: "Baby Tee 2", categoria: "Camisa", imagem: "./img/baby2.jpg", favorita: false },
    { nome: "Bolsa Baguette", categoria: "Bolsa", imagem: "./img/bolsa.jpg", favorita: false },
    { nome: "Bolsa Baguette 2", categoria: "Bolsa", imagem: "./img/bolsa1.jpg", favorita: false },
    { nome: "Calça Wide Leg", categoria: "Calça", imagem: "./img/calca.jpg", favorita: false },
    { nome: "Calça Masculina", categoria: "Calça", imagem: "./img/calcamasculina.jpg", favorita: false },
    { nome: "Camisa de Linho", categoria: "Camisa", imagem: "./img/camisa.jpg", favorita: false },
    { nome: "Camisa de Linho 2", categoria: "Camisa", imagem: "./img/camisa1.jpg", favorita: false },
    { nome: "Camisa Masculina", categoria: "Camisa", imagem: "./img/camisamasculina.jpg", favorita: false },
    { nome: "Camisa Masculina 2", categoria: "Camisa", imagem: "./img/camisamascu.jpg", favorita: false },
    { nome: "Tênis Retrô Adidas Samba", categoria: "Sapato", imagem: "./img/tenis.jpg", favorita: false },
    { nome: "Tênis Retrô Adidas Samba 2", categoria: "Sapato", imagem: "./img/tenis1.jpg", favorita: false }
  ];

  localStorage.setItem('roupas', JSON.stringify(roupasPadrao));
  return roupasPadrao;
}

function salvarRoupasStorage(lista) {
  localStorage.setItem('roupas', JSON.stringify(lista));
}

/* =====================================
MODAL
===================================== */
abrirModal.addEventListener('click', () => {
  modal.style.display = 'flex';
});

fecharModal.addEventListener('click', fechar);

modal.addEventListener('click', (e) => {
  if (e.target === modal) {
    fechar();
  }
});

function fechar() {
  modal.style.display = 'none';
}

/* =====================================
RENDER
===================================== */
function renderizar() {
  const roupas = pegarRoupas();
  closetGrid.innerHTML = '';

  totalRoupas.textContent = roupas.length;

  const categorias = [...new Set(roupas.map(r => r.categoria))];
  totalCategorias.textContent = categorias.length;

  if (roupas.length === 0) {
    closetGrid.innerHTML = `
      <div class="empty-state">
        <h3>Seu closet está vazio</h3>
        <p>Adicione sua primeira peça.</p>
      </div>
    `;
    return;
  }

  roupas.forEach((roupa, index) => {
    const card = document.createElement('div');
    card.classList.add('item-card');

    card.innerHTML = `
      <img src="${roupa.imagem}">
      <div class="item-content">
        <div style="display:flex; justify-content:space-between; align-items:center;">
          <h3>${roupa.nome}</h3>
          <button onclick="favoritarRoupa(${index})"
            style="border:none; background:none; cursor:pointer; font-size:22px;">
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

/* =====================================
SALVAR ROUPA
===================================== */
salvarRoupa.addEventListener('click', () => {
  const nome = document.getElementById('nomeRoupa').value;
  const categoria = document.getElementById('categoriaRoupa').value;
  const imagemInput = document.getElementById('imagemRoupa');
  const arquivo = imagemInput.files[0];

  if (!nome || !categoria || !arquivo) {
    Swal.fire({
      title: 'Oops!',
      text: 'Preencha todos os campos.',
      icon: 'warning',
      confirmButtonColor: '#c8a97e',
      background: '#1c1c1f',
      color: '#ffffff'
    });
    return;
  }

  const leitor = new FileReader();
  leitor.onload = function (e) {
    const novaRoupa = new Roupa(nome, categoria, e.target.result);
    const roupas = pegarRoupas();
    roupas.push(novaRoupa);
    salvarRoupasStorage(roupas);
    renderizar();
    limparFormulario();

    Swal.fire({
      title: 'Perfeito ✨',
      text: 'Peça adicionada ao closet.',
      icon: 'success',
      confirmButtonColor: '#c8a97e',
      background: '#1c1c1f',
      color: '#ffffff'
    });

    fechar();
  };

  leitor.readAsDataURL(arquivo);
});

/* =====================================
REMOVER
===================================== */
function removerRoupa(index) {
  const roupas = pegarRoupas();
  roupas.splice(index, 1);
  salvarRoupasStorage(roupas);
  renderizar();
}

/* =====================================
FAVORITOS
===================================== */
function favoritarRoupa(index) {
  const roupas = pegarRoupas();
  roupas[index].favorita = !roupas[index].favorita;
  salvarRoupasStorage(roupas);
  renderizar();
}

/* =====================================
LIMPAR
===================================== */
function limparFormulario() {
  document.getElementById('nomeRoupa').value = '';
  document.getElementById('categoriaRoupa').value = '';
  document.getElementById('imagemRoupa').value = '';
}

/* =====================================
INIT
===================================== */
document.addEventListener('DOMContentLoaded', () => {
  renderizar();
});
