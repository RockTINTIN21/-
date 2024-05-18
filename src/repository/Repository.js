const Student = require('../../../task17/backend/models/Student');
const Teacher = require('../../../task17/backend/models/Teacher');
class Repository{
    constructor(){
        this.repository = [

        ];
    }
    filterStudentsByGroup(group) {

        const filtered = this.repository.filter(student => student.group.toLowerCase() === group.toLowerCase());
        if (filtered.length === 0) {
            console.log(this.repository)
            return { repository: [] };
        } else {
            console.log(this.repository)
            return filtered;
        }
    }
    addStudent(name, lastName, age, group) {
        const student = new Student(name, lastName, age, group);
        this.repository.push(student);
        console.log(this.repository)
    }

    // addTeacher(name, lastName, age, object,cabinet) {
    //     const teacher = new Teacher(name, lastName, age, object,cabinet);
    //     this.repository.push(teacher);
    // }
    // getStudent() {
    //     if(this.students.length === 0){
    //         return {students: []};
    //     }else{
    //         return { students: this.students };
    //     }
    //
    // }
    // getTeacher() {
    //     let output = "";
    //     if(this.repository.length === 0){
    //         return {error: "Список студентов сейчас пуст!"};
    //     }else{
    //         return {students: this.repository}
    //     }
    // }
    // deleteStudent(id) {
    //     const indexStudent = this.repository.findIndex(student => student.id === id);
    //     if (indexStudent !== -1) {
    //         this.repository.splice(indexStudent, 1);
    //         return { message: `Студент с ID ${id} существует и только что был удален` };
    //     } else {
    //         return { message: `Студент с ID ${id} не существует` };
    //     }
    // }
    // updateStudent(id, name, lastName, age, group) {
    //     const indexStudent = this.repository.findIndex(student => student.id === id);
    //     if (indexStudent === -1) {
    //         return "Нет студентов с таким id: " + id;
    //     } else {
    //         this.repository[indexStudent] = { id, name, lastName, age, group };
    //         return "Студент с id: " + id + " обновлен";
    //     }
    // }
    // filterStudentsByGroup(group) {
    //     console.log(this.repository.name)
    //     const filtered = this.repository.filter(function (student){
    //         return student.group === group;
    //     });
    //     if(filtered.length === 0){
    //         console.log(filtered)
    //         return {repository: []};
    //
    //     }else{
    //         console.log(filtered)
    //         return { repository: filtered };
    //     }
    // }
}
const Repo = new Repository();

// Repo.addStudent('фыв','фыв',20,'псо204');
// console.log(Repo.repository)
// console.log(Repo.filterStudentsByGroup('asd'))
module.exports = Repository