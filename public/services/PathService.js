(function (app) {
    "use strict";

    app.service("PathService", PathService);

    PathService.$inject = ["$log", "$http"];

    function PathService($log, $http) {
        var ps = this;

        var apiUrl = "/api/";

        ps.getContacts = function () {
            return $http.get(apiUrl + "contact/");
        };
        
        ps.getToken = function () {
            return $http.get(apiUrl + "token");
        };
        
        ps.getSession = function () {
            return $http.get(apiUrl + "session");
        };

        ps.getContact = function (id) {
            return $http.get(apiUrl + "contact/" + id);
        };

        ps.createContact = function (model) {
            return $http.post(apiUrl + "contact", model);
        };

        ps.updateContact = function (id, model) {
            return $http.put(apiUrl + "contact/" + id, model);
        };

        ps.deleteContact = function (id) {
            return $http.delete(apiUrl + "contact/" + id);
        };

        ps.loginUser = function (model) {
            return $http.post(apiUrl + "login", model);
        };

        ps.logoutUser = function () {
            return $http.get(apiUrl + "logout");
        };

    }
})(angular.module("swp_manager"));
