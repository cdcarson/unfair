var _ = require('lodash');
var util = require('util');

var validateListOfFloatArgs = module.exports.parseArgs = function (list) {
	var floats = _.map(list, parseFloat);
	_.each(floats, function (number, i) {
		var err;
		if (_.isNaN(number)){
			err = util.format('The argument at index %s, "%s", could not be parsed as a float.', i, number);
			throw(new Error(err));
		}
		if (number < 0){
			err = util.format('The argument at index %s, "%s", is less than 0.', i, number);
			throw(new Error(err));
		}
	});
	return floats;
};

var variance = module.exports.variance = function (list) {
	var floats = validateListOfFloatArgs(list);

	var n = floats.length;
	var sum1;
	var sum2;
	var mean;
	if (n < 2){
		return 0;
	}
	sum1 = 0 + _.sum(floats);
	mean = sum1 / n;
	sum2 = _.sumBy(floats, function(value) {
		return Math.pow(value - mean, 2);
	});
	// return sum2 / (n - 1);
	// I think the dividing by n is right, rather than (n-1), because we're working from a full dataset...
	return sum2 / n;
};

var worstCase = module.exports.worstCase = function (list) {
	var floats = validateListOfFloatArgs(list);
	var n = floats.length;
	var sum = _.sum(floats);
	floats = _.fill(floats, 0);
	floats[0] = sum;
	return floats;
};
var bestCase = module.exports.bestCase = function (list) {
	var floats = validateListOfFloatArgs(list);
	var n = floats.length;
	var sum = _.sum(floats);
	var mean = sum/n;
	floats = _.fill(floats, mean);
	return floats;
};

var normalizedVariance = module.exports.normalizedVariance = function (list) {
	var floats = validateListOfFloatArgs(list);
	var best = bestCase(floats);
	var worst = worstCase(floats);
	var actual = variance(floats);
	best = variance(best);
	worst = variance(worst);
	if (worst === 0){
		return worst;
	}
	return actual/( worst - best);
};

var unfair = module.exports.unfair = function (list) {
	var floats = validateListOfFloatArgs(list);
	var n = floats.length;
	var sum = _.sum(floats);
	var diff = _.max(floats) - _.min(floats);
	if (sum === 0){
		return 0;
	}
	return diff/sum;
};
