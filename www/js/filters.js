'use strict';

/* Filters */

angular.module('drugFilters', []).filter('searchDrugs', function() {
    return function(arr, searchString){
		
		if(!searchString){
			return arr;
		}
		var result = [];
		searchString = searchString.toLowerCase();
		angular.forEach(arr, function(item){
			if(item.ProductName.toLowerCase().indexOf(searchString) !== -1){
			result.push(item);
		}
		});
		return result;
	};
});
