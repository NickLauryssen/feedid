class PanelCtrl {
	constructor($http, $rootScope, appService, userService) {
		this.appService = appService;
		this.userService = userService;
		this.$http = $http;
		this.$rootScope = $rootScope;

		this.client = {};

		this.userId = this.$rootScope.user._id;
        this.tests = [];
        this.testResults = [];
		this.app = {};

		/* TODO: remove hardcoded id's */
        if ((this.$rootScope.currentUser._id =='54e83de7b752bfa10e47d8bf') || (this.$rootScope.currentUser._id =='5502409dd4ac39257ca71f86') || (this.$rootScope.currentUser._id =='54feefcccf4100975819aeeb')){
            this.canDoAdmin = true;
        }else {
          this.canDoAdmin = false;
        }

		this.init();
	}

	init() {
		/**
         * This function is responsible for the content of the google charts.
         */
        this.appService.getApp('Profile').then(() => {
            this.app = this.appService.app;
            this.userService.getUser(this.userId, this.app._id).then(() => {
            this.user = this.userService.user;

                if (!this.user.validated) {
                    let owner_id = this.$rootScope.currentUser._id;
                    let user_id = this.user._id;
                    //get app to make sure it is set (I made another get app request here because sometimes this userapps request was sent before app was set)

                    this.$http({method:"GET", url: this.appService.config.api + '/api/userapps/' + owner_id + '/' + user_id + '/' + this.app._id})
                        .success((userapp) => {

                            if (userapp._id) {
                                this.inOverview = true;
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
                this.$http.get(this.appService.config.api + '/api/tests/'+ this.user._id).success((tests) => {
                    this.tests = tests;
                    this.selectedTest = tests[0];

                    /**
                     * Get all testresults from a specific user.
                     */
                    this.$http({method:"GET", url:this.appService.config.api + '/api/testresults/' + this.user._id, params:{_id:this.$rootScope.currentUser._id}}).success((testResults) => {
                        for (let result of testResults) {
                            if (result === null){
                             this.tests = [];
                            } else{
                                this.testResults = testResults;
                            }
                        }

                        /**
                         * For each test we make a new chart and store them in a charts array.(array == store of all test charts)
                         * Some configurations are made for the chart.
                         * The cols[] array represents the X-axis of the graph.
                         * The rows[] array will represent the Y-axis data.
                         */

                        for (let test of this.tests) {
                            let testId = test._id;
                            let aChart = {};
                            aChart.type = "LineChart";
                            aChart.displayed = "true";
                            aChart.data = {};
                            let cols = [];
                            let rows = [];

                            cols.push({
                                "id": "time",
                                "label": "Time",
                                "type": "string",
                                "p": {}
                            });

                            for (let subTest of test.subTests) {
                                cols.push({
                                    "id": subTest.name,
                                    "label": subTest.name,
                                    "type": "number",
                                    "p": {}
                                });
                            }
                            aChart.data.cols = cols;
                            /**
                             * For each testresult of a user.
                             */

                            for (let result of this.testResults) {
                                if(result.test === testId) {
                                    let obj = {};

                                    obj.c.push({ 'v': result.time });

                                    for (let subResult of result.subResults) {
                                        obj.c.push({ 'v': subResult});
                                    }

                                    rows.push(obj);
                                }
                            }

                            aChart.data.rows = rows;
                            test.chart = rows.length < 1 ? aChart : null;
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
                this.client = {};
            }
        );
    }

}

angular.module('feedID.profile').controller('panelCtrl', PanelCtrl);
