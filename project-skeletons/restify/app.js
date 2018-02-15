'use strict';

const SwaggerRestify = require('swagger-restify-mw');
const restify = require('restify');
const app = restify.createServer();

// export setup Promis for testing
module.exports = new Promise(function (resolve, reject) {

  const config = {
    appRoot: __dirname // required config
  };

  SwaggerRestify.create(config, function (err, swaggerRestify) {
    if (err) { throw err; }

    swaggerRestify.register(app);

    const port = process.env.PORT || 10010;
    const hostname = process.env.HOSTNAME || 'localhost';
    
    app.listen(port, function () {
      if (swaggerRestify.runner.swagger.paths['/hello']) {
        console.log('try this:\ncurl http://' + hostname + ':' + port + '/hello?name=Scott');
      }
      resolve(app);
    });
  });
});