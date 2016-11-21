class TabCtrl {

	constructor($state) {
		this.selectedTab = 1;
		this.state = $state;
	}

	navigate() {
		console.log('Change state', this.selectedTab);
		this.state.go('profile.overview');
	}

}

export default TabCtrl;
