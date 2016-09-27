angular.module('myApp')
  .controller('mapCtrl', ['$scope', '$http', 'leafletData', function ($scope, $http, leafletData){

    var getStyle = function(feature){
      return {
        color: getColor(feature.properties._status),
       
      };
    };

    var getColor = function(status){
      switch (status) {
        case  'Inspections Required':
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
          c ='purple';
          break;
        case  'Duplicate':
          c ='brown';
          break;
      }
      return c;
    };

    var createGeoJsonObject = function (data){
      return {
        data: data,
        style: L.circleMarker(data.geometry.coordinates, getStyle);
      };
    };

    angular.extend($scope, {
      fiji: {
        lat: -17.6,
        lng: 179,
        zoom: 8
      },
      layers: {
        baselayers: {
          osm: {
            name: "Stamen",
            url: "http://tile.stamen.com/terrain/{z}/{x}/{y}.jpg",
          }
        },
        overlays: {}
      },
      defaults: {
        scrollWheelZoom: false
      },
      inspectionStatusFilterOptions:[{
        name: "Uninspected",
        id: "1",
        selected: true
      },{
        name: "Inspected",
        id: "2",
        selected: true
      },{
        name: "Reviewed",
        id: "3",
        selected: true
      },{
        name: "Approved",
        id: "4",
        selected: true
      }],
      initialFulcrumStatusFilterOptions: [{
        name: "Inspections Required",
        selected: true
      },{
        name: "Inspection completed",
        selected: true
      },{
        name: "Inspection Partially Completed",
        selected: true
      },{
        name: "Structure requiring immediate attention",
        selected: true
      },{
        name: "New Bridge",
        selected: true
      },{
        name: "Duplicate",
        selected: true
      }]
    });

  $http.get("https://api.fulcrumapp.com/api/v2/query/?format=geojson&q=SELECT%20sec_overview_fra_id,_record_id,_status,_geometry%20FROM%20%22Fiji%20Bridges%20Individual%20Inspections%22&token=d24fa42cfbeec55070c4696935504980e7a7a0e692c595182e96918b438f85c0eefc9907fd7fad40").success(function(data, status) {
    angular.extend($scope, {
      geojson: createGeoJsonObject(data)
    });
  });
}]);

