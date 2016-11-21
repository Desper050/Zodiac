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