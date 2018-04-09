'use strict';

//load page defaults
exports.list_all_flights = function (req, res) {  

  var initializePromise = initialize();
  initializePromise.then(function (result) {
    userDetails = result;
    console.log("Initialized user details");
    // Use user details from here
    console.log(userDetails)

    var ui_data = req.session;
    res.render("flights", { menus, ui_data });
  }, function (err) {
    console.log(err);
  })
};

var userDetails;
var initialize = function() {  
  var _url = mc_api + "schedule/";
  // Return new promise 
  return new Promise(function (resolve, reject) {

    request(_url, function (error, response, body) {
      if (error) reject(error);
      resolve(JSON.parse(body));
    });   
  })
}

//post page data
exports.add_flight = function (req, res) {

  if (req.session.email == undefined) {
    res.render("login");
  } else {
    var url_partial = "flight/";
    var auth_url = mc_api + url_partial;
    request.post({ headers: { 'content-type': 'application/x-www-form-urlencoded' }, url: auth_url, form: req.body }, function (error, response, body) {
      req.session.flight = JSON.parse(body);
      var msg = 'Error creating flight, Please contact your administrator';
      var failed = true;
      if (!error) {
        failed = false;
        msg = 'flight successfully created';
        var token = req.session.flight;
        var ui_data = req.session;
        res.render('flight', { menus, ui_data, failed, msg });
      }
    });
  }
};


exports.get_flight = function (req, res) {

  var url_partial = "flight/" + req.params.flight_id;
  var auth_url = mc_api + url_partial;

  request(auth_url, function (error, response, body) {
    var data = JSON.parse(body);
    //prepare display data
    //TODO: load the data needed here.
    res.render(url_partial, { menus, data });
  });

};

exports.update_flight = function (req, res) {

  if (req.session.email == undefined) {
    res.render("login");
  } else {
    var url_partial = "flight/" + req.params.taskId;
    var auth_url = mc_api + url_partial;
    req.body.isActive = false;
    request.put({ headers: { 'content-type': 'application/x-www-form-urlencoded' }, url: auth_url, form: req.body }, function (error, response, body) {
      var data = JSON.parse(body);
      //prepare display data
      res.render(url_partial, data);
    });
  }
};

exports.delete_flight = function (req, res) {
  //TODO: write a process for deleting a task
  if (req.session.email == undefined) {
    res.render("login");
  } else {

  }

};
