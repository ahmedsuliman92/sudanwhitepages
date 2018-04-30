(function (app) {
    "use strict";

    app.controller("EditController", EditController);

    EditController.$inject = ["$routeParams", "$location", "PathService", "id", "$uibModalInstance"];

    function EditController($routeParams, $location, PathService, id, $uibModalInstance) {
        var vm = this;

        //var id = $routeParams.id;

        vm.model = {};

        PathService.getContact(id).then(function (result) {
            vm.model = result.data;
        });

        vm.save = function () {

            PathService.updateContact(id, vm.model).then(function (result) {

               // $location.path("/contact/details/" + id);
                
               $uibModalInstance.close();
            });
        };

        vm.cancel = function () {
            $uibModalInstance.close();
            //$location.path("/contact/details/" + id);
        };


        vm.closeModal = function () {
            $uibModalInstance.close();
        };
    }
})(angular.module("swp_manager"));
