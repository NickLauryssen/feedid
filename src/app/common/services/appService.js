class AppService {

	constructor($http, config) {
		this.$http = $http;
		this.config = config;
		this.app = {};
	}

	getApp(id) {
		return this.$http({method: 'GET',url:this.config.api + '/api/apps/' + id}).then(
			(result) => {
				this.app = result.data;
			},
			(error) => {
				console.log('Couldn\'t retrieve app from FeedID');
			}
		);
	}

	getUserApp(owner, user, app) {
		return this.$http({method:"GET", url: this.config.api + '/api/userapps/' + owner + '/' + user + '/' + app}).then(
			(result) => {
				return result;
			},
			(error) => {
				console.log('Couldn\'t retrieve userApp from FeedID');
			}
		);
	}
}

export default AppService;
