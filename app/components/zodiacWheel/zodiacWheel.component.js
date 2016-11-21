(function () {

    angular.module('app').
        component('zodiacWheel', {
            templateUrl: 'app/components/zodiacWheel/zodiacWheel.html',
            bindings: {
                activeSign: '<'
            },
            controller: ('zodiacWheelController', function ($scope) {                

                $scope.zodiacSigns = ['aquarius', 'pisces', 'aries',
                    'taurus', 'gemini', 'cancer',
                    'leo', 'virgo', 'libra',
                    'scorpio', 'sagittarius', 'capricorn'];

                this.isActiveSign = function (sign) {
                    return sign == this.activeSign;
                }

                this.getBasePositionTop = function (index) {
                    let radius = getRadius();
                    let centerTop = $('#wheel').height() / 2;
                    let signHeight = $('.star-sign-image').height();
                    let angle = 30 * (index + 1);
                    return Math.round(centerTop + radius * Math.sin(angle * 3.14 / 180) - (signHeight / 2));
                }

                this.getBasePositionLeft = function (index) {
                    let radius = getRadius();
                    let centerLeft = $('#wheel').width() / 2;
                    let signWidth = $('.star-sign-image').width();
                    let angle = 30 * (index + 1);
                    return Math.round(centerLeft + radius * Math.cos(angle * 3.14 / 180) - (signWidth / 2));
                }

                let getRadius = function () {
                    return Math.max(250, Math.min($('#wheel').width(), $('#wheel').height()) / 2);
                }
            }),
            controllerAs: 'zwCtrl'
        });
} ());