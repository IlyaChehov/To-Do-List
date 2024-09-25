import {getToLocalStorage, setToLocalStorage} from './localStorage.js';
import {updateListTasks} from './utils.js';

const form = document.querySelector('.task-form');
const inputForm = document.querySelector('.task-form__input');
const taskContainer = document.querySelector('.task__list');

updateListTasks();

form.addEventListener('submit', addInputValue);

taskContainer.addEventListener('click', (event) => {
  const parentNodeButtons = event.target.closest('.task__list__buttons');

  if (!parentNodeButtons) return;
  
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

function doneTask(event) {
  const parentNode = event.target.closest('.task__list-item');
  const taskId = Number(parentNode.dataset.id);
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
  const parentNode = event.target.closest('.task__list-item');
  const taskId = Number(parentNode.dataset.id);
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
  const parentNode = event.target.closest('.task__list-item');
  const taskId = Number(parentNode.dataset.id);
  let arrayTasks = getToLocalStorage();
 
  arrayTasks = arrayTasks.filter((task) => task.id !== taskId);

  setToLocalStorage (arrayTasks);
  updateListTasks();
};