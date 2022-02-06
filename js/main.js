const toDoList = [];
const input = document.querySelector('#new');
const search = document.querySelector('#search');
const button = document.querySelector('form button');
const count = document.querySelector('h1 span');
const ul = document.querySelector('ul');
const liElements = document.querySelectorAll('li.task');

const showResult = () => {
    ul.textContent = '';
    toDoList.forEach((elem, key) => {
        elem.dataset.key = key;
        ul.appendChild(elem);
    });
    count.textContent = toDoList.length;
};

const removeTask = (e) => {
    const index = e.target.parentNode.dataset.key;
    const confirmationBox = document.createElement('div');
    const confirmationBoxText = document.createElement('div');
    const coverSiteForDelete = document.createElement('div');
    coverSiteForDelete.className = 'siteCover';
    confirmationBox.className = 'confirmationBox';
    confirmationBoxText.textContent = 'Are you sure you want to delete this task?';
    confirmationBoxText.className = "confirmationBoxText";
    const confirmationBoxButtons = document.createElement('div');
    confirmationBoxButtons.className = 'confirmationBoxButtons';
    const confirmationYes = document.createElement('button');
    confirmationYes.textContent = 'Yes';
    confirmationYes.addEventListener('click', function(){
        toDoList.splice(index,1);
        coverSiteForDelete.remove();
        showResult();
    });
    const confirmationNo = document.createElement('button');
    confirmationNo.textContent = "No";
    confirmationNo.addEventListener('click', function(){coverSiteForDelete.remove();})
    document.body.appendChild(coverSiteForDelete);
    coverSiteForDelete.appendChild(confirmationBox);
    confirmationBox.appendChild(confirmationBoxText);
    confirmationBox.appendChild(confirmationBoxButtons);
    confirmationBoxButtons.appendChild(confirmationYes);
    confirmationBoxButtons.appendChild(confirmationNo);
    showResult();
};

const addTask = (e) => {
    e.preventDefault();
    const textValue = input.value;
    const listElem = document.createElement('li');
    listElem.className = 'task';
    listElem.innerHTML = textValue + '<button>Delete</button>';
    toDoList.push(listElem);
    showResult();
    listElem.querySelector('button').addEventListener('click', removeTask);
    input.value = '';
};

const searchTask = (e) => {
    const filteredValue = e.target.value.toLowerCase();
    let tasks = toDoList;
    tasks = tasks.filter(task => task.textContent.toLowerCase().slice(0,-6).includes(filteredValue));
    ul.textContent = '';
    tasks.forEach(li => ul.appendChild(li));
    count.textContent = tasks.length;
};

button.addEventListener('click', addTask);
search.addEventListener('input', searchTask);