# gitPath

A REST endpoint that finds a path between two github users (using dummy data), according to their contributions to repositories.

# Usage

Start the REST server:
```
node pathFinder.js
```
 
This will create the following endpoint:

http://localhost:8080/usersPath/[user_id_1]/[user_id_2]

Which can be called by replacing the [user_id_1] and [user_id_2] parameters with user ids, in example:
```
curl -i http://localhost:8080/usersPath/1/3
```
The result is a JSON object, in example: 
```
{
  "pathExists":true,
  "hops":2,
  "path":"User Two -> (repoTwo) -> User Three -> (repoThree) -> User Four",
  "error":0
}
```
# Behavior
The module lists all the repositories that user1 contibuted to and checks if user2 contributed to that repository, if not then it goes deeper another level to each repository and perform the same check, and so on and so on. 
It counts the number of hops until it reaches user2 in each valid path and picks the shortest one.

# Try It
Go to the demo page on http://gitpathdemo.bitballoon.com/ to try it out.

# Files/Folders
- /pathFinder.js: The main endpoint file, used to launch the server
- /paths.js: A module that retrieves information about paths between github users
- /dataSrcGitDummy.js: A mock database holding users and repository data
- /node_modules/: Third-party frameworks
- /test/: Test units - testing can be done by:

```
npm run test
```


