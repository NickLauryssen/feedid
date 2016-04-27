class ChartCtrl {

	constructor() {
		/**
		 * For each test we make a new chart and store them in a charts array.(array == store of all test charts)
		 * Some configurations are made for the chart.
		 * The cols[] array represents the X-axis of the graph.
		 * The rows[] array will represent the Y-axis data.
		 */
		 this.cols = [];
		 this.rows = [];
		 this.aChart = {};
		 this.init();
	}

	init() {
		tests();
		results();
	}

	tests() {
		for (let test of this.tests) {
			let testId = test._id;
			this.aChart.type = "LineChart";
			this.aChart.displayed = "true";
			this.aChart.data = {};

			this.cols.push({
				"id": "time",
				"label": "Time",
				"type": "string",
				"p": {}
			});

			subTests(test);
		}
	}

	subTests(test) {
		for (let subTest of test.subTests) {
			this.cols.push({
				"id": subTest.name,
				"label": subTest.name,
				"type": "number",
				"p": {}
			});
		}

		this.aChart.data.cols = cols;
	}

	results() {
		/**
		 * For each result of a user.
		 */
		for (let result of this.results) {
			if(result.test === testId) {
				let obj = {};

				obj.c.push({ 'v': result.time });

				this.rows.push(subResults(result));
			}
		}

		this.aChart.data.rows = this.rows;
		test.chart = this.rows.length < 1 ? this.aChart : null;
	}

	subResults(result) {
		let values = {};

		for (let subResult of result.subResults) {
			values.c.push({ 'v': subResult});
		}

		return values;
	}

}

angular.module('common.chart').controller('chartCtrl', ChartCtrl);
