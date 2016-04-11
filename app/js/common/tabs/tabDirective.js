function FiTab() {

	const directive = {
		restrict: 'A',
		templateUrl: 'partials/tab.html',
		scope: {
			'showAdmin': '='
		},
		controller: 'tabCtrl',
		controllerAs: 'vm',
		bindToController: true
	};

	return directive;

}

angular.module('common.tab').directive('fiTab', FiTab);
