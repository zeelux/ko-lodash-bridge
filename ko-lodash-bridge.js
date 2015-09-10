/* globals ko, _, define, exports, module, require */
; (function () {
    'use strict';

    (function (factory) {
        // Support three module loading scenarios
        if (typeof define === 'function' && define['amd']) {
            // [1] AMD anonymous module
            define(['exports', 'underscore', 'knockout'], factory);
        } else if (typeof require === 'function' && typeof exports === 'object' && typeof module === 'object') {
            // [2] CommonJS/Node.js --- untested
            factory(module['exports'] || exports);  // module.exports is for Node.js
        } else {
            // [3] No module loader (plain <script> tag) - put directly in global namespace
            // lodash and knockout must be global as well.
            factory(window['jsSort'] = {}, _, ko);
        }
    })(function (exports, _, ko) {
        'use strict';

        _.callback = _.wrap(_.callback, function (callback, func, thisArg) {
            if (!_.isObject(func)) {
                return callback(func, thisArg);
            }

            return function (object) {
                if (object == null) {
                    return false;
                }

                return _.every(func, isMatch.bind(null, object));
            };
        });
        
        function isMatch(object, value, key) {
            return ko.unwrap(object[key]) === value && (value !== undefined || (key in object));
        } 
    });
})();