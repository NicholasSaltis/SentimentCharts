// const { Chart } = require("chart.js");

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
// event handler for graph button select. reads value of selected option in select tag.
// destroys the existing chart and replaces it with a new chart with the selected chart type.
function GetSelectedText(){
    var e = document.getElementById("graphType");
    console.log(e.options[e.selectedIndex].text);
    graphType = e.options[e.selectedIndex].text
    myChart.destroy();
    myChart = new Chart(document.getElementById('myChart'), {type: graphType, data: data});
};
// event listener for graph type submit button
document.getElementById("graphButton").addEventListener('click', ()=>{
    console.log('working')
    GetSelectedText()
})

var config = {
    type: 'line',
    data: data,
    options: {}
};

var comments = ["You did great", "Meh", "Great start but poor finish", "Poor start but better finish", "Worst conversation ever"]

var myChart = new Chart(
document.getElementById('myChart'),
config
);

var averages = [0, 0];
var sum = 0;
var rating = 0;

function updateData(chart, size, newData) {
    chart.data.labels = [...Array(size).keys()];
    chart.data.datasets[0].data = newData;
    chart.update();
}

function updateSentence(count) {
    if (count == 1)
    {
        if (rating > 0.5)
        {
            changeSentence(0);
        }else if(rating > -0.1 && rating < 0.1)
        {
            changeSentence(1);
        }else{
            changeSentence(4);
        }
    }else{
        if (averages[0] > 0.25)
        {
            if(averages[1] > averages[0])
            {
                changeSentence(0);
            }else{
                changeSentence(2);
            }
        }else{
            if(averages[1] > averages[0])
            {
                changeSentence(3);
            }else{
                changeSentence(4);
            }
        }
    }
}

function changeSentence(commentNum){
    sentence = comments[commentNum];
    let text = document.getElementById('chart-summary');
    text.innerHTML = sentence;
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
        sum = 0;
        updateData(myChart, sentenceScores.length + 1, sentenceScores);
        if(sentenceScores.length % 2 == 0)
        {
            let half = sentenceScores.length / 2;

            for(i = 0; i < half; i ++)
            {
                sum += sentenceScores[i];
            }
            averages[0] = sum / half;
            sum = 0;
            for(i = half-1; i < sentenceScores.length-1; i ++)
            {
                sum += sentenceScores[i];
            }
            averages[1] = sum / half;
            updateSentence(2);
            
        }else if(sentenceScores.length == 1){
            averages[0] = sentenceScores[0];
            updateSentence(1);
        }else{
            sentenceScores.splice(sentenceScores.length/2, 1);
            let half = sentenceScores.length / 2;
            sum = 0;
            for(i = 0; i < half; i ++)
            {
                sum += sentenceScores[i];
            }
            averages[0] = sum / half;
            sum = 0;
            for(i = half-1; i < sentenceScores.length-1; i ++)
            {
                sum += sentenceScores[i];
            }
            averages[1] = sum / half;
            sum = 0;
            updateSentence(2);
        }

    })
    .catch((error) => {

    })
});

