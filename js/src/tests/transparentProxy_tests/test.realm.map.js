
new Test('Realm / Map', function() {

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


  this.expect(function() {
    var map = realm.Map();
    map.set(transparentProxy1,1);
    return map.has(transparentProxy1);
  }).toBe(true);

  this.expect(function() {
    var map = realm.Map();
    map.set(transparentProxy1,{});
    return map.has(transparentProxy1);
  }).toBe(true);

  this.expect(function() {
    var map = realm.Map();
    map.set(transparentProxy1,"value");
    return map.has(transparentProxy1);
  }).toBe(true);

  this.expect(function() {
    var map = new realm.Map();
    map.set(transparentProxy1,1);
    return map.has(transparentProxy1);
  }).toBe(true);

  this.expect(function() {
    var map = new realm.Map();
    map.set(transparentProxy1,{});
    return map.has(transparentProxy1);
  }).toBe(true);

  this.expect(function() {
    var map = new realm.Map();
    map.set(transparentProxy1,"value");
    return map.has(transparentProxy1);
  }).toBe(true);

  this.expect(function() {
    var map = realm.Map();
    map.set(transparentProxy1,1);
    return map.has(transparentProxy2);
  }).toBe(false);

  this.expect(function() {
    var map = realm.Map();
    map.set(transparentProxy1,{});
    return map.has(transparentProxy2);
  }).toBe(false);

  this.expect(function() {
    var map = realm.Map();
    map.set(transparentProxy1,"value");
    return map.has(transparentProxy2);
  }).toBe(false);

  this.expect(function() {
    var map = new realm.Map();
    map.set(transparentProxy1,1);
    return map.has(transparentProxy2);
  }).toBe(false);

  this.expect(function() {
    var map = new realm.Map();
    map.set(transparentProxy1,{});
    return map.has(transparentProxy2);
  }).toBe(false);

  this.expect(function() {
    var map = new realm.Map();
    map.set(transparentProxy1,"value");
    return map.has(transparentProxy2);
  }).toBe(false);


  this.expect(function() {
    var map = realm.Map();
    map.set(transparentProxy3,1);
    return map.has(transparentProxy3);
  }).toBe(true);

  this.expect(function() {
    var map = realm.Map();
    map.set(transparentProxy3,{});
    return map.has(transparentProxy3);
  }).toBe(true);

  this.expect(function() {
    var map = realm.Map();
    map.set(transparentProxy3,"value");
    return map.has(transparentProxy3);
  }).toBe(true);

  this.expect(function() {
    var map = new realm.Map();
    map.set(transparentProxy3,1);
    return map.has(transparentProxy4);
  }).toBe(false);

  this.expect(function() {
    var map = new realm.Map();
    map.set(transparentProxy3,{});
    return map.has(transparentProxy4);
  }).toBe(false);

  this.expect(function() {
    var map = new realm.Map();
    map.set(transparentProxy3,"value");
    return map.has(transparentProxy4);
  }).toBe(false);

  this.expect(function() {
    var map = realm.Map();
    map.set(transparentProxy3,1);
    return map.has(transparentProxy3);
  }).toBe(true);

  this.expect(function() {
    var map = realm.Map();
    map.set(transparentProxy3,{});
    return map.has(transparentProxy3);
  }).toBe(true);

  this.expect(function() {
    var map = realm.Map();
    map.set(transparentProxy3,"value");
    return map.has(transparentProxy3);
  }).toBe(true);

  this.expect(function() {
    var map = new realm.Map();
    map.set(transparentProxy3,1);
    return map.has(transparentProxy4);
  }).toBe(false);

  this.expect(function() {
    var map = new realm.Map();
    map.set(transparentProxy3,{});
    return map.has(transparentProxy4);
  }).toBe(false);

  this.expect(function() {
    var map = new realm.Map();
    map.set(transparentProxy3,"value");
    return map.has(transparentProxy4);
  }).toBe(false);




  this.expect(function() {
    var map = realm.Map();
    map.set(transparentProxy1,1);
    return map.has(transparentProxy5);
  }).toBe(false);

  this.expect(function() {
    var map = realm.Map();
    map.set(transparentProxy1,{});
    return map.has(transparentProxy5);
  }).toBe(false);

  this.expect(function() {
    var map = realm.Map();
    map.set(transparentProxy1,"value");
    return map.has(transparentProxy5);
  }).toBe(false);

  this.expect(function() {
    var map = new realm.Map();
    map.set(transparentProxy1,1);
    return map.has(transparentProxy5);
  }).toBe(false);

  this.expect(function() {
    var map = new realm.Map();
    map.set(transparentProxy1,{});
    return map.has(transparentProxy5);
  }).toBe(false);

  this.expect(function() {
    var map = new realm.Map();
    map.set(transparentProxy1,"value");
    return map.has(transparentProxy5);
  }).toBe(false);

  this.expect(function() {
    var map = realm.Map();
    map.set(transparentProxy1,1);
    return map.has(transparentProxy6);
  }).toBe(false);

  this.expect(function() {
    var map = realm.Map();
    map.set(transparentProxy1,{});
    return map.has(transparentProxy6);
  }).toBe(false);

  this.expect(function() {
    var map = realm.Map();
    map.set(transparentProxy1,"value");
    return map.has(transparentProxy6);
  }).toBe(false);

  this.expect(function() {
    var map = new realm.Map();
    map.set(transparentProxy1,1);
    return map.has(transparentProxy6);
  }).toBe(false);

  this.expect(function() {
    var map = new realm.Map();
    map.set(transparentProxy1,{});
    return map.has(transparentProxy6);
  }).toBe(false);

  this.expect(function() {
    var map = new realm.Map();
    map.set(transparentProxy1,"value");
    return map.has(transparentProxy6);
  }).toBe(false);



  //With more set statements


  this.expect(function() {
    var map = realm.Map();
    map.set(transparentProxy1,1);
    map.set(transparentProxy2,1);
    return map.has(transparentProxy1);
  }).toBe(true);

  this.expect(function() {
    var map = realm.Map();
    map.set(transparentProxy1,{});
    map.set(transparentProxy2,1);
    return map.has(transparentProxy1);
  }).toBe(true);

  this.expect(function() {
    var map = realm.Map();
    map.set(transparentProxy1,"value");
    map.set(transparentProxy2,1);
    return map.has(transparentProxy1);
  }).toBe(true);

  this.expect(function() {
    var map = new realm.Map();
    map.set(transparentProxy1,1);
    return map.has(transparentProxy1);
  }).toBe(true);

  this.expect(function() {
    var map = new realm.Map();
    map.set(transparentProxy1,{});
    map.set(transparentProxy2,1);
    return map.has(transparentProxy1);
  }).toBe(true);

  this.expect(function() {
    var map = new realm.Map();
    map.set(transparentProxy1,"value");
    map.set(transparentProxy2,1);
    return map.has(transparentProxy1);
  }).toBe(true);

  this.expect(function() {
    var map = realm.Map();
    map.set(transparentProxy1,1);
    map.set(transparentProxy2,1);
    return map.has(transparentProxy2);
  }).toBe(true);

  this.expect(function() {
    var map = realm.Map();
    map.set(transparentProxy1,{});
    map.set(transparentProxy2,1);
    return map.has(transparentProxy2);
  }).toBe(true);

  this.expect(function() {
    var map = realm.Map();
    map.set(transparentProxy1,"value");
    map.set(transparentProxy2,1);
    return map.has(transparentProxy2);
  }).toBe(true);

  this.expect(function() {
    var map = new realm.Map();
    map.set(transparentProxy1,1);
    map.set(transparentProxy2,1);
    return map.has(transparentProxy2);
  }).toBe(true);

  this.expect(function() {
    var map = new realm.Map();
    map.set(transparentProxy1,{});
    map.set(transparentProxy2,1);
    return map.has(transparentProxy2);
  }).toBe(true);

  this.expect(function() {
    var map = new realm.Map();
    map.set(transparentProxy1,"value");
    map.set(transparentProxy2,1);
    return map.has(transparentProxy2);
  }).toBe(true);

  this.expect(function() {
    var map = realm.Map();
    map.set(transparentProxy3,1);
    map.set(transparentProxy4,1);
    return map.has(transparentProxy3);
  }).toBe(true);

  this.expect(function() {
    var map = realm.Map();
    map.set(transparentProxy3,{});
    map.set(transparentProxy4,1);
    return map.has(transparentProxy3);
  }).toBe(true);

  this.expect(function() {
    var map = realm.Map();
    map.set(transparentProxy3,"value");
    map.set(transparentProxy4,1);
    return map.has(transparentProxy3);
  }).toBe(true);

  this.expect(function() {
    var map = new realm.Map();
    map.set(transparentProxy3,1);
    map.set(transparentProxy4,1);
    return map.has(transparentProxy4);
  }).toBe(true);

  this.expect(function() {
    var map = new realm.Map();
    map.set(transparentProxy3,{});
    map.set(transparentProxy4,1);
    return map.has(transparentProxy4);
  }).toBe(true);

  this.expect(function() {
    var map = new realm.Map();
    map.set(transparentProxy3,"value");
    map.set(transparentProxy4,1);
    return map.has(transparentProxy4);
  }).toBe(true);

  this.expect(function() {
    var map = realm.Map();
    map.set(transparentProxy3,1);
    map.set(transparentProxy4,1);
    return map.has(transparentProxy3);
  }).toBe(true);

  this.expect(function() {
    var map = realm.Map();
    map.set(transparentProxy3,{});
    map.set(transparentProxy4,1);
    return map.has(transparentProxy3);
  }).toBe(true);

  this.expect(function() {
    var map = realm.Map();
    map.set(transparentProxy3,"value");
    map.set(transparentProxy4,1);
    return map.has(transparentProxy3);
  }).toBe(true);

  this.expect(function() {
    var map = new realm.Map();
    map.set(transparentProxy3,1);
    map.set(transparentProxy4,1);
    return map.has(transparentProxy4);
  }).toBe(true);

  this.expect(function() {
    var map = new realm.Map();
    map.set(transparentProxy3,{});
    map.set(transparentProxy4,1);
    return map.has(transparentProxy4);
  }).toBe(true);

  this.expect(function() {
    var map = new realm.Map();
    map.set(transparentProxy3,"value");
    map.set(transparentProxy4,1);
    return map.has(transparentProxy4);
  }).toBe(true);




  this.expect(function() {
    var map = realm.Map();
    map.set(transparentProxy1,1);
    map.set(transparentProxy5,1);
    return map.has(transparentProxy5);
  }).toBe(true);

  this.expect(function() {
    var map = realm.Map();
    map.set(transparentProxy1,{});
    map.set(transparentProxy5,1);
    return map.has(transparentProxy5);
  }).toBe(true);

  this.expect(function() {
    var map = realm.Map();
    map.set(transparentProxy1,"value");
    map.set(transparentProxy5,1);
    return map.has(transparentProxy5);
  }).toBe(true);

  this.expect(function() {
    var map = new realm.Map();
    map.set(transparentProxy1,1);
    map.set(transparentProxy5,1);
    return map.has(transparentProxy5);
  }).toBe(true);

  this.expect(function() {
    var map = new realm.Map();
    map.set(transparentProxy1,{});
    map.set(transparentProxy5,1);
    return map.has(transparentProxy5);
  }).toBe(true);

  this.expect(function() {
    var map = new realm.Map();
    map.set(transparentProxy1,"value");
    map.set(transparentProxy5,1);
    return map.has(transparentProxy5);
  }).toBe(true);





  this.expect(function() {
    var map = realm.Map();
    map.set(transparentProxy1,1);
    map.set(transparentProxy6,1);
    return map.has(transparentProxy6);
  }).toBe(true);

  this.expect(function() {
    var map = realm.Map();
    map.set(transparentProxy1,{});
    map.set(transparentProxy6,1);
    return map.has(transparentProxy6);
  }).toBe(true);

  this.expect(function() {
    var map = realm.Map();
    map.set(transparentProxy1,"value");
    map.set(transparentProxy6,1);
    return map.has(transparentProxy6);
  }).toBe(true);

  this.expect(function() {
    var map = new realm.Map();
    map.set(transparentProxy1,1);
    map.set(transparentProxy6,1);
    return map.has(transparentProxy6);
  }).toBe(true);

  this.expect(function() {
    var map = new realm.Map();
    map.set(transparentProxy1,{});
    map.set(transparentProxy6,1);
    return map.has(transparentProxy6);
  }).toBe(true);

  this.expect(function() {
    var map = new realm.Map();
    map.set(transparentProxy1,"value");
    map.set(transparentProxy6,1);
    return map.has(transparentProxy6);
  }).toBe(true);



  this.expect(function() {
    var map = realm.Map();
    map.set(transparentProxy1,2);
    return map.has(target1);
  }).toBe(false);

  this.expect(function() {
    var map = realm.Map();
    map.set(transparentProxy1,{});
    return map.has(target1);
  }).toBe(false);

  this.expect(function() {
    var map = realm.Map();
    map.set(transparentProxy1,"value");
    return map.has(target1);
  }).toBe(false);

  this.expect(function() {
    var map = realm.Map();
    map.set(transparentProxy1,"value");
    return map.has(1);
  }).toBe(false);


  this.expect(function() {
    var map = realm.Map();
    map.set(transparentProxy2,2);
    return map.has(target1);
  }).toBe(false);

  this.expect(function() {
    var map = realm.Map();
    map.set(transparentProxy2,{});
    return map.has(target1);
  }).toBe(false);

  this.expect(function() {
    var map = realm.Map();
    map.set(transparentProxy2,"value");
    return map.has(target1);
  }).toBe(false);

  this.expect(function() {
    var map = realm.Map();
    map.set(transparentProxy1,"value");
    return map.has(1);
  }).toBe(false);


  this.expect(function() {
    var map = realm.Map();
    map.set(transparentProxy3,2);
    return map.has(target1);
  }).toBe(true);

  this.expect(function() {
    var map = realm.Map();
    map.set(transparentProxy3,{});
    return map.has(target1);
  }).toBe(true);

  this.expect(function() {
    var map = realm.Map();
    map.set(transparentProxy3,"value");
    return map.has(target1);
  }).toBe(true);

  this.expect(function() {
    var map = realm.Map();
    map.set(transparentProxy3,"value");
    return map.has(1);
  }).toBe(false);



});




