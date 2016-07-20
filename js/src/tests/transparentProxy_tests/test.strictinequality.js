new Test('Strict Inequality (!==)/ Default', function() {

  // target values
  var target1 = {};
  var target2 = {};

  // primitives
  var primitive1 = 1;
  var primitive2 = "1";

  this.expect(function() {
    return target1 !== target1;
  }).toBe(false);

  this.expect(function() {
    return target1 !== target2;
  }).toBe(true);

  this.expect(function() {
    return primitive1 !== primitive1;
  }).toBe(false);

  this.expect(function() {
    return primitive1 !== primitive2;
  }).toBe(true);

});

new Test('Strict Inequality (!==)/ Opaque', function() {

  // target values
  var target1 = {};
  var target2 = {};

  this.expect(function() {
    return target1 !== new Proxy(target1, {});
  }).toBe(true);

  this.expect(function() {
    return new Proxy(target1, {}) !== new Proxy(target1, {});
  }).toBe(true);

  this.expect(function() {
    return new Proxy(target1, {}) !== new Proxy(target2, {});
  }).toBe(true);

});

new Test('Strict Inequality (!==)/ Transparent', function() {

  // target values
  var target1 = {};
  var target2 = {};

  this.expect(function() {
    return target1 !== new TransparentProxy(target1, {});
  }).toBe(false);

  this.expect(function() {
    return new TransparentProxy(target1, {}) !== new TransparentProxy(target1, {});
  }).toBe(false);

  this.expect(function() {
    return new TransparentProxy(target1, {}) !== new TransparentProxy(target2, {});
  }).toBe(true);

});

new Test('Strict Inequality (!==)/ Nested', function() {

  // target values
  var target1 = {};
  var target2 = {};

  this.expect(function() {
    return target1 !== new TransparentProxy(new TransparentProxy(target1, {}), {});
  }).toBe(false);

 this.expect(function() {
    return target1 !== new TransparentProxy(new TransparentProxy(target2, {}), {});
  }).toBe(true);

  this.expect(function() {
    return new TransparentProxy(target1, {}) !== new TransparentProxy(new TransparentProxy(target1, {}), {});
  }).toBe(false);

  this.expect(function() {
    return new TransparentProxy(target1, {}) !== new TransparentProxy(new TransparentProxy(target2, {}), {});
  }).toBe(true);

  this.expect(function() {
    return new TransparentProxy(target1, {}) !== new TransparentProxy(new Proxy(target1, {}), {});
  }).toBe(true);

  this.expect(function() {
    return new Proxy(target1, {}) !== new TransparentProxy(new TransparentProxy(target1, {}), {});
  }).toBe(true);

});
