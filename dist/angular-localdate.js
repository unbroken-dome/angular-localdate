angular.module('localDate', [])
    .directive('localDate', function() {
        return {
            restrict: 'A',
            priority: 0.5,
            require: 'ngModel',
            compile: function() {
                return {

                    pre: function preLink(scope, elem, attr, ngModelCtrl) {
                        if (ngModelCtrl.$options) {
                            ngModelCtrl.$options.timezone = 'UTC';
                        } else {
                            ngModelCtrl.$options = {timezone: 'UTC', updateOnDefault: true};
                        }
                    },

                    post: function postLink(scope, elem, attr, ngModelCtrl) {
                        ngModelCtrl.$parsers.push(function (value) {

                            function pad(number) {
                                return (number < 10) ? ('0' + number) : number;
                            }

                            value.toJSON = function () {
                                return this.getUTCFullYear() +
                                    '-' + pad(this.getUTCMonth() + 1) +
                                    '-' + pad(this.getUTCDate());
                            };
                            return value;
                        });
                    }
                };
            }
        };
    });
