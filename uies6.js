function modal() {
  const modal = document.getElementById('myModal');
  const btn = document.getElementById('myBtn');
  const closeBtn = document.getElementById('close');

  btn.addEventListener('click', () => {
    modal.style.display = 'block';
  });

  closeBtn.addEventListener('click', (e) => {
    e.preventDefault();
    modal.style.display = 'none';
  });
}

modal();

class UI {
  paint(library) {
    const bookGrid = document.getElementById('bookGrid');
    bookGrid.innerHTML = '';
    library.forEach((element, index) => {
      let div = document.createElement('div');
      div.setAttribute('class', 'book');
      div.setAttribute('data-index', `${index}`);
      let deleteBtn = document.createElement('span');
      deleteBtn.setAttribute('class', 'delete');
      deleteBtn.innerHTML = `&times;`;
      for (let prop in element) {
        let p = document.createElement('p');
        if (prop == 'title') {
          p.textContent = `Title: ${element[prop]}`;
        } else if (prop == 'author') {
          p.textContent = `Author: ${element[prop]}`;
        } else if (prop == 'pages') {
          p.textContent = `Pages: ${element[prop]}`;
        } else if (prop == 'readStatus') {
          if (!element[prop]) {
            div.style.backgroundColor = 'rgb(250, 228, 215)';
          }
          p.innerHTML = `Read: <span class="isRead">${
            element[prop] ? 'Yes' : 'No'
          }</span>`;
        }
        div.appendChild(p);
      }
      div.appendChild(deleteBtn);
      bookGrid.appendChild(div);
    });
  }
}
