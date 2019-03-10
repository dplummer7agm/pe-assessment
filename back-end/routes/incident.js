var express = require('express');
var router = express.Router();
var fse = require('fs-extra');

//process the incoming incident file
router.post('/api/incident/process', function (req, res, next) {

  try {
    
    res.json({
      success: true,
      error: false,
      response: {}
    })
  } catch (ex) {
    res.status(500).json({
      success: false,
      error: `An unexpected error has occurred: ${ex}`
    })
  }
});

module.exports = router;
