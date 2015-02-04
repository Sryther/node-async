(function () {

    var async = {};

    // global on the server, window in the browser
    var root, previous_async;

    root = this;
    if (root != null) {
        previous_async = root.async;
    }

    async.each = function(array, action, end) {
        // Catch errors
        if (typeof array !== "object") {
            end(new TypeError(array + ' is not an object'));
        }
        if (typeof action !== "function") {
            end(new TypeError(action + ' is not a function'));
        }
        if (typeof end !== "function") {
            end(new TypeError(end + ' is not a function'));
        }

        var i = array.length; // Number of action to do
        array.forEach(function(v, i) {
            action(v, function(err) {
                if (err) end(err);
                i--;
                if (i == 0) {
                    end(err);
                }
            });
        });
    }

    // Node.js
    if (typeof module !== 'undefined' && module.exports) {
        module.exports = async;
    }
    // AMD / RequireJS
    else if (typeof define !== 'undefined' && define.amd) {
        define([], function () {
            return async;
        });
    }
    // included directly via <script> tag
    else {
        root.async = async;
    }

}());
