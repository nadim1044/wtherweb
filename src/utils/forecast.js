const request=require('request')

const foreCast = (latitude,longitude,callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=9419ba13bfb1df0551803ddd4ba6bd1c&query='+latitude+','+longitude+''

    request({url:url,json:true},(error,{body}) => {
        if(error){
            callback('Unable to connect',undefined)
        }else if(body.error){
            callback('Unable to find location',undefined)
        }else{
            callback(undefined,{temprature:body.current.temperature})
        }
        
    })   
}

module.exports = foreCast