define([
    "js/core/core",
    "js/events/pluginsLoaded",
    "js/events/layoutReady"
], function () {
    $ACC.pluginsLoaded(function () {
        $ACC.$tmp = $('<div id="automizy-common-collection-tmp"></div>');

        $ACC.layoutReady();
        $ACC.ready();
    });
});