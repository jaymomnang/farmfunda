'use strict';

//load page defaults
exports.list_all_schedules = function(req, res) {

    var _url = mc_api + "schedule";
    request(_url, function(error, response, body) {

        if (error) return error;
        var schedules = JSON.parse(body);
        var _cl;
        var _vs;
        var limit;

        _url = mc_api + "Vessel";
        request(_url, function(err, resp, b) {
            if (err) return err;
            _vs = JSON.parse(b);

            _url = mc_api + "ports"
            request(_url, function(err, resp, p) {
                if (err) return err;

                var _ports = JSON.parse(p);
                var _routes = getRoutes(_ports);


                _url = mc_api + "price"
                request(_url, function(err, resp, p) {
                    if (err) return err;
                    var _prices = JSON.parse(p);
                    var ui_data = req.session;

                    res.render("schedules", { menus, ui_data, schedules, _vs, _prices, _routes });

                })

            })
        })

    });

};

//post page data
exports.add_schedule = function(req, res) {

    var _data = req.body.vessel.split("/")
    req.body.vessel = _data[0];
    req.body.available_seats = _data[1];

    var _data1 = req.body._route.split(" - ")
    req.body.departure_port = _data1[0];
    req.body.destination = _data1[1];

    var url_partial = "schedule";
    var auth_url = mc_api + url_partial;
    request.post({ headers: { 'content-type': 'application/x-www-form-urlencoded' }, url: auth_url, form: req.body }, function(error, response, body) {
        var schedules = JSON.parse(body);

        var msg = 'Error creating schedule, Please contact your administrator';
        var failed = true;
        if (!error) {
            failed = false;
            var _vs;
            var _url = mc_api + "Vessel";
            request(_url, function(err, resp, b) {
                if (err) return err;
                _vs = JSON.parse(b);

                _url = mc_api + "ports"
                request(_url, function(err, resp, p) {
                    if (err) return err;

                    var _ports = JSON.parse(p);
                    var _routes = getRoutes(_ports);


                    _url = mc_api + "price"
                    request(_url, function(err, resp, p) {
                        if (err) return err;
                        var _prices = JSON.parse(p);
                        var ui_data = req.session;

                        res.render("schedules", { menus, ui_data, schedules, _vs, _prices, _routes });

                    })

                })
            })

        }
    });

};


exports.get_schedule = function(req, res) {

    var url_partial = "schedule/" + req.params.schedule_id;
    var auth_url = mc_api + url_partial;

    request(auth_url, function(error, response, body) {
        var data = JSON.parse(body);
        //prepare display data
        //TODO: load the data needed here.
        res.render(url_partial, { menus, data });
    });


};

//update a schedule on the database
exports.update_schedule = function(req, res) {

    if (req.session.email == undefined) {
        res.render("login");
    } else {
        var url_partial = "schedule/" + req.params.taskId;
        var auth_url = mc_api + url_partial;
        req.body.isActive = false;
        request.put({ headers: { 'content-type': 'application/x-www-form-urlencoded' }, url: auth_url, form: req.body }, function(error, response, body) {
            var data = JSON.parse(body);
            //prepare display data
            res.render(url_partial, data);
        });
    }
};

//remove a schedule from the database
exports.delete_schedule = function(req, res) {
    //TODO: write a process for deleting a task
    if (req.session.email == undefined) {
        res.render("login");
    } else {

    }

};

//get the travel routes of the vessels
function getRoutes(data) {
    var _sp = [];
    var i = 0;
    var index = 0;
    var count = 0;
    var limit = data.length;

    for (i == 0; i < limit; i++) {

        for (index == 0; index < limit; index++) {

            if (data[i].port_name != data[index].port_name) {
                _sp[count] = data[i].port_name + ' - ' + data[index].port_name;
                count = count + 1;
            }

        }
        index = 0;
    }
    return _sp;
};