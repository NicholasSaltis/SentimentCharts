# SentimentCharts

### Developers:
* [AnthonyALu](https://github.com/AnthonyALu)
* [NicholasSaltis](https://github.com/NicholasSaltis)

A tool for analysing the sentiment of a message. Each sentence is analysed and the results are plotted on a graph to provide feedback on the emotion of a message over time. 
---
### What is the Purpose of this app?
This app can be used to analyse the sentiment, in other words mood or tone, of input text and displays the data in a legible format. It could be used to check emails or messages before sending to highlight overly positive or negative language used so that informed decisions can be made to edit the message. 
---
### How it works:
The text input into the message box gets sent to [Sentim-API by Sharad Raj](https://sentim-api.herokuapp.com/) which parses each sentence seperated by a period and returns a score for each sentence based on sentiment. This data is then used to generate a [Chart.js](https://www.chartjs.org/) graph representing the sentiment of the score over the course of the message. The Image on the left also changes to reflect the average sentiment score of the entire message in addition to a message under the graph critiquing the message.
----
### How to use:
Enter text into the text box and press the send button. The text entered will return a data point for each sentence seperated by a period. The text in the message box can be edited and resent and the graph will reflect the change in data. To change the style of the graph between a line or bar graph select from the dropdown below the graph and click the 'Change Graph' button.


