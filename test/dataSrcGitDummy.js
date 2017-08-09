var assert = require('chai').assert;
var data = require('../dataSrcGitDummy.js');

describe('Data Source (Git Dummy)', function () {		
	it('getUser should return an object', function () {	
		assert.typeOf(data.getUser('0'),'Object');
	});
	
	it('getRepo should return an object', function () {	
		assert.typeOf(data.getRepo('0'),'Object');
	});
	
	it('listUserRepos should return an array', function () {	
		assert.typeOf(data.listUserRepos('0'),'Array');
	});
	
	it('listRepoUsers should return an array', function () {	
		assert.typeOf(data.listRepoUsers('0'),'Array');
	});
});