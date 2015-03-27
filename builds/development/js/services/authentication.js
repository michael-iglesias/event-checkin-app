myApp.factory('Authentication', function($firebase, $firebaseAuth, $location, FIREBASE_URL) {

  var ref = new Firebase(FIREBASE_URL);
  var simpleLogin = $firebaseAuth(ref);

  var authObj = {
    login: function(user) {
      return simpleLogin.$authWithPassword({
        email: user.email,
        password: user.password
      });
    },

    register: function(user) {
      return simpleLogin.$createUser({
        email: user.email,
        password: user.password
      })
      .then(function(userData) {
        console.log("user " + userData.uid);
        var ref = new Firebase(FIREBASE_URL + 'users');
        var firebaseUsers = $firebase(ref);
        var userInfo = {
          date: Firebase.ServerValue.TIMESTAMP,
          regUser: userData.uid,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email
        };
        firebaseUsers.$set(userData.uid, userInfo);

        return userData;
      }); // .then(userData)
    }, // register()

    signedIn: function() {
      if(ref.getAuth()) {
        return true;
      } else {
        return false;
      }
    }
  }; // authObj

  return authObj;
}); // ***END Authentication Factory
