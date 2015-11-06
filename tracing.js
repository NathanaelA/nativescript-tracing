/***********************************************************************************
 * (c) 2015, Master Technology
 * Licensed under the MIT license or contact me for a Commercial or Support License
 *
 * I do contract work in most languages, so let me solve your problems!
 *
 * Any questions please feel free to email me or put a issue up on the github repo.
 * Version 0.0.3                                       Nathan@master-technology.com
 **********************************************************************************/
"use strict";

/* jshint camelcase: false */
/* global global */

if (!console || !console.log) {
    var Console = require('console/console-native').Console;
    //noinspection JSClosureCompilerSyntax
    global.console = new Console();
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
        } else {
            var Inc = [];
            for (var j=0;j<this._MT_tracing_level;j++) { Inc.push("   "); }
            Inc = Inc.join();
            var args = [Inc];
            args.push("Starting " + name + (arguments.length ? ":" : ""));
            for (var i = 0; i < arguments.length; i++) {
                if (typeof arguments[i] === "function") {
                    args.push("(callback)");
                } else {
                    args.push(arguments[i]);
                }
            }
            console.log.apply(console, args);
            this._MT_tracing_level++;
            var res = func.apply(this, arguments);
            this._MT_tracing_level--;
			if (typeof arguments[0] === 'function') {
				console.log(Inc, "Ending ", name, "(callback)");
			} else {
			   console.log(Inc, "Ending ", name);
            }
			return res;
        }
    };
}


var addTracing = function(traceme, options) {
    var ignore = options.ignore || [];
    for (var name in traceme) {
        if (traceme.hasOwnProperty(name) && typeof traceme[name] === 'function') {
            var found = false;
            for (var i=0;i<ignore.length && !found;i++) {
                if (ignore[i] === name) { found = true; }
            }
            if (found) { continue; }
            traceme[name] = traceWrapper(traceme[name], name);
        }
    }
    traceme._MT_tracing_level = 0;
    if (!options.disableAddedFunction) {
        traceme.tracing = function(e) {
            if (arguments.length) {
                this._MT_tracing = !!e;
            }
            return !!this._MT_tracing;
        };
    }
};


module.exports = tracer;