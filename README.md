# <img src="https://png.icons8.com/color/50/000000/old-woman-skin-type-3.png" align="left" valign="middle"> Service Meddler

[![Build Status](https://travis-ci.org/sammyrulez/service-meddler.svg?branch=master)](https://travis-ci.org/sammyrulez/service-meddler) [![Coverage Status](https://coveralls.io/repos/github/sammyrulez/service-meddler/badge.svg?branch=master)](https://coveralls.io/github/sammyrulez/service-meddler?branch=master)

*statd* support for node appplications written in _typescript_

### Warining :: WIP

This project is on an early stage and under heavy development. API can change without notice 

## Configuration

There is a simple factory function  that initialize Meddler globaly
```javascript
import *  as meddler from './meddler';

...

 meddler.configure("localhost",8125,"demoNodeApp") 
 // host and port of the statd server and the name of the application 

```

## Decorators

*   *timer:* method decorator that  cronograph the execution time
*   *count:* method decorator that count how many times the method is called
*   *countKey*: same as _count_ but with a custom key

## Express support

Automagicaly collects  duration and status for each request

```javascript
import * as meddlerExpress from './express-meddler';
import *  as meddler from './meddler';
    
    class App {

    public express: express.Application;

     constructor() {
        this.express = express();
        this.middleware();
        this.routes();
    }

    private middleware(): void {
        meddler.configure("localhost",8125,"demoNodeApp")
        this.express.use(meddlerExpress.middleware())
    }

    }
```

## Roadmap

*   CPU usage
*   Memory usage

