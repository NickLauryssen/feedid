'use strict';

class PersonCtrl {

    constructor($rootScope, $routeParams, appService, userService, countryService, authService) {
        this.$rootScope = $rootScope;
        this.$routeParams = $routeParams;
        this.appService = appService;
        this.countryService = countryService;
        this.authService = authService;


        this.countries = [];

        this.userId = this.$rootScope.user._id;
        this.tests = [];
        this.testResults = [];
        this.app = {};
        this.$rootScope.editorEnabled = false;
        this.releaseBtn = false;
        this.editBtn = false;

        /* TODO: remove hardcoded id's */
        if ((this.$rootScope.currentUser._id =='54e83de7b752bfa10e47d8bf') || (this.$rootScope.currentUser._id =='5502409dd4ac39257ca71f86') || (this.$rootScope.currentUser._id =='54feefcccf4100975819aeeb')){
            this.canDoAdmin = true;
        }else {
          this.canDoAdmin = false;
        }

        this.init();
    }

    init() {
        this.countryService.getCountries().then(() => {
            this.countries = this.countryService.countries;
        });
    }

    /**
     * Edit profile
     */

    enableEditor() {
        this.$rootScope.editorEnabled = true;
        this.editUser = this.user;
    }

    disableEditor() {
        this.$rootScope.editorEnabled = false;
    }

    save() {
        this.user = this.editUser;
        this.userService.updateUser(this.editUser).then(
            () => {
                if (this.$rootScope.currentUser._id === this.userService.user._id) {
                    this.$rootScope.currentUser = this.userService.user;
                }
            }
        );

        this.disableEditor();
    }

    sendConfirmEmail() {
        this.authService.register(this.user);
    }

}

angular.module('feedID.profile').controller('PersonCtrl', PersonCtrl);
