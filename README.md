# NativeScript tracing

A NativeScript module providing basic tracing actions for Android and iOS.

## License

This is released under the MIT License, meaning you are free to include this in any type of program -- However for entities that need a support and/or a commercial license please contact me (nathan@master-technology.com).

## Installation

Run `npm install nativescript-tracing --save` from inside your project's `app` directory:

```
.
├── app <------------------------------ run npm install from inside here
│   ├── app.css
│   ├── app.js
│   ├── main-page.js
│   ├── main-page.xml
│   ├── node_modules
│   │   └── nativescript-tracing <-- The install will place the module's code here
│   │       └── ...
│   ├── package.json <----------------- The install will register “nativescript-tracing” as a dependency here
│   ├── App_Resources  
│   └── tns_modules
│       └── ...
├── lib
└── platforms
    ├── android
    └── ios
```

As is, using npm within NativeScript is still experimental, so it's possible that you'll run into some issues. A more complete solution is in the works, and you can check out [this issue](https://github.com/NativeScript/nativescript-cli/issues/362) for an update on its progress and to offer feedback.

If npm doesn't end up working for you, you can just copy and paste this repo's tracing.js files into your app and reference them directly.

## Usage

To use the tracing module you must first `require()` it from your project's `node_modules` directory:

```js
var Tracing = require( "./node_modules/nativescript-tracing/tracing" );
```

### Methods
#### Tracing(class, options);
##### Parameters
* class: your class you want to add tracing too  
* (optional) options object:  
** disableAddedFunction - This will disable adding the option "tracing" function that will disable/enable the console logging.
** ignore - array of functions that you don't want to add tracing too.  
* RETURNS: Nothing
 
```js
// my-page.js
var Sqlite = require( "/path/to/node_modules/nativescript-sqlite/sqlite" );
var Tracing = require( "/path/to/node_modules/nativescript-tracing/tracing");

Tracing(Sqlite, {ignore: ["close"], disableAddedFunction: true});


var db_promise = new Sqlite("MyTable", function(err, db) {
    if (err) { 
      console.error("We failed to open database", err);
    } else 
      // This should ALWAYS be true, db object is open in the "Callback" if no errors occurred
      console.log("Are we open yet (Inside Callback)? ", db.isOpen() ? "Yes" : "No"); // Yes
    }
});

db_promise.then(function(db) {
    // This should ALWAYS be true, db object is open in the "then"
      console.log("Are we open yet (Inside Promise)? ", db.isOpen() ? "Yes" : "No"); // Yes
      db.close();
   }, function(err) {
     console.error("We failed to open database", err);
   });
```

This should output something like:
* Starting Sqlite: MyTable, (callback)
* Starting isOpen
* Ending isOpen
Are we open (callback)
* Starting isOpen
* Ending isOpen
Are we open (Promise)
* ---- PLEASE note if we hadn't put the "close" in the **ignore** array it would have shown up here
* Ending Sqlite: MyTable
