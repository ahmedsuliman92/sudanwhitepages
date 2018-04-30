(function (app) {
    "use strict";

    app.controller("HomeController", HomeController);

    HomeController.$inject = ["$location", "PathService", "$uibModal"];

    function HomeController($location, PathService, $uibModal) {
        var vm = this;
        vm.contacts = [];
        vm.session = {};
        vm.loginstate = false;
        vm.skin = "green";
        vm.home = "active";
        //vm.usr_fname = vm.session.usr_fname;


        //vm.getSession();

        PathService.getContacts().then(function (result) {
            vm.contacts = result.data;
        });


        PathService.getSession().then(function (result) {

            vm.session = result.data;
            if (vm.session.loginstate != null) {
                vm.usr_fname = vm.session.usr_fname;
                vm.loginstate = vm.session.loginstate;
                vm.skin = "red";
            }
        });





        vm.add = function () {
            //$location.path("/contact/add/");

            var modalInstance = $uibModal.open({
                animation: true,
                ariaLabelledBy: 'modal-title-top',
                ariaDescribedBy: 'modal-body-top',
                templateUrl: "views/contact/add.html",
                size: 'md',
                controller: "AddController",
                controllerAs: "vm"

            });
            modalInstance.result.then(function (selectedItem) {
                PathService.getContacts().then(function (result) {
                    vm.contacts = result.data;
                });
            }, function () {});




        };



        vm.details = function (id) {
            //$location.path("/contact/details/" + id);

            var modalInstance = $uibModal.open({
                animation: true,
                ariaLabelledBy: 'modal-title-top',
                ariaDescribedBy: 'modal-body-top',
                templateUrl: "views/contact/details.html",
                size: 'md',
                controller: "DetailsController",
                controllerAs: "vm",
                resolve: {
                    id: function () {
                        return id;
                    }
                }
            });
            modalInstance.result.then(function (selectedItem) {}, function () {
                //console.log("modal close ");
            });


        };

        vm.edit = function (id) {
            //$location.path("/contact/edit/" + id);
            var modalInstance = $uibModal.open({
                animation: true,
                ariaLabelledBy: 'modal-title-top',
                ariaDescribedBy: 'modal-body-top',
                templateUrl: "views/contact/edit.html",
                size: 'md',
                controller: "EditController",
                controllerAs: "vm",
                resolve: {
                    id: function () {
                        return id;
                    }
                }
            });
            modalInstance.result.then(function (selectedItem) {
                PathService.getContacts().then(function (result) {
                    vm.contacts = result.data;
                });
            }, function () {});
        };

        vm.remove = function (id) {
            //$location.path("/contact/remove/" + id);
            var template;
            if (vm.loginstate) {
                template = "views/contact/remove.html";
            } else {
                template = "views/contact/block.html";
            }
            var modalInstance = $uibModal.open({
                animation: true,
                ariaLabelledBy: 'modal-title-top',
                ariaDescribedBy: 'modal-body-top',
                templateUrl: template,
                size: 'md',
                controller: "RemoveController",
                controllerAs: "vm",
                resolve: {
                    id: function () {
                        return id;
                    }
                }
            });
            modalInstance.result.then(function (selectedItem) {
                PathService.getContacts().then(function (result) {
                    vm.contacts = result.data;
                });
            }, function () {});
        };


        vm.logout = function () {
            PathService.logoutUser().then(function (result) {
                //$location.path("/");
                window.location = "/";
            });


        };


        vm.log_in = function () {
            var modalInstance = $uibModal.open({
                animation: true,
                ariaLabelledBy: 'modal-title-top',
                ariaDescribedBy: 'modal-body-top',
                templateUrl: "views/login.html",
                size: 'md',
                controller: "LoginController",
                controllerAs: "vm"

            });
            modalInstance.result.then(function (selectedItem) {
                $location.path("/Home");
            }, function () {
                $location.path("/");
            });
        };


    }
})(angular.module("swp_manager"));