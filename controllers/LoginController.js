'use strict';

exports.loadLogin = function(req, res) {

    if (req.session == undefined) {
        var uidata = req.session;
        req.session.destroy();
        res.render("accounts", { uidata });

    } else {

        if (req.session.loggedIn == true) {
            var uidata = req.session;
            var _redirectURL = req.session.prev_page;
            if (_redirectURL == undefined) {
                _redirectURL = "/";
            }
            res.redirect(_redirectURL);

        } else {
            var uidata = req.session;
            res.render("accounts", { uidata });
        }
    }

};

exports.authenticate = function(req, res) {

    if (req.body._route == "login") {

        //var _url = "loginViaPhone";
        var _url = mc_api + "login/" + req.body.email + "/" + req.body.password;
        var usr;
        var obj = helpers.getObjectFromDB(_url);

        obj.then(function(result) {

            if (result != null) {
                //prepare user data
                createSession(req, result);

                req.session.loggedIn = true;
                var session = req.session;
                res.statusMessage = "login successful";
                res.statusCode = 200;

                var _redirectURL = req.session.prev_page;
                if (_redirectURL == undefined) {
                    _redirectURL = "/";
                }


                res.url = "/";
                res.redirect(_redirectURL);

            } else {
                res.render("accounts", { msgTitle: 'Login Failed', msg: 'User authentication failed! Incorrect username or password' });
            }
        });
    } else {

        //create user profile.
        var data = req.body;
        var _url = mc_api + "users/" + req.body.email;
        var _user = helpers.getObjectFromDB(_url);

        _user.then(function(result) {
            if (result.length == 0) {
                createUser(req, data);
                res.render("accounts", { msgTitle: 'Account Created', msg: 'User account created successfully!' });
            } else {
                res.render("accounts", { msgTitle: 'Duplicate User', msg: 'User with email address ' + req.body.email + ' already exist!' });
            }
        });
    }

};

//create a new user account
var createUser = function(req, data) {
    var _url = mc_api + "users/";
    var _user;
    var obj = helpers.saveData(data, _url);
    obj.then(function(result) {
        _user = result;
        return _user;
    });
};

var createSession = function(req, info) {

    req.session.email = info.email;
    req.session.username = info.firstname + " " + info.lastname;
    req.session.status = info.isActive;
    req.session.companyname = info.companyname;
    req.session.loggedIn = true;
    req.session.role = info.role;

    var d = new Date();
    var y = d.getFullYear();
    var dd = d.getDate();
    var hh = d.getHours();
    var mm = d.getMinutes();
    var ss = d.getSeconds();
    var m = d.getMonth();
    var mn = monthNames[d.getMonth()];
    var _time = hh + ':' + mm + ':' + ss;

    req.session.token = {
        'year': y,
        'month': m,
        'monthname': mn,
        'day': dd,
        'time': _time,
        'hour': hh,
    };
}