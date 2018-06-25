import {Lynx} from './lynx-types'
import {configuration} from './meddler'

export function middleware():(req:any, res:any, next:any) => any { 


   var client = new Lynx(configuration.host, configuration.port, configuration);
   

   return function expressStatsd (req, res, next) {
    var startTime = new Date().getTime();

    function sendStats() {
      var key = req[configuration.requestKey];
      key = key ? key + '.' : '';

      // Status Code
      var statusCode = res.statusCode || 'unknown_status';
      client.increment(key + 'status_code.' + statusCode);
     
      // Response Time
      var duration = new Date().getTime() - startTime;
      client.timing(key + 'response_time', duration);

      cleanup();
    }


    function cleanup() {
      res.removeListener('finish', sendStats);
      res.removeListener('error', cleanup);
      res.removeListener('close', cleanup);
    }

    res.once('finish', sendStats);
    res.once('error', cleanup);
    res.once('close', cleanup);

    if (next) {
      next();
    }
  };


}