const CONTACT_URL = 'https://5dd3d5ba8b5e080014dc4bfa.mockapi.io/contacts';
const DELETE_BTN_CLASS = 'delete-btn';
const CONTACT_ROW_SELECTOR = '.contact-row';

const contactForm = document.querySelector('#newContactForm');
const contactsList = document.querySelector('#contactsList');
const contactTemplate = document.querySelector('#contactTemplate').innerHTML;
const formInputs = document.querySelectorAll('.form-input');

const nameInput = document.getElementById("nameInput");
const surnameInput = document.getElementById("surnameInput");
const phoneInput = document.getElementById("phoneInput");

contactForm.addEventListener('submit', onContactFormSubmit);
contactsList.addEventListener('click', onContactsListClick);

// addContact({
//     name: 'John1',
//     surname: 'Doe',
//     phone: '5555',
// });

// addContact({
//     name: 'John2',
//     surname: 'Doe',
//     phone: '5555',
// });

// addContact({
//     name: 'John3',
//     surname: 'Doe',
//     phone: '5555',
// });

const contactMass = [];

fetch(CONTACT_URL)
    .then((response) => {
        return response.json();
    })
    .then((data) => {
        for (let i = 0; i < data.length; i++) {
            addContact(data[i]);
            contactMass.push(data[i]);
        }
    });

function onContactFormSubmit(e) {
    e.preventDefault();

    const newContact = getContact();

    if (isContactValid(newContact)) {
        addContact(newContact);
        resetForm();
    } else {
        alert('Not valid');
    }
}

function onContactsListClick(e) {
    if (e.target.classList.contains(DELETE_BTN_CLASS)) {
        const tr = getContactRow(e.target);
        removeContact(tr);
    }
}

function getContact() {
    const contact = {};

    formInputs.forEach((inp) => {
        contact[inp.name] = inp.value;
    });

    return contact;
}

function isContactValid(contact) {
    return (
        isFieldValid(contact.name) &&
        isFieldValid(contact.surname) &&
        isPhoneFieldValid(contact.phone)
    );
}

function isFieldValid(value) {
    return value !== '';
}

function isPhoneFieldValid(value) {
    return isFieldValid(value) && !isNaN(value);
}

function generateContactHtml(contact) {
    return contactTemplate
        .replace('{{name}}', contact.name)
        .replace('{{surname}}', contact.surname)
        .replace('{{phone}}', contact.phone)
        .replace('{{id}}', contact.id);
}

function addContact(contact) {
    const newContactHtml = generateContactHtml(contact);
    contactsList.insertAdjacentHTML('beforeend', newContactHtml);
}

function resetForm() {
    contactForm.reset();
}

function getContactRow(el) {
    return el.parentElement.closest(CONTACT_ROW_SELECTOR);
}

function removeContact(el) {
    try {
        for (let i = 0; i < contactMass.length; i++) {
            if (el.id == contactMass[i].id) {
                contactMass.splice(i, 1);
                fetch(CONTACT_URL, {
                    method: "POST",
                    body: JSON.stringify(contactMass[i])
                });
            }
        }
        el.remove();
    } catch (error) {
        console.log(error);
    }
}

function copyContact(el) {
    const contact = contactMass.find(id => id.id === el.path[1].id);
    nameInput.value = contact.name;
    surnameInput.value = contact.surname;
    phoneInput.value = contact.phone;
}

function changeContact(el) {
    try {
        for (let i = 0; i < contactMass.length; i++) {
            if (contactMass[i].id == el.path[2].id) {
                const question1 = prompt(`what name do you want to change? - ( ${contactMass[i].name} ): `);
                const question2 = prompt(`what surname do you want to change? - ( ${contactMass[i].surname} ): `);
                const question3 = prompt(`what phone number do you want to change? - ( ${contactMass[i].phone} ): `);

                const newContact = {
                    id: el.path[2].id,
                    name: !question1 ? contactMass[i].name : question1,
                    surname: !question2 ? contactMass[i].surname : question2,
                    phone: !question3 ? contactMass[i].phone : question3,
                };
                contactMass.splice(i, 1, newContact);
                el.path[2].children[0].innerText = newContact.name;
                el.path[2].children[1].innerText = newContact.surname;
                el.path[2].children[2].innerText = newContact.phone;

                fetch(CONTACT_URL, {
                    method: "POST",
                    body: JSON.stringify(newContact),
                });
            }
        }
    } catch (error) {
        console.log(error);
    }
}