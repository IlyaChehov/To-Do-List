import {doneIcon, pinnedIcon, deleteIcon} from './icon.js';
import {getToLocalStorage} from './localStorage.js';

export function updateListTasks() {
  document.querySelector('.task__list').textContent = '';
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

    document.querySelector('.task__list').insertAdjacentHTML('beforeend', elementHTML);
  })
};