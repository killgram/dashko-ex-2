let body = document.querySelector('body');
let divForm1 = body.children[1];
let form1 = document.forms.getData;
let createbtn = document.getElementById('createForm');
let clearbtn = document.getElementById('clearForm');
let inputLink = document.getElementById('inputWay');
let inputFile = document.getElementById('inputFile');
inputLink.value = 'https://raw.githubusercontent.com/killgram/JSON-format/master/addpost.js';
// inputLink.value = 'https://raw.githubusercontent.com/killgram/JSON-format/master/colorsheme.js';
// inputLink.value = 'https://raw.githubusercontent.com/killgram/JSON-format/master/interview.js';
// inputLink.value = 'https://raw.githubusercontent.com/killgram/JSON-format/master/signin.js';
// inputLink.value = 'https://raw.githubusercontent.com/killgram/JSON-format/master/signup.js';


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
//create btn
createbtn.onclick = async function (e) {
    if (inputLink.value == '') {
        createForm();
    } else {
        let response = await fetch(inputLink.value);
        inputData = await response.json();
        createForm();
    }
}
//clear btn
clearbtn.onclick = function(){
    let render = document.getElementById('render');
    render.remove();
}

// create form
function createForm() {
    let divForm2 = document.createElement('div');
    divForm2.setAttribute('class', 'container-fluid');
    divForm2.setAttribute('id', 'render');
    divForm1.after(divForm2);
    //render main part
    let renderForm = document.createElement('form');
    renderForm.setAttribute('class', 'col-lg-6 col-auto justify-content-center mx-auto');
    renderForm.setAttribute('id', 'renderForm');
    divForm2.append(renderForm);
    let fieldset = document.createElement('fieldset');
    fieldset.setAttribute('id', 'fieldset');
    renderForm.append(fieldset);
    //render blocks
    createBlocks(inputData);
}

//create blocks
function createBlocks(data) {
    for (let key1 in Object.entries(data)) {
        let formblock = Object.entries(data)[key1];
        renderBlocks(formblock);
    }
}

//render main blocks
function renderBlocks(block) {
    if (block.includes("name")) {
        renderName(block);
    }
    if (block.includes("fields")) {
        renderFields(block);
    }
    if (block.includes("references")) {
        renderReferences(block);
    }
    if (block.includes("buttons")) {
        renderButtons(block);
    }
}

//render name
function renderName(name) {
    let formName = Object.values(name)[1];
    renderForm.setAttribute('name', formName);
}

//render fields
function renderFields(field) {
    let elem = Object.values(field)[1];
    for (i = 0; i < elem.length; i++) {
        let div = document.createElement('div');
        let target = document.getElementById('fieldset');
        div.setAttribute('class', 'form-group');
        target.append(div);
        for (k = 0; k < Object.keys(elem[i]).length; k++) {
            let content = document.createElement(Object.keys(elem[i])[k]);
            if (Object.keys(elem[i])[k] == "label") {
                content.innerHTML = Object.values(elem[i])[k];
            }
            else if (Object.values(elem[i])[k].hasOwnProperty('technologies')) {
                content = document.createElement('select');
                for (let key in Object.values(elem[i])[k]) {
                    content.setAttribute(key, Object.values(elem[i])[k][key]);
                    if (key == "technologies") {
                        var technologies = Object.values(elem[i])[k][key];
                        content.removeAttribute('technologies');
                    }
                }
                for (let val in Object.values(technologies)) {
                    let option = document.createElement('option');
                    option.innerHTML = Object.values(technologies)[val];
                    content.append(option);
                }
            }
            else {
                for (let key in Object.values(elem[i])[k]) {
                    content.setAttribute(key, Object.values(elem[i])[k][key]);
                    if (key == "colors") {
                        var colorColors = Object.values(elem[i])[k][key];
                    }
                    if (key == "mask") {
                        content.setAttribute('data-mask', Object.values(elem[i])[k][key]);
                        content.setAttribute('type', 'text');
                        content.onkeydown = function (e) {
                            let target = e.key;
                            if (target = Number(target) ||
                                (e.keyCode == 8) ||
                                (e.keyCode == 46) ||
                                (e.keyCode == 9) ||
                                (e.keyCode == 27) ||
                                (e.keyCode == 65 && e.ctrlKey === true) ||
                                (e.keyCode >= 35 && e.keyCode <= 39)) {
                                return;
                            } else {
                                e.preventDefault();
                            }
                        }
                        content.removeAttribute('mask');
                    }
                    if (Object.values(elem[i])[k][key] == "textarea") {
                        content = document.createElement('textarea');
                    }
                }
            }
            //
            if (content.type == "file") {
                content.setAttribute('class', 'form-control-file');
            }
            else if (content.type == "color") {
                div.append(content);
                content = document.createElement('select');
                content.setAttribute('class', 'form-control');
                for (let val in Object.values(colorColors)) {
                    let option = document.createElement('option');
                    option.innerHTML = Object.values(colorColors)[val];
                    option.style.backgroundColor = Object.values(colorColors)[val];
                    option.style.color = "#ffffff";
                    content.append(option);
                }
            }
            else if (content.type == "checkbox") {
                content.classList.add('form-check-input');
                div.setAttribute('class', 'form-check');
            }
            else if (content.type) {
                content.classList.add('form-control');
            }
            div.append(content);
        }
    }
}

//render references
function renderReferences(references) {
    let elem = Object.values(references)[1];
    let div = document.createElement('div');
    let target = document.getElementById('fieldset');
    div.setAttribute('class', 'col');
    target.append(div);
    for (i = 0; i < elem.length; i++) {
        let content;
        let countRef = 0;
        for (k = 0; k < Object.keys(elem[i]).length; k++) {
            if (Object.keys(elem[i])[k] == "input") {
                content = document.createElement(Object.keys(elem[i])[k]);
                for (let key in Object.values(elem[i])[k]) {
                    content.setAttribute(key, Object.values(elem[i])[k][key]);
                    if (content.type == "checkbox") {
                        content.classList.add('form-check-input');
                        div.setAttribute('class', 'form-check');
                    }
                }
            } else if (Object.keys(elem[i])[k] == "text without ref") {
                countRef++;
                var setLabel = Object.values(elem[i])[k] + " ";
            } else if (Object.keys(elem[i])[k] == "text") {
                countRef++;
                var textLink = document.createElement('label');
                var link = document.createElement('a');
                link.innerHTML = Object.values(elem[i])[k];
            } else if (Object.keys(elem[i])[k] == "ref") {
                countRef++;
                link.href = Object.values(elem[i])[k];
            }
            if (countRef === 3) {
                content = textLink;
                content.innerHTML = setLabel;
                textLink.append(link);
            } else if (countRef === 2 && !setLabel) {
                content = textLink;
                content.append(link);
                div.classList.add('refLink');
            }
            if (!content) {
                continue;
            } else {
                div.append(content);
            }
        }
    }
}

//render buttons
function renderButtons(buttons) {
    let elem = Object.values(buttons)[1];
    let div = document.createElement('div');
    let target = document.getElementById('fieldset');
    div.classList.add('row', 'mx-auto');
    target.append(div);
    for (i = 0; i < elem.length; i++) {
        let content = document.createElement('button');
        content.setAttribute('type', 'button');
        content.classList.add('btn', 'btn-primary');
        for (let key in Object.keys(elem[i])) {
            content.innerHTML = Object.values(elem[i]);
        }
        div.append(content);
    }
}