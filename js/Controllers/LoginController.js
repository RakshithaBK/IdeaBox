var app = angular.module('myApp');

app.controller('loginCtrl', ['$scope', '$http', '$location', function($scope, $http, $location) {


    $scope.loginCheck = function() {
        if (localStorage.loggedIn) {
            $('#shareyouridea').removeClass('hideMainSection');
            $('#yourideas').removeClass('hideMainSection');
            $('#awards').removeClass('hideMainSection');

        } else {
            alert("Please Sign In/Sign Up to continue.");
        }
    }

    var resetPass = false;
    var hideUser = false;
    var hidePass = false;
    var hideLogin = false;
    var forgotPass = false;
    var resetotp = false;
    var resetSubButton = false;
    var forgotUser = false;
    var forgotUserSubmit = false;
    var resetotpPass = false;
    var resetotpSubmit = false;

    $scope.login_details = {};
    $scope.login_details.username = "";
    $scope.login_details.emailAddress = "";
    $scope.login_details.password = "";

    $scope.forgotPwd = function() {
        $scope.resetPass = true;
        $scope.hideUser = true;
        $scope.hidePass = true;
        $scope.hideLogin = true;
        $scope.forgotPass = true;
        $scope.resetotpPass = true;
        $scope.resetotpSubmit = true;
        $scope.resetotp = true;
    }

    $scope.changePwd = function() {
        var formdata = {
            "code": $scope.details.otp,
            "password": $scope.details.newPassword
        };
        console.log(formdata);

        $http({
                method: "POST",
                url: 'http://ec2-34-248-114-187.eu-west-1.compute.amazonaws.com:5000/api/changePassword',
                data: formdata,
                dataType: "json",
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .success(function(data) {
                console.log("SUCCESS");
                alert("Password changed successfully.");
                $scope.hideUser = false;
                $scope.hidePass = false;
                $scope.hideLogin = false;
                $scope.resetotpPass = true;
                $scope.resetotpSubmit = true;
                $scope.resetotp = true;

            })
            .error(function(error) {
                console.log("ERROR!!!");
                $scope.login_details.username = "";
                alert("Failed to change password.")
            });
    }
    $scope.submiMailID = function() {
        var formdata = {
            "username": $scope.login_details.username
        };
        console.log(formdata);

        $http({
                method: "POST",
                url: 'http://ec2-34-248-114-187.eu-west-1.compute.amazonaws.com:5000/api/forgotPassword',
                data: formdata,
                dataType: "json",
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .success(function(data) {
                console.log("SUCCESS");
                // LoaderService.hide();

                //$location.path('partials/introduction.html');
                // $('body').css('overflow', 'auto');
                // document.getElementById('loginId').style.display = "none";
                $scope.login_details.username = "";
                // $scope.login_details.emailAddress = "";
                // $scope.login_details.password = "";
                alert("Password reset code sent to registered mail id");
                $scope.forgotUser = true;
                $scope.forgotUserSubmit = true;
                $scope.resetotpPass = false;
                $scope.resetotpSubmit = false;
                $scope.resetotp = false;

            })
            .error(function(error) {
                console.log("ERROR!!!");
                $scope.login_details.username = "";
                // $scope.login_details.emailAddress = "";
                // $scope.login_details.password = "";
                alert("Failed to reset password.")
            });
    };

    $scope.login = function() {
        var formdata = {
            "username": $scope.login_details.username,
            "password": $scope.login_details.password

        };

        console.log(formdata);
        $http({
                method: "POST",
                url: 'http://ec2-34-248-114-187.eu-west-1.compute.amazonaws.com:5000/api/signin',
                data: formdata,
                dataType: "json",
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .success(function(data) {
                console.log("SUCCESS");
                // LoaderService.hide();
                $('#shareyouridea').removeClass('hideMainSection');
                $('#yourideas').removeClass('hideMainSection');
                $('#awards').removeClass('hideMainSection');
                localStorage.setItem('formdata', JSON.stringify(formdata));
                var logged_User = localStorage.getItem('formdata');
                logged_User = JSON.parse(logged_User);
                $scope.user = logged_User.username;
                console.log($scope.user);
                $scope.loggedIn = true;
                localStorage.loggedIn = $scope.loggedIn;
                console.log(localStorage.loggedIn);
				location.reload();
                $location.path('partials/introduction.html');
                $('body').css('overflow', 'auto');
                document.getElementById('loginId').style.display = "none";
                $scope.login_details.username = "";
                $scope.login_details.emailAddress = "";
                $scope.login_details.password = "";
                alert("Logged in Successfully.");
            })
            .error(function(error) {
                console.log("ERROR!!!");
                $scope.login_details.username = "";
                $scope.login_details.emailAddress = "";
                $scope.login_details.password = "";
                alert("Login failed.")
            });
    };
}]);