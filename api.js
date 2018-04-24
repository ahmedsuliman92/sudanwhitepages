function api(app) {
    var mongoose = require('mongoose');
    var cookieParser = require('cookie-parser');
    var session = require('express-session');
    var util = require('util');

    var MongoStore = require('connect-mongo')(session);
    //var modal = require('angular-bootstrap-modal');
    var ObjectId = mongoose.Types.ObjectId;
    var Contacts = require('./public/models/Contacts');
    var Sessions = require('./public/models/Sessions');
    var Users = require('./public/models/Users');
    var Login = require('./public/models/Login');

    app.use(cookieParser());
    mongoose.connect('mongodb://localhost/swp_project', function (err) {

        if (err) throw err;

        console.log('Successfully connected');

    });

    app.use(session({
        secret: "Session, its a secret!",
        resave: true,
        saveUninitialized: false,
        store: new MongoStore({
            mongooseConnection: mongoose.connection
        })
    }));

    app.get("/api/contact", function (request, response) {
        Contacts.find({}, function (err, contacts) {
            response.json(contacts);
        });

    });

    app.get("/api/contact/:id", function (request, response) {
        var id = request.params.id;
        console.log("Get : " + id);
        Contacts.findOne({
            _id: ObjectId(id)
        }, function (err, contacts) {
            if (err) console.log("Error: " + err + "Id: " + id);

            response.json(contacts);
        });
    });

    app.post("/api/contact", function (request, response) {
        var Contact = new Contacts({
            ContactName: request.body.ContactName,
            ContactLocation: request.body.ContactLocation,
            ContactJob: request.body.ContactJob,
            ContactNumber: request.body.ContactNumber
        });


        Contact.save(function (err, doc) {
            if (err) console.log("Error: " + err);
            if (err) throw err;

            response.json(doc);
        });



    });

    app.put("/api/contact/:id", function (request, response) {
        var id = request.params.id;
        Contacts.findByIdAndUpdate({
                _id: ObjectId(id)
            }, {
                $set: {
                    ContactName: request.body.ContactName,
                    ContactLocation: request.body.ContactLocation,
                    ContactJob: request.body.ContactJob,
                    ContactNumber: request.body.ContactNumber
                }
            }, {
                new: true
            },
            function (err, doc) {
                if (err) {
                    console.log("Update : Error");
                }
                response.json(doc);
            });


    });

    app.delete("/api/contact/:id", function (request, response) {
        var id = request.params.id;

        console.log(id);

        Contacts.remove({
            _id: new ObjectId(id)
        }, function (err, doc) {
            if (err) {
                console.log("Error: " + err);
            }

            response.json(doc);
        });
    });


    app.get("/api/login", function (request, response) {
        response.json(request.session.usr_fname);
    });

    app.get("/api/token", function (request, response) {
        response.json(request.sessionID);
    });

    app.get("/api/session", function (request, response) {
        //console.log("Welcome " + request.session.usr_fname);
        response.json(request.session);
    });



    app.post("/api/login", function (request, response) {

        console.log("request : " + util.inspect(request.body.usr_password));

        Users.findOne({
            usr_email: request.body.usr_email,
            usr_password: request.body.usr_password
        }, function (err, users) {
            if (err) console.log("Error: " + err);

        console.log("users : " + util.inspect(users));
            if (users != null) {
                var now_date = new Date();
                var expires_date = new Date(now_date.getTime() + 604800000);
                now_date.setDate(now_date.getDate());
                expires_date.setDate(expires_date.getDate());
                response.cookie("lastlogin", now_date.getTime(), {
                    expires: expires_date
                });

                request.session.loginstate = true;
                request.session.usr_fname = users.usr_fname;

                if (request.session.usr_fname) {
                    console.log("Session ID " + util.inspect(request.sessionID));
                    console.log("Welcome " + request.session.usr_fname);
                } else {
                    console.log("You must login first !");
                }

                response.json(users);
            }
            else{

                response.json(null);
            }
        });
        /*
        var Login = new Login({
            usr_name: request.body.usr_name,
            usr_password: request.body.usr_password
        });
        */

        //response.json(request.body.usr_name);
        /*     
        Login.save(function (err, doc) {
            if (err) console.log("Error: " + err);
            if (err) throw err;

            response.json(doc);
        });
        */
        /*
        Contacts.find({}, function (err, contacts) {
            response.json(contacts);
        });
        */

    });


    app.get("/api/logout", function (request, response) {
        console.log(request.session.id);
        Sessions.findByIdAndRemove({
            _id: request.session.id
        },
        function (err, doc) {
            if (err) {
                console.log("Delete : Error");
            }

            console.log(doc);
            response.json(doc);
        });

        Sessions.findByIdAndUpdate({
                _id: request.session.id
            }, {
                $set: {
                    session: "",
                    expires: ""
                }
            }, {
                new: true
            },
            function (err, doc) {
                if (err) {
                    console.log("Update : Error");
                }

                //console.log(doc);
                //response.json(null);
            });

            request.session=null;
        console.log(request.session);

        /*
        Sessions.remove({
            _id: request.session.id
        }, function (err, doc) {
            if (err) {
                console.log("Error: " + err);
            }
            console.log(doc);

            response.json(doc);
        });
        */


    });


}

module.exports = api;