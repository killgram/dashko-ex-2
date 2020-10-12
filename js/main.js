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
        createForm();
    } else {
        let response = await fetch(inputLink.value);
        inputData = await response.json();
        createForm();
    }
}

// create form
function createForm() {
    let divForm2 = document.createElement('div');
    divForm2.setAttribute('class', 'container-fluid');
    divForm1.after(divForm2);
    //render main part
    let renderForm = document.createElement('form');
    renderForm.setAttribute('class', 'col-lg-6 col-auto justify-content-center mx-auto');
    renderForm.setAttribute('id', 'renderForm');
    divForm2.append(renderForm);
    let fieldset = document.createElement('fieldset');
    renderForm.append(fieldset);
    //render blocks
    createBlocks(inputData);
}

//create blocks
function createBlocks(data) {
    for (i = 0; i < Object.entries(data).length; i++) {
        let formBlock = Object.entries(data)[i];
        renderBlocks(formBlock);
    }
}

//render main blocks
function renderBlocks(block) {
    if (block.includes("name")){
        renderName(block);
    }
    if (block.includes("fields")){
        renderFields(block);
    }
    if (block.includes("references")){
        renderReferences(block);
    }
    if(block.includes("buttons")){
        renderButtons(block);
    }
}

//render name
function renderName(name){
    let formName = Object.values(name)[1];
    renderForm.setAttribute('name', formName);
}

//render fields
function renderFields(field){
    console.log(field);
}

//render references
function renderReferences(references) {
    console.log(references);
}

//render buttons
function renderButtons(buttons) {
    console.log(buttons);
}