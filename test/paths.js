var assert = require('chai').assert;
var paths = require('../paths.js');

describe('Paths', function () {		
	var result = paths.findUsersPath('0','3');
	
	it('findUsersPath should return an object', function () {		
		assert.typeOf(result,'Object');
	});
	
	it('findUsersPath should return hops count', function () {		
		assert.typeOf(result.hops,'number');
	});
	
	it('findUsersPath should return 0 hops if any of the users doesn\'t exists', function () {		
		assert.equal(paths.findUsersPath('-1','1').hops,0);
		assert.equal(paths.findUsersPath('1','-1').hops,0);
	});
	
	it('findUsersPath should return 1 hops if the users are in the same repository', function () {		
		assert.equal(paths.findUsersPath('0','0').hops,1);
	});
});