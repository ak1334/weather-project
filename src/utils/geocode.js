const request = require("request");

const geocode = (address, callback) => {
    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + address + ".json?access_token=pk.eyJ1IjoiYWtraTEzMzQiLCJhIjoiY2p1YzRzOW5xMGl5ajN6cGkzYm0yeTN5eCJ9.2JrGZrbrlischzFj573cIA";
    request({
        url: url,
        json: true
    }, (error, response) => {
        if (error) {
            callback('unable to connect to internet ', undefined); //undefined is default arg. if not passed
        } else if (response.body.features.length === 0) {
            callback('unable to find location', undefined);
        } else {
            callback(undefined, {
                latitude: response.body.features[0].center[1], //features and center both are arrays
                longitude: response.body.features[0].center[0],
                location: response.body.features[0].place_name
            });
        }
    });
}

module.exports = geocode;