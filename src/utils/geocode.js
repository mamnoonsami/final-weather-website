const request = require('request')

/*
Geocoding
mapbox api is used to get the longitude and latitude to get the address
*/
const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoibWFtbm9vbjcyNjQiLCJhIjoiY2tzMTB1cjVuMGlqbDJ2bzNkNnNsZm95bSJ9.rY0cfMHJkOPOAze6KDoriw&limit=1'

    request({ url, json: true }, (error, { body }) => { // used es-6 destructuring and property  shortchut, see 5-es6-objects.js in playground folder
        if (error) { //if the wifi is off or other low level errors occur
            callback('Unable to connect to loaction services!', undefined)
        } else if (body.features.length === 0) { //if the location is not valid or doesnot exist
            callback('Unable to find the location. Try again.', undefined)
        } else { //everything alright, sends the data
            callback(undefined, {
                longitude: body.features[0].center[0],
                latitude: body.features[0].center[1],
                location: body.features[0].place_name,
            })
        }
    })
}

module.exports = geocode