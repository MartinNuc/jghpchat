
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index');
};

exports.partials = function (req, res, next) {
  res.render('partials' + req.params[0]);
};
