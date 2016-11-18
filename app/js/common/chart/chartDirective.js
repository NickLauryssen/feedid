function FiChart(template) {

	const directive = {
		restrict: 'A',
		templateUrl: template.formatUrl('chart', 'common/chart'),
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
