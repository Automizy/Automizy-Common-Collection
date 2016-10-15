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
        t.modules = {};
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
    var CodeHelp = function () {
        var t = this;
        t.d = {

        };

        t.d.$widget = $('<div class="automizy-common-collection-codehelp-widget"></div>');

        t.d.$mainBox                            = $('<div class="automizy-common-collection-codehelp"></div>').appendTo(t.d.$widget);
        t.d.$mainBoxDescription                 = $('<div class="automizy-common-collection-codehelp-description"></div>').appendTo(t.d.$mainBox);
        t.d.$mainBoxElements                    = $('<div class="automizy-common-collection-codehelp-elements"></div>').appendTo(t.d.$mainBox);

        t.d.$mainBoxElementsUsePlugin          = $('<div class="automizy-common-collection-codehelp-elements-element automizy-hide"></div>').appendTo(t.d.$mainBoxElements).click(function(){
            $(this).addClass('automizy-active').siblings().removeClass('automizy-active');
            t.d.$usePluginBox.show();
            t.d.$doItYourselfBox.hide();
            t.d.$askForItHelpBox.hide();
        });
        t.d.$mainBoxElementsUsePluginIcon      = $('<span class="fa fa-plug fa-3x fa-color-orange"></span>').appendTo(t.d.$mainBoxElementsUsePlugin);
        t.d.$mainBoxElementsUsePluginText      = $('<div class="automizy-common-collection-codehelp-elements-element-text"></div>').appendTo(t.d.$mainBoxElementsUsePlugin).text($A.translate('Use plugin'));

        t.d.$mainBoxElementsDoItYourself        = $('<div class="automizy-common-collection-codehelp-elements-element automizy-hide"></div>').appendTo(t.d.$mainBoxElements).click(function(){
            $(this).addClass('automizy-active').siblings().removeClass('automizy-active');
            t.d.$usePluginBox.hide();
            t.d.$doItYourselfBox.show();
            t.d.$askForItHelpBox.hide();
        });
        t.d.$mainBoxElementsDoItYourselfIcon    = $('<span class="fa fa-code fa-3x fa-color-blue"></span>').appendTo(t.d.$mainBoxElementsDoItYourself);
        t.d.$mainBoxElementsDoItYourselfText    = $('<div class="automizy-common-collection-codehelp-elements-element-text"></div>').appendTo(t.d.$mainBoxElementsDoItYourself).text($A.translate('Do it yourself'));

        t.d.$mainBoxElementsAskForItHelp        = $('<div class="automizy-common-collection-codehelp-elements-element automizy-hide"></div>').appendTo(t.d.$mainBoxElements).click(function(){
            $(this).addClass('automizy-active').siblings().removeClass('automizy-active');
            t.d.$usePluginBox.hide();
            t.d.$doItYourselfBox.hide();
            t.d.$askForItHelpBox.show();
        });
        t.d.$mainBoxElementsAskForItHelpIcon    = $('<span class="fa fa-commenting-o fa-3x fa-color-green"></span>').appendTo(t.d.$mainBoxElementsAskForItHelp);
        t.d.$mainBoxElementsAskForItHelpText    = $('<div class="automizy-common-collection-codehelp-elements-element-text"></div>').appendTo(t.d.$mainBoxElementsAskForItHelp).text($A.translate('Ask for IT help'));

        t.d.helpButton = $A.newButton({
            text: $A.translate('Still have problem? Contact us!'),
            skin: 'nobox-orange',
            click: function () {
                Intercom('showNewMessage');
            },
            target: t.d.$mainBox
        });

        t.d.$usePluginBox = $('<table cellpadding="0" cellspacing="0" border="0" class="automizy-common-collection-codehelp-box"></table>').appendTo(t.d.$mainBox);
        t.d.$usePluginBoxTr = $('<tr></tr>').appendTo(t.d.$usePluginBox);
        t.d.$usePluginBoxTrTd1 = $('<td class="automizy-common-collection-codehelp-box-td1"></td>').appendTo(t.d.$usePluginBoxTr);
        t.d.$usePluginBoxTrTd2 = $('<td class="automizy-common-collection-codehelp-box-td2"></td>').appendTo(t.d.$usePluginBoxTr);
        t.d.$usePluginBoxTrTd3 = $('<td class="automizy-common-collection-codehelp-box-td3"></td>').appendTo(t.d.$usePluginBoxTr);

        t.d.$doItYourselfBox = $('<table cellpadding="0" cellspacing="0" border="0" class="automizy-common-collection-codehelp-box"></table>').appendTo(t.d.$mainBox);
        t.d.$doItYourselfBoxTr = $('<tr></tr>').appendTo(t.d.$doItYourselfBox);
        t.d.$doItYourselfBoxTrTd1 = $('<td class="automizy-common-collection-codehelp-box-td1"></td>').appendTo(t.d.$doItYourselfBoxTr);
        t.d.$doItYourselfBoxTrTd2 = $('<td class="automizy-common-collection-codehelp-box-td2"></td>').appendTo(t.d.$doItYourselfBoxTr);
        t.d.$doItYourselfBoxTrTd3 = $('<td class="automizy-common-collection-codehelp-box-td3"></td>').appendTo(t.d.$doItYourselfBoxTr);

        t.d.$askForItHelpBox = $('<table cellpadding="0" cellspacing="0" border="0" class="automizy-common-collection-codehelp-box"></table>').appendTo(t.d.$mainBox);
        t.d.$askForItHelpBoxTr = $('<tr></tr>').appendTo(t.d.$askForItHelpBox);
        t.d.$askForItHelpBoxTrTd1 = $('<td class="automizy-common-collection-codehelp-box-td1"></td>').appendTo(t.d.$askForItHelpBoxTr);
        t.d.$askForItHelpBoxTrTd2 = $('<td class="automizy-common-collection-codehelp-box-td2"></td>').appendTo(t.d.$askForItHelpBoxTr);
        t.d.$askForItHelpBoxTrTd3 = $('<td class="automizy-common-collection-codehelp-box-td3"></td>').appendTo(t.d.$askForItHelpBoxTr);


        $('<span class="fa fa-info-circle"></span>').appendTo(t.d.$usePluginBoxTrTd1);
        $('<span class="fa fa-info-circle"></span>').appendTo(t.d.$doItYourselfBoxTrTd1);
        $('<span class="fa fa-info-circle"></span>').appendTo(t.d.$askForItHelpBoxTrTd1);

        $('<span class="fa fa-times"></span>').appendTo(t.d.$usePluginBoxTrTd3).click(function(){
            t.d.$usePluginBox.hide();
            t.d.$mainBoxElementsUsePlugin.removeClass('automizy-active');
        });
        $('<span class="fa fa-times"></span>').appendTo(t.d.$doItYourselfBoxTrTd3) .click(function(){
            t.d.$doItYourselfBox.hide();
            t.d.$mainBoxElementsDoItYourself.removeClass('automizy-active');
        });
        $('<span class="fa fa-times"></span>').appendTo(t.d.$askForItHelpBoxTrTd3) .click(function(){
            t.d.$askForItHelpBox.hide();
            t.d.$mainBoxElementsAskForItHelp.removeClass('automizy-active');
        });



        t.d.dialog = $A.dialog({
            title: $A.translate('Code help'),
            width: '1100px',
            positionY: '30px',
            content: t.d.$widget,
            buttons: [
                {
                    text: $A.translate('Close'),
                    click: function () {
                        t.d.dialog.close();
                    }
                }
            ]
        });
        
    };

    var p = CodeHelp.prototype;

    p.close = function(func){
        var t = this;
        if(typeof func !== 'undefined'){
            t.d.dialog.close(func);
            return t;
        }
        t.d.dialog.close();
        return t;
    };
    p.open = function(func){
        var t = this;
        if(typeof func !== 'undefined'){
            t.d.dialog.open(func);
            return t;
        }

        t.d.$mainBoxElementsUsePlugin.removeClass('automizy-active');
        t.d.$mainBoxElementsDoItYourself.removeClass('automizy-active');
        t.d.$mainBoxElementsAskForItHelp.removeClass('automizy-active');
        t.d.$usePluginBox.hide();
        t.d.$doItYourselfBox.hide();
        t.d.$askForItHelpBox.hide();

        t.d.dialog.open();
        return t;
    };
    p.title = function(title){
        var t = this;
        if(typeof title !== 'undefined'){
            t.d.dialog.title(title);
            return t;
        }
        return t.d.dialog.title();
    };
    p.description = function(description){
        var t = this;
        if(typeof description !== 'undefined'){
            t.d.$mainBoxDescription.html(description);
            return t;
        }
        return t.d.$mainBoxDescription.html();
    };

    p.pluginContent = function(content){
        var t = this;
        if(typeof content !== 'undefined'){
            t.d.$usePluginBoxTrTd2.html(content);
            t.d.$mainBoxElementsUsePlugin.removeClass('automizy-hide');
            return t;
        }
        return t.d.$usePluginBoxTrTd2.html();
    };
    p.doItYourselfContent = function(content){
        var t = this;
        if(typeof content !== 'undefined'){
            t.d.$doItYourselfBoxTrTd2.html(content);
            t.d.$mainBoxElementsDoItYourself.removeClass('automizy-hide');
            return t;
        }
        return t.d.$doItYourselfBoxTrTd2.html();
    };
    p.askForItHelpContent = function(content){
        var t = this;
        if(typeof content !== 'undefined'){
            t.d.$askForItHelpBoxTrTd2.html(content);
            t.d.$mainBoxElementsAskForItHelp.removeClass('automizy-hide');
            return t;
        }
        return t.d.$askForItHelpBoxTrTd2.html();
    };

    $ACC.m.CodeHelp = CodeHelp;
    $ACC.newCodeHelp = function () {
        return new $ACC.m.CodeHelp();
    };

    return $ACC.m.CodeHelp;
})();

(function(){
    var CodeHelpItHelp = function () {
        var t = this;
        t.d = {
            dialogs:{},
            inputs:{},
            buttons:{},
            done:function(){},
            beforeSend:function(){},
            previewUrl:false
        };

        t.d.$widget = $('<div></div>');
        t.d.$title = $('<div></div>').appendTo(t.d.$widget);
        t.d.$widget.append('<br/><br/>');
        t.d.inputs.email = $A.newInput({
            label:$A.translate("Enter your developers' email address:"),
            name:'email',
            labelAfter:$A.newButton({
                skin:'nobox-orange',
                click:function(){
                    var win = window.open(t.previewUrl(), '_blank');
                    win.focus();
                },
                create:function(){
                    var $html = $('<span></span>');
                    var $icon = $('<span class="fa fa-eye"></span>').appendTo($html);
                    $html.append(' ' + $A.translate('Preview'));
                    this.widget().css('margin','0 0 0 12px');
                    this.html($html);
                }
            }),
            breakLabel:true,
            target:t.d.$widget
        });
        t.d.$success = $('<div style="padding-bottom:12px; color:#008000">'+$A.translate('Send successful')+'</div>').appendTo(t.d.$widget).hide();
        t.d.buttons.send = $A.newButton({
            text:$A.translate("Send Instructions"),
            skin:'simple-orange',
            newRow:true,
            target:t.d.$widget,
            click:function(){
                $A.ajaxDocumentCover(1);
                t.d.$success.hide();
                $.ajax({
                    url: $AA.u.base + '/public-email',
                    type: 'POST',
                    dataType: 'json',
                    data:{
                        emailAddress: t.d.inputs.email.val(),
                        htmlEmail: t.email(),
                        fields: t.fields(),
                        subject: t.subject()
                    },
                    headers: {Authorization: 'Bearer ' + $AA.token().get()}
                }).always(function(data){
                    t.d.$success.show(250);
                    $A.ajaxDocumentCover(0);
                })
            }
        });

        t.title($A.translate('Ask for IT help now by sending the instructions.'));

    };

    var p = CodeHelpItHelp.prototype;

    p.previewUrl = function(previewUrl){
        var t = this;
        if(typeof previewUrl !== 'undefined') {
            t.d.previewUrl = previewUrl;
            return t;
        }
        return t.d.previewUrl;
    };
    p.title = function(title){
        var t = this;
        if(typeof title !== 'undefined') {
            t.d.title = title;
            t.d.$title.html(title);
            return t;
        }
        return t.d.title;
    };
    p.widget = function(){
        var t = this;
        return t.d.$widget;
    };
    p.fields = function(fields){
        var t = this;
        if(typeof fields !== 'undefined') {
            t.d.fields = fields;
            return t;
        }
        return t.d.fields;
    };
    p.email = function(email){
        var t = this;
        if(typeof email !== 'undefined') {
            t.d.email = email;
            if(t.previewUrl() === false){
                t.previewUrl('https://app.automizy.com/public/email/'+t.d.email+'.html');
            }
            return t;
        }
        return t.d.email;
    };
    p.subject = function(subject){
        var t = this;
        if(typeof subject !== 'undefined') {
            t.d.subject = subject;
            return t;
        }
        return t.d.subject;
    };

    $ACC.m.CodeHelpItHelp = CodeHelpItHelp;
    $ACC.newCodeHelpItHelp = function () {
        return new $ACC.m.CodeHelpItHelp();
    };

    return $ACC.m.CodeHelpItHelp;
})();

(function(){
    var CodeHelpScriptInsertion = function () {
        var t = this;
        t.d = {
            hash:'<HASH>',
            clicked:false,
            scriptInserted:false,
            loopStopped:false,
            timeout:false,
            type:false
        };

        t.d.$helpScriptInsertionDoItYourself = $('<div></div>');
        $('<div></div>').text($A.translate('Copy the code below:')).appendTo(t.d.$helpScriptInsertionDoItYourself);
        t.d.$code = $('<pre class="automizy-code-content"></pre>').text('<script data-automizy-id="'+t.hash()+'" src="//analytics.automizy.com/analytics.js" async></script>').appendTo(t.d.$helpScriptInsertionDoItYourself);
        $('<b></b>').text($A.translate('Important!')).appendTo(t.d.$helpScriptInsertionDoItYourself);
        $('<div></div>').text($A.translate('After you copied the installation code, go to your website and insert it to the header section by hitting ctrl+V (PC) or @+V (Mac).')).appendTo(t.d.$helpScriptInsertionDoItYourself);

        t.d.$helpScriptInsertionPlugin = $('<div></div>');
        $('<div></div>').html($A.translate('Follow these steps:')).appendTo(t.d.$helpScriptInsertionPlugin);
        t.d.$helpScriptInsertionPluginList = $('<ol></ol>').appendTo(t.d.$helpScriptInsertionPlugin);
        $('<li></li>').html($A.translate('Login to your wordpress site')).appendTo(t.d.$helpScriptInsertionPluginList);
        $('<li></li>').html($A.translate('Search for Automizy plugin')).appendTo(t.d.$helpScriptInsertionPluginList);
        $('<li></li>').html($A.translate('Install it and log in with your Automizy user name and password')).appendTo(t.d.$helpScriptInsertionPluginList);
        $('<li></li>').html($A.translate('Now you can insert forms!')).appendTo(t.d.$helpScriptInsertionPluginList);

        t.d.scriptInsertionItHelp = $ACC.newCodeHelpItHelp()
            .email('ithelp-analytics-script-en')
            .subject($A.translate("Help me connect Automizy with our webpage please"))
            .fields({
                hash: t.hash()
            });

        t.d.scriptInsertion = $ACC.newCodeHelp()
            .title($A.translate('Install code'))
            .description($A.translate('To get started with Automizy, add the installation code to your web- or blog pages!'))
            .doItYourselfContent(t.d.$helpScriptInsertionDoItYourself)
            .pluginContent(t.d.$helpScriptInsertionPlugin)
            .askForItHelpContent(t.d.scriptInsertionItHelp.widget());

        t.d.checkButton = $A.newButton({
            skin:'simple-orange',
            text: $A.translate('Check'),
            click: function () {
                $A.ajaxDocumentCover(1);
                t.d.clicked = true;
                t.d.check().fail(function(){
                    t.d.$checkErrorMessage.show();
                }).always(function(){
                    $A.ajaxDocumentCover(0);
                })
            }
        });

        t.d.scriptInsertion.d.dialog.open(function(){
            if(t.d.type !== 'install') {
                t.d.loopStopped = false;
                t.d.check();
            }
        }).close(function(){
            t.d.loopStopped = true;
        }).addButton(t.d.checkButton);

        t.d.$checkSuccessMessage = $('<div style="float:left; color:#008000; font-family:Arial">'+$A.translate('Analytics code detected! Thank you!')+'</div>').appendTo(t.d.scriptInsertion.d.dialog.d.$buttons).hide();
        t.d.$checkErrorMessage = $('<div style="float:left; color:#ff0000; font-family:Arial">'+$A.translate('The system can not find the analytics code.')+'</div>').appendTo(t.d.scriptInsertion.d.dialog.d.$buttons).hide();

        t.d.check = function(){
            clearTimeout(t.d.timeout);
            if(t.d.scriptInserted === true || t.d.loopStopped === true){
                t.d.checkButton.hide();
                return true;
            }
            return $.ajax({
                url: $AA.u.account + '/is-script-inserted',
                type: 'GET',
                dataType: 'json',
                headers: {Authorization: 'Bearer ' + $AA.token().get()}
            }).done(function(data){
                if($A.parseBoolean(data.inserted)){
                    t.d.checkButton.hide();
                    t.d.scriptInserted = true;
                    if(typeof Automizy !== 'undefined') {
                        Automizy.config.user.isScriptInserted = true;
                    }
                    t.d.$checkSuccessMessage.show();
                }else{
                    if(t.d.clicked) {
                        t.d.$checkErrorMessage.show();
                    }
                    t.d.timeout = setTimeout(function(){
                        t.d.check();
                    }, 3000);
                }
            });
        }
    };

    var p = CodeHelpScriptInsertion.prototype;

    p.type = function(type){
        var t = this;
        if(typeof type !== 'undefined'){
            t.d.type = type;

            if(t.d.type === 'install'){
                t.d.scriptInsertion.description($A.translate('To get started with Automizy, add the installation code to your web- or blog pages!'));
                t.d.loopStopped = true;
                t.d.$checkSuccessMessage.hide();
                t.d.$checkErrorMessage.hide();
                t.d.checkButton.hide();
            }else if(t.d.type === 'createForm'){
                t.d.scriptInsertion.description($A.translate('In order to create forms please insert the Automizy script into your web page. Choose from the 3 options below.'));
                t.d.loopStopped = false;
                t.d.checkButton.show();
            }

            return t;
        }
        return t.d.type;
    };
    p.hash = function(hash){
        var t = this;
        if(typeof hash !== 'undefined'){
            t.d.hash = hash;
            t.d.$code.text('<script data-automizy-id="'+t.d.hash+'" src="//analytics.automizy.com/analytics.js" async></script>');
            t.d.scriptInsertionItHelp.fields({
                hash: t.hash()
            });
            return t;
        }
        return t.d.hash;
    };
    p.open = function(){
        var t = this;
        t.d.scriptInsertion.open();
        return t;
    };

    $ACC.m.CodeHelpScriptInsertion = CodeHelpScriptInsertion;
    $ACC.newCodeHelpScriptInsertion = function () {
        return new $ACC.m.CodeHelpScriptInsertion();
    };

    $ACC.modules.scriptInsertion = $ACC.newCodeHelpScriptInsertion();

    return $ACC.m.CodeHelpScriptInsertion;
})();

(function(){
    var CodeHelpUnbounceIntegration = function () {
        var t = this;
        t.d = {
            hash:'<HASH>'
        };

        t.d.$doItYourself = $('<div></div>');
        $('<div></div>').html($A.translate('Copy the URL below:')).appendTo(t.d.$doItYourself);
        t.d.$code = $('<pre class="automizy-code-content"></pre>').html('https://api.automizy.com/external/unbounce/'+t.hash()).appendTo(t.d.$doItYourself);
        $('<div></div>').html($A.translate('Next steps:')).appendTo(t.d.$doItYourself);
        t.d.$list = $('<ol></ol>').appendTo(t.d.$doItYourself);
        $('<li></li>').html($A.translate("Login to Unbounce and open the landing page you want to connect with Automizy.")).appendTo(t.d.$list);
        $('<li></li>').html($A.translate('Scroll down to <b>"Basic Form Integrations"</b> panel.')).appendTo(t.d.$list);
        $('<li></li>').html($A.translate('Click <b>"Webhook: POST or URL"</b> button.')).appendTo(t.d.$list);
        $('<li></li>').html($A.translate("<b>Insert the script code</b> to the popup window by hitting Ctrl+V (PC) or @+V (Mac).")).appendTo(t.d.$list);
        $('<li></li>').html($A.translate("<b>Go to the live landing page and subscribe</b> (if you don't do this Automizy won't recognise the form).")).appendTo(t.d.$list);
        $('<li></li>').html($A.translate("You're done!")).appendTo(t.d.$list);

        t.d.itHelp = $ACC.newCodeHelpItHelp()
            .email('ithelp-integration-unbounce-en')
            .subject($A.translate("Help me connect Automizy with Unbounce please"))
            .fields({
                hash: t.hash()
            });

        t.d.scriptInsertion = $ACC.newCodeHelp()
            .title($A.translate('Connect Automizy with unbounce'))
            .description('Unbounce form is missing')
            .doItYourselfContent(t.d.$doItYourself)
            .askForItHelpContent(t.d.itHelp.widget());
    };

    var p = CodeHelpUnbounceIntegration.prototype;

    p.type = function(type){
        var t = this;
        if(typeof type !== 'undefined'){
            t.d.type = type;

            if(t.d.type === 'install'){
                t.d.scriptInsertion.description('');
            }else if(t.d.type === 'trigger'){
                t.d.scriptInsertion.description($A.translate('Unbounce form is missing.'));
            }

            return t;
        }
        return t.d.type;
    };
    p.hash = function(hash){
        var t = this;
        if(typeof hash !== 'undefined'){
            t.d.hash = hash;
            t.d.$code.text('https://api.automizy.com/external/unbounce/'+t.d.hash);
            t.d.itHelp.fields({
                hash: t.hash()
            });
            return t;
        }
        return t.d.hash;
    };
    p.open = function(){
        var t = this;
        t.d.scriptInsertion.open();
        return t;
    };

    $ACC.m.CodeHelpUnbounceIntegration = CodeHelpUnbounceIntegration;
    $ACC.newCodeHelpUnbounceIntegration = function () {
        return new $ACC.m.CodeHelpUnbounceIntegration();
    };

    $ACC.modules.unbounceIntegration = $ACC.newCodeHelpUnbounceIntegration();

    return $ACC.m.CodeHelpUnbounceIntegration;
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