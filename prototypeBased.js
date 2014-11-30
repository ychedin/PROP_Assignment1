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

peterTest();
testNoFuncInFirstChild();
testNoSuchFunction();

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
