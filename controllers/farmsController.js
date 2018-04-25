'use strict';

//load page defaults
exports.list_all_farms = function(req, res) {

    var _url = mc_api + "farms";

    var farms = helpers.getObjectFromDB(_url);
    farms.then(function(result) {
        req.session.farms = result;
        var uidata = req.session;
        return res.render("farms", { uidata });

    }, function(err) {
        console.log(err);
    });
};

//post page data
exports.add_farm = function(req, res) {

    if (req.session.loggedIn == undefined || req.session.loggedIn == false) {
        return res.redirect("accounts");
    } else {
        var _url = mc_api + "farms";
        var data = req.body;
        var farms = helpers.saveData(data, _url);

        farms.then(function(result) {
            req.session.farms = result;
            var uidata = req.session;
            return res.render("farms", { uidata });

        }, function(err) {
            console.log(err);
        });
    }

};

//query db for specific farm data
exports.get_farm = function(req, res) {

    var _url = mc_api + "farms/" + req.params.farm_id;
    var farms = helpers.getObjectFromDB(_url);
    farms.then(function(result) {
        req.session.req_farm = result;
        var uidata = req.session;
        return res.render("farms", { uidata });

    }, function(err) {
        console.log(err);
    });
};

//update a farm on the db
exports.update_farm = function(req, res) {

    if (req.session.loggedIn == undefined || req.session.loggedIn == false) {
        return res.redirect("accounts");
    } else {
        var _url = mc_api + "farms/" + req.params.farm_id;
        var data = req.body;
        var farms = helpers.updateData(data, _url);

        farms.then(function(result) {
            req.session.req_farm = result;
            var uidata = req.session;
            return res.render("farms", { uidata });
        }, function(err) {
            console.log(err);
        });


    }
};

//remove a schedule from the database
exports.delete_farm = function(req, res) {
    //TODO: write a process for deleting a task
    if (req.session.loggedIn == undefined || req.session.loggedIn == false) {
        return res.redirect("accounts");
    } else {

        var _url = mc_api + "farms/" + req.params.farm_id;
        var data = req.body;
        data.isActive = false;
        var farms = helpers.updateData(data, _url);

        farms.then(function(result) {
            req.session.req_farm = result;
            var uidata = req.session;
            return res.render("farms", { uidata });
        }, function(err) {
            console.log(err);
        });

    }
};