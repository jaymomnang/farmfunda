var express = require('express'),
    app = express(),
    port = process.env.PORT || 7100,
    engines = require('consolidate'),
    session = require('express-session'),
    routes = require('./routes/appRoutes'),
    assert = require('assert'),
    nunjucks = require('nunjucks');

global.bodyParser = require('body-parser');
global.request = require('request');
//global.mc_api = "http://localhost:7000/";
global.mc_api = "https://ff-api.azurewebsites.net/";
global.urlpath = "http://localhost:7100/";
global.helpers = require('./helpers/helpers');

global.monthNames = ["JANUARY", "FEBRUARY", "MARCH", "APRIL", "MAY", "JUNE",
    "JULY", "AUGUST", "SEPTEMBER", "OCTOBER", "NOVEMBER", "DECEMBER"
];


//configure and create custom nunjucks filters
engines.requires.nunjucks = nunjucks.configure();

engines.requires.nunjucks.addFilter('shortDate', function(dateValue) {
    var d = dateValue.substring(0, 10);
    return d;
});

engines.requires.nunjucks.addFilter('addDay', function(value) {
    var d = new Date(value);
    d = d.setDate(d.getDate() + 1);
    return d;
});

engines.requires.nunjucks.addFilter('toTitleCase', function(str) {
    str = str.toLowerCase().split(' ');
    for (var i = 0; i < str.length; i++) {
        str[i] = str[i].charAt(0).toUpperCase() + str[i].slice(1);
    }
    return str.join(' ');
});

//initialize bodyParser and errorHandler
app.engine('html', engines.nunjucks);
app.set('view engine', 'html');
app.set('views', __dirname + '/views');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/resources'));
app.use(bodyParser.json());


app.use(session({ secret: 'as465farmasdwqwdfundazcafd56a5df45a46df22535' }));
//app.use(errorHandler);

var urlencodedParser = bodyParser.urlencoded({ extended: false });

routes(app);

app.listen(port);
console.log('farmfunda client running on port ' + port);