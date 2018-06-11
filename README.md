# Service Meddler

*statd* support for node appplications written in _typescript_

### Warining :: WIP

This project is on an early stage and under heavy development. API can change without notice 

## Decorators

*   *timer:* method decorator that  cronograph the execution time
*   *count:* method decorator that count how many times the method is called
*   *countKey*: same as _count_ but with a custom key

## Express support

Automagicaly collects  duration and status for each request

```javascript
import * as meddler from './express-meddler';
    ...
    public express: express.Application;
    this.express.use(meddler.expressMeddler())
```

