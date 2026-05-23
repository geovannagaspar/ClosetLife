const modal = document.getElementById('modalOverlay');
const abrirModal = document.getElementById('abrirModal');
const fecharModal = document.getElementById('fecharModal');
const salvarRoupa = document.getElementById('salvarRoupa');
const closetGrid = document.getElementById('closetGrid');
const totalRoupas = document.getElementById('totalRoupas');
const totalCategorias = document.getElementById('totalCategorias');

/* =====================================
PEÇAS PADRÃO (DA PASTA IMG)
===================================== */
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

class Roupa {
  constructor(nome, categoria, imagem) {
    this.nome = nome;
    this.categoria = categoria;
    this.imagem = imagem;
    this.favorita = false;
  }
}

function pegarRoupas() {
  const roupas = JSON.parse(localStorage.getItem('roupas'));
  if (!roupas || roupas.length === 0) {
    return pecasPadrao;
  }
  return roupas;
}

function salvarRoupasStorage(lista) {
  localStorage.setItem('roupas', JSON.stringify(lista));
}

if(abrirModal) {
    abrirModal.addEventListener('click', () => {
      modal.style.display = 'flex';
    });
}

if(fecharModal) {
    fecharModal.addEventListener('click', fechar);
}

if(modal) {
    modal.addEventListener('click', (e) => {
      if(e.target === modal) fechar();
    });
}

function fechar() {
  modal.style.display = 'none';
}

function renderizar() {
  if(!closetGrid) return;
  const roupas = pegarRoupas();
  closetGrid.innerHTML = '';

  if(totalRoupas) totalRoupas.textContent = roupas.length;

  const categorias = [...new Set(roupas.map(r => r.categoria))];
  if(totalCategorias) totalCategorias.textContent = categorias.length;

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
    card.innerHTML = \`
      <img src="\${roupa.imagem}" onerror="this.src='https://via.placeholder.com/300x400?text=Imagem+Indispon%C3%ADvel'" alt="\${roupa.nome}">
      <div class="item-content">
        <div style="display:flex; justify-content:space-between; align-items:center;">
          <h3>\${roupa.nome}</h3>
          <button onclick="favoritarRoupa(\${index} )" style="border:none; background:none; cursor:pointer; font-size:22px;">
            \${roupa.favorita ? '❤️' : '🤍'}
          </button>
        </div>
        <div class="item-category">\${roupa.categoria}</div>
      </div>
      <button class="remove-btn" onclick="removerRoupa(\${index})">Remover</button>
    \`;
    closetGrid.appendChild(card);
  });
}

async function comprimirImagem(dataUrl) {
  return new Promise((resolve) => {
    const img = new Image();
    img.src = dataUrl;
    img.onload = () => {
      const canvas = document.createElement('canvas');
      const MAX_WIDTH = 600;
      const scaleSize = MAX_WIDTH / img.width;
      canvas.width = MAX_WIDTH;
      canvas.height = img.height * scaleSize;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      resolve(canvas.toDataURL('image/jpeg', 0.7));
    };
  });
}

if(salvarRoupa) {
    salvarRoupa.addEventListener('click', async () => {
      const nome = document.getElementById('nomeRoupa').value;
      const categoria = document.getElementById('categoriaRoupa').value;
      const arquivo = document.getElementById('imagemRoupa').files[0];

      if (!nome || !categoria || !arquivo) {
        Swal.fire({ title: 'Oops!', text: 'Preencha todos os campos.', icon: 'warning', confirmButtonColor: '#c8a97e' });
        return;
      }

      const reader = new FileReader();
      reader.readAsDataURL(arquivo);
      reader.onload = async (e) => {
        const imagemComprimida = await comprimirImagem(e.target.result);
        const roupas = pegarRoupas();
        roupas.push(new Roupa(nome, categoria, imagemComprimida));
        salvarRoupasStorage(roupas);
        renderizar();
        limparFormulario();
        Swal.fire({ title: 'Perfeito ✨', text: 'Peça adicionada ao closet.', icon: 'success', confirmButtonColor: '#c8a97e' });
        fechar();
      };
    });
}

function limparFormulario() {
  if(document.getElementById('nomeRoupa')) document.getElementById('nomeRoupa').value = '';
  if(document.getElementById('categoriaRoupa')) document.getElementById('categoriaRoupa').value = '';
  if(document.getElementById('imagemRoupa')) document.getElementById('imagemRoupa').value = '';
}

window.removerRoupa = (index) => {
  const roupas = pegarRoupas();
  roupas.splice(index, 1);
  salvarRoupasStorage(roupas);
  renderizar();
};

window.favoritarRoupa = (index) => {
  const roupas = pegarRoupas();
  roupas[index].favorita = !roupas[index].favorita;
  salvarRoupasStorage(roupas);
  renderizar();
};

document.addEventListener('DOMContentLoaded', () => {
  renderizar();
});
