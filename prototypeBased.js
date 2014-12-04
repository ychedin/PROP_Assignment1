"use strict";

var myObject = {
    call: function (funcName, args) {
        var dfsResult = this.dfs(funcName, args);
        if (typeof dfsResult === "function") {
            return dfsResult(args); // actually calls the function.
        } else {
            throw "'" + funcName + "' is not defined for the calling class.";
        }
    }, // end of call()

    dfs: function (funcName, args) { // helper method. Not intended to be called directly.
        var fn = this[funcName];		

        if (typeof fn === "function") {
            return fn; // Success! Stop searching.
        } else if (this.list) { // if this has a list.
            for (var i = 0; i < this.list.length; i++) { // go through the list.
                			
                fn = this.list[i].dfs(funcName, args);
                if (typeof fn === "function") {
                    return fn; // Success! Stop searching.
                }
            }
        }
    }, // end of dfs()
    
		
    create: function (parents) {
        var ret = Object.create(myObject);

        ret.list = parents;
        return ret;
    }// end of create()

};

// tests
testFunctionCallInheritanceWithFourNodesFunction();
peterTest();
testNoFuncInFirstChild();
testNoSuchFunction();

function testFunctionCallInheritanceWithFourNodesFunction() {
    document.write("<br>testCircularInheritanceWithFourNodesFunction: ");
    var obj0, obj1, obj2, obj3;
    
    obj0 = myObject.create([obj1]);
    obj1 = myObject.create([obj2]);
    obj2 = myObject.create([obj3]);
    obj3 = myObject.create([]);
           
    
    obj0.func0 = function (arg0) {
        return "func0: " + arg0;
    };
    
    obj1.func1 = function (arg1) {
        return "func1: " + arg1;
    };
    
    obj2.func2 = function (arg2) {
        return "func2: " + arg2;
    };
      
     obj3.func3 = function (arg2) {
        return "func3: " + arg2;
    };
    
    document.write(obj0.call("func3", ["hello"]));
    
 }   
 
    
function testIsMemberAndumberOfAllNodes(){
    document.write("<br>testIsMember: ");
    var obj0, obj1, obj2, obj3, obj4, obj5;
    
    obj0 = myObject.create([]);
    obj1 = myObject.create([obj0]);
    obj2 = myObject.create([obj1]);
    obj3 = myObject.create([obj2]);
    obj4 = myObject.create([obj2]);
    obj5 = myObject.create([obj2]);
    
    obj0.list[0] = obj1; 

   obj0.func = function (arg) {
        return "func0: " + arg;
    };        
    obj1.func1 = function (arg1) {
        return "func1: " + arg1;
    };
    
    obj2.func2 = function(arg2){
        return "func2: " + arg2;
    };   
    document.write(obj1.isMember(obj0.list)); 
    document.write(myObject.childrenList.length);
    document.write("<br>");
    
}

function testCircularInheritanceWithThreeNodesFunction() {
    document.write("<br>testCircularInheritanceWithThreeNodesFunction: ");

    var obj0, obj1, obj2;
    
    obj0 = myObject.create([]);
    obj1 = myObject.create([obj0]);
    obj2 = myObject.create([obj1]);
    
   obj0.list[0] = obj1; 

   obj0.func = function (arg) {
       
        return "func0: " + arg;
    };    
    
    obj1.func1 = function (arg1) {
        return "func1: " + arg1;
    };
    
    obj2.func2 = function(arg2){
        return "func2: " + arg2;
    };
    
    obj0.call("noSuchName", ["hello"]);
    //document.write(obj0.detectCircularInheritance(obj0, []));
    
}


function testCircularInheritenceWithTwoNodesFunction() {
    document.write("<br><b>testCircularInheritenceWithTwoNodesFunction: < /b>");

    var obj0, obj1;
    
    obj0 = myObject.create([]);
    obj1 = myObject.create([obj0]);
    obj0.list[0] = obj1; 

   obj0.func = function (arg) {
        return "func0: " + arg;
    };    
    
    obj1.func1 = function (arg1) {
        return "func2: " + arg1;
    };
    
    
    obj0.call("noSucfunhName", ["hello"]);
}
function peterTest() {
    document.write("peterTest: ");
    var obj0 = myObject.create(null);
    obj0.func = function (arg) {
        return "func0: " + arg;
    };
    var obj1 = myObject.create([obj0]);

    var obj2 = myObject.create([]);
    obj2.func = function (arg) {
        return "func2: " + arg;
    };
    var obj3 = myObject.create([obj1, obj2]);
    var result = obj3.call("func", ["hello"]);

    if (result === "func0: hello") {
        document.write("Success! <br>");
    }else {
        document.write("test failed. <br>");
    }
}

function testNoFuncInFirstChild() {
    document.write("<br>testNoFuncInFirstChild: ");
    var obj0 = myObject.create(null);
    var obj1 = myObject.create([obj0]);

    var obj2 = myObject.create([]);
    obj2.func = function (arg) {
        return "func2: " + arg;
    };
    var obj3 = myObject.create([obj1, obj2]);
    var result = obj3.call("func", ["hello"]);

    if (result === "func2: hello") {
        document.write("Success! <br>");
    }else {
        document.write("test failed. <br>");
    }
}

function testNoSuchFunction() {
    document.write("<br>testNoSuchFunction: ");
    var obj0 = myObject.create(null);
    var obj1 = myObject.create([obj0]);

    var obj2 = myObject.create([]);
    obj2.func = function (arg) {
        return "func2: " + arg;
    };
    var obj3 = myObject.create([obj1, obj2]);

    try {
        var result = obj3.call("noSuchName!", ["hello"]);
        document.write("test failed.");
    }
    catch (error) {
        document.write("Success!");
        // success??
    }
}

function testCircularInheritenceFunction() {
    document.write("<br>testCircularInheritenceFunction: ");
    
    var obj3 = myObject.create([obj5]);
	var obj1 = myObject.create([obj3]);
	var obj0 = myObject.create([obj1, obj2 ]);	
	var obj2 = myObject.create([obj3,obj4]);	
	var obj5 = myObject.create([obj2]);
	
    detectCircularInheritence();      

    try {
        var result = obj3.call("noSuchName!", ["hello"]);
        document.write("test failed.");
    }
    catch (error) {
        document.write("Success!");
        // success??
    }

}
