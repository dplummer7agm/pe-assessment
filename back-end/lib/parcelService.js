let http = require("http");


// didn't figure out how to query for parcel data more specific than the incident state
let apiUrl = 'http://gis.richmondgov.com/ArcGIS/rest/services/StatePlane4502/Ener/MapServer/0/query';
let queryString = "?f=json";

/** get the parcel data for the incident address
 * @param {Object} _params
 * @param {Object} _params.state
 * @param {String} _params.lon
 * @param {String} _params.lat
*/
exports.getParcelData = (_params)=>{
    
    //build the query string
    queryString += `&text=${stateCodes[_params.state]}`
    
  
    return new Promise((res,rej)=>{
        let url = `${apiUrl}${queryString}`;
        

        //fetch data from the parcel api
        http.get(url,(resp)=>{

            let data = '';

            //collect all of the data packets
            resp.on('data', (packet) => {
              data += packet;
            });
            
            //return the response
            resp.on('end', () => {
                
                data = JSON.parse(data);
                
              //if the parcel api returns an error message, reject the promise
              if(data.error && data.error.message)
                rej(data.error.message)
              else
                res(data);
            });
        })
        .on("error",()=>{
            res(null)
        })
    })
    
}



let stateCodes = 
{
    "AL": "Alabama",
    "AK": "Alaska",
    "AS": "American Samoa",
    "AZ": "Arizona",
    "AR": "Arkansas",
    "CA": "California",
    "CO": "Colorado",
    "CT": "Connecticut",
    "DE": "Delaware",
    "DC": "District Of Columbia",
    "FM": "Federated States Of Micronesia",
    "FL": "Florida",
    "GA": "Georgia",
    "GU": "Guam",
    "HI": "Hawaii",
    "ID": "Idaho",
    "IL": "Illinois",
    "IN": "Indiana",
    "IA": "Iowa",
    "KS": "Kansas",
    "KY": "Kentucky",
    "LA": "Louisiana",
    "ME": "Maine",
    "MH": "Marshall Islands",
    "MD": "Maryland",
    "MA": "Massachusetts",
    "MI": "Michigan",
    "MN": "Minnesota",
    "MS": "Mississippi",
    "MO": "Missouri",
    "MT": "Montana",
    "NE": "Nebraska",
    "NV": "Nevada",
    "NH": "New Hampshire",
    "NJ": "New Jersey",
    "NM": "New Mexico",
    "NY": "New York",
    "NC": "North Carolina",
    "ND": "North Dakota",
    "MP": "Northern Mariana Islands",
    "OH": "Ohio",
    "OK": "Oklahoma",
    "OR": "Oregon",
    "PW": "Palau",
    "PA": "Pennsylvania",
    "PR": "Puerto Rico",
    "RI": "Rhode Island",
    "SC": "South Carolina",
    "SD": "South Dakota",
    "TN": "Tennessee",
    "TX": "Texas",
    "UT": "Utah",
    "VT": "Vermont",
    "VI": "Virgin Islands",
    "VA": "Virginia",
    "WA": "Washington",
    "WV": "West Virginia",
    "WI": "Wisconsin",
    "WY": "Wyoming"
}