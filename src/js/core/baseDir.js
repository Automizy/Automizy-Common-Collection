define([
    "js/core/core"
], function () {
    $ACC.baseDir = function(value){
        if (typeof value !== 'undefined') {
            $ACC.config.dir = value;
            return $ACC;
        }
        return $ACC.config.dir;
    };
});