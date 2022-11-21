const popupBg = document.querySelector(".popup__bg");
const popup = document.querySelector(".popup");
const inputHeader = document.querySelector(".input__header");
const inputText = document.querySelector(".input__text");
const taskWrapp = document.querySelector(".tasks__wrapp");
const body = document.body;

const openPopup = () => {
  popupBg.classList.add("active");
  popup.classList.add("active");
};

const closePopup = () => {
  popupBg.classList.remove("active");
  popup.classList.remove("active");
};

const removeValue = () => {
  const askUser = confirm("Очистить значения?");

  if (askUser === true) {
    inputHeader.value = "";
    inputText.value = "";
  }
};

// подгрузка Tasks
const loadTasks = () => {
  const tasksLocal = JSON.parse(localStorage.getItem("tasks"));

  if (tasksLocal.length > 0) {
    const tasksCount = document.querySelector(".tasks__count");
    tasksCount.style.display = "none";
  } else {
    const tasksCount = document.querySelector(".tasks__count");
    tasksCount.style.display = "block";
  }

  tasksLocal.forEach((element) => {
    let task = document.createElement("div");
    task.className = "task";
    const id = element.id;
    task.setAttribute("id", String(id));

    let h3 = document.createElement("h3");
    h3.innerHTML = element.title;

    let taskDescription = document.createElement("div");
    taskDescription.className = "task__description";
    taskDescription.innerHTML = element.description;

    let taskContent = document.createElement("div");
    taskContent.className = "task__content";
    taskContent.appendChild(h3);
    taskContent.appendChild(taskDescription);

    let taskDeleteBtn = document.createElement("button");
    taskDeleteBtn.className = "task__delete";
    taskDeleteBtn.innerHTML = "X";
    taskDeleteBtn.setAttribute("onClick", `deleteAskTask(${id})`);

    let taskChanseBtn = document.createElement("button");
    taskChanseBtn.className = "task__chanse";
    let chanseImg = document.createElement("img");
    chanseImg.setAttribute("src", "./img/icon-black.svg");
    taskChanseBtn.appendChild(chanseImg);
    taskChanseBtn.setAttribute("onClick", `changeTask(${id})`);

    let taskSettings = document.createElement("div");
    taskSettings.className = "task__settings";
    taskSettings.appendChild(taskDeleteBtn);
    taskSettings.appendChild(taskChanseBtn);

    task.appendChild(taskContent);
    task.appendChild(taskSettings);

    const checkIfElementExist = document.getElementById(`${element.id}`);

    if (!checkIfElementExist) {
      taskWrapp.appendChild(task);
    }
  });
};

window.addEventListener("DOMContentLoaded", () => {
  loadTasks();
});

// создает Task
const creatTask = () => {
  const error = document.querySelector(".input__error");

  if (inputHeader.value === "" || inputText.value === "") {
    error.classList.add("active");
  } else {
    const id = Math.floor(Math.random() * 10000000);

    const objectTask = {
      title: inputHeader.value,
      description: inputText.value,
      id: id,
    };

    let tasks = JSON.parse(localStorage.getItem("tasks"));

    if (tasks === null) {
      tasks = [];
    }

    tasks.push(objectTask);

    localStorage.setItem("tasks", JSON.stringify(tasks));

    loadTasks();

    closePopup();

    error.classList.remove("active");
    inputHeader.value = "";
    inputText.value = "";
  }
};

// удаление Task
const deleteAskTask = (id) => {
  let deleteAsk = document.createElement("div");
  deleteAsk.classList.add("delete__ask");

  let container = document.createElement("div");
  container.classList.add("container");

  let deleteAskWrapp = document.createElement("div");
  deleteAskWrapp.classList.add("delete__ask_wrapp");

  let h4 = document.createElement("h4");
  h4.innerHTML = "Удалить задачу?";

  let deleteAskBtns = document.createElement("div");
  deleteAskBtns.classList.add("delete__ask_buttons");

  let deleteTaskBtn = document.createElement("button");
  deleteTaskBtn.innerHTML = "Да";
  deleteTaskBtn.setAttribute("onClick", `deleteTask(${id})`);

  let removeTaskBtn = document.createElement("button");
  removeTaskBtn.innerHTML = "Отмена";
  removeTaskBtn.setAttribute("onClick", `removeAsk()`);

  deleteAskBtns.appendChild(deleteTaskBtn);
  deleteAskBtns.appendChild(removeTaskBtn);
  deleteAskWrapp.appendChild(h4);
  deleteAskWrapp.appendChild(deleteAskBtns);
  container.appendChild(deleteAskWrapp);
  deleteAsk.appendChild(container);
  body.appendChild(deleteAsk);
};

const removeAsk = () => {
  body.removeChild(document.querySelector(".delete__ask"));
};

const deleteTask = (id) => {
  const elementToDelete = document.getElementById(`${id}`);
  taskWrapp.removeChild(elementToDelete);
  removeAsk();

  const newTasks = JSON.parse(localStorage.getItem("tasks")).filter(
    (task) => task.id !== id
  );
  localStorage.setItem("tasks", JSON.stringify(newTasks));

  if (JSON.parse(localStorage.getItem("tasks")).length !== 0) {
    loadTasks();
  } else if (JSON.parse(localStorage.getItem("tasks")).length === 0) {
    const tasksCount = document.querySelector(".tasks__count");
    tasksCount.style.display = "block";
  }
};

// изменяет Task
const changeTask = (id) => {
  const element = document.getElementById(`${id}`);

  const taskTitle = element.getElementsByTagName("h3")[0];
  const taskDescription = element.querySelector(".task__description");
  const button = element.querySelector(".task__chanse");

  const h3Input = document.createElement("input");
  h3Input.value = taskTitle.textContent;

  const descriptionTextarea = document.createElement("textarea");
  descriptionTextarea.value = taskDescription.textContent;

  taskTitle.parentNode.replaceChild(h3Input, taskTitle);
  taskDescription.parentNode.replaceChild(descriptionTextarea, taskDescription);

  button.setAttribute("onClick", `changeValue(${id})`);
};

const changeValue = (id) => {
  const button = document.querySelector(".task__chanse");

  const h3Input = document.getElementsByTagName("input")[0];
  const descriptionTextarea = document.getElementsByTagName("textarea")[0];

  const h3 = document.createElement("h3");
  h3.innerHTML = h3Input.value;

  const description = document.createElement("div");
  description.classList.add("task__description");
  description.innerHTML = descriptionTextarea.value;

  h3Input.parentNode.replaceChild(h3, h3Input);
  descriptionTextarea.parentNode.replaceChild(description, descriptionTextarea);

  button.setAttribute("onClick", `changeTask(${id})`);

  const objectTask = {
    title: h3Input.value,
    description: descriptionTextarea.value,
    id: id,
  };

  let tasks = JSON.parse(localStorage.getItem("tasks"));

  if (tasks === null) {
    tasks = [];
  }

  const elementInArray = tasks.findIndex((element) => element.id === id);

  tasks[elementInArray].id = objectTask.id;
  tasks[elementInArray].title = objectTask.title;
  tasks[elementInArray].description = objectTask.description;

  localStorage.setItem("tasks", JSON.stringify(tasks));

  loadTasks();
};
