$(() => {
    const CONTACT_URL = 'https://5dd3d5ba8b5e080014dc4bfa.mockapi.io/contacts';
    const EDIT_BTN_ID = 'changeButton';
    const DELETE_BTN_CLASS = 'delete-btn';
    const CONTACT_ROW_SELECTOR = '.contact-row';

    const contactForm = $('#newContactForm');
    const contactsList = $('#contactsList');
    const contactTemplate = $('#contactTemplate').html();
    const formInputs = $('.form-input');

    const nameInput = $('#nameInput');
    const surnameInput = $('#surnameInput');
    const phoneInput = $('#phoneInput');

    contactForm.on('submit', '', onContactFormSubmit);
    contactsList.on('click', '#' + EDIT_BTN_ID, onContactsListClick);
    contactsList.on('click', '.' + DELETE_BTN_CLASS, onContactsListClick);

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

        if (e.target.id == EDIT_BTN_ID) {
            let row = $(e.target.closest(CONTACT_ROW_SELECTOR));
            let rowId = row.attr("id");
            changeContact(rowId);
        }

        if (e.target.classList.contains(DELETE_BTN_CLASS)) {
            let row = $(e.target.closest(CONTACT_ROW_SELECTOR));
            let rowId = row.attr("id");
            removeContact(rowId);
        }
    }

    function getContactIndexById(contactId) {
        var index = -1;
        for (var i = 0; i < contactMass.length; i++) {
            if (contactMass[i].id == contactId) {
                index = i;
                break;
            }
        }
        return index;
    }

    function getContact() {
        const contact = {};

        formInputs.each(function () {
            contact[$(this).attr("name")] = $(this).val();
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
        contactsList.append(newContactHtml);
    }

    function resetForm() {
        contactForm.reset();
    }

    function removeContact(rowId) {
        try {
            let deletedRow = $("#" + rowId);
            let contactIndex = getContactIndexById(rowId);

            if (deletedRow.length > 0 && contactIndex > -1) {
                let contact = contactMass[contactIndex];

                fetch(CONTACT_URL, {
                    method: "DELETE",
                    body: JSON.stringify(contact)
                });
                deletedRow.remove();
                contactMass.splice(contactIndex, 1);
            }
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

    function changeContact(rowId) {
        try {

            let editRow = $("#" + rowId);
            let contactIndex = getContactIndexById(rowId);

            if (editRow.length > 0 && contactIndex > -1) {

                let contact = contactMass[contactIndex];
                const question1 = prompt(`what name do you want to change? - ( ${contact.name} ): `);
                const question2 = prompt(`what surname do you want to change? - ( ${contact.surname} ): `);
                const question3 = prompt(`what phone number do you want to change? - ( ${contact.phone} ): `);

                const newContact = {
                    id: rowId,
                    name: !question1 ? contact.name : question1,
                    surname: !question2 ? contact.surname : question2,
                    phone: !question3 ? contact.phone : question3,
                };
                //contactMass.splice(contactIndex, 1, newContact);

                editRow.children().eq(0).text(newContact.name);
                editRow.children().eq(1).text(newContact.surname);
                editRow.children().eq(2).text(newContact.phone);

                fetch(CONTACT_URL, {
                    method: "POST",
                    body: JSON.stringify(newContact),
                });
            }
        } catch (error) {
            console.log(error);
        }
    }
});