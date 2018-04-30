(function (app) {
    "use strict";

    app.controller("AddController", AddController);
    AddController.$inject = ["$location", "PathService", "$uibModalInstance"];
   



    function AddController($location, PathService, $uibModalInstance) {
        var vm = this;
        vm.contacts = [];
        vm.model = {};

        vm.save = function () {
            PathService.createContact(vm.model).then(function (result) {
                $uibModalInstance.close();
            });



        };

        vm.cancel = function () {
            $location.path("/");
        };

        vm.closeModal = function () {
            $uibModalInstance.close();
        };

    }



})(angular.module("swp_manager"));
