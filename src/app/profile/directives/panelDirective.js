function FiPanel(template) {

	const directive = {
		restrict: 'A',
		templateUrl: template.formatUrl('directives/panel', 'profile'),
		scope: true,
		controller: 'panelCtrl',
		controllerAs: 'vm'
	};

	return directive;
}

FiPanel.$inject  = ['template'];

angular.module('feedID.profile').directive('fiPanel', FiPanel);
