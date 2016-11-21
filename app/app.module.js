(function(){
   let app = angular.module('app', ['ngAnimate']);

   app.controller('appController', function($scope){
       this.activeSign = "";       

       this.onDatePickedCallback = function(signOfThatDate){
           this.activeSign = signOfThatDate;
       }
   });
   
   
})();