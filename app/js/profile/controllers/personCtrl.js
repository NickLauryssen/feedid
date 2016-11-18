'use strict';

class PersonCtrl {

    constructor($rootScope, userService, countryService, authService, testService) {
        this.$rootScope = $rootScope;
        this.countryService = countryService;
        this.authService = authService;
        this.testService = testService;

        this.countries = [];

        this.user = this.$rootScope.user;
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

        /**
         * These charts are filled with testresults for this test.
         * The testresults are unique for a specific user.
         */
         this.testService.getTests(this.user._id).then(
             (tests) => {
               console.log(tests);
                this.tests = tests;
                console.log(this.tests);
                //this.selectedTest = tests[0];

                 /**
                  * Get all testresults from a specific user.
                  */
                this.testService.getResults(this.user._id, this.$rootScope.currentUser._id).then(
                    (testResults) => {
                      this.testResults = testResults;

                        // for (let result in testResults) {
                        //   console.log("TTTTTTT")
                        //     if (result === null){
                        //         this.tests = [];
                        //     } else{
                        //         console.log(testResults)
                        //         this.testResults = testResults;
                        //     }
                        // }
                    }
                );
            }
        );
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

angular
    .module('feedID.profile')
    .controller('PersonCtrl', PersonCtrl);
