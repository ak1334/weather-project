const request = require('request');
const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/bbe3540507df2e47e9b4d98bda2f163b/' + latitude + ',' + longitude
    request({
        url: url,
        json: true
    }, (error, response) => {
        if (error) {
            callback('unable to connect to internet', undefined);
        } else if (response.body.error) {
            callback('unable to find location', undefined);
        } else {
            callback(undefined, response.body.daily.data[0].summary + "It is currently " + response.body.currently.temperature + " fahrenheit . There is a " + response.body.currently.precipProbability + "% chance of rain.");
        }
    });
}
module.exports = forecast;