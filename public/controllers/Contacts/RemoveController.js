(function (app) {
    "use strict";

    app.controller("RemoveController", RemoveController);

    RemoveController.$inject = ["$location", "$routeParams", "PathService", "id", "$uibModalInstance"];

    function RemoveController($location, $routeParams, PathService, id, $uibModalInstance) {
        var vm = this;

        //var id = $routeParams.id;

        vm.model = {};

        PathService.getContact(id).then(function (result) {
            vm.model = result.data;
        });


        vm.remove = function () {
            PathService.deleteContact(id).then(function (result) {
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
