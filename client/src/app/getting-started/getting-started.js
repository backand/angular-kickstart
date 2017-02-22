(function() {
  'use strict';

  /**
   * @name  config
   * @description config block
   */
  function config($stateProvider) {
    $stateProvider
      .state('root.getting-started', {
        url: '/getting-started',
        views: {
          '@': {
            templateUrl: 'src/app/getting-started/getting-started.tpl.html',
            controller: 'GettingStartedCtrl as vm'
          }
        }
      });
  }

  /**
   * @name  gettingStartedCtrl
   * @description Controller
   */
  function GettingStartedCtrl($log, $state, BackandService) {

    var vm = this;

    (function init() {
      vm.username = 'start@backand.io';
      vm.password = 'backand';
      vm.appName = 'bkndkickstart';
      vm.objectSelected = 'users';
      vm.objectSelectedId = 1;
      vm.objects = null;
      vm.isLoggedIn = false;
      vm.objectData = '{}';
      vm.results = 'Not connected to Backand yet';
    }());


    vm.signin = function () {

      BackandService.signin(vm.username, vm.password)
        .then(
        function () {
          vm.results = 'you are in';
          vm.isLoggedIn = true;
        },
        function (data, status, headers, config) {
          $log.debug('authentication error', data, status, headers, config);
          vm.results = data;
        }
      );
    };

    vm.signout = function (){
      BackandService.signout();
      $state.go('root.getting-started',{}, {reload: true});
    };


    vm.loadObjectData = function(){
      BackandService.objectData(vm.objectSelected).then(loadObjectDataSuccess, errorHandler);
    };

    function loadObjectDataSuccess(ObjectData) {
      vm.objectData = ObjectData.data;
    }

    vm.getOne = function() {
      BackandService.getOne(vm.objectSelected, vm.objectSelectedId).then(getOneSuccess, errorHandler);
    };

    function getOneSuccess(ObjectData) {
      // For simplicity, reuse vm.objectData for now
      vm.objectData = ObjectData.data;
    }

    function errorHandler(error, message) {
      $log.debug(message, error);
    }
  }

  angular.module('getting-started', [])
    .config(config)
    .controller('GettingStartedCtrl', ['$log', '$state', 'BackandService', GettingStartedCtrl]);
})();
