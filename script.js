window.onload = () => {
  callEveryone();
};

const getDivInput = document.querySelector('.input-container');
const getDivList = document.querySelector('.list-container');
const getDivButtons = document.querySelector('.buttons-container');

const createToDoInput = () => {
  const input = document.createElement('input');
  input.setAttribute('type', 'text');
  input.id = 'texto-tarefa';
  input.placeholder = 'Type your todo here'
  getDivInput.appendChild(input);
}

const createToDoList = () => {
  const createOList = document.createElement('ol');
  createOList.id = 'lista-tarefas';
  getDivList.appendChild(createOList);
};

const createButton = (id, text, appendTo) => {
  const button = document.createElement('button');
  button.id = id;
  button.innerHTML = text;
  appendTo.appendChild(button);
}

const addNewTask = () => {
  const getInputField = document.querySelector('#texto-tarefa');
  const getAddInputButton = document.querySelector('#criar-tarefa');
  const getOrdenedList = document.querySelector('#lista-tarefas');
  getAddInputButton.addEventListener('click', () => {
    const newLi = document.createElement('li');
    newLi.innerText = getInputField.value;
    newLi.id = 'task';
    getOrdenedList.appendChild(newLi);
    getInputField.value = '';
  });
  getInputField.addEventListener('keyup', (event) => {
    if (event.keyCode === 13 && getInputField.value !== '') {
      const newLi = document.createElement('li');
      newLi.innerText = getInputField.value;
      newLi.id = 'task';
      getOrdenedList.appendChild(newLi);
      getInputField.value = '';
    }
  });
}

const selectItemOnList = () => {
  document.querySelector('#lista-tarefas').addEventListener('click', (event) => {
    const getSelectedTask = document.querySelector('.selected');
    if (getSelectedTask) {
      getSelectedTask.classList.remove('selected');
      event.target.classList.add('selected');
    };
    event.target.classList.add('selected');
  });
}

const markCompletedTasks = () => {
  document.querySelector('#lista-tarefas')
    .addEventListener('dblclick', (event) => {
    if (event.target.classList.contains('completed')) {
      event.target.classList.remove('completed');
    } else {
      event.target.classList.add('completed');
    }
  });
}

const deleteAllTasks = () => {
  document.querySelector('#apaga-tudo').addEventListener('click', () => {
    document.querySelector('#lista-tarefas').innerHTML = '';
  });
}

const deleteCompletedTasks = () => {
  document.querySelector('#remover-finalizados').addEventListener('click', () => {
    const getCompletedTasks = document.querySelectorAll('.completed');
    getCompletedTasks.forEach((task) => {
      task.remove();
    })
  });
}

const saveTaskList = () => {
  document.querySelector('#salvar-tarefas').addEventListener('click', () => {
    const getAllTasks = document.querySelectorAll('#task');
    const tasksContent = [];
    getAllTasks.forEach((task) => {
      if (task.classList.value.includes('completed')) {
        tasksContent.push({ text: task.innerText, done: true });
        return;
      }
      tasksContent.push({ text: task.innerText, done: false });
    });
    localStorage.setItem('taskList', JSON.stringify(tasksContent));
  });
}

const deleteSelectedTask = () => {
  document.querySelector('#remover-selecionado').addEventListener('click', () => {
    document.querySelector('.selected').remove();
  });
}

const movingUp = () => {
  document.querySelector('#mover-cima').addEventListener('click', () => {
    const getSelectedTask = document.querySelector('.selected');
    if (getSelectedTask && getSelectedTask.previousElementSibling) {
      getSelectedTask.parentElement.insertBefore(getSelectedTask, getSelectedTask.previousElementSibling);
    }
  });
}

const movingDown = () => {
  document.querySelector('#mover-baixo').addEventListener('click', () => {
    const getSelectedTask = document.querySelector('.selected');
    if (getSelectedTask && getSelectedTask.nextElementSibling) {
      getSelectedTask.parentElement.insertBefore(getSelectedTask.nextElementSibling, getSelectedTask);
    }
  });
}

const renderSavedTasks = () => {
  const recoverTaskList = JSON.parse(localStorage.getItem('taskList'));
  const getOl = document.querySelector('#lista-tarefas');
  recoverTaskList.forEach(({ text, done }) => {
    const newLi = document.createElement('li');
    newLi.innerText = text;
    newLi.id = 'task';
    if (done) {
      newLi.classList.add('completed');
    }
    getOl.appendChild(newLi);
  });
};

const callEveryone = () => {
  createToDoInput();
  createToDoList();
  createButton('criar-tarefa', 'Add To Do', getDivInput);
  createButton('apaga-tudo', 'Delete all', getDivButtons);
  createButton('remover-finalizados', 'Remove done todos', getDivButtons);
  createButton('salvar-tarefas', 'Save List', getDivButtons);
  createButton('remover-selecionado', 'X', getDivButtons);
  createButton('mover-cima', 'Up', getDivButtons);
  createButton('mover-baixo', 'Down', getDivButtons);
  addNewTask();
  selectItemOnList();
  markCompletedTasks();
  deleteAllTasks();
  deleteCompletedTasks();
  saveTaskList();
  deleteSelectedTask();
  movingUp();
  movingDown();
  renderSavedTasks();
}
