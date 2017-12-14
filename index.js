var fs = require('fs');
const http = require('http');
const https = require('https');
const request = require('request');
const cryptoValues = require("./crypto.json");
const coinMarketCapUrl = "http://api.coinmarketcap.com/v1/ticker/";
const worldCoinIndexURL = "https://www.worldcoinindex.com/apiservice/json?key=";
var result = [];

exports.price = (crypto) => {
    return new Promise((resolve, reject) => {
        if(!crypto){
            reject(new Error('Coin Not Found'));
        }else{
            const cryptoId = cryptoValues[crypto.toLowerCase()] || crypto;
            const requestUrl = coinMarketCapUrl + "/" + cryptoId;
            request(requestUrl, function (error, res, body) {
                if(!error && res.statusCode === 200) {
                    const response = JSON.parse(body);
                    resolve(response);
                }else {
                    reject(new Error('Coin Not Found'));
                }
            });
        }
    });
}

exports.priceWCI = (crypto, key) => {
    return new Promise((resolve, reject) => {
        if(!crypto){
            reject(new Error('Coin Not Found'));
        }else if(!key){
            reject(new Error('Key Not Provided'));
        }else{
            const cryptoId = cryptoValues[crypto.toLowerCase()] || crypto.toLowerCase();
            const requestUrl = worldCoinIndexURL + key;
            request(requestUrl, function (error, res, body) {
                if(!error && res.statusCode === 200) {
                    const response = JSON.parse(body);
                    var filteredJson = response.Markets.filter(function(cryptoValue) {
                        return cryptoValue.Name.toLowerCase() === cryptoId;
                    });
                    resolve(filteredJson);
                }else {
                    reject(new Error('Coin Not Found'));
                }
            });
        }
    });
}
