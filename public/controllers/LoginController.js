(function (app) {
    "use strict";

    app.controller("LoginController", LoginController);
    app.controller("ErrorController", ErrorController);


    LoginController.$inject = ["$location", "PathService", "$uibModalInstance", "$uibModal"];

    function LoginController($location, PathService, $uibModalInstance, $uibModal) {
        var vm = this;

        vm.model = {};
        vm.users = {};
        vm.session = {};

        vm.login = function () {
            
            PathService.loginUser(vm.model).then(function (result) {
                if (result.data == null) {
                    var modalInstance = $uibModal.open({
                        animation: true,
                        ariaLabelledBy: 'modal-title-top',
                        ariaDescribedBy: 'modal-body-top',
                        templateUrl: "views/error.html",
                        size: 'sm',
                        controller: "ErrorController",
                        controllerAs: "vm"
                    });
                    modalInstance.result.then(function (selectedItem) {
                        $uibModalInstance.close();
                    }, function () {
                        //console.log("modal close ");
                        //$uibModalInstance.close();
                    });
                } else {
                    //console.log("login " + vm.users.usr_email);
                    vm.users = result.data;

                    vm.getSession();

                    $uibModalInstance.close();
                    window.location= "/";

                    //vm.getToken();
                    //console.log("hello " + session.usr_fname);
                    //console.log("hello " + result.data);
                    /*
                                        var session_id = vm.getToken();
                                        console.log("Session ID " +vm.getToken() );
                                        //window.location= "#!/Login";
                                       */
                    //PathService.getToken().then(function (result) {
                    //console.log("Session ID " +JSON.stringify(result.data) );
                    //vm.token =result;
                    //});

                    //console.log("Session ID  >> " +JSON.stringify(vm.token) );
                }

            });



        };

        /*
                vm.getToken = function () {
                    PathService.getToken().then(function (result) {

                        vm.token = result.data;
                        //console.log("Session ID " +JSON.stringify(result.data) );
                        //token =JSON.stringify(result.data);
                    });

                       // console.log("Session ID >> " +token );
                    //return token;
                };
                */

        vm.getSession = function () {
            PathService.getSession().then(function (result) {

                vm.session = result.data;
            });

            // console.log("Session ID >> " +token );
            //return token;
        };

        vm.cancel = function () {
            $location.path("/");
        };

        vm.closeModal = function () {
            $uibModalInstance.close();
        };

        vm.getCookie = function (name) {

            var v = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
            //return v ? v[2] : null;


            var data = {
                "date_created": v[2].toString()
            };
            var date = new Date(parseInt(data.date_created));
            return date.toLocaleString();
        };

        vm.closeModal = function () {
            $uibModalInstance.close();
        };

    }

    ErrorController.$inject = ["$location", "PathService", "$uibModalInstance"];

    function ErrorController($location, PathService, $uibModalInstance) {
        var vm = this;
        vm.closeModal = function () {
            $uibModalInstance.close();
        };

    }



})(angular.module("swp_manager"));