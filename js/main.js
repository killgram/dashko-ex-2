let body = document.querySelector('body');
let divForm1 = body.children[1];
let form1 = document.forms.getData;
let createbtn = document.getElementById('createForm');
let inputLink = document.getElementById('inputWay');
let inputFile = document.getElementById('inputFile');
inputLink.value = 'https://raw.githubusercontent.com/killgram/JSON-format/master/addpost.js';

let inputData;
// get data
inputFile.addEventListener('change', function () {
    let file_to_read = inputFile.files[0];
    let fileread = new FileReader();
    fileread.onload = function (e) {
        let content = e.target.result;
        let intern = JSON.parse(content);
        inputData = intern;
    };
    fileread.readAsText(file_to_read);
})

createbtn.onclick = async function (e) {
    if (inputLink.value == '') {
        createForm(inputData);
    } else {
        let response = await fetch(inputLink.value);
        inputData = await response.json();
        createForm(inputData);
    }
}

// console.log(inputData);

// create form
function createForm(inputData) {
    let divForm2 = document.createElement('div');
    divForm2.setAttribute('class','container-fluid');
    divForm1.after(divForm2);
    //render main part
    let renderForm = document.createElement('form');
    renderForm.setAttribute('class','col-lg-6 col-auto justify-content-center mx-auto');
    renderForm.setAttribute('id','renderForm');
    renderForm.setAttribute('name','renderForm');
    divForm2.append(renderForm);
}