/**
 * Created by sosek108 on 22.03.15.
 */
angular.module("speedApp", ["ui.router", "cfp.hotkeys"])
    .filter('range', function() {
        return function(input, total) {
            total = parseInt(total);
            for (var i=0; i<total; i++)
                input.push(i);
            return input;
        };
    })

    .config(function($stateProvider) {
        $stateProvider
            .state('schulz', {
                url: '/schulz',
                templateUrl: 'partials/schulz.html',
                controller: 'SchulzCtrl as schulz'

            })
            .state('generator', {
                url: '/generator',
                templateUrl: 'partials/generator.html',
                controller: 'GenCtrl as gen'
            })
            .state('wide-angle', {
                url: '/wide-angle',
                templateUrl: 'partials/wide-angle.html',
                controller: 'WideCtrl as wide'
            })
            .state('warm-up', {
                url: '/warm-up',
                templateUrl: 'partials/warm-up.html',
                controller: 'WarmUpCtrl as warm'
            })
    })

    .controller('SchulzCtrl', function() {
        var schulz = this;

        //default
        this.size = 4;

        this.permute = function(size) {
            var ret= new Array(size * size);
            for (var i = 1; i<= ret.length; i++)
                ret[i-1] = i;
            var t = ret.length;
            while (t >= 1) {
                var k = Math.floor(1 + t * Math.random());
                var temp = ret[k-1];
                ret[k-1] = ret[t-1];
                ret[t-1] = temp;
                t = t-1;
            }
            return ret;
        };
        this.update = function(size) {
            this.permuted = this.permute(size);

        };

        this.permuted = this.permute(this.size);
    })

    .controller('GenCtrl', function($timeout, $scope) {
        var gen = this;

        //Show answer?
        $scope.number = "";
        $scope.showNumber = false;

        //settings
        $scope.length = 6;
        $scope.time = 500; //miliseconds

        $scope.generateRandom = function() {
            var rand;
            do {
                rand = Math.random()
            } while (rand <0.1)

            $scope.number = Math.floor(rand* Math.pow(10, $scope.length));
            $scope.showNumber = true;
            $timeout(function(){$scope.showNumber = false;}, $scope.time, true);
        };

        $scope.showAns = function() {
            $scope.showNumber = true;
        }
    })

    .controller('WideCtrl', function($scope) {
        $scope.width = 10;
        $scope.maxWidth = $(".wide-angle").innerWidth() - $(".prefix").outerWidth() - $(".suffix").outerWidth() - 1;
        $scope.setWidth = function(width) {
            $(".center").width(width);
        };
        $scope.setWidth($scope.width);
        console.log([$(".wide-angle").innerWidth(), $(".prefix").outerWidth(), $(".suffix").outerWidth()])

        //TODO: Make it in Angular way!
    })

    .controller('WarmUpCtrl', function($scope) {
        $scope.runAnimation = false;

    })
;
