"use strict";

function endlessLoopException(args){
    return args;     
}

var myObject = {   
    numberOfDecendants: 0,
    childrenList: [],
    
    call: function (funcName, args) {
        
        var dfsResult = this.dfs(funcName, args, 0, 0);
        if (typeof dfsResult === "function") {
            return dfsResult(args); // actually calls the function.
        } else {
            throw "'" + funcName + "' is not defined for the calling object.";
        }
    }, // end of call()   
    
     create: function (parents) { 
        myObject.numberOfDecendants++;        
        var newObject = Object.create(myObject);
        newObject.list = parents;
        return newObject;
    },// end of create()
    
    dfs: function (funcName, args, numberOfFinishedLoop, numberOfDecendants) { // helper method. Not intended to be called directly.
        numberOfDecendants = myObject.numberOfDecendants; 
        numberOfFinishedLoop += 1;
        
        var maxNumberOfLoops = numberOfDecendants*numberOfDecendants;  
       
        if(numberOfDecendants === 0){
            
        }else if(numberOfFinishedLoop > maxNumberOfLoops){
            throw endlessLoopException("There is a circular inheritance!"); 
        }
        
		var fn = this[funcName];		

        if (typeof fn === "function") {
            return fn; // Success! Stop searching.
        } else if (this.list) { // if this has a list.
            for (var i = 0; i < this.list.length; i++) { // go through the list.
                			
                fn = this.list[i].dfs(funcName, args, numberOfFinishedLoop, numberOfDecendants);
                if (typeof fn === "function") {
                    return fn; // Success! Stop searching.
                }
            }
        }
    }, // end of dfs()       
       
    isMember: function(prototypeList){
        var isMember = false; 
        if(prototypeList.length !== 0){
           for(var i = 0; i < prototypeList.length; i++){
               if(this === prototypeList[i]){
                   isMember = true; 
               }
           }    
        }        
        return isMember; 
    }  //end of isMember;
};

//testCircularInheritanceWithEightNodesFunction(); //testCase10: this case shouldn't be tested together with testCase6 and testCase7 since it throws an exceptioin
//testCircularInheritanceWithThreeNodesFunction(); //testCase9: this case shouldn't be tested together with testCase6 and testCase8 since it throws an exceptioin
//testCircularInheritenceWithTwoNodesFunction(); //testCase8: this case shouldn't be tested together with testCase7 and testCase8 since it throws an exceptioin
testNoCircularInheritanceWithSixNodes(); //testCase7
testNoCircularInheritanceWithThreeNodesFunction(); //testCase6
testNoCircularInheritenceWithTwoNodesFunction(); //testCase5
testIsMemberAndumberOfAllNodes(); //testCase4
peterTest(); //testCase3
testNoFuncInFirstChild(); // testCase2
testNoSuchFunction(); // testCase1

function testCircularInheritanceWithEightNodesFunction() {
    document.write("<br>testCircularInheritanceWithEightNodesFunction: ");
    var obj0, obj1, obj2, obj3, obj4, obj5, obj6, obj7;
    
    obj0 = myObject.create([]);
    obj1 = myObject.create([]);
    obj2 = myObject.create([]);
    obj3 = myObject.create([obj2]);
    obj4 = myObject.create([obj1]);
    obj5 = myObject.create([obj4]);
    obj6 = myObject.create([]);
    obj7 = myObject.create([]);
    
    obj0.list[0] = obj1;
    obj0.list[1] = obj2;
    
    obj1.list[0] = obj3;
    obj2.list[0] = obj4;
    obj3.list[0] = obj5; 
    obj4.list[1] = obj6;
    obj6.list[0] = obj7;

    obj0.func0 = function (arg0) {
        return "func0: " + arg0;
    };
    
    obj1.func1 = function (arg1) {
        return "func1: " + arg1;
    };
    
    obj2.func2 = function (arg2) {
        return "func2: " + arg2;
    };
      
     obj4.func4 = function (arg2) {
        return "func3: " + arg2;
    };
    
      obj5.func5 = function (arg1) {
        return "func5: " + arg1;
    };
    
    obj6.func6 = function (arg2) {
        return "func2: " + arg2;
    };
      
     obj7.func3 = function (arg2) {
        return "func7: " + arg2;
    };
    
    document.write(obj0.call("func3", ["hello"]));
    
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
    document.write("<br>"); 
}
 
function testNoCircularInheritanceWithSixNodes(){
    document.write("<br>testNoCircularInheritanceWithSixNodes:");
    var obj0, obj1, obj2, obj3, obj4, obj5;
    
    obj0 = myObject.create([]);
    obj1 = myObject.create([]);
    obj2 = myObject.create([obj1]);
    obj3 = myObject.create([obj0,obj2]);
    obj4 = myObject.create([obj1,obj2]);
    obj5 = myObject.create([]);
    
    obj0.list[0] = obj1; 
    obj1.list[0] = obj5;

   obj0.func = function (arg) {
        return "func0: " + arg;
    };        
    obj1.func1 = function (arg1) {
        return "func1: " + arg1;
    };
    
    obj2.func2 = function(arg2){
        return "func2: " + arg2;
    }; 
    
    obj3.func3 = function (arg) {
        return "func0: " + arg;
    };
    
    obj4.func4 = function (arg) {
        return "func4: " + arg;
    };
    
    obj5.func9 = function (arg) {
        return "func5: " + arg;
    };
     document.write(obj0.call("func9", ["hello"]));
     document.write("<br>"); 
}

function testNoCircularInheritanceWithThreeNodesFunction() {
    document.write("<br>testCircularInheritanceWithThreeNodesFunction: ");

    var obj0, obj1, obj2;
    
    obj0 = myObject.create([]);
    obj1 = myObject.create([]);
    obj2 = myObject.create([]);  
    
    obj0.list[0] = obj1; 
    obj1.list[0] = obj2; 
    
    obj0.func = function (arg) {       
        return "func0: " + arg;
    };    
    
    obj1.func1 = function (arg1) {
        return "func1: " + arg1;
    };
    
    obj2.func2 = function(arg2){
        return "func2: " + arg2;
    };
    
    document.write(obj0.call("func2", ["hello"])); 
    document.write("<br>"); 
}


function testNoCircularInheritenceWithTwoNodesFunction() {
    document.write("<br><b>testNoCircularInheritenceWithTwoNodesFunction: < /b>");

    var obj0, obj1;
    
    obj0 = myObject.create([]);
    obj1 = myObject.create([]);
    obj0.list[0] = obj1;
    
    obj0.func = function (arg) {
        return "func0: " + arg;
    };    
    
    obj1.func1 = function (arg1) {
        arg1 = "nonsense!"; //this argument is the one which is used in the method call, intresting!
        return "func2: " + arg1;
    };    
    
    document.write(obj0.call("func1", ["hello"]));
    document.write("<br>"); 
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
    document.write("<br> numberOfDecendants: ");
    document.write(myObject.numberOfDecendants);    
    document.write("<br>");    
}


function peterTest() {
    document.write("<br>peterTest: ");
    
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
    } else {
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
    } else {
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


