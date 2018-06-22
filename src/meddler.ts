
import "reflect-metadata";
import {Lynx, pidusage} from './lynx-types'
import { loadavg } from "os";


class EmptyTimer implements NodeJS.Timer{
    ref(): void {
        throw new Error("Method not implemented.");
    }    unref(): void {
        throw new Error("Method not implemented.");
    }
}

var  _configuration = {host: 'localhost', port: 8125,requestKey : '', timer: new EmptyTimer() }; //

export function configure(hostname:string,portNumber:number, applicationName?:string ) {
    _configuration = {host: hostname, port: portNumber,requestKey : applicationName != undefined ? applicationName : '', timer:null};
}

export const configuration = _configuration

var client = new Lynx(configuration.host, configuration.port);

export function startSysStats(interval:number) {
    

 
    
    _configuration.timer =  setInterval( function () { //todo worker?
         pidusage(process.pid,function(err:any, stats:any) { //todo types
            //console.log(stats)
            if (err) {
              return;
            }
            const memory = stats.memory / 1024 / 1024;
            const load = loadavg();  
            client.timing("memoryUsage", memory);
            client.timing("cpuUsage", load);
            console.log("ding")
        })}, interval)
        
        console.log("timer " + _configuration.timer )
      

   
        

}

export function stopSysStats() {
   
    clearInterval(_configuration.timer);
}

export function timer(target: any, propertyName: string, descriptor: TypedPropertyDescriptor<Function>) {
   
    let method = descriptor.value;
    
    descriptor.value = function () {
        var startTime = new Date().getTime();
        const outVal = method.apply(this, arguments);
        var duration = 1 +  new Date().getTime() - startTime; 
     
        const key = method.name ;
        client.timing(key, duration);
        return outVal;
    }
}
//TODO config application prefix
export function count(target: any, propertyName: string, descriptor: TypedPropertyDescriptor<Function>) {
   
    let method = descriptor.value;
    
    descriptor.value = function () {
       
        const outVal = method.apply(this, arguments);
        const key = method.name ;
        client.increment(key)
        return outVal;
    }
}

//TODO config application prefix
export function countKey(value: string) {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        client.increment(value)
    };
}



