var app = angular.module('myApp');

app.controller('signupCtrl', ['$scope', '$http', 'signUpService', function($scope, $http, signUpService) {

    var resetusername = false;
    var resetemailAddress = false;
    var resetorganization = false;
    var resetlocation = false;
    var resetpassword = false;
    var resetotp = false;
    var resetSubButton = false;

    $scope.details = {};
    $scope.details.username = "";
    $scope.details.emailAddress = "";
    $scope.details.organization = "";
    $scope.details.location = "";
    $scope.details.password = "";
    $scope.details.otp = "";

    $scope.submitSignUP = function() {
        var datas = {
            "username": $scope.details.username,
            "password": $scope.details.password,
            "email": $scope.details.emailAddress,
            "location": $scope.details.location,
            "organization": $scope.details.organization
        };
        console.log(datas);
        signUpService.singupServiceFunction(datas).success(function(response) {
            console.log(response);
            alert("Check registered mail id for OTP.");
            $scope.resetusername = true;
            $scope.resetemailAddress = true;
            $scope.resetorganization = true;
            $scope.resetlocation = true;
            $scope.resetpassword = true;
            $scope.resetotp = true;
            $scope.resetSubButton = true;

        }).error(function(data) {

            alert("SignUp Failed.")

        });
    }

    $scope.otpConfirmation = function() {
        var formdata = {
            "username": $scope.details.username,
            "otp": $scope.details.otp

        };
        console.log(formdata);
        signUpService.otpConfirmationServiceFunction(formdata).then(function(response) {
            console.log(response);
            $('body').css('overflow', 'auto');
            document.getElementById('abc').style.display = "none";
            $scope.details.username = "";
            $scope.details.emailAddress = "";
            $scope.details.organization = "";
            $scope.details.location = "";
            $scope.details.password = "";
            $scope.details.otp = "";

            alert("Registered Successfully.");
			$scope.resetusername = false;
            $scope.resetemailAddress = false;
            $scope.resetorganization = false;
            $scope.resetlocation = false;
            $scope.resetpassword = false;
            $scope.resetotp = false;
            $scope.resetSubButton = false;
        })
    };
}]).factory('signUpService', function($http) {
    var service = {};

    service.singupServiceFunction = function(datas) {
        return $http({
            method: 'POST',
            data: datas,
            url: 'http://ec2-34-248-114-187.eu-west-1.compute.amazonaws.com:5000/api/signup',
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            }
        })
    };

    service.otpConfirmationServiceFunction = function(formdata) {
        return $http({
            method: 'POST',
            data: formdata,
            url: 'http://ec2-34-248-114-187.eu-west-1.compute.amazonaws.com:5000/api/userConfirmation',
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            }
        })
    };
    return service;

}).directive('passwordToggle', function($compile) {
    return {
        restrict: 'A',
        scope: {},
        link: function(scope, elem, attrs) {
            scope.tgl = function() {
                elem.attr('type', (elem.attr('type') === 'text' ? 'password' : 'text'));
            }
            var lnk = angular.element('<a data-ng-click="tgl()">Toggle</a>');
            $compile(lnk)(scope);
            elem.wrap('<div class="password-toggle"/>').after(lnk);
        }
    }
});