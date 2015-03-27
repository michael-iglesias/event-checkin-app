myApp.controller('CheckinController', ["$scope", "$firebase", "FIREBASE_URL", "AuthFB", "$routeParams", "$location", "Authentication", function($scope, $firebase, FIREBASE_URL, AuthFB, $routeParams, $location, Authentication) {

  $scope.whichMeeting = $routeParams.mId;
  $scope.whichUser = $routeParams.uId;
  $scope.order="firstName";
  $scope.direction="";
  $scope.isAuthenticated = Authentication.signedIn();

  var ref = new Firebase(FIREBASE_URL + '/users/' + $scope.whichUser + '/meetings/' + $scope.whichMeeting + '/checkins');
  var checkinsList = $firebase(ref).$asArray();
  $scope.checkins = checkinsList;

  $scope.addCheckin = function() {
    var checkinObj = $firebase(ref);
    var myData = {
      firstName: $scope.user.firstName,
      lastName: $scope.user.lastName,
      email: $scope.user.email,
      date: Firebase.ServerValue.TIMESTAMP
    };
    checkinObj.$push(myData).then(function() {
      // send to checkins page
      $location.path('/checkins/' + $scope.whichUser + '/' + $scope.whichMeeting + '/checkinsList');
    });
  }; // addCheckin()

  $scope.deleteCheckin = function(id) {
    var record = $firebase(ref);
    record.$remove(id)
  }; // delete Check-in

  $scope.pickRandom = function() {
    var whichRecord = Math.round(Math.random() * checkinsList.length);
    $scope.recordId = checkinsList.$keyAt(whichRecord);
  }; // pick random

  $scope.showLove = function(item) {
    item.show = !item.show;

    if(item.userState == 'expanded') {
      item.userState = '';
    } else {
      item.userState = 'expanded';
    }

  }; // show love

  $scope.giveLove = function(myItem, myGift) {
    var refLove = new Firebase(FIREBASE_URL + '/users/' + $scope.whichUser + '/meetings/' + $scope.whichMeeting + '/checkins/' + myItem.$id + '/awards');
    var checkinsObj = $firebase(refLove);

    var myData = {
      name: myGift,
      date: Firebase.ServerValue.TIMESTAMP
    };
    checkinsObj.$push(myData);
  }; // give love

  $scope.deleteLove = function(checkinId, award) {
    var refLove = new Firebase(FIREBASE_URL + '/users/' + $scope.whichUser + '/meetings/' + $scope.whichMeeting + '/checkins/' + checkinId + '/awards');
    var record = $firebase(refLove);

    record.$remove(award);
  } // delete love

}]); // CheckinController
