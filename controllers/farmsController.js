'use strict';

//load page defaults
exports.list_all_farms = function(req, res) {
    var districts, regions;


    //_url = './helpers/regions.xml';
    //var obj2 = helpers.getXMLData(_url);

    var _url = mc_api + "farms";
    var farms = helpers.getObjectFromDB(_url);
    farms.then(function(result) {
        req.session.farms = result;
        _url = mc_api + 'regions';
        var obj1 = helpers.getObjectFromDB(_url);

        obj1.then(function(result) {
            req.session.regions = result;
            req.session.reg = result;
            var uidata = req.session;
            return res.render("farms", { uidata });
        }, function(err) {
            console.log(err);
        });
    }, function(err) {
        console.log(err);
    });
};

//post page data
exports.add_farm = function(req, res) {

    var getDistricts = req.body.getDistricts;
    var rg = req.body.region;

    if (req.session.loggedIn == undefined || req.session.loggedIn == false) {
        return res.redirect("accounts");
    } else {

        if (getDistricts == "true") {

            var regions = req.session.reg;
            var region = helpers.filterArray(regions, rg);

            console.log("---------new region-----------");
            req.session.districts = helpers.splitDetails(region[0].districts);
            console.log(req.session.districts);
            var uidata = req.session;
            return res.render("farms", { uidata });
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