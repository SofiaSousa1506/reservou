const menuToggle = document.getElementById('menu-toggle');
const sidebar = document.getElementById('sidebar');
const closeMenu = document.getElementById('closeMenu');

menuToggle.addEventListener('click', () => {
  sidebar.classList.toggle('open');
});
closeMenu.addEventListener('click', () => {
  sidebar.classList.remove('open');
});

function createSection(title, items) {
  const section = document.createElement('div');
  section.className = 'menu-section';
  section.innerHTML = `<h2>${title}</h2>`;
  items.forEach(item => {
    const menuItem = document.createElement('div');
    menuItem.className = 'menu-item';
    menuItem.innerHTML = `
      <h3>${item.nome || item.name}</h3>
      <p>${item.descrição || item.description}</p>
      <p class="price">${item.preço || item.price}</p>
    `;
    section.appendChild(menuItem);
  });
  return section;
}

function renderMenu(data) {
  const menuContainer = document.getElementById('menu-content');
  menuContainer.innerHTML = '';

  // Primeiro renderiza os mais pedidos (linha separada)
  const maisPedidosSection = createSection('Mais Pedidos', data.maisPedidos);
  menuContainer.appendChild(maisPedidosSection);

  const columnsContainer = document.createElement('div');
  columnsContainer.className = 'menu-columns';

  const leftColumn = document.createElement('div');
  leftColumn.className = 'menu-column';

  const rightColumn = document.createElement('div');
  rightColumn.className = 'menu-column';

  leftColumn.appendChild(createSection('Aperitivos', data.aperitivos));
  leftColumn.appendChild(createSection('Sanduíches', data.sanduiches));
  rightColumn.appendChild(createSection('Especialidades do Chef', data.especialidades));
  rightColumn.appendChild(createSection('Sobremesas', data.sobremesas));

  columnsContainer.appendChild(leftColumn);
  columnsContainer.appendChild(rightColumn);
  menuContainer.appendChild(columnsContainer);
}

document.addEventListener('DOMContentLoaded', function () {
  fetch('db/menu.json')
    .then(response => {
      if (!response.ok) {
        throw new Error('Erro ao carregar o JSON');
      }
      return response.json();
    })
    .then(data => {
      renderMenu(data);
    })
    .catch(error => {
      console.error('Erro ao carregar o menu:', error);
    });
});
