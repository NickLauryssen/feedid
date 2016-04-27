function FiPanel() {

	const directive = {
		restrict: 'A',
		scope: true,
		templateUrl: 'partials/panel.html',
		controller: 'panelCtrl',
		controllerAs: 'vm'
	};

	return directive;

}

angular.module('feedID.profile').directive('fiPanel', FiPanel);
