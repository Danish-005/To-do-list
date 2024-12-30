const KEY = "listArray";
let textValue = document.getElementById("textValues");
let itemsList = document.getElementById("itemsList");

let listArray = [];

window.addEventListener("DOMContentLoaded", () => {
  let localStorageValue = localStorage.getItem(KEY);
  if (localStorageValue != null) {
    listArray = JSON.parse(localStorageValue);
    updateHtml();
  }
});

textValue.addEventListener("keyup", (e) => {
  if (e.key == "Enter") {
    let itemObject = getItemId(textValue);
    listArray.push(itemObject);
    updateHtml();
    textValue.value = "";
  }
});

function getItemId(value) {
  let valueAndId = {
    value: value.value,
    id: Math.random(),
  };
  return valueAndId;
}

console.log(window);

function getItem(arrayObject) {
  let item = `<div class="items"><p>${arrayObject.value}</p><button onclick="deleteItemFromList(${arrayObject.id})" >X</button></div>`;
  return item;
}

function getItemsList() {
  let totalItems = "";
  for (let i = listArray.length - 1; i >= 0; i--) {
    totalItems += getItem(listArray[i]);
  }
  return totalItems;
}

function deleteItemFromList(id) {
  listArray = listArray.filter((element) => element.id != id);
  updateHtml();
}

function updateHtml() {
  itemsList.innerHTML = getItemsList();
  updateLocalStorage();
}

function updateLocalStorage() {
  localStorage.setItem(KEY, JSON.stringify(listArray));
}
