const toDoForm = document.querySelector(".js-toDoForm"),
  toDoInput = toDoForm.querySelector("input"),
  toDoList = document.querySelector(".js-toDoList");

const TODOS_LS = "toDos";

function saveToDos() {
  localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
}

function deleteToDo(event) {
  const btn = event.target;
  const li = btn.parentNode;
  toDoList.removeChild(li);
  const cleanToDo = toDos.filter(function(toDo) {
    return toDo.id !== parseInt(li.id);
  });

  toDos = cleanToDo;
  saveToDos();
}

function loadToDos() {
  const loadedToDos = localStorage.getItem(TODOS_LS);

  const parsedToDos = JSON.parse(loadedToDos);

  parsedToDos.forEach(function(toDo) {
    paintToDo(toDo.text);
  });
}

let toDos = [];

function handleCheckBtn(event) {
  const btn = event.target;
  const li = btn.parentNode;
  li.childNodes[0].classList.toggle("done");
}

function paintToDo(text) {
  const li = document.createElement("li");
  const delBtn = document.createElement("button");
  delBtn.innerText = "✖️";
  delBtn.addEventListener("click", deleteToDo);

  const checkBtn = document.createElement("button");
  checkBtn.innerText = "✔️";
  checkBtn.addEventListener("click", handleCheckBtn);

  const span = document.createElement("span");
  span.innerText = text;
  const newId = toDos.length + 1;
  li.appendChild(span);
  li.appendChild(checkBtn);
  li.appendChild(delBtn);

  toDoList.appendChild(li);
  li.id = newId;

  const toDoObj = {
    text: text,
    id: newId
  };
  toDos.push(toDoObj);
  saveToDos();
}

function handleSubmit(event) {
  event.preventDefault();
  const currentValue = toDoInput.value;
  paintToDo(currentValue);
  toDoInput.value = "";
}
function init() {
  loadToDos();
  toDoForm.addEventListener("submit", handleSubmit);
}
init();
