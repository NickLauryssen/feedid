import ChartCtrl from './chart/chartCtrl';
import FiChart from './chart/chartDirective';
import range from './filters/filters';
import SearchCtrl from './search/controllers/searchCtrl';
import AppService from './services/appService';
import AuthService from './services/authService';
import CountryService from './services/countryService';
import Template from './services/template';
import TestService from './services/testService';
import UserService from './services/userService';
import TabCtrl from './tabs/tabCtrl';
import FiTab from './tabs/tabDirective';

const MODULE_NAME = 'FeedID.common';
const dependencies = [];

export angular
	.module(MODULE_NAME, dependencies)
	.controller('chartCtrl', ChartCtrl)
	.directive('fiChart', FiChart)
	.filter('range', range)
	controller('SearchCtrl', SearchCtrl)
	.service('appService', AppService)
	.service('authService', AuthService)
	.service('countryService', CountryService)
	.provider('template', Template)
	.service('testService', TestService)
	.service('userService', UserService)
	.controller('tabCtrl', TabCtrl)
	.directive('fiTab', FiTab);
