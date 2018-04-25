'use strict';
module.exports = function(app) {
    var user = require('../controllers/userController');
    var login = require('../controllers/LoginController');
    var signout = require('../controllers/signoutController');
    var farms = require('../controllers/farmsController');
    var home = require('../controllers/homeController');

    // Login Routes
    app.route('/')
        .get(home.loadDefault)
        .post(home.getSchedules);

    // farms Routes
    app.route('/farms')
        .get(farms.list_all_farms)
        .post(farms.add_farm)
        .put(farms.update_farm)
        .delete(farms.delete_farm);

    app.route('/schedules/:schedule_id')
        .get(farms.get_farm);

    // Users Routes
    app.route('/manage_usr')
        .get(user.get_users)
        .post(user.add_new_user);

    app.route('/manage_usr/:email')
        .put(user.update_user_prof)
        .delete(user.delete_user);

    // Login Routes
    app.route('/accounts')
        .get(login.loadLogin)
        .post(login.authenticate);

    // flights Routes
    app.route('/signout')
        .get(signout.logOff)
        .post(signout.Login);

    app.route('/profile')
        .get(user.get_users);

    // Dashboard Routes
    app.route('/home')
        .get(home.loadDefault);

    // Page Not Routes
    //app.route('/404')
    //.render("404", {'predef': arr});

};