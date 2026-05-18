// Configurações iniciais
const closetGrid = document.getElementById('closetGrid') || document.getElementById('inventarioGrid');

// Função para garantir que o caminho da imagem funcione no GitHub e localmente
function ajustarCaminhoImagem(caminho) {
    
    if (caminho.startsWith('http' ) || caminho.startsWith('data:')) return caminho;
    
    return caminho.replace('./', '');
}

function pegarRoupas() {
  const roupasSalvas = JSON.parse(localStorage.getItem('roupas'));
  
  
  if (roupasSalvas && roupasSalvas.length > 0) return roupasSalvas;

  const roupasPadrao = [
    { nome: "Baby Tee", categoria: "Camisa", imagem: "img/baby.jpg" },
    { nome: "Baby Tee 2", categoria: "Camisa", imagem: "img/baby2.jpg" },
    { nome: "Bolsa Baguette", categoria: "Bolsa", imagem: "img/bolsa.jpg" },
    { nome: "Bolsa Baguette 2", categoria: "Bolsa", imagem: "img/bolsa1.jpg" },
    { nome: "Calça Wide Leg", categoria: "Calça", imagem: "img/calca.jpg" },
    { nome: "Calça Masculina", categoria: "Calça", imagem: "img/calcamasculina.jpg" },
    { nome: "Camisa de Linho", categoria: "Camisa", imagem: "img/camisa.jpg" },
    { nome: "Camisa de Linho 2", categoria: "Camisa", imagem: "img/camisa1.jpg" },
    { nome: "Camisa Masculina", categoria: "Camisa", imagem: "img/camisamascu.jpg" },
    { nome: "Camisa Masculina 2", categoria: "Camisa", imagem: "img/camisamascu.jpg" },
    { nome: "Tênis Retrô Adidas Samba", categoria: "Sapato", imagem: "img/tenis.jpg" },
    { nome: "Tênis Retrô Adidas Samba 2", categoria: "Sapato", imagem: "img/tenis1.jpg" }
  ].map(r => ({...r, favorita: false}));

  localStorage.setItem('roupas', JSON.stringify(roupasPadrao));
  return roupasPadrao;
}

function renderizar() {
  const roupas = pegarRoupas();
  if (!closetGrid) return;
  
  closetGrid.innerHTML = '';

  roupas.forEach((roupa, index) => {
    const card = document.createElement('div');
    card.classList.add('item-card');
  
    const caminhoFinal = ajustarCaminhoImagem(roupa.imagem);
    
    card.innerHTML = `
      <img src="${caminhoFinal}" onerror="this.src='https://via.placeholder.com/150?text=Erro+na+Imagem'">
      <div class="item-content">
        <h3>${roupa.nome}</h3>
        <div class="item-category">${roupa.categoria}</div>
      </div>
    `;
    closetGrid.appendChild(card );
  });
}

// Inicializa tudo
document.addEventListener('DOMContentLoaded', () => {
  renderizar();
});
