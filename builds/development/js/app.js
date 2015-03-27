var myApp = angular.module('myApp',
  ['ngRoute', 'firebase','appControllers'])
  .constant('FIREBASE_URL', 'https://attendancemciapp.firebaseio.com/');

var appControllers = angular.module('appControllers', ['firebase']);

myApp.config(['$routeProvider', function($routeProvider) {
  $routeProvider
  .when('/login', {
    controller: 'RegistrationController',
    templateUrl: 'views/login.html'
  })
  .when('/register', {
    controller: 'RegistrationController',
    templateUrl: 'views/register.html'
  })
  .when('/meetings', {
    controller: 'MeetingsController',
    templateUrl: 'views/meetings.html',
    resolve: {
      // controller will not be loaded until $requireAuth resolves
      // Auth refers to our $firebaseAuth wrapper in the example above
      "currentAuth": ["AuthFB", function(AuthFB) {
        // $requireAuth returns a promise so the resolve waits for it to complete
        // If the promise is rejected, it will throw a $stateChangeError (see above)
        return AuthFB.$requireAuth();
      }]
    }
  })
  .when('/checkins/:uId/:mId', {
    controller: 'CheckinController',
    templateUrl: 'views/checkins.html',
  })
  .when('/checkins/:uId/:mId/checkinsList', {
    controller: 'CheckinController',
    templateUrl: 'views/checkinsList.html',
  })
  .otherwise({
    redirectTo: '/login'
  });
}]);

// Firebase Factory that generates $firebaseAuth instance
myApp.factory("AuthFB", ['$firebaseAuth', function($firebaseAuth) {
  var ref = new Firebase('https://attendancemciapp.firebaseio.com/');
  return $firebaseAuth(ref);
}]);

myApp.run(["$rootScope", "$location", function($rootScope, $location) {
  $rootScope.$on("$routeChangeError", function(event, next, previous, error) {
    // We can catch the error thrown when the $requireAuth promise is rejected
    // and redirect the user back to the home page
    if (error === "AUTH_REQUIRED") {
      $location.path("/login");
    }
  });
}]);
