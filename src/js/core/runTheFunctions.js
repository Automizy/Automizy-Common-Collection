define([
    "js/core/core"
], function () {

    $ACC.runTheFunctions = function(functions, thisParameter, parameters){
        var functions = functions || [];
        var thisParameter = thisParameter || $ACC;
        var parameters = parameters || [];
        for(var i = 0; i < functions.length; i++) {
            functions[i].apply(thisParameter, parameters);
        }
    };

});