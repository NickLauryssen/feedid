function FiChart(templateProvider) {

	const directive = {
		restrict: 'A',
		templateUrl: templateProvider.formatUrl('chart', 'common/chart'),
		scope: {
			tests: '=',
			results: '='
		},
		controller: 'chartCtrl',
		controllerAs: 'vm',
		bindToController: true
	};

	return directive;

}

angular.module('common.chart').directive('fiChart', FiChart);
