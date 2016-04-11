class TabCtrl {

	constructor() {

	}

	navigate() {
		console.log('Change state');
	}

}

angular.module('common.tab').controller('tabCtrl', TabCtrl);
