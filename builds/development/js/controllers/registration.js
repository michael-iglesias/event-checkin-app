myApp.controller('RegistrationController', function($rootScope, $route, $scope, $firebaseAuth, $location, Authentication) {

  $scope.login = function() {
    Authentication.login($scope.user)
    .then(function(user) {
      $rootScope.currentUser = user;
      $rootScope.isValidUser = true;
      $location.path('/meetings');
    }, function(err) {
      $scope.message = true;
    });
  }; // ***END login()

  $scope.register = function() {
    Authentication.register($scope.user)
    .then(function(user) {
      Authentication.login($scope.user)
      .then(function(user) {
        $location.path('/meetings');
      });
    }, function(err) {
      $scope.message = true;
    });
  };

}); // ***END RegistrationController
