var program = require('commander');
var _ = require('lodash');
var api = require('./api');
var cases = require('./cases');

program
	.version('0.0.1');

program
	.command('variance')
	.arguments('<number> [moreNumbers...]')
	.action(function (number, moreNumbers) {
		var variance;
		moreNumbers.unshift(number);
		moreNumbers = api.validateArgs(moreNumbers);
		variance = api.variance(moreNumbers);
		console.log(variance);
	});

program
	.command('normalizedVariance')
	.arguments('<number> [moreNumbers...]')
	.action(function (number, moreNumbers) {
		var variance;
		moreNumbers.unshift(number);
		moreNumbers = api.validateArgs(moreNumbers);
		variance = api.normalizedVariance(moreNumbers);
		console.log(variance);
	});

program.parse(process.argv);
