const Student = require('../models/Student');
const Teacher = require('../models/Teacher');
class Repository{
    constructor(){
        this.repository = [];
    }
    filterStudentsByGroup(group) {
        const filtered = this.repository.filter(student => student.group.toLowerCase() === group.toLowerCase());
        console.log(group)
        if (filtered.length === 0) {
            console.log('Ошибка: ', filtered)
            const error = new Error("Такой группы не существует");
            error.name = "group";
            throw error;

        } else {
            console.log('Успешно: ', filtered)
            return filtered;
        }
    }
    addStudent(name, lastName, age, group) {
        const student = new Student(name, lastName, age, group);
        this.repository.push(student);
    }

    deleteStudent(id) {
        const indexStudent = this.repository.findIndex(student => student.id === id);
        if (indexStudent !== -1) {
            this.repository.splice(indexStudent, 1);
        } else {
            const error = new Error("Такого студента не существует");
            error.name = "id";
            throw error;
        }
    }
    updateStudent(id, name, lastName, age, group) {
        const indexStudent = this.repository.findIndex(student => student.id === id);
        if (indexStudent === -1) {
            const error = new Error("Такого студента не существует");
            error.name = "id";
            throw error;
        } else {
            const currentStudent = this.repository[indexStudent];
            currentStudent.name = name;
            currentStudent.lastName = lastName;
            currentStudent.age = age;
            currentStudent.group = group;
        }
    }
}
module.exports = Repository