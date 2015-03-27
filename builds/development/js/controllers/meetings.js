myApp.controller('MeetingsController', ["currentAuth","$rootScope", "$scope", "$firebase", "FIREBASE_URL", "AuthFB", function(currentAuth, $rootScope, $scope, $firebase, FIREBASE_URL, AuthFB) {

  var authData = AuthFB.$getAuth();

  var meetingsRef = new Firebase('https://attendancemciapp.firebaseio.com/users/' + authData.uid + '/meetings');
  var meetingsInfo = $firebase(meetingsRef);
  var meetingsObj = $firebase(meetingsRef).$asObject();
  var meetingsArray = $firebase(meetingsRef).$asArray();

  meetingsObj.$loaded().then(function(data) {
    $scope.meetings = meetingsObj;
  }); // Meetings Object loaded

  meetingsArray.$loaded().then(function(data) {
    $rootScope.howManyMeetings = meetingsArray.length;
  }); // meetings array loaded

  meetingsArray.$watch(function() {
    $rootScope.howManyMeetings = meetingsArray.length;
  }); // meetings array loaded

  $scope.addMeeting = function() {
    meetingsInfo.$push({
      name: $scope.meetingName,
      date: Firebase.ServerValue.TIMESTAMP
    }).then(function() {
      $scope.meetingName = "";
    })
  };

  $scope.deleteMeeting = function(key) {
    meetingsInfo.$remove(key);
  }
}]);
