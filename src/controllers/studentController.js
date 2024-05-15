const express = require('express');
const Repository = require('../repository/Repository');
const app = express.Router();
const Repo = new Repository();
app.use(express.json());


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
        console.error("Ошибка:", error);
        res.status(400).send({
            status: 'error',
            message: error.message
        });
    }
})
module.exports = app;