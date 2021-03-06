(function () {
    'use strict';

    angular.module('Spinner')
    .component('loading',{
        templateUrl: 'src/spinner/spinner.template.html',
        controller: LoadingSpinnerController
    });

    LoadingSpinnerController.$inject = ['$rootScope'];
    function LoadingSpinnerController($rootScope){
        var $ctrl = this;
        var cancellers = [];
        $ctrl.$onInit = function () {
            var cancel = $rootScope.$on('$stateChangeStart',
            function(event, toState, toParams, fromState, fromParams, options){
                console.log('transitioned');
                $ctrl.showSpinner=true;
            });
            cancellers.push(cancel);
            cancel = $rootScope.$on('$stateChangeSuccess',
            function(event, toState, toParams, fromState, fromParams){
                $ctrl.showSpinner=false;
            });
            cancellers.push(cancel);
            cancel = $rootScope.$on('$stateChangeError',
            function(event, toState, toParams, fromState, fromParams){
                $ctrl.showSpinner=false;
            });
            cancellers.push(cancel);
        };
        $ctrl.$onDestroy = function () {
            cancellers.forEach(function(item){
                item();
            });
        };
    }

}());