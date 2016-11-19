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
		 this.noDataText= "Selecteer een test";

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
				//If it is the selected Test , then load its subtests
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

		// now we have setup the chart, lets get some data in it!
		this.loadResults();
	}

	// function called when al subtests (lines) are loaded
	// this function adds values to the Y axis.
	loadResults() {

		/**
		 * For each result of a user.
		 */
		for (let result of this.results.data) {
			// if the result belongs to the selected test add the result
			if(result.test === this.selectedTest._id) {
				//for each data entry, 'c' is used in google-charts to set the information of the data entry
				//The first value pushed in 'c' is the value shown on the X-axis, the second is the actual (numerical) value in the chart
				// this numerical value is a point on the chart
				let dataEntry = {};
				dataEntry.c = [];
				dataEntry.c.push({ 'v': result.time.split(" ")[0] });
				dataEntry.c.push(this.loadSubResults(result));
				this.rows.push(dataEntry);
			}
		}

		// add the rows data set to the chart itself.
		this.aChart.data.rows = this.rows;
		// if there is data available then add the graph to the selectedTest to show it, else don't
		this.selectedTest.chart = this.rows.length < 1 ?  null : this.aChart;
		this.noDataText= "Geen data beschikbaar";

	}


	// Actual value of a subresult is read in loadSubResults
	loadSubResults(result) {
		let values = {};

		for (let subResult of result.subResults) {
			values.v = subResult;
		}

		return values;
	}

}

angular.module('common.chart').controller('chartCtrl', ChartCtrl);
