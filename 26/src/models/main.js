export const main = () => {
  document.addEventListener("DOMContentLoaded", render);

  async function render() {

    // отправляем get запрос
    let response = await fetch('https://5dd3d5ba8b5e080014dc4bfa.mockapi.io/students', {
      method: 'GET'
    });

    let students = await response.json();

    const tableStudents = document.getElementById('table-students');

    let tableStudentsContent = `<tr>
                                    <th>Имя студента</th>
                                    <th>Д31</th>
                                    <th>Д32</th>
                                    <th>Д33</th>
                                    <th>Д34</th>
                                    <th>ДЗ5</th>
                                    <th>Д36</th>
                                    <th>Д37</th>
                                    <th>Д38</th>
                                    <th>Д39</th>
                                    <th>Д310</th>
                                    <th>
                                      <img src="./img/settings.png" alt="настройка" width="18px">
                                    </th>
                                  </tr>`;



    students.forEach(function (student, index, array) {

      let id = student.id;
      let name = student.name;
      let marks = student.marks;

      tableStudentsContent += `<tr><td class="name-student">${name}</td>`;


      marks.forEach(function (mark, index, array) {
        console.log('mark' + index, mark);
        tableStudentsContent += `<td><input type="text" class="mark-input" value="${mark}" onblur="updateStudent(event, ${id})"></td>`;

      });

      tableStudentsContent += `<td>
                              <a href="#" onclick="deleteStudents(event, ${id})">
                                <img src="./img/delete-white.png" alt="">
                              </a>
                            </td>
                          </tr>
                      `;


    });

    tableStudents.innerHTML = tableStudentsContent;
  }
  window.render = render;

  async function deleteStudents(event, id) {
    event.preventDefault();

    // отправляем delete запрос
    let response = await fetch(`https://5dd3d5ba8b5e080014dc4bfa.mockapi.io/students/${id}`, {
      method: 'DELETE'
    });

    render();


  }
  window.deleteStudents = deleteStudents;


  async function updateStudent(event, id) {

    let input = event.target;
    let tr = input.closest("tr");
    let allInputs = tr.querySelectorAll('input');
    let marksArray = [];
    Array.prototype.forEach.call(allInputs, function (input) {
      marksArray.push(input.value);
    });

    let marks = {
      "marks": marksArray
    };

    // отправляем put запрос
    let response = await fetch(`https://5dd3d5ba8b5e080014dc4bfa.mockapi.io/students/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify(marks)
    });

    render();

  }


  let insertStudent = document.getElementById('insert-student');
  let insertStudentBtn = document.getElementById('insert-student-button');

  insertStudentBtn.addEventListener('click', addStudent);

  async function addStudent() {
    let valueInput = insertStudent.value;

    if (valueInput == '') {
      alert('поле Имя не может содержать пустую строку');
    }

    let name = {
      "name": valueInput
    };

    // отправляем post запрос
    let response = await fetch(`https://5dd3d5ba8b5e080014dc4bfa.mockapi.io/students/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify(name)
    });
    insertStudent.value = '';

    render();
  }
};