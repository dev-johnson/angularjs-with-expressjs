var app = require('../app');


/**
 * Get port from environment and store in Express.
 */

var port = process.env.PORT || '3000';

app.set('port', port);
   
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var server = app.listen(app.get('port'), function() {
  console.log('Express server listening on port ' + server.address().port + '(' +  process.env.NODE_ENV + ')');
});
