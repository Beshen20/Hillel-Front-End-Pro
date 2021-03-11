document.addEventListener("DOMContentLoaded", render);

async function render() {
  const response = await fetch('https://5dd3d5ba8b5e080014dc4bfa.mockapi.io/students', {
    method: 'GET'
  });
  const students = await response.json();
  const tableStudents = document.getElementById('table-students');
  let tableStudentsContent = `<tr>
                                    <th>Имя студента</th>
                                    <th>Д3 1</th>
                                    <th>Д3 2</th>
                                    <th>Д3 3</th>
                                    <th>Д3 4</th>
                                    <th>ДЗ 5</th>
                                    <th>Д3 6</th>
                                    <th>Д3 7</th>
                                    <th>Д3 8</th>
                                    <th>Д3 9</th>
                                    <th>Д3 10</th>
                                    <th>Настройка</th>
                              </tr>`;
  students.forEach(function (student, index, array) {

    const id = student.id;
    const name = student.name;
    const marks = student.marks;

    tableStudentsContent += `<tr><td class="name-student">${name}</td>`;


    marks.forEach(function (mark, index, array) {
      console.log('mark' + index, mark);
      tableStudentsContent += `<td><input type="text" class="mark-input" value="${mark}" onblur="updateStudent(event, ${id})"></td>`;

    });

    tableStudentsContent += `<td>
                              
                                <span onclick="deleteStudents(event, ${id})">X</span>
                        
                            </td>
                          </tr>
                      `;


  });

  tableStudents.innerHTML = tableStudentsContent;
}

async function deleteStudents(event, id) {
  event.preventDefault();

  const response = await fetch(`https://5dd3d5ba8b5e080014dc4bfa.mockapi.io/students/${id}`, {
    method: 'DELETE'
  });

  render();


}


async function updateStudent(event, id) {

  const input = event.target;
  const tr = input.closest("tr");
  const allInputs = tr.querySelectorAll('input');
  const marksArray = [];
  Array.prototype.forEach.call(allInputs, function (input) {
    marksArray.push(input.value);
  });

  const marks = {
    "marks": marksArray
  };

  const response = await fetch(`https://5dd3d5ba8b5e080014dc4bfa.mockapi.io/students/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify(marks)
  });

  render();

}


const insertStudent = document.getElementById('insert-student');
const insertStudentBtn = document.getElementById('insert-student-button');

insertStudentBtn.addEventListener('click', addStudent);

async function addStudent() {
  const valueInput = insertStudent.value;

  if (valueInput == '') {
    alert('поле Имя не может содержать пустую строку');
  }

  const name = {
    "name": valueInput
  };

  const response = await fetch(`https://5dd3d5ba8b5e080014dc4bfa.mockapi.io/students/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify(name)
  });
  insertStudent.value = '';

  render();
}