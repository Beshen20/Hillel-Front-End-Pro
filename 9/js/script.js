document.forms.todo.addEventListener('submit', onFormSubmit);

function onFormSubmit(evt) {
    evt.preventDefault();
    const listTask = document.querySelector("#list_task");
    const input = document.querySelector("#input_task");
    const {
        value
    } = input;
    if (!!value) {
        const newElement = document.createElement("li");
        const todoForm = document.forms.todo;
        newElement.textContent = input.value;
        todoForm.reset();
        listTask.appendChild(newElement);
    }

}