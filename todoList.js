const input = document.querySelector("input");
const addBtn = document.getElementById("add-btn");
const list = document.getElementById("list");
let listItem = JSON.parse(localStorage.getItem("listItem")) || []

document.addEventListener("DOMContentLoaded", () => {
    firstRender(listItem)
})

function setLocalStorage() {
    localStorage.setItem('listItem', JSON.stringify(listItem))
}

// CREATING LI & DEL BTN
function firstRender(listItem) {
    list.innerHTML = ""
    listItem.forEach(item => {
        const todo = document.createElement('div');
        todo.id = item.id;
        todo.innerHTML = ` 
            <li>
                <span>${item.content}</span>
                <button onClick="deleteBtn(${item.id})">x</button>
                <input type="checkbox" class="checkbox" onChange="checkItem(this, ${item.id})">
            </li>
            `;
        list.appendChild(todo);
    });

};

// DELETE ITEM FUNCTION
function deleteBtn(id) {
    listItem = listItem.filter(item => item.id !== id);
    setLocalStorage()
    firstRender(listItem)
}

// ADD FUNCTION
addBtn.addEventListener('click', (e) => {
    e.preventDefault();

    if (input.value === "") {
        window.alert("please, add your tasks!");
        return;
    };

    const item = {
        id: Math.floor(Math.random() * 1000),
        content: input.value
    };

    listItem = [...listItem, item];
    firstRender(listItem);

    setLocalStorage();

    input.value = "";
})


// CHECK ITEM
function checkItem(checkbox, id) {
    const li = document.getElementById(id);
    const span = li.querySelector('span');
    if (checkbox.checked) {
        span.classList.add('text-decoration');
    } else {
        span.classList.remove('text-decoration');
    }
}