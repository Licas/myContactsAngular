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

    scope.hide = function(){
        scope.addFormShow = false;
        scope.contactShow = false;
        scope.editFormShow = false;
    }

    scope.addFormSubmit = function() {
        console.log("Adding contact @ addFormSubmit");

        //Assign values
        var name;
        var email;
        var company;
        var work_phone;
        var home_phone;
        var mobile_phone;
        var street_address;
        var city;
        var state;
        var zip_code;

        if(scope.name) {
            name = scope.name;
        } else {
            name = null;
        }

        if(scope.email) {
            email = scope.email;
        } else {
            email = null;
        }

        if(scope.company) {
            company = scope.company;
        } else {
            company = null;
        }

        if(scope.work_phone) {
            work_phone = scope.work_phone;
        } else {
            work_phone = null;
        }

        if(scope.home_phone) {
            home_phone = scope.home_phone;
        } else {
            home_phone = null;
        }

        if(scope.mobile_phone) {
            mobile_phone = scope.mobile_phone;
        } else {
            mobile_phone = null;
        }

        if(scope.street_address) {
            street_address = scope.street_address;
        } else {
            street_address = null;
        }

        if(scope.city) {
            city = scope.city;
        } else {
            city = null;
        }

        if(scope.state) {
            state = scope.state;
        } else {
            state = null;
        }

        if(scope.zip_code) {
            zip_code = scope.zip_code;
        } else {
            zip_code = null;
        }

        scope.contacts.$add({
            name:name,
            email:email,
            company:company,
            phones:[
                {
                    mobile:mobile_phone,
                    home:home_phone,
                    work:work_phone
                }
            ],
            address:[
                {
                    street_address:street_address,
                    state:state,
                    city:city,
                    zip_code:zip_code
                }
            ]
        }).then( function(ref) {
            var id = ref.key();
            console.log("Added contact with id: " + id);

            clearFields();

            scope.addFormShow = false;
            scope.message = "Contact added";
        });
    }

    scope.showContact = function(contact) {
        console.log("Getting contact");

        scope.id = contact.$id;
        scope.name = contact.name;
        scope.company = contact.company;
        scope.email = contact.email;
        if(contact.phones) {
            console.log("contact phones " + JSON.stringify(contact.phones));
            scope.work_phone = contact.phones[0].work;
            scope.home_phone = contact.phones[0].home;
            scope.mobile_phone = contact.phones[0].mobile;
        }
        if(contact.address) {
            console.log("contact address " + JSON.stringify(contact.address));
            scope.street_address = contact.address[0].street_address;
            scope.city = contact.address[0].city;
            scope.state = contact.address[0].state;
            scope.zip_code = contact.address[0].zip_code;
        }

        scope.contactShow = true;
    }

    scope.showEditContactForm = function(contact) {
        scope.id = contact.$id;
        scope.name = contact.name;
        scope.company = contact.company;
        scope.email = contact.email;

        console.log("Showing edit form - " + contact.$id);

        if(contact.phones) {
            console.log("contact phones " + JSON.stringify(contact.phones));
            scope.work_phone = contact.phones[0].work;
            scope.home_phone = contact.phones[0].home;
            scope.mobile_phone = contact.phones[0].mobile;
        }
        if(contact.address) {
            console.log("contact address " + JSON.stringify(contact.address));
            scope.street_address = contact.address[0].street_address;
            scope.city = contact.address[0].city;
            scope.state = contact.address[0].state;
            scope.zip_code = contact.address[0].zip_code;
        }

        scope.editFormShow = true;
    }

    scope.editFormSubmit = function() {

        var id = scope.id;
        var record = scope.contacts.$getRecord(id);

        //console.log("Retrieving contact with id="+id+"["+JSON.stringify(record)+"]");
        record.name = scope.name;
        record.company = scope.company;
        record.email = scope.email;

        if(!record.phones) {
            record.phones = [];
            record.phones.push({});
        }
        console.log(record.phones);

        record.phones[0].work = scope.work_phone;
        record.phones[0].home = scope.home_phone;
        record.phones[0].mobile = scope.mobile_phone;

        if(!record.address) {
            record.address = [];
            record.address.push({});
            console.log(record.address);
        }
        record.address[0].street_address = scope.street_address;
        record.address[0].city = scope.city  ;
        record.address[0].state = scope.state;
        record.address[0].zip_code = scope.zip_code;

        //Save contact
        scope.contacts.$save(record).then(function(ref){
            console.log(ref.key);
        });

        clearFields();
        scope.editFormShow = false;
    }

    scope.removeContact = function(contact) {
        console.log("Removing contact: " + contact.$id);

        scope.contacts.$remove(contact);
        scope.message = "Contact " + contact.name + " deleted";
    }
    function clearFields() {
        console.log("Clearing all fields");

        scope.name = '';
        scope.email = '';
        scope.company = '';
        scope.work_phone = '';
        scope.home_phone = '';
        scope.mobile_phone = '';
        scope.street_address = '';
        scope.city = '';
        scope.state = '';
        scope.zip_code = '';
    }



}]);
