"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const meddler = require("../meddler");
function fibCtr() {
    return (req, res) => {
        class C {
            calcFibonacci(top) {
                function calculate(i) {
                    return (i <= 2) ? 1 : calculate(i - 1) + calculate(i - 2);
                }
                return calculate(top);
            }
            genericHit() {
                console.log("genericHit");
            }
            specificHit() {
                console.log("specificHit");
            }
        }
        __decorate([
            meddler.timer,
            __metadata("design:type", Function),
            __metadata("design:paramtypes", [Number]),
            __metadata("design:returntype", Number)
        ], C.prototype, "calcFibonacci", null);
        __decorate([
            meddler.count,
            __metadata("design:type", Function),
            __metadata("design:paramtypes", []),
            __metadata("design:returntype", void 0)
        ], C.prototype, "genericHit", null);
        __decorate([
            meddler.countKey("customkey_me"),
            __metadata("design:type", Function),
            __metadata("design:paramtypes", []),
            __metadata("design:returntype", void 0)
        ], C.prototype, "specificHit", null);
        const c = new C();
        let list = [11, 32, 36, 39].map(c.calcFibonacci);
        c.genericHit();
        c.specificHit();
        res.json(list);
    };
}
exports.fibCtr = fibCtr;
//# sourceMappingURL=fibCtr.js.map