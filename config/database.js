'use strict';

module.exports = function(mongoose) {

	process.env.NODE_ENV = process.env.NODE_ENV || 'development';

	const database = {
	
		'development': {
			url: 'mongodb://localhost:27017/mean-dev'
		},

		'production': {
			url: 'mongodb://localhost:27017/mean'
		},

		'test': {
			url: 'mongodb://localhost:27017/mean-test'
		},

		'stagging': {
			url: 'mongodb://localhost:27017/mean-stagging'
		}
	};

	var connection_link = database[process.env.NODE_ENV].url

	mongoose.connect(connection_link);
	mongoose.connection.once('connected', function() {
	  console.log(".....DB CONNECTED ("+ process.env.NODE_ENV +")....");
	});
	
}

