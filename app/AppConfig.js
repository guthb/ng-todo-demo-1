let isAuth = (AuthFactory) => new Promise ((resolve, reject) => {
  if(AuthFactory.isAuthenticated()){
    console.log("User is authenticated, resolve route promise");
    resolve();
  } else {
    console.log("User is not authenticated, reject route promise");
    reject();
  }
})


app.config(function($routeProvider){
	$routeProvider.
		when('/',{
      templateUrl: 'partials/item-list.html',
      controller: 'ItemListCtrl',
      resolve: {isAuth}
      }).
    when('/items/list',{
			templateUrl: 'partials/item-list.html',
			controller: 'ItemListCtrl',
      resolve: {isAuth}
    	}).
    	when('/items/new', {
      		templateUrl: 'partials/item-new.html',
      		controller: 'ItemNewCtrl',
          resolve: {isAuth}
    	}).
    	when('/items/:itemId', {
      		templateUrl: 'partials/item-details.html',
      		controller: "ItemViewCtrl",
          resolve: {isAuth}
    	}).
      when('/items/:itemId/edit', {
          templateUrl: 'partials/item-new.html',
          controller: "ItemEditCtrl",
          resolve: {isAuth}
      }).
      when('/login', {
        templateUrl: 'partials/login.html',
        controller: "LoginCtrl"
      }).
      when('/logout', {
        templateUrl: 'partials/login.html',
        controller: "LoginCtrl"
      }).
    	otherwise('/');
});

app.run(($rootScope, $location, FIREBASE_CONFIG, AuthFactory) =>{
  firebase.initializeApp(FIREBASE_CONFIG);
  // let todoRef = new Firebase("https://todo-appz2.firebaseio.com/");

//watch method that fires on change of a route.  3 inputs. 
    //event is a change event
    //currRoute is information about your current route
    //prevRoute is information about the route you came from
    $rootScope.$on('$routeChangeStart', function(event, currRoute, prevRoute){
        // checks to see if there is a current user
        var logged = AuthFactory.isAuthenticated();
        
        var appTo;
        
        // to keep error from being thrown on page refresh
        if(currRoute.originalPath){
          // check if the user is going to the auth page = currRoute.originalPath
          // if user is on auth page then appTo is true
          // if it finds something other than /auth it return a -1 and -1!==-1 so resolves to false
          appTo = currRoute.originalPath.indexOf('/login') !== -1; 
        } 

        //if not on /auth page AND not logged in redirect to /auth
        if(!appTo && !logged) {
            event.preventDefault();
            $location.path('/login');
        }
    });  


})



















