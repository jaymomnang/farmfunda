'use strict';

exports.get_users = function(req, res) {
  if (req.session.email == undefined){
    res.render("login");
  }else{
    //get users data
    var _url2 = mc_api + "login/";
    request(_url2, function (error, response, body) {
      var users = JSON.parse(body);
      if (error) return error;
      var arr = req.session;
      req.session.users = users;
      res.render("users", {menus, users, arr});
    });
  }
};

exports.add_new_user = function(req, res) {

    var new_user = req.body;
    var users;
    var arr;
    if (new_user.pwd != new_user.pwd2){
      var msg = "The password do not match. Please enter the password again";
      var failed = true;
      arr = req.session;
      users = req.session.users;
      res.render("users", {menus, users, arr, failed, msg});

    }else{

      var _url2 = mc_api + "login/";
      new_user.isActive = true;
      new_user.status = "active";

      request.post({headers: {'content-type': 'application/x-www-form-urlencoded'}, url: _url2, form:new_user }, function(error, response, body){
        var failed = true;
        if (error == null){
            failed = false;
            msg = 'successfully added user account';

            request(_url2, function (error, response, body) {
              users = JSON.parse(body);
              if (error) return error;
              req.session.users = users;
              arr = req.session;
              res.render('users', {menus, users, arr, failed, msg});
            });
        }else{
          failed = true;
          msg = 'error creating user account';
          users = req.session.users;
          arr = req.session;
          res.render('users', {menus, users, arr, failed, msg});
        }
      });

    }
  
};

exports.update_user_prof = function(req, res) {
  //TODO: Handle user profile update here
  if (req.session.email == undefined){
    res.render("login");
  }
};

exports.delete_user = function(req, res) {
  //TODO: Handle user profile deletion
  if (req.session.email == undefined){
    res.render("login");
  }
};
