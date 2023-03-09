import displayTodo from './singleTodo.js';
import updatePageCountURL from './main.js';

export const fetchTodos = async (url) => {
  const response = await fetch(url);
  const total = response.headers.get('x-total-count') || null;
  const data = await response.json();
  return {
    data,
    total,
  };
};

export const showTodos = (currentPage) => {
  fetchTodos(`https://jsonplaceholder.typicode.com/todos?_limit=10&_page=${currentPage}`).then(
    ({ 
        data,
        total 
    }) => {
      displayTodos(data);
      pagination(total, currentPage);
    },
  );
};

  const displayTodos = (data) => {
  const appContent = document.querySelector('#app_content');
  const wrapper = document.createElement('div');
  const todos = document.createElement('div');
  todos.innerText = '';
  todos.classList.add('todos');
  todos.addEventListener('click', (event) => {
    event.preventDefault();
    const target = event.target.tagName;
    if (target === 'A') {
      const todoId = event.target.dataset.number;
      displayTodo(todoId);
      history.pushState({ todoId: +todoId }, 'todoId', `?todoId=${todoId}`);
    }
  });
  const innerData = data.reduce((accumulator, { id, title, completed }) =>
    accumulator + `<div class="item ${completed ? "done" : "not_done"}">${id} ${title}<span class="info">
    <a class="link" data-number="${id}">Click me!</a></span></div>`,
    '',
  );
  todos.insertAdjacentHTML('afterbegin', innerData);
  appContent.innerHTML = '';
  appContent.append(wrapper);
  wrapper.append(todos);
};

function pagination(total, currentPage) {
    const pagination = document.createElement('div');
    pagination.innerHTML = '';
    pagination.classList.add('pagination');
    const pagesAtAll = Math.ceil(total / 10);
  
    let arr = [];
    for (let i = 0; i < pagesAtAll; i++) {
      arr.push(i + 1);
    }
  
    arr.forEach((element) => {
      const button = document.createElement('button');
      button.innerText = element;
      button.classList.add('pageNumber');
      if (element === currentPage) {
      button.classList.add('active');
      }
      pagination.append(button);
    });
  
      if (currentPage !== 1) {
        const previous = document.createElement('button');
        previous.innerHTML = 'previous';
        previous.classList.add('prev');
        previous.classList.add('btns');
        pagination.insertAdjacentElement('afterbegin', previous);
      }
      if (currentPage !== pagesAtAll) {
        const buttonNext = document.createElement('button');
        buttonNext.innerText = 'next';
        buttonNext.classList.add('next');
        buttonNext.classList.add('btns');
        pagination.append(buttonNext);
      }
  
    pagination.addEventListener('click', (event) => {
        if (event.target.className.indexOf('prev') !== -1) {
          currentPage -= 1;
        } else if (event.target.className.indexOf('next') !== -1) {
          currentPage += 1;
        } else {
          currentPage = +event.target.innerText;
        }
        showTodos(currentPage);
        updatePageCountURL(currentPage);
    });
    const appContent = document.querySelector('#app_content');
    appContent.append(pagination);
  };
