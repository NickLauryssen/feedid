'use strict';

angular.module('common.filters', []);
angular.module('common.search', []);
angular.module('common', ['common.filters', 'common.search']);
angular.module('feedID.api', []);
angular.module('feedID.organiser', []);
angular.module('feedID.profile', ['common']);
angular.module('feedID.register', []);
angular.module('feedID.login', []);
angular.module('feedID',['ngResource','ngRoute','ngSanitize','googlechart', 'ui.bootstrap', 'feedID.login', 'feedID.register', 'feedID.profile', 'feedID.organiser']);
