'use strict';

var nodeRestClient = require('node-rest-client');

const debugging = true;
const baseUrl = 'https://api.coinmarketcap.com/v1/ticker/';
const indent = 4;	// space count
const sep = "\n\n";
const coins = [
	'ethereum',
	'nolimitcoin',
	'tenx',
	'nem',
	'neo',
	'ripple',
	'faircoin',
	'megacoin',
	'thegcccoin',
];

var client = new nodeRestClient.Client(),
	errors = [],
	url;

const debug = (msg) => {
	debugging && console.log(msg);
};

// direct way 
coins.forEach((name) => {
	
	url = baseUrl + name;
	debug(url);

	client.get(url, function (data, response) {
		console.dir(data);
		if(data.error) {
			errors.push(name + ': ' + data.error);
		}
		else {
 			// parsed response body as js object 
    		console.log(name + ': ' + JSON.stringify(data, null, indent) + sep);
    		// raw response 
    		//console.log(response);
    	}
    });
});

console.dir(errors);
if(0 < errors.length) {
	console.log("Error:\n");
	errors.forEach((e) => console.log("\t" + e + "\n"));
}

/*
// registering remote methods 
client.registerMethod("jsonMethod", "http://remote.site/rest/json/method", "GET");

client.methods.jsonMethod(function (data, response) {
    // parsed response body as js object 
    console.log(data);
    // raw response 
    console.log(response);
});
*/
