'use strict';

class AdministratorCtrl {

    constructor($rootScope, $location, userService, authService) {
      if($rootScope.loggedin != true ){
        $location.url('/');
      }
        this.$rootScope = $rootScope;
        this.authService = authService;
    }


    init() {

    }

    //register client and add client to database
      register() {
          this.userService.addUser(this.client).then(
               () => {
                   this.client = {};
               }
         );
      }

}

angular
    .module('feedID.administrator')
    .controller('AdministratorCtrl', AdministratorCtrl);
