/**
 *
 * JavaScript Test Suite
 * =====================
 *
 * Copyright (c) 2015, Proglang, University of Freiburg.
 * http://proglang.informatik.uni-freiburg.de/
 * All rights reserved.
 *
 * Author Matthias Keil
 * http://www.informatik.uni-freiburg.de/~keilr/
 *
 **/

/**
 * Constructor function for tests
 **/
function Test(name, closure, mode=Test.INTERPRETER) {
  if(!(this instanceof Test)) return new Test(...Array.from(arguments));

  this.name = name;
  this.closure = closure;
  this.mode = mode;

  Test.tests.add(this);
}

/**
 * Function toBe
 **/
Test.prototype.toBe = function (name="unnamed test", skip=false, value=undefined) {
  if(skip) {
    Test.skipped.add({name:name, predicate:this});
    return true;
  } 
 
  var result = Test.eval(this);

  if(result===value) {
    Test.passed.add({name:name, predicate:this});
    return true;
  } else {
    Test.failed.add({name:name, predicate:this, expect:value, given:result});
    return true;
  }
}

/**
 * Function expect 
 **/
Test.prototype.expect = function(predicate, skip=false) {
  Object.defineProperty(predicate, "toBe", {
    value:Test.prototype.toBe.bind(predicate, this.name, skip), writable: false, configurable: false
  });

  return predicate;
}

/**
 * Function expect true
 **/
Test.expectTrue = function (predicate, skip=false) {
  return Test.prototype.toBe.apply(predicate, this.name, skip, true);
}

/**
 * Function expect false
 **/
Test.expectFalse = function (predicate, skip=false) {
  return Test.prototype.toBe.apply(predicate, this.name, skip, false);
}

/**
 * Runs a particular test case
 **/
Test.eval = function(testcase) {

  // Runs every test 100 times until the termination 
  // condition is true. If the condition is false than it 
  // repeats this procedure.

  switch(Test.mode) {
    case Test.Baseline:
      var finished = inJit;
      break;
    case Test.IonMonkey:
      var finished = inIon;
      break;
    case Test.Interpreter:
    default:
      var finished = (function() { return true; });
      break;
  }

  try {
  // TODO, try catch
  do {
    for(var i=0; i<100; i++) {
      if(Test.verbose) print(`Test: ${testcase.toString()}`);
      // TODO
      if(Test.verbose) print(`JIT:${inJit()}, Ion:${inIon()}`);
      var result = testcase.apply();
    }
  }
  while (!finished());
  } catch(e) {
    print("Error ... ");
  }

  return result;
}

/**
 * Test Mode
 **/

/**
 * Evaluation Mode
 *
 * The flags specify how many times a test should run.
 * The evaluation mode defines a termination condition.
 * (e.g. in the IonMonkey mode a test runs until the IonMonkey starts)
 * To guarantee that only the Baseline JIT/Interpreter runs 
 * the IonMonkey/Basline JIT needs to be deactivated manually.
 */

// Test interpreter only 
Test.Interpreter = "Interpreter";
// Test interpreter and baseline JIT 
Test.Baseline    = "Baseline JIT";
// Test interpreter, baseline JIT, and IonMonkey 
Test.IonMonkey   = "IonMonkey";

/**
 * Lists of all tests
 **/
Test.tests = new Set();

/**
 * Lists of all test cases
 **/
Test.failed  = new Set();
Test.skipped = new Set();
Test.passed  = new Set();

/**
 * Default Configuration 
 **/
Test.verbose = false;
Test.mode = Test.Interpreter;

/**
 * Runs the created test tests 
 **/
Test.run = function() {
  var tstart = Date.now();

  print(`\n`);
  for(var test of Test.tests) {
    print(`Run: ${test.name}`);
    test.closure.apply(test);
  }

  var tend = Date.now();
  var duration = tend-tstart;

  var cases = Test.failed.size + Test.passed.size + Test.skipped.size;

  print(`\nTests:${Test.tests.size}, Cases:${cases}, Failed:${Test.failed.size}, Passed:${Test.passed.size}, Skipped:${Test.skipped.size} (${duration} ms, Mode:${Test.mode})`);

  if(Test.failed.size==0 && Test.skipped.size==0) {
    print("All tests successful.")
  }

  if(Test.failed.size!=0) {
    print(`\n${Test.failed.size} tests failed.`);
    for(var test of Test.failed) print(`\n*** Failed: ${test.name}: (given:${test.given}, expect:${test.expect}) @ ${test.predicate}`);
  }

  if(Test.skipped.size!=0) {
    print(`\n${Test.skipped.size} tests skipped.`);
    for(var test of Test.skipped) print(`\n**** Skipped ${test.name}: ${test.predicate}`);
  }
}
