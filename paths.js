var data = require('./dataSrcGitDummy.js');


// paths - a module to retrieve information about paths between github users
paths = {	
	// findUsersPath - find the path between two users
	// param userId1, userId2 - string: Ids of the two users that we want to find the path for them	
	// param fromRepId - string (optional): a repository id, if not empty value then the given repository will be ignored 
	// param checkedRepos - array (optional): a list of repositories that were already checked and can be ignored
	findUsersPath: function(userId1,userId2,fromRepId,checkedRepos) {	
	
		// Set default values to the result object
		var result = {
			'pathExists':false,
			'hops':0,
			'path': ''
		};
		
		if (!checkedRepos) checkedRepos = [];
		
		// Get the list of repositories user 1 contributed to
		var u1Repos = data.listUserRepos(userId1);		
		if (!u1Repos) return result;		
		//console.log('--- Repos for User: '+userId1);
		
		
		// Iterate the user 1 repositories list
		for (var r in u1Repos) {
			var repoId = u1Repos[r];
			var repoChecked = false;
			for (var cr in checkedRepos)
				if (checkedRepos[cr]==repoId)
				{
					repoChecked = true;
					break;
				}
			//console.log(' -- Repo: '+ repoId);
			if ((fromRepId && fromRepId==repoId) || repoChecked) continue;
			
			checkedRepos.push(repoId);
			
			// List the users that contributed to this repository 
			var repoUserIds = data.listRepoUsers(repoId);		
			if (repoUserIds)
			{
				var nUsersHops = 0;
				var pathAddition = '';
				
				
				// Iterate the repository users 
				for (var ru in repoUserIds)
				{	
					var ruId = repoUserIds[ru];
					//console.log('  - Repo user: '+ ruId +'('+userId2+')');
					
					// If we found user 2, stop the search
					if (ruId==userId2) 
					{
						nUsersHops = 1;	
						pathAddition = data.getUser(ruId)['uName'];
						break;
					}
					else if (ruId!=userId1)
					{
						// If this is not user 2, then go deeper another level
						var uHopsResult = this.findUsersPath(ruId,userId2,repoId,checkedRepos);
						if (uHopsResult && uHopsResult.hops && uHopsResult.hops>0)
						{
							// If going deeper resulted in a valid path and if currently it is also the shortest one that was found, then remember it
							uHopsResult.hops++;
							if (uHopsResult.hops<nUsersHops || nUsersHops==0)
							{
								nUsersHops = uHopsResult.hops;
								pathAddition = data.getUser(ruId)['uName'] + uHopsResult.path;
							}
						}
					}
				}	
				
				
				// If this repository's path is the shortest one right now then set it as the result's path
				if (nUsersHops!=0 && (nUsersHops<result.hops || result.hops==0))
				{
					result.hops = nUsersHops;
					result.path = (fromRepId ? ' -> ' : data.getUser(userId1)['uName'] + ' -> ') + '(' + data.getRepo(repoId)['rName'] + ') -> ' + pathAddition;
				}
			}
			
		}
		
		
		if (result.hops>0) result.pathExists = true; 		
		return result;
	}
};

module.exports = paths; 
