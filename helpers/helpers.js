//var xmlParser = require('xml2json');
var fs = require('fs');

//get objects from database
exports.getObjectFromDB = function(_url) {
    return new Promise(function(resolve, reject) {
        request(_url, function(error, response, body) {
            if (error) reject(error);
            resolve(JSON.parse(body));
        });
    });
}

//exports.getXMLData = function(_url) {
//    return new Promise(function(resolve, reject) {
//        fs.readFile(_url, 'utf8', function(err, data) {
//            if (err) reject(err);
//            var json = xmlParser.toJson(data);
//            resolve(json);
//        });
//    });
//}

exports.filterArray = function(arr, param) {
    var i = 0;
    var data = [];
    for (i == 0; i < arr.length; i++) {
        if (arr[i].region == param) {
            data.push(arr[i]);
        }
    }
    return data;
}

exports.splitDetails = function(data) {
    console.log(data);
    return data.name.split(",");

}

exports.saveData = function(data, _url) {
    return new Promise(function(resolve, reject) {
        request.post({ headers: { 'content-type': 'application/x-www-form-urlencoded' }, url: _url, form: data }, function(error, response, body) {
            if (error) reject(error);
            resolve(JSON.parse(body));
        });
    });

}

exports.updateData = function(data, _url) {
    return new Promise(function(resolve, reject) {
        request.put({ headers: { 'content-type': 'application/x-www-form-urlencoded' }, url: _url, form: data }, function(error, response, body) {
            if (error) reject(error);
            resolve(JSON.parse(body));
        });
    });
}

exports.deleteData = function(data, _url) {
    return new Promise(function(resolve, reject) {
        request.put({ headers: { 'content-type': 'application/x-www-form-urlencoded' }, url: _url, form: data }, function(error, response, body) {
            if (error) reject(error);
            resolve(JSON.parse(body));
        });
    });
}

exports.monthNames = ["JANUARY", "FEBRUARY", "MARCH", "APRIL", "MAY", "JUNE",
    "JULY", "AUGUST", "SEPTEMBER", "OCTOBER", "NOVEMBER", "DECEMBER"
];

//add 1 hour to the current time frame
exports.addHour = function(value) {
    var endVal = value.substring(3, 5);
    var currentVal = parseInt(value.substring(0, 2)) + 1;
    var rVal = currentVal.toString();
    if (rVal.length == 1) {
        rVal = "0" + rVal + ":" + endVal;
    } else {
        rVal = rVal + ":" + endVal;
    }
    return rVal;
}

//get the travel routes of the vessels
exports.getRoutes = function(data) {
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