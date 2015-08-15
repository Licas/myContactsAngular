'use strict';

angular.module('myContacts.contacts', ['ngRoute','firebase'])


.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/contacts', {
    templateUrl: 'contacts/contacts.html',
    controller: 'ContactsCtrl'
  });
}])


.controller('ContactsCtrl', ['$scope', '$firebaseArray', function(scope, fbArr) {
    var ref = new Firebase('https://mycontactsangularjs.firebaseio.com/contacts');

    scope.contacts = fbArr(ref);

    scope.showAddContactForm = function(){
        scope.addFormShow = true;
    }

    scope.exitAddContactForm = function(){
        scope.addFormShow = false;
    }


}]);
