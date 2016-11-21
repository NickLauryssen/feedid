class UserService {

	constructor($http, $rootScope, config, appService) {
		this.$http = $http;
		this.$rootScope = $rootScope;
		this.config = config;
		this.appService = appService;
		this.user = {};
	}

	currentUser() {
		return this.user;
	}

	getUser(userId, appId) {
		return this.$http({url:this.config.api + '/api/users/' + userId + '/' + appId,method:"GET", params:{_id:this.$rootScope.currentUser._id}}).then(
			(result) => {
				this.user = result.data;
			},
			(error) => {
				console.log('Couldn\'t load user from FeedID');
			}
		);
	}

	updateUser(user) {
		return this.$http.put(this.config.api + '/api/users/' + user._id, user).then(
			(result) => {
				this.user = result.data;
			},
			(error) => {
				console.log('Couldn\'t update user');
			}
		);
	}

	addUser(user) {
		return this.$http.post(this.config.api + '/api/users', user).then(
			(result) => {
				this.user = result.data;

				let userapp = {
                    owner: this.$rootScope.currentUser._id,
                    linkuser: this.user._id,
                    app: this.appService.app._id
                };

    	        this.$http.post(this.config.api + '/api/userapps', this.userapp);
			},
			(error) => {
				console.log('Couldn\'t add user');
			}
		);
	}

}

export default UserService;
