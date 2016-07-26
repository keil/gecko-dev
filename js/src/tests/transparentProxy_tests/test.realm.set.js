
new Test('Realm / Set', function() {

  // target values
  var target1 = { firstProp:"1", secondProp:2};
  var target2 = { 1:1, 2:2.23 }

  var handler = {
    get: function(target, name){
        return name in target?
            true :
            false;
    }
  };

  var realm = TransparentProxy.createRealm();
  var realm2 = TransparentProxy.createRealm();

  var transparentProxy1 = realm.Proxy(target1,handler);
  var transparentProxy2 = realm.Proxy(target2,handler);
  var transparentProxy3 = realm2.Proxy(target1,handler);
  var transparentProxy4 = realm2.Proxy(target2,handler);
  var transparentProxy5 = realm.Proxy(target1,handler);
  var transparentProxy6 = realm2.Proxy(target1,handler);

  var nestedProxy0 = realm.Proxy(target1,handler);
  var nestedProxy1 = realm.Proxy(nestedProxy0,handler);
  var nestedProxy2 = realm.Proxy(nestedProxy1,handler);
  var nestedProxy3 = realm.Proxy(nestedProxy2,handler);
  var nestedProxy0_2 = realm.Proxy(target2,handler);
  var nestedProxy1_2 = realm.Proxy(nestedProxy0_2,handler);
  var nestedProxy1_3 = realm2.Proxy(nestedProxy1_2,handler);
  var nestedProxy1_4 = realm2.Proxy(nestedProxy1_3,handler);

  var nestedProxy0_3 = realm2.Proxy(target1,handler);

  this.expect(function() {
    var set = realm.Set();
    set.add(transparentProxy1);
    return set.has(transparentProxy1);
  }).toBe(true);

  this.expect(function() {
    var set = realm.Set();
    set.add(target1);
    return set.has(target1);
  }).toBe(true);

  this.expect(function() {
    var set = realm.Set();
    set.add(transparentProxy1);
    return set.has(target1);
  }).toBe(false);

  this.expect(function() {
    var set = realm.Set();
    set.add(target1);
    return set.has(transparentProxy1);
  }).toBe(false);

  this.expect(function() {
    var set = realm.Set();
    set.add(1);
    return set.has(transparentProxy1);
  }).toBe(false);

  this.expect(function() {
    var set = realm.Set();
    set.add(transparentProxy1);
    return set.has(1);
  }).toBe(false);

  this.expect(function() {
    var set = realm.Set();
    set.add({});
    return set.has(1);
  }).toBe(false);

  this.expect(function() {
    var set = realm.Set();
    set.add(1);
    return set.has({});
  }).toBe(false);

  this.expect(function() {
    var set = realm.Set();
    set.add(transparentProxy3);
    return set.has(target1);
  }).toBe(true);

  this.expect(function() {
    var set = realm.Set();
    set.add(transparentProxy2);
    return set.has(target1);
  }).toBe(false);


  this.expect(function() {
    var set = realm.Set();
    set.add(transparentProxy2);
    return set.has(target2);
  }).toBe(false);


  this.expect(function() {
    var set = realm.Set();
    set.add(nestedProxy3);
    return set.has(target1);
  }).toBe(false);

  this.expect(function() {
    var set = realm2.Set();
    set.add(nestedProxy3);
    return set.has(target1);
  }).toBe(true);

  this.expect(function() {
    var set = realm.Set();
    set.add(nestedProxy3);
    return set.has(nestedProxy2);
  }).toBe(false);

  this.expect(function() {
    var set = realm2.Set();
    set.add(nestedProxy3);
    return set.has(nestedProxy2);
  }).toBe(true);

  this.expect(function() {
    var set = realm2.Set();
    set.add(nestedProxy3);
    return set.has(nestedProxy0_3);
  }).toBe(false);

  this.expect(function() {
    var set = realm.Set();
    set.add(nestedProxy1_4);
    return set.has(target2);
  }).toBe(false);

  this.expect(function() {
    var set = realm.Set();
    set.add(nestedProxy1_4);
    return set.has(nestedProxy1_2);
  }).toBe(true);

  this.expect(function() {
    var set = realm.Set();
    set.add(target1);
    return set.delete(target1);
  }).toBe(true);

  this.expect(function() {
    var set = realm.Set();
    set.add(transparentProxy1);
    return set.delete(target1);
  }).toBe(false);

  this.expect(function() {
    var set = realm2.Set();
    set.add(transparentProxy1);
    return set.delete(target1);
  }).toBe(true);

  this.expect(function() {
    var set = realm2.Set();
    set.add(transparentProxy2);
    return set.delete(target1);
  }).toBe(false);

  this.expect(function() {
    var set = realm.Set();
    set.add(nestedProxy0);
    return set.delete(target1);
  }).toBe(false);

  this.expect(function() {
    var set = realm.Set();
    set.add(nestedProxy3);
    return set.delete(target1);
  }).toBe(false);

  this.expect(function() {
    var set = realm2.Set();
    set.add(nestedProxy3);
    return set.delete(target1);
  }).toBe(true);

  this.expect(function() {
    var set = realm.Set();
    set.add(nestedProxy3);
    return set.delete(nestedProxy3);
  }).toBe(true);

  this.expect(function() {
    var set = realm.Set();
    set.add(nestedProxy3);
    return set.delete(nestedProxy3);
  }).toBe(true);

  this.expect(function() {
    var set = realm.Set();
    set.add(nestedProxy1_4);
    return set.delete(nestedProxy1_2);
  }).toBe(true);


});
