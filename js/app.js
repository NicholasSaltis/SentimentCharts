
const headers = {
    Accept: "application/json", 
    "Content-Type": "application/json"
  }
  const labels = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
  ];
  const data = {
    labels: labels,
    datasets: [{
      label: 'Happiness',
      backgroundColor: 'rgb(255, 99, 132)',
      borderColor: 'rgb(255, 99, 132)',
      data: [0, 10, 5, 2, 20, 30, 45],
    }]
  };
  const config = {
    type: 'line',
    data: data,
    options: {}
  };

var myChart = new Chart(
document.getElementById('myChart'),
config
);
let submitButton = document.getElementById('submit');

submitButton.addEventListener('click', (e) => {
    e.preventDefault();
    let answer = document.getElementById('answers').value;
    axios.post('https://sentim-api.herokuapp.com/api/v1/', JSON.stringify({ "text": answer }), {headers: headers})
    .then((response) => {
        let sentences = response.data.sentences;
        let sentenceScores = [];
        for(let sentence of sentences){
            sentenceScores.push(sentence.sentiment.polarity)
        };
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
    })
    .catch((error) => {

    })
});

