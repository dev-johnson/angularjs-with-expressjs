var recordRetival = angular.module('dynamic-table')

recordRetival.service('collectRecords', function($http){

	this.getData = function(link, removeColumns){
		return  $http.get(link).then(function(response){

			var values=[];
			var firstRecord;
			var columns=[];
			var data;

			values = response.data;

			firstRecord = values[0];

			angular.forEach(firstRecord,function(value, key) {
				if(removeColumns.indexOf(key) === -1){
					columns.push(key)
				}
			});

   			data = {"records": values , "columns": columns};

   			return data
		});

	}
});