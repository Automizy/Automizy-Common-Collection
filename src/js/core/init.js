define([
    "js/core/core",
    "js/core/loadPlugins"
], function () {
    $ACC.init = function () {
        if(typeof $ACC.automizyInited === 'undefined'){
            $ACC.automizyInited = false;
        }

        if(!$ACC.automizyInited){
            $ACC.automizyInited = true;
            $ACC.loadPlugins();
        }

        return $ACC;
    };
});