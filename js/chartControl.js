var company;
var method;
var ctx;
var myChart;
var companySelected;
var msg;

onStart();

function onStart(){
	Chart.defaults.global.defaultFontColor = 'white';
	ctx = document.getElementById("dataChart").getContext('2d');
	newChart(['0'], [0]);
	company = "AAPL";
	method = "INTRADAY";
	msg = "The API Alpha Vantage reached the limit of call volume, please wait a little for the data.";
	companySelected = "Apple";
	doChart();
}

function setMethod(newMethod)
{
	method = newMethod;
	doChart();
}

function setCompany(newCompany, name)
{
	companySelected = name;
	company = newCompany;
	doChart();
}

function doChart()
{		
	switch(method)
	{
		case "INTRADAY":
			doDailyChart();
		break;

		case "DAYLY":
			doDaysChart();
		break;

		case "MONTH":
			doMonthChart();
		break;
	}
}

function doDailyChart()
{
	$.getJSON("https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol="+company+"&interval=5min&apikey=UL8W9UXLVG1QZRXW", function(data){		
		var array = data['Time Series (5min)'];
		if (array != null) {
			var keys = Object.keys(array);
			var labels = [];
			var data = [];	
			var date = getFormatedDate();
			var date = date + new Date().getDate();

			for (var i = 0; i < keys.length; i++) {
				var key = keys[i];
				if (key.includes(date)){
					data.push(array[key]['1. open']);
					key = key.replace(date, "At ");
					key = key.replace(":00", "");
					key = key.replace(":", "h");
					labels.push(key);	
				} 		
			}

	        draw(labels, data);
	        return;
		}		
		alert(msg);
	});
}

function doDaysChart()
{
	$.getJSON("https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol="+company+"&apikey=UL8W9UXLVG1QZRXW", function(data){		
		var array = data['Time Series (Daily)'];
		if (array != null) {
			var keys = Object.keys(array);
			var labels = [];
			var data = [];	
			var date = getFormatedDate();		
			
			for (var i = 0; i < 5; i++) {
				var key = keys[i];
				if (key.includes(date)){
					data.push(array[key]['1. open']);
					labels.push(key.replace(date, "Day "));	
				} 		
			}

			draw(labels, data);
			return;
		}
		alert(msg);
	});
}

function doMonthChart()
{
	$.getJSON("https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol="+company+"&apikey=UL8W9UXLVG1QZRXW", function(data){		
		var array = data['Time Series (Daily)'];
		if (array != null) {
			var keys = Object.keys(array);
			var labels = [];
			var data = [];
			var date = getFormatedDate();		
			
			for (var i = 0; i < keys.length; i++) {
				var key = keys[i];
				if (key.includes(date)){
					data.push(array[key]['1. open']);
					labels.push(key.replace(date, "Day "));	
				} 		
			}

	        draw(labels, data);
	        return;
    	}
    	alert(msg);
	});
}

function draw(chartLabels, chartData)
{
	myChart.destroy();
	newChart(chartLabels, chartData);
	document.getElementById('companySelected').innerHTML = companySelected;		
}

function newChart(newLabels, newData){
	myChart = new Chart(ctx, {
		type: 'line',
		    data: {
		        labels: newLabels,
		        datasets: [{
		            label: "Value",
		            data: newData,
		            backgroundColor: "rgba(207, 229, 255, 0.8)",
		            borderColor: "white",
		            borderWidth: 1
		        }]
		    },
		    options: {
		        scales: {
		            yAxes: [{
		                ticks: {
		                    beginAtZero:true
		                }
		            }]
		        }
		    }
	});
}

function getFormatedDate()
{
	var date = new Date();
	var year = date.getFullYear();
	var month = date.getMonth() + 1;
	if (month < 10){
		month = "0" + month;
	}		

 	date = year + "-" + month + "-";
 	return date;
}