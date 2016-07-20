new Test('Transparent Proxy/ Target Handler', function() {

  // target values
  var target1 = { firstProp:"1", secondProp:2};

  // Handlers
  var handler = {
    get: function(target, name){
        return name in target?
            true :
            false;
    }
  };

  // Token
  var Token = {secret:"key"};
  
  //Transparent Proxy without secret Token
  var transparentProxy1 = new TransparentProxy(target1,handler);

  //Transparent Proxy with secret Token
  var transparentProxy2 = new TransparentProxy(target1,handler,Token);

  this.expect(function() {
    return transparentProxy1.firstProp;
  }).toBe(true);

  this.expect(function() {
    return transparentProxy1.secondProp;
  }).toBe(true);

  this.expect(function() {
    return transparentProxy1.thirdProp;
  }).toBe(false);

  this.expect(function() {
    return transparentProxy2.firstProp;
  }).toBe(true);

  this.expect(function() {
    return transparentProxy2.secondProp;
  }).toBe(true);

  this.expect(function() {
    return transparentProxy2.thirdProp;
  }).toBe(false);

});
