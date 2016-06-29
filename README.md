[![npm](https://img.shields.io/npm/v/nativescript-tracing.svg)](https://www.npmjs.com/package/nativescript-tracing)
[![npm](https://img.shields.io/npm/l/nativescript-tracing.svg)](https://www.npmjs.com/package/nativescript-tracing)
[![npm](https://img.shields.io/npm/dt/nativescript-tracing.svg?label=npm%20d%2fls)](https://www.npmjs.com/package/nativescript-tracing)

# NativeScript tracing

A NativeScript module providing basic tracing actions for Android and iOS.

## License

This is released under the MIT License, meaning you are free to include this in any type of program -- However for entities that need a support and/or a commercial license please contact me at [http://nativescript.tools](http://nativescript.tools).

I also do contract work; so if you have a module you want built for NativeScript (or any other software projects) feel free to contact me [nathan@master-technology.com](mailto://nathan@master-technology.com).

[![Donate](https://img.shields.io/badge/Donate-PayPal-brightgreen.svg?style=plastic)](https://www.paypal.com/cgi-bin/webscr?cmd=_donations&business=HN8DDMWVGBNQL&lc=US&item_name=Nathanael%20Anderson&item_number=nativescript%2dtracing&no_note=1&no_shipping=1&currency_code=USD&bn=PP%2dDonationsBF%3ax%3aNonHosted)
[![Patreon](https://img.shields.io/badge/Pledge-Patreon-brightgreen.svg?style=plastic)](https://www.patreon.com/NathanaelA)

## Installation

Run `tns plugin add nativescript-tracing` from inside your main project's directory:


## Usage

To use the tracing module you must first `require()` it from your project's `node_modules` directory:

```js
var Tracing = require( "nativescript-tracing" );
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
    } else {
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
