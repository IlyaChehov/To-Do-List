export {getToLocalStorage, setToLocalStorage};

function getToLocalStorage () {
  const taskLocalStorage = localStorage.getItem('task');
  return taskLocalStorage ? JSON.parse(taskLocalStorage) : [];
};

function setToLocalStorage (tasks) {
  return localStorage.setItem('task', JSON.stringify(tasks));
};