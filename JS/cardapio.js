// Função para expandir imagem em modal
function expandImage(src, alt) {
  let modal = document.getElementById('img-modal');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'img-modal';
    modal.setAttribute('tabindex', '0');
    modal.style.position = 'fixed';
    modal.style.top = '0';
    modal.style.left = '0';
    modal.style.width = '100vw';
    modal.style.height = '100vh';
    modal.style.background = 'rgba(0,0,0,0.8)';
    modal.style.display = 'flex';
    modal.style.alignItems = 'center';
    modal.style.justifyContent = 'center';
    modal.style.zIndex = '9999';
    modal.innerHTML = `<img src="${src}" alt="${alt}" style="max-width:90vw;max-height:80vh;border-radius:16px;box-shadow:0 4px 24px #0008;" /><button id="close-modal" aria-label="Fechar imagem" style="position:absolute;top:32px;right:32px;font-size:2rem;background:#fff;border:none;border-radius:50%;padding:8px;cursor:pointer;">&times;</button>`;
    document.body.appendChild(modal);
    document.getElementById('close-modal').onclick = () => {
      modal.remove();
    };
    modal.onclick = (e) => {
      if (e.target === modal) modal.remove();
    };
    modal.focus();
  }
}

// Função para buscar e mostrar itens do cardápio
async function loadCardapio() {
  const API = "http://localhost:3000/api/public";

  // Buffet
  const buffetCarousel = document.querySelector("#buffet .carousel");
  if (buffetCarousel) {
    try {
      const res = await fetch(`${API}/buffet`);
      const data = await res.json();
      if (data.length > 0) {
        buffetCarousel.innerHTML = data.map(item => `
          <figure>
            <img src="${item.url_imagem ? item.url_imagem : '../Img/Buffet.png'}" alt="${item.descricao || 'Buffet'}" style="width:100%;height:200px;object-fit:cover;border-radius:12px 12px 0 0;cursor:pointer;" onclick="expandImage('${item.url_imagem ? item.url_imagem : '../Img/Buffet.png'}','${item.descricao || 'Buffet'}')" tabindex="0" aria-label="Expandir imagem de ${item.descricao || 'Buffet'}">
            <figcaption>${item.descricao || 'Buffet'}</figcaption>
          </figure>
        `).join('');
        const priceElem = document.querySelector("#buffet .price");
        if (priceElem) {
          priceElem.textContent = `Preço: R$ ${Number(data[0].preco_por_kg).toFixed(2)}`;
        }
      } else {
        buffetCarousel.innerHTML = "<p>Buffet indisponível no momento.</p>";
      }
    } catch {
      buffetCarousel.innerHTML = "<p>Erro ao carregar buffet.</p>";
    }
  }

  // Porções
  const porcoesContainer = document.getElementById("porcoes-items");
  if (porcoesContainer) {
    try {
      const res = await fetch(`${API}/porcoes`);
      const data = await res.json();
      porcoesContainer.innerHTML = data.map(item => {
        let preco = item.preco_meia ? `${item.preco_inteira} / ${item.preco_meia}` : item.preco_inteira;
        return `<li class="menu-item">
          <figure style="width:80px; margin:0 10px 0 0; display:inline-block; vertical-align:middle;">
            <img src="${item.url_imagem ? item.url_imagem : '../Img/Petiscos.png'}" alt="${item.nome_porcao}" style="width:100%;border-radius:8px;cursor:pointer;" onclick="expandImage('${item.url_imagem ? item.url_imagem : '../Img/Petiscos.png'}','${item.nome_porcao}')" tabindex="0" aria-label="Expandir imagem de ${item.nome_porcao}">
            <figcaption style="font-size:0.85rem;color:#388e3c;">${item.nome_porcao}</figcaption>
          </figure>
          <span style="font-weight:bold; color:#388e3c;">${preco || ''}</span>
        </li>`;
      }).join('');
    } catch {
      porcoesContainer.innerHTML = "<li>Erro ao carregar porções.</li>";
    }
  }

  // Drinks
  const drinksContainer = document.getElementById("drinks-items");
  if (drinksContainer) {
    try {
      const res = await fetch(`${API}/drinks`);
      const data = await res.json();
      drinksContainer.innerHTML = data.map(item => `
        <li class="menu-item">
          <figure style="width:80px; margin:0 10px 0 0; display:inline-block; vertical-align:middle;">
            <img src="${item.url_imagem ? item.url_imagem : '../Img/Drinks.png'}" alt="${item.nome_drink}" style="width:100%;border-radius:8px;cursor:pointer;" onclick="expandImage('${item.url_imagem ? item.url_imagem : '../Img/Drinks.png'}','${item.nome_drink}')" tabindex="0" aria-label="Expandir imagem de ${item.nome_drink}">
            <figcaption style="font-size:0.85rem;color:#388e3c;">${item.nome_drink}</figcaption>
          </figure>
          <span style="font-weight:bold; color:#388e3c;">${item.preco || ''}</span>
        </li>
      `).join('');
    } catch {
      drinksContainer.innerHTML = "<li>Erro ao carregar drinks.</li>";
    }
  }
}

window.createCardapio = loadCardapio;
