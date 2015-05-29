/***********************************************************************************
 * (c) 2015, Master Technology
 * Licensed under the MIT license or contact me for a Commercial or Support License
 *
 * Any questions please feel free to email me or put a issue up on the github repo.
 * Version 0.0.1                                       Nathan@master-technology.com
 **********************************************************************************/
"use strict";

if (!console || !console.log) {
    var Console = require('console/console-native').Console;
    console = new Console();
}

var tracer = function(traceme, options) {
    options = options || {};
    if (traceme.prototype) {
       addTracing(traceme.prototype, options);
    } else {
       addTracing(traceme, options);
    }
};

function traceWrapper(func, name) {
    return function() {
        if (this._MT_tracing === false) {
            return func.apply(this, arguments);
        }  else {
            var args = [];
            args.push("Starting " + name + (arguments.length ? ":" : ""));
            for (var i = 0; i < arguments.length; i++) {
                if (typeof arguments[i] === "function") {
                    args.push("(callback)");
                } else {
                    args.push(arguments[i]);
                }
            }
            console.log.apply(console, args);
            var res = func.apply(this, arguments);
			if (typeof arguments[0] === 'function') {
				console.log("Ending ", name, "(callback)");
			} else {
			   console.log("Ending ", name); //, arguments[0] ? arguments[0] : '');
            }
			return res;
        }
    };
}


var addTracing = function(traceme, options) {
    var ignore = options.ignore || [];
    for (var name in traceme) {
        if (ignore[name]) continue;
        if (traceme.hasOwnProperty(name) && typeof traceme[name] === 'function') {
            traceme[name] = traceWrapper(traceme[name], name);
        }
    }

    if (!options.disableAddedFunction) {
        traceme.tracing = function(e) {
            this._MT_tracing = !!e;
        };
    }
};


module.exports = tracer;