import {timer} from './meddler'
import 'mocha';  
import { expect } from 'chai'; 
import { Response, Request, Express } from 'express';
import * as homeController from './example/homeCtr'
import * as fibonacciController from './example/fibCtr'
import {createRequest,createResponse} from 'node-mocks-http' 
import * as middleware from "./express-meddler";
import *  as meddler from './meddler';



describe('Controller requests', function () {

    it('should emit response time and status ', async function () {

     
       
        var request  = createRequest({
            method: 'GET',
            url: '/',
            params: {
            }
        });
            var expectedModels = [{}, {}];
            homeController.homeCtr()(request, createResponse());
         

    });
    it('should emit custom metrics ', async function () {
       
        var request  = createRequest({
            method: 'GET',
            url: '/fib',
            params: {
            }
        });
            var expectedModels = [{}, {}];
            fibonacciController.fibCtr()(request, createResponse());
    });

});

describe('Middleware ', function () {
    meddler.configure("localhost",8125)
    meddler.configure("localhost",8125,"demoNodeApp")
    it('should record time and status ', async function () {
        var request  = createRequest({
            method: 'GET',
            url: '/fib',
            params: {
            }
        });
        middleware.middleware()(request,createResponse(),null);
    });
});


describe('CPU load and memory usage ', function () {
    
    it('should be tracked as system resources', async function () {
        meddler.startSysStats(10);
    });

 
    after(async function() {
        setTimeout(function(){
            console.log("BASTAAAAAAA")
              meddler.stopSysStats();
          
        },1000) 
      
      });
    
});