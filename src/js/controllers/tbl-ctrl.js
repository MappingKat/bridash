angular.module('myApp')
  .controller('tableCtrl', ['$scope', '$http', tableCtrl]);

function tableCtrl($scope,$http) {
  $http.get("https://api.fulcrumapp.com/api/v2/query/?format=jsonp&q=SELECT%20_record_id,_status,_longitude,_latitude,inspector_name,inspection_type,date,sec_form_category,bridge_type,culvert_type,original_status,sec_overview_bridge_id,sec_overview_bridge_id,sec_overview_bridge_name,sec_overview_fra_id,reviewer,reviewed_date,reviewers_signature,approver,approved_date,approvers_signature,reviewer_approver_comments,total_cost%20FROM%20%22Fiji%20Bridges%20Individual%20Inspections%22&token=d24fa42cfbeec55070c4696935504980e7a7a0e692c595182e96918b438f85c0eefc9907fd7fad40")
    .success(function(result) {
      $scope.bridges = result['rows'];
      console.log(result['rows']);
    })
}