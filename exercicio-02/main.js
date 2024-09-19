
document.addEventListener('DOMContentLoaded', () => {
    const taskList = document.getElementById('task-list');
    const taskInput = document.getElementById('task-input');
    const addTaskButton = document.getElementById('add-task');
    const taskFilter = document.getElementById('task-filter');
    const themeToggle = document.getElementById('theme-toggle');
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const isDarkMode = JSON.parse(localStorage.getItem('darkMode'));


    if (isDarkMode) {
        document.body.classList.add('dark-mode');
    }


    tasks.forEach(task => {
        addTaskToList(task.text, task.completed);
    });

 
    addTaskButton.addEventListener('click', () => {
        const taskText = taskInput.value.trim();
        if (taskText) {
            addTaskToList(taskText);
            taskInput.value = '';
        }
    });

    taskFilter.addEventListener('input', () => {
        const filterText = taskFilter.value.toLowerCase();
        document.querySelectorAll('#task-list li').forEach(li => {
            const text = li.querySelector('span').textContent.toLowerCase();
            li.style.display = text.includes(filterText) ? '' : 'none';
        });
    });

    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        localStorage.setItem('darkMode', JSON.stringify(document.body.classList.contains('dark-mode')));
    });

    function addTaskToList(text, completed = false) {
        const li = document.createElement('li');
        if (completed) li.classList.add('completed');
        li.innerHTML = `
            <span>${text}</span>
            <button class="complete-task">${completed ? 'Desmarcar' : 'Concluir'}</button>
            <button class="remove-task">Remover</button>
        `;
        li.querySelector('.complete-task').addEventListener('click', () => {
            li.classList.toggle('completed');
            updateLocalStorage();
        });
        li.querySelector('.remove-task').addEventListener('click', () => {
            li.remove();
            updateLocalStorage();
        });
        taskList.appendChild(li);
        updateLocalStorage();
    }

    function updateLocalStorage() {
        const taskItems = [];
        document.querySelectorAll('#task-list li').forEach(li => {
            taskItems.push({
                text: li.querySelector('span').textContent,
                completed: li.classList.contains('completed')
            });
        });
        localStorage.setItem('tasks', JSON.stringify(taskItems));
    }
});
