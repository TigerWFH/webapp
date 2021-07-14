/* eslint-disable no-caller */
function Person() {
  if (this instanceof Person) {
    console.log("instanceof ===> using new");
  }
  if (this.constructor === arguments.callee) {
    console.log("constructor ===> using new");
  }
  if (this.__proto__ === arguments.callee.prototype) {
    console.log("prototype ===> using new");
  }
}
