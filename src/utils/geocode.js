const request=require('request')

const geoCode = (address,callback) => {
    
    const geCodeURL='https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address) +'.json?access_token=pk.eyJ1IjoibmFkaW0tYW5zYXJpIiwiYSI6ImNrczR5ZG9jdDA2d3Myd3FpZW1xdWNxMW0ifQ.Ekl4HPsfcXu80RiS2YjdxA&limit=1'
    request({url:geCodeURL,json:true},(error,{body}) => {
    
        if(error){
            callback('Unable to connect',undefined)
        }else if(body.features.length === 0){
            callback('Unable to find location',undefined)
        }else{
            callback(undefined,{
                latitude:body.features[0].center[1],
                longitude:body.features[0].center[0],
                location:body.features[0].place_name
            })
        }
    })
    }

    module.exports = geoCode