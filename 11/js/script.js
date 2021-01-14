document.forms.todo.addEventListener('submit', onFormSubmit);
const listTask = document.querySelector('#list_task');
const input = document.querySelector('#input_task');
const todoForm = document.forms.todo;

function onFormSubmit(evt) {
    evt.preventDefault();
    const {
        value
    } = input;
    if (!!value) {

        const buttonRemove = document.createElement('button');
        const newElement = document.createElement('li');
        const newParagraph = document.createElement('p');
        newParagraph.classList.add('bg');
        buttonRemove.classList.add('remove-button');
        newElement.classList.add('list-contact__item');
        newElement.classList.add('list-contact__remove');
        newElement.appendChild(newParagraph);
        newParagraph.textContent = input.value;
        newParagraph.addEventListener('click', () => {
            newParagraph.classList.toggle('bg-remove');
        });
        newElement.appendChild(buttonRemove);
        resetForm();
        listTask.appendChild(newElement);
    }

}

function resetForm() {
    todoForm.reset();
}

listTask.addEventListener("click", function ({
    target
}) {
    if (target.matches('.remove-button')) {
        target.parentNode.remove();
    }
});