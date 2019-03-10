var express = require('express');
var router = express.Router();

//process the incoming incident file
router.post('/api/incident/process', function(req, res, next) {
  res.json({
    success : true,
    error : false,
    response : {}
  })
});

module.exports = router;
