var express = require('express');
var router = express.Router();
var fse = require('fs-extra');
var weatherService = require("../lib/weatherService");
var parcelService = require("../lib/parcelService");

//process the incoming incident file
router.post('/api/incident/process', function (req, res, next) {

(async function(){
let file = null;
try{ file = req.files['incidentFile'];}catch(ex){}

  try {
    //if a file hasn't been uploaded, return an error message
    if (!file) {
      res.json({
        success: false,
        error: "You didn't upload an incident file."
      })
    } 
    else if (file.mimetype != "application/json") {
      //else, if the wrong file type was upload, return an error message
      res.json({
        success: false,
        error: "Only JSON files are accepted."
      })
      
    } else {
      //else, extract the JSON data from the file object
      let fileJSON = JSON.parse(file.data.toString("utf8"));
      
      //get the weather for this incident's location
      let result = await weatherService.getWeatherByCity({
        lon : fileJSON.address.longitude,
        lat : fileJSON.address.latitude,
        startDate : new Date(fileJSON.description.event_opened).toISOString().slice(0,10), //get the start date in YYYY-MM-DD format
        endDate : new Date(fileJSON.description.event_closed).toISOString().slice(0,10), //get the end date in YYYY-MM-DD format
      });
      
      //if the weather service didn't return a JSON object, then there was an error
      if(!result || typeof(result) == "string")
      return res.json({
        success: false,
        error : result || "The weather could not be retrieved."
      })

      // store the weather data in the incident response
      fileJSON.weather = result;
     
      //get the parcel data for the incident's location
      result = await parcelService.getParcelData({
        state : fileJSON.address.state,
        lon : fileJSON.address.longitude,
        lat : fileJSON.address.latitude
      })

      if(!result || typeof(result) == "string" )
      return res.json({
        success: false,
        error : result || "The parcel data could not be fetched."
      })

      fileJSON.parcel = result;

      //return a success response
      res.json({
        success: true,
        error: false,
        response: fileJSON
      })
    }
  } catch (ex) {
     
    //send an error message back to the client
    res.status(500).json({
      success: false,
      error: `${ex}`
    })
  }

})()
});

module.exports = router;
