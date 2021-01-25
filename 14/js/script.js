"use strict";
class Group {
  constructor() {
    this._students = [];
  }
  get students() {
    return this._students;
  }
  addStudent(student) {
    this._students.push(student);
  }
  getAverageMark() {
    let sum = 0;
    let count = 0;
    this._students.map(student => {
      let studentMarkSum = 0;
      let studentMarkCount = 0;
      student.marks.map(mark => {
        studentMarkSum += mark;
        studentMarkCount += 1;
      });
      const studentAverage = studentMarkSum / studentMarkCount;
      console.log(student.name + ' ' + studentAverage);
      sum += studentAverage;
      count += 1;
    });
    return sum / count;
  }
}
class Student {
  constructor(name, marks) {
    this.name = '';
    this.marks = [];
    this.name = name;
    this.marks = marks;
  }
}
const feGroup = new Group();
feGroup.addStudent(new Student('John Doe', [10, 10, 5, 10]));
feGroup.addStudent(new Student('Alex Smith', [10, 9, 8]));
feGroup.addStudent(new Student('Bob Johnson', [9, 10, 10, 8]));
console.log(feGroup.getAverageMark());
console.log(feGroup.students);
