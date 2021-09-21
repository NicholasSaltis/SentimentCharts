
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

var averages = [0, 0, 0];
var sum = 0;

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

        let sentences = response.data.sentences;
        let sentenceScores = [];
        for(let sentence of sentences){
            sentenceScores.push(sentence.sentiment.polarity * 100)
        };

        if(sentenceScores.length % 3 == 0)
        {
            let third = sentenceScores.length / 3;
            sum = 0;
            for(i = 0; i < third; i ++)
            {
                sum += sentenceScores[i];
            }
            averages[0] = sum / third;
            sum = 0;
            for(i = third-1; i < third*2; i ++)
            {
                sum += sentenceScores[i];
            }
            averages[1] = sum / third;
            sum = 0;
            for(i = (third*2)-1; i < sentenceScores.length-1; i ++)
            {
                sum += sentenceScores[i];
            }
            averages[2] = sum / third;
        }else if(sentenceScores.length % 2 == 0)
        {
            
        }else{
            
        }
        updateData(myChart, sentenceScores.length + 1, sentenceScores);
    })
    .catch((error) => {

    })
});

