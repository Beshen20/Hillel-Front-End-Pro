const students = [{
    id: 10,
    name: 'John Smith',
    marks: [10, 8, 6, 9, 8, 7]
  },
  {
    id: 11,
    name: 'John Doe',
    marks: [9, 8, 7, 6, 7]
  },
  {
    id: 12,
    name: 'Thomas Anderson',
    marks: [6, 7, 10, 8]
  },
  {
    id: 13,
    name: 'Jean-Baptiste Emanuel Zorg',
    marks: [10, 9, 8, 9]
  }
];

function averageStudentMark(studentId) {
  const student = students.find(({
    id
  }) => id === studentId);
  if (student) {
    const {
      marks
    } = student;
    return marks.reduce((acc, mark) => acc + mark, 0) / marks.length;
  }
}

function averageGroupMark() {
  const marks = students.map(({
    marks
  }) => marks).flat();
  return marks.reduce((acc, mark) => acc + mark, 0) / marks.length;
}
console.log(averageStudentMark(13));
console.log(Math.round(averageGroupMark()));