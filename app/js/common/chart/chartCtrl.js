// FOR REFERENCE https://bouil.github.io/angular-google-chart/#/fat
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
		 this.aChart.data = {};
	}

	loadTests() {
		//init chart
		this.aChart = {};
		this.aChart.data = {};
		this.aChart.type = "LineChart";
		this.aChart.displayed = "true";

		// clear char cols (X) and rows (Y)
		this.cols = [];
		this.rows = [];

		// first cols push is the name of the X-axis
		this.cols.push({
			"id": "time",
			"label": "Time",
			"type": "string",
			"p": {}
		});


		//for each test, check if it is the selectedTest
		for (let test of this.tests.data) {
			if(test._id == this.selectedTest._id) {
				this.loadSubTests(test);
				break;
			}

		}
	}

	// from the found test we need al the subtests ( some tests do have subtests)
	loadSubTests(test) {
		// for each subtest we add an extra line to the chart.
		// All but the first object in the cols( X-axis ) array are lines on the graph == legenda entry
		for (let subTest of test.subTests) {
			this.cols.push({
				"id": subTest.name,
				"label": subTest.name,
				"type": "number",
				"p": {}
			});
		}

		this.aChart.data.cols = this.cols;
			this.loadResults();
	}

	// function called when al subtests (lines) are loaded
	// this function adds values to the Y axis.
	loadResults() {
		/**
		 * For each result of a user.
		 */
		for (let result of this.results.data) {
			if(result.test === this.selectedTest._id) {
				let obj = {};
				obj.c = [];
				obj.c.push({ 'v': result.time.split(" ")[0] });
				obj.c.push(this.loadSubResults(result));
				this.rows.push(obj);
			}
		}

		this.aChart.data.rows = this.rows;
		this.selectedTest.chart = this.rows.length < 1 ?  null : this.aChart;

	}

	loadSubResults(result) {
		let values = {};

		for (let subResult of result.subResults) {
			values.v = subResult;
		}

		return values;
	}

}

angular.module('common.chart').controller('chartCtrl', ChartCtrl);
