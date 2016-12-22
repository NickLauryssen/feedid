class PanelCtrl {
	constructor($http, $rootScope, appService, userService, countryService) {
		this.appService = appService;
		this.userService = userService;
		this.$http = $http;
		this.$rootScope = $rootScope;
		this.countryService = countryService;

		this.client = {};
		this.countries = {};

		//this.user = userService.currentUser();
		this.user = $rootScope.currentUser;
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
		console.log("CountrySrvice", this.countryService);
		console.log(this.countryService.getCountries());
			this.countryService.getCountries().then(() => {
					this.countries = this.countryService.countries;
					console.log("Got countries", this.countries);

			});
		/**
         * This function is responsible for the content of the google charts.
         */
        this.appService.getApp('Profile').then(() => {
            this.app = this.appService.app;
            this.userService.getUser(this.user._id, this.app._id).then(() => {
            	this.user = this.userService.user;

                if (!this.user.validated) {
                    let owner_id = this.$rootScope.currentUser._id;
                    let user_id = this.user._id;

					this.appService.getUserApp(owner_id, user_id, this.app._id).then(
						(userApp) => {
							if (angular.isDefined(userApp)) {
								this.inOverview = true;
                                this.releaseBtn = true;
                                this.editBtn = true;
							}
						}
					);
                }

                if (this.$rootScope.currentUser._id == this.user._id) {
                    this.editBtn = true;
                }
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
