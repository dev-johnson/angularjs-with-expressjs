var table = angular.module('dynamic-table', ['ngRoute','ui.bootstrap', 'angular.filter']);

table.component('dynamicTable', {

	templateUrl: "dynamic-table/dynamicTable.html",

	bindings: {
		removeColumns: '='
	},

	controller: function($http, $attrs, $window, collectRecords){
		var ctrl = this

		var url = $attrs.tableSource;
		
		var removeColumns = $attrs.removeColumns;

		this.columns = [];
        this.obj = {};

        ctrl.showForm = false;

		collectRecords.getData(url, removeColumns).then(function(data){
			ctrl.records = data.records;
			ctrl.columns = data.columns;
		});


		ctrl.cancel = function() {
			ctrl.showForm = false;
			ctrl.editbtn = false;
			ctrl.addbtn = true;
			this.obj = {};
		}

		ctrl.show = function() {
			ctrl.showForm = true;
			ctrl.addbtn = true;
		}

		ctrl.addRecord = function(){
			var newrecord = {};
			angular.forEach(this.obj,function(value, key) {
				newrecord[key] = value;
			});
			ctrl.records.push(newrecord);
			// reset the form data
			this.obj = {};
		}

		ctrl.deleteRecord = function(index){
			if ($window.confirm("Do you want to delete ?")) {
				ctrl.records.splice(index, 1);
			}
		}

		ctrl.editRecord = function(index) {
			ctrl.showForm = 'true';
			ctrl.editbtn = true;
			ctrl.addbtn = false;
			var edit = {};
			edit = ctrl.records[index];
			angular.forEach(edit, function(value, key) {
				ctrl.obj[key] = value;
			});
			this.updatekey = index;
			
		}

		ctrl.updateRecord = function(index){
        	var updatedrecord = {};

			angular.forEach(this.obj,function(value, key) {
				updatedrecord[key] = value;
			});
			this.records[index] = updatedrecord;
			// reset the form data
			this.obj = {};
			ctrl.showForm = false;
		}
		
	}
});