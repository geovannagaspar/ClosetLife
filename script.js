const modal = document.getElementById('modalOverlay');

const abrirModal =
  document.getElementById('abrirModal');

const fecharModal =
  document.getElementById('fecharModal');

const salvarRoupa =
  document.getElementById('salvarRoupa');

const closetGrid =
  document.getElementById('closetGrid');

const totalRoupas =
  document.getElementById('totalRoupas');

const totalCategorias =
  document.getElementById('totalCategorias');

/* =====================================
CLASSE POO
===================================== */

class Roupa{

  constructor(
    nome,
    categoria,
    imagem
  ){

    this.nome = nome;
    this.categoria = categoria;
    this.imagem = imagem;
    this.favorita = false;

  }

}

/* =====================================
STORAGE
===================================== */

function pegarRoupas(){

  const roupasSalvas = JSON.parse(
    localStorage.getItem('roupas')
  );

  /* SE JÁ EXISTIREM ROUPAS */

  if(
    roupasSalvas &&
    roupasSalvas.length > 0
  ){

    return roupasSalvas;

  }

  /* ROUPAS PADRÃO */

  const roupasPadrao = [

    {
      nome: "Coletes de Alfaiataria",
      categoria: "Camisa",
      imagem: "https://i.ebayimg.com/images/g/hM8AAOSwQ1pln181/s-l500.jpg",
      favorita: false
    },

    {
      nome: "Colete de Alfaiataria",
      categoria: "Casaco",
      imagem: "https://tse4.mm.bing.net/th/id/OIP.Y0Xt5g3DI1i2ro2BJ4Ic3wHaJ4?rs=1&pid=ImgDetMain&o=7&rm=3",
      favorita: false
    },

    {
      nome: "Baby Tees",
      categoria: "Camisa",
      imagem: "https://tse1.mm.bing.net/th/id/OIP.hqF7afTd-G44tEBT7OiVKAHaLH?rs=1&pid=ImgDetMain&o=7&rm=3",
      favorita: false
    },

    {
      nome: "Baby Tees",
      categoria: "Camisa",
      imagem: "https://i.pinimg.com/originals/2b/47/e1/2b47e1bcae88a2918907d02bad8d9ef7.jpg",
      favorita: false
    },

    {
      nome: "Camisas de Linho",
      categoria: "Camisa",
      imagem: "https://static.massimodutti.net/assets/public/a104/9999/dd17493b8412/0dd9f9b93ac2/00100777122-o7/00100777122-o7.jpg?ts=1739346279991&w=1920",
      favorita: false
    },

    {
      nome: "Camisas de Linho",
      categoria: "Camisa",
      imagem: "https://cdn.dooca.store/153639/products/whatsapp-image-2024-09-03-at-152544.jpeg?v=1725388058&webp=0",
      favorita: false
    },

    {
      nome: "Wide Leg de Alfaiataria",
      categoria: "Calça",
      imagem: "https://static.dafiti.com.br/p/Lan%C3%A7a-Perfume-Cal%C3%A7a-Lan%C3%A7a-Perfume-Chino-Alfaiataria-Preta-5629-05402731-1-product.jpg",
      favorita: false
    },

    {
      nome: "Wide Leg de Alfaiataria",
      categoria: "Calça",
      imagem: "https://img.lojasrenner.com.br/item/879669847/zoom/6.jpg",
      favorita: false
    },

    {
      nome: "Jeans Baggy Desbotado",
      categoria: "Calça",
      imagem: "https://img.lojasrenner.com.br/item/894080766/large/6.jpg",
      favorita: false
    },

    {
      nome: "Jeans Baggy Desbotado",
      categoria: "Calça",
      imagem: "https://http2.mlstatic.com/D_NQ_NP_749498-MLB93440397434_092025-O-calca-jeans-masculina-modelo-balo-baggy-bag-reta-boca-larga.webp",
      favorita: false
    },

    {
      nome: "Tênis Retrô Adidas Samba",
      categoria: "Sapato",
      imagem: "https://assets.adidas.com/images/w_1880,f_auto,q_auto/4991fddde6484ebb882baf9c017a6f5c_9366/ID2054_05_standard.jpg",
      favorita: false
    },

    {
      nome: "Tênis Retrô Adidas Samba",
      categoria: "Sapato",
      imagem: "https://tse1.mm.bing.net/th/id/OIP.sF4o3lDjyC4E7C8Db2JqJQHaHa?w=2000&h=2000&rs=1&pid=ImgDetMain&o=7&rm=3",
      favorita: false
    },

    {
      nome: "Bolsa Baguette",
      categoria: "Bolsa",
      imagem: "https://i.pinimg.com/originals/db/71/dd/db71ddff995ce54e25adf2ea0352f3eb.jpg",
      favorita: false
    },

    {
      nome: "Bolsa Baguette",
      categoria: "Bolsa",
      imagem: "https://i.pinimg.com/736x/d2/90/78/d29078dcf5b968b5668b8706c6072ad0.jpg",
      favorita: false
    }

  ];

  localStorage.setItem(
    'roupas',
    JSON.stringify(roupasPadrao)
  );

  return roupasPadrao;

}

function salvarRoupasStorage(lista){

  localStorage.setItem(
    'roupas',
    JSON.stringify(lista)
  );

}

/* =====================================
MODAL
===================================== */

abrirModal.addEventListener('click', () => {

  modal.style.display = 'flex';

});

fecharModal.addEventListener('click', fechar);

modal.addEventListener('click', (e) => {

  if(e.target === modal){

    fechar();

  }

});

function fechar(){

  modal.style.display = 'none';

}

/* =====================================
RENDER
===================================== */

function renderizar(){

  const roupas = pegarRoupas();

  closetGrid.innerHTML = '';

  totalRoupas.textContent =
    roupas.length;

  const categorias =
    [...new Set(
      roupas.map(r => r.categoria)
    )];

  totalCategorias.textContent =
    categorias.length;

  if(roupas.length === 0){

    closetGrid.innerHTML = `

      <div class="empty-state">

        <h3>
          Seu closet está vazio
        </h3>

        <p>
          Adicione sua primeira peça.
        </p>

      </div>

    `;

    return;

  }

  roupas.forEach((roupa,index) => {

    const card =
      document.createElement('div');

    card.classList.add('item-card');

    card.innerHTML = `

      <img src="${roupa.imagem}">

      <div class="item-content">

        <div
          style="
            display:flex;
            justify-content:space-between;
            align-items:center;
          "
        >

          <h3>
            ${roupa.nome}
          </h3>

          <button
            onclick="favoritarRoupa(${index})"

            style="
              border:none;
              background:none;
              cursor:pointer;
              font-size:22px;
            "
          >

            ${roupa.favorita ? '❤️' : '🤍'}

          </button>

        </div>

        <div class="item-category">

          ${roupa.categoria}

        </div>

      </div>

      <button
        class="remove-btn"
        onclick="removerRoupa(${index})"
      >
        Remover
      </button>

    `;

    closetGrid.appendChild(card);

  });

}

/* =====================================
SALVAR ROUPA
===================================== */

salvarRoupa.addEventListener('click', () => {

  const nome =
    document.getElementById('nomeRoupa').value;

  const categoria =
    document.getElementById('categoriaRoupa').value;

  const imagemInput =
    document.getElementById('imagemRoupa');

  const arquivo =
    imagemInput.files[0];

  if(!nome || !categoria || !arquivo){

    Swal.fire({

      title:'Oops!',

      text:'Preencha todos os campos.',

      icon:'warning',

      confirmButtonColor:'#c8a97e',

      background:'#1c1c1f',

      color:'#ffffff'

    });

    return;

  }

  const leitor =
    new FileReader();

  leitor.onload = function(e){

    const novaRoupa =
      new Roupa(

        nome,
        categoria,
        e.target.result

      );

    const roupas =
      pegarRoupas();

    roupas.push(novaRoupa);

    salvarRoupasStorage(
      roupas
    );

    renderizar();

    limparFormulario();

    Swal.fire({

      title:'Perfeito ✨',

      text:'Peça adicionada ao closet.',

      icon:'success',

      confirmButtonColor:'#c8a97e',

      background:'#1c1c1f',

      color:'#ffffff'

    });

    fechar();

  };

  leitor.readAsDataURL(
    arquivo
  );

});

/* =====================================
REMOVER
===================================== */

function removerRoupa(index){

  const roupas =
    pegarRoupas();

  roupas.splice(index,1);

  salvarRoupasStorage(
    roupas
  );

  renderizar();

}

/* =====================================
FAVORITOS
===================================== */

function favoritarRoupa(index){

  const roupas =
    pegarRoupas();

  roupas[index].favorita =
    !roupas[index].favorita;

  salvarRoupasStorage(
    roupas
  );

  renderizar();

}

/* =====================================
LIMPAR
===================================== */

function limparFormulario(){

  document.getElementById(
    'nomeRoupa'
  ).value = '';

  document.getElementById(
    'categoriaRoupa'
  ).value = '';

  document.getElementById(
    'imagemRoupa'
  ).value = '';

}

/* =====================================
INIT
===================================== */

document.addEventListener(
  'DOMContentLoaded',

  () => {

    renderizar();

  }

);