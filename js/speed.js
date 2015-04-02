/**
 * Created by sosek108 on 22.03.15.
 */
angular.module("speedApp", ["ui.router"])
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
    .controller('GenCtrl', function($timeout) {
        var gen = this;

        //Show answer?
        this.number = "";
        this.showNumber = false;

        //settings
        this.length = 6;
        this.time = 500; //miliseconds

        this.generateRandom = function() {
            this.number = Math.floor(Math.random()* Math.pow(10, this.length));
            this.showNumber = true;
            $timeout(function(){gen.showNumber = false;}, this.time, true);
        };

    })
;
