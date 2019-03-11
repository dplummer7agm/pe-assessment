let https = require("https");

let apiKey = '04b62885fe3f4227b25085662b26c585'; // free weatherbit.io api key (you can)
let apiUrl = 'https://api.weatherbit.io/v2.0/history/daily';
let tempUnit = 'I'; //specifies the type of temperature that'll be returned (I = fahrenheit)

/** get the weather for a city 
 * @param {Object} _params
 * @param {String} _params.lon
 * @param {String} _params.lat
 * @param {String} _params.startDate
 * @param {String} _params.startDate
*/
exports.getWeatherByCity = (_params)=>{

    formatDates(_params);
    


    return new Promise((res,rej)=>{
        let url = `${apiUrl}?start_date=${_params.startDate}&end_date=${_params.endDate}&lon=${_params.lon}&lat=${_params.lat}&units=${tempUnit}&key=${apiKey}`;
        
        https.get(url,(resp)=>{

            let data = '';

            //collect all of the data packets
            resp.on('data', (packet) => {
              data += packet;
            });
            
            //return the response
            resp.on('end', () => {
                
                data = JSON.parse(data);
              
              //if the weather api returns an error message, reject the promise
              if(data.error)
                rej(data.error)
              else
                res(data);
            });
        })
        .on("error",()=>{
            res(null)
        })
    })
    
}

function formatDates(_params){
    /*
        If the start date and end date are the same, increment the end date by one day
        We have to do this because this free API tracks weather data by day and not hour.
        */
    if(_params.startDate == _params.endDate){
        _params.endDate = new Date(_params.endDate);
        _params.endDate.setDate(_params.endDate.getDate()+1);
        _params.endDate = _params.endDate.toISOString().slice(0,10);
    }
}