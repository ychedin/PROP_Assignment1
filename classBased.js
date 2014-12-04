"use strict";
function createClass(className, superClassList) {
    var myClass = {
        new : function () {
            var object = {
                call: function (funcName, parameters) {
                    var dfsResult = this.class.dfs(funcName, parameters);
                    if (typeof dfsResult === "function") {
                        return dfsResult(parameters); // actually calls the function.
                    } else {
                        throw "'" + funcName + "' is not defined for the calling class.";
                    }
                } // end of call();
            };

            Object.defineProperty(object, 'class', {
                configurable: false,
                writable: false,
                value: myClass
            });

            return object;
        }, // end of new();

        dfs: function (funcName, args) { // helper method. Not intended to be called directly.
            var fn = this[funcName];
            if (typeof fn === "function") {
                return fn; // Success! Stop searching.
            } else if (this.superClassList) { // if this has a list. 
                for (var i = 0; i < this.superClassList.length; i++) { // go through the list.
                    fn = this.superClassList[i].dfs(funcName, args);
                    if (typeof fn === "function") {
                        return fn; // Success! Stop searching.
                    }
                }
            }
        } // end of dfs()
    };
    Object.defineProperty(myClass, 'className', {
        configurable: false,
        writable: false,
        value: className
    });

    if (typeof superClassList === "undefined") {
        throw "Attempting to use an undefined class as a superclass!";
    }

    Object.defineProperty(myClass, 'superClassList', {
        configurable: false,
        writable: false,
        value: superClassList
    });

    return myClass;
}// end of createClass


function peterTest() {
    document.write("<br>peterTest: ");
    var class0 = createClass("Class0", null);
    class0.func = function (arg) {
        return "func0: " + arg;
    };
    var class1 = createClass("Class1", [class0]);
    var class2 = createClass("Class2", []);
    class2.func = function (arg) {
        return "func2: " + arg;
    };
    var class3 = createClass("Class3", [class1, class2]);
    var obj3 = class3.new();
    var result = obj3.call("func", ["hello"]);
//where 'result' is assigned "func0: hello".
    if (result === "func0: hello") {
        document.write("Success!<br>");
    }


}

peterTest();
