'use strict';

const SwaggerConnect = require('swagger-connect');
const app = require('connect')();
// export setup Promis for testing
module.exports = new Promise(function (resolve, reject) {
  const config = {
    appRoot: __dirname // required config
  };

  SwaggerConnect.create(config, function (err, swaggerConnect) {
    if (err) { throw err; }

    // install middleware
    swaggerConnect.register(app);

    const port = process.env.PORT || 10010;
    const hostname = process.env.HOSTNAME || 'localhost';
    app.listen(port, hostname);

    if (swaggerConnect.runner.swagger.paths['/hello']) {
      console.log('try this:\ncurl http://127.0.0.1:' + port + '/hello?name=Scott');
    }
    resolve(app);
  });
});