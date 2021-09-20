import axios from 'axios';
const QuickChart = require('quickchart-js');

let submitButton = document.querySelector('#submit');

submitButton.addEventListener('click', (e) => {
    axios.post('https://sentim-api.herokuapp.com/api/v1/', { "text": e.value })
    .then((response) => {

    })
    .catch((error) => {
        
    })
});