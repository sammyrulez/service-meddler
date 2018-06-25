import *  as meddler from '../meddler';
import {NextFunction, Request, Response, Router} from "express";

export function fibCtr() {
    return (req: Request, res: Response) => {
      class C {
        @meddler.timer
        calcFibonacci(top: number): number {
          function calculate(i: number): number {
            return (i <= 2) ? 1 : calculate(i - 1) + calculate(i - 2);
          }
          return calculate(top);
        }
        @meddler.count
        genericHit(): void {
          console.log("genericHit");
        }
        @meddler.countKey("customkey_me")
        specificHit(): void {
          console.log("specificHit");
        }
      }
  
        if(req.param("ERROR") != undefined){
          console.log("I'm an error")
          res.status(403);
          res.json({message:"Error"})
        }else{
            const c = new C();
            let list = [11, 12, 6, 9].map(c.calcFibonacci);
            c.genericHit();
            c.specificHit();
            res.json(list);
      }
    };
  }