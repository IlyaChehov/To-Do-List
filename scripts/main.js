import {doneIcon, pinnedIcon, deleteIcon} from './icon.js'

const form = document.querySelector('.task-form');
const inputForm = document.querySelector('.task-form__input');
const taskContainer = document.querySelector('.task__list');

updateListTasks();

form.addEventListener('submit', addInputValue);

taskContainer.addEventListener('click', (event) => {
  const parendNodeButtons = event.target.closest('.task__list__buttons');

  if (!parendNodeButtons) return;
  
  if (event.target.classList.contains('task__list__button-done')) {
    doneTask(event);
  } else if (event.target.classList.contains('task__list__button-pinned')) {
    pinnedTask(event);
  } else if (event.target.classList.contains('task__list__button-delete')) {
    deleteTask(event);
  }
})

function addInputValue (event) {
  event.preventDefault();

  const task = inputForm.value.trim();

  if (!task) {
    return alert('Ошибка! Поле ввода пустое!')
  };

  const arrayTask = getToLocalStorage();

  arrayTask.push({
    id: new Date().getTime(),
    task: task,
    done: false,
    pinned: false
  });

  setToLocalStorage(arrayTask);
  updateListTasks();

  form.reset();
};

function getToLocalStorage () {
  const taskLocalStorage = localStorage.getItem('task');
  return taskLocalStorage ? JSON.parse(taskLocalStorage) : [];
};

function setToLocalStorage (tasks) {
  return localStorage.setItem('task', JSON.stringify(tasks));
};

function updateListTasks() {
  taskContainer.textContent = '';
  const taskLocalStorage = getToLocalStorage();
  renderTasks(taskLocalStorage);
};

function renderTasks (tasks) {
  tasks.sort((a, b) => {
    if (a.done !== b.done) {
      return b.done ? -1 : 1
    };
    if (a.pinned !== b.pinned) {
      return a.pinned ? -1 : 1;
    }
  }).forEach((elementTasks, index) => {
    const {id, task, done, pinned} = elementTasks;

    const elementHTML = 
    `
      <li class="task__list-item ${done ? 'done' : ''} ${pinned ? 'pinned' : ''}" data-id="${id}">
        <span class="task__list-numbering">${index + 1}.</span>
        <p class="task__list-text">${task}</p>
        <div class="task__list__buttons">
          <button class="button task__list__button-done">${doneIcon}</button>
          <button class="button task__list__button-pinned">${pinnedIcon}</button>
          <button class="button task__list__button-delete">${deleteIcon}</button>
        </div>
      </li>
    `

    taskContainer.insertAdjacentHTML('beforeend', elementHTML);
  })
};

function doneTask(event) {
  const parendNode = event.target.closest('.task__list-item');
  const taskId = Number(parendNode.dataset.id);
  const arrayTasks = getToLocalStorage();

  const index = arrayTasks.findIndex((task) => task.id === taskId);

  if (arrayTasks[index].done) {
    arrayTasks[index].done = false;
  } else {
    arrayTasks[index].done = true;
    arrayTasks[index].pinned = false;
  }

  setToLocalStorage (arrayTasks);
  updateListTasks();

};

function pinnedTask(event) {
  const parendNode = event.target.closest('.task__list-item');
  const taskId = Number(parendNode.dataset.id);
  const arrayTasks = getToLocalStorage();

  const index = arrayTasks.findIndex((task) => task.id === taskId);

  if (arrayTasks[index].done) {
    return alert('Выполненную задачу нельзя добавить в избранное!')
  }

  if (arrayTasks[index].pinned) {
    arrayTasks[index].pinned = false;
  } else {
    arrayTasks[index].pinned = true;
  }

  console.log(event.target.classList.add)

  setToLocalStorage (arrayTasks);
  updateListTasks();
};

function deleteTask(event) {
  const parendNode = event.target.closest('.task__list-item');
  const taskId = Number(parendNode.dataset.id);
  let arrayTasks = getToLocalStorage();
 
  arrayTasks = arrayTasks.filter((task) => task.id !== taskId);

  setToLocalStorage (arrayTasks);
  updateListTasks();
};