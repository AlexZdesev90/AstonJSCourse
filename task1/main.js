import { showTodos } from './todo.js';
import displayTodo from './singleTodo.js';

const params = new URLSearchParams(window.location.search);
const todosId = params.get('todosId');
const page = params.get('page') || 1;

if (page) {
  showTodos(page);
} else if (todosId) {
  displayTodo(todosId);
}

const updatePageCountURL = (page) => {
  history.pushState({ page }, 'pageCount', `?page=${page}`);
};

export default updatePageCountURL;
