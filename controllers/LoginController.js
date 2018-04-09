'use strict';

exports.getCurrentUser = function (req, res) {
  req.session.destroy();
  res.render("login");
};

exports.authenticate = function (req, res) {

  if (req.body._route == "login") {
    var auth_url = mc_api + "login/" + req.body.email + "/" + req.body.pwd;
    request(auth_url, function (error, response, body) {
      
      var info = JSON.parse(body);
      if (info.length == 1) {
        //prepare display data
        createSession(req, info)
        
        req.session.loggedIn = true;
        var session = req.session;
        res.statusMessage = "login successful";
        res.statusCode = 200;
        res.url = "/dashboard";
        res.redirect("dashboard");
        
      } else {
        req.session.message = "Incorrect username or password";
        res.render("login");
        console.log(req.session.message);
      }

    });
  } else {

    //prepare attendance data
    console.log("create new user account");
    var data = req.body;
    console.log(data);
    createUser(req, data);
    res.render("login");

  }

};

//create a new user account
var createUser = function (req, data) {
  var auth_url = mc_api + "users/";
  request.post({ headers: { 'content-type': 'application/x-www-form-urlencoded' }, url: auth_url, form: data }, function (error, response, body) {
    var data = JSON.parse(body);
    console.log(data);
    if (data.email != '') {
      req.session.message = "User account created successfully";
    }
  });
};

var createSession = function (req, info) {

  req.session.email = info[0].email;
  req.session.username = info[0].firstname + " " + info[0].lastname;
  req.session.status = info[0].status;
  req.session.loggedIn = true;
  req.session.role = info[0].role;

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
