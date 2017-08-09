// Dummy data representing a virtual git database


// datUsers - Users list
// uName - string: The user name
// uConRepIds - array: A list of repositoriy ids that the user contributed to
var datUsers = {
	'0':{
		'uName':'User One',
		'uConRepIds': ['0']
	},
	'1':{
		'uName':'User Two',
		'uConRepIds': ['0','1']
	},
	'2':{
		'uName':'User Three',
		'uConRepIds': ['1','2']
	},
	'3':{
		'uName':'User Four',
		'uConRepIds': ['2']
	}
};


// datRepos - Repositories list
// uName - string: The repository name
// uConRepIds - array: A list of users ids that contributed to this repository
var datRepos = {
	'0':{
		'rName':'repoOne',
		'rConUserIds': ['0','1']
	},
	'1':{
		'rName':'repoTwo',
		'rConUserIds': ['1','2']
	},
	'2':{
		'rName':'repoThree',
		'rConUserIds': ['2','3']
	}
};



// dataSrcGit - provides data about gitHub entities
dataSrcGit = {	
		// getUser - provides info about a specific user
		// userId - string: a user id
		getUser: function(userId) {
			if (!datUsers[userId]) return null;
				else return datUsers[userId];
		},
		
		
		// getRepo - provides info about a specific repository
		// repoId - string: a repository id
		getRepo: function(repoId) {
			if (!datRepos[repoId]) return null;
				else return datRepos[repoId];
		},
		
		// listUserRepos - returns a list of repository ids for a specific user
		// userId - string: a user id
		listUserRepos: function(userId) {
			if (!datUsers[userId] || !datUsers[userId]['uConRepIds']) return null;
				else return datUsers[userId]['uConRepIds'];
		},
		
		// listRepoUsers - returns a list of user ids for a specific repository
		// repoId - string: a repository id
		listRepoUsers: function(repoId) {
			if (!datRepos[repoId] || !datRepos[repoId]['rConUserIds']) return null;
				else return datRepos[repoId]['rConUserIds'];
		}
};


module.exports = dataSrcGit;