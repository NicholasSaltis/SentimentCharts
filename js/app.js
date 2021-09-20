// import axios from 'axios';
// const QuickChart = require('quickchart-js');

let submitButton = document.getElementById('submit');

submitButton.addEventListener('click', (e) => {
    axios.post('https://sentim-api.herokuapp.com/api/v1/', { "text": "hello hello" })
    .then((response) => {
        alert(response)
        console.log(response)
    })
    .catch((error) => {

    })
});