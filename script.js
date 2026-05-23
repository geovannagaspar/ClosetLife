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

  return JSON.parse(
    localStorage.getItem('roupas')
  ) || [];

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

  /* EMPTY */

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

  /* RENDER ROUPAS */

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

  /* VALIDAÇÃO */

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

    /* ALERTA SUCESSO */

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

  Swal.fire({

    title:'Removido',

    text:'A peça foi removida.',

    icon:'info',

    confirmButtonColor:'#c8a97e',

    background:'#1c1c1f',

    color:'#ffffff'

  });

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