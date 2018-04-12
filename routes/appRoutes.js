'use strict';
module.exports = function(app) {
    var user = require('../controllers/userController');
    var login = require('../controllers/LoginController');
    var flights = require('../controllers/flightsController');
    var schedules = require('../controllers/schedulesController');
    var dashboard = require('../controllers/DashboardController');

    global.monthNames = ["JANUARY", "FEBRUARY", "MARCH", "APRIL", "MAY", "JUNE",
        "JULY", "AUGUST", "SEPTEMBER", "OCTOBER", "NOVEMBER", "DECEMBER"
    ];

    // Login Routes
    app.route('/')
        .get(dashboard.loadDashboard)
        .post(dashboard.getSchedules);
    
    // schedules Routes
    app.route('/schedules')
        .get(schedules.list_all_schedules)
        .post(schedules.add_schedule)
        .put(schedules.update_schedule)
        .delete(schedules.delete_schedule);
    app.route('/schedules/:schedule_id')
        .get(schedules.get_schedule);

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
    app.route('/flights')
        .get(flights.list_all_flights)
        .post(flights.add_flight)
        .put(flights.update_flight)
        .delete(flights.delete_flight);

    app.route('/flights/:flight_id')
        .get(flights.get_flight);

    
    // Dashboard Routes
    app.route('/dashboard')
        .get(dashboard.loadDashboard);

    // Page Not Routes
    //app.route('/404')
    //.render("404", {'predef': arr});

};