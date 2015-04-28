
exports.index = function(req, res){
  res.render('index');
};

// angular partials
exports.partials = function (req, res, next) {
  res.render('partials' + req.params[0]);
};
