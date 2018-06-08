
import "reflect-metadata";
import {Lynx} from './lynx-types'


var  options = {host: 'localhost', port: 32773,requestKey : ''};
var client = new Lynx(options.host, options.port);

export function timer(target: any, propertyName: string, descriptor: TypedPropertyDescriptor<Function>) {
   
    let method = descriptor.value;
    
    descriptor.value = function () {
        var startTime = new Date().getTime();
        const outVal = method.apply(this, arguments);
        var duration = 1 + startTime - new Date().getTime(); ;
     
        const key = method.name ;
        console.log("timer "+ propertyName + " "+ key +  " end " + duration + " ms");
        client.timing(key, duration);
        return outVal;
    }
}


class C {

    @timer
    calcFibonacci(top:number):void {
        function calculate(i : number) : number{
            return (i <= 2) ? 1 : calculate(i -1 ) + calculate(i -2);		
        }

        const calO = calculate(top);

    }
}

const c = new C()
let list = [11,12,16,18,20,11,12,16,18,20,11,12,16,18,20,11,12,16,18,20,11,12,16,18,20,11,12,16,18,20,11,12,16,18,20,11,12,16,18,20];
 while(true)
    for (let i of list) {
        console.log(i); 
        c.calcFibonacci(i);
    }
    
