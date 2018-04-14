'use strict';
exports.loadDashboard = function (req, res) {
    //TODO: Get dashboard data
    var uidata = req.session;
    res.render("index", { uidata });

    //var _url = mc_api + "ports/";
    //var p = helpers.getObjectFromDB(_url);
    //p.then(function(result){
    //    var _ports = result;
    //    var _p = helpers.getRoutes(_ports);
    //    var ui_data = req.session;
    //    res.render("index", { menus, ui_data, _p });
    //})

};

exports.getSchedules = function (req, res) {
    if (req.body.booktrip == undefined) {
        getTrips(req, res);
    } else {
        bookTrip(req, res);
    }
};

//queries database for available trips
var getTrips = function (req, res) {
    //TODO: load all flight/travel schedules.
    var _data = req.body._route.split(" - ")
    req.body.departure_port = _data[0];
    req.body.destination = _data[1];
    req.body.count = 1;
    var isReturn = req.body.return_;
    var trips = [];

    var b2 = [];
    b2.destination = _data[0];
    b2.departure_port = _data[1];
    b2.departure_date = req.body.return_date;

    var _url = mc_api + "schedule/getTrips/single";
    request.post({ headers: { 'content-type': 'application/x-www-form-urlencoded' }, url: _url, form: req.body }, function (error, response, body) {

        if (error) return error;
        var data = JSON.parse(body);

        for (var i = 0; i < data.length; i++) {
            if (data[i].schedule_id != 'undefined') {
                data[i].arrivalTime = helpers.addHour(data[i].departure_time);
            }
        }

        trips.push(data);
        if (isReturn == "true") {

            request.post({ headers: { 'content-type': 'application/x-www-form-urlencoded' }, url: _url, form: b2 }, function (error, response, body) {
                if (error) return error;
                var data1 = JSON.parse(body);
                for (var i = 0; i < data1.length; i++) {
                    if (data1[i].schedule_id != 'undefined') {
                        data1[i].arrivalTime = helpers.addHour(data1[i].departure_time);
                    }
                }
                trips.push(data1);

                var ui_data = req.session;
                res.render("trips", { menus, ui_data, trips });
            })
        } else {
            var ui_data = req.session;
            res.render("trips", { menus, ui_data, trips });
        }
    });

}

//book selected trips
var bookTrip = function (req, res) {

    var firstleg = req.body.firstleg;
    var secondleg = req.body.secondleg;
    var trips = [];
    var prices, trip1, trip2;

    var _url = mc_api + "price/";
    var obj = helpers.getObjectFromDB(_url);
    obj.then(function (result) {
        prices = result;
    }, function (err) {
        console.log(err);
    }).then(function () {
        _url = mc_api + "schedule/" + firstleg;
        var obj1 = helpers.getObjectFromDB(_url);
        obj1.then(function (result) {
            trip1 = result;
        }, function (err) {
            console.log(err);
        }).then(function () {
            _url = mc_api + "schedule/" + secondleg;
            var obj2 = helpers.getObjectFromDB(_url);
            obj2.then(function (result) {
                trip2 = result;

                trips[0] = trip1;
                trips[1] = trip2;
                var ui_data = req.session;
                res.render("book", { menus, ui_data, trips, prices });

            }, function (err) {
                console.log(err);
            })
        })
    })
}
