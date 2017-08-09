var restify = require('restify');
var paths = require('./paths.js');


// usersPath - REST endpoint that finds path between two users
// params userId1, userId2 - string: Ids of the two users that we want to find the path for them
function usersPath(req, res, next) {
	var result = {'error':1};
	
	// If request parameters were given, try to find the path
	if (req.params.userId1 && req.params.userId2) {
		result = paths.findUsersPath(req.params.userId1,req.params.userId2);	
		if (result) result.error = 0;
	}
	
	// Convert the result to a JSON string and send the response to the client
	res.send(JSON.stringify(result));
	next();
}



//Defining the path of the pathHops endpoint, and its parameters
var endPointDef = '/usersPath/:userId1/:userId2';


// Set up the web server
var server = restify.createServer();
server.get(endPointDef, usersPath);
server.listen(8080, function() {
	console.log('Waiting for request');
});