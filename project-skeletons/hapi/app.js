'use strict';

const SwaggerHapi = require('swagger-hapi');
const Hapi = require('hapi');
const app = new Hapi.Server();

// export setup Promis for testing
module.exports = new Promise(function (resolve, reject) {

  const config = {
    appRoot: __dirname // required config
  };

  SwaggerHapi.create(config, function (err, swaggerHapi) {
    if (err) { throw err; }

    const port = process.env.PORT || 10010;
    const hostname = process.env.HOSTNAME || 'localhost';
    app.connection({ port: port, address: hostname });
    app.address = function () {
      return { port: port };
    };

    app.register(swaggerHapi.plugin, function (err) {
      if (err) {
        console.error('Failed to load plugin:', err);
        reject(err);
      }
      app.start(function () {
        if (swaggerHapi.runner.swagger.paths['/hello']) {
          console.log('try this:\ncurl http://' + hostname + ':' + port + '/hello?name=Scott');
        }
        resolve(app);
      });
    });
  });
});
