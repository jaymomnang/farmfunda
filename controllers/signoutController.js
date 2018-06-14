'use strict';

//load page defaults
exports.logOff = function (req, res) {
  req.session.destroy();
  res.url = "/";
  res.redirect("/");
};

//post page data
exports.Login = function (req, res) {
  req.session.destroy();
  res.url = "/";
  res.redirect("accounts");
};
