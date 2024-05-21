const express = require('express');
const Repository = require('../repository/Repository');
const app = express.Router();
const Repo = new Repository();
app.use(express.json());

function addToRepo() {
    const students = [
        { name: "Иван", lastName: "Иванов", age: 20, group: "ПСО204" },
        { name: "Сергей", lastName: "Сергеев", age: 21, group: "ИСИП208" },
        { name: "Мария", lastName: "Мариева", age: 22, group: "ИСИП206" },
        { name: "Илья", lastName: "Мариев", age: 19, group: "ИСИП203" },
        { name: "Ильфывя", lastName: "Марийцуев", age: 19, group: "ИСИП203" },
        { name: "Илйцуья", lastName: "Маыфвриев", age: 19, group: "ИСИП203" }
    ];

    students.forEach(student => {
        Repo.addStudent(student.name, student.lastName, student.age, student.group);
    });
}

app.post('/getStudentsByGroup', (req, res) => {
    try {
        const { group } = req.body;
        const repository = Repo.filterStudentsByGroup(group); // Получаем массив студентов
        res.status(201).send({
            status: 'success',
            repository: repository // Возвращаем массив студентов напрямую
        });
    } catch (error) {
        res.status(400).send({
            status: 'error',
            message: error.message
        });
    }
});
app.post('/addStudent',(req,res)=>{
    try {
        const { name, lastName, age, group } = req.body;
        const student = Repo.addStudent(name, lastName, age, group);
        res.status(201).send({
            status: 'success',
            student: student
        });
    }catch (error){
        res.status(400).send({
            status: 'error',
            errors: {
                field: error.name,
                message: error.message
            }
        });
    }
})
module.exports = {
    app,
    addToRepo
};