/* Master Controller */

angular.module('myApp')
  .controller('MasterCtrl', ['$scope', '$cookieStore', MasterCtrl]);

function MasterCtrl($scope, $cookieStore) {
  /* Sidebar Toggle & Cookie Control */
  var mobileView = 992;

  $scope.getWidth = function() {
    return window.innerWidth;
  };

  $scope.$watch($scope.getWidth, function(newValue, oldValue) {
    if (newValue >= mobileView) {
      if (angular.isDefined($cookieStore.get('toggle'))) {
        $scope.toggle = ! $cookieStore.get('toggle') ? false : true;
      } else {
        $scope.toggle = true;
      }
    } else {
      $scope.toggle = false;
    }
  });

  $scope.toggleSidebar = function() {
    $scope.toggle = !$scope.toggle;
    $cookieStore.put('toggle', $scope.toggle);
  };

  window.onresize = function() {
    $scope.$apply();
  };
}

// angular.module('myApp')
//   .service('UserService', ['$http',function($http) {
//     var service = this;
//     this.user = {};
//     this.login = function(email, pwd) {
//       $http.get('/auth',{ username: email, password: pwd}).success(function(data){
//         service.user = data; 
//       });      
//     };
//     this.register = function(newuser) {
//       return $http.post('/users', newuser);
//     };
//   }]);
