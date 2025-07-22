const taskInput = document.getElementById('taskInput');
const addTaskBtn = document.getElementById('addTaskBtn');
const taskList = document.getElementById('taskList');

addTaskBtn.addEventListener('click', addTask);

taskInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    addTask();
  }
});

function addTask() {
  const taskText = taskInput.value.trim();
  if (taskText === '') return;

  const taskItem = createTaskElement(taskText);
  taskList.appendChild(taskItem);

  taskInput.value = '';
  taskInput.focus();
}

function createTaskElement(text) {
  const taskItem = document.createElement('div');
  taskItem.classList.add('task-item');

  const taskText = document.createElement('span');
  taskText.classList.add('task-text');
  taskText.textContent = text;

  taskText.addEventListener('click', () => {
    taskItem.classList.toggle('completed');
  });

  const actions = document.createElement('div');
  actions.classList.add('task-actions');

  const deleteBtn = document.createElement('button');
  deleteBtn.innerHTML = '🗑️';
  deleteBtn.title = 'Eliminar';
  deleteBtn.addEventListener('click', () => {
    taskList.removeChild(taskItem);
  });

  actions.appendChild(deleteBtn);
  taskItem.appendChild(taskText);
  taskItem.appendChild(actions);

  return taskItem;
}
