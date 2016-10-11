define([
    "js/core/core",
    "js/core/runTheFunctions"
], function () {

    $ACC.functions.layoutReadyFunctions = [];
    $ACC.layoutReady = function(f){
        if(typeof f === 'function') {
            $ACC.functions.layoutReadyFunctions.push(f);
            if($ACC.automizyLayoutReady){
                f.apply($ACC, []);
            }
            return $ACC;
        }
        $ACC.runTheFunctions($ACC.functions.layoutReadyFunctions);
        $ACC.automizyLayoutReady = true;
        return $ACC;
    };

});