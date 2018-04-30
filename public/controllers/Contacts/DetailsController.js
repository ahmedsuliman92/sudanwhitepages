(function (app) {
    "use strict";

    app.controller("DetailsController", DetailsController);

    DetailsController.$inject = ["$routeParams", "$location", "PathService", "id", "$uibModalInstance", "$uibModal"];

    function DetailsController($routeParams, $location, PathService, id, $uibModalInstance, $uibModal) {
        var vm = this;
        //var id = $routeParams.id;
        //vm.id = id;
        //var id = scope.$eval(iAttrs.id)
        vm.model = {};

        PathService.getContact(id).then(function (result) {
            vm.model = result.data;
        });

        vm.edit = function () {
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
                $uibModalInstance.close();
            }, function () {
                //console.log("modal close ");

            });

            vm.closeModal();
        };

        vm.cancel = function () {
            $location.path("/");
        };

        vm.closeModal = function () {
            $uibModalInstance.close();
        };
    }


})(angular.module("swp_manager"));