(function(){
    function hasFont(className, fontFamily) {
        var span = document.createElement('span');
        span.className = className;
        span.style.display = 'none';
        document.body.insertBefore(span, document.body.firstChild);
        if (window.getComputedStyle(span, null).getPropertyValue('font-family') === fontFamily) {
            document.body.removeChild(span);
            return true;
        }
        document.body.removeChild(span);
        return false;
    }

    window.AutomizyCommonCollection = window.$ACC = new AutomizyProject({
        name: 'automizy-common-collection',
        plugins: [
            {
                name: 'font-awesome',
                skipCondition: hasFont('fa', 'FontAwesome'),
                css: "vendor/fontawesome/css/font-awesome.min.css"
            },
            {
                name: 'automizy-js',
                skipCondition: typeof AutomizyJs !== 'undefined',
                css: "vendor/automizy-js/automizy.css",
                js: [
                    "vendor/automizy-js/automizy.js"
                ]
            },
            {
                name: 'automizy-js-api',
                skipCondition: typeof AutomizyJsApi !== 'undefined',
                js: "vendor/automizy-js-api/automizy.api.js"
            }
        ]
    });
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
        t.d.$mainBoxElementsUsePluginIcon      = $('<span class="fa fa-plug fa-3x automizy-color-orange"></span>').appendTo(t.d.$mainBoxElementsUsePlugin);
        t.d.$mainBoxElementsUsePluginText      = $('<div class="automizy-common-collection-codehelp-elements-element-text"></div>').appendTo(t.d.$mainBoxElementsUsePlugin).text($A.translate('Use plugin'));

        t.d.$mainBoxElementsDoItYourself        = $('<div class="automizy-common-collection-codehelp-elements-element automizy-hide"></div>').appendTo(t.d.$mainBoxElements).click(function(){
            $(this).addClass('automizy-active').siblings().removeClass('automizy-active');
            t.d.$usePluginBox.hide();
            t.d.$doItYourselfBox.show();
            t.d.$askForItHelpBox.hide();
        });
        t.d.$mainBoxElementsDoItYourselfIcon    = $('<span class="fa fa-code fa-3x automizy-color-blue"></span>').appendTo(t.d.$mainBoxElementsDoItYourself);
        t.d.$mainBoxElementsDoItYourselfText    = $('<div class="automizy-common-collection-codehelp-elements-element-text"></div>').appendTo(t.d.$mainBoxElementsDoItYourself).text($A.translate('Do it yourself'));

        t.d.$mainBoxElementsAskForItHelp        = $('<div class="automizy-common-collection-codehelp-elements-element automizy-hide"></div>').appendTo(t.d.$mainBoxElements).click(function(){
            $(this).addClass('automizy-active').siblings().removeClass('automizy-active');
            t.d.$usePluginBox.hide();
            t.d.$doItYourselfBox.hide();
            t.d.$askForItHelpBox.show();
        });
        t.d.$mainBoxElementsAskForItHelpIcon    = $('<span class="fa fa-commenting-o fa-3x automizy-color-green"></span>').appendTo(t.d.$mainBoxElementsAskForItHelp);
        t.d.$mainBoxElementsAskForItHelpText    = $('<div class="automizy-common-collection-codehelp-elements-element-text"></div>').appendTo(t.d.$mainBoxElementsAskForItHelp).text($A.translate('Ask for IT help'));

        t.d.helpButton = $A.newButton({
            text: $A.translate('Still have problem? Contact us!'),
            skin: 'nobox-orange',
            click: function () {
                if (typeof fcWidget !== 'undefined') {
                    fcWidget.open({name: "Automizy Support"});
                } else if (typeof Intercom !== 'undefined') {
                    Intercom('showNewMessage');
                }
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
            if(content instanceof $ACC.m.CodeHelpItHelp){
                content = content.widget();
            }
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
    $ACC.pluginsLoaded(function () {
        var CodeHelpItHelp = function () {
            var t = this;
            t.d = {
                dialogs: {},
                inputs: {},
                buttons: {},
                done: function () {},
                beforeSend: function () {},
                previewUrl: false
            };

            t.d.$widget = $('<div></div>');
            t.d.$title = $('<div></div>').appendTo(t.d.$widget);
            t.d.$widget.append('<br/><br/>');
            t.d.inputs.email = $A.newInput2({
                labelTop: $A.translate("Enter your developers' email address:"),
                name: 'email',
                validator:'email',
                width:400,
                buttonRight: {
                    skin:'nobox-orange',
                    text:'preview',
                    icon:'fa-eye',
                    click: function(){
                        var win = window.open(t.previewUrl(), '_blank');
                        win.focus();
                    }
                },
                target: t.d.$widget
            });
            t.d.$success = $('<div style="padding-bottom:12px; color:#008000">' + $A.translate('Send successful') + '</div>').appendTo(t.d.$widget).hide();
            t.d.buttons.send = $A.newButton({
                text: $A.translate("Send Instructions"),
                skin: 'simple-orange',
                newRow: true,
                target: t.d.$widget,
                click: function () {
                    if(t.d.inputs.email.validate()) {
                        $A.ajaxDocumentCover(1);
                        t.d.$success.hide();
                        $.ajax({
                            url: $AA.baseUrl() + '/public-email',
                            type: 'POST',
                            dataType: 'json',
                            data: {
                                emailAddress: t.d.inputs.email.val(),
                                htmlEmail: t.email(),
                                fields: t.fields(),
                                subject: t.subject()
                            },
                            headers: {Authorization: 'Bearer ' + $AA.token().get()}
                        }).always(function (data) {
                            t.d.$success.show(250);
                            $A.ajaxDocumentCover(0);
                        })
                    }
                }
            });

            t.title($A.translate('Ask for IT help now by sending the instructions.'));

        };

        var p = CodeHelpItHelp.prototype;

        p.previewUrl = function (previewUrl) {
            var t = this;
            if (typeof previewUrl !== 'undefined') {
                t.d.previewUrl = previewUrl;
                return t;
            }
            return t.d.previewUrl;
        };
        p.title = function (title) {
            var t = this;
            if (typeof title !== 'undefined') {
                t.d.title = title;
                t.d.$title.html(title);
                return t;
            }
            return t.d.title;
        };
        p.widget = function () {
            var t = this;
            return t.d.$widget;
        };
        p.fields = function (fields) {
            var t = this;
            if (typeof fields !== 'undefined') {
                t.d.fields = fields;
                return t;
            }
            return t.d.fields;
        };
        p.email = function (email) {
            var t = this;
            if (typeof email !== 'undefined') {
                t.d.email = email;
                t.previewUrl('https://app.automizy.com/public/email/' + t.d.email + '.html');
                return t;
            }
            return t.d.email;
        };
        p.subject = function (subject) {
            var t = this;
            if (typeof subject !== 'undefined') {
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
    });
})();

(function(){
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
})();

(function(){
    $ACC.pluginsLoaded(function () {
        var CodeHelpAutodetectScriptInsertion = function () {
            var t = this;
            t.d = {
                hash: '<HASH>',
                clicked: false,
                scriptInserted: false,
                type: false,
                scriptCode:"<!-- Automizy Autodetect -->\r\n"+
                    "<script>\r\n"+
                    "    (function (a, u, t, o, m, i, z, y) {\r\n"+
                    "        i = i || 'script';\r\n"+
                    "        z = a['AutomizyAutodetect'] = a['AutomizyAutodetect'] || {id:0};\r\n"+
                    "        if(z.id !== 0){return;}\r\n"+
                    "        z[i] = u.createElement(i); y = encodeURIComponent(document.URL);\r\n"+
                    "        z[i].src = t + '?id=' + o + '&v=' + (Math.ceil(new Date()/(m || 25000))) + (y.length < 1500 ? '&url=' + y : '');\r\n"+
                    "        z[i].async = 1; z.id = o; var fs = u.getElementsByTagName(i)[0];z[i].setAttribute('data-automizy-id',o);\r\n"+
                    "        fs.parentNode.insertBefore(z[i], z.fs);\r\n"+
                    "    })(window, document, 'https://scripts.automizy.com/autodetect.js', '[[hash]]');\r\n"+
                    "</script>\r\n"+
                    "<!-- End Automizy Autodetect -->"
            };

            t.d.$helpScriptInsertionDoItYourself = $('<div></div>');
            $('<div></div>').text($A.translate('Copy the code below:')).appendTo(t.d.$helpScriptInsertionDoItYourself);
            t.d.$code = $('<pre class="automizy-code-content"></pre>').appendTo(t.d.$helpScriptInsertionDoItYourself);
            $('<b></b>').text($A.translate('Important!')).appendTo(t.d.$helpScriptInsertionDoItYourself);
            $('<div></div>').text($A.translate('After you copied the installation code, go to your website and insert it to the header section by hitting ctrl+V (PC) or @+V (Mac).')).appendTo(t.d.$helpScriptInsertionDoItYourself);

            t.d.scriptInsertionItHelp = $ACC.newCodeHelpItHelp()
                .email('ithelp-autodetect-script-en')
                .subject($A.translate("Help me connect Automizy with our webpage please"))
                .fields({
                    hash: t.hash()
                });

            t.d.scriptInsertion = $ACC.newCodeHelp()
                .title($A.translate('Install code'))
                .description($A.translate('To get started with Automizy, add the installation code to your web- or blog pages!'))
                .doItYourselfContent(t.d.$helpScriptInsertionDoItYourself)
                .askForItHelpContent(t.d.scriptInsertionItHelp.widget());

        };

        var p = CodeHelpAutodetectScriptInsertion.prototype;

        p.hash = function (hash) {
            var t = this;
            if (typeof hash !== 'undefined') {
                t.d.hash = hash;
                t.d.$code.text(t.d.scriptCode.replace(/\[\[hash]]/g, t.d.hash));
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

        $ACC.m.CodeHelpAutodetectScriptInsertion = CodeHelpAutodetectScriptInsertion;
        $ACC.newCodeHelpAutodetectScriptInsertion = function () {
            return new $ACC.m.CodeHelpAutodetectScriptInsertion();
        };

        $ACC.modules.autodetectScriptInsertion = $ACC.newCodeHelpAutodetectScriptInsertion();

        return $ACC.m.CodeHelpAutodetectScriptInsertion;
    });
})();

(function(){
    $ACC.pluginsLoaded(function () {
        var CodeHelpUnbounceIntegration = function () {
            var t = this;
            t.d = {
                hash: '<HASH>'
            };

            t.d.$doItYourself = $('<div></div>');
            $('<div></div>').html($A.translate('Copy the URL below:')).appendTo(t.d.$doItYourself);
            t.d.$code = $('<pre class="automizy-code-content"></pre>').html('https://api.automizy.com/external/unbounce/' + t.hash()).appendTo(t.d.$doItYourself);
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

        p.type = function (type) {
            var t = this;
            if (typeof type !== 'undefined') {
                t.d.type = type;

                if (t.d.type === 'install') {
                    t.d.scriptInsertion.description('');
                } else if (t.d.type === 'trigger') {
                    t.d.scriptInsertion.description($A.translate('Unbounce form is missing.'));
                }

                return t;
            }
            return t.d.type;
        };
        p.hash = function (hash) {
            var t = this;
            if (typeof hash !== 'undefined') {
                t.d.hash = hash;
                t.d.$code.text('https://api.automizy.com/external/unbounce/' + t.d.hash);
                t.d.itHelp.fields({
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

        $ACC.m.CodeHelpUnbounceIntegration = CodeHelpUnbounceIntegration;
        $ACC.newCodeHelpUnbounceIntegration = function () {
            return new $ACC.m.CodeHelpUnbounceIntegration();
        };

        $ACC.modules.unbounceIntegration = $ACC.newCodeHelpUnbounceIntegration();

        return $ACC.m.CodeHelpUnbounceIntegration;
    });
})();

(function(){
    $ACC.pluginsLoaded(function () {
        var CodeHelpZapierIntegration = function () {
            var t = this;
            t.d = {};


            var $list = $('<ol>')
                .append('<li><a href="https://zapier.com/developer/invite/56758/c26960a977765afe84058228493d7ef4/" target="_blank">' + $A.translate('Click this link') + '</a>' + ' ' + $A.translate('to receive an Automizy invitation for Zapier (Zapier allows public integration only after a specific volume of usage, therefore you can access the integration from this link only yet).') + '</li>')
                .append('<li>' + $A.translate('Log in to your Zapier account') + '</li>')
                .append('<li>' + $A.translate('Use Automizy as a trigger or as an action') + '</li>');

            var $buttonRow = $('<div style="width: 100%; text-align: center;">');

            var $content = $('<div>')
                .append('<p>' + $A.translate('There are tons of apps like CRM, webinar, sales outreach, payment and other tools out there. Zapier makes easy to integrate these apps with each other without any need of programming.') + '</p>')
                .append('<p>' + $A.translate('We support Zapier integration to let you seamlessly connect your existing apps with us.') + '</p>')
                .append('<h3>' + $A.translate('How?') + '</h3>')
                .append('<p>' + $A.translate('Follow the steps below:') + '</p>')
                .append($list)
                .append($buttonRow);


            var inviteButton = $A.newButton({
                text: $A.translate('Invite me to Zapier'),
                click: function () {
                    window.open('https://zapier.com/developer/invite/56758/c26960a977765afe84058228493d7ef4/');
                },
                skin: 'simple-orange',
                target: $buttonRow,
                thick: true
            });


            t.d.zapierIntegration = $ACC.newCodeHelp()
                .title($A.translate('Connect Automizy with the apps you already use!'));
            t.d.zapierIntegration.d.$mainBoxDescription.append($content);

        };

        var p = CodeHelpZapierIntegration.prototype;

        p.open = function () {
            var t = this;
            t.d.zapierIntegration.open();
            return t;
        };

        $ACC.m.CodeHelpZapierIntegration = CodeHelpZapierIntegration;
        $ACC.newCodeHelpZapierIntegration = function () {
            return new $ACC.m.CodeHelpZapierIntegration();
        };

        $ACC.modules.zapierIntegration = $ACC.newCodeHelpZapierIntegration();

        return $ACC.m.CodeHelpZapierIntegration;
    });
})();

(function(){
    $ACC.pluginsLoaded(function () {
        var CodeHelpOptimonkIntegration = function () {
            var t = this;
            t.d = {};


            var $list = $('<ol>')
                .append('<li>'+$A.translate('Create or log in to your account in')+' '+'<a href="http://www.optimonk.com/" target="_blank">Optimonk</a></li>')
                .append('<li>' + $A.translate('Create a new pop-up or nanobar campaign there') + '</li>')
                .append('<li>' + $A.translate('In the “Campaign settings”, scroll down to the integrations section') + '</li>')
                .append('<li>' + $A.translate('Click “Where would you like to keep the list of subscribers?“') + '</li>')
                .append('<li>' + $A.translate('Choose Automizy') + '</li>')
                .append('<li>' + $A.translate('Log in to Automizy') + '</li>');

            var $buttonRow = $('<div style="width: 100%; text-align: center;">');

            var $content = $('<div style="padding: 10px;">')
                .append('<p>' + $A.translate('Well targeted pop-ups on your web pages can be a very effective way of collecting leads. Optimonk is just the right tool to get started with that!') + '</p>')
                .append('<p>' + $A.translate('This is the reason we provide you this native integration with Optimonk!') + '</p>')
                .append('<h3>' + $A.translate('How?') + '</h3>')
                .append('<p>' + $A.translate('Follow the steps below:') + '</p>')
                .append($list)
                .append($buttonRow);


            var inviteButton = $A.newButton({
                text: $A.translate('Connect with Optimonk'),
                click: function () {
                    window.open('http://www.optimonk.com/');
                },
                skin: 'simple-orange',
                target: $buttonRow,
                thick: true
            });


            t.d.optimonkIntegration = $ACC.newCodeHelp()
                .title($A.translate('Collect leads with on-site retargeting and send them straight to Automizy!'));
            t.d.optimonkIntegration.d.$mainBoxDescription.append($content);

        };

        var p = CodeHelpOptimonkIntegration.prototype;

        p.open = function () {
            var t = this;
            t.d.optimonkIntegration.open();
            return t;
        };

        $ACC.m.CodeHelpOptimonkIntegration = CodeHelpOptimonkIntegration;
        $ACC.newCodeHelpOptimonkIntegration = function () {
            return new $ACC.m.CodeHelpOptimonkIntegration();
        };

        $ACC.modules.optimonkIntegration = $ACC.newCodeHelpOptimonkIntegration();

        return $ACC.m.CodeHelpOptimonkIntegration;
    });
})();

(function(){
    $ACC.pluginsLoaded(function () {
        $ACC.$tmp = $('<div id="automizy-common-collection-tmp"></div>');

        $ACC.layoutReady();
        $ACC.ready();
    });
})();

(function(){
    //console.log('%c AutomizyCommonCollection loaded! ', 'background: #000000; color: #bada55; font-size:14px');
})();

(function(){})();