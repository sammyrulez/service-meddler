import { homeCtr } from "./homeCtr";
import { fibCtr } from "./fibCtr";
import * as http from 'http';
import * as path from 'path';
import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as meddlerExpress from '../express-meddler';
import *  as meddler from '../meddler';


//import {statsd} from './lynx-types'


// Creates and configures an ExpressJS web server.
class App {

  // ref to Express instance
  public express: express.Application;

  //Run configuration methods on the Express instance.
  constructor() {
    this.express = express();
    this.middleware();
    this.routes();
  }

  // Configure Express middleware.
  private middleware(): void {
    this.express.use(bodyParser.json());
    this.express.use(bodyParser.urlencoded({ extended: false }));
    meddler.configure("localhost",8125,"demoNodeApp")
   this.express.use(meddlerExpress.middleware())
  }

  // Configure API endpoints.
  private routes(): void {
    /* This is just to get up and running, and to make sure what we've got is
     * working so far. This function will change when we start to add more
     * API endpoints */
    let router = express.Router();
    // placeholder route handler
 
    router.get('/', homeCtr());
    router.get('/fib', fibCtr());

    this.express.use('/', router);
  }

}

console.log('ts-express:server');

const port = normalizePort(process.env.PORT || 3000);
const testApp = new App().express

testApp.set('port', port);

const server = http.createServer(testApp);
server.listen(port);
server.on('error', onError);
server.on('listening', onListening);






function normalizePort(val: number|string): number|string|boolean {
  let port: number = (typeof val === 'string') ? parseInt(val, 10) : val;
  if (isNaN(port)) return val;
  else if (port >= 0) return port;
  else return false;
}

function onError(error: NodeJS.ErrnoException): void {
  if (error.syscall !== 'listen') throw error;
  let bind = (typeof port === 'string') ? 'Pipe ' + port : 'Port ' + port;
  switch(error.code) {
    case 'EACCES':
      console.error(`${bind} requires elevated privileges`);
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(`${bind} is already in use`);
      process.exit(1);
      break;
    default:
      throw error;
  }
}

function onListening(): void {
  let addr = server.address();
  let bind = (typeof addr === 'string') ? `pipe ${addr}` : `port ${addr.port}`;
  console.log(`Listening on ${bind}`);
}