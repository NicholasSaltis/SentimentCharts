
const headers = {
    Accept: "application/json", 
    "Content-Type": "application/json"
  }
  var labels = [
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
  ];
  var data = {
    labels: labels,
    datasets: [{
      label: 'Happiness over time',
      backgroundColor: 'rgb(255, 99, 132)',
      borderColor: 'rgb(255, 99, 132)',
      data: [],
    }]
  };
  var config = {
    type: 'line',
    data: data,
    options: {}
  };

var myChart = new Chart(
document.getElementById('myChart'),
config
);

function updateData(chart, size, newData) {
    chart.data.labels = [...Array(size).keys()];
    chart.data.datasets[0].data = newData;
    chart.update();
}

let submitButton = document.getElementById('submit');

submitButton.addEventListener('click', (e) => {
    e.preventDefault();
    let answer = document.getElementById('answers').value;
    axios.post('https://sentim-api.herokuapp.com/api/v1/', JSON.stringify({ "text": answer }), {headers: headers})
    .then((response) => {
        
        let shrek = document.getElementById("shrek");
        rating = response.data.result.polarity;
        if (rating >= 0.75){
                shrek.style.backgroundImage = "url('../images/shrekvhappy.jpeg')";
        }else if(rating >= 0.5)
        {
            shrek.style.backgroundImage = "url('../images/shrekhappy.jpeg')";
        }else if(rating >= 0.25)
        {
            shrek.style.backgroundImage = "url('../images/shrekgood.jpeg')";
        }else if(rating >= 0)
        {
            shrek.style.backgroundImage = "url('../images/shrekneutral.jpeg')";
        }else if(rating >= -0.25)
        {
            shrek.style.backgroundImage = "url('../images/shreksad.jpeg')";
        }else if(rating >= -0.5)
        {
            shrek.style.backgroundImage = "url('../images/shrekmad.jpeg')";
        }else if(rating >= -0.75)
        {
            shrek.style.backgroundImage = "url('../images/shrekvmad.jpeg')";
        }else
        {
            shrek.style.backgroundImage = "url('../images/shrekswamp.jpeg')";
        }
        alert(rating);
        console.log(response.data.result);
        let sentences = response.data.sentences;
        let sentenceScores = [];
        for(let sentence of sentences){
            sentenceScores.push(sentence.sentiment.polarity * 100)
        };
        console.log(sentenceScores);
        updateData(myChart, sentenceScores.length + 1, sentenceScores);
    })
    .catch((error) => {

    })
});

