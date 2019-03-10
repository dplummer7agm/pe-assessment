var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('*', function(req, res, next) {
  res.status(404)
  .json({
    error : "This API endpoint doesn't exist.",
    success : false
  })
});

module.exports = router;
