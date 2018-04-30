
var module = angular.module("swp_manager", [
    "ngRoute",
    "ngAnimate",
    "ngCookies",
    "ui.bootstrap"
]);

(function (app) {
    
    

    app.config(function ($routeProvider) {
        var base = "/views/";

        
        $routeProvider
        .when("/", {
            templateUrl: base + "contact/index.html",
            controller: "HomeController",
            controllerAs: "vm"
        })
        .when("/Home", {
            templateUrl: base + "contact/index.html",
            controller: "HomeController",
            controllerAs: "vm"
        })
        .when("/About", {
            templateUrl: base + "about.html",
            controller: "HomeController",
            controllerAs: "vm"
        });
        /*
        .when("/Login", {
            //templateUrl: base + "login.html",
            controller: "LoginController",
            controllerAs: "vm"
        });
        */
            /*
            .when("/contact/add", {
                templateUrl: base + "contact/add.html",
                controller: "ContactAddController",
                controllerAs: "vm"
            })
            .when("/contact/details/:id", {
                templateUrl: base + "contact/details.html",
                controller: "ContactDetailsController",
                controllerAs: "vm"
            })
            .when("/contact/edit/:id", {
                templateUrl: base + "contact/edit.html",
                controller: "ContactEditController",
                controllerAs: "vm"
            })
            .when("/contact/remove/:id", {
                templateUrl: base + "contact/remove.html",
                controller: "ContactRemoveController",
                controllerAs: "vm"
            });
    */
    
        });
})(angular.module("swp_manager"));
