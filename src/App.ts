import * as path from 'path';
import * as express from 'express';
import * as logger from 'morgan';
import * as bodyParser from 'body-parser';

import UserRouter from './routes/UserRouter';

class App {
  public express: express.Application;

  constructor() {
    this.express = express();
    this.middleware();
    this.routes();
    this.errors();
  }

  private middleware(): void {
    this.express.use(logger('dev'));
    this.express.use(bodyParser.json());
    this.express.use(bodyParser.urlencoded({ extended: false }));
  }

  private routes(): void {
    const router = express.Router();

    router.get('/', (req, res, next) => {
      res.json({
        message: 'Hello World'
      });
    });

    this.express.use('/', router);
    this.express.use('/api/users', UserRouter);
  }

  private errors() {
    this.express.use((req, res, next) => {
      res.status(404).send({
        status: res.statusCode,
        message: `${req.url} not found.`
      });
    });

    this.express.use((req, res, next) => {
      res.status(500).send({
        status: res.statusCode,
        message: 'Something very strange happened.'
      });
    });
  }
}

export default new App().express;