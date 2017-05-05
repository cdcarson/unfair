var program = require('commander');
var _ = require('lodash');
var api = require('./api');
var util = require('util');
var chalk = require('chalk');

var log = function (label, val) {
	console.log( chalk.bold.gray(label + ':'), chalk.cyan(val));
};

program
	.version('0.0.1');
program
	.command('variance')
	.arguments('[numbers...]')
	.description('Get the raw variance of a list of numbers')
	.action(function (numbers) {
		numbers = api.parseArgs(numbers);
		log('Variance', api.variance(numbers));
	});

program
	.command('normalizedVariance')
	.arguments('[numbers...]')
	.description('Get the normalized variance of a list numbers')
	.action(function (numbers) {
		numbers = api.parseArgs(numbers);
		log('Normalized Variance', api.normalizedVariance(numbers));
	});

program
	.command('unfair')
	.arguments('[numbers...]')
	.description('Get the unfairness of a list of numbers')
	.action(function (numbers) {
		numbers = api.parseArgs(numbers);
		log('Unfair', api.unfair(numbers));
	});





// program
// 	.arguments('<numbers...> ')
// 	.option('-v, --variance', 'Show variance')
// 	.option('-u, --unfair', 'Show unfair')
// 	.action(function () {
// 		var showVariance = true;
// 		var showUnfair = true;
// 		var numbers = Array.prototype.slice.call(arguments, 0, arguments.length -1);
// 		var options = Array.prototype.slice.call(arguments, arguments.length -1).pop();
// 		var labels = {
// 			v: 	'Variance',
// 			n: ' (normalized)',
// 			u: 	'Unfairness'
// 		};
// 		var log = function (label, val) {
// 			console.log( chalk.bold.gray(label + ':'), chalk.cyan(val));
// 		};
// 		if (options.variance === true || options.unfair === true){
// 			showVariance = options.variance === true;
// 			showUnfair = options.unfair === true;
// 		}
//
// 		numbers = api.parseArgs(numbers);
//
// 		if (showVariance){
// 			log(labels.v, api.variance(numbers));
// 			log(labels.v + labels.n, api.normalizedVariance(numbers));
// 		}
// 		if (showUnfair) {
// 			log(labels.u, api.unfair(numbers));
// 		//	log(labels.u + labels.n, api.normalizedUnfair(numbers));
// 		}
// 		console.log();
// 	});


program.parse(process.argv);
