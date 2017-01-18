function FiMedicPoint(template) {

	const directive = {
		restrict: 'A',
		templateUrl: template.formatUrl('medic-point', 'common/medic-card/directives/medic-point'),
		scope: {
      medicPoint: "="
		},
		controller: 'medicPointCtrl',
		controllerAs: 'vm',
		bindToController: true
	};

	return directive;

}

angular.module('common.medic-point').directive('fiMedicPoint', FiMedicPoint);
