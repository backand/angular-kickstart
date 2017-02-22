(function () {
  'use strict';

  function backandService($http, Backand) {

    var factory = {};

    factory.objectData = function(name, pageSize, pageNumber, sort, filter) {
      var params = {
        pageSize: pageSize || 5,
        pageNumber: pageNumber || 1,
        filter: filter || '',
        sort: sort || ''
      };
      return Backand.object.getList(name, params);
    };

    factory.getOne = function(name, id) {
      return Backand.object.getOne(name, id);
    }

    factory.signin = function(username, password) {

      return Backand.signin(username, password);
    };

    factory.signout = function() {
      return Backand.signout();
    };

    return factory;

  }

  angular.module('common.services.backand',[])
    .factory('BackandService', ['$http','Backand', backandService]);
})();
