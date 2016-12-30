function FiMedicCard(template) {

	const directive = {
		restrict: 'A',
		templateUrl: template.formatUrl('medic-card', 'common/medic-card'),
		scope: {

		},
		controller: 'medicCardCtrl',
		controllerAs: 'vm',
		bindToController: true
	};

	return directive;

}

angular.module('common.medic-card').directive('fiMedicCard', FiMedicCard);
