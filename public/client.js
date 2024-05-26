
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
    clearText()
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
document.querySelectorAll('.modal').forEach(modal => {
    modal.addEventListener('hidden.bs.modal', function (e) {
        const modals = document.querySelectorAll('.modal');
        modals.forEach(modal =>{
            const forms = modal.querySelectorAll('form');
            forms.forEach(form=>form.reset());
            const feedbackElements = modal.querySelectorAll('.invalid-feedback');
            feedbackElements.forEach(elem => elem.innerHTML = '');
            const formControls = modal.querySelectorAll('.form-control');
            formControls.forEach(elem => elem.classList.remove('is-invalid'));
        })
    });
});

document.getElementById("getStudentsByGroup").addEventListener('click',()=>{
    const formStudentData = document.getElementById('formGetStudentByGroup');
    formStudentData.submitEventAttached = formStudentData.submitEventAttached || false;

    if (!formStudentData.submitEventAttached) {
        formStudentData.addEventListener('submit', (e) => {
            e.preventDefault();
            const formData = new FormData(formStudentData);
            const studentData = formData.get('group');
            toString()
            fetch(`getStudentsByGroup?group=${encodeURIComponent(studentData)}`, {
                method: "GET",
                headers: {
                    'Content-type': 'application/json'
                }
            })
                .then(response => response.json())
                .then(data => {
                    if (data.status === 'error') {
                        errorText()
                        document.querySelectorAll('#formGetStudentByGroup input').forEach(input => {
                            if (input.classList.contains('is-invalid')) {
                                input.classList.remove('is-invalid');
                            }
                        });
                        document.querySelectorAll('#formGetStudentByGroup  .invalid-feedback').forEach(feedback => {
                            if (/[а-я]/i.test(feedback.innerText)) {
                                feedback.innerText = '';
                            }
                        });
                        const validationForm = {
                            group: 'validationFormGetStudentGroup'
                        };
                        const currentId = validationForm[data.errors.field];
                        const inputElement = document.getElementById(data.errors.field);
                        document.getElementById(currentId).style.display = 'block';
                        document.getElementById(currentId).innerText = data.errors.message;
                        if (inputElement) {
                            inputElement.classList.add('is-invalid');
                        }
                    } else {
                        const modalInstance = bootstrap.Modal.getInstance(document.getElementById('getStudentByGroupModal'));
                        modalInstance.hide();
                        data.repository.forEach(student =>{
                            studentsBlock.appendChild(document.createElement('p')).innerHTML = `
                            ID: ${student.id} <br>
                            Имя: ${student._name}<br>
                            Отчество: ${student._lastName}<br>
                            Возраст: ${student._age} лет<br>
                            Группа: ${student._group}<br>`;
                        })
                    }
                })
                .catch(error=>{
                    console.log(error)
                })
        });
        formStudentData.submitEventAttached = true;
    }
})
document.getElementById("updateStudent").addEventListener('click', (e) => {
    const formStudentData = document.getElementById('formUpdateStudent');
    formStudentData.submitEventAttached = formStudentData.submitEventAttached || false;

    if (!formStudentData.submitEventAttached) {
        formStudentData.addEventListener('submit', (e) => {
            e.preventDefault();
            const formData = new FormData(formStudentData);
            const studentData = {
                id: formData.get('id'),
                name: formData.get('name'),
                lastName: formData.get('lastName'),
                age: formData.get('age'),
                group: formData.get('group')
            };
            fetch('updateStudent', {
                method: "PATCH",
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(studentData)
            })
                .then(response => response.json())
                .then(data => {
                    if (data.status === 'error') {
                        document.querySelectorAll('#formUpdateStudent input').forEach(input => {
                            if (input.classList.contains('is-invalid')) {
                                input.classList.remove('is-invalid');
                            }
                        });
                        document.querySelectorAll('#formUpdateStudent .invalid-feedback').forEach(feedback => {
                            if (/[а-я]/i.test(feedback.innerText)) {
                                feedback.innerText = '';
                            }
                        });
                        const validationForm = {
                            id: 'validationFormUpdateStudentId',
                            name: 'validationFormUpdateStudentName',
                            lastName: 'validationFormUpdateStudentLastName',
                            age: 'validationFormUpdateStudentAge',
                            group: 'validationFormUpdateStudentGroup'
                        };
                        const currentId = validationForm[data.errors.field];
                        const inputElement = document.getElementById(data.errors.field);
                        document.getElementById(currentId).style.display = 'block';
                        document.getElementById(currentId).innerText = data.errors.message;
                        if (inputElement) {
                            inputElement.classList.add('is-invalid');
                        }
                    } else {
                        let successModal = new bootstrap.Modal(document.getElementById('success'));
                        let p = document.createElement('p');
                        document.querySelector('.studentName').innerHTML = '';
                        document.querySelector('.studentName').textContent = `Студент, ${studentData.name} был обновлен!`;
                        const modalInstance = bootstrap.Modal.getInstance(document.getElementById('updateStudentModal'));
                        modalInstance.hide();
                        let modalBody = document.querySelector('#success .modal-body');
                        modalBody.appendChild(p);
                        successModal.show();
                    }
                })
                .catch(error=>{
                    console.log(error)
                })
        });
        formStudentData.submitEventAttached = true;
    }
});
document.getElementById("delStudent").addEventListener('click', (e) => {
    const formStudentData = document.getElementById('formRemoveStudent');
    formStudentData.submitEventAttached = formStudentData.submitEventAttached || false;

    if (!formStudentData.submitEventAttached) {
        formStudentData.addEventListener('submit', (e) => {
            e.preventDefault();
            const formData = new FormData(formStudentData);
            const studentData = {
                id: formData.get('id')
            };
            fetch('delStudent', {
                method: "DELETE",
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(studentData)
            })
                .then(response => response.json())
                .then(data => {
                    if (data.status === 'error') {
                        document.querySelectorAll('#formRemoveStudent input').forEach(input => {
                            if (input.classList.contains('is-invalid')) {
                                input.classList.remove('is-invalid');
                            }
                        });
                        document.querySelectorAll('#formRemoveStudent .invalid-feedback').forEach(feedback => {
                            if (/[а-я]/i.test(feedback.innerText)) {
                                feedback.innerText = '';
                            }
                        });
                        const validationForm = {
                            id: 'validationFormStudentID'
                        };
                        const currentId = validationForm[data.errors.field];
                        const inputElement = document.getElementById(data.errors.field);
                        document.getElementById(currentId).style.display = 'block';
                        document.getElementById(currentId).innerText = data.errors.message;
                        if (inputElement) {
                            inputElement.classList.add('is-invalid');
                        }
                    } else {
                        let successModal = new bootstrap.Modal(document.getElementById('success'));
                        let p = document.createElement('p');
                        document.querySelector('.studentName').innerHTML = '';
                        document.querySelector('.studentName').textContent = `Студент, ${studentData.id} был удален!`;
                        const modalInstance = bootstrap.Modal.getInstance(document.getElementById('removeStudentModal'));
                        modalInstance.hide();
                        let modalBody = document.querySelector('#success .modal-body');
                        modalBody.appendChild(p);
                        successModal.show();
                    }
                })
                .catch(error=>{
                    console.log(error)
                })
        });
        formStudentData.submitEventAttached = true;
    }
});
document.getElementById("addStudent").addEventListener('click', (e) => {
    const formStudentData = document.getElementById('formAddStudent');
    formStudentData.submitEventAttached = formStudentData.submitEventAttached || false;

    if (!formStudentData.submitEventAttached) {
        formStudentData.addEventListener('submit', (e) => {
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
                    if (data.status === 'error') {
                        document.querySelectorAll('#formAddStudent input').forEach(input => {
                            if (input.classList.contains('is-invalid')) {
                                input.classList.remove('is-invalid');
                            }
                        });
                        document.querySelectorAll('#formAddStudent .invalid-feedback').forEach(feedback => {
                            if (/[а-я]/i.test(feedback.innerText)) {
                                feedback.innerText = '';
                            }
                        });
                        const validationForm = {
                            name: 'validationFormStudentName',
                            lastName: 'validationFormStudentLastName',
                            age: 'validationFormStudentAge',
                            group: 'validationFormStudentGroup'
                        };
                        const currentId = validationForm[data.errors.field];
                        const inputElement = document.getElementById(data.errors.field);
                        document.getElementById(currentId).style.display = 'block';
                        document.getElementById(currentId).innerText = data.errors.message;
                        if (inputElement) {
                            inputElement.classList.add('is-invalid');
                        }
                    } else {
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
        });
        formStudentData.submitEventAttached = true;
    }
});