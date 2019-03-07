const mixin = require('../../../lib/utils/mixin')

class Test {
  constructor() {
    this.a = 1
  }
}

mixin(Test, "public", "b", function () {
  return this.a;
});
let test = new Test();
console.log(test.b());