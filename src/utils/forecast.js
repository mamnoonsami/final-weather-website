const request = require('request')

/* the below function returns the weather forecast for 
the given longitude and latitude 
the url : http://api.weatherstack.com/current?access_key=c21bb0678df7916a8d46702a81125349&query=37.8267,-122.4233
if the weather has to be in farenheight http://api.weatherstack.com/current?access_key=c21bb0678df7916a8d46702a81125349&query=37.8267,-122.4233&units=f
*/

const forecast = (longitude, latitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=c21bb0678df7916a8d46702a81125349&query=' + latitude + ',' + longitude

    request({ url, json: true }, (error, { body }) => { // used es-6 destructuring and property  shortchut, see 5-es6-objects.js in playground folder
        if (error) {
            callback("Sorry! Unable to connect to weather service", undefined)
        } else if (body.error) {
            callback("Unable to find the location. Try again.", undefined)
        } else {
            callback(undefined, {
                weather_description: body.current.weather_descriptions[0],
                temperature: body.current.temperature,
                feels_like: body.current.feelslike
            })
        }
    })
}

module.exports = forecast