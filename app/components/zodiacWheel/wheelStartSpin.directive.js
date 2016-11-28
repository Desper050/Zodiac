(function () {

    angular.module('app')
        .directive('wheelStartSpin', function () {
            return function (scope) {
                if (scope.$last) {

                    let getRadius = function(){
                        return Math.max(250, Math.min($('#wheel').width() , $('#wheel').outerHeight()) / 2);
                    }

                    let setWheelsAngle = function (angle) {
                        let radius = getRadius();
                        let centerTop = $('#wheel').height() / 2;
                        let centerLeft = $('#wheel').width() / 2;
                        let signHeight = $('.star-sign-image').height();
                        let signWidth = $('.star-sign-image').width();
                        let windowWidth = $(window).width();
                        let windowHeight = $(window).height();
                        let currentSignAngle = angle;
                        let wheelTopOffset = $('#wheel').offset().top;                        

                        $('.star-sign').each(function () {
                            let leftPos = centerLeft + radius * Math.cos(currentSignAngle * Math.PI / 180) - (signWidth / 2);
                            let topPos = centerTop + radius * Math.sin(currentSignAngle * Math.PI / 180) - (signHeight / 2);                            

                            let divWidth = $(this).width();
                            if(divWidth + leftPos > windowWidth){
                                $(this).width(windowWidth - leftPos);
                            }
                            else if(divWidth < signWidth){
                                if(signWidth + leftPos <= windowWidth){
                                    $(this).width(signWidth);
                                }
                                else{
                                    $(this).width(windowWidth - leftPos);
                                }
                            }

                            let divHeight = $(this).height();
                            let topOffset = topPos + wheelTopOffset;
                            if(divHeight + topOffset > windowHeight){
                                $(this).height(windowHeight - topOffset);
                            }
                            else if(divHeight < signHeight){
                                if(signHeight + topOffset <= windowHeight){
                                    $(this).height(signHeight);
                                }
                                else{
                                    $(this).height(windowHeight - topOffset);
                                }
                            }

                            $(this).css({
                                "left": leftPos,
                                "top": topPos
                            });
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

                    spinWheel(0);
                }
            };
        });
})();
        