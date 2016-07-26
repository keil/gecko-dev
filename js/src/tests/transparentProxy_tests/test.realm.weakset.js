
new Test('Realm / WeakSet', function() {

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
    var WeakSet = realm.WeakSet();
    WeakSet.add(transparentProxy1);
    return WeakSet.has(transparentProxy1);
  }).toBe(true);

  this.expect(function() {
    var WeakSet = realm.WeakSet();
    WeakSet.add(target1);
    return WeakSet.has(target1);
  }).toBe(true);

  this.expect(function() {
    var WeakSet = realm.WeakSet();
    WeakSet.add(transparentProxy1);
    return WeakSet.has(target1);
  }).toBe(false);

  this.expect(function() {
    var WeakSet = realm.WeakSet();
    WeakSet.add(target1);
    return WeakSet.has(transparentProxy1);
  }).toBe(false);

  this.expect(function() {
    var WeakSet = realm.WeakSet();
    WeakSet.add(1);
    return WeakSet.has(transparentProxy1);
  }).toBe(false);

  this.expect(function() {
    var WeakSet = realm.WeakSet();
    WeakSet.add(transparentProxy1);
    return WeakSet.has(1);
  }).toBe(false);

  this.expect(function() {
    var WeakSet = realm.WeakSet();
    WeakSet.add({});
    return WeakSet.has(1);
  }).toBe(false);

  this.expect(function() {
    var WeakSet = realm.WeakSet();
    WeakSet.add(1);
    return WeakSet.has({});
  }).toBe(false);

  this.expect(function() {
    var WeakSet = realm.WeakSet();
    WeakSet.add(transparentProxy3);
    return WeakSet.has(target1);
  }).toBe(true);

  this.expect(function() {
    var WeakSet = realm.WeakSet();
    WeakSet.add(transparentProxy2);
    return WeakSet.has(target1);
  }).toBe(false);


  this.expect(function() {
    var WeakSet = realm.WeakSet();
    WeakSet.add(transparentProxy2);
    return WeakSet.has(target2);
  }).toBe(false);


  this.expect(function() {
    var WeakSet = realm.WeakSet();
    WeakSet.add(nestedProxy3);
    return WeakSet.has(target1);
  }).toBe(false);

  this.expect(function() {
    var WeakSet = realm2.WeakSet();
    WeakSet.add(nestedProxy3);
    return WeakSet.has(target1);
  }).toBe(true);

  this.expect(function() {
    var WeakSet = realm.WeakSet();
    WeakSet.add(nestedProxy3);
    return WeakSet.has(nestedProxy2);
  }).toBe(false);

  this.expect(function() {
    var WeakSet = realm2.WeakSet();
    WeakSet.add(nestedProxy3);
    return WeakSet.has(nestedProxy2);
  }).toBe(true);

  this.expect(function() {
    var WeakSet = realm2.WeakSet();
    WeakSet.add(nestedProxy3);
    return WeakSet.has(nestedProxy0_3);
  }).toBe(false);

  this.expect(function() {
    var WeakSet = realm.WeakSet();
    WeakSet.add(nestedProxy1_4);
    return WeakSet.has(target2);
  }).toBe(false);

  this.expect(function() {
    var WeakSet = realm.WeakSet();
    WeakSet.add(nestedProxy1_4);
    return WeakSet.has(nestedProxy1_2);
  }).toBe(true);

  this.expect(function() {
    var WeakSet = realm.WeakSet();
    WeakSet.add(target1);
    return WeakSet.delete(target1);
  }).toBe(true);

  this.expect(function() {
    var WeakSet = realm.WeakSet();
    WeakSet.add(transparentProxy1);
    return WeakSet.delete(target1);
  }).toBe(false);

  this.expect(function() {
    var WeakSet = realm2.WeakSet();
    WeakSet.add(transparentProxy1);
    return WeakSet.delete(target1);
  }).toBe(true);

  this.expect(function() {
    var WeakSet = realm2.WeakSet();
    WeakSet.add(transparentProxy2);
    return WeakSet.delete(target1);
  }).toBe(false);

  this.expect(function() {
    var WeakSet = realm.WeakSet();
    WeakSet.add(nestedProxy0);
    return WeakSet.delete(target1);
  }).toBe(false);

  this.expect(function() {
    var WeakSet = realm.WeakSet();
    WeakSet.add(nestedProxy3);
    return WeakSet.delete(target1);
  }).toBe(false);

  this.expect(function() {
    var WeakSet = realm2.WeakSet();
    WeakSet.add(nestedProxy3);
    return WeakSet.delete(target1);
  }).toBe(true);

  this.expect(function() {
    var WeakSet = realm.WeakSet();
    WeakSet.add(nestedProxy3);
    return WeakSet.delete(nestedProxy3);
  }).toBe(true);

  this.expect(function() {
    var WeakSet = realm.WeakSet();
    WeakSet.add(nestedProxy3);
    return WeakSet.delete(nestedProxy3);
  }).toBe(true);

  this.expect(function() {
    var WeakSet = realm.WeakSet();
    WeakSet.add(nestedProxy1_4);
    return WeakSet.delete(nestedProxy1_2);
  }).toBe(true);


});
