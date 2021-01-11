document.forms.contact.addEventListener("submit", onFormSubmit);

const listContacts = document.querySelector("#list_contacts");
const inputNume = document.querySelector("#input-name");
const inputLastNume = document.querySelector("#input-last_name");
const inputNumber = document.querySelector("#input-number");

function onFormSubmit(evt) {
    evt.preventDefault();
    const {
        value
    } = inputNume;

    if (!!value) {

        const newElementRow = document.createElement("ul");
        newElementRow.classList.add("list-contact__item");
        const newElementRemove = document.createElement("li");
        newElementRemove.classList.add("list-contact__remove");
        newElementRemove.innerHTML = "X";
        const newElementNume = document.createElement("li");
        const newElementLastNume = document.createElement("li");
        const newElementNumber = document.createElement("li");
        const contactForm = document.forms.contact;
        newElementNume.textContent = inputNume.value;
        newElementLastNume.textContent = inputLastNume.value;
        newElementNumber.textContent = inputNumber.value;
        contactForm.reset();
        newElementRow.appendChild(newElementNume);
        newElementRow.appendChild(newElementLastNume);
        newElementRow.appendChild(newElementNumber);
        newElementRow.appendChild(newElementRemove);
        listContacts.appendChild(newElementRow);
    }
}
listContacts.addEventListener("click", function (evt) {
    const target = evt.target;
    if (target.classList.contains("list-contact__remove")) {
        target.parentNode.remove();
    }
});