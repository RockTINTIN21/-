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
const requests = async (formID, url, method, extractData, validationForm, successTextModal, modalID, ...studentType) => {
    const formStudentData = document.getElementById(formID);
    formStudentData.submitEventAttached = formStudentData.submitEventAttached || false;

    if (!formStudentData.submitEventAttached) {
        formStudentData.addEventListener('submit', (e) => {
            e.preventDefault();
            const formData = new FormData(formStudentData);
            const studentData = extractData(formData);
            const fetchKeys = {
                method,
                headers: { 'Content-Type': 'application/json' }
            };

            let finalUrl = url;

            if (method !== 'GET') {
                fetchKeys.body = JSON.stringify(studentData);
            } else {
                const params = new URLSearchParams();
                studentType.forEach(type => {
                    const value = studentData[type] || formData.get(type);
                    if (value) {
                        params.append(type, value);
                    }
                });
                finalUrl = `${url}?${params.toString()}`;
            }

            fetch(finalUrl, fetchKeys)
                .then(response => response.json())
                .then(data => {
                    if (data.status === 'error') {
                        document.querySelectorAll(`#${formID} input`).forEach(input => {
                            if (input.classList.contains('is-invalid')) {
                                input.classList.remove('is-invalid');
                            }
                        });
                        document.querySelectorAll(`#${formID} .invalid-feedback`).forEach(feedback => {
                            if (/[а-я]/i.test(feedback.innerText)) {
                                feedback.innerText = '';
                            }
                        });
                        const currentId = validationForm[data.errors.field];
                        const inputElement = document.getElementById(data.errors.field);
                        document.getElementById(currentId).style.display = 'block';
                        document.getElementById(currentId).innerText = data.errors.message;
                        if (inputElement) {
                            inputElement.classList.add('is-invalid');
                        }
                        if (method === 'GET'){
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
                    } else {
                        clearText()
                        const modalInstance = bootstrap.Modal.getInstance(document.getElementById(`${modalID}`));
                        modalInstance.hide();
                        if (method !== 'GET'){
                            let successModal = new bootstrap.Modal(document.getElementById('success'));
                            let p = document.createElement('p');
                            document.querySelector('.studentName').innerHTML = '';
                            document.querySelector('.studentName').textContent = successTextModal;

                            let modalBody = document.querySelector('#success .modal-body');
                            modalBody.appendChild(p);
                            successModal.show();
                        }else{

                            data.repository.forEach(student =>{
                                studentsBlock.appendChild(document.createElement('p')).innerHTML = `
                            ID: ${student.id} <br>
                            Имя: ${student._name}<br>
                            Отчество: ${student._lastName}<br>
                            Возраст: ${student._age} лет<br>
                            Группа: ${student._group}<br>`;
                            })
                        }

                    }
                })
                .catch(error=>{
                    console.log(error)
                })
        });
        formStudentData.submitEventAttached = true;
    }
}
//Create
const extractAddStudentData = (formData) => ({
    name: formData.get('name'),
    lastName: formData.get('lastName'),
    age: formData.get('age'),
    group: formData.get('group')
});
requests(
    'formAddStudent',
    'addStudent',
    'POST',
    extractAddStudentData,
    {
        name: 'validationFormStudentName',
        lastName: 'validationFormStudentLastName',
        age: 'validationFormStudentAge',
        group: 'validationFormStudentGroup'
    },
    `Студент был добавлен.`,
    'addStudentModal',
);


//Update
const extractUpdateStudentData = (formData) => ({
    id: formData.get('id'),
    name: formData.get('name'),
    lastName: formData.get('lastName'),
    age: formData.get('age'),
    group: formData.get('group')
});
requests(
    'formUpdateStudent',
    'updateStudent',
    'PATCH',
    extractUpdateStudentData,
    {
        id: 'validationFormUpdateStudentId',
        name: 'validationFormUpdateStudentName',
        lastName: 'validationFormUpdateStudentLastName',
        age: 'validationFormUpdateStudentAge',
        group: 'validationFormUpdateStudentGroup'
    },
    `Студент, был изменен.`,
    'updateStudentModal',

);


//Read(getByGroup)
const extractGetStudentsByGroupData = (formData) => ({
    group: formData.get('group')
});
requests(
    'formGetStudentByGroup',
    'getStudentsByGroup',
    'GET',
    extractGetStudentsByGroupData,
    {
        group: 'validationFormGetStudentGroup'
    },
    `Студент, был изменен.`,
    'getStudentByGroupModal',
    'group'
);

//Delete
const extractDelStudentData = (formData) => ({
    id: formData.get('id')
});
requests(
    'formRemoveStudent',
    'delStudent',
    'DELETE',
    extractDelStudentData,
    {
        id: 'validationFormStudentID'
    },
    `Студент был удален.`,
    'removeStudentModal',
    'id'
);
