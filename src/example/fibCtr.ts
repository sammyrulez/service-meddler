import *  as meddler from '../meddler';

export function fibCtr() {
    return (req:any, res:any) => {
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
      const c = new C();
      let list = [11, 32, 36, 39, 20, 41].map(c.calcFibonacci);
      c.genericHit();
      c.specificHit();
      res.json(list);
    };
  }