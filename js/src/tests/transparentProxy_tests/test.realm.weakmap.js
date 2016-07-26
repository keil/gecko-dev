
new Test('Realm / WeakMap', function() {

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
    var WeakMap = realm.WeakMap();
    WeakMap.set(transparentProxy1,1);
    return WeakMap.has(transparentProxy1);
  }).toBe(true);

  this.expect(function() {
    var WeakMap = realm.WeakMap();
    WeakMap.set(transparentProxy1,{});
    return WeakMap.has(transparentProxy1);
  }).toBe(true);

  this.expect(function() {
    var WeakMap = realm.WeakMap();
    WeakMap.set(transparentProxy1,"value");
    return WeakMap.has(transparentProxy1);
  }).toBe(true);

  this.expect(function() {
    var WeakMap = new realm.WeakMap();
    WeakMap.set(transparentProxy1,1);
    return WeakMap.has(transparentProxy1);
  }).toBe(true);

  this.expect(function() {
    var WeakMap = new realm.WeakMap();
    WeakMap.set(transparentProxy1,{});
    return WeakMap.has(transparentProxy1);
  }).toBe(true);

  this.expect(function() {
    var WeakMap = new realm.WeakMap();
    WeakMap.set(transparentProxy1,"value");
    return WeakMap.has(transparentProxy1);
  }).toBe(true);

  this.expect(function() {
    var WeakMap = realm.WeakMap();
    WeakMap.set(transparentProxy1,1);
    return WeakMap.has(transparentProxy2);
  }).toBe(false);

  this.expect(function() {
    var WeakMap = realm.WeakMap();
    WeakMap.set(transparentProxy1,{});
    return WeakMap.has(transparentProxy2);
  }).toBe(false);

  this.expect(function() {
    var WeakMap = realm.WeakMap();
    WeakMap.set(transparentProxy1,"value");
    return WeakMap.has(transparentProxy2);
  }).toBe(false);

  this.expect(function() {
    var WeakMap = new realm.WeakMap();
    WeakMap.set(transparentProxy1,1);
    return WeakMap.has(transparentProxy2);
  }).toBe(false);

  this.expect(function() {
    var WeakMap = new realm.WeakMap();
    WeakMap.set(transparentProxy1,{});
    return WeakMap.has(transparentProxy2);
  }).toBe(false);

  this.expect(function() {
    var WeakMap = new realm.WeakMap();
    WeakMap.set(transparentProxy1,"value");
    return WeakMap.has(transparentProxy2);
  }).toBe(false);


  this.expect(function() {
    var WeakMap = realm.WeakMap();
    WeakMap.set(transparentProxy3,1);
    return WeakMap.has(transparentProxy3);
  }).toBe(true);

  this.expect(function() {
    var WeakMap = realm.WeakMap();
    WeakMap.set(transparentProxy3,{});
    return WeakMap.has(transparentProxy3);
  }).toBe(true);

  this.expect(function() {
    var WeakMap = realm.WeakMap();
    WeakMap.set(transparentProxy3,"value");
    return WeakMap.has(transparentProxy3);
  }).toBe(true);

  this.expect(function() {
    var WeakMap = new realm.WeakMap();
    WeakMap.set(transparentProxy3,1);
    return WeakMap.has(transparentProxy4);
  }).toBe(false);

  this.expect(function() {
    var WeakMap = new realm.WeakMap();
    WeakMap.set(transparentProxy3,{});
    return WeakMap.has(transparentProxy4);
  }).toBe(false);

  this.expect(function() {
    var WeakMap = new realm.WeakMap();
    WeakMap.set(transparentProxy3,"value");
    return WeakMap.has(transparentProxy4);
  }).toBe(false);

  this.expect(function() {
    var WeakMap = realm.WeakMap();
    WeakMap.set(transparentProxy3,1);
    return WeakMap.has(transparentProxy3);
  }).toBe(true);

  this.expect(function() {
    var WeakMap = realm.WeakMap();
    WeakMap.set(transparentProxy3,{});
    return WeakMap.has(transparentProxy3);
  }).toBe(true);

  this.expect(function() {
    var WeakMap = realm.WeakMap();
    WeakMap.set(transparentProxy3,"value");
    return WeakMap.has(transparentProxy3);
  }).toBe(true);

  this.expect(function() {
    var WeakMap = new realm.WeakMap();
    WeakMap.set(transparentProxy3,1);
    return WeakMap.has(transparentProxy4);
  }).toBe(false);

  this.expect(function() {
    var WeakMap = new realm.WeakMap();
    WeakMap.set(transparentProxy3,{});
    return WeakMap.has(transparentProxy4);
  }).toBe(false);

  this.expect(function() {
    var WeakMap = new realm.WeakMap();
    WeakMap.set(transparentProxy3,"value");
    return WeakMap.has(transparentProxy4);
  }).toBe(false);




  this.expect(function() {
    var WeakMap = realm.WeakMap();
    WeakMap.set(transparentProxy1,1);
    return WeakMap.has(transparentProxy5);
  }).toBe(false);

  this.expect(function() {
    var WeakMap = realm.WeakMap();
    WeakMap.set(transparentProxy1,{});
    return WeakMap.has(transparentProxy5);
  }).toBe(false);

  this.expect(function() {
    var WeakMap = realm.WeakMap();
    WeakMap.set(transparentProxy1,"value");
    return WeakMap.has(transparentProxy5);
  }).toBe(false);

  this.expect(function() {
    var WeakMap = new realm.WeakMap();
    WeakMap.set(transparentProxy1,1);
    return WeakMap.has(transparentProxy5);
  }).toBe(false);

  this.expect(function() {
    var WeakMap = new realm.WeakMap();
    WeakMap.set(transparentProxy1,{});
    return WeakMap.has(transparentProxy5);
  }).toBe(false);

  this.expect(function() {
    var WeakMap = new realm.WeakMap();
    WeakMap.set(transparentProxy1,"value");
    return WeakMap.has(transparentProxy5);
  }).toBe(false);

  this.expect(function() {
    var WeakMap = realm.WeakMap();
    WeakMap.set(transparentProxy1,1);
    return WeakMap.has(transparentProxy6);
  }).toBe(false);

  this.expect(function() {
    var WeakMap = realm.WeakMap();
    WeakMap.set(transparentProxy1,{});
    return WeakMap.has(transparentProxy6);
  }).toBe(false);

  this.expect(function() {
    var WeakMap = realm.WeakMap();
    WeakMap.set(transparentProxy1,"value");
    return WeakMap.has(transparentProxy6);
  }).toBe(false);

  this.expect(function() {
    var WeakMap = new realm.WeakMap();
    WeakMap.set(transparentProxy1,1);
    return WeakMap.has(transparentProxy6);
  }).toBe(false);

  this.expect(function() {
    var WeakMap = new realm.WeakMap();
    WeakMap.set(transparentProxy1,{});
    return WeakMap.has(transparentProxy6);
  }).toBe(false);

  this.expect(function() {
    var WeakMap = new realm.WeakMap();
    WeakMap.set(transparentProxy1,"value");
    return WeakMap.has(transparentProxy6);
  }).toBe(false);



  //With more set statements


  this.expect(function() {
    var WeakMap = realm.WeakMap();
    WeakMap.set(transparentProxy1,1);
    WeakMap.set(transparentProxy2,1);
    return WeakMap.has(transparentProxy1);
  }).toBe(true);

  this.expect(function() {
    var WeakMap = realm.WeakMap();
    WeakMap.set(transparentProxy1,{});
    WeakMap.set(transparentProxy2,1);
    return WeakMap.has(transparentProxy1);
  }).toBe(true);

  this.expect(function() {
    var WeakMap = realm.WeakMap();
    WeakMap.set(transparentProxy1,"value");
    WeakMap.set(transparentProxy2,1);
    return WeakMap.has(transparentProxy1);
  }).toBe(true);

  this.expect(function() {
    var WeakMap = new realm.WeakMap();
    WeakMap.set(transparentProxy1,1);
    return WeakMap.has(transparentProxy1);
  }).toBe(true);

  this.expect(function() {
    var WeakMap = new realm.WeakMap();
    WeakMap.set(transparentProxy1,{});
    WeakMap.set(transparentProxy2,1);
    return WeakMap.has(transparentProxy1);
  }).toBe(true);

  this.expect(function() {
    var WeakMap = new realm.WeakMap();
    WeakMap.set(transparentProxy1,"value");
    WeakMap.set(transparentProxy2,1);
    return WeakMap.has(transparentProxy1);
  }).toBe(true);

  this.expect(function() {
    var WeakMap = realm.WeakMap();
    WeakMap.set(transparentProxy1,1);
    WeakMap.set(transparentProxy2,1);
    return WeakMap.has(transparentProxy2);
  }).toBe(true);

  this.expect(function() {
    var WeakMap = realm.WeakMap();
    WeakMap.set(transparentProxy1,{});
    WeakMap.set(transparentProxy2,1);
    return WeakMap.has(transparentProxy2);
  }).toBe(true);

  this.expect(function() {
    var WeakMap = realm.WeakMap();
    WeakMap.set(transparentProxy1,"value");
    WeakMap.set(transparentProxy2,1);
    return WeakMap.has(transparentProxy2);
  }).toBe(true);

  this.expect(function() {
    var WeakMap = new realm.WeakMap();
    WeakMap.set(transparentProxy1,1);
    WeakMap.set(transparentProxy2,1);
    return WeakMap.has(transparentProxy2);
  }).toBe(true);

  this.expect(function() {
    var WeakMap = new realm.WeakMap();
    WeakMap.set(transparentProxy1,{});
    WeakMap.set(transparentProxy2,1);
    return WeakMap.has(transparentProxy2);
  }).toBe(true);

  this.expect(function() {
    var WeakMap = new realm.WeakMap();
    WeakMap.set(transparentProxy1,"value");
    WeakMap.set(transparentProxy2,1);
    return WeakMap.has(transparentProxy2);
  }).toBe(true);

  this.expect(function() {
    var WeakMap = realm.WeakMap();
    WeakMap.set(transparentProxy3,1);
    WeakMap.set(transparentProxy4,1);
    return WeakMap.has(transparentProxy3);
  }).toBe(true);

  this.expect(function() {
    var WeakMap = realm.WeakMap();
    WeakMap.set(transparentProxy3,{});
    WeakMap.set(transparentProxy4,1);
    return WeakMap.has(transparentProxy3);
  }).toBe(true);

  this.expect(function() {
    var WeakMap = realm.WeakMap();
    WeakMap.set(transparentProxy3,"value");
    WeakMap.set(transparentProxy4,1);
    return WeakMap.has(transparentProxy3);
  }).toBe(true);

  this.expect(function() {
    var WeakMap = new realm.WeakMap();
    WeakMap.set(transparentProxy3,1);
    WeakMap.set(transparentProxy4,1);
    return WeakMap.has(transparentProxy4);
  }).toBe(true);

  this.expect(function() {
    var WeakMap = new realm.WeakMap();
    WeakMap.set(transparentProxy3,{});
    WeakMap.set(transparentProxy4,1);
    return WeakMap.has(transparentProxy4);
  }).toBe(true);

  this.expect(function() {
    var WeakMap = new realm.WeakMap();
    WeakMap.set(transparentProxy3,"value");
    WeakMap.set(transparentProxy4,1);
    return WeakMap.has(transparentProxy4);
  }).toBe(true);

  this.expect(function() {
    var WeakMap = realm.WeakMap();
    WeakMap.set(transparentProxy3,1);
    WeakMap.set(transparentProxy4,1);
    return WeakMap.has(transparentProxy3);
  }).toBe(true);

  this.expect(function() {
    var WeakMap = realm.WeakMap();
    WeakMap.set(transparentProxy3,{});
    WeakMap.set(transparentProxy4,1);
    return WeakMap.has(transparentProxy3);
  }).toBe(true);

  this.expect(function() {
    var WeakMap = realm.WeakMap();
    WeakMap.set(transparentProxy3,"value");
    WeakMap.set(transparentProxy4,1);
    return WeakMap.has(transparentProxy3);
  }).toBe(true);

  this.expect(function() {
    var WeakMap = new realm.WeakMap();
    WeakMap.set(transparentProxy3,1);
    WeakMap.set(transparentProxy4,1);
    return WeakMap.has(transparentProxy4);
  }).toBe(true);

  this.expect(function() {
    var WeakMap = new realm.WeakMap();
    WeakMap.set(transparentProxy3,{});
    WeakMap.set(transparentProxy4,1);
    return WeakMap.has(transparentProxy4);
  }).toBe(true);

  this.expect(function() {
    var WeakMap = new realm.WeakMap();
    WeakMap.set(transparentProxy3,"value");
    WeakMap.set(transparentProxy4,1);
    return WeakMap.has(transparentProxy4);
  }).toBe(true);




  this.expect(function() {
    var WeakMap = realm.WeakMap();
    WeakMap.set(transparentProxy1,1);
    WeakMap.set(transparentProxy5,1);
    return WeakMap.has(transparentProxy5);
  }).toBe(true);

  this.expect(function() {
    var WeakMap = realm.WeakMap();
    WeakMap.set(transparentProxy1,{});
    WeakMap.set(transparentProxy5,1);
    return WeakMap.has(transparentProxy5);
  }).toBe(true);

  this.expect(function() {
    var WeakMap = realm.WeakMap();
    WeakMap.set(transparentProxy1,"value");
    WeakMap.set(transparentProxy5,1);
    return WeakMap.has(transparentProxy5);
  }).toBe(true);

  this.expect(function() {
    var WeakMap = new realm.WeakMap();
    WeakMap.set(transparentProxy1,1);
    WeakMap.set(transparentProxy5,1);
    return WeakMap.has(transparentProxy5);
  }).toBe(true);

  this.expect(function() {
    var WeakMap = new realm.WeakMap();
    WeakMap.set(transparentProxy1,{});
    WeakMap.set(transparentProxy5,1);
    return WeakMap.has(transparentProxy5);
  }).toBe(true);

  this.expect(function() {
    var WeakMap = new realm.WeakMap();
    WeakMap.set(transparentProxy1,"value");
    WeakMap.set(transparentProxy5,1);
    return WeakMap.has(transparentProxy5);
  }).toBe(true);





  this.expect(function() {
    var WeakMap = realm.WeakMap();
    WeakMap.set(transparentProxy1,1);
    WeakMap.set(transparentProxy6,1);
    return WeakMap.has(transparentProxy6);
  }).toBe(true);

  this.expect(function() {
    var WeakMap = realm.WeakMap();
    WeakMap.set(transparentProxy1,{});
    WeakMap.set(transparentProxy6,1);
    return WeakMap.has(transparentProxy6);
  }).toBe(true);

  this.expect(function() {
    var WeakMap = realm.WeakMap();
    WeakMap.set(transparentProxy1,"value");
    WeakMap.set(transparentProxy6,1);
    return WeakMap.has(transparentProxy6);
  }).toBe(true);

  this.expect(function() {
    var WeakMap = new realm.WeakMap();
    WeakMap.set(transparentProxy1,1);
    WeakMap.set(transparentProxy6,1);
    return WeakMap.has(transparentProxy6);
  }).toBe(true);

  this.expect(function() {
    var WeakMap = new realm.WeakMap();
    WeakMap.set(transparentProxy1,{});
    WeakMap.set(transparentProxy6,1);
    return WeakMap.has(transparentProxy6);
  }).toBe(true);

  this.expect(function() {
    var WeakMap = new realm.WeakMap();
    WeakMap.set(transparentProxy1,"value");
    WeakMap.set(transparentProxy6,1);
    return WeakMap.has(transparentProxy6);
  }).toBe(true);



  this.expect(function() {
    var WeakMap = realm.WeakMap();
    WeakMap.set(transparentProxy1,2);
    return WeakMap.has(target1);
  }).toBe(false);

  this.expect(function() {
    var WeakMap = realm.WeakMap();
    WeakMap.set(transparentProxy1,{});
    return WeakMap.has(target1);
  }).toBe(false);

  this.expect(function() {
    var WeakMap = realm.WeakMap();
    WeakMap.set(transparentProxy1,"value");
    return WeakMap.has(target1);
  }).toBe(false);

  this.expect(function() {
    var WeakMap = realm.WeakMap();
    WeakMap.set(transparentProxy1,"value");
    return WeakMap.has(1);
  }).toBe(false);


  this.expect(function() {
    var WeakMap = realm.WeakMap();
    WeakMap.set(transparentProxy2,2);
    return WeakMap.has(target1);
  }).toBe(false);

  this.expect(function() {
    var WeakMap = realm.WeakMap();
    WeakMap.set(transparentProxy2,{});
    return WeakMap.has(target1);
  }).toBe(false);

  this.expect(function() {
    var WeakMap = realm.WeakMap();
    WeakMap.set(transparentProxy2,"value");
    return WeakMap.has(target1);
  }).toBe(false);

  this.expect(function() {
    var WeakMap = realm.WeakMap();
    WeakMap.set(transparentProxy1,"value");
    return WeakMap.has(1);
  }).toBe(false);


  this.expect(function() {
    var WeakMap = realm.WeakMap();
    WeakMap.set(transparentProxy3,2);
    return WeakMap.has(target1);
  }).toBe(true);

  this.expect(function() {
    var WeakMap = realm.WeakMap();
    WeakMap.set(transparentProxy3,{});
    return WeakMap.has(target1);
  }).toBe(true);

  this.expect(function() {
    var WeakMap = realm.WeakMap();
    WeakMap.set(transparentProxy3,"value");
    return WeakMap.has(target1);
  }).toBe(true);

  this.expect(function() {
    var WeakMap = realm.WeakMap();
    WeakMap.set(transparentProxy3,"value");
    return WeakMap.has(1);
  }).toBe(false);



});
