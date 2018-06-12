import {timer} from './meddler'
import 'mocha';  
import { expect } from 'chai'; 
import { Response, Request, Express } from 'express';
import * as homeController from './example/homeCtr'
import * as fibonacciController from './example/fibCtr'
import {createRequest,createResponse} from 'node-mocks-http' 

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