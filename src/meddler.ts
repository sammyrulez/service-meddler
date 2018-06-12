
import "reflect-metadata";
import {Lynx} from './lynx-types'


var  _configuration = {host: 'localhost', port: 8125,requestKey : ''};

export function configure(hostname:string,portNumber:number, applicationName?:string ) {
    _configuration = {host: hostname, port: portNumber,requestKey : applicationName != undefined ? applicationName : ''};
}

export const configuration = _configuration

var client = new Lynx(configuration.host, configuration.port);

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



