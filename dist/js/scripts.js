(function(){
   let app = angular.module('app', ['ngAnimate']);

   app.controller('appController', function($scope){
       this.activeSign = "";       

       this.onDatePickedCallback = function(signOfThatDate){
           this.activeSign = signOfThatDate;
       }
   });
   
   
})();
const angledelta = 0.06;
const speed = 10;
var getRadius = function(){
    return Math.ceil(Math.min($('#wheel').width(),$('#wheel').height()) / 2);
}
setTimeout(
function () {
    
    var center = Math.ceil($('#wheel').width() / 2);
    $('.star-sign-image').each(function () {
        var sign = $(this);
        var x = $(sign).position().left - center;
        var y = $(sign).position().top - center;

        var baseAngle = Math.round(Math.asin(y / (Math.sqrt(x * x + y * y))) * 180 / 3.14);
        
        var angle = (x < 0 && y > 0) ? baseAngle + 90 :
            (x < 0 && y < 0) ? baseAngle + 270 :
                (x > 0 && y <= 0) ? baseAngle + 360 :
                    (x < 0 && y === 0) ? 180 :
                        baseAngle;

        setInterval(function () {
            var radius = getRadius();
            var centerTop = Math.ceil($('#wheel').height() / 2);
            var centerLeft = Math.ceil($('#wheel').width() / 2)
            var signHeight = $('.star-sign-image').height();
            var signWidth = $('.star-sign-image').width();

            angle = (angle + angledelta < 360) ? angle + angledelta : angle - 360 + angledelta;

            sign.css({
                "left": centerLeft + Math.round(radius * Math.cos(angle * 3.14 / 180)) - (signWidth / 2),
                "top": Math.round(radius * Math.sin(angle * 3.14 / 180)) + centerTop - (signHeight / 2)
            });
        }, speed);
    });
},
2000);
(function () {

    angular.module('app').
        component('datePicker', {            
            templateUrl: 'app/components/datePicker/datePicker.html',
            bindings: {
                datePicked: '&'
            },
            controller: ('datePickerController', function ($scope) {
               /* let $scope = $scope;*/
                let months = [
                    { name: 'January', days: 31 , getSign: function(day){ return (day < 20 ? 'capricorn' : 'aquarius'); } },
                    { name: 'February', days: 29 , getSign: function(day){ return (day < 19 ? 'aquarius' : 'pisces'); } },
                    { name: 'March', days: 31, getSign: function(day){ return (day < 21 ? 'pisces' : 'aries'); } },
                    { name: 'April', days: 30 , getSign: function(day){ return (day < 20 ? 'aries' : 'taurus'); } },
                    { name: 'May', days: 31 , getSign: function(day){ return (day < 21 ? 'taurus' : 'gemini'); } },
                    { name: 'June', days: 30 , getSign: function(day){ return (day < 21 ? 'gemini' : 'cancer'); } },
                    { name: 'July', days: 31 , getSign: function(day){ return (day < 23 ? 'cancer' : 'leo'); }  },
                    { name: 'August', days: 31 , getSign: function(day){ return (day < 23 ? 'leo' : 'virgo'); } },
                    { name: 'September', days: 30 , getSign: function(day){ return (day < 23 ? 'virgo' : 'libra'); } },
                    { name: 'October', days: 31 , getSign: function(day){ return (day < 23 ? 'libra' : 'scorpio'); } },
                    { name: 'November', days: 30 , getSign: function(day){ return (day < 22 ? 'scorpio' : 'sagittarius'); } },
                    { name: 'December', days: 31 , getSign: function(day){ return (day < 22 ? 'sagittarius' : 'capricorn'); } }
                ];     

                $scope.currentMonth = getMonth(1);
                $scope.pickedDate = {};
                
                this.dayBtnOnClick = function(day, monthNumber){
                    $scope.pickedDate = { day: day, month: monthNumber };
                    let sign = months[monthNumber - 1].getSign(day);
                    this.datePicked({signOfThatDate: sign});
                }

                this.isPickedDay = function(day, monthNumber){
                    return ($scope.pickedDate.day === day && $scope.pickedDate.month === monthNumber);                    
                }

                this.changeMonthButtonOnClick = function(direction){
                    if(direction === 'left'){
                        if($scope.currentMonth.number === 1){
                            $scope.currentMonth = getMonth(12);
                        }
                        else{
                            $scope.currentMonth = getMonth($scope.currentMonth.number - 1);
                        }
                    }
                    else if(direction === 'right'){
                        if($scope.currentMonth.number === 12){
                            $scope.currentMonth = getMonth(1);  
                        }
                        else{
                            $scope.currentMonth = getMonth($scope.currentMonth.number + 1);
                        }
                    }
                }

                function getMonth(monthNumber){
                    let numberOfDays = months[monthNumber - 1].days;
                    let daysArray = [];
                    for(let i = 1; i <= numberOfDays; i++){
                        daysArray.push(i);
                    }
                    return {
                        number: monthNumber,
                        name: months[monthNumber - 1].name,
                        days: daysArray
                    }
                }

            }),
            controllerAs: "dpCtrl"        
        });

} ());
(function () {

    angular.module('app')
        .directive('wheelStartSpin', function () {
            return function (scope) {
                if (scope.$last) {

                    let setWheelsAngle = function (angle) {
                        let radius = getRadius();
                        let centerTop = $('#wheel').height() / 2;
                        let centerLeft = $('#wheel').width() / 2;
                        let signHeight = $('.star-sign-image').height();
                        let signWidth = $('.star-sign-image').width();
                        let currentSignAngle = angle;
                        $('.star-sign-image').each(function () {
                            $(this).css({
                                "left": Math.round(centerLeft + radius * Math.cos(currentSignAngle * Math.PI / 180) - (signWidth / 2)),
                                "top": Math.round(centerTop + radius * Math.sin(currentSignAngle * Math.PI / 180) - (signHeight / 2))
                            })
                            currentSignAngle = (currentSignAngle + 30 < 360) ? currentSignAngle + 30 : currentSignAngle - 360 + 30;
                        });
                    }

                    let anglePerSpin = 0.06;
                    let spinTimeout = 10;
                    let spinWheel = function (baseAngle) {
                        let newAngle = (baseAngle + anglePerSpin < 360) ? baseAngle + anglePerSpin : baseAngle - 360 + anglePerSpin;
                        setWheelsAngle(newAngle);
                        setTimeout(function () {
                            spinWheel(newAngle);
                        }, spinTimeout);
                    }

                    let getRadius = function(){
                        return Math.max(250, Math.min($('#wheel').width() , $('#wheel').height()) / 2);
                    }

                    spinWheel(0);
                }
            };
        });
})();
        
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