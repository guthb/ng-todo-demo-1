"use strict";

app.controller("LoginCtrl", function($scope, $rootScope, $location, AuthFactory){
	// let ref = new Firebase(firebaseURL);

	// $scope.hasUser = false;

	$scope.account = {
		email: "",
		password: ""
	};


	if($location.path() === "/logout"){
		AuthFactory.logout();// ref.unauth();
		$rootScope.isActive = false;
		$location.url('/login');
	}

	$scope.register = () => {
		console.log("you clicked register");
		AuthFactory.registerWithEmail($scope.account).then(function(){
			$scope.login();
		});
	};

	$scope.login = () => {
		console.log("you clicked login");
		AuthFactory.authenticate($scope.account)
			.then(() => {
				$rootScope.isActive = true;
				$location.path("/");
			})
	};

})