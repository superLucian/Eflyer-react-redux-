# E-Flyer server application


### Development
- **Start the server, serving the client app**

    The client app should have been built in advance.

```
$ npm start
```

- **Start the server, also building and serving the client app (webpack-dev-middleware)**

    Please ensure that dependencies have been installed for the client app.

    This should be very useful for development as both server and client can be started together with a single command.

```
$ npm run dev
```

- **Start the server, serving the client app, in watch mode**

    The client app should have been built in advance.

```
$ npm run watch
```

- **Start the server, only with the node-api, in watch mode**

    The client app should be started separately in this case.

```
$ npm run api
```

- **Setup new tables needed for e-flyer**

    The tables can be created by running Sequelize.js migrations.

```
$ npm install -g sequelize-cli

$ sequelize db:migrate
```
