'use strict';

class AdministratorCtrl {

    constructor($rootScope, $location, userService, countryService, authService) {
      if($rootScope.loggedin != true ){
        $location.url('/');
      }
        this.$rootScope = $rootScope;
        this.authService = authService;
        this.userService = userService;
        this.countryService= countryService;
        this.countries = [];
        this.init();
    }


    init() {
        this.countryService.getCountries().then((countries)=>{
          this.countries = countries;
        })
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
