const express = require('express');
const cors = require('cors');
const studentController = require('./controllers/studentController');
const path = require("path");
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));
app.use(cors());

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public','index.html'))
});
app.get('/style.css',(req,res)=>{
    res.sendFile(path.join(__dirname, '../public','style.css'));
});
app.get('/client.js',(req,res)=>{
    res.sendFile(path.join(__dirname, '../public','client.js'));
});
app.use(studentController.app)
studentController.addToRepo()

app.listen(port, () => {
    console.log(`Сервер запущен на порту ${port}, сайт доступен по ссылке: http://localhost:${port}/`);
});