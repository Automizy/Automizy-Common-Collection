define([
    "js/core/core"
], function () {
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
});