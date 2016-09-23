/* Alerts Controller */

angular
  .module('BriDash')
  .controller('MapsCtrl', ['$scope', MapsCtrl]);

function MapsCtrl($scope) {
  $scope.alerts = [{
    type: 'success',
    msg: ''
  }, {
    type: 'danger',
    msg: ''
  }];

  $scope.addAlert = function() {
    $scope.alerts.push({
      msg: 'Another alert!'
    });
  };

  $scope.closeAlert = function(index) {
    $scope.alerts.splice(index, 1);
  };
}
