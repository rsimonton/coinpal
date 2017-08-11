'use strict';

const fs = require('fs');
const path = require('path');
const restClient = require('node-rest-client');

const args = require('yargs').argv

const debugging = true;
const indent = 4;	// space count
const sep = "\n";

const coinsFile = path.resolve(__dirname, "coins.json");
const config = JSON.parse(fs.readFileSync(coinsFile, 'utf8'));
const userApis = Object.keys(config);

const apis = {
	coinmarketcap: 'https://api.coinmarketcap.com/v1/ticker/'
};

var client = new restClient.Client(),
	errors = [],
	coins,
	url,
	result;

const debug = (msg) => {
	debugging && console.log(msg);
};

console.log(args.filter ? "\n" + args.filter + ':' : '');

userApis.forEach(api => {

	coins = config[api];

	// direct way 
	coins.forEach((name) => {
		
		url = apis[api] + name;

		client.get(url, function (data, response) {
			if(data.error) {
				errors.push(name + ': ' + data.error);
			}
			else {
				if(args.filter) {
					console.log("\t" + name + ': ' + data[0][args.filter]);
				}
				else {
	 				// parsed response body as js object 
	    			console.log(name + ': ' + JSON.stringify(data, null, indent) + sep);
	    		}
	    	}
	    });
	});
});
