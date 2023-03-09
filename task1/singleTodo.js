import { fetchTodos, showTodos } from './todo.js';
import updatePageCountURL from './main.js';

const displayTodo = (todosId) => {
  const info = document.querySelector('.flex_wrapper');
  info.style.display = 'none';
  const backToMain = document.createElement('button');
  const todo = document.createElement('div');
  todo.classList.add('todo');
  fetchTodos(`https://jsonplaceholder.typicode.com/todos/${todosId}`).then(({ data }) => {
    todo.append(`${data.id} ${data.title}`);
  });

  const backToMainHandlier = () => {
    const count = Math.ceil(todosId / 10);
    showTodos(count);
    updatePageCountURL(count);
    info.style.display = 'block';
  };

  backToMain.innerHTML = 'Back to main';
  backToMain.classList.add('back');
  backToMain.addEventListener('click', backToMainHandlier);
  document.querySelector('#app_content').innerHTML = '';
  document.querySelector('#app_content').append(backToMain, todo);
};

export default displayTodo;
