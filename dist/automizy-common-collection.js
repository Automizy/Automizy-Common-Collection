(function(){
    window.AutomizyCommonCollection = window.$ACC = new function () {
        var t = this;
        t.version = '0.1.1';
        t.elements = {};
        t.dialogs = {};
        t.inputs = {};
        t.buttons = {};
        t.forms = {};
        t.functions = {};
        t.xhr = {};
        t.config = {
            dir:'.',
            url:'https://app.automizy.com'
        };
        t.m = {};
        t.d = {};
    }();
    return $ACC;
})();

(function(){
    var PluginLoader = function () {
        var t = this;
        t.d = {
            plugins: [],
            loadedPluginsCount: 0,
            allPluginsCount:0,
            completeFunctions: []
        };
    };

    var p = PluginLoader.prototype;


    p.addPlugin = function (plugin) {
        return this.addPlugins([plugin]);
    };

    p.plugins = p.addPlugins = function (plugins) {
        var t = this;
        if (typeof plugins !== 'undefined') {

            for (var i = 0; i < plugins.length; i++) {
                var plugin = plugins[i];
                plugin.skipCondition = plugin.skipCondition || false;
                plugin.complete = plugin.complete || function () {};
                plugin.css = plugin.css || [];
                plugin.js = plugin.js || [];

                if (typeof plugin.css === 'string') {
                    plugin.css = [plugin.css];
                }
                if (typeof plugin.js === 'string') {
                    plugin.js = [plugin.js];
                }
                t.d.plugins.push(plugin);
            }

            return t;
        }
        return t.d.plugins;
    };

    p.run = function () {

        var t = this;

        var hasActivePlugin = false;

        for (var i = 0; i < t.d.plugins.length; i++) {
            var plugin = t.d.plugins[i];
            if (plugin.inited) {
                continue;
            }
            plugin.inited = true;

            if (!plugin.skipCondition) {
                hasActivePlugin = true;
                for (var j = 0; j < plugin.css.length; j++) {
                    var head = document.getElementsByTagName('head')[0];
                    var link = document.createElement('link');
                    link.rel = 'stylesheet';
                    link.type = 'text/css';
                    link.href = plugin.css[j];
                    head.appendChild(link);
                }

                (function (plugin) {
                    var deferreds = [];

                    function pluginThen() {
                        t.d.loadedPluginsCount++;
                        plugin.complete.apply(this, [true]);
                        if (t.d.loadedPluginsCount === t.d.allPluginsCount) {
                            t.complete();
                        }
                    }

                    t.d.allPluginsCount++;
                    if (plugin.js.length <= 0) {
                        pluginThen();
                    } else {
                        for (var j = 0; j < plugin.js.length; j++) {
                            deferreds.push($.getScript(plugin.js[j]));
                        }
                        $.when.apply(null, deferreds).always(function () {
                            pluginThen();
                        });
                    }
                })(plugin);
            }else{
                plugin.complete.apply(this, [false]);
            }
        }

        if (!hasActivePlugin) {
            t.complete();
        }

        return t;
    };
    p.complete = function (complete) {
        var t = this;

        if (typeof complete === 'function') {
            t.d.completeFunctions.push({
                inited: false,
                func: complete
            });
            return t;
        }

        for (var i = 0; i < t.d.completeFunctions.length; i++) {
            if (t.d.completeFunctions[i].inited) {
                continue;
            }
            t.d.completeFunctions[i].inited = true;
            t.d.completeFunctions[i].func.apply(t, []);
        }

        return t;
    };

    $ACC.pluginLoader = new PluginLoader();

})();

(function(){

    $ACC.runTheFunctions = function(functions, thisParameter, parameters){
        var functions = functions || [];
        var thisParameter = thisParameter || $ACC;
        var parameters = parameters || [];
        for(var i = 0; i < functions.length; i++) {
            functions[i].apply(thisParameter, parameters);
        }
    };

})();

(function(){

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

})();

(function(){
    $ACC.loadPlugins = function () {
        (function () {
            if (typeof window.jQuery === 'undefined') {
                var script = document.createElement("SCRIPT");
                script.src = $ACC.config.dir + "/vendor/jquery/jquery.min.js";
                script.type = 'text/javascript';
                document.getElementsByTagName("head")[0].appendChild(script);
            }
            var checkReady = function (callback) {
                if (typeof window.jQuery === 'function') {
                    callback(jQuery);
                } else {
                    window.setTimeout(function () {
                        checkReady(callback);
                    }, 100);
                }
            };

            checkReady(function ($) {
                $ACC.pluginLoader.plugins([
                    {
                        skipCondition:(function () {
                            var span = document.createElement('span');
                            span.className = 'fa';
                            span.style.display = 'none';
                            document.body.insertBefore(span, document.body.firstChild);
                            if (window.getComputedStyle(span, null).getPropertyValue('font-family') === 'FontAwesome') {
                                document.body.removeChild(span);
                                return true;
                            }
                            document.body.removeChild(span);
                            return false;
                        })(),
                        css:$ACC.config.dir + "/vendor/fontawesome/css/font-awesome.min.css"
                    },
                    {
                        skipCondition:typeof AutomizyJs !== 'undefined',
                        css:$ACC.config.dir + "/vendor/automizy-js/automizy.css",
                        js:[
                            $ACC.config.dir + '/vendor/automizy-js/languages/en_US.js',
                            $ACC.config.dir + "/vendor/automizy-js/automizy.js"
                        ],
                        complete:function(){
                            $A.setTranslate(window.I18N || {});
                        }
                    },
                    {
                        skipCondition:typeof AutomizyJsApi !== 'undefined',
                        js:$ACC.config.dir + "/vendor/automizy-js-api/automizy.api.js"
                    }
                ]).run().complete(function(){
                    $ACC.pluginsLoaded();
                });

            });

        })();
    };
})();

(function(){
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
})();

(function(){
    $ACC.baseDir = function(value){
        if (typeof value !== 'undefined') {
            $ACC.config.dir = value;
            return $ACC;
        }
        return $ACC.config.dir;
    };
})();

(function(){

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

})();

(function(){

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

})();

(function(){
    $ACC.pluginsLoaded(function () {
        $ACC.$tmp = $('<div id="automizy-common-collection-tmp"></div>');

        $ACC.layoutReady();
        $ACC.ready();
    });
})();

(function(){
    console.log('%c AutomizyCommonCollection loaded! ', 'background: #000000; color: #bada55; font-size:14px');
})();

(function(){})();