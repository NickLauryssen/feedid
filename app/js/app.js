'use strict';

angular.module('common.filters', []);
angular.module('common.search', []);
angular.module('common.services', []);
angular.module('common.tab', []);
angular.module('common.chart', []);
angular.module('common.medic-card',[]);
angular.module('common.medic-point', []);
angular.module('common', ['common.filters', 'common.search', 'common.services', 'common.tab', 'common.chart', 'common.medic-card', 'common.medic-point','ui.router']);
angular.module('feedID.api', ['common']);
angular.module('feedID.organiser', ['common']);
angular.module('feedID.profile', ['common']);
angular.module('feedID.register', ['common']);
angular.module('feedID.login', ['common']);
angular.module('feedID.administrator', []);
angular.module('feedID', ['common', 'feedID.login', 'feedID.register', 'feedID.profile', 'feedID.organiser', 'feedID.administrator', 'ngResource', 'ngSanitize', 'googlechart', 'ui.bootstrap', 'ui.router']);
