const request = require("postman-request");

const forecast = (latitude,longitude, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=97c7ea3a20f9ee70873136573d3665aa&query=${encodeURIComponent(latitude)},${encodeURIComponent(longitude)}&units=m`
    request({url : url,json: true},(error, {body}) => {
        if(error){
            callback("Unable to connect with weather service!")
        }else if(body.error) {
            callback("Unable to find location. Try another search!")
        }else{
            callback(
                undefined,
                `${body.current.weather_descriptions[0]}. It is currently ${body.current.temperature} degrees out there. It feels like ${body.current.feelslike}.`
            )
        }
    })
}

module.exports = forecast
