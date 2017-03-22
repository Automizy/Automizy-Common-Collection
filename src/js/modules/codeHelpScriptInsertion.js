define([
    "js/core/core",
    "js/modules/codeHelp",
    "js/modules/codeHelpItHelp"
], function () {
    $ACC.pluginsLoaded(function () {
        var CodeHelpScriptInsertion = function () {
            var t = this;
            t.d = {
                hash: '<HASH>',
                clicked: false,
                scriptInserted: false,
                loopStopped: false,
                timeout: false,
                type: false
            };

            t.d.$helpScriptInsertionDoItYourself = $('<div></div>');
            $('<div></div>').text($A.translate('Copy the code below:')).appendTo(t.d.$helpScriptInsertionDoItYourself);
            t.d.$code = $('<pre class="automizy-code-content"></pre>').text('<script data-automizy-id="' + t.hash() + '" src="//analytics.automizy.com/analytics.js" async></script>').appendTo(t.d.$helpScriptInsertionDoItYourself);
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
                skin: 'simple-orange',
                text: $A.translate('Check'),
                click: function () {
                    $A.ajaxDocumentCover(1);
                    t.d.clicked = true;
                    t.d.check().fail(function () {
                        t.d.$checkErrorMessage.show();
                    }).always(function () {
                        $A.ajaxDocumentCover(0);
                    })
                }
            });

            t.d.scriptInsertion.d.dialog.open(function () {
                if (t.d.type !== 'install') {
                    t.d.loopStopped = false;
                    t.d.check();
                }
            }).close(function () {
                t.d.loopStopped = true;
            }).addButton(t.d.checkButton);

            t.d.$checkSuccessMessage = $('<div style="float:left; color:#008000; font-family:Arial">' + $A.translate('Analytics code detected! Thank you!') + '</div>').appendTo(t.d.scriptInsertion.d.dialog.d.$buttons).hide();
            t.d.$checkErrorMessage = $('<div style="float:left; color:#ff0000; font-family:Arial">' + $A.translate('The system can not find the analytics code.') + '</div>').appendTo(t.d.scriptInsertion.d.dialog.d.$buttons).hide();

            t.d.check = function () {
                clearTimeout(t.d.timeout);
                if (t.d.scriptInserted === true || t.d.loopStopped === true) {
                    t.d.checkButton.hide();
                    return true;
                }
                return $.ajax({
                    url: $AA.accountUrl() + '/is-script-inserted',
                    type: 'GET',
                    dataType: 'json',
                    headers: {Authorization: 'Bearer ' + $AA.token().get()}
                }).done(function (data) {
                    if ($A.parseBoolean(data.inserted)) {
                        t.d.checkButton.hide();
                        t.d.scriptInserted = true;
                        if (typeof Automizy !== 'undefined') {
                            Automizy.config.user.isScriptInserted = true;
                        }
                        t.d.$checkSuccessMessage.show();
                    } else {
                        if (t.d.clicked) {
                            t.d.$checkErrorMessage.show();
                        }
                        t.d.timeout = setTimeout(function () {
                            t.d.check();
                        }, 3000);
                    }
                });
            }
        };

        var p = CodeHelpScriptInsertion.prototype;

        p.type = function (type) {
            var t = this;
            if (typeof type !== 'undefined') {
                t.d.type = type;

                if (t.d.type === 'install') {
                    t.d.scriptInsertion.description($A.translate('To get started with Automizy, add the installation code to your web- or blog pages!'));
                    t.d.loopStopped = true;
                    t.d.$checkSuccessMessage.hide();
                    t.d.$checkErrorMessage.hide();
                    t.d.checkButton.hide();
                } else if (t.d.type === 'createForm') {
                    t.d.scriptInsertion.description($A.translate('In order to create forms please insert the Automizy script into your web page. Choose from the 3 options below.'));
                    t.d.loopStopped = false;
                    t.d.checkButton.show();
                }

                return t;
            }
            return t.d.type;
        };
        p.hash = function (hash) {
            var t = this;
            if (typeof hash !== 'undefined') {
                t.d.hash = hash;
                t.d.$code.text('<script data-automizy-id="' + t.d.hash + '" src="//analytics.automizy.com/analytics.js" async></script>');
                t.d.scriptInsertionItHelp.fields({
                    hash: t.hash()
                });
                return t;
            }
            return t.d.hash;
        };
        p.open = function () {
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
    });
});