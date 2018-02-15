'use strict';

const SwaggerExpress = require('swagger-express-mw');
const app = require('express')();
// export setup Promis for testing
module.exports = new Promise(function (resolve, reject) {

  const config = {
    appRoot: __dirname // required config
  };

  SwaggerExpress.create(config, function (err, swaggerExpress) {
    if (err) { throw err; }

    // install middleware
    swaggerExpress.register(app);

    const port = process.env.PORT || 10010;
    const hostname = process.env.HOSTNAME = 'localhost';
    app.listen(port, hostname, function() {
      if (swaggerExpress.runner.swagger.paths['/hello']) {
        console.log('try this:\ncurl http://127.0.0.1:' + port + '/hello?name=Scott');
      }
      resolve(app);
    });
  });
});