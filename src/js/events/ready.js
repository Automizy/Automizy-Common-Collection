define([
    "js/core/core",
    "js/core/runTheFunctions"
], function () {

    $ACC.functions.readyFunctions = [];
    $ACC.ready = function(f){
        if(typeof f === 'function') {
            $ACC.functions.readyFunctions.push(f);
            if($ACC.automizyReady){
                f.apply($ACC, []);
            }
            return $ACC;
        }
        $ACC.runTheFunctions($ACC.functions.readyFunctions);
        $ACC.automizyReady = true;
        return $ACC;
    };

});