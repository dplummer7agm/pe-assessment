var express = require('express');
var router = express.Router();
var fse = require('fs-extra');

//process the incoming incident file
router.post('/api/incident/process', function (req, res, next) {

  try {
    //if a file hasn't been uploaded, return an error message
    if (!req.files) {
      res.json({
        success: false,
        error: "You didn't upload an incident file."
      })
    } 
    else if (req.files[Object.keys(req.files)[0]].mimetype != "application/json") {
      //else, if the wrong file type was upload, return an error message
      res.json({
        success: false,
        error: "Only JSON files are accepted."
      })
      
    } else {
      //else, attempt to save the JSON file
      res.json({
        success: true,
        error: false,
        response: {}
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
