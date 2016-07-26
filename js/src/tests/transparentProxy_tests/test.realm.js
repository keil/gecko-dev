new Test('Realm / Equality', function() {

  // target values
  var target1 = { firstProp:"1", secondProp:2};
  var target2 = {};

  // Handlers
  var handler = {
    get: function(target, name){
        return name in target?
            true :
            false;
    }
  };

  var realm = TransparentProxy.createRealm();
  var realm2 = TransparentProxy.createRealm();
  var transparentProxy = new TransparentProxy(target1,handler);
  var transparentProxy1 = realm.Proxy(target1,handler);
  var transparentProxy2 = realm.Proxy(target1,handler);
  var transparentProxy3 = realm.Proxy(target2,handler);
  var transparentProxy4 = realm2.Proxy(target1,handler);
  var transparentProxy5 = realm2.Proxy(target2,handler);

  this.expect(function() {
    return realm==realm2;
  }).toBe(false);

  this.expect(function() {
    return transparentProxy1==transparentProxy1;
  }).toBe(true);

  this.expect(function() {
    return transparentProxy1==transparentProxy2;
  }).toBe(true);

  this.expect(function() {
    return transparentProxy1==transparentProxy3;
  }).toBe(false);

  this.expect(function() {
    return transparentProxy1==transparentProxy4;
  }).toBe(true);

  this.expect(function() {
    return transparentProxy1==transparentProxy5;
  }).toBe(false);


});

new Test('Realm / Strict Equality', function() {

  // target values
  var target1 = { firstProp:"1", secondProp:2};
  var target2 = {};

  // Handlers
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
  var transparentProxy2 = realm.Proxy(target1,handler);
  var transparentProxy3 = realm.Proxy(target2,handler);
  var transparentProxy4 = realm2.Proxy(target1,handler);
  var transparentProxy5 = realm2.Proxy(target2,handler);

  this.expect(function() {
    return realm===realm2;
  }).toBe(false);

  this.expect(function() {
    return transparentProxy1===transparentProxy1;
  }).toBe(true);

  this.expect(function() {
    return transparentProxy1===transparentProxy2;
  }).toBe(true);

  this.expect(function() {
    return transparentProxy1===transparentProxy3;
  }).toBe(false);

  this.expect(function() {
    return transparentProxy1===transparentProxy4;
  }).toBe(true);

  this.expect(function() {
    return transparentProxy1===transparentProxy5;
  }).toBe(false);

});

new Test('Realm / Inequality', function() {

  // target values
  var target1 = { firstProp:"1", secondProp:2};
  var target2 = {};

  // Handlers
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
  var transparentProxy2 = realm.Proxy(target1,handler);
  var transparentProxy3 = realm.Proxy(target2,handler);
  var transparentProxy4 = realm2.Proxy(target1,handler);
  var transparentProxy5 = realm2.Proxy(target2,handler);

  this.expect(function() {
    return realm!=realm2;
  }).toBe(true);

  this.expect(function() {
    return transparentProxy1!=transparentProxy1;
  }).toBe(false);

  this.expect(function() {
    return transparentProxy1!=transparentProxy2;
  }).toBe(false);

  this.expect(function() {
    return transparentProxy1!=transparentProxy3;
  }).toBe(true);

  this.expect(function() {
    return transparentProxy1!=transparentProxy4;
  }).toBe(false);

  this.expect(function() {
    return transparentProxy1!=transparentProxy5;
  }).toBe(true);


});

new Test('Realm / Strict Inequality', function() {

  // target values
  var target1 = { firstProp:"1", secondProp:2};
  var target2 = {};

  // Handlers
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
  var transparentProxy2 = realm.Proxy(target1,handler);
  var transparentProxy3 = realm.Proxy(target2,handler);
  var transparentProxy4 = realm2.Proxy(target1,handler);
  var transparentProxy5 = realm2.Proxy(target2,handler);

  this.expect(function() {
    return realm!==realm2;
  }).toBe(true);

  this.expect(function() {
    return transparentProxy1!==transparentProxy1;
  }).toBe(false);

  this.expect(function() {
    return transparentProxy1!==transparentProxy2;
  }).toBe(false);

  this.expect(function() {
    return transparentProxy1!==transparentProxy3;
  }).toBe(true);

  this.expect(function() {
    return transparentProxy1!==transparentProxy4;
  }).toBe(false);

  this.expect(function() {
    return transparentProxy1!==transparentProxy5;
  }).toBe(true);


});



