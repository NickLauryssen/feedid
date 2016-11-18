function FiTab(template) {

	const directive = {
		restrict: 'A',
		templateUrl: template.formatUrl('tab', 'common/tabs'),
		scope: {
			'showAdmin': '='
		},
		controller: 'tabCtrl',
		controllerAs: 'vm',
		bindToController: true
	};

	return directive;

} 

FiTab.$inject = ['template'];

angular.module('common.tab').directive('fiTab', FiTab);
