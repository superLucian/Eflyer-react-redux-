# E-Flyer client application


### Development

- **Run the client app with webpack-dev-server and hot reloading**

```
$ npm start
```

- **Run the client app with express and http for local development (HMR)**

```
$ npm run serve-dev
```

- **You can run in specific port and hostname.**

```
$ npm run serve-dev -- --port 6001 --host 192.168.0.1
```

- **You can simulate production environment.**

```
$ npm run serve-prod
```

- **Build the client app in development environment**

```
$ npm run build-dev
```


### Deployment

- **Set environment variables**

e.g.

````
EFLYER_API_HOST: "https://portal.edge-group.com/eflyer"
EFLYER_API_PATH: "/api/v1"
EFLYER_APP_BASE_URL: "/eflyer"
```

- **Build the client app for production deployment**

```
$ npm run build
```
