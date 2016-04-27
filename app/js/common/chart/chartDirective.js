function FiChart() {

	const directive = {
		restrict: 'A',
		templateUrl: 'partials/chart.html',
		scope: {
			tests: "=",
			results: '='
		},
		controller: 'chartCtrl',
		controllerAs: 'vm',
		bindToController: true
	};

	return directive;

}

angular.module('common.chart').directive('fiChart', FiChart);
