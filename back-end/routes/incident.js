var express = require('express');
var router = express.Router();
var fse = require('fs-extra');

//process the incoming incident file
router.post('/api/incident/process', function (req, res, next) {
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
      error: `An unexpected error has occurred: ${ex}`
    })
  }
});

module.exports = router;
