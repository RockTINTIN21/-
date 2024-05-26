const express = require('express');
const Repository = require('../repository/Repository');
const app = express.Router();
const Repo = new Repository();
app.use(express.json());

function addToRepo() {
    const students = [
        { name: "Иван", lastName: "Иванов", age: 20, group: "ПСО204" },
        { name: "Сергей", lastName: "Сергеев", age: 21, group: "ИСИП208" }
    ];
    students.forEach(student => {
        Repo.addStudent(student.name, student.lastName, student.age, student.group);
    });
    console.log(Repo.filterStudentsByGroup("ИСИП208"))
}

app.get('/getStudentsByGroup', (req, res) => {
    try {
        const group = decodeURIComponent(req.query.group);
        decodeURIComponent(group)
        const repository = Repo.filterStudentsByGroup(group);
        console.log('GET запрос: ',repository)
        res.status(201).send({
            status: 'success',
            repository: repository
        });

    } catch (error) {
        console.log('GET запрос: ',error)
        res.status(200).send({
            status: 'error',
            errors: {
                field: error.name,
                message: error.message
            }
        });
    }
});
app.post('/addStudent', (req, res) => {
    try {
        const { name, lastName, age, group } = req.body;
        const student = Repo.addStudent(name, lastName, age, group);
        res.status(201).send({
            status: 'success',
            student: student
        });
    } catch (error) {
        res.status(200).send({
            status: 'error',
            errors: {
                field: error.name,
                message: error.message
            }
        });
    }
});
app.delete('/delStudent',(req,res)=>{
    try {
        const {id} = req.body;
        const student = Repo.deleteStudent(id);
        res.status(201).send({
            status: 'success',
            student: student
        });
    }catch (error){
        res.status(200).send({
            status: 'error',
            errors: {
                field: error.name,
                message: error.message
            }
        });
    }
})
app.patch('/updateStudent',(req,res)=>{
    try {
        const {id, name, lastName, age, group} = req.body;
        const student = Repo.updateStudent(id, name, lastName, age, group);
        res.status(201).send({
            status: 'success',
            student: student
        });
    }catch (error){
        res.status(200).send({
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