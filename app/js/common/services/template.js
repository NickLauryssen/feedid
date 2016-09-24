class Template {
	constructor() {
		this.PATTERN = /\.([0-9a-z]+)(?:[\?#]|$)/i;
		this.instance = {
			formatUrl: this.formatUrl
		};
	}

	formatUrl(templateUrl, moduleName) {
		return `js/${moduleName}/views/${templateUrl}.html`;
	}

	$get() {
		return this.instance;
	}
}

angular.module('common.services').provider('template', Template);
