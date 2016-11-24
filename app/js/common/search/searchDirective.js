function FiSearch(template) {

  const directive = {
    restrict: 'E',
		templateUrl: template.formatUrl('search', 'common/search'),
		scope: {},
		controller: 'searchCtrl',
		controllerAs: 'vm',
		bindToController: true
  }

  return directive;

}

angular.module('common.search').directive('fiSearch', FiSearch);
