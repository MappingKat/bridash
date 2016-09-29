angular.module('myApp')
  .controller('mapCtrl', ['$scope', '$http', 'leafletData', function ($scope, $http, leafletData){

    var fixNegativeLongitudes = function (latlng){
      if (latlng.lng<0) {
        latlng.lng = latlng.lng + 360;
      }
      return latlng;
    };

    var getColor = function(status){
      switch (status) {
        case 'Inspections Required':
          c ='blue';
          break;
        case  'Inspection completed':
          c ='green';
          break;
        case  'Inspection Partially Completed':
          c ='orange';
          break;
        case  'Structure requiring immediate attention':
          c ='red';
          break;
        case  'New Bridge':
          c ='yellow';
          break;
        case  'General Inspections Required':
          c ='violet';
          break;
        case  'Duplicate':
          c ='black';
          break;
      }
      return c;
    };

    var createGeoJsonObject = function (data){
      return {
        data: data,
        pointToLayer: function(feature,latlng){
          var icon = new L.Icon.Default();
          var greenIcon = new L.Icon({
            iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-'+getColor(feature.properties._status)+'.png',
            shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
            iconSize: [25, 41],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34],
            shadowSize: [0, 0]
          });
          
          icon.options.shadowSize = [0,0];
          marker = L.marker(fixNegativeLongitudes(latlng), {icon: greenIcon});
          marker.bindPopup('<a href="https://web.fulcrumapp.com/records/'+ feature.properties._record_id + '" target="_blank">'+ feature.properties.sec_overview_fra_id + '</a>');
          return marker;
        }
      };
    };

    $http.get("https://api.fulcrumapp.com/api/v2/query/?format=geojson&q=SELECT%20sec_overview_fra_id,_record_id,_status,_geometry%20FROM%20%22Fiji%20Bridges%20Individual%20Inspections%22&token=d24fa42cfbeec55070c4696935504980e7a7a0e692c595182e96918b438f85c0eefc9907fd7fad40").success(function(data, status) {
      angular.extend($scope, {
        geojson: createGeoJsonObject(data)
      });
    });

    angular.extend($scope, {
      fiji: {
        lat: -17.6,
        lng: 179,
        zoom: 8
      },
      layers: {
        baselayers: {
          osm: {
            name: 'Stamen',
            type: 'xyz',
            url: 'http://tile.stamen.com/terrain/{z}/{x}/{y}.jpg',
          }
        }
      },
      defaults: {
        scrollWheelZoom: false
      },
      // ApplyFilters: function(){
      //   var filteredData = angular.copy($scope.geojson.data);
      //   filteredData = $filter('byStatus')(filteredData,$scope.filterOptions.Statuses);
      //   filteredData = $filter('byFulcrumStatus')(filteredData,$scope.filterOptions.FulcrumStatuses);
      //   filteredData = $filter('byFRA_ID')(filteredData,$scope.filterOptions.FRAIDs);
      //   filteredData = $filter('byInspectorName')(filteredData,$scope.filterOptions.Names);
      //   filteredData = $filter('byInspectionDates')(filteredData,$scope.filterOptions.Dates);
      //   $scope.geojson.data = angular.copy(filteredData);
      // },
      // filterOptions: function() {
      //   FRAIDs: "",
      //   Statuses: [{
      //     name: "Uninspected",
      //     id: "1",
      //     selected: true
      //   },{
      //     name: "Inspected",
      //     id: "2",
      //     selected: true
      //   },{
      //     name: "Reviewed",
      //     id: "3",
      //     selected: true
      //   },{
      //     name: "Approved",
      //     id: "4",
      //     selected: true
      //   }],
      //   FulcrumStatuses: [{
      //     name: "Inspections Required",
      //     selected: true
      //   },{
      //     name: "Inspection completed",
      //     selected: true
      //   },{
      //     name: "Inspection Partially Completed",
      //     selected: true
      //   },{
      //     name: "Structure requiring immediate attention",
      //     selected: true
      //   },{
      //     name: "New Bridge",
      //     selected: true
      //   },{
      //     name: "Duplicate",
      //     selected: true
      //   }],
      //   Names: "",
      //   Dates: {
      //     From: "",
      //     To: ""
      //   }
      // },
      // FRA_ID_query: "",
    });


    // $scope.ApplyAllFilters = function(){
    //   ApplyFilters()
    // }

    // $scope.$watch('FRA_ID_query',function(newVal,oldVal){
    //   if (newVal !== oldVal) {
    //     $scope.filterOptions.FRAIDs = newVal;
    //     //console.log($scope.filterOptions)
    //     $scope.ApplyAllFilters($scope.filterOptions)
    //     //$scope.geojson.data = angular.copy($filter('byFRA_ID')($scope.geojson,newVal));
    //   } else {
    //    $scope.geojson.data = angular.copy($scope.geojson.data);
    //   }
    // });
    
    // $scope.$watch('inspectionStatusFilterOptions', function(newVal, oldVal){
    //   //console.log(newVal)
    //   if (newVal !== oldVal) {
    //     $scope.filterOptions.Statuses = newVal;
    //     //$scope.geojson.data = angular.copy($filter('byStatus')($scope.geojson.data,newVal));
    //     //console.log($scope.geojson.data)
    //     $scope.ApplyAllFilters($scope.filterOptions)
    //   } else {
    //     //console.log("new == old")
    //     $scope.geojson.data = angular.copy($scope.geojson.data);
    //   }
    // }, true);
    
    // $scope.$watch('fulcrumStatusFilterOptions', function(newVal, oldVal){
    //   //console.log(newVal)
    //   if (newVal !== oldVal) {
    //     $scope.filterOptions.FulcrumStatuses = newVal;
    //     $scope.ApplyAllFilters($scope.filterOptions)
    //   } else {
    //     //console.log("new == old")
    //     $scope.geojson.data = angular.copy($scope.geojson.data);
    //   }
    // }, true);
    
    // $scope.FilterNames = "";
    // $scope.$watch('FilterNames',function(newVal,oldVal){
    //    if (newVal !== oldVal) {
    //     $scope.filterOptions.Names = newVal;
    //     //console.log($scope.filterOptions)
    //     $scope.ApplyAllFilters($scope.filterOptions)
    //     //$scope.geojson.data = angular.copy($filter('byFRA_ID')($scope.geojson,newVal));
    //    } else {
    //     $scope.geojson.data = angular.copy($scope.geojson.data);
    //    }
    // });
    
    // $scope.$watch('FilterDateTo',function(newVal,oldVal){
    //    if (newVal !== oldVal) {
    //     $scope.filterOptions.Dates.To = newVal;
    //     //console.log($scope.filterOptions)
    //     $scope.ApplyAllFilters($scope.filterOptions)
    //     //$scope.geojson.data = angular.copy($filter('byFRA_ID')($scope.geojson,newVal));
    //    } else {
    //     $scope.geojson.data = angular.copy($scope.geojson.data);
    //    }
    // });
    
    // $scope.$watch('FilterDateFrom',function(newVal,oldVal){
    //    if (newVal !== oldVal) {
    //     $scope.filterOptions.Dates.From = newVal;
    //     //console.log($scope.filterOptions)
    //     $scope.ApplyAllFilters($scope.filterOptions)
    //     //$scope.geojson.data = angular.copy($filter('byFRA_ID')($scope.geojson,newVal));
        
    //    } else {
        
    //     $scope.geojson.data = angular.copy($scope.geojson.data);
    //    }
    // });
    
    // $scope.clearFRAIDsFilter = function(){
    //   $scope.FRA_ID_query = "";
    // }
    
    // $scope.filterByArea = function(){
    //   var ptsWithin = turf.within($scope.geojson.data,drawnSelections.toGeoJSON())
    //   console.log(ptsWithin)
    //   $scope.geojson.data = angular.copy(ptsWithin);
    // }
    
    // $scope.clearAllFilters = function(){
    //   $scope.inspectionStatusFilterOptions = angular.copy(initialInspectionStatusFilterOptions);
    //   $scope.filterOptions.Statuses = $scope.inspectionStatusFilterOptions;
    //   $scope.FRA_ID_query  = "";
    //   $scope.filterOptions.FRAIDs = $scope.FRA_ID_query;
    //   //clear any area filter
    //   //clear the fulcrum status filter
    //   fulcrumStatusFilterOptions = angular.copy(initialFulcrumStatusFilterOptions)
    //   $scope.filterOptions.FulrumStatuses = fulcrumStatusFilterOptions;
    //   //reapply the filters
    //   $scope.ApplyAllFilters($scope.filterOptions) 
    // }
  }]
);

