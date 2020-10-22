import { Course } from './course.js';
import { dataCourses } from './dataCourses.js';
import { Student } from './student.js';
import { dataStudent } from './dataStudent.js';

let coursesTbody: HTMLElement = document.getElementById('courses')!;
let studentTbody: HTMLElement = document.getElementById('student')!;
const btnfilterByName: HTMLElement = document.getElementById("button-filterByName")!;
const inputSearchBox: HTMLInputElement = <HTMLInputElement>document.getElementById("search-box")!;
const btnfilterByCredits: HTMLElement = document.getElementById("button-filterByCredits")!;
const RangoInferior: HTMLInputElement = <HTMLInputElement>document.getElementById("rangoInferior")!;
const RangoSuperior: HTMLInputElement = <HTMLInputElement>document.getElementById("rangoSuperior")!;
const totalCreditElm: HTMLElement = document.getElementById("total-credits")!;
const atributos = ["Code", "Cédula", "age", "address", "Telephone"];

btnfilterByName.onclick = () => applyFilterByName();
btnfilterByCredits.onclick = () => applyRangeByCredits();

renderCoursesInTable(dataCourses);
renderStudentInTable(dataStudent);

totalCreditElm.innerHTML = `${getTotalCredits(dataCourses)}`


function renderCoursesInTable(courses: Course[]): void {
  console.log('Desplegando cursos');
  courses.forEach((course) => {
    let trElement = document.createElement("tr");
    trElement.innerHTML = `<td>${course.name}</td>
                           <td>${course.professor}</td>
                           <td>${course.credits}</td>`;
    coursesTbody.appendChild(trElement);
  });
}


function renderStudentInTable(students: Student[]): void {
  console.log('Mostrando estudiante');
  students.forEach((student) => {
    let trElement = document.createElement("tr");
    trElement.innerHTML = `<td>${student.code}</td>
                           <td>${student.cedula}</td>
                           <td>${student.age}</td>
                           <td>${student.address}</td>
                           <td>${student.telephone}</td>`;
    studentTbody.appendChild(trElement);
  });
}

function applyFilterByName() {
  let text = inputSearchBox.value;
  text = (text == null) ? '' : text;
  clearCoursesInTable();
  let coursesFiltered: Course[] = searchCourseByName(text, dataCourses);
  renderCoursesInTable(coursesFiltered);
}

function applyRangeByCredits() {
  let inferior = RangoInferior.value;
  let superior = RangoSuperior.value;
    let inferiorNuevo = +inferior;
    let superiorNuevo = +superior;
    if (inferiorNuevo < 0 ) {
      return 'no el numero inferior debe ser mayor a 0';
    }
    else if(superiorNuevo <0){
      return 'no el numero superior debe ser mayor a 0';
    }
    else if(superiorNuevo >20){
      return 'no el numero superior debe ser mayor a 20';
    }
}

function searchCourseByName(nameKey: string, courses: Course[]) {
  return nameKey === '' ? dataCourses : courses.filter(c =>
    c.name.match(nameKey));
}

function getTotalCredits(courses: Course[]): number {
  let totalCredits: number = 0;
  courses.forEach((course) => totalCredits = totalCredits + course.credits);
  return totalCredits;
}

function clearCoursesInTable() {
  while (coursesTbody.hasChildNodes()) {
    if (coursesTbody.firstChild != null) {
      coursesTbody.removeChild(coursesTbody.firstChild);
    }
  }
}