let form1 = document.forms.getData;
let createbtn = document.getElementById('createForm');
let inputLink = document.getElementById('inputWay');
let inputFile = document.getElementById('inputFile');
// inputLink.value = 'https://raw.githubusercontent.com/killgram/JSON-format/master/interview.js';

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
    if(inputLink.value==''){
            createForm(inputData);
        } else {
        let response = await fetch(inputLink.value);
        inputData = await response.json();
        createForm(inputData);
    }
}
// create form
function createForm(inputData) {
    console.log(inputData);
}