let https = require("https");

let weatherAppID = 'b1b15e88fa797225412429c1c50c122a1';


/** get the weather for a city */
exports.getWeatherByCity = (_params)=>{

    return new Promise((res,rej)=>{
        https.get(`https://samples.openweathermap.org/data/2.5/history/city?id=${_params.city},${_params.state}&type=hour&appid=${weatherAppID}`,(resp)=>{

            let data = '';

            //collect all of the data packets
            resp.on('data', (packet) => {
              data += packet;
            });
            
            //return the response
            resp.on('end', () => {
              console.log(data);
              res(JSON.parse(data));
            });
        })
        .on("error",()=>{
            res(null)
        })
    })
    
}