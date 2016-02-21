'use strict';

class PersonCtrl {

    constructor($scope, $rootScope, $http, $location, $routeParams, appService, userService, countryService) {
        this.$scope = $scope;
        this.$rootScope = $rootScope;
        this.$http = $http;
        this.$location = $location;
        this.$routeParams = $routeParams;
        this.appService = appService;
        this.userService = userService;
        this.countryService = countryService;

        this.client = {};
        this.countries = [];
        this.userId = $routeParams.userId;
        this.tests = [];
        this.testResults = [];
        this.app = {};
        this.$rootScope.editorEnabled = false;
        this.releaseBtn = false;
        this.editBtn = false;
        this.canDoAdmin = false;

        this.init();
    }

    init() {
        if ((this.$rootScope.currentUser._id =='54e83de7b752bfa10e47d8bf') || (this.$rootScope.currentUser._id =='5502409dd4ac39257ca71f86') || (this.$rootScope.currentUser._id =='54feefcccf4100975819aeeb')){
            this.canDoAdmin = true;
        }

        this.countryService.getCountries().then(() => {
            this.countries = this.countryService.countries;
        });

        /**
         * This function is responsible for the content of the google charts.
         */

        this.appService.getApp('Profile').then(() => {
            this.app = this.appService.app;

            this.userService.getUser(this.userId, this.app._id).then(() => {
                this.user = this.userService.user;

                if (!this.user.validated) {
                    var owner_id = this.$rootScope.currentUser._id;
                    var user_id = this.user._id;
                    //get app to make sure it is set (I made another get app request here because sometimes this userapps request was sent before app was set)

                    this.$http.get(url + '/api/userapps/' + owner_id + '/' + user_id + '/' + this.app._id)
                        .success((userapp) => {
                            if (userapp._id) {
                                this.releaseBtn = true;
                                this.editBtn = true;
                            }
                        });
                }

                if (this.$rootScope.currentUser._id == this.user._id) {
                    this.editBtn = true;
                }

                /**
                 * These charts are filled with testresults for this test.
                 * The testresults are unique for a specific user.
                 */
                this.$http.get(url + '/api/tests/'+ this.user._id).success((tests) => {
                    for (var i in tests) {
                        this.tests.push(tests[i]);
                    }
                    this.selectedTest = tests[0];

                    /**
                     * Get all testresults from a specific user.
                     */
                    this.$http.get(url + '/api/testresults/' + this.user._id).success((testResults) => {

                        for (var i in testResults)
                            if (testResults[i]== null){
                             this.tests = [];
                            } else{
                                this.testResults = testResults;
                            }

                        /**
                         * For each test we make a new chart and store them in a charts array.(array == store of all test charts)
                         * Some configurations are made for the chart.
                         * The cols[] array represents the X-axis of the graph.
                         * The rows[] array will represent the Y-axis data.
                         */

                        for (var k in this.tests) {
                            var testId = this.tests[k]._id;
                            var aChart = {};
                            aChart.type = "LineChart";
                            aChart.displayed = "true";
                            aChart.data = {};
                            var cols = [];
                            var rows = [];
                            cols.push({"id": "time", "label": "Time", "type": "string", "p": {}});
                            for (var sub in this.tests[k].subTests) {
                                cols.push({
                                    "id": this.tests[k].subTests[sub].name,
                                    "label": this.tests[k].subTests[sub].name,
                                    "type": "number",
                                    "p": {}
                                });
                            }
                            aChart.data.cols = cols;
                            /**
                             * For each testresult of a user.
                             */

                            for (var res in this.testResults) {
                                if (this.testResults[res].test == testId) {
                                    var o = {};
                                    var valArray = [];
                                    valArray.push({"v": this.testResults[res].time});

                                    for (var r in this.testResults[res].subResults) {
                                        valArray.push({"v": this.testResults[res].subResults[r]});
                                    }
                                    o.c = valArray;
                                    rows.push(o);
                                }
                            }
                            aChart.data.rows = rows;
                            //$scope.charts.push(aChart);
                            if (rows.length < 1) aChart = null;
                            this.tests[k].chart = aChart;
                        }
                    });
                });
            });
        });
    }

    //register client and add client to database
    register() {
        this.userService.addUser(this.client).then(
            () => {
    		    this.userapp = {
                    owner: this.$rootScope.currentUser._id,
                    linkuser: this.userService.user._id,
                    app: this.app._id
                };

    	        this.$http.post(url+'/api/userapps',this.userapp);
                this.client = {};
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
         this.$http.post(url + '/register', this.user)
            .success((message) => {
                alert('User registered and mail is sent to your email.');
            })
            .error(() => {
                this.$rootScope.message = 'Couldn\'t register user';
            });
    }
}

angular.module('feedID.profile').controller('PersonCtrl', PersonCtrl);
