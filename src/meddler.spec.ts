import {timer} from './meddler'
import 'mocha';  
import { expect } from 'chai'; 
import { Response, Request, Express } from 'express';
import * as homeController from './example/homeCtr'
import {createRequest,createResponse} from 'node-mocks-http' 

describe('Controller requests', function () {

    it('should emit response time and status ', async function () {
       
        var request  = createRequest({
            method: 'GET',
            url: '/user/42',
            params: {
              id: 42
            }
        });
            var expectedModels = [{}, {}];
            homeController.homeCtr()(request, createResponse());
         

    });
});