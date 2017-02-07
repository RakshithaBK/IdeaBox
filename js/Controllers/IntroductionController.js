/* *********************************************************
Developed by : Basavaraj, Gowthan and Pooja Kumari

* Introduction
* Rolling text animation
* Video autoplay

***********************************************/

var app = angular.module('myApp');

app.controller('introductionCtrl', function ($scope) {
    $scope.lTextToAnimate = ["Genius is one percent", "inspiration and ninety-nine", "percent perspiration.", "<br>", "<br>", "There's a way to do", "it better - find it.", "<br>", "<br>", "If we did all the", "things we are capable of,", "we would literally", "astound ourselves. ", "<br>", "<br>", "What you are ", "will show in what", "you do.", "<br>", "<br>", "The difference ", "between those numbers ", "trust", "<br>", "<br>", "Feed is a digital mechanism of <strong>trust</strong>"];
    $scope.textAnimClass = function (index, first, last) {
        if (last) {
            var parent = document.getElementById('scrollContainer');
            var child = document.getElementById('innerContainer');
            child.style.right = child.clientWidth - child.offsetWidth + "px";
        }
        return {
            "margin-top": first ? "20%" : "3%",
            "margin-bottom": last ? "40%" : "0%",
            "opacity": (1 - index * 0.25),
            "transform": index < 3 ? "matrix(" + (1 - index * 0.1) + ", 0, 0, " + (1 - index * 0.1) + ", 0, 0)" : "",
            "transition": "transform 300ms"
        }
    }



}).filter('to_trusted', ['$sce', function ($sce) {
    return function (text) {
        return $sce.trustAsHtml(text);
    };
}]);