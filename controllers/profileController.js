'use strict';

//load page defaults
exports.getPortfolio = function(req, res) {

    var uidata = req.session;
    res.render("profile", { uidata });
};

//post page data
exports.loadProject = function(req, res) {
    req.session.destroy();
    res.url = "/";
    res.redirect("accounts");
};