# Authentication

Passport provides OAuth 2.0 API authentication support via a given user's github account.

### Config
`GITHUB_CLIENT_ID`, 

`GITHUB_CLIENT_SECRET`,

`BOCKS_SECRET`,

`PORT` are stored/exported from local machine's `.bash_profile` file (be sure to `source ~/.bash_profile` after editing).

Github Client Id and Secret keys can be generated under `<your github account>/Settings/OAuth Applications`.

### ServerSide: 
Express redirects user to Github for login validation via `/auth/github` and `auth/github/callback` routes via specified `Strategy` in `server.js`.

User is redirected back to `'/'` or `'/oops'` upon return.

Passport serializes the user and adds a session to mongodb collection 'sessions'.

### ClientSide: 
`app.js` uses `run` to add a listener on angular's `rootScope` that waits for route changes.  Upon invocation, it queries the 'Auth' service which queries the server regarding user session validity.  

Redirects back to the home page if user is not logged in and path is restricted 
(see `config/authenticate` settings in `app.js`).

`Auth` service :
Contains a closure variable `user` which may be `null` or a boolean.

`isLoggedIn()` is a getter method which returns the value of `user`.

`getUserStatus` is a setter method for `user` which queries the server at `/user/status` endpoint, which queries passport as to whether or not this session has a valid user.  Returns a boolean. 

Navigation: 
Visibility of navigation links is controlled by 'NavController' in app.js, which queries the Auth service to establish the user's logged-in status each time index.html is reloaded in order to set the `$scope.display` boolean.  Upon user logout, index.html reload is manually triggered to in order to refresh nav link visibility.

### Caveat: 
No sign-up option is provided: a user is presumed to be familiar with Github as a prequisite for consumption of myBocks.
