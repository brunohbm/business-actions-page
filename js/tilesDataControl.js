var noData;

setData();

function setData(){
	var tileNames = ["appleTile",
	 				"facebookTile",
	  				"googleTile",
	  				"microsoftTile",
	  				 "ibmTile"];

	var symbolNames = ["AAPL",
					  "FB",
					  "GOGL",
					  "MSFT",
					  "IBM"];

	for (var i = 0; i < tileNames.length; i++) {
		getJSONData(tileNames[i], symbolNames[i]);	
	}
}

function getJSONData(tileName, symbolName){
	$.getJSON("https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol="+symbolName+"&apikey=UL8W9UXLVG1QZRXW", function(data){		
		var dt = data['Global Quote']['05. price'];
		if (dt != null) {
			document.getElementById(tileName).innerHTML = dt;
		}
	});
}