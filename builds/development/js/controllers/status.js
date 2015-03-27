myApp.controller('StatusController', function($scope, $rootScope, $window, $route, $firebase, FIREBASE_URL, AuthFB, Authentication, $location) {

  AuthFB.$onAuth(function(authData) {
    if(typeof authData === 'undefined' || authData === null) {

    } else {
      var ref = new Firebase(FIREBASE_URL + '/users/' + authData.uid);
      var user = $firebase(ref).$asObject();

      user.$loaded().then(function() {
        $rootScope.currentUser = user;
      });
    }

  });

  $scope.logout = function() {
    AuthFB.$unauth();
    $rootScope.currentUser = null;
    $location.path('/login');
    $window.location.reload();
  };

}); // StatusController
