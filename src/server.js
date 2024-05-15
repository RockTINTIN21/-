const express = require('express');
const path = require("path");
const app = express();
const port = 3000;
const studentController = require('./controllers/studentController');

app.use(express.json());
app.use('/static', express.static(__dirname + '../public'));



app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public','index.html'))
});
app.get('/style.css',(req,res)=>{
    res.sendFile(path.join(__dirname, '../public','style.css'));
});
app.get('/client.js',(req,res)=>{
    res.sendFile(path.join(__dirname, '../public','client.js'));
});

app.use(studentController);
app.listen(port, () => {
    console.log(`Сервер запущен на порту ${port}, сайт доступен по ссылке: http://localhost:${port}/`);
});