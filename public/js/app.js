console.log('Client side javascript file is loaded!')



const weatherForm=document.querySelector('form')
const search = document.querySelector('input')
const locationAd = document.querySelector('#lcaotion')
const forecast = document.querySelector('#forecast')
const address = document.querySelector('#address')

weatherForm.addEventListener('submit' ,(e) => {
    e.preventDefault()

    if(!search.value){
        return console.log("Please search something")
    }

    fetch('/weather?address='+search.value).then((response) =>{
    
        response.json().then((data) => {
             if(data.error){
                locationAd.textContent=data.error    
                 return console.log(data.error)
             }

             locationAd.textContent="Location : " +data.location
            forecast.textContent="Forecast : " +data.forecast
            address.textContent="Address : " + data.address
            //  console.log(data)
            //  console.log(data.location)
            //  console.log(data.address)
            //  console.log(data.forecast)


        })

})
})