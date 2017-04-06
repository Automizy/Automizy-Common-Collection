define([
    "js/init/init"
], function () {
    $ACC.pluginsLoaded(function () {
        $ACC.$tmp = $('<div id="automizy-common-collection-tmp"></div>');

        $ACC.layoutReady();
        $ACC.ready();
    });
});