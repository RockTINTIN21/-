//
// document.getElementById("getStudent").addEventListener('click',function(){
//     fetch('/students')
//         .then(response => response.json())
//         .then(data => {
//             if (data.error) {
//                 document.getElementById("text").innerHTML = data.error;
//             } else {
//                 console.log(data)
//                 let output = "";
//                 data.students.forEach(student => {
//                     output += `<p>ID: ${student.id}, Имя: ${student._name}, Отчество: ${student._lastName}, возраст: ${student._age} лет, группа: ${student._group}</p><br>`;
//                 });
//                 document.getElementById("text").innerHTML = output;
//             }
//         })
//         .catch(err => {
//             console.error('Ошибка при получении данных:', err);
//             document.getElementById("text").innerHTML = "Произошла ошибка при загрузке данных";
//         });
// });
// document.getElementById("addStudent").addEventListener('click', function(){
//     const name = prompt("Введите имя студента:");
//     const lastName = prompt("Введите фамилию студента:");
//     const age = prompt("Введите возраст студента:");
//     const group = prompt("Введите группу студента:");
//
//     const studentData = {
//         name: name,
//         lastName: lastName,
//         age: parseInt(age, 10),
//         group: group
//     };
//
//     if (!name || !lastName || !age || !group) {
//         alert("Все поля должны быть заполнены!");
//         return;
//     }
//
//     fetch('/students/add', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(studentData)
//     })
//         .then(data => {
//             if(data.error) {
//                 alert(data.error);
//             } else {
//                 alert(`Студент, ${name}, успешно добавлен!`);
//             }
//         })
//         .catch(error => {
//             alert('Произошла ошибка при добавлении студента: ' + error.message);
//         });
// });
// document.getElementById("delStudent").addEventListener('click', function(){
//     const id = +prompt("Введите id студента:");
//     const studentData = {
//         id: id
//     };
//     fetch('/students/delete',{
//         method: 'DELETE',
//         headers: {
//             'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(studentData)
//     })
//         .then(data => {
//             alert("Студент успешно удален!");
//         })
//         .catch(error => { // Обработка ошибок, в том числе сетевых
//             alert('Произошла ошибка при удалении студента: ' + error.message);
//             console.log(error.message)
//         });
// })
// document.getElementById("updateStudent").addEventListener('click', function() {
//     const id = parseInt(prompt("Введите ID студента:"));
//     const name = prompt("Введите имя студента:");
//     const lastName = prompt("Введите фамилию студента:");
//     const age = parseInt(prompt("Введите возраст студента:"));
//     const group = prompt("Введите группу студента:");
//
//     const studentData = {
//         id,
//         name,
//         lastName,
//         age,
//         group
//     };
//
//     fetch('/updateStudent', {
//         method: 'PUT',
//         headers: {
//             'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(studentData)
//     })
//         .then(response => response.json())
//         .then(data => {
//             alert(data.message); // Показываем сообщение от сервера
//             console.log("Ответ сервера:", data.message);
//         })
//         .catch(error => {
//             alert('Произошла ошибка при обновлении студента: ' + error.message);
//             console.log('Ошибка:', error.message);
//         });
// });
const studentsBlock = document.querySelector('.students')
const clearText = () =>{
    if(document.querySelector('.error')){
        document.querySelector('.error').remove();
    }
    if(document.querySelector('.list>p')){
        document.querySelector('.list>p').remove()
    }
    if(document.querySelector('.nothing')){
        document.querySelector('.nothing').remove();
    }
}
const errorText = () =>{
    studentsBlock.innerHTML =
        `
            <div class="error text-center align-content-center">
                <div class="error_wrapper p-5">
                    <img src="img/404.png" alt="Ничего не найдено">
                    <p>Похоже ничего не найдено</p>
                </div>
            </div>
        `;
}

// function addStudentModal(){
//
// }

document.getElementById("getStudentsByGroup").addEventListener('click',()=>{
    const group = prompt('Введите группу: ');
    clearText()
    if(group.length > 0){
        fetch('/getStudentsByGroup', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ group })
        })
            .then(response => {
                if (!response.ok) {
                    return response.json().then(error => {
                        throw new Error(error.error);
                    });
                }
                return response.json();
            })
            .then(data => {
                if (data.repository && data.repository.length > 0) {
                    data.repository.forEach(student =>{
                        studentsBlock.appendChild(document.createElement('p')).innerHTML = `
                        ID: ${student.id} <br> 
                        Имя: ${student._name}<br> 
                        Отчество: ${student._lastName}<br> 
                        Возраст: ${student._age} лет<br>
                        Группа: ${student._group}<br>`;
                    })
                } else {
                    errorText();
                }
            })
            .catch(error => {
                console.error('Ошибка:', error.message);
                studentsBlock.innerHTML = 'Произошла ошибка при обработке запроса. Пожалуйста, проверьте введенные данные и повторите попытку. Текст ошибки:' + error.message;
            });
    }else{
        alert('Запрос не может быть пустым')
    }

})

document.getElementById("addStudent").addEventListener('click',(e)=>{

    const formStudentData = document.getElementById('formAddStudent');
    formStudentData.addEventListener('submit',(e)=> {
        e.preventDefault();
        const formData = new FormData(formStudentData);
        const studentData = {
            name: formData.get('name'),
            lastName: formData.get('lastName'),
            age: formData.get('age'),
            group: formData.get('group')
        };
        fetch('addStudent', {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(studentData)
        })
            .then(response => response.json())
            .then(data => {
                if (data.status === 'error'){
                    document.querySelectorAll('#formAddStudent input').forEach(input =>{
                        if (input.classList.contains('is-invalid')) {
                            input.classList.remove('is-invalid');
                        }
                    })
                    document.querySelectorAll('#formAddStudent .invalid-feedback').forEach(feedback=>{
                        if (/[а-я]/i.test(feedback.innerText)) {
                            feedback.innerText = '';
                        }
                    });
                    const validationForm = {
                        name: 'validationFormStudentName',
                        lastName: 'validationFormStudentLastName',
                        age: 'validationFormStudentAge',
                        group:'validationFormStudentGroup'
                    }
                    document.getElementById('formAddStudent')
                    const currentId = validationForm[data.errors.field];
                    const inputElement = document.getElementById(data.errors.field);
                    document.getElementById(currentId).style.display = 'block'
                    document.getElementById(currentId).innerText = data.errors.message;
                    if (inputElement) {
                        inputElement.classList.add('is-invalid');
                    }
                }else{
                    let successModal = new bootstrap.Modal(document.getElementById('success'));

                    let p = document.createElement('p');
                    document.querySelector('.studentName').innerHTML = '';
                    document.querySelector('.studentName').textContent = `Студент, ${studentData.name} был добавлен!`;
                    const modalInstance = bootstrap.Modal.getInstance(document.getElementById('addStudentModal'));
                    modalInstance.hide();
                    let modalBody = document.querySelector('#success .modal-body');
                    modalBody.appendChild(p);
                    successModal.show();
                }
            })
            .catch(error => {
                console.error('Ошибка:', error.message);
            });

    })

})
// document.getElementById("addStudent").addEventListener('click',()=>{
//
//     const name = prompt("Введите имя студента:"),
//     lastName = prompt("Введите фамилию студента:"),
//     age = prompt("Введите возраст студента:"),
//     group = prompt("Введите группу студента:"),
//     studentData = {
//         name,
//         lastName,
//         age,
//         group
//     };
//     fetch('addStudent',{
//         method:"POST",
//         headers:{
//             'Content-type':'application/json'
//         },
//         body: JSON.stringify(studentData)
//     })
//         .then(response => {
//             return response.json()
//                 .then(data => {
//                 if (!response.ok) {
//                     throw new Error(data.message || 'Что-то пошло не так');
//                 }
//                 return data;
//             });
//         })
//         .then(data => {
//             alert(`Студент ${data}, добавлен`)
//         })
//         .catch(error => {
//             console.error('Ошибка:', error.message);
//             alert('Произошла ошибка: ' + error.message);
//         });
// })