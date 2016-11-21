import commonModule from './common/common.module';

angular.module('common.search', []);
angular.module('common.services', []);
angular.module('common.tab', []);
angular.module('common.chart', []);
angular.module('common', ['common.filters', 'common.search', 'common.services', 'common.tab', 'common.chart', 'ui.router']);
angular.module('feedID.api', ['common']);
angular.module('feedID.organiser', ['common']);
angular.module('feedID.profile', ['common']);
angular.module('feedID.register', ['common']);
angular.module('feedID.login', ['common']);

const ROOT_MODULE_NAME = 'FeedID';
const dependencies = [
	commonModule.name
];

export default angular
	.module(ROOT_MODULE_NAME, dependencies);
	
//['common', 'feedID.login', 'feedID.register', 'feedID.profile', 'feedID.organiser', 'ngResource', 'ngSanitize', 'googlechart', 'ui.bootstrap', 'ui.router']
