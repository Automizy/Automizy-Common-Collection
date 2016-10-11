define([
    "js/core/core",
    "js/core/runTheFunctions"
], function () {

    $ACC.functions.pluginsLoadedFunctions = [];
    $ACC.pluginsLoaded = function(f){
        if(typeof f === 'function'){
            $ACC.functions.pluginsLoadedFunctions.push(f);
            if($ACC.automizyPluginsLoaded){
                f.apply($ACC, []);
            }
            return $ACC;
        }
        $ACC.runTheFunctions($ACC.functions.pluginsLoadedFunctions, $ACC, []);
        $ACC.automizyPluginsLoaded = true;
        return $ACC;
    };

});