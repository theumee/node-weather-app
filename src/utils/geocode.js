const request = require("postman-request");
const geocode = (address, callback) => {
    const url = `http://api.positionstack.com/v1/forward?access_key=64fba72d7dace737128410b481aa3167&query=${encodeURIComponent(address)}`
    request({url,json: true},(error, {body}) => {
        if(error){
            callback("Unable to connect to location services!")
        }else if( !body.data || body.data.length === 0) {
            callback("Unable to find location. Try another search!")
        }else{
            callback(undefined,{
                latitude: body.data[0].latitude,
                longitude: body.data[0].longitude,
                location : body.data[0].label
            })
        }
    })
}

module.exports = geocode
